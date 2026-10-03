"""Montagem do video dublado final, legendas e saida para download."""

import os
import re
import shutil

from ..utils import media
from ..utils import segments as segutil
from ..utils.paths import ffmpeg_bin, output_dir, work_dir

CONTAINERS = ["mp4", "mkv", "mov", "webm"]

# O muxer mp4/mov so reconhece codigos ISO 639-2/B (3 letras); o mkv aceita ambos.
ISO_639_2 = {
    "pt": "por", "en": "eng", "es": "spa", "fr": "fra", "de": "deu", "it": "ita",
    "ja": "jpn", "ko": "kor", "zh": "zho", "ru": "rus", "hi": "hin", "ar": "ara",
    "tr": "tur", "nl": "nld", "pl": "pol", "id": "ind", "vi": "vie", "th": "tha",
    "sv": "swe", "nb": "nob", "no": "nor", "da": "dan", "fi": "fin", "el": "ell",
    "he": "heb", "uk": "ukr", "ro": "ron", "hu": "hun", "cs": "ces", "fil": "fil",
    "ms": "msa", "bn": "ben", "ta": "tam", "af": "afr",
}

# Containers que armazenam um titulo por faixa. Em mp4/mov o titulo e descartado
# e, pior, pedi-lo faz o ffmpeg perder a tag de idioma - entao nem tentamos.
TITLE_CAPABLE = ("mkv", "webm")


def _lang_tag(locale, container):
    code = (locale or "").split("-")[0].lower()
    if container in ("mp4", "mov"):
        return ISO_639_2.get(code, code if len(code) == 3 else "und")
    return code
VIDEO_MODES = ["copiar_original", "h264_recodificar", "h265_recodificar"]


def _safe_name(name):
    name = re.sub(r"[^\w\-. ]+", "_", (name or "video").strip())
    name = re.sub(r"\s+", "_", name)
    return (name[:80] or "video").strip("_.")


def _video_codec_of(path):
    try:
        for stream in media.probe(path).get("streams", []):
            if stream.get("codec_type") == "video":
                return (stream.get("codec_name") or "").lower()
    except Exception:
        pass
    return ""


def _unique(path):
    if not os.path.exists(path):
        return path
    base, ext = os.path.splitext(path)
    index = 2
    while os.path.exists("%s_%02d%s" % (base, index, ext)):
        index += 1
    return "%s_%02d%s" % (base, index, ext)


class DubSaveSubtitles:
    """Grava as legendas traduzidas (SRT/VTT) na pasta de saida."""

    CATEGORY = "Dublagem IA/6. Saida"
    FUNCTION = "save"
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("srt_path", "vtt_path")
    OUTPUT_NODE = True

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "segmentos": ("DUB_SEGMENTS", {"forceInput": True}),
                "nome_base": ("STRING", {"default": "dublagem"}),
                "usar_traducao": ("BOOLEAN", {"default": True}),
            },
            "optional": {"subpasta": ("STRING", {"default": "dublagem"})},
        }

    def save(self, segmentos, nome_base, usar_traducao, subpasta="dublagem"):
        folder = os.path.join(output_dir(), _safe_name(subpasta)) if subpasta else output_dir()
        os.makedirs(folder, exist_ok=True)
        stem = _safe_name(nome_base)

        srt_path = _unique(os.path.join(folder, stem + ".srt"))
        with open(srt_path, "w", encoding="utf-8") as handle:
            handle.write(segutil.to_srt(segmentos, use_translation=usar_traducao))

        vtt_path = _unique(os.path.join(folder, stem + ".vtt"))
        with open(vtt_path, "w", encoding="utf-8") as handle:
            handle.write(segutil.to_vtt(segmentos, use_translation=usar_traducao))

        note = "Legendas salvas:\n%s\n%s" % (srt_path, vtt_path)
        return {"ui": {"text": [note]}, "result": (srt_path, vtt_path)}


