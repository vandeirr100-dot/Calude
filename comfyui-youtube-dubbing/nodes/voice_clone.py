"""Preparo de amostras de voz para clonagem e biblioteca de vozes salvas."""

import hashlib
import os
import shutil

import numpy as np

from ..utils import media
from ..utils.paths import ffmpeg_bin, input_dir, models_root, work_dir

AUDIO_EXTS = (".wav", ".mp3", ".m4a", ".flac", ".ogg", ".opus", ".aac", ".wma")
VIDEO_EXTS = (".mp4", ".mkv", ".webm", ".mov", ".avi", ".m4v")

# XTTS-v2 trabalha bem com referencias de 24 kHz
REF_SR = 24000
MIN_SECONDS = 4.0


def profiles_dir():
    path = os.path.join(models_root(), "vozes_clonadas")
    os.makedirs(path, exist_ok=True)
    return path


def list_profiles():
    found = [
        os.path.splitext(name)[0]
        for name in sorted(os.listdir(profiles_dir()))
        if name.lower().endswith(".wav")
    ]
    return found or ["<nenhuma voz salva>"]


def _resolve_source(path):
    """Aceita caminho absoluto ou nome de arquivo dentro de ComfyUI/input."""
    raw = (path or "").strip().strip('"').strip("'")
    if not raw:
        return ""
    candidate = os.path.abspath(os.path.expanduser(raw))
    if os.path.exists(candidate):
        return candidate
    inside = os.path.join(input_dir(), raw)
    if os.path.exists(inside):
        return inside
    return candidate  # devolve mesmo assim para a mensagem de erro citar o caminho


