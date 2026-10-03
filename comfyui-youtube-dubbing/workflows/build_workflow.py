"""Gera os JSONs do workflow a partir dos INPUT_TYPES reais dos nos.

Assim os 'widgets_values' nunca ficam desalinhados com a definicao dos nos.
Uso:  python workflows/build_workflow.py
"""

import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PKG_DIR = os.path.dirname(HERE)


def load_package():
    sys.path.insert(0, os.path.dirname(PKG_DIR))
    spec = importlib.util.spec_from_file_location(
        "dubbing_pkg",
        os.path.join(PKG_DIR, "__init__.py"),
        submodule_search_locations=[PKG_DIR],
    )
    pkg = importlib.util.module_from_spec(spec)
    sys.modules["dubbing_pkg"] = pkg
    spec.loader.exec_module(pkg)
    return pkg


SOCKET_TYPES = {"DUB_SEGMENTS"}


def input_spec(cls):
    """Lista ordenada de (nome, tipo, opcoes, eh_socket_nativo)."""
    types = cls.INPUT_TYPES()
    out = []
    for section in ("required", "optional"):
        for name, definition in types.get(section, {}).items():
            kind = definition[0]
            opts = definition[1] if len(definition) > 1 else {}
            native_socket = isinstance(kind, str) and (
                kind in SOCKET_TYPES or opts.get("forceInput")
            )
            out.append((name, kind, opts, bool(native_socket)))
    return out


def default_value(kind, opts):
    if isinstance(kind, list):
        return opts.get("default", kind[0] if kind else "")
    if kind == "BOOLEAN":
        return bool(opts.get("default", False))
    if kind == "INT":
        return int(opts.get("default", 0))
    if kind == "FLOAT":
        return float(opts.get("default", 0.0))
    return opts.get("default", "")


# --------------------------------------------------------------------- grafo --
# links: nome_do_input -> (id_do_no_origem, indice_da_saida)
GRAPH = [
    {
        "id": 1,
        "class": "YouTubeDubSource",
        "pos": [40, 120],
        "title": "1. Cole o link do YouTube aqui",
        "values": {
            "modo": "youtube_url",
            "youtube_url": "https://www.youtube.com/watch?v=COLE_SEU_LINK_AQUI",
            "resolucao_maxima": "1080",
            "usar_cache": True,
        },
        "links": {},
    },
    {
        "id": 2,
        "class": "DubTranscribe",
        "pos": [460, 120],
        "title": "2. Transcrever (Whisper)",
        "values": {"modelo": "large-v3-turbo", "idioma_origem": "auto", "filtro_vad": True},
        "links": {"audio_path": (1, 1)},
    },
    {
        "id": 3,
        "class": "DubTranslate",
        "pos": [860, 120],
        "title": "3. ESCOLHA O IDIOMA DA DUBLAGEM",
        "values": {
            "idioma_destino": "Ingles (EUA)",
            "motor": "google_gratis",
            "tom": "neutro",
            "tolerancia_comprimento_pct": 15,
        },
        "links": {"segmentos": (2, 0)},
    },
    {
        "id": 4,
        "class": "DubSeparateAudio",
        "pos": [460, 560],
        "title": "5a. Preservar musica/efeitos (opcional)",
        "values": {"metodo": "nenhuma", "modelo_demucs": "htdemucs", "usar_cache": True},
        "links": {"audio_path": (1, 1)},
    },
    {
        "id": 5,
        "class": "DubNeuralTTS",
        "pos": [1300, 120],
        "title": "4. Voz neural + encaixe no tempo",
        "values": {
            "motor": "edge_tts",
            "voz": "auto",
            "modo_sincronia": "encaixar_no_tempo",
            "aceleracao_maxima": 1.35,
            "desaceleracao_maxima": 0.85,
            "normalizar_loudness": True,
            "lufs_alvo": -16.0,
            "usar_cache": True,
        },
        "links": {
            "segmentos": (3, 0),
            "idioma_destino": (3, 1),
            "audio_referencia": (4, 1),
        },
    },
    {
        "id": 6,
        "class": "DubMixAudio",
        "pos": [1740, 480],
        "title": "5b. Mixagem final",
        "values": {
            "ganho_dub_db": 0.0,
            "ganho_fundo_db": -6.0,
            "ducking_db": -8.0,
            "saida_estereo": True,
            "ganho_original_db": -60.0,
            "lufs_alvo": -14.0,
            "normalizar": True,
        },
        "links": {
            "dub_audio_path": (5, 0),
            "fundo_audio_path": (4, 0),
            "audio_original_path": (1, 1),
        },
    },
    {
        "id": 7,
        "class": "DubSaveSubtitles",
        "pos": [1740, 120],
        "title": "6a. Legendas traduzidas",
        "values": {"usar_traducao": True, "subpasta": "dublagem"},
        "links": {"segmentos": (5, 1), "nome_base": (1, 2)},
    },
    {
        "id": 8,
        "class": "DubMuxVideo",
        "pos": [2160, 220],
        "title": "6b. VIDEO DUBLADO -> baixe aqui",
        "values": {
            "container": "mp4",
            "modo_video": "copiar_original",
            "bitrate_audio": "256k",
            "subpasta": "dublagem",
            "legendas": "embutida_soft",
            "manter_audio_original_como_faixa2": False,
            "crf": 20,
        },
        "links": {
            "video_path": (1, 0),
            "audio_final_path": (6, 0),
            "nome_base": (1, 2),
            "legenda_srt": (7, 0),
            "audio_original_path": (1, 1),
            "idioma_faixa": (3, 1),
        },
    },
    {
        "id": 9,
        "class": "DubSegmentsPreview",
        "pos": [1300, 760],
        "title": "Conferir falas e traducao",
        "values": {"mostrar_traducao": True, "limite_de_linhas": 40},
        "links": {"segmentos": (5, 1)},
    },
]


