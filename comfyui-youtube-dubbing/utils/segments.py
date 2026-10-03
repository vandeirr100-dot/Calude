"""Estrutura de segmentos de fala e utilitarios de legenda."""

import re


def new_segment(start, end, text, speaker=None):
    return {
        "start": float(start),
        "end": float(end),
        "text": (text or "").strip(),
        "speaker": speaker,
        "translated": None,
    }


def target_text(seg):
    """Texto a ser sintetizado: a traducao quando existir, senao o original."""
    return (seg.get("translated") or seg.get("text") or "").strip()


def duration(seg):
    return max(0.0, float(seg["end"]) - float(seg["start"]))


def total_duration(segments):
    return max([float(s["end"]) for s in segments], default=0.0)


def merge_short(segments, min_gap=0.28, max_chars=240, max_len=14.0):
    """Une falas coladas para dar frases mais naturais ao TTS."""
    merged = []
    for seg in sorted(segments, key=lambda s: float(s["start"])):
        if not seg.get("text"):
            continue
        if not merged:
            merged.append(dict(seg))
            continue
        prev = merged[-1]
        gap = float(seg["start"]) - float(prev["end"])
        same_speaker = prev.get("speaker") == seg.get("speaker")
        joined = len(prev["text"]) + len(seg["text"]) + 1
        span = float(seg["end"]) - float(prev["start"])
        ends_sentence = prev["text"].rstrip().endswith((".", "!", "?", "…", "。", "？", "！"))
        if (
            gap <= min_gap
            and same_speaker
            and joined <= max_chars
            and span <= max_len
            and not ends_sentence
        ):
            prev["text"] = (prev["text"].rstrip() + " " + seg["text"].lstrip()).strip()
            prev["end"] = float(seg["end"])
        else:
            merged.append(dict(seg))
    return merged


def resolve_overlaps(segments, min_duration=0.25):
    """Garante uma linha de tempo monotonica, sem sobreposicao."""
    out = []
    for seg in sorted(segments, key=lambda s: float(s["start"])):
        seg = dict(seg)
        if out:
            prev_end = float(out[-1]["end"])
            if float(seg["start"]) < prev_end:
                seg["start"] = prev_end
        if float(seg["end"]) - float(seg["start"]) < min_duration:
            seg["end"] = float(seg["start"]) + min_duration
        out.append(seg)
    return out


def _ts(seconds, comma=True):
    """Formata segundos como HH:MM:SS,mmm (SRT) ou HH:MM:SS.mmm (VTT)."""
    sep = "," if comma else "."
    total_ms = int(round(max(0.0, float(seconds)) * 1000.0))
    hours, rest = divmod(total_ms, 3600_000)
    minutes, rest = divmod(rest, 60_000)
    secs, millis = divmod(rest, 1000)
    return "%02d:%02d:%02d%s%03d" % (hours, minutes, secs, sep, millis)


def to_srt(segments, use_translation=True):
    lines = []
    for index, seg in enumerate(segments, start=1):
        text = target_text(seg) if use_translation else (seg.get("text") or "")
        if not text:
            continue
        lines.append(str(index))
        lines.append("%s --> %s" % (_ts(seg["start"]), _ts(seg["end"])))
        lines.append(_wrap(text))
        lines.append("")
    return "\n".join(lines)


def to_vtt(segments, use_translation=True):
    lines = ["WEBVTT", ""]
    for seg in segments:
        text = target_text(seg) if use_translation else (seg.get("text") or "")
        if not text:
            continue
        lines.append("%s --> %s" % (_ts(seg["start"], comma=False), _ts(seg["end"], comma=False)))
        lines.append(_wrap(text))
        lines.append("")
    return "\n".join(lines)


def _wrap(text, width=42):
    """Quebra em no maximo duas linhas, como manda a boa pratica de legenda."""
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= width:
        return text
    words = text.split(" ")
    first, second = [], []
    count = 0
    half = len(text) / 2
    for word in words:
        if count < half:
            first.append(word)
            count += len(word) + 1
        else:
            second.append(word)
    return (" ".join(first) + "\n" + " ".join(second)).strip()


def plain_text(segments, use_translation=False):
    parts = [target_text(s) if use_translation else (s.get("text") or "") for s in segments]
    return "\n".join(p for p in parts if p)


def stats(segments):
    spoken = sum(duration(s) for s in segments)
    chars = sum(len(target_text(s)) for s in segments)
    return {
        "segmentos": len(segments),
        "tempo_de_fala_s": round(spoken, 2),
        "caracteres": chars,
    }
