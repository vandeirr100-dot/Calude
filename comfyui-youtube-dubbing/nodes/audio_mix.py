"""Separacao da trilha original e mixagem final da dublagem."""

import glob
import hashlib
import os
import subprocess
import sys

import numpy as np

from ..utils import media
from ..utils.paths import ffmpeg_bin, find_binary, work_dir

SEPARATION_METHODS = ["demucs", "ffmpeg_centro", "nenhuma"]


class DubSeparateAudio:
    """Separa voz e fundo (musica/efeitos) para preservar a trilha sonora original."""

    CATEGORY = "Dublagem IA/5. Mixagem"
    FUNCTION = "separate"
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("fundo_audio_path", "voz_referencia")
    DESCRIPTION = (
        "Isola musica/efeitos da fala original. O fundo volta na mixagem e a voz isolada "
        "serve de referencia para clonagem de voz."
    )

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_path": ("STRING", {"forceInput": True}),
                "metodo": (SEPARATION_METHODS, {"default": "demucs"}),
            },
            "optional": {
                "modelo_demucs": (["htdemucs", "htdemucs_ft", "mdx_extra"], {"default": "htdemucs"}),
                "usar_cache": ("BOOLEAN", {"default": True}),
                "duracao_referencia_s": (
                    "FLOAT",
                    {"default": 15.0, "min": 3.0, "max": 60.0, "step": 1.0},
                ),
            },
        }

    def separate(
        self,
        audio_path,
        metodo,
        modelo_demucs="htdemucs",
        usar_cache=True,
        duracao_referencia_s=15.0,
    ):
        if not audio_path or not os.path.exists(audio_path):
            raise RuntimeError("Audio nao encontrado: %r" % audio_path)

        job = work_dir(
            "sep_" + hashlib.sha1((audio_path + metodo).encode("utf-8")).hexdigest()[:12]
        )
        background = os.path.join(job, "fundo.wav")
        vocals = os.path.join(job, "voz.wav")

        cached = all(os.path.exists(p) and os.path.getsize(p) > 1024 for p in (background, vocals))
        if usar_cache and cached:
            return (background, self._reference(vocals, job, duracao_referencia_s))

        if metodo == "nenhuma":
            silence = np.zeros(int(media.duration_of(audio_path) * media.SR), dtype=np.float32)
            media.write_wav(background, silence)
            media.to_wav(audio_path, vocals)
        elif metodo == "demucs":
            self._demucs(audio_path, job, background, vocals, modelo_demucs)
        else:
            self._ffmpeg_center(audio_path, background, vocals)

        return (background, self._reference(vocals, job, duracao_referencia_s))

    def _demucs(self, audio_path, job, background, vocals, model):
        exe = find_binary("demucs")
        cmd = [exe] if exe else [sys.executable, "-m", "demucs"]
        out_dir = os.path.join(job, "demucs")
        args = cmd + ["-n", model, "--two-stems", "vocals", "-o", out_dir, audio_path]
        proc = subprocess.run(args, capture_output=True, text=True)
        if proc.returncode != 0:
            tail = (proc.stderr or proc.stdout or "").strip().splitlines()[-10:]
            raise RuntimeError(
                "demucs falhou:\n%s\n\nInstale com 'pip install -U demucs' ou troque o "
                "'metodo' para 'ffmpeg_centro'/'nenhuma'." % "\n".join(tail)
            )
        found_vocals = glob.glob(os.path.join(out_dir, "**", "vocals.*"), recursive=True)
        found_other = glob.glob(os.path.join(out_dir, "**", "no_vocals.*"), recursive=True)
        if not found_vocals or not found_other:
            raise RuntimeError("demucs rodou mas as faixas separadas nao foram encontradas.")
        media.to_wav(found_other[0], background, mono=False)
        media.to_wav(found_vocals[0], vocals)

    def _ffmpeg_center(self, audio_path, background, vocals):
        """Remocao do canal central: aproximacao rapida, so funciona em estereo."""
        media.run(
            [
                ffmpeg_bin(),
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-i",
                audio_path,
                "-af",
                "pan=stereo|c0=c0-0.5*c1|c1=c1-0.5*c0",
                "-acodec",
                "pcm_s16le",
                "-ar",
                str(media.SR),
                background,
            ],
            "remocao do canal central",
        )
        media.to_wav(audio_path, vocals)

    def _reference(self, vocals, job, seconds):
        """Recorta o trecho mais energico da voz: referencia ideal para clonagem."""
        ref = os.path.join(job, "referencia.wav")
        try:
            samples = media.read_wav(vocals)
            window = int(seconds * media.SR)
            if len(samples) <= window:
                media.write_wav(ref, samples)
                return ref
            step = media.SR  # avalia janela a cada 1s
            best_start, best_energy = 0, -1.0
            for start in range(0, len(samples) - window, step):
                energy = float(np.mean(np.abs(samples[start : start + window])))
                if energy > best_energy:
                    best_energy, best_start = energy, start
            media.write_wav(ref, samples[best_start : best_start + window])
            return ref
        except Exception:
            return vocals


