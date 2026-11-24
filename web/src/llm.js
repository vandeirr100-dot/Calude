// "Cérebro" da Lia: monta o prompt, chama a IA escolhida e interpreta a resposta.
import { httpPost } from './native.js';
import { LANGS, langOf, tokensOf } from './langs.js';

// idioma que o aluno está aprendendo e idioma das explicações
let TL = LANGS.en;
let EXPLAIN = 'pt';
export function setLanguage(target, explain) { TL = langOf(target); EXPLAIN = explain || 'pt'; }
export const targetLang = () => TL;
function fill(s) {
  return String(s)
    .replaceAll('{{L}}', TL.nameEn)
    .replaceAll('{{l}}', TL.name)
    .replaceAll('{{CODE}}', TL.id)
    .replaceAll('{{ACCENT}}', TL.accent)
    .replaceAll('{{TIPS}}', TL.tips);
}
const EXPLAIN_TXT = {
  pt: `EXPLANATION LANGUAGE (chosen by the student, overrides everything else): speak to the student in BRAZILIAN PORTUGUESE for everything — greetings, explanations, questions, instructions, corrections, praise. Use {{L}} ONLY for the words and sentences being taught and practiced: say them clearly, then go back to Portuguese.`,
  mix: `EXPLANATION LANGUAGE (chosen by the student): mix both languages — short, simple {{L}} sentences, each followed by a Portuguese explanation or translation. Grammar explanations and corrections in Portuguese.`,
  target: `EXPLANATION LANGUAGE (chosen by the student): IMMERSION — speak only {{L}}, simply and clearly for the student's level. Use Portuguese only if the student is completely lost or asks for it.`,
};

export const PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-3.5-flash',
    keyUrl: 'https://aistudio.google.com/apikey',
  },
  anthropic: {
    name: 'Anthropic Claude',
    model: 'claude-haiku-5-5',
    keyUrl: 'https://console.anthropic.com/settings/keys',
  },
  openai: {
    name: 'OpenAI',
    model: 'gpt-5.6-luna',
    keyUrl: 'https://platform.openai.com/api-keys',
  },
};

const LEVELS = {
  iniciante: 'BEGINNER (iniciante): very short and very common {{L}} sentences (2-6 words), spoken slowly. One new thing at a time.',
  basico: 'ELEMENTARY (básico): simple everyday {{L}} sentences up to ~8 words, spoken clearly.',
  intermediario: 'INTERMEDIATE (intermediário): natural but clear {{L}}, longer sentences and more varied vocabulary.',
  avancado: 'ADVANCED (avançado): natural speed {{L}}, idioms, nuance and follow-up questions; correct subtle mistakes.',
};

const CORRECTION = {
  realtime: `REAL-TIME CORRECTION MODE (the student asked to be corrected every time):
- After EVERY sentence the student says in {{L}}, check grammar, word choice and pronunciation. The speech recognizer writes what it heard: strange or wrong words in the transcript usually mean a pronunciation problem — treat them as pronunciation mistakes.
- If there is ANY mistake, fill "correction" with what they said, the correct sentence and a very short explanation in Portuguese, say the correct sentence out loud, and put the correct sentence in "repeat" so they practice it right away. Then continue the conversation in the next turn.
- If the sentence was correct, leave "correction" empty and praise briefly (vary the praise).`,
  light: `LIGHT CORRECTION MODE: only correct mistakes that change the meaning or make the sentence hard to understand. Fill "correction" only in those cases. Prioritize keeping the conversation flowing.`,
  off: `NO CORRECTION MODE: do not correct the student's grammar; keep "correction" empty and just keep the conversation going naturally (you may model the right form in your own answer).`,
};

