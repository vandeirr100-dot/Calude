import { Avatar } from './avatar.js';
import * as N from './native.js';
import { PROVIDERS, systemPrompt, eventText, askLLM, pronunciationScore, liveMatch } from './llm.js';

const $ = (id) => document.getElementById(id);

// ---------- armazenamento ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem('lia.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('lia.' + k, JSON.stringify(v)); } catch { /* ok */ } },
};

const DEFAULTS = { provider: 'gemini', keys: {}, models: {}, level: 'iniciante', rate: 0.9, voice: '', autoLook: 60, handsFree: true, camDefault: true, correct: 'realtime', boost: 9 };
let S = { ...DEFAULTS, ...store.get('settings', {}) };
const settingsForLLM = () => ({ provider: S.provider, key: S.keys[S.provider] || '', model: S.models[S.provider] || PROVIDERS[S.provider].model });

let vocab = store.get('vocab', []);
let days = store.get('days', []);

// ---------- avatar ----------
const avatar = new Avatar($('avatar'));
window.lia = { avatar };

// ---------- estado da chamada ----------
const st = {
  inCall: false, busy: false, speaking: false, listening: false,
  camOn: false, facing: 'user', stream: null, speakerOn: true,
  lang: 'en-US', repeat: null, repeatTries: 0, history: [],
  lastActivity: Date.now(), silences: 0, callId: 0, startedAt: 0, newWords: 0, hearId: 0, practicing: false, corr: null,
};

