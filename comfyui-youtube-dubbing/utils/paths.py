"""Localizacao de diretorios e binarios usados pelo pacote de dublagem."""

import os
import shutil
import subprocess
import tempfile

_CACHED = {}


def comfy_root():
    """Diretorio raiz do ComfyUI (quando rodando dentro dele)."""
    if "root" in _CACHED:
        return _CACHED["root"]
    root = None
    try:
        import folder_paths  # type: ignore

        root = os.path.dirname(os.path.abspath(folder_paths.__file__))
    except Exception:
        root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    _CACHED["root"] = root
    return root


def input_dir():
    try:
        import folder_paths  # type: ignore

        return folder_paths.get_input_directory()
    except Exception:
        path = os.path.join(comfy_root(), "input")
        os.makedirs(path, exist_ok=True)
        return path


def output_dir():
    try:
        import folder_paths  # type: ignore

        return folder_paths.get_output_directory()
    except Exception:
        path = os.path.join(comfy_root(), "output")
        os.makedirs(path, exist_ok=True)
        return path


def models_root():
    """Pasta de modelos do ComfyUI."""
    try:
        import folder_paths  # type: ignore

        base = folder_paths.models_dir
    except Exception:
        base = os.path.join(comfy_root(), "models")
    os.makedirs(base, exist_ok=True)
    return base


def whisper_models_dir():
    """Onde os modelos do Whisper ficam guardados, de forma PERSISTENTE.

    Nao usar a pasta temp do ComfyUI: ela e limpa a cada inicializacao, o que
    faria o modelo (ate ~1,5 GB) ser baixado de novo toda vez que o ComfyUI abre.
    """
    path = os.path.join(models_root(), "faster-whisper")
    os.makedirs(path, exist_ok=True)
    return path


def _writable(path):
    try:
        os.makedirs(path, exist_ok=True)
        probe = os.path.join(path, ".escrita_ok")
        with open(probe, "w") as handle:
            handle.write("ok")
        os.remove(probe)
        return True
    except Exception:
        return False


def data_root():
    """Raiz persistente dos arquivos de trabalho e do cache.

    Fica fora da pasta temp do ComfyUI justamente para o cache sobreviver a um
    reinicio - e o que torna util reexecutar o workflow sem rebaixar o video nem
    retranscrever o audio. Pode ser apagada a mao quando quiser liberar espaco.
    """
    if "data_root" in _CACHED:
        return _CACHED["data_root"]
    candidates = [
        os.environ.get("COMFY_DUBBING_CACHE", ""),
        os.path.join(comfy_root(), "dublagem_cache"),
        os.path.join(tempfile.gettempdir(), "comfy_dubbing"),
    ]
    chosen = None
    for candidate in candidates:
        if candidate and _writable(candidate):
            chosen = candidate
            break
    chosen = chosen or tempfile.mkdtemp(prefix="comfy_dubbing_")
    _CACHED["data_root"] = chosen
    return chosen


def temp_dir():
    """Mantido por compatibilidade: aponta para a raiz persistente."""
    return data_root()


def work_dir(name):
    """Subpasta de trabalho estavel por job/midia."""
    path = os.path.join(data_root(), name)
    os.makedirs(path, exist_ok=True)
    return path


def cache_dir():
    path = os.path.join(data_root(), "_cache")
    os.makedirs(path, exist_ok=True)
    return path


def find_binary(name, extra_names=()):
    """Procura um executavel no PATH e em locais comuns de instalacao."""
    key = "bin:" + name
    if key in _CACHED:
        return _CACHED[key]
    candidates = [name] + list(extra_names)
    found = None
    for cand in candidates:
        path = shutil.which(cand)
        if path:
            found = path
            break
    if not found and name in ("ffmpeg", "ffprobe"):
        try:
            import imageio_ffmpeg  # type: ignore

            exe = imageio_ffmpeg.get_ffmpeg_exe()
            if name == "ffmpeg":
                found = exe
            else:
                guess = os.path.join(os.path.dirname(exe), "ffprobe")
                if os.path.exists(guess):
                    found = guess
        except Exception:
            pass
    _CACHED[key] = found
    return found


def require_binary(name, hint=""):
    path = find_binary(name)
    if not path:
        raise RuntimeError(
            "'%s' nao foi encontrado no PATH. %s" % (name, hint)
        )
    return path


def ffmpeg_bin():
    return require_binary(
        "ffmpeg",
        "Instale o ffmpeg (Linux: apt install ffmpeg | Windows: winget install Gyan.FFmpeg | "
        "macOS: brew install ffmpeg) ou 'pip install imageio-ffmpeg'.",
    )


def ffprobe_bin():
    return require_binary(
        "ffprobe", "ffprobe acompanha o ffmpeg; instale o pacote completo do ffmpeg."
    )


def has_filter(filter_name):
    """Testa se o ffmpeg local tem um filtro (ex.: rubberband)."""
    key = "filter:" + filter_name
    if key in _CACHED:
        return _CACHED[key]
    ok = False
    try:
        out = subprocess.run(
            [ffmpeg_bin(), "-hide_banner", "-filters"],
            capture_output=True,
            text=True,
            timeout=30,
        ).stdout
        ok = (" %s " % filter_name) in out
    except Exception:
        ok = False
    _CACHED[key] = ok
    return ok
