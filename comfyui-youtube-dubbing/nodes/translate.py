"""Traducao dos segmentos preservando o alinhamento temporal."""

import json
import os
import re
import time
import urllib.parse
import urllib.request

from ..utils import segments as segutil
from ..utils.voices import LANGUAGE_LABELS, resolve_language

ENGINES = ["claude", "openai", "deepl", "google_gratis", "libretranslate", "nenhuma"]

TONES = ["neutro", "informal", "formal", "entusiasmado", "didatico", "jornalistico"]

_SYSTEM_PROMPT = (
    "Voce e um tradutor profissional especializado em DUBLAGEM de video. "
    "Traduza cada fala para {target}, respeitando estas regras:\n"
    "1. O texto traduzido sera falado em voz alta dentro da MESMA janela de tempo do "
    "original, portanto mantenha a duracao falada equivalente (ate ~{tol}% de variacao "
    "no numero de caracteres). Prefira sinonimos curtos e corte muletas de linguagem.\n"
    "2. Tom: {tone}. Soe natural na lingua de destino, nunca literal.\n"
    "3. Preserve nomes proprios, marcas, siglas, numeros e unidades.\n"
    "4. Nao adicione explicacoes, notas, aspas ou comentarios.\n"
    "5. Nao junte nem divida falas: responda exatamente um item por id recebido.\n"
    "Responda SOMENTE um objeto JSON no formato "
    '{{"traducoes": [{{"id": <numero>, "texto": "<traducao>"}}]}}.'
)


def _chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i : i + size]


def _http_json(url, payload=None, headers=None, method="POST", timeout=120):
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    for key, value in (headers or {}).items():
        req.add_header(key, value)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _parse_json_block(text):
    """Extrai o objeto JSON da resposta do modelo, tolerando cercas de codigo."""
    text = (text or "").strip()
    text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end <= start:
        raise ValueError("resposta sem JSON: %s" % text[:200])
    return json.loads(text[start : end + 1])