export const CURIOUS = `CURIOUS TEACHER: be genuinely curious and proactive, like a friend on a video call. Keep looking at the camera images and ASK the student about what you see and what they are doing ("What are you doing now?", "Is that your coffee?", "Are you cooking something?", "Where are you going later?"). One question at a time, short and simple for their level. When the student is quiet, look again and ask something new about the scene.`;
export const PT_BRIDGE = `PORTUGUESE ANSWERS ARE WELCOME: the student may answer in Portuguese. When they do, first react naturally to WHAT they said (show you understood), then teach them how to say EXACTLY that in {{L}}: say the {{L}} sentence slowly and clearly, translate key words if needed, and ask them to repeat it (put that sentence in the phrase to repeat). After they repeat it, praise/correct and continue with a new curious question. Never scold them for using Portuguese.`;
export const MEANING = `MEANING MASTERY METHOD (mandatory, follow it for every sentence you teach):
1) Every {{L}} sentence you teach comes with its Brazilian Portuguese translation (say it and show it).
2) First the student must PRONOUNCE it correctly (the app measures it and tells you).
3) Then CHECK COMPREHENSION: ask in Portuguese what it means ("O que significa '...'?" / "Como você traduz isso?") or ask the meaning of a key word. The student answers in Portuguese.
4) If the translation is wrong, incomplete or vague, do NOT move on: explain again in a simpler way (break it into words, give an everyday example, a mental image), then ask again. Insist kindly until they translate it correctly and fully.
5) Only after correct pronunciation AND correct translation, praise and move to the next sentence. A few turns later, quickly ask again the meaning of an earlier sentence to make sure it stuck.`;

export function behaviorText({ curious, ptBridge, meaning }) {
  return [meaning ? MEANING : '', curious ? CURIOUS : '', ptBridge ? PT_BRIDGE : ''].filter(Boolean).join('\n');
}

