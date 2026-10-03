"""Catalogo de idiomas e de vozes neurais (Edge/Azure Neural TTS)."""

import subprocess

# ---------------------------------------------------------------- idiomas ----
# rotulo exibido no ComfyUI -> (codigo ISO curto, locale padrao do TTS)
LANGUAGES = {
    "Portugues (Brasil)": ("pt", "pt-BR"),
    "Portugues (Portugal)": ("pt", "pt-PT"),
    "Ingles (EUA)": ("en", "en-US"),
    "Ingles (Reino Unido)": ("en", "en-GB"),
    "Espanhol (Espanha)": ("es", "es-ES"),
    "Espanhol (America Latina)": ("es", "es-MX"),
    "Frances": ("fr", "fr-FR"),
    "Alemao": ("de", "de-DE"),
    "Italiano": ("it", "it-IT"),
    "Japones": ("ja", "ja-JP"),
    "Coreano": ("ko", "ko-KR"),
    "Chines (Mandarim)": ("zh", "zh-CN"),
    "Russo": ("ru", "ru-RU"),
    "Hindi": ("hi", "hi-IN"),
    "Arabe": ("ar", "ar-SA"),
    "Turco": ("tr", "tr-TR"),
    "Holandes": ("nl", "nl-NL"),
    "Polones": ("pl", "pl-PL"),
    "Indonesio": ("id", "id-ID"),
    "Vietnamita": ("vi", "vi-VN"),
    "Tailandes": ("th", "th-TH"),
    "Sueco": ("sv", "sv-SE"),
    "Norueguic": ("nb", "nb-NO"),
    "Dinamarques": ("da", "da-DK"),
    "Finlandes": ("fi", "fi-FI"),
    "Grego": ("el", "el-GR"),
    "Hebraico": ("he", "il-IL"),
    "Ucraniano": ("uk", "uk-UA"),
    "Romeno": ("ro", "ro-RO"),
    "Hungaro": ("hu", "hu-HU"),
    "Tcheco": ("cs", "cs-CZ"),
    "Filipino": ("fil", "fil-PH"),
    "Malaio": ("ms", "ms-MY"),
    "Bengali": ("bn", "bn-IN"),
    "Tamil": ("ta", "ta-IN"),
    "Africaner": ("af", "af-ZA"),
}

LANGUAGE_LABELS = list(LANGUAGES.keys())

# codigos aceitos pelo Whisper na deteccao forcada
ASR_LANGUAGES = ["auto"] + sorted({code for code, _ in LANGUAGES.values()})


def resolve_language(label):
    """Converte o rotulo do combo em (codigo_iso, locale). Aceita codigos crus."""
    if label in LANGUAGES:
        return LANGUAGES[label]
    raw = (label or "").strip()
    if "-" in raw:
        return raw.split("-")[0].lower(), raw
    for code, locale in LANGUAGES.values():
        if code == raw.lower():
            return code, locale
    return "en", "en-US"