class DubMixAudio:
    """Mixa a voz dublada com a trilha de fundo, com ducking automatico."""

    CATEGORY = "Dublagem IA/5. Mixagem"
    FUNCTION = "mix"
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("audio_final_path",)
    DESCRIPTION = "Combina voz dublada + musica/efeitos originais em uma trilha pronta."

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dub_audio_path": ("STRING", {"forceInput": True}),
                "ganho_dub_db": ("FLOAT", {"default": 0.0, "min": -24.0, "max": 12.0, "step": 0.5}),
                "ganho_fundo_db": (
                    "FLOAT",
                    {"default": -6.0, "min": -40.0, "max": 6.0, "step": 0.5},
                ),
                "ducking_db": ("FLOAT", {"default": -8.0, "min": -30.0, "max": 0.0, "step": 0.5}),
                "saida_estereo": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "fundo_audio_path": ("STRING", {"default": ""}),
                "audio_original_path": ("STRING", {"default": ""}),
                "ganho_original_db": (
                    "FLOAT",
                    {"default": -60.0, "min": -60.0, "max": 0.0, "step": 1.0},
                ),
                "lufs_alvo": ("FLOAT", {"default": -14.0, "min": -30.0, "max": -8.0, "step": 0.5}),
                "normalizar": ("BOOLEAN", {"default": True}),
            },
        }

    def mix(
        self,
        dub_audio_path,
        ganho_dub_db,
        ganho_fundo_db,
        ducking_db,
        saida_estereo,
        fundo_audio_path="",
        audio_original_path="",
        ganho_original_db=-60.0,
        lufs_alvo=-14.0,
        normalizar=True,
    ):
        if not dub_audio_path or not os.path.exists(dub_audio_path):
            raise RuntimeError("Trilha dublada nao encontrada: %r" % dub_audio_path)

        job = work_dir(
            "mix_" + hashlib.sha1(dub_audio_path.encode("utf-8")).hexdigest()[:12]
        )
        dub = media.read_wav(dub_audio_path)
        length = len(dub)

        layers = [dub * media.db_to_gain(ganho_dub_db)]

        envelope = None
        if fundo_audio_path and os.path.exists(fundo_audio_path) and ganho_fundo_db > -39.5:
            background = media.read_wav(fundo_audio_path)
            length = max(length, len(background))
            dub = media.fit_length(dub, length)
            layers = [dub * media.db_to_gain(ganho_dub_db)]
            background = media.fit_length(background, length)
            if ducking_db < -0.1:
                envelope = self._ducking_envelope(dub, ducking_db)
                background = background * envelope
            layers.append(background * media.db_to_gain(ganho_fundo_db))

        if (
            audio_original_path
            and os.path.exists(audio_original_path)
            and ganho_original_db > -59.5
        ):
            original = media.fit_length(media.read_wav(audio_original_path), length)
            if envelope is not None:
                original = original * envelope
            layers.append(original * media.db_to_gain(ganho_original_db))

        mixed = np.zeros(length, dtype=np.float32)
        for layer in layers:
            mixed += media.fit_length(layer, length)

        peak = float(np.max(np.abs(mixed))) if length else 0.0
        if peak > 0.99:
            mixed = mixed / peak * 0.99

        if saida_estereo:
            mixed = np.stack([mixed, mixed], axis=1)

        out = os.path.join(job, "mix.wav")
        media.write_wav(out, mixed)

        if normalizar:
            normalized = os.path.join(job, "mix_norm.wav")
            media.loudnorm(out, normalized, target_lufs=float(lufs_alvo))
            out = normalized
        return (out,)

    @staticmethod
    def _ducking_envelope(voice, duck_db, attack_ms=120, release_ms=400, threshold=0.012):
        """Envelope que abaixa o fundo quando a voz esta presente.

        Calculado em blocos de 10 ms e interpolado de volta para a taxa de
        amostragem - ordens de magnitude mais rapido que varrer amostra a amostra,
        com o mesmo resultado audivel.
        """
        if len(voice) == 0:
            return np.ones(0, dtype=np.float32)

        block = max(1, int(media.SR * 0.01))  # 10 ms
        blocks = int(np.ceil(len(voice) / float(block)))
        padded = media.fit_length(np.abs(voice), blocks * block)
        level = padded.reshape(blocks, block).max(axis=1)
        active = level > threshold

        floor = media.db_to_gain(duck_db)

        # dilata a mascara para antecipar o ataque e sustentar a soltura
        pre = max(1, int(round(attack_ms / 10.0)))
        post = max(1, int(round(release_ms / 10.0)))
        if active.any():
            dilated = np.zeros(blocks, dtype=bool)
            idx = np.flatnonzero(active)
            for shift in range(-pre, post + 1):
                shifted = np.clip(idx + shift, 0, blocks - 1)
                dilated[shifted] = True
            active = dilated

        gains = np.where(active, floor, 1.0).astype(np.float32)

        # suaviza as transicoes (media movel) para nao haver salto de ganho
        smooth_len = max(3, pre + post)
        kernel = np.ones(smooth_len, dtype=np.float32) / smooth_len
        gains = np.convolve(
            np.pad(gains, (smooth_len, smooth_len), mode="edge"), kernel, mode="same"
        )[smooth_len:-smooth_len]

        envelope = np.interp(
            np.arange(len(voice), dtype=np.float32) / block,
            np.arange(blocks, dtype=np.float32),
            gains,
        ).astype(np.float32)
        return envelope


NODE_CLASS_MAPPINGS = {
    "DubSeparateAudio": DubSeparateAudio,
    "DubMixAudio": DubMixAudio,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DubSeparateAudio": "5a. Separar Voz / Musica de Fundo",
    "DubMixAudio": "5b. Mixar Dublagem + Fundo",
}
