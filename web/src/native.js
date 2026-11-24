// Ponte entre a página e o Android (voz, reconhecimento de fala, HTTP).
// Quando roda num navegador comum (testes), usa APIs web equivalentes.

const A = window.Android;
export const isNative = !!A;

let seq = 0;
const nid = (p) => `${p}${Date.now().toString(36)}${(seq++).toString(36)}`;

// ---------- HTTP ----------
const httpWaiters = new Map();
window.__nativeHttp = (id, status, text) => {
  const w = httpWaiters.get(id);
  if (w) { httpWaiters.delete(id); w({ status, text }); }
};

export async function httpPost(url, headers, bodyObj, timeoutMs = 70000) {
  const body = JSON.stringify(bodyObj);
  if (isNative) {
    const id = nid('h');
    return await new Promise((resolve) => {
      httpWaiters.set(id, resolve);
      A.http(id, 'POST', url, JSON.stringify(headers), body);
      setTimeout(() => {
        if (httpWaiters.has(id)) { httpWaiters.delete(id); resolve({ status: 0, text: 'timeout' }); }
      }, timeoutMs + 5000);
    });
  }
  const ctrl = new AbortController();
  const tm = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { method: 'POST', headers, body, signal: ctrl.signal });
    return { status: r.status, text: await r.text() };
  } catch (e) {
    return { status: 0, text: String(e) };
  } finally { clearTimeout(tm); }
}

// ---------- Fala (TTS) ----------
// handlers: { onStart(), onWord(word, startChar, endChar), onDone() }
const ttsJobs = new Map();
window.__nativeTts = (type, id, a, b) => {
  const job = ttsJobs.get(id);
  if (!job) return;
  if (type === 'start') job.h.onStart && job.h.onStart();
  else if (type === 'range') {
    const word = job.text.slice(a, b);
    job.h.onWord && job.h.onWord(word, a, b);
  } else if (type === 'done' || type === 'error' || type === 'stopped') {
    ttsJobs.delete(id);
    job.resolve(type);
  }
};

let webVoices = [];
if (!isNative && window.speechSynthesis) {
  const load = () => { webVoices = speechSynthesis.getVoices(); };
  load();
  speechSynthesis.onvoiceschanged = load;
}