function systemPromptRaw({ level, vocab, correct = 'realtime', tutor = 'Lia', scenario = '', behavior = '' }) {
  const words = (vocab || []).slice(-25).map((w) => w.en).join(', ') || '(nenhuma ainda)';
  return `You are ${tutor}, a warm, upbeat and patient {{L}} tutor on a live video call with a Brazilian student (native language: Brazilian Portuguese).

YOU CAN SEE THE STUDENT'S WORLD: many turns include a photo taken right now by the student's phone camera (their room, what they are doing, objects in their hands, food, the kitchen, the street...). Your method is to teach {{L}} from the student's real day-to-day life: notice what they are doing or what is around them and turn it into tiny, practical lessons — vocabulary for objects, verbs for actions (present continuous: "I'm cooking"), and useful phrases for that exact situation.

STUDENT LEVEL: ${LEVELS[level] || LEVELS.iniciante}

${EXPLAIN_TXT[EXPLAIN] || EXPLAIN_TXT.pt}
${scenario ? `\nTODAY'S LESSON: ${scenario}\n` : ''}${behavior ? `\n${behavior}\n` : ''}
PRONUNCIATION FOCUS: {{TIPS}}

CONVERSATION RULES
- This is a SPOKEN call. Keep every turn short: at most 3 short sentences in total. Be natural, friendly and encouraging. No lists, no emojis, no markdown, no special symbols.
- Almost every turn, give the student ONE short {{L}} sentence to say out loud (field "repeat"), preferably about what they are doing or seeing right now. 
- When the student tried to repeat a sentence you will receive an automatic pronunciation score. React honestly: if score >= 80 praise briefly and move on to something new; if lower, say which word(s) to improve and ask them to try once more (give the same "repeat"). Never ask more than twice for the same sentence.
${CORRECTION[correct] || CORRECTION.realtime}
- If the student speaks Portuguese or asks a question, answer briefly and bring them back to {{L}} practice.
- About the image: talk about objects, actions, places, food, colors, weather. Never comment on the student's body, looks or appearance. If the image is dark or unclear, say it briefly and continue the conversation normally. Don't describe the same thing again if you already taught it — vary the topic.
- From time to time review one of the student's saved words: ${words}.

OUTPUT: reply ONLY with a JSON object (no markdown, no text outside it):
{"speech":[{"lang":"pt","text":"..."},{"lang":"{{CODE}}","text":"..."}],"correction":{"said":"","correct":"","explain_pt":""},"repeat":"","repeat_pt":"","expect":"repeat","new_words":[{"word":"","pt":""}],"mood":"happy","seen":""}
- "speech": what you say out loud, split in parts by language, in speaking order. {{L}} parts use "lang":"{{CODE}}", Portuguese parts use "lang":"pt".
- "correction": when correcting the student, "said" = what they said (as heard), "correct" = the right {{L}} sentence, "explain_pt" = a very short reason in Portuguese (max 12 words). Otherwise use empty strings.
- "repeat": the {{L}} sentence the student should say now (or "" if none). "repeat_pt": its Portuguese translation.
- "expect": what you expect the student to say next: "repeat" (repeat the sentence in {{L}}), "pt" (answer in Portuguese, e.g. the translation/meaning), or "any".
- "new_words": up to 3 genuinely new useful words or expressions from this turn ("word" in {{L}} + "pt" translation). Empty list if none.
- "mood": one of happy, neutral, surprised, thinking.
- "seen": a few words in Portuguese about what you see in the photo (or "" if there is no photo).`;
}

export const PASS_SCORE = 85;
export function verdictText(score, missed = [], issue = '') {
  if (score >= PASS_SCORE) return `VEREDITO DO APP: APROVADO (${score}%). Elogie brevemente e siga o método (confira se ele sabe o significado/tradução).`;
  return `VEREDITO DO APP: NÃO APROVADO (${score}%, mínimo ${PASS_SCORE}%). NÃO diga que está certo e NÃO elogie a pronúncia. Mostre exatamente o som errado${missed && missed.length ? ` (${missed.join(', ')})` : ''}${issue ? ` — ${issue}` : ''}, fale a palavra devagar, explique em português como posicionar boca/língua e peça para repetir a mesma frase de novo.`;
}

function eventTextRaw(kind, data = {}) {
  const noCam = data.hasImage ? '' : '\n(Sem imagem: a câmera está desligada.)';
  switch (kind) {
    case 'start':
      return `[Chamada iniciada] Cumprimente o aluno de forma calorosa e curta e comece a aula de hoje (veja TODAY'S LESSON, se houver). Se fizer sentido, comente em uma frase o que você vê na câmera.${noCam}`;
    case 'review':
      return `[Chamada iniciada — aula de revisão] Cumprimente rapidamente e revise uma por uma as palavras salvas do aluno, pedindo para ele usar cada palavra numa frase curta.${noCam}`;
    case 'look':
      return `[O aluno tocou em "O que estou fazendo?"] Olhe a foto atual e ensine como dizer em {{l}} o que ele está fazendo ou o que aparece em destaque. Dê uma frase para ele repetir.${noCam}`;
    case 'curious':
      return `[O aluno está quieto há um tempo] Olhe a foto atual com curiosidade e pergunte, de forma curta e simpática, o que ele está fazendo ou sobre algo que você vê. Se ele responder em português, você vai ensinar a dizer aquilo em {{l}}.${noCam}`;
    case 'attempt': {
      let t = `[Resultado da tentativa — avaliação automática RIGOROSA feita pelo app ouvindo o áudio]\nFrase pedida: "${data.repeat}"\nO que o aluno disse: "${data.heard || '(inaudível)'}"\nNota: ${data.score}%.`;
      if (data.missed && data.missed.length) t += ` Palavras com problema: ${data.missed.join(', ')}.`;
      if (data.issue) t += ` Problema: ${data.issue}.`;
      return t + '\n' + verdictText(data.score, data.missed, data.issue);
    }
    case 'notAttempt':
      return `[O aluno não tentou repetir a frase; ele disse: "${data.heard}"] Responda ao que ele disse (se for português, entenda e ajude) e depois volte para a frase.`;
    case 'idle':
      return `[O aluno ficou um tempo em silêncio] Olhe a foto atual e puxe uma conversa curta sobre o que ele está fazendo agora, ou proponha uma frase nova para repetir.${noCam}`;
    case 'user': {
      let t = `O aluno falou (reconhecimento de voz${data.lang === 'pt-BR' ? ' em português' : data.lang === 'auto' ? ' — pode ser português ou {{l}}' : ' em {{l}}'}): "${data.text}"`;
      if (data.lang !== 'tg' && data.bridge) t += '\n(Se ele falou em português, ensine a dizer exatamente isso em {{l}} e peça para repetir.)';
      if (data.repeat) {
        t += `\nEle estava tentando repetir: "${data.repeat}". Pontuação automática de pronúncia: ${data.score}%.`;
        if (data.missed && data.missed.length) t += ` Palavras com problema: ${data.missed.join(', ')}.`;
        if (data.issue) t += ` Avaliação pelo som do áudio: ${data.issue}.`;
        t += '\n' + verdictText(data.score, data.missed, data.issue);
      }
      return t + noCam;
    }
    default:
      return String(data.text || '');
  }
}

function tryParse(text) {
  if (!text) return null;
  let t = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return null; }
}

