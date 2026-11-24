import { Avatar, PROFILES } from './avatar.js';
import * as N from './native.js';
import {
  PROVIDERS, systemPrompt, eventText, askLLM, pronunciationScore, liveMatch,
  liveSystemPrompt, ttsGemini, assessPronunciation, behaviorText, PASS_SCORE, setLanguage,
} from './llm.js';
import { LANGS, langOf, tokensOf } from './langs.js';
import { connectLive, LIVE_TOOLS, LIVE_MODELS } from './live.js';
import {
  SCENARIOS, scenarioById, srsInit, srsGrade, dueWords, boxLabel, today, weekMinutes, monthKey,
  sceneSignature, sceneDiff,
} from './lessons.js';

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- armazenamento ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem('lia.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('lia.' + k, JSON.stringify(v)); } catch { /* ok */ } },
};

const DEFAULTS = {
  provider: 'gemini', keys: {}, models: {}, level: 'iniciante', rate: 0.9, voice: '', autoLook: 60,
  handsFree: true, camDefault: true, correct: 'realtime', boost: 6,
  mode: 'live', duplex: false, liveModel: LIVE_MODELS[0], soundPron: true, voiceMode: 'natural',
  tutor: 'lia', scenario: 'daily', curious: true, ptBridge: true, meaning: true, curiousEvery: 25, target: 'en', explain: 'pt', voiceLang: '', goal: 60, reminder: false, reminderTime: '19:00', price: '', quality: 'high',
};
let S = { ...DEFAULTS, ...store.get('settings', {}) };
// versões antigas forçavam volume alto: volta para um reforço moderado uma única vez
if (!S.volFix1) { if (S.boost >= 9) S.boost = 6; S.volFix1 = true; store.set('settings', S); }
const VOICES = { lia: 'Aoede', maya: 'Kore', ben: 'Puck' };
const TL = () => langOf(S.target);
setLanguage(S.target, S.explain);

const geminiKey = () => (S.keys.gemini || '').trim();
const settingsForLLM = () => ({ provider: S.provider, key: S.keys[S.provider] || '', model: S.models[S.provider] || PROVIDERS[S.provider].model });
const liveAvailable = () => S.mode === 'live' && S.provider === 'gemini' && !!geminiKey();
const naturalVoice = () => S.voiceMode === 'natural' && !!geminiKey();
const tutorName = () => PROFILES[S.tutor].name;
const isCurious = () => !!(S.curious || st.scenario.curious);
const ptBridge = () => !!(S.ptBridge || st.scenario.ptBridge);
const behavior = () => behaviorText({ curious: isCurious(), ptBridge: ptBridge(), meaning: !!S.meaning });
const androidVoice = () => (S.voice && S.voiceLang === S.target ? S.voice : (PROFILES[S.tutor].gender === 'm' ? 'auto:male' : 'auto:female'));

let vocab = store.get('vocab', []).map(srsInit);
// palavras do idioma que está sendo estudado agora
const myVocab = () => vocab.filter((w) => (w.lang || 'en') === S.target);
let days = store.get('days', []);
let mins = store.get('mins', {});
let usage = store.get('usage', {}); // { 'AAAA-MM': {in, out} }

// ---------- avatar ----------
const avatar = new Avatar($('avatar'), S.tutor, S.quality);
window.lia = { avatar, get st() { return st; } };

// ---------- estado ----------
const st = {
  inCall: false, busy: false, speaking: false, listening: false, practicing: false,
  camOn: false, facing: 'user', stream: null, speakerOn: true,
  lang: 'tg', repeat: null, repeatTries: 0, history: [], corr: null,
  lastActivity: Date.now(), silences: 0, callId: 0, hearId: 0, startedAt: 0,
  live: null, liveMode: false, micOn: true, dropAudio: false, turnOpen: false,
  tutorText: '', userText: '', lastSig: null, lastSigAt: 0, frameTimer: null,
  scenario: scenarioById(S.scenario), sess: null,
  expect: 'any', awaitRepeat: false, cap: null, judging: false,
};

function newSession() {
  return { start: Date.now(), phrases: [], scores: [], corrections: [], words: [], tokens: { in: 0, out: 0 }, problems: {} };
}

