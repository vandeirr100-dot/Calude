// Idiomas que dá para aprender com a professora.
export const LANGS = {
  en: {
    id: 'en', name: 'inglês', Name: 'Inglês', nameEn: 'English', flag: '🇺🇸', stt: 'en-US', tts: 'en-US',
    accent: 'a clear American accent', sample: 'Hello! This is my voice. Can you hear me well?',
    tips: 'Typical Brazilian difficulties in English: "th" said as f/t/d/s; initial "h" said like the Portuguese "r"; extra vowel at the end of words (big -> "bigi", like -> "laiki"); "-ed" pronounced as an extra syllable or dropped; final "-s" dropped; short vs long vowels (ship/sheep, live/leave, full/fool); the vowel in "mug/cup"; "r" sounds; nasalized final m/n; word stress and the schwa.',
  },
  es: {
    id: 'es', name: 'espanhol', Name: 'Espanhol', nameEn: 'Spanish (Latin American)', flag: '🇲🇽', stt: 'es-MX', tts: 'es-MX',
    accent: 'a clear Latin American Spanish accent', sample: '¡Hola! Esta es mi voz. ¿Me escuchas bien?',
    tips: 'Typical Brazilian difficulties in Spanish: nasalizing vowels (Spanish has no nasal vowels); open/closed e and o; "j" and "g+e/i" (strong /x/); "ll/y"; single "r" (tap) vs "rr" (trill); final "-l" said as "u" (Brasil -> "Brasiu"); "d/t" before i said as "dj/tch" (día -> "djía"); "s" vs "z"; false friends (exquisito, embarazada, oficina) and portunhol mixing.',
  },
  fr: {
    id: 'fr', name: 'francês', Name: 'Francês', nameEn: 'French', flag: '🇫🇷', stt: 'fr-FR', tts: 'fr-FR',
    accent: 'a clear Parisian French accent', sample: 'Bonjour ! Voici ma voix. Tu m’entends bien ?',
    tips: 'Typical Brazilian difficulties in French: "u" vs "ou" (tu/tout); front rounded vowels (eu, œ); the four nasal vowels; the uvular "r"; silent final letters and liaison; "e" muet; open/closed e (é/è); stress always on the last syllable.',
  },
  it: {
    id: 'it', name: 'italiano', Name: 'Italiano', nameEn: 'Italian', flag: '🇮🇹', stt: 'it-IT', tts: 'it-IT',
    accent: 'a clear standard Italian accent', sample: 'Ciao! Questa è la mia voce. Mi senti bene?',
    tips: 'Typical Brazilian difficulties in Italian: double consonants (pala/palla, caro/carro); open/closed e and o; "gli" and "gn"; "c/g" before e/i vs "ch/gh"; nasalizing vowels; reducing or dropping final vowels; "t/d" before i said as "tch/dj"; false friends.',
  },
  de: {
    id: 'de', name: 'alemão', Name: 'Alemão', nameEn: 'German', flag: '🇩🇪', stt: 'de-DE', tts: 'de-DE',
    accent: 'a clear standard German accent', sample: 'Hallo! Das ist meine Stimme. Hörst du mich gut?',
    tips: 'Typical Brazilian difficulties in German: "ch" (ich-Laut and ach-Laut); ü and ö; long vs short vowels; final consonant devoicing (Tag -> "tak"); "r" sounds; "h" pronounced; "z" = ts; "w" = v; adding vowels between consonant clusters (Pferd, Strumpf); word stress.',
  },
  ja: {
    id: 'ja', name: 'japonês', Name: 'Japonês', nameEn: 'Japanese', flag: '🇯🇵', stt: 'ja-JP', tts: 'ja-JP',
    accent: 'clear standard Tokyo Japanese', sample: 'こんにちは！これが私の声です。よく聞こえますか？',
    tips: 'Typical Brazilian difficulties in Japanese: vowel length (obasan/obaasan); geminate consonants (small tsu: kite/kitte); the flap "r"; "tsu" and "fu"; pitch accent; devoiced vowels (desu -> "dess"); not adding Portuguese-style nasalization. Always write Japanese with romaji in parentheses for beginners.',
  },
  ko: {
    id: 'ko', name: 'coreano', Name: 'Coreano', nameEn: 'Korean', flag: '🇰🇷', stt: 'ko-KR', tts: 'ko-KR',
    accent: 'clear standard Seoul Korean', sample: '안녕하세요! 제 목소리예요. 잘 들려요?',
    tips: 'Typical Brazilian difficulties in Korean: plain vs aspirated vs tense consonants (ㄱ/ㅋ/ㄲ, ㄷ/ㅌ/ㄸ, ㅂ/ㅍ/ㅃ, ㅈ/ㅊ/ㅉ); vowels ㅓ vs ㅗ and ㅡ; final consonants (batchim) unreleased; sound changes between syllables. Write romanization in parentheses for beginners.',
  },
  zh: {
    id: 'zh', name: 'mandarim', Name: 'Mandarim', nameEn: 'Mandarin Chinese', flag: '🇨🇳', stt: 'zh-CN', tts: 'zh-CN',
    accent: 'clear standard Mandarin', sample: '你好！这是我的声音。你听得清楚吗？',
    tips: 'Typical Brazilian difficulties in Mandarin: the four tones and neutral tone; retroflex zh/ch/sh/r vs z/c/s vs j/q/x; the vowel ü; aspirated vs unaspirated consonants (b/p, d/t, g/k); final -n vs -ng. Always give pinyin with tone marks for beginners.',
  },
};

export const langOf = (id) => LANGS[id] || LANGS.en;

const CJK = /[぀-ヿ㐀-鿿豈-﫿]/;
// separa a frase em "pedaços" para mostrar/destacar: palavras, ou caracteres em japonês/chinês
export function tokensOf(text) {
  const t = String(text || '').trim();
  if (!t) return [];
  if (CJK.test(t)) return Array.from(t.replace(/\s+/g, '')).filter((c) => /[\p{L}\p{N}]/u.test(c) || c === 'ー');
  return t.split(/\s+/).filter(Boolean);
}