function cleanSpeech(s) {
  return String(s || '')
    .replace(/[*_#`~>|]/g, '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeReply(raw) {
  const j = tryParse(raw);
  if (!j) {
    const txt = cleanSpeech(raw).slice(0, 400);
    return { speech: txt ? [{ lang: 'tg', text: txt }] : [], correction: null, repeat: '', repeat_pt: '', new_words: [], mood: 'neutral', seen: '', expect: 'any' };
  }
  let speech = Array.isArray(j.speech) ? j.speech : (typeof j.speech === 'string' ? [{ lang: 'tg', text: j.speech }] : []);
  speech = speech
    .map((p) => ({ lang: String(p.lang || 'tg').toLowerCase().startsWith('pt') ? 'pt' : 'tg', text: cleanSpeech(p.text) }))
    .filter((p) => p.text);
  const words = (Array.isArray(j.new_words) ? j.new_words : [])
    .filter((w) => w && (w.word || w.en))
    .slice(0, 3)
    .map((w) => ({ en: String(w.word || w.en).trim(), pt: String(w.pt || '').trim() }));
  let correction = null;
  const c = j.correction;
  if (c && typeof c === 'object' && cleanSpeech(c.correct)) {
    const said = cleanSpeech(c.said), correct = cleanSpeech(c.correct);
    const same = said.toLowerCase().replace(/[^a-z ]/g, '') === correct.toLowerCase().replace(/[^a-z ]/g, '');
    if (!same) correction = { said, correct, explain: cleanSpeech(c.explain_pt) };
  }
  return {
    speech,
    correction,
    repeat: cleanSpeech(j.repeat),
    repeat_pt: cleanSpeech(j.repeat_pt),
    new_words: words,
    mood: ['happy', 'neutral', 'surprised', 'thinking', 'sad'].includes(j.mood) ? j.mood : 'neutral',
    seen: cleanSpeech(j.seen),
    expect: ['repeat', 'pt', 'any'].includes(j.expect) ? j.expect : (cleanSpeech(j.repeat) ? 'repeat' : 'any'),
  };
}

function errorMessage(status, text) {
  let msg = '';
  try {
    const j = JSON.parse(text);
    msg = (j.error && (j.error.message || j.error.type)) || j.message || '';
  } catch { msg = (text || '').slice(0, 160); }
  if (status === 0) return 'Sem conexão com a internet (ou a IA demorou demais).';
  if (status === 401 || status === 403 || /api key|API_KEY|invalid.*key|authentication/i.test(msg)) return 'Chave da API inválida ou sem permissão. Confira nas Configurações.';
  if (status === 429) return 'Limite de uso da IA atingido. Espere um pouco ou confira seu plano/créditos.';
  if (status === 404) return `Modelo não encontrado. Troque o nome do modelo nas Configurações. (${msg})`;
  if (status === 402 || /credit|billing|quota/i.test(msg)) return 'Sem créditos na conta da IA. Confira o faturamento da sua conta.';
  return `Erro da IA (${status}): ${msg}`;
}

const thinkIdx = {};

// history: [{role:'user'|'assistant', text}]  — a imagem vai só na última mensagem
export async function askLLM(settings, system, history, userText, imageB64) {
  const prov = settings.provider;
  const model = (settings.model || PROVIDERS[prov].model).trim();
  const key = (settings.key || '').trim();
  if (!key) throw new Error('Coloque sua chave da API nas Configurações.');
  let res;

  if (prov === 'gemini') {
    const contents = history.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] }));
    const parts = [{ text: userText }];
    if (imageB64) parts.unshift({ inline_data: { mime_type: 'image/jpeg', data: imageB64 } });
    contents.push({ role: 'user', parts });
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const base = {
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { temperature: 0.8, maxOutputTokens: 1200, responseMimeType: 'application/json' },
    };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': key };
    // menos "pensamento" = resposta mais rápida (conversa mais próxima do tempo real)
    const levels = ['minimal', 'low', null];
    let li = thinkIdx[model] || 0;
    for (;;) {
      const body = JSON.parse(JSON.stringify(base));
      if (levels[li]) body.generationConfig.thinkingConfig = { thinkingLevel: levels[li] };
      res = await httpPost(url, headers, body);
      if (res.status === 400 && /thinking/i.test(res.text) && li < levels.length - 1) { li++; thinkIdx[model] = li; continue; }
      break;
    }
    if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
    const j = JSON.parse(res.text);
    const cand = j.candidates && j.candidates[0];
    const text = cand && cand.content && (cand.content.parts || []).filter((p) => !p.thought).map((p) => p.text || '').join('');
    if (!text) throw new Error('A IA não respondeu (talvez a imagem tenha sido bloqueada). Tente de novo.');
    const u = j.usageMetadata || {};
    return { ...normalizeReply(text), usage: { in: u.promptTokenCount || 0, out: (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0) } };
  }

  if (prov === 'anthropic') {
    const messages = history.map((m) => ({ role: m.role, content: m.text }));
    const content = [{ type: 'text', text: userText }];
    if (imageB64) content.unshift({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageB64 } });
    messages.push({ role: 'user', content });
    res = await httpPost('https://api.anthropic.com/v1/messages', {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    }, { model, max_tokens: 800, system, messages });
    if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
    const j = JSON.parse(res.text);
    const text = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
    const u = j.usage || {};
    return { ...normalizeReply(text), usage: { in: u.input_tokens || 0, out: u.output_tokens || 0 } };
  }

  // openai
  const messages = [{ role: 'system', content: system }];
  for (const m of history) messages.push({ role: m.role, content: m.text });
  const content = [{ type: 'text', text: userText }];
  if (imageB64) content.push({ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageB64}`, detail: 'low' } });
  messages.push({ role: 'user', content });
  const body = { model, messages, response_format: { type: 'json_object' } };
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` };
  const efforts = ['minimal', 'low', null];
  let ei = thinkIdx['oa:' + model] || 0;
  for (;;) {
    res = await httpPost('https://api.openai.com/v1/chat/completions', headers, efforts[ei] ? { ...body, reasoning_effort: efforts[ei] } : body);
    if (res.status === 400 && /reasoning/i.test(res.text) && ei < efforts.length - 1) { ei++; thinkIdx['oa:' + model] = ei; continue; }
    break;
  }
  if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
  const j = JSON.parse(res.text);
  const u = j.usage || {};
  return { ...normalizeReply(j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content), usage: { in: u.prompt_tokens || 0, out: u.completion_tokens || 0 } };
}