# ------------------------------------------------------------------ vozes ----
# Vozes neurais do Edge TTS por locale. As marcadas "Multilingual" sustentam
# varios idiomas com o mesmo timbre - otimas para manter a identidade vocal.
VOICE_CATALOG = {
    "pt-BR": [
        "pt-BR-ThalitaMultilingualNeural",
        "pt-BR-FranciscaNeural",
        "pt-BR-AntonioNeural",
        "pt-BR-MacerioMultilingualNeural",
    ],
    "pt-PT": ["pt-PT-RaquelNeural", "pt-PT-DuarteNeural"],
    "en-US": [
        "en-US-AvaMultilingualNeural",
        "en-US-AndrewMultilingualNeural",
        "en-US-EmmaMultilingualNeural",
        "en-US-BrianMultilingualNeural",
        "en-US-JennyNeural",
        "en-US-GuyNeural",
        "en-US-AriaNeural",
    ],
    "en-GB": ["en-GB-SoniaNeural", "en-GB-RyanNeural", "en-GB-LibbyNeural"],
    "es-ES": [
        "es-ES-XimenaNeural",
        "es-ES-ElviraNeural",
        "es-ES-AlvaroNeural",
        "es-ES-ArabellaMultilingualNeural",
    ],
    "es-MX": ["es-MX-DaliaNeural", "es-MX-JorgeNeural"],
    "fr-FR": [
        "fr-FR-VivienneMultilingualNeural",
        "fr-FR-RemyMultilingualNeural",
        "fr-FR-DeniseNeural",
        "fr-FR-HenriNeural",
    ],
    "de-DE": [
        "de-DE-SeraphinaMultilingualNeural",
        "de-DE-FlorianMultilingualNeural",
        "de-DE-KatjaNeural",
        "de-DE-ConradNeural",
    ],
    "it-IT": ["it-IT-GiuseppeMultilingualNeural", "it-IT-ElsaNeural", "it-IT-DiegoNeural"],
    "ja-JP": ["ja-JP-NanamiNeural", "ja-JP-KeitaNeural", "ja-JP-MasaruMultilingualNeural"],
    "ko-KR": ["ko-KR-SunHiNeural", "ko-KR-InJoonNeural", "ko-KR-HyunsuMultilingualNeural"],
    "zh-CN": [
        "zh-CN-XiaoxiaoMultilingualNeural",
        "zh-CN-XiaoxiaoNeural",
        "zh-CN-YunxiNeural",
        "zh-CN-YunyiMultilingualNeural",
    ],
    "ru-RU": ["ru-RU-SvetlanaNeural", "ru-RU-DmitryNeural"],
    "hi-IN": ["hi-IN-SwaraNeural", "hi-IN-MadhurNeural"],
    "ar-SA": ["ar-SA-ZariyahNeural", "ar-SA-HamedNeural"],
    "tr-TR": ["tr-TR-EmelNeural", "tr-TR-AhmetNeural"],
    "nl-NL": ["nl-NL-ColetteNeural", "nl-NL-MaartenNeural"],
    "pl-PL": ["pl-PL-ZofiaNeural", "pl-PL-MarekNeural"],
    "id-ID": ["id-ID-GadisNeural", "id-ID-ArdiNeural"],
    "vi-VN": ["vi-VN-HoaiMyNeural", "vi-VN-NamMinhNeural"],
    "th-TH": ["th-TH-PremwadeeNeural", "th-TH-NiwatNeural"],
    "sv-SE": ["sv-SE-SofieNeural", "sv-SE-MattiasNeural"],
    "nb-NO": ["nb-NO-PernilleNeural", "nb-NO-FinnNeural"],
    "da-DK": ["da-DK-ChristelNeural", "da-DK-JeppeNeural"],
    "fi-FI": ["fi-FI-NooraNeural", "fi-FI-HarriNeural"],
    "el-GR": ["el-GR-AthinaNeural", "el-GR-NestorasNeural"],
    "il-IL": ["he-IL-HilaNeural", "he-IL-AvriNeural"],
    "uk-UA": ["uk-UA-PolinaNeural", "uk-UA-OstapNeural"],
    "ro-RO": ["ro-RO-AlinaNeural", "ro-RO-EmilNeural"],
    "hu-HU": ["hu-HU-NoemiNeural", "hu-HU-TamasNeural"],
    "cs-CZ": ["cs-CZ-VlastaNeural", "cs-CZ-AntoninNeural"],
    "fil-PH": ["fil-PH-BlessicaNeural", "fil-PH-AngeloNeural"],
    "ms-MY": ["ms-MY-YasminNeural", "ms-MY-OsmanNeural"],
    "bn-IN": ["bn-IN-TanishaaNeural", "bn-IN-BashkarNeural"],
    "ta-IN": ["ta-IN-PallaviNeural", "ta-IN-ValluvarNeural"],
    "af-ZA": ["af-ZA-AdriNeural", "af-ZA-WillemNeural"],
}

_DYNAMIC = {"voices": None}


def list_all_voices():
    """Todas as vozes do catalogo, achatadas e ordenadas."""
    seen = []
    for locale in sorted(VOICE_CATALOG):
        for voice in VOICE_CATALOG[locale]:
            if voice not in seen:
                seen.append(voice)
    return seen


def voice_combo():
    """Opcoes do widget de voz: 'auto' primeiro, depois o catalogo completo."""
    return ["auto"] + list_all_voices()


def refresh_dynamic_voices(timeout=20):
    """Consulta o servico Edge pela lista real de vozes (cacheado)."""
    if _DYNAMIC["voices"] is not None:
        return _DYNAMIC["voices"]
    voices = []
    try:
        import asyncio

        import edge_tts  # type: ignore

        async def _fetch():
            return await edge_tts.list_voices()

        data = asyncio.new_event_loop().run_until_complete(_fetch())
        voices = [v["ShortName"] for v in data]
    except Exception:
        try:
            out = subprocess.run(
                ["edge-tts", "--list-voices"], capture_output=True, text=True, timeout=timeout
            ).stdout
            for line in out.splitlines():
                token = line.strip().split()[0] if line.strip() else ""
                if token.count("-") >= 2 and token.endswith("Neural"):
                    voices.append(token)
        except Exception:
            voices = []
    _DYNAMIC["voices"] = voices
    return voices


def pick_voice(locale, requested="auto", gender_hint="feminina", prefer_multilingual=True):
    """Resolve a voz final para um locale, validando contra o catalogo/servico."""
    if requested and requested != "auto":
        return requested

    options = list(VOICE_CATALOG.get(locale, []))
    if not options:
        lang = locale.split("-")[0]
        for loc, voices in VOICE_CATALOG.items():
            if loc.split("-")[0] == lang:
                options = list(voices)
                break
    if not options:
        dynamic = refresh_dynamic_voices()
        options = [v for v in dynamic if v.lower().startswith(locale.lower() + "-")]
    if not options:
        return "en-US-AvaMultilingualNeural"

    if prefer_multilingual:
        multi = [v for v in options if "Multilingual" in v]
        if multi:
            options = multi + [v for v in options if v not in multi]
    return options[0]


def voices_for_locale(locale):
    return VOICE_CATALOG.get(locale, [])