def build_ui_workflow(pkg):
    nodes = []
    links = []
    link_id = 1
    by_id = {}

    for entry in GRAPH:
        cls = pkg.NODE_CLASS_MAPPINGS[entry["class"]]
        spec = input_spec(cls)
        node_inputs = []
        widgets = []

        for name, kind, opts, native_socket in spec:
            linked = name in entry["links"]
            if native_socket:
                node_inputs.append(
                    {
                        "name": name,
                        "type": kind if isinstance(kind, str) else "COMBO",
                        "link": None,
                    }
                )
            else:
                value = entry["values"].get(name, default_value(kind, opts))
                widgets.append(value)
                if linked:
                    # widget convertido em entrada (conectavel)
                    node_inputs.append(
                        {
                            "name": name,
                            "type": kind if isinstance(kind, str) else "COMBO",
                            "link": None,
                            "widget": {"name": name},
                        }
                    )

        outputs = []
        names = getattr(cls, "RETURN_NAMES", None) or cls.RETURN_TYPES
        for index, out_type in enumerate(cls.RETURN_TYPES):
            outputs.append(
                {
                    "name": names[index] if index < len(names) else out_type,
                    "type": out_type,
                    "links": [],
                    "slot_index": index,
                }
            )

        node = {
            "id": entry["id"],
            "type": entry["class"],
            "pos": entry["pos"],
            "size": [400, 60 + 26 * max(1, len(widgets))],
            "flags": {},
            "order": 0,
            "mode": 0,
            "inputs": node_inputs,
            "outputs": outputs,
            "title": entry.get("title", entry["class"]),
            "properties": {"Node name for S&R": entry["class"]},
            "widgets_values": widgets,
        }
        nodes.append(node)
        by_id[entry["id"]] = node

    # cria os links depois que todos os nos existem
    for entry in GRAPH:
        target = by_id[entry["id"]]
        for input_name, (src_id, src_slot) in entry["links"].items():
            source = by_id[src_id]
            slot_index = next(
                i for i, inp in enumerate(target["inputs"]) if inp["name"] == input_name
            )
            link_type = source["outputs"][src_slot]["type"]
            target["inputs"][slot_index]["link"] = link_id
            source["outputs"][src_slot]["links"].append(link_id)
            links.append(
                [link_id, src_id, src_slot, entry["id"], slot_index, link_type]
            )
            link_id += 1

    # ordem topologica de execucao
    order = {}
    def depth(node_id):
        if node_id in order:
            return order[node_id]
        entry = next(e for e in GRAPH if e["id"] == node_id)
        value = 0 if not entry["links"] else 1 + max(
            depth(src) for src, _ in entry["links"].values()
        )
        order[node_id] = value
        return value

    for entry in GRAPH:
        depth(entry["id"])
    for index, node in enumerate(sorted(nodes, key=lambda n: (order[n["id"]], n["id"]))):
        node["order"] = index

    return {
        "id": "youtube-dubbing-pro",
        "revision": 0,
        "last_node_id": max(n["id"] for n in nodes),
        "last_link_id": link_id - 1,
        "nodes": nodes,
        "links": links,
        "groups": [
            {
                "id": 1,
                "title": "ENTRADA - link do YouTube ou arquivo local",
                "bounding": [20, 40, 820, 420],
                "color": "#3f789e",
                "font_size": 24,
                "flags": {},
            },
            {
                "id": 2,
                "title": "TRADUCAO + VOZ NEURAL",
                "bounding": [850, 40, 850, 420],
                "color": "#8A8",
                "font_size": 24,
                "flags": {},
            },
            {
                "id": 3,
                "title": "MIXAGEM E SAIDA (download)",
                "bounding": [1720, 40, 860, 620],
                "color": "#b58b2a",
                "font_size": 24,
                "flags": {},
            },
        ],
        "config": {},
        "extra": {
            "ds": {"scale": 0.7, "offset": [0, 0]},
            "descricao": (
                "Dublagem automatica de video: YouTube/arquivo -> transcricao -> traducao "
                "-> voz neural sincronizada -> video dublado para download."
            ),
        },
        "version": 0.4,
    }


