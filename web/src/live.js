// Conversa ao vivo com a Gemini Live API (WebSocket bidirecional).
// Áudio do microfone entra em PCM 16 kHz; a voz da professora volta em PCM 24 kHz.

const WS_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

export const LIVE_MODELS = ['gemini-3.8-live', 'gemini-3.1-flash-live-preview', 'gemini-2.5-flash-native-audio-preview-12-2025'];

export const LIVE_TOOLS = [
  {
    name: 'show_phrase',
    description: 'Show on the student\'s screen the English sentence they must say/repeat now, with its Brazilian Portuguese translation. Call it every time you ask the student to repeat something.',
    parameters: {
      type: 'object',
      properties: {
        phrase: { type: 'string', description: 'English sentence to repeat' },
        translation_pt: { type: 'string', description: 'Portuguese translation' },
      },
      required: ['phrase'],
    },
  },
  {
    name: 'show_correction',
    description: 'Show a correction card when the student made a mistake (grammar, wrong word or pronunciation heard in the audio).',
    parameters: {
      type: 'object',
      properties: {
        said: { type: 'string', description: 'What the student said (as you heard it)' },
        correct: { type: 'string', description: 'The correct English sentence' },
        explanation_pt: { type: 'string', description: 'Very short reason in Portuguese (max 12 words)' },
      },
      required: ['correct'],
    },
  },
  {
    name: 'save_words',
    description: 'Save useful new English words or expressions the student just learned (max 3 per call).',
    parameters: {
      type: 'object',
      properties: {
        words: {
          type: 'array',
          items: {
            type: 'object',
            properties: { en: { type: 'string' }, pt: { type: 'string' } },
            required: ['en', 'pt'],
          },
        },
      },
      required: ['words'],
    },
  },
];

function rateOf(mime) {
  const m = /rate=(\d+)/.exec(mime || '');
  return m ? Number(m[1]) : 24000;
}

export class LiveSession {
  // o = { key, model, voice, system, tools, onAudio, onInput, onOutput, onInterrupted, onTurnComplete,
  //       onToolCall, onUsage, onClosed, onReconnect }
  constructor(o) {
    this.o = o;
    this.ws = null;
    this.ready = false;
    this.closed = false;
    this.handle = null;
    this.reconnects = 0;
  }

  connect() {
    return new Promise((resolve, reject) => {
      let settled = false;
      const done = (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(tm);
        if (err) reject(err); else resolve();
      };
      const tm = setTimeout(() => { done(new Error('tempo esgotado ao conectar')); try { this.ws && this.ws.close(); } catch { /* ok */ } }, 15000);
      let ws;
      try {
        ws = new WebSocket(`${WS_URL}?key=${encodeURIComponent(this.o.key)}`);
      } catch (e) { done(e); return; }
      ws.binaryType = 'arraybuffer';
      this.ws = ws;
      this.ready = false;
      ws.onopen = () => {
        ws.send(JSON.stringify({ setup: this._setup() }));
      };
      ws.onmessage = (ev) => {
        let txt = ev.data;
        if (typeof txt !== 'string') {
          try { txt = new TextDecoder().decode(ev.data); } catch { return; }
        }
        let m;
        try { m = JSON.parse(txt); } catch { return; }
        if (m.setupComplete) { this.ready = true; done(); }
        this._handle(m);
      };
      ws.onerror = () => { /* o motivo vem no onclose */ };
      ws.onclose = (ev) => {
        if (ws !== this.ws) return;
        if (!this.ready) { done(new Error(ev.reason || `conexão recusada (código ${ev.code})`)); return; }
        this._onClose(ev);
      };
    });
  }

