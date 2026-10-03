"""Baixa o modelo XTTS-v2 aplicando o mesmo remendo de compatibilidade do no.

Rodar isso antes da primeira dublagem faz um erro de rede aparecer agora, e nao
no meio de um processamento longo.
"""

import sys


def main():
    try:
        import transformers
        from transformers import pytorch_utils
    except Exception as exc:
        print("[ERRO] transformers nao esta instalado: %s" % exc)
        return 1

    versao = getattr(transformers, "__version__", "?")
    if not hasattr(pytorch_utils, "isin_mps_friendly"):
        import torch

        def isin_mps_friendly(elements, test_elements):
            test = test_elements
            if not torch.is_tensor(test):
                test = torch.tensor(test, device=getattr(elements, "device", None))
            device = getattr(elements, "device", None)
            if device is not None and device.type == "mps":
                return (elements.unsqueeze(-1) == test.reshape(1, 1, -1)).any(dim=-1)
            return torch.isin(elements, test)

        pytorch_utils.isin_mps_friendly = isin_mps_friendly
        print("transformers %s: reposto 'isin_mps_friendly' para o coqui-tts." % versao)
    else:
        print("transformers %s: compativel, sem remendo." % versao)

    try:
        from TTS.api import TTS
    except Exception as exc:
        print("[ERRO] Nao foi possivel carregar o coqui-tts: %s" % exc)
        print()
        print("Se o erro falar em transformers, instale a serie 4.57:")
        print('   python.exe -m pip install "transformers>=4.57,<5"')
        return 1

    print("Baixando o modelo XTTS-v2. Isso demora e sao cerca de 1.8 GB...")
    try:
        TTS("tts_models/multilingual/multi-dataset/xtts_v2")
    except Exception as exc:
        print("[ERRO] O download falhou: %s" % exc)
        print()
        print("Se falar em certificado ou conexao, desligue a varredura HTTPS do")
        print("antivirus, rode de novo, e religue depois.")
        return 1

    print()
    print("Modelo pronto. A clonagem de voz ja pode ser usada.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
