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
      const est = 2500 + text.length * 120 / rate;
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
  webRec.lang = lang; webRec.interimResults = true; webRec.maxAlternatives = 3;
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

export function openUrl(url) {
  if (isNative) A.openUrl(url); else window.open(url, '_blank');
}

export function appVersion() {
  try { return isNative ? A.appVersion() : 'web'; } catch { return '?'; }
}
