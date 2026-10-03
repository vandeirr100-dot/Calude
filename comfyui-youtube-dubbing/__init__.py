"""ComfyUI - Dublagem de Video com IA (YouTube / arquivo local -> voz neural).

Registra todos os nos do pipeline:
  1. Fonte do video (link do YouTube ou arquivo local)
  2. Transcricao com timestamps (Whisper)
  3. Traducao com controle de duracao
  4. Voz neural + sincronia labial-temporal
  5. Separacao/mixagem (preserva musica e efeitos)
  6. Video dublado final + legendas, pronto para download
"""

import importlib
import traceback

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

_MODULES = ("source", "asr", "translate", "tts", "voice_clone", "audio_mix", "mux")

_errors = []
for name in _MODULES:
    try:
        module = importlib.import_module("." + name, __name__ + ".nodes")
        NODE_CLASS_MAPPINGS.update(getattr(module, "NODE_CLASS_MAPPINGS", {}))
        NODE_DISPLAY_NAME_MAPPINGS.update(getattr(module, "NODE_DISPLAY_NAME_MAPPINGS", {}))
    except Exception:
        _errors.append("  - nodes/%s.py:\n%s" % (name, traceback.format_exc()))

if _errors:
    print(
        "[Dublagem IA] Alguns nos nao foram carregados:\n" + "\n".join(_errors)
    )

print(
    "[Dublagem IA] %d nos carregados (categoria 'Dublagem IA')."
    % len(NODE_CLASS_MAPPINGS)
)

WEB_DIRECTORY = "./web"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
