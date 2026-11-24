// "Cérebro" da Lia: monta o prompt, chama a IA escolhida e interpreta a resposta.
import { httpPost } from './native.js';

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
  iniciante: 'BEGINNER (iniciante). Explain mostly in Brazilian Portuguese, short and simple. Every English sentence must be very short (2-6 words) and very common. Translate each English sentence to Portuguese right after it.',
  basico: 'ELEMENTARY (básico). Mix: simple English sentences followed by a short Portuguese explanation when something is new. English sentences up to ~8 words.',
  intermediario: 'INTERMEDIATE (intermediário). Speak mostly English at a natural but clear pace. Use Portuguese only to translate a new word or clarify a mistake.',
  avancado: 'ADVANCED (avançado). English only. Natural speed, phrasal verbs, idioms, follow-up questions. Correct subtle mistakes.',
};

export function systemPrompt({ level, vocab }) {
  const words = (vocab || []).slice(-25).map((w) => w.en).join(', ') || '(nenhuma ainda)';
  return `You are Lia, a warm, upbeat and patient English tutor on a live video call with a Brazilian student (native language: Brazilian Portuguese).

YOU CAN SEE THE STUDENT'S WORLD: many turns include a photo taken right now by the student's phone camera (their room, what they are doing, objects in their hands, food, the kitchen, the street...). Your method is to teach English from the student's real day-to-day life: notice what they are doing or what is around them and turn it into tiny, practical lessons — vocabulary for objects, verbs for actions (present continuous: "I'm cooking"), and useful phrases for that exact situation.

STUDENT LEVEL: ${LEVELS[level] || LEVELS.iniciante}

CONVERSATION RULES
- This is a SPOKEN call. Keep every turn short: at most 3 short sentences in total. Be natural, friendly and encouraging. No lists, no emojis, no markdown, no special symbols.
- Almost every turn, give the student ONE short English sentence to say out loud (field "repeat"), preferably about what they are doing or seeing right now. Example: "I'm washing the dishes."
- When the student tried to repeat a sentence you will receive an automatic pronunciation score. React honestly: if score >= 80 praise briefly and move on to something new; if lower, say which word(s) to improve and ask them to try once more (give the same "repeat"). Never ask more than twice for the same sentence.
- If the student says something in English with mistakes, give the corrected version kindly.
- If the student speaks Portuguese or asks a question, answer briefly and bring them back to English practice.
- About the image: talk about objects, actions, places, food, colors, weather. Never comment on the student's body, looks or appearance. If the image is dark or unclear, say it briefly and continue the conversation normally. Don't describe the same thing again if you already taught it — vary the topic.
- From time to time review one of the student's saved words: ${words}.

OUTPUT: reply ONLY with a JSON object (no markdown, no text outside it):
{"speech":[{"lang":"pt","text":"..."},{"lang":"en","text":"..."}],"repeat":"","repeat_pt":"","new_words":[{"en":"","pt":""}],"mood":"happy","seen":""}
- "speech": what you say out loud, split in parts by language, in speaking order. English parts use "lang":"en", Portuguese parts use "lang":"pt".
- "repeat": the English sentence the student should say now (or "" if none). "repeat_pt": its Portuguese translation.
- "new_words": up to 3 genuinely new useful words or expressions from this turn (English + Portuguese). Empty list if none.
- "mood": one of happy, neutral, surprised, thinking.
- "seen": a few words in Portuguese about what you see in the photo (or "" if there is no photo).`;
}