// ---------- UI helpers ----------
let toastT;
function toast(msg, ms = 3200) {
  const t = $('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms);
}
function setStatus(s) { $('status').textContent = s; }
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function renderHome() {
  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  const set = new Set(days);
  const d = new Date();
  if (!set.has(today)) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) { streak++; d.setDate(d.getDate() - 1); }
  $('streak').textContent = `🔥 ${streak} ${streak === 1 ? 'dia' : 'dias'}`;
  $('wordCount').textContent = `📚 ${vocab.length} ${vocab.length === 1 ? 'palavra' : 'palavras'}`;
  const lv = { iniciante: 'Iniciante', basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' };
  $('levelChip').textContent = `🎯 ${lv[S.level]}`;
  const hasKey = !!S.keys[S.provider];
  $('btnStart').querySelector('span').textContent = hasKey ? 'Começar aula' : 'Configurar para começar';
  $('btnReview').disabled = !vocab.length;
  $('btnReview').style.opacity = vocab.length ? 1 : 0.5;
  const b = $('wordsBadge');
  b.textContent = vocab.length; b.classList.toggle('hidden', !vocab.length);
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
function captureFrame() {
  if (!st.camOn) return null;
  const v = $('cam');
  if (!v.videoWidth) return null;
  const W = 640, scale = Math.min(1, W / Math.max(v.videoWidth, v.videoHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(v.videoWidth * scale); c.height = Math.round(v.videoHeight * scale);
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  const pip = $('pip');
  pip.classList.remove('snap'); void pip.offsetWidth; pip.classList.add('snap');
  return c.toDataURL('image/jpeg', 0.66).split(',')[1];
}

// ---------- legendas ----------
function showTutor(parts, nowIdx = -1) {
  $('tutorLine').innerHTML = parts.map((p, i) => `<span class="seg ${p.lang} ${i === nowIdx ? 'now' : ''}">${esc(p.text)}</span>`).join(' ');
}
function showUser(text) { $('userLine').textContent = text ? `Você: ${text}` : ''; }
function showRepeat(r) {
  const box = $('repeatBox');
  if (!r || !r.text) { box.classList.add('hidden'); return; }
  $('repeatText').innerHTML = r.text.split(/\s+/).filter(Boolean).map((w, i) => `<span class="w" data-i="${i}">${esc(w)}</span>`).join(' ');
  box.classList.remove('played');
  $('repeatPt').textContent = r.pt || '';
  $('score').classList.add('hidden');
  box.classList.remove('hidden');
}
function markRepeat(marks, final) {
  document.querySelectorAll('#repeatText .w').forEach((el, i) => {
    el.classList.toggle('ok', !!marks[i]);
    el.classList.toggle('miss', !!final && !marks[i]);
  });
}
function showCorr(c) {
  const box = $('corrBox');
  if (!c) { box.classList.add('hidden'); document.body.classList.remove('has-corr'); return; }
  $('corrWrong').textContent = c.said || '…';
  $('corrRight').textContent = c.correct;
  $('corrExp').textContent = c.explain || '';
  box.classList.remove('hidden');
  document.body.classList.add('has-corr');
  st.corr = c;
}
function showScore(res) {
  const el = $('score');
  el.className = res.score >= 80 ? 'good' : res.score >= 50 ? 'mid' : 'bad';
  const emoji = res.score >= 80 ? '🎉' : res.score >= 50 ? '👍' : '🔁';
  let html = `${emoji} Pronúncia: ${res.score}%`;
  if (res.missed.length && res.score < 100) html += ` · treine: ${res.missed.map((w) => `<span class="miss">${esc(w)}</span>`).join(' ')}`;
  el.innerHTML = html;
}

// ---------- falar ----------
async function speakParts(parts, callId) {
  st.speaking = true;
  avatar.setMode('speaking');
  setStatus('falando…');
  for (let i = 0; i < parts.length; i++) {
    if (callId !== st.callId) break;
    const p = parts[i];
    showTutor(parts, i);
    if (!st.speakerOn) {
      // sem som: anima a boca pelo tempo estimado
      const ms = 400 + p.text.length * 55 / S.rate;
      const ws = p.text.split(/\s+/);
      const per = ms / ws.length;
      for (const w of ws) { if (callId !== st.callId) break; avatar.speakWord(w, per * 0.9); await new Promise((r) => setTimeout(r, per)); }
      continue;
    }
    let gotWord = false;
    const fallback = setTimeout(() => { if (!gotWord) avatar.word = null; }, 500);
    const lang = p.lang === 'pt' ? 'pt-BR' : 'en-US';
    const rate = p.lang === 'pt' ? Math.min(1.1, S.rate + 0.1) : S.rate;
    await N.speak(p.text, lang, rate, p.lang === 'en' ? S.voice : '', {
      onWord: (w) => {
        gotWord = true;
        const ms = (90 + w.length * 62) / rate;
        avatar.speakWord(w, ms);
      },
    });
    clearTimeout(fallback);
  }
  st.speaking = false;
  avatar.speakingUntil = 0;
  st.lastActivity = Date.now();
}

// ---------- ouvir ----------
function setMicUi(live) {
  $('btnMic').classList.toggle('live', live);
  $('btnMic').classList.remove('off');
}
function startListening() {
  if (!st.inCall || st.busy || st.speaking) return;
  N.stopListening();
  st.listening = true;
  setMicUi(true);
  avatar.setMode('listening');
  setStatus(st.lang === 'pt-BR' ? 'ouvindo (português)…' : 'ouvindo…');
  const callId = st.callId;
  N.listen(st.lang, {
    onPartial: (t) => {
      showUser(t);
      if (st.repeat && st.lang === 'en-US') markRepeat(liveMatch(st.repeat.text, t), false);
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
function stopListeningUi() {
  st.listening = false;
  setMicUi(false);
  $('btnMic').style.setProperty('--lvl', 1);
  avatar.setMicLevel(0);
  if (st.inCall && !st.busy && !st.speaking) { avatar.setMode('idle'); setStatus('toque no microfone para falar'); }
}
function onSilence() {
  st.silences++;
  if (!S.handsFree || !st.inCall) return;
  if (st.silences < 3) setTimeout(() => { if (!st.listening) startListening(); }, 300);
  else setStatus(S.autoLook && st.camOn ? 'toque no microfone para falar (ou espere a Lia puxar assunto)' : 'toque no microfone para falar');
}

// ---------- turno com a IA ----------
async function ask(kind, data = {}) {
  if (!st.inCall || st.busy) return;
  N.stopListening();
  st.listening = false; setMicUi(false);
  st.busy = true;
  const callId = st.callId;
  avatar.setMode('thinking');
  setStatus('pensando…');
  const img = captureFrame();
  const text = eventText(kind, { ...data, hasImage: !!img });
  let reply;
  try {
    reply = await askLLM(settingsForLLM(), systemPrompt({ level: S.level, vocab, correct: S.correct }), st.history.slice(-14), text, img);
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
  st.history.push({ role: 'user', text: img ? text + '\n[foto da câmera enviada]' : text });
  st.history.push({ role: 'assistant', text: JSON.stringify(reply) });
  if (st.history.length > 30) st.history.splice(0, st.history.length - 30);
  st.busy = false;

  // palavras novas
  let added = 0;
  for (const w of reply.new_words) {
    const k = w.en.toLowerCase();
    if (!vocab.some((v) => v.en.toLowerCase() === k)) { vocab.push({ en: w.en, pt: w.pt, ts: Date.now() }); added++; }
  }
  if (added) {
    st.newWords += added;
    store.set('vocab', vocab);
    renderHome();
    toast(`📚 +${added} ${added === 1 ? 'palavra nova salva' : 'palavras novas salvas'}`, 2000);
  }

  // frase para repetir
  if (reply.repeat) {
    if (!st.repeat || st.repeat.text !== reply.repeat) st.repeatTries = 0;
    st.repeat = { text: reply.repeat, pt: reply.repeat_pt };
  } else st.repeat = null;
  showRepeat(st.repeat);
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
  const data = { text, lang: st.lang };
  if (st.repeat && st.lang === 'en-US') {
    const res = pronunciationScore(st.repeat.text, alts);
    if (res) {
      st.repeatTries++;
      showScore(res);
      markRepeat(liveMatch(st.repeat.text, res.heard), true);
      $('score').classList.remove('hidden');
      if (res.score >= 80) { avatar.setMood('happy'); avatar.nodOnce(1); }
      Object.assign(data, { repeat: st.repeat.text, score: res.score, missed: res.missed });
    }
  }
  ask('user', data);
}

// ---------- ouvir pronúncia (tocar na frase) ----------
let lastHear = { text: '', at: 0 };
async function practiceSpeak(text, opts = {}) {
  text = String(text || '').trim();
  if (!text) return;
  if (st.busy) { toast('Espere a Lia terminar de pensar…', 1200); return; }
  // segundo toque na mesma frase em até 6 s = mais devagar
  const now = Date.now();
  const slow = opts.slow || (lastHear.text === text && now - lastHear.at < 6000);
  lastHear = { text, at: now };
  if (st.speaking) { st.callId++; N.stopSpeaking(); st.speaking = false; }
  N.stopListening(); st.listening = false; setMicUi(false);
  const myId = ++st.hearId;
  const rate = slow ? Math.max(0.5, S.rate - 0.3) : S.rate;
  avatar.setMode('speaking');
  setStatus(slow ? 'falando devagar…' : 'ouça a pronúncia…');
  if (opts.highlight) document.querySelectorAll('#repeatText .w').forEach((el) => el.classList.remove('ok', 'miss'));
  const spans = opts.highlight ? [...document.querySelectorAll('#repeatText .w')] : [];
  let wi = 0;
  st.practicing = true;
  await N.speak(text, 'en-US', rate, S.voice, {
    onWord: (w) => {
      avatar.speakWord(w, (90 + w.length * 62) / rate);
      spans.forEach((el) => el.classList.remove('playing'));
      if (spans[wi]) spans[wi].classList.add('playing');
      wi++;
    },
  });
  spans.forEach((el) => el.classList.remove('playing'));
  st.practicing = false;
  if (myId !== st.hearId) return;
  avatar.speakingUntil = 0;
  st.lastActivity = Date.now();
  if (st.inCall && !st.busy) {
    if (S.handsFree) startListening();
    else { avatar.setMode('idle'); setStatus('toque no microfone para falar'); }
  } else avatar.setMode('idle');
}

function restartLesson() {
  if (!st.inCall) return;
  st.callId++;
  st.busy = false; st.speaking = false; st.listening = false;
  N.stopSpeaking(); N.stopListening(); setMicUi(false);
  st.history = []; st.repeat = null; st.repeatTries = 0; st.silences = 0;
  showTutor([]); showUser(''); showRepeat(null); showCorr(null);
  avatar.setMode('idle'); avatar.setMood('happy'); avatar.nodOnce(0.6);
  toast('Aula reiniciada ↺', 1400);
  setStatus('reiniciando…');
  setTimeout(() => ask('start'), 500);
}

// ---------- ciclo da chamada ----------
async function startCall(kind = 'start') {
  if (!S.keys[S.provider]) { openSettings(); toast('Primeiro coloque a chave da IA (é rapidinho).'); return; }
  st.inCall = true;
  st.callId++;
  st.history = []; st.repeat = null; st.silences = 0; st.newWords = 0; st.startedAt = Date.now();
  document.body.classList.add('in-call');
  ['captions', 'controls', 'callBar'].forEach((id) => $(id).classList.remove('hidden'));
  showTutor([]); showUser(''); showRepeat(null); showCorr(null);
  $('btnSpeaker').classList.toggle('off', !st.speakerOn);
  updateLangChip();
  const today = new Date().toISOString().slice(0, 10);
  if (!days.includes(today)) { days.push(today); days = days.slice(-400); store.set('days', days); }
  N.ensureAudible();
  if (S.camDefault) await camStart(); else camStop();
  // espera a câmera estabilizar um pouco antes da primeira foto
  setStatus('conectando…');
  await new Promise((r) => setTimeout(r, st.camOn ? 900 : 200));
  ask(kind);
}

function endCall() {
  if (!st.inCall) return;
  st.inCall = false; st.callId++;
  st.busy = false; st.speaking = false;
  N.stopSpeaking(); N.stopListening();
  camStop();
  avatar.setMode('idle'); avatar.setMood('happy');
  document.body.classList.remove('in-call');
  ['captions', 'controls', 'callBar'].forEach((id) => $(id).classList.add('hidden'));
  showCorr(null);
  setStatus('Professora de inglês');
  const min = Math.max(1, Math.round((Date.now() - st.startedAt) / 60000));
  toast(`Aula encerrada: ${min} min${st.newWords ? ` · ${st.newWords} palavras novas` : ''}. See you soon!`, 4000);
  renderHome();
}

function updateLangChip() {
  $('langChip').innerHTML = `Você fala em: <b>${st.lang === 'en-US' ? 'Inglês' : 'Português'}</b>`;
}

// ---------- configurações ----------
function openSettings() {
  $('setProvider').value = S.provider;
  fillProviderFields();
  document.querySelectorAll('#setLevel button').forEach((b) => b.classList.toggle('on', b.dataset.v === S.level));
  $('setRate').value = S.rate; $('rateVal').textContent = S.rate;
  $('setBoost').value = S.boost; $('boostVal').textContent = boostLabel(S.boost);
  $('setAutoLook').value = String(S.autoLook);
  $('setHandsFree').checked = S.handsFree;
  $('setCamDefault').checked = S.camDefault;
  document.querySelectorAll('#setCorrect button').forEach((b) => b.classList.toggle('on', b.dataset.v === (S.correct || 'realtime')));
  $('btnResetAll').textContent = 'Apagar progresso';
  $('testResult').textContent = '';
  const sel = $('setVoice');
  const voices = N.listVoices().filter((v) => /^en/i.test(v.lang));
  sel.innerHTML = '<option value="">Automática</option>' + voices.map((v) => `<option value="${esc(v.name)}">${esc(prettyVoice(v))}</option>`).join('');
  sel.value = S.voice || '';
  $('ver').textContent = `Versão ${N.appVersion()}`;
  $('settings').classList.remove('hidden');
}
function prettyVoice(v) {
  const region = { 'en-US': 'EUA', 'en-GB': 'Reino Unido', 'en-AU': 'Austrália', 'en-IN': 'Índia', 'en-CA': 'Canadá' }[String(v.lang).replace('_', '-')] || v.lang;
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
  const lv = document.querySelector('#setLevel button.on');
  s.level = lv ? lv.dataset.v : 'iniciante';
  s.rate = Number($('setRate').value);
  s.boost = Number($('setBoost').value);
  s.voice = $('setVoice').value;
  s.autoLook = Number($('setAutoLook').value);
  s.handsFree = $('setHandsFree').checked;
  s.camDefault = $('setCamDefault').checked;
  const cm = document.querySelector('#setCorrect button.on');
  s.correct = cm ? cm.dataset.v : 'realtime';
  return s;
}

// ---------- vocabulário ----------
function openVocab() {
  const ul = $('vocabList');
  if (!vocab.length) ul.innerHTML = '<li class="empty">Ainda não há palavras. Elas aparecem aqui durante as aulas.</li>';
  else {
    ul.innerHTML = vocab.slice().reverse().map((w, i) => `<li data-i="${vocab.length - 1 - i}"><div class="w"><b>${esc(w.en)}</b><span>${esc(w.pt)}</span></div><button class="say" aria-label="ouvir">🔊</button><button class="del" aria-label="apagar">🗑</button></li>`).join('');
  }
  $('vocab').classList.remove('hidden');
}

// ---------- eventos ----------
$('btnStart').onclick = () => startCall('start');
$('btnReview').onclick = () => { if (vocab.length) startCall('review'); };
$('btnHomeWords').onclick = openVocab;
$('btnWords').onclick = openVocab;
$('btnMenu').onclick = openSettings;
$('btnHang').onclick = endCall;
$('btnLook').onclick = () => {
  if (!st.camOn) { toast('Ligue a câmera para a Lia ver o que você está fazendo.'); return; }
  if (st.busy) return;
  if (st.speaking) { st.callId++; N.stopSpeaking(); st.speaking = false; avatar.speakingUntil = 0; }
  ask('look');
};
$('btnMic').onclick = () => {
  if (!st.inCall) return;
  if (st.listening) { N.stopListening(); stopListeningUi(); return; }
  if (st.busy) { toast('A Lia está pensando…', 1200); return; }
  if (st.speaking) {
    // interrompe a fala e escuta
    st.callId++;
    N.stopSpeaking();
    st.speaking = false; avatar.speakingUntil = 0;
  }
  st.silences = 0;
  startListening();
};
$('btnSpeaker').onclick = () => {
  st.speakerOn = !st.speakerOn;
  $('btnSpeaker').classList.toggle('off', !st.speakerOn);
  if (!st.speakerOn) N.stopSpeaking();
  toast(st.speakerOn ? 'Som ligado' : 'Som desligado (só legendas)', 1400);
};
$('btnCam').onclick = () => { if (st.camOn) camStop(); else camStart(); };
$('pip').onclick = () => { st.facing = st.facing === 'user' ? 'environment' : 'user'; camStart(); };
$('langChip').onclick = () => {
  st.lang = st.lang === 'en-US' ? 'pt-BR' : 'en-US';
  updateLangChip();
  toast(st.lang === 'en-US' ? 'Agora fale em inglês' : 'Agora pode falar em português (para tirar dúvidas)', 1800);
  if (st.listening) startListening();
};
document.querySelectorAll('[data-close]').forEach((b) => { b.onclick = () => $(b.dataset.close).classList.add('hidden'); });
document.querySelectorAll('.sheet').forEach((sh) => sh.addEventListener('click', (e) => { if (e.target === sh) sh.classList.add('hidden'); }));
$('setProvider').onchange = () => {
  // guarda o que já foi digitado no provedor anterior
  if (pendingProvider) { S.keys[pendingProvider] = $('setKey').value.trim(); }
  fillProviderFields();
};
$('btnShowKey').onclick = () => { const k = $('setKey'); k.type = k.type === 'password' ? 'text' : 'password'; };
$('keyHelp').onclick = (e) => { e.preventDefault(); N.openUrl($('keyHelp').dataset.url); };
$('setRate').oninput = () => { $('rateVal').textContent = $('setRate').value; };
function boostLabel(v) { v = Number(v); return v <= 0 ? 'normal' : v <= 6 ? `+${v} (um pouco)` : v <= 12 ? `+${v} (alto)` : `+${v} (máximo)`; }
$('setBoost').oninput = () => {
  $('boostVal').textContent = boostLabel($('setBoost').value);
  N.setBoost(Number($('setBoost').value));
};
$('btnTestVoice').onclick = () => { N.ensureAudible(); N.speak('Hello! This is my voice. Can you hear me well?', 'en-US', Number($('setRate').value), $('setVoice').value, { onWord: (w) => avatar.speakWord(w, 90 + w.length * 62) }); };
document.querySelectorAll('#setCorrect button').forEach((b) => {
  b.onclick = () => document.querySelectorAll('#setCorrect button').forEach((x) => x.classList.toggle('on', x === b));
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
  vocab = []; days = [];
  store.set('vocab', vocab); store.set('days', days);
  renderHome();
  b.textContent = 'Progresso apagado ✔';
};
$('btnRestart').onclick = restartLesson;
$('repeatBox').onclick = (e) => {
  if (!st.repeat) return;
  $('repeatBox').classList.add('played');
  const w = e.target.closest('#repeatText .w');
  if (w) { practiceSpeak(w.textContent.replace(/[^\w'’-]/g, ''), { slow: true }); return; }
  practiceSpeak(st.repeat.text, { highlight: true });
};
$('corrBox').onclick = () => { if (st.corr) practiceSpeak(st.corr.correct); };
$('tutorLine').onclick = (e) => {
  const seg = e.target.closest('.seg.en');
  if (seg) practiceSpeak(seg.textContent);
};
document.querySelectorAll('#setLevel button').forEach((b) => {
  b.onclick = () => document.querySelectorAll('#setLevel button').forEach((x) => x.classList.toggle('on', x === b));
});
$('btnSave').onclick = () => {
  S = readSettingsForm();
  store.set('settings', S);
  N.setBoost(S.boost);
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
    out.textContent = `✅ Funcionou! A Lia respondeu: "${r.speech.map((p) => p.text).join(' ')}"`;
  } catch (e) { out.textContent = '❌ ' + (e.message || e); }
};
$('vocabList').onclick = (e) => {
  const li = e.target.closest('li[data-i]');
  if (!li) return;
  const w = vocab[Number(li.dataset.i)];
  if (e.target.classList.contains('say')) {
    N.speak(w.en, 'en-US', S.rate, S.voice, { onWord: (x) => avatar.speakWord(x, 90 + x.length * 70) });
  } else if (e.target.classList.contains('del')) {
    vocab.splice(Number(li.dataset.i), 1);
    store.set('vocab', vocab);
    openVocab(); renderHome();
  }
};

// botão voltar do Android
window.onNativeBack = () => {
  const open = [...document.querySelectorAll('.sheet')].find((s) => !s.classList.contains('hidden'));
  if (open) { open.classList.add('hidden'); return true; }
  if (st.inCall) { endCall(); return true; }
  return false;
};
// app em segundo plano: pausa a fala/escuta
document.addEventListener('visibilitychange', () => {
  if (document.hidden && st.inCall) {
    N.stopListening(); N.stopSpeaking();
    st.listening = false; setMicUi(false);
  } else if (!document.hidden && st.inCall && !st.busy && S.handsFree) {
    setTimeout(startListening, 600);
  }
});

// olhar automático quando o aluno fica em silêncio
setInterval(() => {
  if (!st.inCall || st.busy || st.speaking || st.practicing || !st.camOn || !S.autoLook) return;
  if (Date.now() - st.lastActivity > S.autoLook * 1000) {
    st.lastActivity = Date.now();
    ask('idle');
  }
}, 1000);

N.setBoost(S.boost);
renderHome();
setTimeout(() => { avatar.setMood('happy'); avatar.nodOnce(0.8); }, 600);
if (!S.keys[S.provider]) setTimeout(() => toast('Bem-vindo! Toque em "Configurar para começar".', 4000), 900);