// ---------- helpers de UI ----------
let toastT;
function toast(msg, ms = 3200) {
  const t = $('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms);
}
function setStatus(s) { $('status').textContent = s; }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function addUsage(u) {
  if (!u) return;
  const k = monthKey();
  usage[k] = usage[k] || { in: 0, out: 0 };
  usage[k].in += u.in || 0; usage[k].out += u.out || 0;
  if (st.sess) { st.sess.tokens.in += u.in || 0; st.sess.tokens.out += u.out || 0; }
  store.set('usage', usage);
}
function costText(tokens) {
  const price = parseFloat(String(S.price).replace(',', '.'));
  const k = (tokens / 1000).toFixed(tokens < 10000 ? 1 : 0);
  if (!price) return `${k} mil tokens`;
  const usd = (tokens / 1e6) * price;
  return `${k} mil tokens ≈ US$ ${usd < 0.01 ? usd.toFixed(4) : usd.toFixed(2)}`;
}

function renderHome() {
  const set = new Set(days);
  let streak = 0;
  const d = new Date();
  const key = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  if (!set.has(key(d))) d.setDate(d.getDate() - 1);
  while (set.has(key(d))) { streak++; d.setDate(d.getDate() - 1); }
  $('streak').textContent = `🔥 ${streak} ${streak === 1 ? 'dia' : 'dias'}`;
  const mv = myVocab();
  $('wordCount').textContent = `📚 ${mv.length} ${mv.length === 1 ? 'palavra' : 'palavras'}`;
  $('homeTarget').value = S.target;
  $('homeExplain').value = S.explain;
  $('status').textContent = st.inCall ? $('status').textContent : `Professor${PROFILES[S.tutor].gender === 'm' ? '' : 'a'} de ${TL().name}`;
  const lv = { iniciante: 'Iniciante', basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' };
  $('levelChip').textContent = `🎯 ${lv[S.level]}`;
  const wk = weekMinutes(mins);
  $('goalTxt').textContent = `${wk} de ${S.goal} min${wk >= S.goal ? ' ✅' : ''}`;
  $('goalBar').style.width = `${Math.min(100, (wk / S.goal) * 100)}%`;
  const due = dueWords(mv).length;
  $('dueN').textContent = due;
  $('btnReview').style.opacity = mv.length ? 1 : 0.5;
  const hasKey = !!S.keys[S.provider];
  $('btnStart').querySelector('span').textContent = hasKey ? `Começar aula com ${tutorName()}` : 'Configurar para começar';
  const p = PROFILES[S.tutor];
  $('homeTitle').textContent = `Oi! Eu sou ${p.gender === 'm' ? 'o' : 'a'} ${p.name}`;
  $('tutorName').textContent = p.name;
  document.querySelectorAll('#tutorPick button').forEach((b) => b.classList.toggle('on', b.dataset.t === S.tutor));
  $('scenList').innerHTML = SCENARIOS.map((s) => `<button data-s="${s.id}" class="${s.id === st.scenario.id ? 'on' : ''}"><b>${s.emoji} ${esc(s.title)}</b><small>${esc(s.desc)}</small></button>`).join('');
  $('qCurious').classList.toggle('on', !!S.curious);
  $('qPt').classList.toggle('on', !!S.ptBridge);
  $('qPt').innerHTML = `<span class="sw"></span>🇧🇷➜${TL().flag} Responder em português<small>ela ensina a dizer em ${TL().name}</small>`;
  $('qMeaning').classList.toggle('on', !!S.meaning);
  const b = $('wordsBadge');
  b.textContent = due || mv.length; b.classList.toggle('hidden', !mv.length);
  scheduleReminder();
}

let lastReminderSig = '';
function scheduleReminder() {
  const [h, m] = String(S.reminderTime || '19:00').split(':').map(Number);
  const next = new Date(); next.setHours(h || 19, m || 0, 0, 0);
  if (next < new Date()) next.setDate(next.getDate() + 1);
  const n = dueWords(myVocab(), next.getTime()).length;
  const text = n ? `Você tem ${n} ${n === 1 ? 'palavra' : 'palavras'} para revisar hoje. São só uns minutinhos!` : `Que tal 5 minutinhos de ${TL().name} hoje?`;
  const sig = `${S.reminder}|${h}|${m}|${tutorName()}|${text}`;
  if (sig === lastReminderSig) return;
  lastReminderSig = sig;
  N.setReminder(!!S.reminder, h || 19, m || 0, `Hora do ${TL().name} com ${tutorName()}! ${TL().flag}`, text);
}

// ---------- câmera ----------
async function camStart() {
  camStop();
  try {
    st.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: st.facing }, width: { ideal: 960 }, height: { ideal: 720 } }, audio: false,
    });
    const v = $('cam');
    v.srcObject = st.stream;
    await v.play().catch(() => {});
    st.camOn = true;
    st.lastSig = null;
    $('pip').classList.remove('hidden');
    $('pip').classList.toggle('mirror', st.facing === 'user');
  } catch (e) {
    st.camOn = false;
    $('pip').classList.add('hidden');
    toast('Não consegui abrir a câmera. Verifique a permissão do app.');
  }
  $('btnCam').classList.toggle('off', !st.camOn);
}
function camStop() {
  if (st.stream) st.stream.getTracks().forEach((t) => t.stop());
  st.stream = null; st.camOn = false;
  $('pip').classList.add('hidden');
  $('btnCam').classList.add('off');
}
function captureFrame(W = 640, q = 0.66) {
  if (!st.camOn) return null;
  const v = $('cam');
  if (!v.videoWidth) return null;
  const scale = Math.min(1, W / Math.max(v.videoWidth, v.videoHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(v.videoWidth * scale); c.height = Math.round(v.videoHeight * scale);
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  const pip = $('pip');
  pip.classList.remove('snap'); void pip.offsetWidth; pip.classList.add('snap');
  return c.toDataURL('image/jpeg', q).split(',')[1];
}
// só manda foto quando a cena mudou (economia)
function frameIfChanged(maxAgeMs = 60000, force = false) {
  if (!st.camOn) return { img: null, same: false };
  const sig = sceneSignature($('cam'));
  const diff = sceneDiff(sig, st.lastSig);
  if (!force && sig && st.lastSig && diff < 0.07 && Date.now() - st.lastSigAt < maxAgeMs) return { img: null, same: true };
  const img = captureFrame();
  if (img) { st.lastSig = sig; st.lastSigAt = Date.now(); }
  return { img, same: false };
}

// ---------- legendas e cartões ----------
function showTutor(parts, nowIdx = -1) {
  $('tutorLine').innerHTML = parts.map((p, i) => `<span class="seg ${p.lang} ${i === nowIdx ? 'now' : ''}">${esc(p.text)}</span>`).join(' ');
}
function showTutorText(text) {
  $('tutorLine').innerHTML = text ? `<span class="seg tg">${esc(text)}</span>` : '';
}
function showUser(text) { $('userLine').textContent = text ? `Você: ${text}` : ''; }
function showRepeat(r) {
  const box = $('repeatBox');
  if (!r || !r.text) { box.classList.add('hidden'); return; }
  $('repeatText').innerHTML = tokensOf(r.text).map((w, i) => `<span class="w" data-i="${i}">${esc(w)}</span>`).join(' ');
  box.classList.remove('played');
  renderPt();
  $('score').classList.add('hidden');
  box.classList.remove('hidden');
}
function renderPt() {
  const el = $('repeatPt');
  const r = st.repeat;
  if (!r || !r.pt) { el.textContent = ''; el.className = ''; return; }
  if (S.meaning && !r.revealed) {
    el.textContent = '🔒 A tradução aparece depois que você disser o que acha que significa';
    el.className = 'locked';
  } else { el.textContent = r.pt; el.className = 'revealed'; }
}
function revealPt(pt) {
  if (!st.repeat) return;
  if (pt) st.repeat.pt = pt;
  if (st.repeat.revealed) return;
  st.repeat.revealed = true;
  renderPt();
}
function markRepeat(marks, final) {
  document.querySelectorAll('#repeatText .w').forEach((el, i) => {
    el.classList.toggle('ok', !!marks[i]);
    el.classList.toggle('miss', !!final && !marks[i]);
  });
}
function showCorr(c) {
  const box = $('corrBox');
  if (!c) { box.classList.add('hidden'); document.body.classList.remove('has-corr'); st.corr = null; return; }
  $('corrWrong').textContent = c.said || '…';
  $('corrWrong').parentElement.classList.toggle('hidden', !c.said);
  $('corrRight').textContent = c.correct;
  $('corrExp').textContent = c.explain || '';
  box.classList.remove('hidden');
  document.body.classList.add('has-corr');
  st.corr = c;
  if (st.sess) st.sess.corrections.push(c);
}
function showScore(res) {
  const el = $('score');
  el.className = res.score >= 80 ? 'good' : res.score >= 50 ? 'mid' : 'bad';
  const emoji = res.score >= 80 ? '🎉' : res.score >= 50 ? '👍' : '🔁';
  let html = `${emoji} Pronúncia: ${res.score}%`;
  if (res.missed && res.missed.length && res.score < 100) html += ` · treine: ${res.missed.map((w) => `<span class="miss">${esc(w)}</span>`).join(' ')}`;
  if (res.tip) html += `<div style="font-weight:500;font-size:13px;color:#6b5a50;margin-top:3px">💡 ${esc(res.tip)}</div>`;
  el.innerHTML = html;
  el.classList.remove('hidden');
  if (st.sess) {
    st.sess.scores.push(res.score);
    for (const w of res.missed || []) { const k = String(w).toLowerCase().replace(/[^a-z']/g, ''); if (k) st.sess.problems[k] = (st.sess.problems[k] || 0) + 1; }
  }
  if (res.score >= 80) { avatar.setMood('happy'); avatar.nodOnce(1); }
}
function setRepeat(text, pt) {
  if (!text) { st.repeat = null; showRepeat(null); return; }
  const same = st.repeat && st.repeat.text === text;
  if (!same) {
    st.repeatTries = 0;
    if (st.sess) st.sess.phrases.push(text);
  }
  st.repeat = { text, pt: pt || (same ? st.repeat.pt : ''), revealed: same ? st.repeat.revealed : false, passed: same ? st.repeat.passed : false };
  showRepeat(st.repeat);
}
function addWords(list) {
  let added = 0;
  for (const w of list || []) {
    if (!w || !w.en) continue;
    const k = String(w.en).toLowerCase().trim();
    if (!myVocab().some((v) => v.en.toLowerCase() === k)) {
      vocab.push(srsInit({ en: String(w.en).trim(), pt: String(w.pt || '').trim(), ts: Date.now(), lang: S.target }));
      added++;
      if (st.sess) st.sess.words.push(w);
    }
  }
  if (added) {
    store.set('vocab', vocab);
    renderHome();
    toast(`📚 +${added} ${added === 1 ? 'palavra nova salva' : 'palavras novas salvas'}`, 2000);
  }
}

// ---------- falar (modo clássico) ----------
const ttsCache = new Map();
async function playNatural(text, slow, callId) {
  const key = `${S.tutor}|${slow ? 1 : 0}|${text}`;
  let a = ttsCache.get(key);
  if (!a) {
    a = await ttsGemini(geminiKey(), text, VOICES[S.tutor], slow);
    ttsCache.set(key, a);
    if (ttsCache.size > 40) ttsCache.delete(ttsCache.keys().next().value);
  }
  if (callId != null && callId !== st.callId) return;
  N.playerFlush();
  await sleep(60);
  const t0 = Date.now();
  // em blocos de ~0,2 s para a boca acompanhar o volume
  const bin = a.b64;
  const CH = Math.floor((a.rate * 2 * 0.2 * 4) / 3 / 4) * 4;
  for (let i = 0; i < bin.length; i += CH) N.playerWrite(bin.slice(i, i + CH));
  const durMs = ((bin.length * 3) / 4 / 2 / a.rate) * 1000;
  await sleep(durMs * 0.9);
  while (N.lastDrained() < t0 + durMs * 0.6 && Date.now() - t0 < durMs + 4000) {
    if (callId != null && callId !== st.callId) break;
    await sleep(80);
  }
}

async function speakParts(parts, callId) {
  st.speaking = true;
  avatar.setMode('speaking');
  setStatus('falando…');
  if (naturalVoice() && st.speakerOn) {
    showTutor(parts);
    try {
      await playNatural(parts.map((p) => p.text).join(' '), false, callId);
      st.speaking = false; avatar.speakingUntil = 0; st.lastActivity = Date.now();
      return;
    } catch (e) {
      toast('Voz natural indisponível agora; usando a voz do Android.', 2500);
    }
  }
  for (let i = 0; i < parts.length; i++) {
    if (callId !== st.callId) break;
    const p = parts[i];
    showTutor(parts, i);
    if (!st.speakerOn) {
      const ms = 400 + p.text.length * 55 / S.rate;
      const ws = p.text.split(/\s+/);
      const per = ms / ws.length;
      for (const w of ws) { if (callId !== st.callId) break; avatar.speakWord(w, per * 0.9); await sleep(per); }
      continue;
    }
    const lang = p.lang === 'pt' ? 'pt-BR' : TL().tts;
    const rate = p.lang === 'pt' ? Math.min(1.1, S.rate + 0.1) : S.rate;
    await N.speak(p.text, lang, rate, androidVoice(), {
      onWord: (w) => avatar.speakWord(w, (90 + w.length * 62) / rate),
    });
  }
  st.speaking = false;
  avatar.speakingUntil = 0;
  st.lastActivity = Date.now();
}

// ---------- ouvir (modo clássico) ----------
function setMicUi(live) {
  $('btnMic').classList.toggle('live', live);
  $('btnMic').classList.toggle('off', st.liveMode && !st.micOn);
}
function startListening() {
  if (!st.inCall || st.liveMode || st.busy || st.speaking) return;
  N.stopListening();
  st.listening = true;
  setMicUi(true);
  avatar.setMode('listening');
  const callId = st.callId;
  // pronúncia pelo som: grava o áudio quando há frase para repetir
  const wantRepeat = st.repeat && st.expect === 'repeat' && st.lang === 'tg';
  if (wantRepeat && S.soundPron && geminiKey() && N.canRecord) {
    setStatus('ouvindo… (avaliando pelo som)');
    N.recordStart(9000, {
      onLevel: (v) => { $('btnMic').style.setProperty('--lvl', (1 + Math.min(0.35, v * 0.4)).toFixed(3)); avatar.setMicLevel(v); },
      onSpeech: () => showUser('🎙️ …'),
      onDone: (wav) => { if (callId === st.callId) onRecorded(wav); },
      onNone: () => { if (callId === st.callId) { stopListeningUi(); onSilence(); } },
      onError: (e) => { if (callId === st.callId) { stopListeningUi(); toast('Não consegui gravar o áudio: ' + e); } },
    });
    return;
  }
  // com "responder em português" ligado e sem frase para repetir, ouve português e inglês
  const mode = st.lang === 'pt-BR' || st.expect === 'pt' ? 'pt-BR'
    : wantRepeat ? 'tg'
      : (ptBridge() || S.meaning) ? 'auto' : 'tg';
  st.heardLang = mode;
  const lang = mode === 'tg' ? TL().stt : mode === 'auto' ? `auto:${TL().stt}` : 'pt-BR';
  setStatus(mode === 'pt-BR' ? 'ouvindo (português)…' : mode === 'auto' ? `ouvindo (português ou ${TL().name})…` : 'ouvindo…');
  N.listen(lang, {
    onPartial: (t) => {
      showUser(t);
      if (st.repeat && mode === 'tg') markRepeat(liveMatch(st.repeat.text, t), false);
    },
    onLevel: (v) => {
      $('btnMic').style.setProperty('--lvl', (1 + Math.min(0.35, v * 0.4)).toFixed(3));
      avatar.setMicLevel(v);
    },
    onResult: (alts) => {
      if (callId !== st.callId) return;
      stopListeningUi();
      const text = (alts[0] || '').trim();
      if (!text) return onSilence();
      st.silences = 0;
      st.lastActivity = Date.now();
      onUserSpeech(text, alts);
    },
    onError: (code) => {
      if (callId !== st.callId) return;
      stopListeningUi();
      if (code === 'no_match' || code === 'speech_timeout') return onSilence();
      if (code === 'unavailable') { toast('Reconhecimento de voz indisponível. Instale/atualize o app Google.'); return; }
      if (code === 'permission') { toast('Permita o uso do microfone para o app.'); return; }
      if (code === 'network') toast('Sem internet para o reconhecimento de voz.');
      setTimeout(() => { if (S.handsFree && st.inCall && !st.busy && !st.speaking) startListening(); }, 1200);
    },
  });
}
async function onRecorded(wav) {
  stopListeningUi();
  st.silences = 0;
  st.lastActivity = Date.now();
  setStatus('avaliando sua pronúncia…');
  avatar.setMode('thinking');
  const target = st.repeat.text;
  try {
    const r = await assessPronunciation({ key: geminiKey(), model: S.models.gemini || PROVIDERS.gemini.model }, wav, target, S.level);
    addUsage(r.usage);
    showUser(r.heard || '…');
    if (!r.isAttempt) { ask('user', { text: r.heard || '(inaudível)', lang: 'auto', bridge: ptBridge() }); return; }
    const marks = r.words.length ? r.words.map((w) => w.ok) : liveMatch(target, r.heard);
    markRepeat(marks, true);
    const missed = r.words.filter((w) => !w.ok).map((w) => w.w.replace(/[.,!?;:]+$/, ''));
    st.repeatTries++;
    showScore({ score: r.score, missed, tip: r.tip });
    if (r.score >= PASS_SCORE && st.repeat) st.repeat.passed = true;
    ask('user', { text: r.heard || '(inaudível)', lang: 'tg', repeat: target, score: r.score, missed, issue: r.issue });
  } catch (e) {
    toast(e.message || String(e), 4000);
    avatar.setMode('idle');
    setStatus('toque no microfone para falar');
  }
}
function stopListeningUi() {
  st.listening = false;
  setMicUi(false);
  $('btnMic').style.setProperty('--lvl', 1);
  avatar.setMicLevel(0);
  if (st.inCall && !st.busy && !st.speaking && !st.liveMode) { avatar.setMode('idle'); setStatus('toque no microfone para falar'); }
}
function onSilence() {
  st.silences++;
  if (!S.handsFree || !st.inCall) return;
  if (st.silences < 3) setTimeout(() => { if (!st.listening) startListening(); }, 300);
  else setStatus('toque no microfone para falar');
}

// ---------- turno com a IA (modo clássico) ----------
async function ask(kind, data = {}) {
  if (!st.inCall || st.busy || st.liveMode) return;
  N.stopListening();
  st.listening = false; setMicUi(false);
  st.busy = true;
  const callId = st.callId;
  avatar.setMode('thinking');
  setStatus('pensando…');
  const force = kind === 'look' || kind === 'start' || kind === 'review';
  const { img, same } = frameIfChanged(60000, force);
  let text = eventText(kind, { ...data, hasImage: !!img || same });
  if (same) text += '\n(A cena da câmera não mudou desde a última foto.)';
  let reply;
  try {
    const due = dueWords(myVocab()).slice(0, 12);
    const scen = st.scenario.prompt + (st.scenario.id === 'review' && due.length ? ` Words due: ${due.map((w) => `${w.en} (${w.pt})`).join(', ')}.` : '');
    reply = await askLLM(settingsForLLM(), systemPrompt({ level: S.level, vocab: myVocab(), correct: S.correct, tutor: tutorName(), scenario: scen, behavior: behavior() }), st.history.slice(-14), text, img);
  } catch (e) {
    st.busy = false;
    if (callId !== st.callId) return;
    avatar.setMode('idle'); avatar.setMood('sad');
    setStatus('erro de conexão');
    toast(e.message || String(e), 6000);
    return;
  }
  if (callId !== st.callId) return;
  st.busy = false;
  addUsage(reply.usage);
  st.history.push({ role: 'user', text: img ? text + '\n[foto da câmera enviada]' : text });
  st.history.push({ role: 'assistant', text: JSON.stringify({ ...reply, usage: undefined }) });
  if (st.history.length > 30) st.history.splice(0, st.history.length - 30);

  addWords(reply.new_words);
  setRepeat(reply.repeat, reply.repeat_pt);
  if (reply.reveal || st.pendingReveal) revealPt(reply.repeat_pt);
  st.pendingReveal = false;
  st.expect = reply.expect || (reply.repeat ? 'repeat' : 'any');
  showCorr(reply.correction);
  if (reply.correction) avatar.setMood('neutral'); else avatar.setMood(reply.mood);
  showUser('');

  const parts = reply.speech.length ? reply.speech : (reply.repeat ? [{ lang: 'en', text: reply.repeat }] : []);
  await speakParts(parts, callId);
  if (callId !== st.callId) return;
  if (S.handsFree) startListening();
  else { avatar.setMode('idle'); setStatus('toque no microfone para falar'); }
}

function onUserSpeech(text, alts) {
  showUser(text);
  // o aluno respondeu em português depois de acertar a pronúncia: já pode ver a tradução
  if (st.repeat && st.repeat.passed && (st.heardLang === 'pt-BR' || st.heardLang === 'auto')) st.pendingReveal = true;
  const data = { text, lang: st.heardLang || st.lang, bridge: ptBridge() };
  if (st.repeat && data.lang === 'tg' && st.expect === 'repeat') {
    const res = pronunciationScore(st.repeat.text, alts);
    if (res) {
      st.repeatTries++;
      showScore(res);
      if (res.score >= PASS_SCORE) st.repeat.passed = true;
      markRepeat(liveMatch(st.repeat.text, res.heard), true);
      Object.assign(data, { repeat: st.repeat.text, score: res.score, missed: res.missed });
    }
  }
  ask('user', data);
}

// ---------- modo AO VIVO ----------
async function startLive(kind) {
  st.liveMode = true;
  document.body.classList.add('live');
  setStatus('conectando ao vivo…');
  avatar.setMode('thinking');
  N.setCallMode(S.duplex);
  N.playerOpen(24000, S.duplex, 'live');
  const callId = st.callId;
  const due = dueWords(myVocab());
  let scen = st.scenario.prompt;
  if (kind === 'review' || st.scenario.id === 'review') scen = scenarioById('review').prompt;
  let sess;
  try {
    sess = await connectLive({
      key: geminiKey(),
      voice: VOICES[S.tutor],
      system: liveSystemPrompt({ level: S.level, vocab: myVocab(), correct: S.correct, tutor: tutorName(), scenario: scen, due, behavior: behavior() }),
      tools: LIVE_TOOLS,
      onAudio: (b64) => {
        if (callId !== st.callId || st.dropAudio) return;
        if (!st.turnOpen) {
          // começou uma nova fala da professora
          st.turnOpen = true;
          st.tutorText = '';
          finishUserUtterance();
        }
        if (st.speakerOn) N.playerWrite(b64);
        st.speaking = true;
        avatar.setMode('speaking');
        setStatus('falando…');
      },
      onOutput: (t) => {
        if (callId !== st.callId || st.dropAudio) return;
        st.tutorText = (st.tutorText + t).replace(/\s+/g, ' ');
        showTutorText(st.tutorText.trim().slice(-220));
      },
      onInput: (t) => {
        if (callId !== st.callId) return;
        if (st.turnOpen && S.duplex) { /* interrompendo */ }
        st.userText = (st.userText + t).replace(/\s+/g, ' ');
        const u = st.userText.trim();
        showUser(u);
        st.lastActivity = Date.now();
        if (st.repeat) markRepeat(liveMatch(st.repeat.text, u), false);
      },
      onInterrupted: () => {
        if (callId !== st.callId) return;
        N.playerFlush();
        st.turnOpen = false;
      },
      onTurnComplete: () => {
        if (callId !== st.callId) return;
        st.turnOpen = false;
        st.dropAudio = false;
        st.lastActivity = Date.now();
      },
      onToolCall: (calls) => handleToolCalls(calls, callId),
      onUsage: (u) => addUsage({ in: u.promptTokenCount || 0, out: (u.responseTokenCount || 0) + (u.thoughtsTokenCount || 0) }),
      onReconnect: () => toast('Conexão restabelecida ✔', 1500),
      onClosed: (why) => {
        if (callId !== st.callId || !st.inCall) return;
        toast(`A conversa ao vivo caiu (${why}). Toque em Reiniciar para voltar.`, 6000);
        setStatus('desconectado');
        avatar.setMode('idle'); avatar.setMood('sad');
      },
    }, S.liveModel);
  } catch (e) {
    if (callId !== st.callId) return;
    const msg = String(e.message || e);
    N.playerClose(); N.setCallMode(false);
    st.liveMode = false;
    document.body.classList.remove('live');
    if (/api key|API_KEY|permission|PERMISSION/i.test(msg)) {
      toast('Chave do Gemini inválida para o modo ao vivo. Confira nas Configurações.', 6000);
      setStatus('erro');
      return;
    }
    updateLangChip();
    toast(`Modo ao vivo indisponível agora (${msg.slice(0, 80)}). Usando o modo clássico.`, 5000);
    N.playerOpen(24000, false, 'tts');
    ask(kind);
    return;
  }
  if (callId !== st.callId) { sess.close(); return; }
  st.live = sess;
  updateLangChip();
  if (S.liveModel !== sess.model) { S.liveModel = sess.model; store.set('settings', S); }
  // primeira imagem + início da aula
  const first = st.camOn ? captureFrame(640, 0.6) : null;
  if (first) { sess.sendImage(first); st.lastSig = sceneSignature($('cam')); st.lastSigAt = Date.now(); }
  sess.sendText(eventText(kind === 'review' ? 'review' : 'start', { hasImage: !!first }));
  liveMicStart();
  // vídeo: manda quadro só quando a cena muda (e no máximo a cada 3 s)
  clearInterval(st.frameTimer);
  st.frameTimer = setInterval(() => {
    if (!st.live || !st.camOn || callId !== st.callId) return;
    const sig = sceneSignature($('cam'));
    const changed = sceneDiff(sig, st.lastSig) > 0.07;
    const stale = Date.now() - st.lastSigAt > (st.scenario.id === 'explore' ? 6000 : 20000);
    if (changed || stale) {
      const f = captureFrame(512, 0.6);
      if (f && st.live.sendImage(f)) { st.lastSig = sig; st.lastSigAt = Date.now(); }
    }
  }, 3000);
}

function liveMicStart() {
  if (!st.live || !st.micOn) return;
  const callId = st.callId;
  N.micStart({ call: S.duplex, half: !S.duplex, chunkMs: 100 }, {
    onData: (b64, lvl) => {
      if (callId !== st.callId || !st.live) return;
      if (st.judging) return;
      if (st.awaitRepeat && !st.speaking && !st.turnOpen && !st.practicing) { captureChunk(b64, lvl); }
      else if (!st.awaitRepeat) st.live.sendAudio(b64);
      $('btnMic').style.setProperty('--lvl', (1 + Math.min(0.35, lvl * 0.45)).toFixed(3));
      avatar.setMicLevel(lvl);
    },
    onEvent: (type) => {
      if (type === 'start') { setMicUi(true); }
      else if (type === 'permission') toast('Permita o uso do microfone para o app.');
      else if (type === 'error' || type === 'unavailable') toast('Não consegui abrir o microfone.');
    },
  });
  setMicUi(true);
}

// ---------- tentativa de repetição (ao vivo): grava, avalia com rigor e manda o veredito ----------
function captureChunk(b64, lvl) {
  const c = st.cap || (st.cap = { pre: [], chunks: [], speech: false, silent: 0, loud: 0, fl: [], floor: null, t0: Date.now() });
  if (c.floor == null) { c.fl.push(lvl); if (c.fl.length >= 4) c.floor = Math.min(...c.fl); }
  const thr = Math.max(0.14, (c.floor || 0) + 0.1);
  if (!c.speech) {
    c.pre.push(b64);
    if (c.pre.length > 4) c.pre.shift();
    if (lvl > thr) { c.loud++; if (c.loud >= 2) { c.speech = true; c.chunks = c.pre.slice(); setStatus('🎙️ ouvindo sua repetição…'); } } else c.loud = 0;
    if (!c.speech && Date.now() - c.t0 > 20000) {
      // ficou em silêncio: libera a conversa normal
      st.cap = null; st.awaitRepeat = false; setStatus('sua vez — pode falar');
    } else if (!c.speech) setStatus('sua vez: repita a frase 🎤');
    return;
  }
  c.chunks.push(b64);
  if (lvl < thr) c.silent++; else c.silent = 0;
  if (c.silent >= 8 || c.chunks.length >= 100) { const chunks = c.chunks; st.cap = null; judgeLiveAttempt(chunks); }
}

function pcmChunksToWavB64(chunks) {
  const parts = chunks.map((b) => { const bin = atob(b); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; });
  const len = parts.reduce((a, p) => a + p.length, 0);
  const out = new Uint8Array(44 + len);
  const dv = new DataView(out.buffer);
  const w = (o, str) => { for (let i = 0; i < str.length; i++) out[o + i] = str.charCodeAt(i); };
  w(0, 'RIFF'); dv.setUint32(4, 36 + len, true); w(8, 'WAVE'); w(12, 'fmt ');
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
  dv.setUint32(24, 16000, true); dv.setUint32(28, 32000, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
  w(36, 'data'); dv.setUint32(40, len, true);
  let off = 44;
  for (const p of parts) { out.set(p, off); off += p.length; }
  let bin = '';
  for (let i = 0; i < out.length; i += 0x8000) bin += String.fromCharCode.apply(null, out.subarray(i, i + 0x8000));
  return btoa(bin);
}

async function judgeLiveAttempt(chunks) {
  if (!st.repeat || !st.live) { st.awaitRepeat = false; return; }
  const callId = st.callId;
  const target = st.repeat.text;
  st.judging = true;
  setStatus('avaliando sua pronúncia…');
  avatar.setMode('thinking');
  try {
    const r = await assessPronunciation({ key: geminiKey(), model: S.models.gemini || PROVIDERS.gemini.model }, pcmChunksToWavB64(chunks), target, S.level);
    if (callId !== st.callId || !st.live) return;
    addUsage(r.usage);
    showUser(r.heard || '…');
    if (!r.isAttempt) {
      st.awaitRepeat = false;
      st.live.sendText(eventText('notAttempt', { heard: r.heard || '(inaudível)' }));
      return;
    }
    const missed = r.words.filter((w) => !w.ok).map((w) => w.w.replace(/[.,!?;:]+$/, ''));
    markRepeat(r.words.length ? r.words.map((w) => w.ok) : liveMatch(target, r.heard), true);
    st.repeatTries++;
    showScore({ score: r.score, missed, tip: r.tip });
    if (r.score < PASS_SCORE) { avatar.setMood('neutral'); if (r.issue) showCorr({ said: r.heard, correct: target, explain: r.issue }); }
    st.awaitRepeat = r.score < PASS_SCORE; // não passou: a próxima fala é outra tentativa
    if (r.score >= PASS_SCORE && st.repeat) st.repeat.passed = true;
    st.live.sendText(eventText('attempt', { repeat: target, heard: r.heard, score: r.score, missed, issue: r.issue }));
  } catch (e) {
    toast('Não consegui avaliar a pronúncia agora: ' + (e.message || e), 3500);
    st.awaitRepeat = false;
    if (st.live) st.live.sendText(`[O aluno tentou repetir "${target}", mas o app não conseguiu avaliar o áudio. Peça para ele repetir mais uma vez.]`);
  } finally {
    st.judging = false;
    st.lastActivity = Date.now();
  }
}

function finishUserUtterance() {
  const u = st.userText.trim();
  st.userText = '';
  if (u && st.repeat && st.repeat.passed && !st.repeat.revealed) setTimeout(() => revealPt(), 2500);
  if (u && st.repeat) markRepeat(liveMatch(st.repeat.text, u), true);
}

function handleToolCalls(calls, callId) {
  const responses = [];
  for (const c of calls) {
    const a = c.args || {};
    try {
      if (c.name === 'show_phrase') {
        setRepeat(String(a.phrase || ''), String(a.translation_pt || ''));
        // a próxima fala do aluno é a tentativa: o app grava e avalia com rigor
        if (st.repeat && S.soundPron) { st.awaitRepeat = true; st.cap = null; }
      }
      else if (c.name === 'show_correction') { showCorr({ said: String(a.said || ''), correct: String(a.correct || ''), explain: String(a.explanation_pt || '') }); avatar.setMood('neutral'); }
      else if (c.name === 'show_pronunciation') {
        const missed = Array.isArray(a.problem_words) ? a.problem_words.map(String) : [];
        const score = Math.max(0, Math.min(100, Math.round(Number(a.score) || 0)));
        if (st.repeat) {
          const bad = new Set(missed.map((w) => w.toLowerCase().replace(/[^a-z']/g, '')));
          markRepeat(tokensOf(st.repeat.text).map((w) => !bad.has(w.toLowerCase().replace(/[^a-z']/g, ''))), true);
        }
        st.repeatTries++;
        showScore({ score, missed, tip: String(a.tip_pt || '') });
      } else if (c.name === 'reveal_translation') revealPt(String(a.translation_pt || ''));
      else if (c.name === 'save_words') addWords((Array.isArray(a.words) ? a.words : []).map((w) => ({ en: w.word || w.en, pt: w.pt })));
    } catch { /* ignora argumentos estranhos */ }
    responses.push({ id: c.id, name: c.name, response: { result: 'ok' }, scheduling: 'SILENT' });
  }
  if (st.live && callId === st.callId) st.live.sendToolResponse(responses);
}

function stopLive() {
  clearInterval(st.frameTimer);
  N.micStop();
  if (st.live) { st.live.close(); st.live = null; }
  N.playerClose();
  N.setCallMode(false);
  st.liveMode = false;
  document.body.classList.remove('live');
}

// ---------- tocar na frase para ouvir ----------
let lastHear = { text: '', at: 0 };
async function practiceSpeak(text, opts = {}) {
  text = String(text || '').trim();
  if (!text) return;
  if (st.busy) { toast('Espere terminar de pensar…', 1200); return; }
  const now = Date.now();
  const slow = opts.slow || (lastHear.text === text && now - lastHear.at < 6000);
  lastHear = { text, at: now };
  const myId = ++st.hearId;
  if (st.liveMode) {
    st.dropAudio = true; // silencia o resto da fala atual da professora
    N.playerFlush();
  } else {
    if (st.speaking) { st.callId++; N.stopSpeaking(); st.speaking = false; }
    N.stopListening(); st.listening = false; setMicUi(false);
  }
  avatar.setMode('speaking');
  setStatus(slow ? 'falando devagar…' : 'ouça a pronúncia…');
  const spans = opts.highlight ? [...document.querySelectorAll('#repeatText .w')] : [];
  spans.forEach((el) => el.classList.remove('ok', 'miss'));
  st.practicing = true;
  let done = false;
  if (naturalVoice()) {
    spans.forEach((el) => el.classList.add('playing'));
    try { await playNatural(text, slow, null); done = true; } catch { /* usa Android */ }
    spans.forEach((el) => el.classList.remove('playing'));
  }
  if (!done) {
    let wi = 0;
    const rate = slow ? Math.max(0.5, S.rate - 0.3) : S.rate;
    await N.speak(text, TL().tts, rate, androidVoice(), {
      onWord: (w) => {
        avatar.speakWord(w, (90 + w.length * 62) / rate);
        spans.forEach((el) => el.classList.remove('playing'));
        if (spans[wi]) spans[wi].classList.add('playing');
        wi++;
      },
    });
    spans.forEach((el) => el.classList.remove('playing'));
  }
  st.practicing = false;
  if (myId !== st.hearId) return;
  avatar.speakingUntil = 0;
  st.lastActivity = Date.now();
  if (st.liveMode) {
    st.dropAudio = false;
    avatar.setMode('listening'); setStatus('sua vez — pode falar');
  } else if (st.inCall && !st.busy) {
    if (S.handsFree) startListening();
    else { avatar.setMode('idle'); setStatus('toque no microfone para falar'); }
  } else avatar.setMode('idle');
}

// ---------- ciclo da chamada ----------
async function startCall(kind = 'start') {
  if (!S.keys[S.provider]) { openSettings(); toast('Primeiro coloque a chave da IA (é rapidinho).'); return; }
  st.inCall = true;
  st.callId++;
  st.history = []; st.repeat = null; st.silences = 0; st.startedAt = Date.now(); st.dropAudio = false; st.turnOpen = false;
  st.tutorText = ''; st.userText = ''; st.micOn = true; st.expect = 'any'; st.awaitRepeat = false; st.cap = null; st.judging = false;
  st.sess = newSession();
  if (kind === 'review') st.scenario = scenarioById('review');
  document.body.classList.add('in-call');
  ['captions', 'controls', 'callBar'].forEach((id) => $(id).classList.remove('hidden'));
  showTutor([]); showUser(''); showRepeat(null); showCorr(null);
  $('btnSpeaker').classList.toggle('off', !st.speakerOn);
  updateLangChip();
  const t = today();
  if (!days.includes(t)) { days.push(t); days = days.slice(-400); store.set('days', days); }
  const vol = N.ensureAudible();
  if (vol.after > vol.before) toast(`O volume do celular estava ${vol.before > 0 ? 'muito baixo' : 'no mudo'} — coloquei na metade. Ajuste nos botões laterais.`, 4500);
  N.setBoost(S.boost);
  const wantCam = st.scenario.cam ? true : S.camDefault;
  st.facing = st.scenario.cam === 'environment' ? 'environment' : 'user';
  if (wantCam) await camStart(); else camStop();
  setStatus('conectando…');
  await sleep(st.camOn ? 800 : 150);
  if (liveAvailable()) startLive(kind);
  else {
    if (naturalVoice()) N.playerOpen(24000, false, 'tts');
    ask(kind);
  }
}

function endCall() {
  if (!st.inCall) return;
  st.inCall = false; st.callId++;
  st.busy = false; st.speaking = false;
  if (st.liveMode) stopLive();
  N.stopSpeaking(); N.stopListening(); N.recordCancel(); N.playerClose();
  camStop();
  avatar.setMode('idle'); avatar.setMood('happy');
  document.body.classList.remove('in-call');
  ['captions', 'controls', 'callBar'].forEach((id) => $(id).classList.add('hidden'));
  showCorr(null);
  setStatus(`Professor${PROFILES[S.tutor].gender === 'm' ? '' : 'a'} de ${TL().name}`);
  const minutes = (Date.now() - st.startedAt) / 60000;
  const t = today();
  mins[t] = (mins[t] || 0) + minutes;
  store.set('mins', mins);
  renderHome();
  showReport(minutes);
}

function restartLesson() {
  if (!st.inCall) return;
  const kind = st.scenario.id === 'review' ? 'review' : 'start';
  if (st.liveMode) stopLive();
  st.callId++;
  st.busy = false; st.speaking = false; st.listening = false;
  N.stopSpeaking(); N.stopListening(); N.recordCancel(); setMicUi(false);
  st.history = []; st.repeat = null; st.repeatTries = 0; st.silences = 0; st.dropAudio = false; st.turnOpen = false; st.expect = 'any'; st.awaitRepeat = false; st.cap = null; st.judging = false;
  showTutor([]); showUser(''); showRepeat(null); showCorr(null);
  avatar.setMode('idle'); avatar.setMood('happy'); avatar.nodOnce(0.6);
  toast('Aula reiniciada ↺', 1400);
  setStatus('reiniciando…');
  setTimeout(() => {
    if (!st.inCall) return;
    if (liveAvailable()) startLive(kind);
    else { if (naturalVoice()) N.playerOpen(24000, false, 'tts'); ask(kind); }
  }, 500);
}

function updateLangChip() {
  $('langChip').classList.toggle('hidden', st.liveMode);
  $('langChip').innerHTML = `Você fala em: <b>${st.lang === 'tg' ? TL().Name : 'Português'}</b>`;
}

// ---------- relatório da aula ----------
function showReport(minutes) {
  const s = st.sess;
  if (!s) return;
  const avg = s.scores.length ? Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length) : null;
  const probs = Object.entries(s.problems).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([w]) => w);
  const tok = s.tokens.in + s.tokens.out;
  let html = `<div class="rep-kpis">
    <div><b>${Math.max(1, Math.round(minutes))}</b>minutos</div>
    <div><b>${s.phrases.length}</b>frases treinadas</div>
    <div><b>${avg == null ? '—' : avg + '%'}</b>pronúncia média</div>
  </div>`;
  if (s.corrections.length) {
    html += `<div class="rep-sec"><h4>✍️ Correções (${s.corrections.length})</h4><ul class="rep-list">${s.corrections.slice(-8).map((c) =>
      `<li>${c.said ? `<span class="bad">${esc(c.said)}</span><br>` : ''}<span class="good" data-say="${esc(c.correct)}">✓ ${esc(c.correct)} 🔊</span>${c.explain ? `<small>${esc(c.explain)}</small>` : ''}</li>`).join('')}</ul></div>`;
  }
  if (s.words.length) {
    html += `<div class="rep-sec"><h4>📚 Palavras novas (${s.words.length})</h4><ul class="rep-list">${s.words.map((w) =>
      `<li><span class="good" data-say="${esc(w.en)}">${esc(w.en)} 🔊</span> — ${esc(w.pt)}</li>`).join('')}</ul></div>`;
  }
  if (probs.length) html += `<div class="rep-sec"><h4>🎯 Para treinar</h4><p>${probs.map((w) => `<span class="good" data-say="${esc(w)}">${esc(w)}</span>`).join(' · ')}</p></div>`;
  if (!s.corrections.length && !s.words.length && !s.phrases.length) html += '<p class="hint" style="margin-top:14px">Aula curtinha! Na próxima, converse um pouco mais para ver seu resumo aqui.</p>';
  html += `<p class="hint" style="margin-top:14px">Uso de IA nesta aula: ${costText(tok)}</p>`;
  $('reportBody').innerHTML = html;
  $('report').classList.remove('hidden');
}

// ---------- revisão espaçada (cartões) ----------
let rev = { list: [], i: 0 };
function openReview() {
  const mv = myVocab();
  const due = dueWords(mv);
  const list = due.length ? due.slice(0, 20) : mv.slice().sort(() => Math.random() - 0.5).slice(0, 10);
  document.querySelector('#flash .f-q').textContent = `Como se diz em ${TL().name}?`;
  if (!list.length) { toast('Ainda não há palavras. Elas aparecem durante as aulas.'); return; }
  rev = { list, i: 0 };
  $('review').classList.remove('hidden');
  $('revDone').classList.add('hidden');
  showCard();
}
function showCard() {
  const w = rev.list[rev.i];
  if (!w) {
    $('flash').classList.add('hidden'); $('revAsk').classList.add('hidden'); $('revGrades').classList.add('hidden');
    $('revDone').classList.remove('hidden'); $('revProg').textContent = '';
    renderHome();
    return;
  }
  $('flash').classList.remove('hidden'); $('revAsk').classList.remove('hidden'); $('revGrades').classList.add('hidden');
  $('revProg').textContent = `${rev.i + 1} de ${rev.list.length} · ${boxLabel(w.box)}`;
  $('fPt').textContent = w.pt || '(sem tradução)';
  $('fEn').textContent = `${w.en} 🔊`;
  $('fEn').classList.add('hidden');
  $('fHeard').textContent = ''; $('fHeard').className = 'f-heard';
}
function revealCard(ok) {
  $('fEn').classList.remove('hidden');
  $('revAsk').classList.add('hidden');
  $('revGrades').classList.remove('hidden');
  document.querySelectorAll('#revGrades button').forEach((b) => b.style.outline = (ok === true && b.dataset.g === '2') ? '3px solid #13894c' : '');
  sayTarget(rev.list[rev.i].en);
}
function sayTarget(text) {
  if (naturalVoice()) {
    N.playerOpen(24000, false, 'tts');
    playNatural(text, false, null).catch(() => N.speak(text, TL().tts, S.rate, androidVoice(), { onWord: (x) => avatar.speakWord(x, 90 + x.length * 70) }));
  } else N.speak(text, TL().tts, S.rate, androidVoice(), { onWord: (x) => avatar.speakWord(x, 90 + x.length * 70) });
}

// ---------- configurações ----------
function segSet(id, v) { document.querySelectorAll(`#${id} button`).forEach((b) => b.classList.toggle('on', b.dataset.v === v)); }
function segGet(id, d) { const b = document.querySelector(`#${id} button.on`); return b ? b.dataset.v : d; }
function openSettings() {
  $('setProvider').value = S.provider;
  fillProviderFields();
  segSet('setLevel', S.level);
  segSet('setCorrect', S.correct || 'realtime');
  segSet('setMode', S.mode);
  segSet('setVoiceMode', S.voiceMode);
  segSet('setQuality', S.quality);
  $('setDuplex').checked = S.duplex;
  $('setLiveModel').value = S.liveModel || LIVE_MODELS[0];
  $('setSoundPron').checked = S.soundPron;
  $('setRate').value = S.rate; $('rateVal').textContent = S.rate;
  $('setBoost').value = S.boost; $('boostVal').textContent = boostLabel(S.boost);
  $('setAutoLook').value = String(S.autoLook);
  $('setHandsFree').checked = S.handsFree;
  $('setCamDefault').checked = S.camDefault;
  $('setGoal').value = String(S.goal);
  $('setCurious').checked = S.curious;
  $('setMeaning').checked = S.meaning;
  $('setPtBridge').checked = S.ptBridge;
  $('setCuriousEvery').value = String(S.curiousEvery);
  $('setReminder').checked = S.reminder;
  $('setReminderTime').value = S.reminderTime;
  $('setPrice').value = S.price || '';
  $('testResult').textContent = '';
  $('btnResetAll').textContent = 'Apagar progresso';
  const sel = $('setVoice');
  const voices = N.listVoices().filter((v) => String(v.lang).toLowerCase().startsWith(TL().id));
  sel.innerHTML = '<option value="">Automática</option>' + voices.map((v) => `<option value="${esc(v.name)}">${esc(prettyVoice(v))}</option>`).join('');
  sel.value = S.voiceLang === S.target ? (S.voice || '') : '';
  $('setTarget').value = S.target;
  segSet('setExplain', S.explain);
  $('voiceLbl').textContent = `Voz do Android em ${TL().name}`;
  const m = usage[monthKey()] || { in: 0, out: 0 };
  $('usageBox').innerHTML = `Uso este mês: <b>${costText(m.in + m.out)}</b><br><small>A professora só manda foto quando a cena muda, para economizar.</small>`;
  $('ver').textContent = `Versão ${N.appVersion()}`;
  $('settings').classList.remove('hidden');
}
function prettyVoice(v) {
  const region = String(v.lang).replace('_', '-');
  return `${v.name} (${region}${v.local === false ? ', online' : ''})`;
}
let pendingProvider = null;
function fillProviderFields() {
  const p = $('setProvider').value;
  pendingProvider = p;
  $('setKey').value = S.keys[p] || '';
  $('setModel').value = S.models[p] || PROVIDERS[p].model;
  $('keyHelp').dataset.url = PROVIDERS[p].keyUrl;
  $('keyHelp').textContent = p === 'gemini' ? 'Pegar chave grátis no Google AI Studio →' : `Pegar chave em ${PROVIDERS[p].name} →`;
}
function readSettingsForm() {
  const p = $('setProvider').value;
  const s = { ...S, keys: { ...S.keys }, models: { ...S.models } };
  s.provider = p;
  s.keys[p] = $('setKey').value.trim();
  const m = $('setModel').value.trim();
  if (m && m !== PROVIDERS[p].model) s.models[p] = m; else delete s.models[p];
  s.level = segGet('setLevel', 'iniciante');
  s.correct = segGet('setCorrect', 'realtime');
  s.mode = segGet('setMode', 'live');
  s.voiceMode = segGet('setVoiceMode', 'natural');
  s.quality = segGet('setQuality', 'high');
  s.duplex = $('setDuplex').checked;
  s.liveModel = $('setLiveModel').value.trim() || LIVE_MODELS[0];
  s.soundPron = $('setSoundPron').checked;
  s.rate = Number($('setRate').value);
  s.boost = Number($('setBoost').value);
  s.voice = $('setVoice').value;
  s.voiceLang = s.voice ? S.target : '';
  s.target = $('setTarget').value || 'en';
  s.explain = segGet('setExplain', 'pt');
  s.autoLook = Number($('setAutoLook').value);
  s.handsFree = $('setHandsFree').checked;
  s.camDefault = $('setCamDefault').checked;
  s.goal = Number($('setGoal').value) || 60;
  s.curious = $('setCurious').checked;
  s.meaning = $('setMeaning').checked;
  s.ptBridge = $('setPtBridge').checked;
  s.curiousEvery = Number($('setCuriousEvery').value) || 25;
  s.reminder = $('setReminder').checked;
  s.reminderTime = $('setReminderTime').value || '19:00';
  s.price = $('setPrice').value.trim();
  return s;
}
function boostLabel(v) { v = Number(v); return v <= 0 ? 'normal' : v <= 6 ? `+${v} (um pouco)` : v <= 12 ? `+${v} (alto)` : `+${v} (máximo)`; }

// ---------- vocabulário ----------
function openVocab() {
  const ul = $('vocabList');
  const mv = myVocab();
  const due = dueWords(mv).length;
  $('btnReviewFromList').textContent = due ? `🔁 Revisar agora (${due} para hoje)` : '🔁 Treinar palavras';
  $('btnReviewFromList').classList.toggle('hidden', !mv.length);
  if (!mv.length) ul.innerHTML = `<li class="empty">Ainda não há palavras de ${TL().name}. Elas aparecem aqui durante as aulas.</li>`;
  else {
    ul.innerHTML = vocab.map((w, i) => [w, i]).filter(([w]) => (w.lang || 'en') === S.target).reverse().map(([w, i]) => `<li data-i="${i}"><div class="w"><b>${esc(w.en)}<span class="box">${boxLabel(w.box)}</span></b><span>${esc(w.pt)}</span></div><button class="say" aria-label="ouvir">🔊</button><button class="del" aria-label="apagar">🗑</button></li>`).join('');
  }
  $('vocab').classList.remove('hidden');
}

// ---------- eventos ----------
N.onAudio({
  onLevel: (v) => avatar.setTalkLevel(v),
  onDrained: () => {
    if (st.liveMode && st.inCall) {
      st.speaking = false;
      avatar.speakingUntil = 0;
      if (!st.practicing) { avatar.setMode('listening'); setStatus(st.micOn ? 'sua vez — pode falar' : 'microfone desligado'); }
    }
  },
});

$('btnStart').onclick = () => startCall(st.scenario.id === 'review' ? 'review' : 'start');
$('btnReview').onclick = openReview;
$('btnReviewFromList').onclick = () => { $('vocab').classList.add('hidden'); openReview(); };
$('btnHomeWords').onclick = openVocab;
$('btnWords').onclick = openVocab;
$('btnMenu').onclick = openSettings;
$('btnHang').onclick = endCall;
$('btnRestart').onclick = restartLesson;
$('scenList').onclick = (e) => {
  const b = e.target.closest('button[data-s]');
  if (!b) return;
  st.scenario = scenarioById(b.dataset.s);
  S.scenario = st.scenario.id; store.set('settings', S);
  renderHome();
};
$('qCurious').onclick = () => { S.curious = !S.curious; store.set('settings', S); renderHome(); toast(S.curious ? 'Professora curiosa: ela vai perguntar o que você está fazendo 🧐' : 'Professora curiosa desligada', 2200); };
$('qPt').onclick = () => { S.ptBridge = !S.ptBridge; store.set('settings', S); renderHome(); toast(S.ptBridge ? `Pode responder em português: ela te ensina a dizer em ${TL().name} 🇧🇷➜${TL().flag}` : `Respostas só em ${TL().name}`, 2400); };
$('homeTarget').onchange = () => {
  S.target = $('homeTarget').value; store.set('settings', S);
  setLanguage(S.target, S.explain); ttsCache.clear(); renderHome();
  toast(`Agora você vai aprender ${TL().name} ${TL().flag}`, 2000);
};
$('homeExplain').onchange = () => {
  S.explain = $('homeExplain').value; store.set('settings', S);
  setLanguage(S.target, S.explain); renderHome();
  toast({ pt: 'Ela vai explicar tudo em português 🇧🇷', mix: 'Ela vai misturar os dois idiomas', target: `Imersão: ela vai falar só em ${TL().name}` }[S.explain], 2200);
};
$('qMeaning').onclick = () => { S.meaning = !S.meaning; store.set('settings', S); renderHome(); toast(S.meaning ? 'Ela vai traduzir cada frase e perguntar o significado até você acertar 📖' : 'Checagem de significado desligada', 2600); };
$('tutorPick').onclick = (e) => {
  const b = e.target.closest('button[data-t]');
  if (!b || b.dataset.t === S.tutor) return;
  S.tutor = b.dataset.t; store.set('settings', S);
  avatar.setProfile(S.tutor);
  ttsCache.clear();
  renderHome();
  setTimeout(() => { avatar.setMood('happy'); avatar.nodOnce(0.8); }, 200);
};
$('btnLook').onclick = () => {
  if (!st.camOn) { toast('Ligue a câmera para eu ver o que você está fazendo.'); return; }
  if (st.liveMode && st.live) {
    const f = captureFrame(640, 0.7);
    if (f) st.live.sendImage(f);
    st.dropAudio = false;
    st.live.sendText(eventText('look', { hasImage: !!f }));
    return;
  }
  if (st.busy) return;
  if (st.speaking) { st.callId++; N.stopSpeaking(); N.playerFlush(); st.speaking = false; avatar.speakingUntil = 0; }
  ask('look');
};
$('btnMic').onclick = () => {
  if (!st.inCall) return;
  if (st.liveMode) {
    if (st.cap && st.cap.speech) { const chunks = st.cap.chunks; st.cap = null; judgeLiveAttempt(chunks); return; }
    if (st.speaking) {
      // interrompe a professora e passa a vez para você
      st.dropAudio = true;
      N.playerFlush();
      st.speaking = false;
      setStatus('sua vez — pode falar');
      return;
    }
    st.micOn = !st.micOn;
    if (st.micOn) { liveMicStart(); toast('Microfone ligado', 1000); } else { N.micStop(); setMicUi(false); toast('Microfone desligado', 1000); }
    setMicUi(st.micOn);
    return;
  }
  if (st.listening) { N.stopListening(); N.recordStop(); stopListeningUi(); return; }
  if (st.busy) { toast('Espere terminar de pensar…', 1200); return; }
  if (st.speaking) { st.callId++; N.stopSpeaking(); N.playerFlush(); st.speaking = false; avatar.speakingUntil = 0; }
  st.silences = 0;
  startListening();
};
let spkHold = null;
$('btnSpeaker').addEventListener('touchstart', () => { spkHold = setTimeout(() => { spkHold = 'done'; N.showVolume(); }, 550); }, { passive: true });
$('btnSpeaker').addEventListener('touchend', () => { if (spkHold && spkHold !== 'done') clearTimeout(spkHold); });
$('btnSpeaker').onclick = () => {
  if (spkHold === 'done') { spkHold = null; return; }
  st.speakerOn = !st.speakerOn;
  $('btnSpeaker').classList.toggle('off', !st.speakerOn);
  if (!st.speakerOn) { N.stopSpeaking(); N.playerFlush(); }
  toast(st.speakerOn ? 'Som ligado' : 'Som desligado (só legendas)', 1400);
};
$('btnCam').onclick = () => { if (st.camOn) camStop(); else camStart(); };
$('pip').onclick = () => { st.facing = st.facing === 'user' ? 'environment' : 'user'; camStart(); };
$('langChip').onclick = () => {
  st.lang = st.lang === 'tg' ? 'pt-BR' : 'tg';
  updateLangChip();
  toast(st.lang === 'tg' ? `Agora fale em ${TL().name}` : 'Agora pode falar em português (para tirar dúvidas)', 1800);
  if (st.listening) startListening();
};
document.querySelectorAll('[data-close]').forEach((b) => { b.onclick = () => $(b.dataset.close).classList.add('hidden'); });
document.querySelectorAll('.sheet').forEach((sh) => sh.addEventListener('click', (e) => { if (e.target === sh) sh.classList.add('hidden'); }));
$('setProvider').onchange = () => {
  if (pendingProvider) S.keys[pendingProvider] = $('setKey').value.trim();
  fillProviderFields();
};
$('btnShowKey').onclick = () => { const k = $('setKey'); k.type = k.type === 'password' ? 'text' : 'password'; };
$('keyHelp').onclick = (e) => { e.preventDefault(); N.openUrl($('keyHelp').dataset.url); };
$('setRate').oninput = () => { $('rateVal').textContent = $('setRate').value; };
$('setBoost').oninput = () => { $('boostVal').textContent = boostLabel($('setBoost').value); N.setBoost(Number($('setBoost').value)); };
$('btnTestVoice').onclick = () => {
  N.ensureAudible();
  const s = readSettingsForm();
  const txt = langOf(s.target).sample;
  if (s.voiceMode === 'natural' && s.keys.gemini) {
    N.playerOpen(24000, false, 'tts');
    playNatural(txt, false, null).catch((e) => toast(e.message || String(e)));
  } else N.speak(txt, langOf(s.target).tts, s.rate, s.voice || androidVoice(), { onWord: (w) => avatar.speakWord(w, 90 + w.length * 62) });
};
['setLevel', 'setCorrect', 'setMode', 'setVoiceMode', 'setQuality', 'setExplain'].forEach((id) => {
  document.querySelectorAll(`#${id} button`).forEach((b) => {
    b.onclick = () => document.querySelectorAll(`#${id} button`).forEach((x) => x.classList.toggle('on', x === b));
  });
});
$('btnReload').onclick = () => { N.stopSpeaking(); N.stopListening(); location.reload(); };
$('btnResetAll').onclick = () => {
  const b = $('btnResetAll');
  if (b.dataset.armed !== '1') {
    b.dataset.armed = '1'; b.textContent = 'Toque de novo p/ confirmar';
    setTimeout(() => { b.dataset.armed = ''; b.textContent = 'Apagar progresso'; }, 4000);
    return;
  }
  b.dataset.armed = '';
  vocab = []; days = []; mins = {};
  store.set('vocab', vocab); store.set('days', days); store.set('mins', mins);
  renderHome();
  b.textContent = 'Progresso apagado ✔';
};
$('btnSave').onclick = () => {
  const oldQ = S.quality;
  const oldTarget = S.target;
  S = readSettingsForm();
  store.set('settings', S);
  setLanguage(S.target, S.explain);
  if (oldTarget !== S.target) ttsCache.clear();
  N.setBoost(S.boost);
  if (oldQ !== S.quality) avatar.setQuality(S.quality);
  $('settings').classList.add('hidden');
  renderHome();
  toast('Configurações salvas ✔', 1500);
};
$('btnTest').onclick = async () => {
  const s = readSettingsForm();
  const out = $('testResult');
  out.textContent = 'Testando…';
  try {
    const r = await askLLM({ provider: s.provider, key: s.keys[s.provider], model: s.models[s.provider] || PROVIDERS[s.provider].model },
      systemPrompt({ level: s.level, vocab: [], correct: s.correct }), [], '[Teste de conexão] Diga apenas um oi curto.', null);
    out.textContent = `✅ Funcionou! Resposta: "${r.speech.map((p) => p.text).join(' ')}"`;
  } catch (e) { out.textContent = '❌ ' + (e.message || e); }
};
$('vocabList').onclick = (e) => {
  const li = e.target.closest('li[data-i]');
  if (!li) return;
  const w = vocab[Number(li.dataset.i)];
  if (e.target.classList.contains('say')) sayTarget(w.en);
  else if (e.target.classList.contains('del')) {
    vocab.splice(Number(li.dataset.i), 1);
    store.set('vocab', vocab);
    openVocab(); renderHome();
  }
};
$('repeatBox').onclick = (e) => {
  if (!st.repeat) return;
  $('repeatBox').classList.add('played');
  const w = e.target.closest('#repeatText .w');
  if (w) { practiceSpeak(w.textContent.replace(/[^\w'’-]/g, ''), { slow: true }); return; }
  practiceSpeak(st.repeat.text, { highlight: true });
};
$('corrBox').onclick = () => { if (st.corr) practiceSpeak(st.corr.correct); };
$('tutorLine').onclick = (e) => {
  const seg = e.target.closest('.seg.tg');
  if (seg) practiceSpeak(seg.textContent.slice(-160));
};
$('reportBody').onclick = (e) => {
  const g = e.target.closest('[data-say]');
  if (g) sayTarget(g.dataset.say);
};
// revisão
$('btnRevShow').onclick = () => revealCard(false);
$('fEn').onclick = () => sayTarget(rev.list[rev.i].en);
$('btnRevSpeak').onclick = () => {
  const w = rev.list[rev.i];
  if (!w) return;
  $('fHeard').textContent = '🎤 ouvindo…';
  N.listen(TL().stt, {
    onPartial: (t) => { $('fHeard').textContent = t; },
    onResult: (alts) => {
      const ok = alts.some((a) => liveMatch(w.en, a).every(Boolean));
      $('fHeard').textContent = ok ? `✓ "${alts[0]}"` : `Ouvi: "${alts[0] || '…'}"`;
      $('fHeard').className = 'f-heard' + (ok ? ' ok' : '');
      revealCard(ok);
    },
    onError: () => { $('fHeard').textContent = 'Não ouvi. Tente de novo ou toque em Mostrar.'; },
  });
};
$('revGrades').onclick = (e) => {
  const b = e.target.closest('button[data-g]');
  if (!b) return;
  srsGrade(rev.list[rev.i], Number(b.dataset.g));
  store.set('vocab', vocab);
  rev.i++;
  showCard();
};

// botão voltar do Android
window.onNativeBack = () => {
  const open = [...document.querySelectorAll('.sheet')].find((s) => !s.classList.contains('hidden'));
  if (open) { open.classList.add('hidden'); return true; }
  if (st.inCall) { endCall(); return true; }
  return false;
};
// app em segundo plano
document.addEventListener('visibilitychange', () => {
  if (!st.inCall) return;
  if (document.hidden) {
    if (st.liveMode) { N.micStop(); N.playerFlush(); }
    else { N.stopListening(); N.stopSpeaking(); N.recordCancel(); st.listening = false; setMicUi(false); }
  } else if (st.liveMode) {
    if (st.micOn) liveMicStart();
  } else if (!st.busy && S.handsFree) setTimeout(startListening, 600);
});

// olhar automático (modo clássico)
setInterval(() => {
  if (!st.inCall || st.liveMode || st.busy || st.speaking || st.practicing || st.listening && st.repeat && N.canRecord || !st.camOn) return;
  const every = st.scenario.autoLook || (isCurious() ? S.curiousEvery : S.autoLook);
  if (!every) return;
  if (Date.now() - st.lastActivity > every * 1000) {
    st.lastActivity = Date.now();
    ask(isCurious() ? 'curious' : 'idle');
  }
}, 1000);

// modo ao vivo: professora curiosa puxa assunto quando você fica quieto
setInterval(() => {
  if (!st.inCall || !st.liveMode || !st.live || st.speaking || st.practicing || st.turnOpen || st.awaitRepeat || st.judging || !isCurious()) return;
  if (Date.now() - st.lastActivity > S.curiousEvery * 1000) {
    st.lastActivity = Date.now();
    const f = st.camOn ? captureFrame(512, 0.6) : null;
    if (f) { st.live.sendImage(f); st.lastSig = sceneSignature($('cam')); st.lastSigAt = Date.now(); }
    st.live.sendText(eventText('curious', { hasImage: !!f }));
  }
}, 1000);

N.setBoost(S.boost);
renderHome();
setTimeout(() => { avatar.setMood('happy'); avatar.nodOnce(0.8); }, 600);
if (!S.keys[S.provider]) setTimeout(() => toast('Bem-vindo! Toque em "Configurar para começar".', 4000), 900);