export function eventText(kind, data = {}) {
  const noCam = data.hasImage ? '' : '\n(Sem imagem: a câmera está desligada.)';
  switch (kind) {
    case 'start':
      return `[Chamada iniciada] Cumprimente o aluno de forma calorosa e curta, comente em uma frase o que você vê na câmera e comece uma mini-aula sobre isso.${noCam}`;
    case 'review':
      return `[Chamada iniciada — aula de revisão] Cumprimente rapidamente e revise uma por uma as palavras salvas do aluno, pedindo para ele usar cada palavra numa frase curta.${noCam}`;
    case 'look':
      return `[O aluno tocou em "O que estou fazendo?"] Olhe a foto atual e ensine como dizer em inglês o que ele está fazendo ou o que aparece em destaque. Dê uma frase para ele repetir.${noCam}`;
    case 'idle':
      return `[O aluno ficou um tempo em silêncio] Olhe a foto atual e puxe uma conversa curta sobre o que ele está fazendo agora, ou proponha uma frase nova para repetir.${noCam}`;
    case 'user': {
      let t = `O aluno falou (reconhecimento de voz em ${data.lang === 'pt-BR' ? 'português' : 'inglês'}): "${data.text}"`;
      if (data.repeat) {
        t += `\nEle estava tentando repetir: "${data.repeat}". Pontuação automática de pronúncia: ${data.score}%.`;
        if (data.missed && data.missed.length) t += ` Palavras que não foram reconhecidas: ${data.missed.join(', ')}.`;
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
    return { speech: txt ? [{ lang: 'en', text: txt }] : [], repeat: '', repeat_pt: '', new_words: [], mood: 'neutral', seen: '' };
  }
  let speech = Array.isArray(j.speech) ? j.speech : (typeof j.speech === 'string' ? [{ lang: 'en', text: j.speech }] : []);
  speech = speech
    .map((p) => ({ lang: String(p.lang || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en', text: cleanSpeech(p.text) }))
    .filter((p) => p.text);
  const words = (Array.isArray(j.new_words) ? j.new_words : [])
    .filter((w) => w && w.en)
    .slice(0, 3)
    .map((w) => ({ en: String(w.en).trim(), pt: String(w.pt || '').trim() }));
  return {
    speech,
    repeat: cleanSpeech(j.repeat),
    repeat_pt: cleanSpeech(j.repeat_pt),
    new_words: words,
    mood: ['happy', 'neutral', 'surprised', 'thinking', 'sad'].includes(j.mood) ? j.mood : 'neutral',
    seen: cleanSpeech(j.seen),
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
    const withThinking = JSON.parse(JSON.stringify(base));
    withThinking.generationConfig.thinkingConfig = { thinkingLevel: 'low' };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': key };
    res = await httpPost(url, headers, settings._noThink ? base : withThinking);
    if (res.status === 400 && /thinking/i.test(res.text)) {
      settings._noThink = true;
      res = await httpPost(url, headers, base);
    }
    if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
    const j = JSON.parse(res.text);
    const cand = j.candidates && j.candidates[0];
    const text = cand && cand.content && (cand.content.parts || []).filter((p) => !p.thought).map((p) => p.text || '').join('');
    if (!text) throw new Error('A IA não respondeu (talvez a imagem tenha sido bloqueada). Tente de novo.');
    return normalizeReply(text);
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
    return normalizeReply(text);
  }

  // openai
  const messages = [{ role: 'system', content: system }];
  for (const m of history) messages.push({ role: m.role, content: m.text });
  const content = [{ type: 'text', text: userText }];
  if (imageB64) content.push({ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageB64}`, detail: 'low' } });
  messages.push({ role: 'user', content });
  const body = { model, messages, response_format: { type: 'json_object' } };
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` };
  res = await httpPost('https://api.openai.com/v1/chat/completions', headers, settings._noEffort ? body : { ...body, reasoning_effort: 'low' });
  if (res.status === 400 && /reasoning/i.test(res.text)) {
    settings._noEffort = true;
    res = await httpPost('https://api.openai.com/v1/chat/completions', headers, body);
  }
  if (res.status !== 200) throw new Error(errorMessage(res.status, res.text));
  const j = JSON.parse(res.text);
  return normalizeReply(j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content);
}

// ---------- pontuação de pronúncia ----------
const CONTR = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
  "that's": 'that is', "there's": 'there is', "what's": 'what is', "where's": 'where is', "let's": 'let us', "don't": 'do not', "doesn't": 'does not',
  "didn't": 'did not', "can't": 'can not', "cannot": 'can not', "won't": 'will not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not',
  "i've": 'i have', "you've": 'you have', "i'll": 'i will', "you'll": 'you will', "i'd": 'i would', "wanna": 'want to', "gonna": 'going to',
  ok: 'okay',
};
function words(s) {
  return String(s || '').toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/).filter(Boolean)
    .flatMap((w) => (CONTR[w] ? CONTR[w].split(' ') : [w.replace(/^'+|'+$/g, '')]))
    .filter(Boolean);
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
    const extra = Math.max(0, H.length - matched.size);
    let score = Math.round((matched.size / T.length) * 100 - Math.min(15, extra * 4));
    score = Math.max(0, Math.min(100, score));
    if (score > best.score || alt === alternatives[0] && best.score === 0) {
      best = { score, missed: T.filter((_, k) => !matched.has(k)), heard: alt };
    }
  }
  return best;
}