def _best_window(samples, window_samples):
    """Trecho continuo com mais energia: evita pegar silencio ou respiracao."""
    if len(samples) <= window_samples:
        return 0
    step = max(1, REF_SR // 4)
    best_start, best_score = 0, -1.0
    for start in range(0, len(samples) - window_samples + 1, step):
        chunk = samples[start : start + window_samples]
        # energia media penalizada por picos (clipping/estalos)
        score = float(np.mean(np.abs(chunk))) - 0.3 * float(np.mean(np.abs(chunk) > 0.98))
        if score > best_score:
            best_score, best_start = score, start
    return best_start


class DubVoiceSample:
    """Prepara um audio de exemplo para clonagem e, se quiser, salva como perfil."""

    CATEGORY = "Dublagem IA/4. Voz"
    FUNCTION = "prepare"
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("audio_referencia", "info")
    OUTPUT_NODE = True
    DESCRIPTION = (
        "Escolha um audio (ou video) com a voz que deseja clonar. O no limpa, recorta o "
        "melhor trecho e devolve a referencia para o no 4 com motor 'xtts_v2_clonagem'."
    )

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "origem": (["arquivo_novo", "voz_salva"], {"default": "arquivo_novo"}),
                "caminho_do_audio": (
                    "STRING",
                    {
                        "default": "",
                        "placeholder": r"C:\Users\voce\Musica\minha_voz.mp3",
                        "tooltip": (
                            "Caminho completo de um audio ou video com a voz a clonar. "
                            "Tambem aceita o nome de um arquivo da pasta ComfyUI/input."
                        ),
                    },
                ),
                "voz_salva": (list_profiles(), {"tooltip": "Usado quando origem = voz_salva."}),
                "duracao_alvo_s": (
                    "FLOAT",
                    {
                        "default": 18.0,
                        "min": 4.0,
                        "max": 60.0,
                        "step": 1.0,
                        "tooltip": "Entre 10 e 25 segundos costuma dar o melhor resultado.",
                    },
                ),
                "remover_silencio": ("BOOLEAN", {"default": True}),
                "normalizar": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "salvar_como": (
                    "STRING",
                    {
                        "default": "",
                        "placeholder": "nome do perfil (ex.: minha_voz)",
                        "tooltip": "Preenchido, salva a voz na biblioteca para reutilizar depois.",
                    },
                ),
                "inicio_manual_s": (
                    "FLOAT",
                    {
                        "default": -1.0,
                        "min": -1.0,
                        "max": 86400.0,
                        "step": 0.5,
                        "tooltip": "-1 = escolhe o melhor trecho automaticamente.",
                    },
                ),
            },
        }

    def prepare(
        self,
        origem,
        caminho_do_audio,
        voz_salva,
        duracao_alvo_s,
        remover_silencio,
        normalizar,
        salvar_como="",
        inicio_manual_s=-1.0,
    ):
        if origem == "voz_salva":
            if not voz_salva or voz_salva.startswith("<"):
                raise RuntimeError(
                    "Nenhuma voz salva ainda. Use origem = 'arquivo_novo', escolha um audio "
                    "e preencha 'salvar_como' para criar a primeira."
                )
            path = os.path.join(profiles_dir(), voz_salva + ".wav")
            if not os.path.exists(path):
                raise RuntimeError("Perfil de voz nao encontrado: %s" % path)
            info = "Voz salva: %s (%.1fs)" % (voz_salva, media.duration_of(path))
            return {"ui": {"text": [info]}, "result": (path, info)}

        source = _resolve_source(caminho_do_audio)
        if not source:
            raise RuntimeError(
                "Informe em 'caminho_do_audio' o arquivo com a voz a ser clonada.\n"
                "Pode ser um audio (.wav/.mp3/.m4a) ou um video - o audio e extraido."
            )
        if not os.path.exists(source):
            raise RuntimeError("Arquivo nao encontrado: %s" % source)

        job = work_dir("voz_" + hashlib.sha1(source.encode("utf-8")).hexdigest()[:12])
        raw = os.path.join(job, "origem.wav")
        media.to_wav(source, raw, sample_rate=REF_SR, mono=True)

        total = media.duration_of(raw)
        if total < MIN_SECONDS:
            raise RuntimeError(
                "O audio tem apenas %.1fs. Para clonar bem, use pelo menos %.0fs de fala "
                "limpa (o ideal fica entre 10 e 25s)." % (total, MIN_SECONDS)
            )

        trabalhado = raw
        avisos = []

        if remover_silencio:
            compacto = os.path.join(job, "sem_silencio.wav")
            try:
                media.run(
                    [
                        ffmpeg_bin(),
                        "-y",
                        "-hide_banner",
                        "-loglevel",
                        "error",
                        "-i",
                        raw,
                        "-af",
                        "silenceremove=start_periods=1:start_duration=0.1:start_threshold=-45dB:"
                        "stop_periods=-1:stop_duration=0.6:stop_threshold=-45dB",
                        "-ar",
                        str(REF_SR),
                        "-ac",
                        "1",
                        compacto,
                    ],
                    "remocao de silencio",
                )
                if media.duration_of(compacto) >= MIN_SECONDS:
                    trabalhado = compacto
                else:
                    avisos.append(
                        "Sobrou pouca fala apos remover o silencio; usando o audio original."
                    )
            except Exception:
                avisos.append("Nao foi possivel remover o silencio; seguindo com o audio original.")

        samples = media.read_wav(trabalhado, sample_rate=REF_SR)
        window = int(float(duracao_alvo_s) * REF_SR)

        if inicio_manual_s is not None and inicio_manual_s >= 0:
            start = int(float(inicio_manual_s) * REF_SR)
            if start >= len(samples):
                raise RuntimeError(
                    "'inicio_manual_s' (%.1fs) passa do fim do audio (%.1fs)."
                    % (inicio_manual_s, len(samples) / REF_SR)
                )
        else:
            start = _best_window(samples, window)

        trecho = samples[start : start + window]
        if len(trecho) < MIN_SECONDS * REF_SR:
            trecho = samples[-int(MIN_SECONDS * REF_SR) :]

        clipping = float(np.mean(np.abs(trecho) > 0.98))
        if clipping > 0.01:
            avisos.append(
                "O audio tem picos saturados (%.1f%% das amostras); a clonagem pode sair "
                "distorcida." % (clipping * 100)
            )
        if float(np.mean(np.abs(trecho))) < 0.01:
            avisos.append("O trecho escolhido esta muito baixo; confira o volume da gravacao.")

        trecho = media.apply_fades(trecho, fade_ms=30, sample_rate=REF_SR)
        referencia = os.path.join(job, "referencia.wav")
        media.write_wav(referencia, trecho, sample_rate=REF_SR)

        if normalizar:
            normalizada = os.path.join(job, "referencia_norm.wav")
            try:
                media.loudnorm(referencia, normalizada, target_lufs=-20.0)
                referencia = normalizada
            except Exception:
                avisos.append("Normalizacao falhou; usando o audio sem normalizar.")

        salvo = ""
        nome = (salvar_como or "").strip()
        if nome:
            seguro = "".join(c for c in nome if c.isalnum() or c in "-_ ").strip().replace(" ", "_")
            if not seguro:
                raise RuntimeError("'salvar_como' precisa ter letras ou numeros.")
            salvo = os.path.join(profiles_dir(), seguro + ".wav")
            shutil.copy2(referencia, salvo)
            referencia = salvo

        linhas = [
            "Referencia pronta: %.1fs (de %.1fs do original)"
            % (media.duration_of(referencia), total),
            "Trecho usado: a partir de %.1fs" % (start / REF_SR),
            "Arquivo: %s" % referencia,
        ]
        if salvo:
            linhas.append("Salva na biblioteca como '%s' - recarregue a pagina para ve-la na lista."
                          % os.path.splitext(os.path.basename(salvo))[0])
        if avisos:
            linhas.append("")
            linhas.extend("Aviso: " + a for a in avisos)

        info = "\n".join(linhas)
        return {"ui": {"text": [info]}, "result": (referencia, info)}

    @classmethod
    def IS_CHANGED(cls, origem, caminho_do_audio, voz_salva, **kwargs):
        return "%s|%s|%s|%s" % (
            origem,
            caminho_do_audio,
            voz_salva,
            kwargs.get("salvar_como", ""),
        )


NODE_CLASS_MAPPINGS = {"DubVoiceSample": DubVoiceSample}
NODE_DISPLAY_NAME_MAPPINGS = {"DubVoiceSample": "4a. Amostra de Voz (clonagem)"}