class DubMuxVideo:
    """Junta o video original com o audio dublado e salva o arquivo final."""

    CATEGORY = "Dublagem IA/6. Saida"
    FUNCTION = "mux"
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("video_final_path", "resumo")
    OUTPUT_NODE = True
    DESCRIPTION = (
        "Gera o video dublado em ComfyUI/output/<subpasta> - clique no link do no "
        "para baixar."
    )

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "video_path": ("STRING", {"forceInput": True}),
                "audio_final_path": ("STRING", {"forceInput": True}),
                "nome_base": ("STRING", {"default": "dublagem"}),
                "container": (CONTAINERS, {"default": "mp4"}),
                "modo_video": (VIDEO_MODES, {"default": "copiar_original"}),
                "bitrate_audio": (["320k", "256k", "192k", "128k"], {"default": "256k"}),
            },
            "optional": {
                "subpasta": ("STRING", {"default": "dublagem"}),
                "legenda_srt": ("STRING", {"default": ""}),
                "legendas": (["nenhuma", "embutida_soft", "queimada_no_video"], {"default": "nenhuma"}),
                "manter_audio_original_como_faixa2": ("BOOLEAN", {"default": False}),
                "audio_original_path": ("STRING", {"default": ""}),
                "idioma_faixa": ("STRING", {"default": ""}),
                "duracao_final": (["seguir_video", "manter_audio_completo"], {"default": "seguir_video"}),
                "crf": ("INT", {"default": 20, "min": 14, "max": 30}),
            },
        }

    def mux(
        self,
        video_path,
        audio_final_path,
        nome_base,
        container,
        modo_video,
        bitrate_audio,
        subpasta="dublagem",
        legenda_srt="",
        legendas="nenhuma",
        manter_audio_original_como_faixa2=False,
        audio_original_path="",
        idioma_faixa="",
        duracao_final="seguir_video",
        crf=20,
    ):
        for label, path in (("video", video_path), ("audio dublado", audio_final_path)):
            if not path or not os.path.exists(path):
                raise RuntimeError("Caminho do %s invalido: %r" % (label, path))

        folder = os.path.join(output_dir(), _safe_name(subpasta)) if subpasta else output_dir()
        os.makedirs(folder, exist_ok=True)
        stem = _safe_name(nome_base)
        suffix = _safe_name(idioma_faixa) if idioma_faixa else ""
        filename = "%s%s.%s" % (stem, ("_" + suffix) if suffix else "", container)
        out_path = _unique(os.path.join(folder, filename))

        video_dur = media.duration_of(video_path)
        audio_dur = media.duration_of(audio_final_path)
        if duracao_final == "manter_audio_completo":
            target_dur = max(video_dur, audio_dur)
        else:
            target_dur = video_dur
        extend_video = target_dur > video_dur + 0.05

        burn = legendas == "queimada_no_video" and legenda_srt and os.path.exists(legenda_srt)
        soft = legendas == "embutida_soft" and legenda_srt and os.path.exists(legenda_srt)

        cmd = [ffmpeg_bin(), "-y", "-hide_banner", "-loglevel", "error"]
        cmd += ["-i", video_path, "-i", audio_final_path]

        inputs = 2
        original_index = None
        if manter_audio_original_como_faixa2 and audio_original_path and os.path.exists(
            audio_original_path
        ):
            cmd += ["-i", audio_original_path]
            original_index = inputs
            inputs += 1

        srt_index = None
        if soft:
            cmd += ["-i", legenda_srt]
            srt_index = inputs
            inputs += 1

        video_filters = []
        if burn:
            escaped = legenda_srt.replace("\\", "/").replace(":", "\\:").replace("'", "\\'")
            style = (
                "FontName=Arial,FontSize=20,PrimaryColour=&H00FFFFFF,"
                "OutlineColour=&H00000000,BorderStyle=1,Outline=1.5,Shadow=0.6,MarginV=28"
            )
            video_filters.append("subtitles='%s':force_style='%s'" % (escaped, style))
        if extend_video:
            # congela o ultimo quadro para cobrir a fala que passou do fim do video
            video_filters.append(
                "tpad=stop_mode=clone:stop_duration=%.3f" % (target_dur - video_dur)
            )
        if video_filters:
            cmd += ["-vf", ",".join(video_filters)]

        # o webm so aceita VP8/VP9/AV1 - copiar um H.264 ali quebra o muxer
        source_codec = _video_codec_of(video_path)
        webm_needs_vp9 = container == "webm" and source_codec not in ("vp8", "vp9", "av1")

        if container == "webm" and (video_filters or webm_needs_vp9):
            video_codec = [
                "-c:v", "libvpx-vp9", "-crf", str(int(crf) + 10), "-b:v", "0",
                "-row-mt", "1", "-deadline", "good", "-cpu-used", "4",
            ]
        elif video_filters or modo_video == "h264_recodificar":
            video_codec = ["-c:v", "libx264", "-crf", str(int(crf)), "-preset", "medium"]
        elif modo_video == "h265_recodificar":
            video_codec = ["-c:v", "libx265", "-crf", str(int(crf) + 4), "-preset", "medium"]
        else:
            video_codec = ["-c:v", "copy"]

        cmd += ["-map", "0:v:0", "-map", "1:a:0"]
        if original_index is not None:
            cmd += ["-map", "%d:a:0" % original_index]
        if srt_index is not None:
            cmd += ["-map", "%d:s:0" % srt_index]

        cmd += video_codec
        audio_codec = "libopus" if container == "webm" else "aac"
        cmd += ["-c:a", audio_codec, "-b:a", bitrate_audio, "-ac", "2"]
        # apad + '-t' garantem que o audio cubra exatamente a duracao alvo:
        # sem isso o '-shortest' cortaria o video quando a dublagem termina antes
        cmd += ["-filter:a", "apad"]
        if srt_index is not None:
            subtitle_codec = {"mp4": "mov_text", "mov": "mov_text", "webm": "webvtt"}.get(
                container, "srt"
            )
            cmd += ["-c:s", subtitle_codec]

        if idioma_faixa:
            cmd += ["-metadata:s:a:0", "language=%s" % _lang_tag(idioma_faixa, container)]
            if container in TITLE_CAPABLE:
                cmd += ["-metadata:s:a:0", "title=Dublagem %s" % idioma_faixa]
        if original_index is not None and container in TITLE_CAPABLE:
            cmd += ["-metadata:s:a:1", "title=Audio original"]

        cmd += ["-disposition:a:0", "default"]
        if container in ("mp4", "mov"):
            cmd += ["-movflags", "+faststart"]
        cmd += ["-t", "%.3f" % target_dur, out_path]

        try:
            media.run(cmd, "montagem do video final")
        except RuntimeError as exc:
            if "copy" in video_codec:
                # alguns containers recusam a copia direta do fluxo de video
                retry = list(cmd)
                index = retry.index("-c:v")
                if container == "webm":
                    replacement = [
                        "libvpx-vp9", "-crf", str(int(crf) + 10), "-b:v", "0",
                        "-row-mt", "1", "-deadline", "good", "-cpu-used", "4",
                    ]
                else:
                    replacement = ["libx264", "-crf", str(int(crf)), "-preset", "medium"]
                retry[index + 1 : index + 2] = replacement
                media.run(retry, "montagem do video final (recodificando)")
            else:
                raise exc

        duration = media.duration_of(out_path)
        size_mb = os.path.getsize(out_path) / (1024.0 * 1024.0)
        relative = os.path.relpath(out_path, output_dir())
        summary = (
            "Video dublado pronto!\n"
            "Arquivo: %s\n"
            "Duracao: %.1fs | Tamanho: %.1f MB | Codec de audio: %s\n"
            "Baixe pela pasta de saida do ComfyUI (output/%s)."
            % (out_path, duration, size_mb, audio_codec, relative)
        )

        ui = {
            "text": [summary],
            "videos": [
                {
                    "filename": os.path.basename(out_path),
                    "subfolder": os.path.dirname(relative).replace("\\", "/"),
                    "type": "output",
                }
            ],
        }
        return {"ui": ui, "result": (out_path, summary)}


