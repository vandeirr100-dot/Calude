"""Transcricao com timestamps (faster-whisper, com fallback para openai-whisper)."""

import json
import os

from ..utils import segments as segutil
from ..utils.paths import cache_dir, whisper_models_dir
from ..utils.voices import ASR_LANGUAGES

_MODEL_CACHE = {}

MODELS = [
    "large-v3-turbo",
    "large-v3",
    "medium",
    "small",
    "base",
    "tiny",
    "distil-large-v3",
]


def _pick_device(choice):
    if choice != "auto":
        return choice
    try:
        import torch  # type: ignore

        if torch.cuda.is_available():
            return "cuda"
    except Exception:
        pass
    return "cpu"


def _pick_compute(choice, device):
    if choice != "auto":
        return choice
    return "float16" if device == "cuda" else "int8"


def _repo_for(model_name):
    """Repositorio no Hugging Face correspondente ao modelo, quando conhecido."""
    try:
        from faster_whisper import utils as fw_utils  # type: ignore

        return getattr(fw_utils, "_MODELS", {}).get(model_name)
    except Exception:
        return None


def _download_hint(model_name, error):
    """Mensagem acionavel para falhas de rede/TLS ao buscar o modelo."""
    text = str(error)
    repo = _repo_for(model_name)
    destino = os.path.join(whisper_models_dir(), "models--" + (repo or "").replace("/", "--"))

    linhas = ["Nao foi possivel baixar o modelo '%s' do Hugging Face." % model_name]

    if "CERTIFICATE_VERIFY_FAILED" in text or "self-signed certificate" in text:
        linhas += [
            "",
            "Causa: a conexao HTTPS esta sendo interceptada (antivirus com 'varredura HTTPS'",
            "ligada - Kaspersky, ESET, Avast, Bitdefender - ou proxy/firewall da rede).",
            "",
            "Como resolver, da opcao mais simples para a mais tecnica:",
            "  1. Desligue a varredura HTTPS/SSL do antivirus, baixe o modelo uma vez e",
            "     ligue de volta. O modelo fica salvo e nao sera baixado de novo.",
            "  2. Baixe o modelo pelo navegador e use 'caminho_do_modelo':",
        ]
        if repo:
            linhas.append("     https://huggingface.co/%s/tree/main" % repo)
            linhas.append(
                "     Salve os arquivos numa pasta e aponte 'caminho_do_modelo' para ela."
            )
        linhas += [
            "  3. Aponte a variavel de ambiente SSL_CERT_FILE (ou REQUESTS_CA_BUNDLE) para o",
            "     certificado raiz do seu antivirus/proxy antes de iniciar o ComfyUI.",
        ]
    else:
        linhas += [
            "",
            "Verifique a conexao com a internet. Se estiver sem rede, baixe o modelo em outra",
            "maquina e use o campo 'caminho_do_modelo'.",
        ]
        if repo:
            linhas.append("Repositorio: https://huggingface.co/%s" % repo)

    linhas += ["", "Pasta dos modelos: %s" % whisper_models_dir(), "", "Erro original: %s" % text]
    return "\n".join(linhas)


def _load_faster_whisper(model_name, device, compute_type, model_path=""):
    source = (model_path or "").strip() or model_name
    key = (source, device, compute_type)
    if key in _MODEL_CACHE:
        return _MODEL_CACHE[key]
    from faster_whisper import WhisperModel  # type: ignore

    if model_path and not os.path.isdir(source):
        raise RuntimeError(
            "'caminho_do_modelo' aponta para uma pasta inexistente: %s" % source
        )

    try:
        model = WhisperModel(
            source,
            device=device,
            compute_type=compute_type,
            # pasta persistente: a temp do ComfyUI e apagada a cada inicializacao
            download_root=whisper_models_dir(),
        )
    except Exception as exc:
        text = str(exc)
        if any(
            token in text
            for token in (
                "CERTIFICATE_VERIFY_FAILED",
                "LocalEntryNotFound",
                "ConnectError",
                "ConnectionError",
                "Max retries",
                "self-signed certificate",
            )
        ):
            raise RuntimeError(_download_hint(model_name, exc))
        raise
    _MODEL_CACHE[key] = model
    return model


