"""Nos de entrada: baixar do YouTube ou usar um video local."""

import glob
import hashlib
import json
import os
import re
import subprocess

from ..utils import media
from ..utils.paths import cache_dir, find_binary, input_dir, work_dir

VIDEO_EXTS = (".mp4", ".mkv", ".webm", ".mov", ".avi", ".m4v", ".flv", ".ts", ".mpg", ".mpeg")

_URL_RE = re.compile(
    r"^(https?://)?(www\.|m\.|music\.)?"
    r"(youtube\.com/(watch\?|shorts/|live/|embed/|playlist\?)|youtu\.be/)",
    re.IGNORECASE,
)


def is_youtube_url(url):
    return bool(_URL_RE.match((url or "").strip()))


# Mesmo motivo do no de voz: o placeholder tem de estar SEMPRE na lista. Se ele
# sumisse ao aparecer o primeiro video em input/, qualquer workflow gravado com
# ele passaria a ser recusado com "Value not in list".
SEM_VIDEO = "<nenhum - usar link ou caminho absoluto>"


def list_input_videos():
    found = []
    base = input_dir()
    for ext in VIDEO_EXTS:
        for path in glob.glob(os.path.join(base, "**", "*" + ext), recursive=True):
            found.append(os.path.relpath(path, base))
    return [SEM_VIDEO] + sorted(found)


def _ytdlp_cmd():
    found = find_binary("yt-dlp", extra_names=("yt_dlp", "youtube-dl"))
    if found:
        return [found]
    try:
        import yt_dlp  # noqa: F401  (confirma que o modulo existe)

        import sys

        return [sys.executable, "-m", "yt_dlp"]
    except Exception:
        return None


def _job_key(url, max_resolution):
    digest = hashlib.sha1(("%s|%s" % (url, max_resolution)).encode("utf-8")).hexdigest()[:12]
    return "yt_" + digest


def _format_selector(max_resolution):
    if max_resolution == "best":
        return "bv*+ba/b"
    height = int(max_resolution)
    return (
        "bv*[height<=%d][ext=mp4]+ba[ext=m4a]/bv*[height<=%d]+ba/b[height<=%d]/b"
        % (height, height, height)
    )