class DubCollectOutputs:
    """Copia video, legendas e audio para uma pasta unica de entrega."""

    CATEGORY = "Dublagem IA/6. Saida"
    FUNCTION = "collect"
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("pasta_de_entrega",)
    OUTPUT_NODE = True

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "video_final_path": ("STRING", {"forceInput": True}),
                "nome_do_pacote": ("STRING", {"default": "entrega_dublagem"}),
            },
            "optional": {
                "srt_path": ("STRING", {"default": ""}),
                "audio_final_path": ("STRING", {"default": ""}),
            },
        }

    def collect(self, video_final_path, nome_do_pacote, srt_path="", audio_final_path=""):
        folder = os.path.join(output_dir(), _safe_name(nome_do_pacote))
        os.makedirs(folder, exist_ok=True)
        copied = []
        for path in (video_final_path, srt_path, audio_final_path):
            if path and os.path.exists(path):
                dest = _unique(os.path.join(folder, os.path.basename(path)))
                shutil.copy2(path, dest)
                copied.append(dest)
        note = "Pacote em %s\n%s" % (folder, "\n".join(copied))
        return {"ui": {"text": [note]}, "result": (folder,)}


NODE_CLASS_MAPPINGS = {
    "DubSaveSubtitles": DubSaveSubtitles,
    "DubMuxVideo": DubMuxVideo,
    "DubCollectOutputs": DubCollectOutputs,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "DubSaveSubtitles": "6a. Salvar Legendas (SRT/VTT)",
    "DubMuxVideo": "6b. Gerar Video Dublado (download)",
    "DubCollectOutputs": "6c. Juntar Entregaveis",
}
