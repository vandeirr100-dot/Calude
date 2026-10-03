"""Wrappers de ffmpeg/ffprobe e manipulacao de audio em numpy."""

import json
import os
import subprocess

import numpy as np

from .paths import ffmpeg_bin, ffprobe_bin, has_filter

SR = 48000  # taxa de amostragem interna do pipeline


def run(cmd, desc="comando"):
    """Executa um comando capturando stderr para mensagens de erro uteis."""
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        tail = (proc.stderr or "").strip().splitlines()[-15:]
        raise RuntimeError(
            "Falha ao executar %s (codigo %d):\n%s" % (desc, proc.returncode, "\n".join(tail))
        )
    return proc.stdout


def probe(path):
    out = run(
        [
            ffprobe_bin(),
            "-v",
            "error",
            "-print_format",
            "json",
            "-show_format",
            "-show_streams",
            path,
        ],
        "ffprobe",
    )
    return json.loads(out)


def duration_of(path):
    info = probe(path)
    dur = info.get("format", {}).get("duration")
    if dur:
        return float(dur)
    for stream in info.get("streams", []):
        if stream.get("duration"):
            return float(stream["duration"])
    return 0.0


def has_audio_stream(path):
    try:
        for stream in probe(path).get("streams", []):
            if stream.get("codec_type") == "audio":
                return True
    except Exception:
        pass
    return False


def extract_audio(video_path, out_wav, sample_rate=SR, mono=True):
    """Extrai a trilha de audio de um video para WAV PCM."""
    cmd = [
        ffmpeg_bin(),
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        video_path,
        "-vn",
        "-acodec",
        "pcm_s16le",
        "-ar",
        str(sample_rate),
        "-ac",
        "1" if mono else "2",
        out_wav,
    ]
    run(cmd, "extracao de audio")
    return out_wav


def to_wav(src, out_wav, sample_rate=SR, mono=True):
    """Converte qualquer audio (mp3/ogg/webm/...) para WAV PCM normalizado."""
    return extract_audio(src, out_wav, sample_rate=sample_rate, mono=mono)


def read_wav(path, sample_rate=SR, mono=True):
    """Le um arquivo de audio como float32 normalizado via pipe do ffmpeg."""
    cmd = [
        ffmpeg_bin(),
        "-v",
        "error",
        "-i",
        path,
        "-f",
        "f32le",
        "-acodec",
        "pcm_f32le",
        "-ar",
        str(sample_rate),
        "-ac",
        "1" if mono else "2",
        "-",
    ]
    proc = subprocess.run(cmd, capture_output=True)
    if proc.returncode != 0:
        tail = (proc.stderr or b"").decode("utf-8", "ignore").strip().splitlines()[-10:]
        raise RuntimeError("Falha ao decodificar '%s':\n%s" % (path, "\n".join(tail)))
    data = np.frombuffer(proc.stdout, dtype=np.float32)
    if not mono:
        data = data.reshape(-1, 2)
    return data.copy()


def write_wav(path, samples, sample_rate=SR):
    """Grava float32 (mono ou Nx2) em WAV 16 bits."""
    samples = np.asarray(samples, dtype=np.float32)
    channels = 2 if samples.ndim == 2 else 1
    payload = np.clip(samples, -1.0, 1.0).astype(np.float32).tobytes()
    cmd = [
        ffmpeg_bin(),
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "f32le",
        "-ar",
        str(sample_rate),
        "-ac",
        str(channels),
        "-i",
        "-",
        "-acodec",
        "pcm_s16le",
        path,
    ]
    proc = subprocess.run(cmd, input=payload, capture_output=True)
    if proc.returncode != 0:
        tail = (proc.stderr or b"").decode("utf-8", "ignore").strip().splitlines()[-10:]
        raise RuntimeError("Falha ao gravar '%s':\n%s" % (path, "\n".join(tail)))
    return path


def atempo_chain(ratio):
    """atempo aceita 0.5..100; divide em estagios para manter a qualidade."""
    stages = []
    remaining = float(ratio)
    while remaining > 2.0:
        stages.append(2.0)
        remaining /= 2.0
    while remaining < 0.5:
        stages.append(0.5)
        remaining /= 0.5
    stages.append(remaining)
    return ",".join("atempo=%.6f" % s for s in stages)


def time_stretch(src, dst, ratio, preserve_pitch=True):
    """Altera a velocidade por 'ratio' (>1 acelera) mantendo o tom."""
    if abs(ratio - 1.0) < 1e-3:
        if os.path.abspath(src) != os.path.abspath(dst):
            to_wav(src, dst)
        return dst
    if preserve_pitch and has_filter("rubberband"):
        # rubberband usa "tempo": >1 acelera, com pitch preservado de alta qualidade
        afilter = "rubberband=tempo=%.6f:pitchq=quality" % ratio
    else:
        afilter = atempo_chain(ratio)
    run(
        [
            ffmpeg_bin(),
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            src,
            "-filter:a",
            afilter,
            "-acodec",
            "pcm_s16le",
            "-ar",
            str(SR),
            "-ac",
            "1",
            dst,
        ],
        "time-stretch",
    )
    return dst


def loudnorm(src, dst, target_lufs=-16.0, true_peak=-1.5):
    """Normalizacao de loudness em dois passes (padrao de broadcast/streaming)."""
    measure = subprocess.run(
        [
            ffmpeg_bin(),
            "-hide_banner",
            "-i",
            src,
            "-af",
            "loudnorm=I=%.1f:TP=%.1f:LRA=11:print_format=json" % (target_lufs, true_peak),
            "-f",
            "null",
            "-",
        ],
        capture_output=True,
        text=True,
    )
    stats = {}
    err = measure.stderr or ""
    start = err.rfind("{")
    end = err.rfind("}")
    if start != -1 and end > start:
        try:
            stats = json.loads(err[start : end + 1])
        except Exception:
            stats = {}
    if stats.get("input_i") and stats.get("input_i") not in ("-inf", "inf"):
        af = (
            "loudnorm=I=%.1f:TP=%.1f:LRA=11:measured_I=%s:measured_TP=%s:"
            "measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true"
            % (
                target_lufs,
                true_peak,
                stats["input_i"],
                stats["input_tp"],
                stats["input_lra"],
                stats["input_thresh"],
                stats.get("target_offset", "0.0"),
            )
        )
    else:
        af = "loudnorm=I=%.1f:TP=%.1f:LRA=11" % (target_lufs, true_peak)
    run(
        [
            ffmpeg_bin(),
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            src,
            "-af",
            af,
            "-acodec",
            "pcm_s16le",
            "-ar",
            str(SR),
            dst,
        ],
        "loudnorm",
    )
    return dst


def db_to_gain(db):
    return float(10.0 ** (float(db) / 20.0))


def fit_length(samples, n):
    """Corta ou preenche com silencio para exatamente n amostras."""
    samples = np.asarray(samples, dtype=np.float32)
    if len(samples) == n:
        return samples
    if len(samples) > n:
        return samples[:n]
    return np.concatenate([samples, np.zeros(n - len(samples), dtype=np.float32)])


def apply_fades(samples, fade_ms=15, sample_rate=SR):
    """Fade-in/out curto para evitar cliques nas emendas."""
    samples = np.asarray(samples, dtype=np.float32).copy()
    n = int(sample_rate * fade_ms / 1000.0)
    n = min(n, len(samples) // 2)
    if n <= 0:
        return samples
    ramp = np.linspace(0.0, 1.0, n, dtype=np.float32)
    samples[:n] *= ramp
    samples[-n:] *= ramp[::-1]
    return samples
