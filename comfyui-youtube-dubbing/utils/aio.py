"""Execucao de corrotinas compativel com o event loop do ComfyUI.

Versoes recentes do ComfyUI executam os nos dentro do proprio event loop do
servidor. Nessa situacao, chamar `loop.run_until_complete(...)` na thread atual
levanta "Cannot run the event loop while another loop is running".

`run_coroutine` resolve isso rodando a corrotina numa thread dedicada, com um
loop proprio: funciona tanto quando ja existe um loop rodando quanto quando nao
existe, sem precisar detectar a versao do ComfyUI.
"""

import asyncio
import threading


def run_coroutine(make_coroutine, timeout=None):
    """Roda `make_coroutine()` ate o fim e devolve o resultado.

    `make_coroutine` e uma funcao sem argumentos que devolve uma corrotina nova.
    Precisa ser uma fabrica (e nao a corrotina pronta) porque a corrotina tem de
    ser criada dentro do loop que vai executa-la.
    """
    outcome = {}

    def runner():
        loop = asyncio.new_event_loop()
        try:
            asyncio.set_event_loop(loop)
            outcome["value"] = loop.run_until_complete(make_coroutine())
        except BaseException as exc:  # repassado na thread chamadora
            outcome["error"] = exc
        finally:
            try:
                loop.run_until_complete(loop.shutdown_asyncgens())
            except Exception:
                pass
            asyncio.set_event_loop(None)
            loop.close()

    thread = threading.Thread(target=runner, name="dubbing-asyncio", daemon=True)
    thread.start()
    thread.join(timeout)
    if thread.is_alive():
        raise TimeoutError("A operacao assincrona excedeu %ss." % timeout)
    if "error" in outcome:
        raise outcome["error"]
    return outcome.get("value")