class DubTranslate:
    """Traduz os segmentos para o idioma escolhido, com controle de comprimento."""

    CATEGORY = "Dublagem IA/3. Traducao"
    FUNCTION = "translate"
    RETURN_TYPES = ("DUB_SEGMENTS", "STRING", "STRING")
    RETURN_NAMES = ("segmentos", "idioma_destino", "texto_traduzido")
    DESCRIPTION = "Traduz as falas mantendo o encaixe no tempo original do video."

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "segmentos": ("DUB_SEGMENTS", {"forceInput": True}),
                "idioma_destino": (LANGUAGE_LABELS, {"default": "Ingles (EUA)"}),
                "motor": (ENGINES, {"default": "claude"}),
                "tom": (TONES, {"default": "neutro"}),
                "tolerancia_comprimento_pct": ("INT", {"default": 15, "min": 0, "max": 60}),
            },
            "optional": {
                "api_key": (
                    "STRING",
                    {"default": "", "placeholder": "vazio = usa a variavel de ambiente"},
                ),
                "modelo_llm": ("STRING", {"default": "claude-sonnet-5-5"}),
                "falas_por_requisicao": ("INT", {"default": 25, "min": 1, "max": 100}),
                "glossario": (
                    "STRING",
                    {
                        "default": "",
                        "multiline": True,
                        "placeholder": "origem = destino (uma por linha)\nex: cloud = nuvem",
                    },
                ),
                "idioma_origem": ("STRING", {"default": "auto"}),
                "url_libretranslate": (
                    "STRING",
                    {"default": "https://libretranslate.com/translate"},
                ),
            },
        }

    def translate(
        self,
        segmentos,
        idioma_destino,
        motor,
        tom,
        tolerancia_comprimento_pct,
        api_key="",
        modelo_llm="claude-sonnet-5-5",
        falas_por_requisicao=25,
        glossario="",
        idioma_origem="auto",
        url_libretranslate="https://libretranslate.com/translate",
    ):
        lang_code, locale = resolve_language(idioma_destino)
        segs = [dict(s) for s in segmentos]

        if motor == "nenhuma":
            for seg in segs:
                seg["translated"] = seg.get("text")
            return (segs, locale, segutil.plain_text(segs, use_translation=True))

        indexed = [(i, seg) for i, seg in enumerate(segs) if (seg.get("text") or "").strip()]
        if not indexed:
            raise RuntimeError("Nenhum texto para traduzir nos segmentos recebidos.")

        src = None if idioma_origem in ("", "auto") else idioma_origem

        if motor in ("claude", "openai"):
            translations = self._translate_llm(
                indexed,
                motor,
                idioma_destino,
                tom,
                int(tolerancia_comprimento_pct),
                api_key,
                modelo_llm,
                int(falas_por_requisicao),
                glossario,
            )
        elif motor == "deepl":
            translations = self._translate_deepl(indexed, lang_code, locale, api_key, src)
        elif motor == "google_gratis":
            translations = self._translate_google(indexed, lang_code, src)
        else:
            translations = self._translate_libre(
                indexed, lang_code, src, url_libretranslate, api_key
            )

        glossary = self._parse_glossary(glossario)
        for position, (index, _seg) in enumerate(indexed):
            text = translations.get(position) or segs[index].get("text")
            for source, dest in glossary:
                text = re.sub(re.escape(source), dest, text, flags=re.IGNORECASE)
            segs[index]["translated"] = text.strip()

        for seg in segs:
            if not seg.get("translated"):
                seg["translated"] = seg.get("text")

        return (segs, locale, segutil.plain_text(segs, use_translation=True))

    # ------------------------------------------------------------------ LLM --
    def _translate_llm(
        self, indexed, engine, target_label, tone, tol, api_key, model, batch_size, glossario
    ):
        system = _SYSTEM_PROMPT.format(target=target_label, tol=tol, tone=tone)
        glossary = self._parse_glossary(glossario)
        if glossary:
            system += "\nGlossario obrigatorio: " + "; ".join(
                "%s -> %s" % (a, b) for a, b in glossary
            )

        results = {}
        positions = list(range(len(indexed)))
        for block in _chunks(positions, batch_size):
            payload_items = []
            for position in block:
                _, seg = indexed[position]
                payload_items.append(
                    {
                        "id": position,
                        "texto": seg["text"],
                        "segundos": round(segutil.duration(seg), 2),
                        "max_caracteres": max(
                            12, int(len(seg["text"]) * (1 + tol / 100.0))
                        ),
                    }
                )
            user = json.dumps({"falas": payload_items}, ensure_ascii=False)
            raw = self._call_llm(engine, system, user, api_key, model)
            try:
                parsed = _parse_json_block(raw)
                for item in parsed.get("traducoes", []):
                    results[int(item["id"])] = str(item.get("texto", "")).strip()
            except Exception as exc:
                raise RuntimeError(
                    "Nao consegui interpretar a resposta do tradutor (%s): %s" % (engine, exc)
                )
            missing = [p for p in block if p not in results]
            if missing:
                # fallback individual para os itens que o modelo deixou passar
                for position in missing:
                    _, seg = indexed[position]
                    single = self._call_llm(
                        engine,
                        system,
                        json.dumps(
                            {"falas": [{"id": position, "texto": seg["text"]}]},
                            ensure_ascii=False,
                        ),
                        api_key,
                        model,
                    )
                    try:
                        parsed = _parse_json_block(single)
                        for item in parsed.get("traducoes", []):
                            results[int(item["id"])] = str(item.get("texto", "")).strip()
                    except Exception:
                        results[position] = seg["text"]
        return results

    def _call_llm(self, engine, system, user, api_key, model, retries=3):
        last = None
        for attempt in range(retries):
            try:
                if engine == "claude":
                    key = api_key or os.environ.get("ANTHROPIC_API_KEY", "")
                    if not key:
                        raise RuntimeError(
                            "Defina a variavel de ambiente ANTHROPIC_API_KEY ou preencha 'api_key'."
                        )
                    data = _http_json(
                        "https://api.anthropic.com/v1/messages",
                        {
                            "model": model or "claude-sonnet-5-5",
                            "max_tokens": 8000,
                            "system": system,
                            "messages": [{"role": "user", "content": user}],
                        },
                        {"x-api-key": key, "anthropic-version": "2023-06-01"},
                    )
                    return "".join(
                        part.get("text", "") for part in data.get("content", [])
                    )
                key = api_key or os.environ.get("OPENAI_API_KEY", "")
                if not key:
                    raise RuntimeError(
                        "Defina a variavel de ambiente OPENAI_API_KEY ou preencha 'api_key'."
                    )
                data = _http_json(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        "model": model or "gpt-4o-mini",
                        "messages": [
                            {"role": "system", "content": system},
                            {"role": "user", "content": user},
                        ],
                        "response_format": {"type": "json_object"},
                    },
                    {"Authorization": "Bearer " + key},
                )
                return data["choices"][0]["message"]["content"]
            except Exception as exc:
                last = exc
                if "API_KEY" in str(exc):
                    raise
                time.sleep(2 ** attempt)
        raise RuntimeError("Falha na traducao via %s: %s" % (engine, last))

    # ---------------------------------------------------------------- DeepL --
    def _translate_deepl(self, indexed, lang_code, locale, api_key, source):
        key = api_key or os.environ.get("DEEPL_API_KEY", "")
        if not key:
            raise RuntimeError("Defina DEEPL_API_KEY ou preencha 'api_key'.")
        host = (
            "https://api-free.deepl.com/v2/translate"
            if key.endswith(":fx")
            else "https://api.deepl.com/v2/translate"
        )
        target = {"pt": "PT-BR", "en": "EN-US"}.get(lang_code, lang_code.upper())
        if locale == "pt-PT":
            target = "PT-PT"
        if locale == "en-GB":
            target = "EN-GB"

        results = {}
        for block in _chunks(list(range(len(indexed))), 40):
            texts = [indexed[p][1]["text"] for p in block]
            payload = {"text": texts, "target_lang": target}
            if source:
                payload["source_lang"] = source.upper()
            data = _http_json(host, payload, {"Authorization": "DeepL-Auth-Key " + key})
            for position, item in zip(block, data.get("translations", [])):
                results[position] = item.get("text", "")
        return results

    # --------------------------------------------------------------- Google --
    def _translate_google(self, indexed, lang_code, source):
        results = {}
        for position, (_, seg) in enumerate(indexed):
            params = urllib.parse.urlencode(
                {
                    "client": "gtx",
                    "sl": source or "auto",
                    "tl": lang_code,
                    "dt": "t",
                    "q": seg["text"],
                }
            )
            url = "https://translate.googleapis.com/translate_a/single?" + params
            try:
                with urllib.request.urlopen(url, timeout=30) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                results[position] = "".join(part[0] for part in data[0] if part and part[0])
            except Exception:
                results[position] = seg["text"]
            time.sleep(0.12)  # cortesia com o endpoint gratuito
        return results

    # -------------------------------------------------------- LibreTranslate --
    def _translate_libre(self, indexed, lang_code, source, url, api_key):
        results = {}
        for block in _chunks(list(range(len(indexed))), 20):
            texts = [indexed[p][1]["text"] for p in block]
            payload = {
                "q": texts,
                "source": source or "auto",
                "target": lang_code,
                "format": "text",
            }
            if api_key:
                payload["api_key"] = api_key
            try:
                data = _http_json(url, payload)
                translated = data.get("translatedText", [])
                if isinstance(translated, str):
                    translated = [translated]
                for position, text in zip(block, translated):
                    results[position] = text
            except Exception as exc:
                raise RuntimeError("LibreTranslate falhou (%s): %s" % (url, exc))
        return results

    @staticmethod
    def _parse_glossary(text):
        pairs = []
        for line in (text or "").splitlines():
            if "=" in line:
                source, dest = line.split("=", 1)
                source, dest = source.strip(), dest.strip()
                if source and dest:
                    pairs.append((source, dest))
        return pairs


NODE_CLASS_MAPPINGS = {"DubTranslate": DubTranslate}
NODE_DISPLAY_NAME_MAPPINGS = {"DubTranslate": "3. Traduzir Falas"}