def build_api_workflow(pkg):
    prompt = {}
    for entry in GRAPH:
        cls = pkg.NODE_CLASS_MAPPINGS[entry["class"]]
        inputs = {}
        for name, kind, opts, native_socket in input_spec(cls):
            if name in entry["links"]:
                src_id, src_slot = entry["links"][name]
                inputs[name] = [str(src_id), src_slot]
            elif not native_socket:
                inputs[name] = entry["values"].get(name, default_value(kind, opts))
        prompt[str(entry["id"])] = {
            "class_type": entry["class"],
            "inputs": inputs,
            "_meta": {"title": entry.get("title", entry["class"])},
        }
    return prompt


CLONE_NODE = {
    "id": 10,
    "class": "DubVoiceSample",
    "pos": [860, 620],
    "title": "4a. SUA VOZ -> escolha o audio de exemplo",
    "values": {
        "origem": "arquivo_novo",
        "caminho_do_audio": "",
        "duracao_alvo_s": 18.0,
        "remover_silencio": True,
        "normalizar": True,
        "salvar_como": "minha_voz",
    },
    "links": {},
}


def build_clone_variant():
    """Variante do grafo usando clonagem de voz a partir de uma amostra do usuario."""
    graph = []
    for entry in GRAPH:
        entry = {k: (dict(v) if isinstance(v, dict) else v) for k, v in entry.items()}
        if entry["class"] == "DubNeuralTTS":
            entry["values"] = dict(entry["values"])
            entry["values"]["motor"] = "xtts_v2_clonagem"
            entry["links"] = dict(entry["links"])
            entry["links"]["audio_referencia"] = (10, 0)  # vem da amostra do usuario
        graph.append(entry)
    graph.append(CLONE_NODE)
    return graph


def main():
    pkg = load_package()
    ui = build_ui_workflow(pkg)
    api = build_api_workflow(pkg)

    ui_path = os.path.join(HERE, "dublagem_youtube_pro.json")
    api_path = os.path.join(HERE, "dublagem_youtube_pro_api.json")
    with open(ui_path, "w", encoding="utf-8") as handle:
        json.dump(ui, handle, ensure_ascii=False, indent=2)
    with open(api_path, "w", encoding="utf-8") as handle:
        json.dump(api, handle, ensure_ascii=False, indent=2)

    print("Gerado: %s (%d nos, %d links)" % (ui_path, len(ui["nodes"]), len(ui["links"])))
    print("Gerado: %s" % api_path)

    # variante com clonagem de voz
    global GRAPH
    principal = GRAPH
    try:
        GRAPH = build_clone_variant()
        clone_ui = build_ui_workflow(pkg)
        clone_api = build_api_workflow(pkg)
    finally:
        GRAPH = principal

    clone_ui_path = os.path.join(HERE, "dublagem_com_clonagem_de_voz.json")
    clone_api_path = os.path.join(HERE, "dublagem_com_clonagem_de_voz_api.json")
    with open(clone_ui_path, "w", encoding="utf-8") as handle:
        json.dump(clone_ui, handle, ensure_ascii=False, indent=2)
    with open(clone_api_path, "w", encoding="utf-8") as handle:
        json.dump(clone_api, handle, ensure_ascii=False, indent=2)
    print(
        "Gerado: %s (%d nos, %d links)"
        % (clone_ui_path, len(clone_ui["nodes"]), len(clone_ui["links"]))
    )
    return ui, api


if __name__ == "__main__":
    main()