// ---------- pontuação de pronúncia ----------
const CONTR = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
  "that's": 'that is', "there's": 'there is', "what's": 'what is', "where's": 'where is', "let's": 'let us', "don't": 'do not', "doesn't": 'does not',
  "didn't": 'did not', "can't": 'can not', "cannot": 'can not', "won't": 'will not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not',
  "i've": 'i have', "you've": 'you have', "i'll": 'i will', "you'll": 'you will', "i'd": 'i would', "wanna": 'want to', "gonna": 'going to',
  ok: 'okay',
};
const CJK_RE = /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/;
function words(s) {
  const str = String(s || '');
  if (CJK_RE.test(str)) return Array.from(str).filter((c) => /[\p{L}\p{N}]/u.test(c));
  return str.toLowerCase().replace(/[’`]/g, "'").normalize('NFD').replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}' ]+/gu, ' ')
    .split(/\s+/).filter(Boolean)
    .flatMap((w) => (TL.id === 'en' && CONTR[w] ? CONTR[w].split(' ') : [w.replace(/^'+|'+$/g, '')]))
    .filter(Boolean);
}

// para destacar ao vivo: quais palavras da frase-alvo já foram ditas
export function liveMatch(target, heard) {
  const tokens = tokensOf(target);
  const H = words(heard);
  let j = 0;
  return tokens.map((tok) => {
    const parts = words(tok);
    if (!parts.length) return true;
    let ok = true;
    for (const p of parts) {
      const k = H.indexOf(p, j);
      if (k === -1) { ok = false; break; }
      j = k + 1;
    }
    return ok;
  });
}

export function pronunciationScore(target, alternatives) {
  const T = words(target);
  if (!T.length) return null;
  let best = { score: 0, missed: T.slice(), heard: alternatives[0] || '' };
  for (const alt of alternatives) {
    const H = words(alt);
    // LCS entre palavras
    const dp = Array.from({ length: T.length + 1 }, () => new Array(H.length + 1).fill(0));
    for (let i = 1; i <= T.length; i++) {
      for (let j = 1; j <= H.length; j++) {
        dp[i][j] = T[i - 1] === H[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    const matched = new Set();
    let i = T.length, j = H.length;
    while (i > 0 && j > 0) {
      if (T[i - 1] === H[j - 1]) { matched.add(i - 1); i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--;
    }
    const extra = Math.max(0, H.length - T.length);
    let score = Math.round((matched.size / T.length) * 100 - Math.min(15, extra * 4));
    score = Math.max(0, Math.min(100, score));
    if (score > best.score || alt === alternatives[0] && best.score === 0) {
      best = { score, missed: T.filter((_, k) => !matched.has(k)), heard: alt };
    }
  }
  return best;
}

// ================= modo ao vivo =================
function liveSystemPromptRaw({ level, vocab, correct = 'realtime', tutor = 'Lia', scenario = '', due = [], behavior = '' }) {
  // (a pronúncia é medida pelo app; ver PRONUNCIATION IS MEASURED BY THE APP)
  const words = (vocab || []).slice(-25).map((w) => w.en).join(', ') || '(none yet)';
  const dueTxt = due.length ? due.slice(0, 12).map((w) => `${w.en} (${w.pt})`).join(', ') : '';
  return `You are ${tutor}, a warm, upbeat and patient {{L}} tutor on a LIVE VOICE + VIDEO CALL with a Brazilian student (native language: Brazilian Portuguese). You talk in real time, like a real person on a call.

YOU CAN SEE: you periodically receive images from the student's phone camera (their room, what they are doing, objects, food, the street). Teach {{L}} from the student's real day-to-day life: notice what they are doing or what is around them and turn it into tiny, practical lessons (objects, actions in present continuous, useful phrases for that exact situation).

YOU CAN HEAR THE REAL VOICE: judge pronunciation from the SOUND, not only the words. Pay special attention to: {{TIPS}} Explain how to place the tongue/lips briefly in Portuguese when needed.

STUDENT LEVEL: ${LEVELS[level] || LEVELS.iniciante}

${EXPLAIN_TXT[EXPLAIN] || EXPLAIN_TXT.pt}
${scenario ? `\nTODAY'S LESSON: ${scenario}\n` : ''}${behavior ? `\n${behavior}\n` : ''}
${CORRECTION[correct] || CORRECTION.realtime}

SPEAKING STYLE
- Short turns (1-3 short sentences), natural, friendly, encouraging, with natural pauses. Speak {{L}} clearly; for beginners speak {{L}} slowly.
- Almost every turn, give the student ONE short {{L}} sentence to say out loud, preferably about what they are doing or seeing right now.
- Never talk about the student's body, looks or appearance. If the image is unclear, just continue.
- Vary topics; don't repeat what you already taught.
- Student's saved words (review some from time to time): ${words}.
${dueTxt ? `- Words due for review today (review these first, one by one): ${dueTxt}.` : ''}

PRONUNCIATION IS MEASURED BY THE APP: after you call show_phrase, stop talking and wait — the app records the student's attempt and sends you a strict automatic evaluation as a text message ("VEREDITO DO APP"). Always follow it: if it says NÃO APROVADO, never say it was correct and don't praise the pronunciation; point out the exact sound, model the word slowly, explain briefly in Portuguese how to place tongue/lips, and call show_phrase again with the same sentence. Only praise when it says APROVADO.

SCREEN TOOLS — the student also SEES a screen. Use these tools while you speak (never read the tool arguments aloud, never mention the tools):
- show_phrase: EVERY time you ask the student to repeat/say a sentence.
- show_correction: EVERY time you correct a mistake.
- save_words: when you teach new useful words/expressions (max 3 at a time).

Start the call now: greet the student warmly and briefly, say in one sentence what you see on the camera (if anything) and start the first mini-lesson.`;
}

// ================= voz natural (Gemini TTS) =================
const TTS_MODELS = ['gemini-3.1-flash-tts-preview', 'gemini-2.5-flash-preview-tts'];
let ttsModelIdx = 0;
export async function ttsGemini(key, text, voice, slow = false) {
  const prompt = slow
    ? `Say this slowly and very clearly, like an {{L}} teacher modeling pronunciation, with a short pause between words: ${text}`
    : `Say this warmly and naturally, like a friendly teacher on a video call. Portuguese parts in Brazilian Portuguese, {{L}} parts with {{ACCENT}}: ${text}`;
  const promptF = fill(prompt);
  for (let i = ttsModelIdx; i < TTS_MODELS.length; i++) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODELS[i]}:generateContent`;
    const res = await httpPost(url, { 'Content-Type': 'application/json', 'x-goog-api-key': key }, {
      contents: [{ parts: [{ text: promptF }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice || 'Aoede' } } },
      },
    }, 45000);
    if (res.status === 404 || (res.status === 400 && /model|not found|not supported/i.test(res.text))) { ttsModelIdx = i + 1; continue; }
    if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
    const j = JSON.parse(res.text);
    const parts = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || [];
    const a = parts.find((p) => p.inlineData && p.inlineData.data);
    if (!a) throw new Error('A voz natural não retornou áudio.');
    const m = /rate=(\d+)/.exec(a.inlineData.mimeType || '');
    return { b64: a.inlineData.data, rate: m ? Number(m[1]) : 24000 };
  }
  throw new Error('Nenhum modelo de voz natural disponível.');
}

