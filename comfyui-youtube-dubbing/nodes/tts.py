"""Sintese de voz neural e montagem da trilha dublada sincronizada."""

import hashlib
import json
import os
import subprocess

import numpy as np

from ..utils import media
from ..utils import segments as segutil
from ..utils.aio import run_coroutine
from ..utils.paths import cache_dir, find_binary, work_dir
from ..utils.voices import pick_voice, voice_combo

ENGINES = ["edge_tts", "xtts_v2_clonagem", "piper", "openai_tts", "elevenlabs"]
SYNC_MODES = ["encaixar_no_tempo", "natural_com_deslocamento", "sem_ajuste"]

_XTTS_CACHE = {}


# ---------------------------------------------------------------- backends ---
def _synth_edge(text, voice, out_mp3, rate_pct, volume_pct, pitch_hz):
    rate = "%+d%%" % int(rate_pct)
    volume = "%+d%%" % int(volume_pct)
    pitch = "%+dHz" % int(pitch_hz)
    try:
        import edge_tts  # type: ignore

        def _go():
            comm = edge_tts.Communicate(
                text, voice, rate=rate, volume=volume, pitch=pitch
            )
            return comm.save(out_mp3)

        # numa thread propria: o ComfyUI pode ja estar rodando um event loop
        run_coroutine(_go, timeout=300)
        return out_mp3
    except ImportError:
        exe = find_binary("edge-tts")
        if not exe:
            raise RuntimeError(
                "edge-tts nao instalado. Rode: pip install -U edge-tts\n"
                "(e um motor de voz neural gratuito, nao precisa de chave de API)"
            )
        proc = subprocess.run(
            [
                exe,
                "--voice",
                voice,
                "--rate",
                rate,
                "--volume",
                volume,
                "--pitch",
                pitch,
                "--text",
                text,
                "--write-media",
                out_mp3,
            ],
            capture_output=True,
            text=True,
        )
        if proc.returncode != 0:
            raise RuntimeError("edge-tts falhou: %s" % (proc.stderr or "")[-400:])
        return out_mp3


def _load_xtts():
    if "model" in _XTTS_CACHE:
        return _XTTS_CACHE["model"]
    try:
        from TTS.api import TTS  # type: ignore
    except ImportError:
        raise RuntimeError(
            "Clonagem de voz requer o Coqui TTS. Rode: pip install -U coqui-tts\n"
            "(na primeira execucao o modelo XTTS-v2, ~1.8 GB, sera baixado)"
        )
    device = "cpu"
    try:
        import torch  # type: ignore

        if torch.cuda.is_available():
            device = "cuda"
    except Exception:
        pass
    model = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    _XTTS_CACHE["model"] = model
    return model


def _synth_xtts(text, out_wav, language, speaker_wav, speed=1.0):
    model = _load_xtts()
    if not speaker_wav or not os.path.exists(speaker_wav):
        raise RuntimeError(
            "A clonagem de voz precisa de 'audio_referencia' (6-20s da voz original). "
            "Conecte a saida 'voz_referencia' do no de Separacao de Audio."
        )
    model.tts_to_file(
        text=text,
        file_path=out_wav,
        speaker_wav=speaker_wav,
        language=language,
        speed=float(speed),
        split_sentences=True,
    )
    return out_wav