export function speak(text, lang, rate, voiceName, h = {}) {
  return new Promise((resolve) => {
    if (isNative) {
      const id = nid('t');
      ttsJobs.set(id, { text, h, resolve });
      A.speak(id, text, lang, rate, voiceName || '');
      // segurança: se o motor não responder
      const est = 8000 + text.length * 150 / rate;
      setTimeout(() => { if (ttsJobs.has(id)) { ttsJobs.delete(id); resolve('timeout'); } }, est);
      return;
    }
    if (!window.speechSynthesis) { setTimeout(() => resolve('done'), 400 + text.length * 50); return; }
    let fin = false;
    const end = (r) => { if (!fin) { fin = true; resolve(r); } };
    setTimeout(() => end('timeout'), 3000 + text.length * 110 / rate);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang.startsWith('pt') ? 'pt-BR' : 'en-US';
    u.rate = rate;
    const v = webVoices.find((x) => x.name === voiceName);
    if (v) u.voice = v;
    u.onstart = () => h.onStart && h.onStart();
    u.onboundary = (e) => {
      if (e.name && e.name !== 'word') return;
      const rest = text.slice(e.charIndex);
      const m = rest.match(/^[\w'’-]+/);
      if (m) h.onWord && h.onWord(m[0], e.charIndex, e.charIndex + m[0].length);
    };
    u.onend = () => end('done');
    u.onerror = () => end('error');
    speechSynthesis.speak(u);
  });
}

export function stopSpeaking() {
  if (isNative) A.stopSpeak();
  else if (window.speechSynthesis) speechSynthesis.cancel();
  for (const [id, job] of ttsJobs) { ttsJobs.delete(id); job.resolve('stopped'); }
}

export function listVoices() {
  if (isNative) {
    try { return JSON.parse(A.voices() || '[]'); } catch { return []; }
  }
  return webVoices.filter((v) => /^en/i.test(v.lang)).map((v) => ({ name: v.name, lang: v.lang, local: v.localService }));
}

// ---------- Reconhecimento de voz (STT) ----------
// handlers: { onReady, onPartial(text), onResult([alternativas]), onError(code), onLevel(0..1), onEnd }
let sttH = null;
window.__nativeStt = (type, data) => {
  const h = sttH;
  if (!h) return;
  if (type === 'ready') h.onReady && h.onReady();
  else if (type === 'partial') h.onPartial && h.onPartial(data);
  else if (type === 'level') h.onLevel && h.onLevel(Number(data));
  else if (type === 'result') {
    let alts = [];
    try { alts = JSON.parse(data); } catch { alts = [data]; }
    sttH = null;
    h.onResult && h.onResult(alts);
  } else if (type === 'error') {
    sttH = null;
    h.onError && h.onError(data);
  }
};

let webRec = null;
export function listen(lang, handlers) {
  sttH = handlers;
  if (isNative) { A.listen(lang); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { setTimeout(() => window.__nativeStt('error', 'unavailable'), 50); return; }
  webRec = new SR();
  webRec.lang = lang === 'auto' ? 'pt-BR' : lang; webRec.interimResults = true; webRec.maxAlternatives = 3;
  let done = false;
  webRec.onstart = () => window.__nativeStt('ready');
  webRec.onresult = (e) => {
    const r = e.results[e.results.length - 1];
    if (r.isFinal) {
      done = true;
      window.__nativeStt('result', JSON.stringify(Array.from(r).map((x) => x.transcript)));
    } else window.__nativeStt('partial', r[0].transcript);
  };
  webRec.onerror = (e) => { done = true; window.__nativeStt('error', e.error === 'no-speech' ? 'no_match' : e.error); };
  webRec.onend = () => { if (!done) window.__nativeStt('error', 'no_match'); };
  webRec.start();
}

export function stopListening() {
  sttH = null;
  if (isNative) A.stopListen();
  else if (webRec) { try { webRec.abort(); } catch { /* ok */ } }
}

export function setBoost(db) {
  if (isNative && A.setBoost) try { A.setBoost(Math.round(db * 100)); } catch { /* ok */ }
}
export function ensureAudible() {
  if (isNative && A.ensureAudible) try { return JSON.parse(A.ensureAudible() || '{}'); } catch { /* ok */ }
  return {};
}
export function showVolume() {
  if (isNative && A.showVolume) try { A.showVolume(); } catch { /* ok */ }
}

export function openUrl(url) {
  if (isNative) A.openUrl(url); else window.open(url, '_blank');
}

export function appVersion() {
  try { return isNative ? A.appVersion() : 'web'; } catch { return '?'; }
}

// ================= áudio ao vivo (microfone/alto-falante nativos) =================
let micH = null;
window.__nativeMic = (b64, lvl, type, aec) => {
  const h = micH;
  if (!h) return;
  if (type === 'data') h.onData && h.onData(b64, Number(lvl));
  else h.onEvent && h.onEvent(type, aec);
};
export function micStart({ call = false, half = true, chunkMs = 100 } = {}, handlers = {}) {
  micH = handlers;
  if (isNative && A.micStart) A.micStart(!!call, !!half, chunkMs);
  else setTimeout(() => handlers.onEvent && handlers.onEvent('unavailable'), 30);
}
export function micStop() {
  micH = null;
  if (isNative && A.micStop) A.micStop();
}

let audioH = {};
window.__nativeAudio = (type, v, tag) => {
  if (type === 'level') audioH.onLevel && audioH.onLevel(Number(v), tag);
  else if (type === 'drained') {
    lastDrainAt = Date.now();
    audioH.onDrained && audioH.onDrained(tag);
    const w = drainWaiters.splice(0);
    w.forEach((f) => f(tag));
  }
};
const drainWaiters = [];
let lastDrainAt = 0;
export const lastDrained = () => lastDrainAt;
export function onAudio(handlers) { audioH = handlers || {}; }
export function waitDrained(timeoutMs = 30000) {
  return new Promise((res) => {
    drainWaiters.push(res);
    setTimeout(() => res('timeout'), timeoutMs);
  });
}

// reprodutor web (só para testes no navegador)
const web = {
  ctx: null, t: 0, rate: 24000, timer: null, playing: false, srcs: [],
  open(rate) { this.rate = rate; try { this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch { this.ctx = null; } this.t = 0; },
  write(b64) {
    const bin = atob(b64); const n = bin.length >> 1;
    const f = new Float32Array(n);
    let sum = 0;
    for (let i = 0; i < n; i++) { let v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8); if (v > 32767) v -= 65536; f[i] = v / 32768; sum += f[i] * f[i]; }
    const lvl = Math.min(1, Math.sqrt(sum / Math.max(1, n)) * 4);
    const dur = n / this.rate;
    const now = this.ctx ? this.ctx.currentTime : performance.now() / 1000;
    const start = Math.max(now, this.t);
    this.t = start + dur;
    if (this.ctx) {
      const buf = this.ctx.createBuffer(1, n, this.rate); buf.copyToChannel(f, 0);
      const src = this.ctx.createBufferSource(); src.buffer = buf; src.connect(this.ctx.destination); src.start(start);
      this.srcs.push(src);
    }
    this.playing = true;
    setTimeout(() => window.__nativeAudio('level', lvl, 'web'), Math.max(0, (start - now) * 1000));
    clearTimeout(this.timer);
    this.timer = setTimeout(() => { this.playing = false; window.__nativeAudio('level', 0, 'web'); window.__nativeAudio('drained', 0, 'web'); }, (this.t - now) * 1000 + 50);
  },
  flush() { this.srcs.forEach((s) => { try { s.stop(); } catch { /* ok */ } }); this.srcs = []; this.t = 0; clearTimeout(this.timer); if (this.playing) { this.playing = false; window.__nativeAudio('drained', 0, 'web'); } },
};
export function playerOpen(rate = 24000, call = false, tag = 'live') {
  if (isNative && A.playerOpen) A.playerOpen(rate, !!call, tag); else web.open(rate);
}
export function playerWrite(b64) {
  if (isNative && A.playerWrite) A.playerWrite(b64); else web.write(b64);
}
export function playerFlush() {
  if (isNative && A.playerFlush) A.playerFlush(); else web.flush();
}
export function playerClose() {
  if (isNative && A.playerClose) A.playerClose(); else web.flush();
}
export function setCallMode(on) {
  if (isNative && A.setCallMode) A.setCallMode(!!on);
}

// gravação para avaliar pronúncia pelo som
let recH = null;
window.__nativeRec = (type, data) => {
  const h = recH;
  if (!h) return;
  if (type === 'level') h.onLevel && h.onLevel(Number(data));
  else if (type === 'speech') h.onSpeech && h.onSpeech();
  else if (type === 'ready') h.onReady && h.onReady();
  else {
    recH = null;
    if (type === 'done') h.onDone && h.onDone(data);
    else if (type === 'none') h.onNone && h.onNone();
    else h.onError && h.onError(data);
  }
};
export const canRecord = isNative && !!(A && A.recordStart);
export function recordStart(maxMs, handlers) {
  recH = handlers;
  if (canRecord) A.recordStart(maxMs);
  else setTimeout(() => window.__nativeRec('error', 'unavailable'), 30);
}
export function recordStop() { if (canRecord) A.recordStop(); }
export function recordCancel() { recH = null; if (canRecord) A.recordCancel(); }

export function setReminder(enabled, hour, minute, title, text) {
  if (isNative && A.setReminder) A.setReminder(!!enabled, hour | 0, minute | 0, title, text);
}