class YouTubeDubSource:
    """Resolve a midia de entrada: baixa do YouTube ou le um arquivo local."""

    CATEGORY = "Dublagem IA/1. Entrada"
    FUNCTION = "load"
    RETURN_TYPES = ("STRING", "STRING", "STRING", "FLOAT", "STRING")
    RETURN_NAMES = ("video_path", "audio_path", "titulo", "duracao_s", "info")
    DESCRIPTION = (
        "Cole o link do YouTube OU use um video local. Para arquivo local, prefira "
        "'caminho_absoluto' ou copie o video para ComfyUI/input: o botao de upload passa "
        "pelo servidor e falha com 'Request Entity Too Large' em videos grandes."
    )

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "modo": (
                    ["youtube_url", "arquivo_local"],
                    {
                        "default": "youtube_url",
                        "tooltip": "youtube_url: baixa pelo link. arquivo_local: usa um video do seu computador.",
                    },
                ),
                "youtube_url": (
                    "STRING",
                    {
                        "default": "",
                        "multiline": False,
                        "placeholder": "https://www.youtube.com/watch?v=...",
                        "tooltip": "So e usado quando modo = youtube_url.",
                    },
                ),
                "arquivo_local": (
                    list_input_videos(),
                    {
                        "video_upload": True,
                        "tooltip": (
                            "Lista os videos de ComfyUI/input. O botao de upload serve apenas "
                            "para arquivos pequenos: o ComfyUI limita o tamanho do envio "
                            "(erro 413). Para videos grandes, copie o arquivo para a pasta "
                            "ComfyUI/input e recarregue a pagina, ou use 'caminho_absoluto'."
                        ),
                    },
                ),
                "resolucao_maxima": (["1080", "720", "480", "best"], {"default": "1080"}),
                "usar_cache": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "caminho_absoluto": (
                    "STRING",
                    {
                        "default": "",
                        "placeholder": r"C:\Users\voce\Videos\meu_video.mp4 (opcional)",
                        "tooltip": (
                            "Caminho completo do video no disco. Tem prioridade sobre "
                            "'arquivo_local' e evita qualquer upload - e o jeito mais "
                            "confiavel para arquivos grandes."
                        ),
                    },
                ),
                "cookies_do_navegador": (
                    ["nenhum", "chrome", "firefox", "edge", "brave", "chromium", "safari"],
                    {"default": "nenhum"},
                ),
                "recorte_inicio_s": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 86400.0, "step": 0.1}),
                "recorte_duracao_s": (
                    "FLOAT",
                    {"default": 0.0, "min": 0.0, "max": 86400.0, "step": 0.1},
                ),
            },
        }

    def load(
        self,
        modo,
        youtube_url,
        arquivo_local,
        resolucao_maxima,
        usar_cache,
        caminho_absoluto="",
        cookies_do_navegador="nenhum",
        recorte_inicio_s=0.0,
        recorte_duracao_s=0.0,
    ):
        if modo == "youtube_url":
            video_path, title, info = self._from_youtube(
                youtube_url, resolucao_maxima, usar_cache, cookies_do_navegador
            )
        else:
            video_path, title, info = self._from_local(arquivo_local, caminho_absoluto)

        if recorte_inicio_s > 0 or recorte_duracao_s > 0:
            video_path = self._trim(video_path, recorte_inicio_s, recorte_duracao_s)

        job = work_dir(hashlib.sha1(video_path.encode("utf-8")).hexdigest()[:12])
        audio_path = os.path.join(job, "original.wav")
        if not (usar_cache and os.path.exists(audio_path) and os.path.getsize(audio_path) > 1024):
            if not media.has_audio_stream(video_path):
                raise RuntimeError(
                    "O arquivo '%s' nao tem trilha de audio - nao ha o que dublar." % video_path
                )
            media.extract_audio(video_path, audio_path)

        dur = media.duration_of(video_path)
        return (video_path, audio_path, title, float(dur), json.dumps(info, ensure_ascii=False))

    # ------------------------------------------------------------------ yt ---
    def _from_youtube(self, url, max_resolution, use_cache, cookies):
        url = (url or "").strip()
        if not url:
            raise RuntimeError("Informe o link do YouTube no campo 'youtube_url'.")
        if not is_youtube_url(url):
            # yt-dlp suporta centenas de sites; apenas avisamos e seguimos
            if not url.lower().startswith("http"):
                raise RuntimeError("'%s' nao parece ser uma URL valida." % url)

        cmd = _ytdlp_cmd()
        if not cmd:
            raise RuntimeError(
                "yt-dlp nao encontrado. Instale com: pip install -U yt-dlp "
                "(no mesmo ambiente Python do ComfyUI)."
            )

        key = _job_key(url, max_resolution)
        job = work_dir(key)
        template = os.path.join(job, "source.%(ext)s")

        existing = [p for p in glob.glob(os.path.join(job, "source.*")) if p.endswith(VIDEO_EXTS)]
        info_file = os.path.join(cache_dir(), key + ".info.json")
        if use_cache and existing and os.path.exists(info_file):
            with open(info_file, "r", encoding="utf-8") as handle:
                info = json.load(handle)
            return existing[0], info.get("title", "video"), info

        args = cmd + [
            "--no-playlist",
            "--no-warnings",
            "--newline",
            "-f",
            _format_selector(max_resolution),
            "--merge-output-format",
            "mp4",
            "--write-info-json",
            "-o",
            template,
        ]
        if cookies and cookies != "nenhum":
            args += ["--cookies-from-browser", cookies]
        args.append(url)

        proc = subprocess.run(args, capture_output=True, text=True)
        if proc.returncode != 0:
            tail = (proc.stderr or proc.stdout or "").strip().splitlines()[-12:]
            raise RuntimeError(
                "yt-dlp falhou ao baixar o video:\n%s\n\n"
                "Dicas: atualize com 'pip install -U yt-dlp'; para videos com restricao de "
                "idade/login use a opcao 'cookies_do_navegador'." % "\n".join(tail)
            )

        downloaded = sorted(
            [p for p in glob.glob(os.path.join(job, "source.*")) if p.endswith(VIDEO_EXTS)],
            key=os.path.getmtime,
        )
        if not downloaded:
            raise RuntimeError("O download terminou mas nenhum arquivo de video foi encontrado.")
        video_path = downloaded[-1]

        info = {}
        meta_files = glob.glob(os.path.join(job, "source.info.json"))
        if meta_files:
            try:
                with open(meta_files[0], "r", encoding="utf-8") as handle:
                    raw = json.load(handle)
                info = {
                    "title": raw.get("title"),
                    "id": raw.get("id"),
                    "uploader": raw.get("uploader"),
                    "duration": raw.get("duration"),
                    "language": raw.get("language"),
                    "webpage_url": raw.get("webpage_url"),
                }
            except Exception:
                info = {}
        info.setdefault("title", os.path.splitext(os.path.basename(video_path))[0])
        info["local_path"] = video_path
        with open(info_file, "w", encoding="utf-8") as handle:
            json.dump(info, handle, ensure_ascii=False)
        return video_path, info["title"], info

    # --------------------------------------------------------------- local ---
    def _from_local(self, relative, absolute):
        absolute = (absolute or "").strip()
        if absolute:
            path = os.path.abspath(os.path.expanduser(absolute))
        else:
            if not relative or relative.startswith("<"):
                raise RuntimeError(
                    "Nenhum video local selecionado. Escolha uma destas opcoes:\n"
                    "  1. Preencha 'caminho_absoluto' com o caminho completo do arquivo "
                    "(ex.: C:\\Users\\voce\\Videos\\video.mp4) - recomendado;\n"
                    "  2. Copie o video para a pasta ComfyUI/input, recarregue a pagina "
                    "e selecione-o em 'arquivo_local';\n"
                    "  3. Use 'modo = youtube_url' e cole o link.\n"
                    "O botao de upload so funciona em arquivos pequenos: o ComfyUI limita "
                    "o tamanho do envio (erro 413 - Request Entity Too Large)."
                )
            path = os.path.join(input_dir(), relative)
        if not os.path.exists(path):
            raise RuntimeError("Arquivo nao encontrado: %s" % path)
        title = os.path.splitext(os.path.basename(path))[0]
        return path, title, {"title": title, "local_path": path, "source": "local"}

    # ---------------------------------------------------------------- trim ---
    def _trim(self, video_path, start, dur):
        job = work_dir(hashlib.sha1(("trim" + video_path).encode("utf-8")).hexdigest()[:12])
        out = os.path.join(job, "trimmed.mp4")
        cmd = [find_binary("ffmpeg") or "ffmpeg", "-y", "-hide_banner", "-loglevel", "error"]
        if start > 0:
            cmd += ["-ss", "%.3f" % start]
        cmd += ["-i", video_path]
        if dur > 0:
            cmd += ["-t", "%.3f" % dur]
        cmd += ["-c:v", "libx264", "-crf", "18", "-preset", "veryfast", "-c:a", "aac", out]
        media.run(cmd, "recorte do video")
        return out

    @classmethod
    def IS_CHANGED(cls, modo, youtube_url, arquivo_local, resolucao_maxima, usar_cache, **kwargs):
        if not usar_cache:
            return float("nan")
        return "%s|%s|%s|%s|%s" % (
            modo,
            youtube_url,
            arquivo_local,
            resolucao_maxima,
            kwargs.get("caminho_absoluto", ""),
        )


NODE_CLASS_MAPPINGS = {"YouTubeDubSource": YouTubeDubSource}
NODE_DISPLAY_NAME_MAPPINGS = {"YouTubeDubSource": "1. Fonte do Video (YouTube / Local)"}