class DubTranscribe:
    """Converte o audio original em segmentos de fala com tempos precisos."""

    CATEGORY = "Dublagem IA/2. Transcricao"
    FUNCTION = "transcribe"
    RETURN_TYPES = ("DUB_SEGMENTS", "STRING", "STRING")
    RETURN_NAMES = ("segmentos", "idioma_detectado", "transcricao")
    DESCRIPTION = "Transcreve o audio com Whisper e devolve segmentos com timestamps."

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_path": ("STRING", {"forceInput": True}),
                "modelo": (MODELS, {"default": "large-v3-turbo"}),
                "dispositivo": (["auto", "cuda", "cpu"], {"default": "auto"}),
                "precisao": (
                    ["auto", "float16", "int8_float16", "int8", "float32"],
                    {"default": "auto"},
                ),
                "idioma_origem": (ASR_LANGUAGES, {"default": "auto"}),
                "filtro_vad": ("BOOLEAN", {"default": True}),
                "unir_frases_curtas": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "beam_size": ("INT", {"default": 5, "min": 1, "max": 10}),
                "prompt_inicial": (
                    "STRING",
                    {
                        "default": "",
                        "multiline": True,
                        "placeholder": "Nomes proprios, jargao tecnico, siglas... (melhora a grafia)",
                    },
                ),
                "usar_cache": ("BOOLEAN", {"default": True}),
                "caminho_do_modelo": (
                    "STRING",
                    {
                        "default": "",
                        "placeholder": "pasta de um modelo ja baixado (opcional)",
                        "tooltip": (
                            "Use quando o download automatico falhar: baixe o modelo pelo "
                            "navegador e aponte para a pasta dele."
                        ),
                    },
                ),
            },
        }

    def transcribe(
        self,
        audio_path,
        modelo,
        dispositivo,
        precisao,
        idioma_origem,
        filtro_vad,
        unir_frases_curtas,
        beam_size=5,
        prompt_inicial="",
        usar_cache=True,
        caminho_do_modelo="",
    ):
        if not audio_path or not os.path.exists(audio_path):
            raise RuntimeError("Audio nao encontrado: %r" % audio_path)

        cache_file = os.path.join(
            cache_dir(),
            "asr_%s_%s_%s.json"
            % (
                os.path.basename(os.path.dirname(audio_path)),
                modelo,
                idioma_origem,
            ),
        )
        if usar_cache and os.path.exists(cache_file):
            try:
                with open(cache_file, "r", encoding="utf-8") as handle:
                    cached = json.load(handle)
                segs = cached["segments"]
                return (segs, cached["language"], segutil.plain_text(segs))
            except Exception:
                pass

        device = _pick_device(dispositivo)
        compute_type = _pick_compute(precisao, device)
        language = None if idioma_origem == "auto" else idioma_origem

        try:
            segs, detected = self._run_faster_whisper(
                audio_path, modelo, device, compute_type, language, filtro_vad, beam_size,
                prompt_inicial, caminho_do_modelo,
            )
        except ImportError:
            segs, detected = self._run_openai_whisper(
                audio_path, modelo, device, language, prompt_inicial
            )

        segs = segutil.resolve_overlaps(segs)
        if unir_frases_curtas:
            segs = segutil.merge_short(segs)
            segs = segutil.resolve_overlaps(segs)

        if not segs:
            raise RuntimeError(
                "Nenhuma fala foi detectada no audio. Verifique se o video tem narracao "
                "ou desative o 'filtro_vad'."
            )

        try:
            with open(cache_file, "w", encoding="utf-8") as handle:
                json.dump({"segments": segs, "language": detected}, handle, ensure_ascii=False)
        except Exception:
            pass

        return (segs, detected, segutil.plain_text(segs))

    def _run_faster_whisper(
        self, audio_path, modelo, device, compute_type, language, vad, beam_size, prompt,
        model_path="",
    ):
        model = _load_faster_whisper(modelo, device, compute_type, model_path)
        iterator, info = model.transcribe(
            audio_path,
            language=language,
            beam_size=int(beam_size),
            vad_filter=bool(vad),
            vad_parameters={"min_silence_duration_ms": 400} if vad else None,
            word_timestamps=False,
            condition_on_previous_text=False,
            initial_prompt=(prompt or None),
        )
        out = []
        for seg in iterator:
            text = (seg.text or "").strip()
            if text:
                out.append(segutil.new_segment(seg.start, seg.end, text, speaker="SPK_1"))
        return out, (getattr(info, "language", None) or language or "en")

    def _run_openai_whisper(self, audio_path, modelo, device, language, prompt):
        try:
            import whisper  # type: ignore
        except ImportError:
            raise RuntimeError(
                "Nenhum backend de transcricao instalado. Rode:\n"
                "  pip install faster-whisper\n"
                "(ou, alternativamente, 'pip install -U openai-whisper')"
            )
        name = modelo.replace("-turbo", "").replace("distil-", "")
        model = whisper.load_model(name, device=None if device == "auto" else device)
        result = model.transcribe(
            audio_path, language=language, initial_prompt=(prompt or None), verbose=False
        )
        out = []
        for seg in result.get("segments", []):
            text = (seg.get("text") or "").strip()
            if text:
                out.append(segutil.new_segment(seg["start"], seg["end"], text, speaker="SPK_1"))
        return out, result.get("language") or language or "en"


class DubSegmentsPreview:
    """Mostra os segmentos como texto para inspecao/debug dentro do workflow."""

    CATEGORY = "Dublagem IA/2. Transcricao"
    FUNCTION = "preview"
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("relatorio",)
    OUTPUT_NODE = True

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "segmentos": ("DUB_SEGMENTS", {"forceInput": True}),
                "mostrar_traducao": ("BOOLEAN", {"default": True}),
                "limite_de_linhas": ("INT", {"default": 40, "min": 1, "max": 2000}),
            }
        }

    def preview(self, segmentos, mostrar_traducao, limite_de_linhas):
        lines = []
        info = segutil.stats(segmentos)
        lines.append(
            "%d segmentos | %.1fs de fala | %d caracteres"
            % (info["segmentos"], info["tempo_de_fala_s"], info["caracteres"])
        )
        lines.append("-" * 60)
        for seg in segmentos[: int(limite_de_linhas)]:
            stamp = "[%6.2f -> %6.2f]" % (seg["start"], seg["end"])
            lines.append("%s %s" % (stamp, seg.get("text") or ""))
            if mostrar_traducao and seg.get("translated"):
                lines.append("%s -> %s" % (" " * len(stamp), seg["translated"]))
        if len(segmentos) > int(limite_de_linhas):
            lines.append("... (+%d segmentos)" % (len(segmentos) - int(limite_de_linhas)))
        report = "\n".join(lines)
        return {"ui": {"text": [report]}, "result": (report,)}


NODE_CLASS_MAPPINGS = {
    "DubTranscribe": DubTranscribe,
    "DubSegmentsPreview": DubSegmentsPreview,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DubTranscribe": "2. Transcrever Audio (Whisper)",
    "DubSegmentsPreview": "Inspecionar Segmentos / Legendas",
}