// ================= pronúncia avaliada pelo som =================
export async function assessPronunciation(settings, wavB64, target, level) {
  const model = settings.model || PROVIDERS.gemini.model;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const prompt = `You are a STRICT {{L}} pronunciation examiner for Brazilian learners (level: ${level}).
The audio is a Brazilian student who was asked to say exactly: "${target}".
Listen to the ACTUAL SOUNDS, phoneme by phoneme. Do NOT be generous: being understandable is NOT enough.
Errors you MUST catch and penalize: {{TIPS}} Also missing or extra words.
Rules: any wrong sound (or wrong tone, for tonal languages) in a word marks that word as not ok. One clearly wrong sound => score at most 80. Two or more wrong sounds or a missing word => at most 65. Different sentence or mostly unclear => at most 40. Only give 90+ if EVERY sound is correct and clear.
If the student did not try to say the sentence at all (silence, said something else, spoke Portuguese), set "is_attempt": false.
Reply ONLY with JSON:
{"is_attempt":true,"heard":"what the student actually said, as you heard it","score":0,"words":[{"w":"each word of the target sentence in order (for Japanese/Chinese: each character)","ok":true}],"issue_pt":"the exact wrong sound(s), in Portuguese (e.g. 'o TH de think saiu como F')","tip_pt":"one short practical tip in Portuguese on how to place tongue/lips (or short praise if perfect)"}`;
  const res = await httpPost(url, { 'Content-Type': 'application/json', 'x-goog-api-key': settings.key }, {
    contents: [{ role: 'user', parts: [{ inline_data: { mime_type: 'audio/wav', data: wavB64 } }, { text: fill(prompt) }] }],
    generationConfig: { temperature: 0, maxOutputTokens: 800, responseMimeType: 'application/json' },
  });
  if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
  const j = JSON.parse(res.text);
  const cand = j.candidates && j.candidates[0];
  const text = cand && cand.content && (cand.content.parts || []).filter((p) => !p.thought).map((p) => p.text || '').join('');
  const r = tryParse(text) || {};
  const u = j.usageMetadata || {};
  const heard = String(r.heard || '');
  const words = Array.isArray(r.words) ? r.words.map((w) => ({ w: String(w.w || ''), ok: !!w.ok })) : [];
  let score = Math.max(0, Math.min(100, Math.round(Number(r.score) || 0)));
  // trava de segurança: a nota não pode passar das palavras erradas nem do texto ouvido
  const bad = words.filter((w) => !w.ok).length;
  if (bad === 1) score = Math.min(score, 80);
  if (bad >= 2) score = Math.min(score, 65);
  const txt = pronunciationScore(target, [heard]);
  if (txt && txt.score < 100) score = Math.min(score, txt.score >= 80 ? 78 : 60);
  return {
    isAttempt: r.is_attempt !== false,
    heard,
    score,
    words,
    issue: String(r.issue_pt || ''),
    tip: String(r.tip_pt || ''),
    usage: { in: u.promptTokenCount || 0, out: (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0) },
  };
}

export const systemPrompt = (o) => fill(systemPromptRaw(o));
export const liveSystemPrompt = (o) => fill(liveSystemPromptRaw(o));
export const eventText = (k, d) => fill(eventTextRaw(k, d));