def _synth_piper(text, out_wav, voice_model):
    exe = find_binary("piper")
    if not exe:
        raise RuntimeError(
            "piper nao encontrado. Instale com 'pip install piper-tts' e informe o caminho "
            "do modelo .onnx no campo 'voz'."
        )
    if not voice_model or not os.path.exists(voice_model):
        raise RuntimeError("Para o piper, o campo 'voz' deve apontar para um arquivo .onnx.")
    proc = subprocess.run(
        [exe, "--model", voice_model, "--output_file", out_wav],
        input=text,
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError("piper falhou: %s" % (proc.stderr or "")[-400:])
    return out_wav


def _synth_openai(text, out_mp3, voice, api_key, model="gpt-4o-mini-tts"):
    import urllib.request

    key = api_key or os.environ.get("OPENAI_API_KEY", "")
    if not key:
        raise RuntimeError("Defina OPENAI_API_KEY ou preencha 'api_key'.")
    payload = json.dumps(
        {"model": model, "voice": voice or "alloy", "input": text, "response_format": "mp3"}
    ).encode("utf-8")
    req = urllib.request.Request("https://api.openai.com/v1/audio/speech", data=payload)
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", "Bearer " + key)
    with urllib.request.urlopen(req, timeout=180) as resp, open(out_mp3, "wb") as handle:
        handle.write(resp.read())
    return out_mp3


def _synth_elevenlabs(text, out_mp3, voice_id, api_key, model="eleven_multilingual_v2"):
    import urllib.request

    key = api_key or os.environ.get("ELEVENLABS_API_KEY", "")
    if not key:
        raise RuntimeError("Defina ELEVENLABS_API_KEY ou preencha 'api_key'.")
    if not voice_id or voice_id == "auto":
        raise RuntimeError(
            "Para o ElevenLabs informe o voice_id no campo 'voz' "
            "(ex.: 21m00Tcm4TlvDq8ikWAM)."
        )
    payload = json.dumps(
        {
            "text": text,
            "model_id": model,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
        }
    ).encode("utf-8")
    url = "https://api.elevenlabs.io/v1/text-to-speech/%s" % voice_id
    req = urllib.request.Request(url, data=payload)
    req.add_header("Content-Type", "application/json")
    req.add_header("xi-api-key", key)
    with urllib.request.urlopen(req, timeout=180) as resp, open(out_mp3, "wb") as handle:
        handle.write(resp.read())
    return out_mp3


# -------------------------------------------------------------------- node ---
class DubNeuralTTS:
    """Sintetiza cada fala traduzida e monta a trilha dublada na linha de tempo."""

    CATEGORY = "Dublagem IA/4. Voz"
    FUNCTION = "synthesize"
    RETURN_TYPES = ("STRING", "DUB_SEGMENTS", "STRING")
    RETURN_NAMES = ("dub_audio_path", "segmentos", "relatorio_sync")
    DESCRIPTION = (
        "Gera a voz neural de cada fala e encaixa no tempo do video original "
        "(ajuste de velocidade com tom preservado)."
    )

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "segmentos": ("DUB_SEGMENTS", {"forceInput": True}),
                "idioma_destino": ("STRING", {"forceInput": True}),
                "motor": (ENGINES, {"default": "edge_tts"}),
                "voz": (voice_combo(), {"default": "auto"}),
                "modo_sincronia": (SYNC_MODES, {"default": "encaixar_no_tempo"}),
                "aceleracao_maxima": ("FLOAT", {"default": 1.35, "min": 1.0, "max": 2.5, "step": 0.05}),
                "desaceleracao_maxima": (
                    "FLOAT",
                    {"default": 0.85, "min": 0.5, "max": 1.0, "step": 0.05},
                ),
                "velocidade_pct": ("INT", {"default": 0, "min": -50, "max": 100}),
                "volume_pct": ("INT", {"default": 0, "min": -50, "max": 50}),
                "tom_hz": ("INT", {"default": 0, "min": -50, "max": 50}),
            },
            "optional": {
                "audio_referencia": ("STRING", {"default": ""}),
                "api_key": ("STRING", {"default": ""}),
                "voz_personalizada": (
                    "STRING",
                    {"default": "", "placeholder": "sobrepoe o combo: nome da voz, voice_id ou .onnx"},
                ),
                "normalizar_loudness": ("BOOLEAN", {"default": True}),
                "lufs_alvo": ("FLOAT", {"default": -16.0, "min": -30.0, "max": -8.0, "step": 0.5}),
                "usar_cache": ("BOOLEAN", {"default": True}),
            },
        }

    def synthesize(
        self,
        segmentos,
        idioma_destino,
        motor,
        voz,
        modo_sincronia,
        aceleracao_maxima,
        desaceleracao_maxima,
        velocidade_pct,
        volume_pct,
        tom_hz,
        audio_referencia="",
        api_key="",
        voz_personalizada="",
        normalizar_loudness=True,
        lufs_alvo=-16.0,
        usar_cache=True,
    ):
        segs = [dict(s) for s in segmentos]
        locale = (idioma_destino or "en-US").strip()
        lang_code = locale.split("-")[0]
        voice = (voz_personalizada or "").strip() or voz
        if motor == "edge_tts":
            voice = pick_voice(locale, voice)

        job = work_dir(
            "tts_"
            + hashlib.sha1(
                ("%s|%s|%s|%s" % (motor, voice, locale, len(segs))).encode("utf-8")
            ).hexdigest()[:12]
        )
        clips_dir = os.path.join(job, "clips")
        os.makedirs(clips_dir, exist_ok=True)

        timeline_end = max(segutil.total_duration(segs), 0.1)
        total_samples = int(timeline_end * media.SR) + media.SR  # folga de 1s no fim
        track = np.zeros(total_samples, dtype=np.float32)

        report = []
        drift = 0.0  # deslocamento acumulado no modo "natural"
        overflow_count = 0

        for index, seg in enumerate(segs):
            text = segutil.target_text(seg)
            if not text:
                continue

            clip_wav = os.path.join(
                clips_dir,
                "%04d_%s.wav"
                % (index, hashlib.sha1(text.encode("utf-8")).hexdigest()[:10]),
            )
            if not (usar_cache and os.path.exists(clip_wav) and os.path.getsize(clip_wav) > 512):
                self._synth_one(
                    text,
                    clip_wav,
                    motor,
                    voice,
                    lang_code,
                    audio_referencia,
                    api_key,
                    velocidade_pct,
                    volume_pct,
                    tom_hz,
                )

            raw_dur = media.duration_of(clip_wav)
            target_dur = segutil.duration(seg)
            if raw_dur <= 0.01:
                continue

            ratio = 1.0
            if modo_sincronia == "encaixar_no_tempo" and target_dur > 0.05:
                desired = raw_dur / target_dur
                ratio = min(max(desired, desaceleracao_maxima), aceleracao_maxima)
                if desired > aceleracao_maxima:
                    overflow_count += 1

            if abs(ratio - 1.0) > 1e-3:
                fitted = clip_wav.replace(".wav", "_fit.wav")
                media.time_stretch(clip_wav, fitted, ratio)
                samples = media.read_wav(fitted)
            else:
                samples = media.read_wav(clip_wav)

            samples = media.apply_fades(samples)
            final_dur = len(samples) / float(media.SR)

            if modo_sincronia == "natural_com_deslocamento":
                start = float(seg["start"]) + drift
                drift = max(0.0, drift + (final_dur - target_dur))
            else:
                start = float(seg["start"])

            offset = int(start * media.SR)
            if offset + len(samples) > len(track):
                track = np.concatenate(
                    [
                        track,
                        np.zeros(offset + len(samples) - len(track) + media.SR, dtype=np.float32),
                    ]
                )
            track[offset : offset + len(samples)] += samples

            seg["dub_start"] = round(start, 3)
            seg["dub_end"] = round(start + final_dur, 3)
            seg["dub_speed"] = round(ratio, 3)
            report.append(
                "[%03d] alvo %5.2fs | voz %5.2fs | fator %.2fx%s"
                % (
                    index,
                    target_dur,
                    final_dur,
                    ratio,
                    "  <-- estourou o tempo" if (modo_sincronia == "encaixar_no_tempo" and final_dur > target_dur + 0.25) else "",
                )
            )

        peak = float(np.max(np.abs(track))) if len(track) else 0.0
        if peak > 1.0:
            track = track / peak * 0.98

        dub_path = os.path.join(job, "dub_track.wav")
        media.write_wav(dub_path, track)

        if normalizar_loudness:
            normalized = os.path.join(job, "dub_track_norm.wav")
            media.loudnorm(dub_path, normalized, target_lufs=float(lufs_alvo))
            dub_path = normalized

        header = [
            "Motor: %s | Voz: %s | Idioma: %s" % (motor, voice, locale),
            "Falas sintetizadas: %d" % len(report),
        ]
        if overflow_count:
            header.append(
                "Atencao: %d falas sao longas demais para a janela original. "
                "Aumente 'aceleracao_maxima', reduza a 'tolerancia_comprimento_pct' da traducao "
                "ou use o modo 'natural_com_deslocamento'." % overflow_count
            )
        header.append("-" * 60)

        return (dub_path, segs, "\n".join(header + report))

    def _synth_one(
        self,
        text,
        out_wav,
        motor,
        voice,
        lang_code,
        reference,
        api_key,
        rate_pct,
        volume_pct,
        pitch_hz,
    ):
        tmp = out_wav + ".src"
        if motor == "edge_tts":
            _synth_edge(text, voice, tmp + ".mp3", rate_pct, volume_pct, pitch_hz)
            media.to_wav(tmp + ".mp3", out_wav)
        elif motor == "xtts_v2_clonagem":
            speed = 1.0 + (rate_pct / 100.0)
            _synth_xtts(text, tmp + ".wav", lang_code, reference, speed=speed)
            media.to_wav(tmp + ".wav", out_wav)
        elif motor == "piper":
            _synth_piper(text, tmp + ".wav", voice)
            media.to_wav(tmp + ".wav", out_wav)
        elif motor == "openai_tts":
            _synth_openai(text, tmp + ".mp3", voice, api_key)
            media.to_wav(tmp + ".mp3", out_wav)
        else:
            _synth_elevenlabs(text, tmp + ".mp3", voice, api_key)
            media.to_wav(tmp + ".mp3", out_wav)
        for leftover in (tmp + ".mp3", tmp + ".wav"):
            if os.path.exists(leftover):
                try:
                    os.remove(leftover)
                except OSError:
                    pass
        return out_wav


class DubListVoices:
    """Lista as vozes neurais realmente disponiveis para um idioma."""

    CATEGORY = "Dublagem IA/4. Voz"
    FUNCTION = "run"
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("vozes",)
    OUTPUT_NODE = True

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "locale": ("STRING", {"default": "pt-BR"}),
                "consultar_servico": ("BOOLEAN", {"default": True}),
            }
        }

    def run(self, locale, consultar_servico):
        from ..utils.voices import refresh_dynamic_voices, voices_for_locale

        found = list(voices_for_locale(locale))
        if consultar_servico:
            for voice in refresh_dynamic_voices():
                if voice.lower().startswith(locale.lower() + "-") and voice not in found:
                    found.append(voice)
        text = "\n".join(found) or "Nenhuma voz encontrada para '%s'." % locale
        return {"ui": {"text": [text]}, "result": (text,)}


NODE_CLASS_MAPPINGS = {
    "DubNeuralTTS": DubNeuralTTS,
    "DubListVoices": DubListVoices,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DubNeuralTTS": "4. Voz Neural + Sincronia",
    "DubListVoices": "Listar Vozes Neurais",
}