  _setup() {
    const o = this.o;
    const setup = {
      model: `models/${o.model}`,
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: o.voice || 'Aoede' } } },
      },
      systemInstruction: { parts: [{ text: o.system }] },
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      contextWindowCompression: { slidingWindow: {} },
      sessionResumption: this.handle ? { handle: this.handle } : {},
    };
    if (o.tools && o.tools.length) setup.tools = [{ functionDeclarations: o.tools }];
    return setup;
  }

  _handle(m) {
    const o = this.o;
    if (m.sessionResumptionUpdate && m.sessionResumptionUpdate.newHandle && m.sessionResumptionUpdate.resumable !== false) {
      this.handle = m.sessionResumptionUpdate.newHandle;
    }
    if (m.usageMetadata && o.onUsage) o.onUsage(m.usageMetadata);
    if (m.goAway) this._reconnect('goAway');
    if (m.toolCall && o.onToolCall) o.onToolCall(m.toolCall.functionCalls || []);
    const sc = m.serverContent;
    if (!sc) return;
    if (sc.modelTurn && Array.isArray(sc.modelTurn.parts)) {
      for (const p of sc.modelTurn.parts) {
        if (p.inlineData && p.inlineData.data && /audio/i.test(p.inlineData.mimeType || 'audio/pcm')) {
          o.onAudio && o.onAudio(p.inlineData.data, rateOf(p.inlineData.mimeType));
        }
      }
    }
    if (sc.inputTranscription && sc.inputTranscription.text && o.onInput) o.onInput(sc.inputTranscription.text);
    if (sc.outputTranscription && sc.outputTranscription.text && o.onOutput) o.onOutput(sc.outputTranscription.text);
    if (sc.interrupted && o.onInterrupted) o.onInterrupted();
    if (sc.turnComplete && o.onTurnComplete) o.onTurnComplete();
  }

  async _reconnect(why) {
    if (this.closed || this.reconnecting) return;
    if (this.reconnects >= 4) { this.o.onClosed && this.o.onClosed(why); return; }
    this.reconnecting = true;
    this.reconnects++;
    const old = this.ws;
    this.ws = null;
    try { old && old.close(1000); } catch { /* ok */ }
    try {
      await this.connect();
      this.o.onReconnect && this.o.onReconnect();
    } catch (e) {
      this.o.onClosed && this.o.onClosed(e.message || why);
    } finally {
      this.reconnecting = false;
    }
  }

  _onClose(ev) {
    if (this.closed) return;
    if (this.handle) this._reconnect(ev.reason || 'closed');
    else this.o.onClosed && this.o.onClosed(ev.reason || `código ${ev.code}`);
  }

  _send(obj) {
    if (!this.ws || this.ws.readyState !== 1 || !this.ready) return false;
    this.ws.send(JSON.stringify(obj));
    return true;
  }

  sendAudio(b64) { return this._send({ realtimeInput: { audio: { data: b64, mimeType: 'audio/pcm;rate=16000' } } }); }
  sendImage(b64) { return this._send({ realtimeInput: { video: { data: b64, mimeType: 'image/jpeg' } } }); }
  sendText(text) {
    return this._send({ clientContent: { turns: [{ role: 'user', parts: [{ text }] }], turnComplete: true } });
  }
  sendToolResponse(responses) { return this._send({ toolResponse: { functionResponses: responses } }); }

  close() {
    this.closed = true;
    try { this.ws && this.ws.close(1000); } catch { /* ok */ }
    this.ws = null;
  }
}

// Tenta o modelo escolhido e, se não existir, os próximos da lista.
export async function connectLive(opts, preferred) {
  const tried = [];
  const list = [preferred, ...LIVE_MODELS].filter((m, i, a) => m && a.indexOf(m) === i);
  let lastErr = null;
  for (const model of list) {
    const s = new LiveSession({ ...opts, model });
    try {
      await s.connect();
      s.model = model;
      return s;
    } catch (e) {
      lastErr = e;
      tried.push(model);
      const msg = String(e.message || e);
      // chave inválida / sem permissão: não adianta tentar outro modelo
      if (/api key|API_KEY|permission|PERMISSION|billing|quota/i.test(msg) && !/not found|not supported|unsupported/i.test(msg)) break;
    }
  }
  const err = new Error(lastErr ? lastErr.message : 'falha ao conectar');
  err.tried = tried;
  throw err;
}
