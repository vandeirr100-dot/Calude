// Trilhas de aula, revisão espaçada e estatísticas.

export const SCENARIOS = [
  { id: 'daily', emoji: '📷', title: 'Meu dia a dia', desc: 'Ela vê o que você faz e ensina', cam: 'user',
    prompt: 'DAY-TO-DAY: teach from what the student is doing right now on the camera (actions, objects, routine). Make it feel like a friendly call.' },
  { id: 'curious', emoji: '🧐', title: 'Ela pergunta, eu respondo', desc: 'Pergunta o que você faz; responda até em português', cam: 'user', curious: true, ptBridge: true,
    prompt: 'CURIOUS CONVERSATION: you lead the conversation by asking the student about what they are doing and what you see on the camera. The student can answer in Portuguese or English; whenever they answer in Portuguese, teach them how to say it in English and have them repeat it.' },
  { id: 'explore', emoji: '🔎', title: 'Explorar a casa', desc: 'Aponte a câmera para objetos', cam: 'environment', autoLook: 20,
    prompt: 'EXPLORE MODE: the student points the BACK camera at objects around the house. Each time you see a new main object, say its English name slowly, its Portuguese translation, and one short useful sentence with it for the student to repeat. Then ask them to show you another object. Keep a fast, playful rhythm, like a game.' },
  { id: 'restaurant', emoji: '🍽️', title: 'Restaurante', desc: 'Pedir comida, conta, alergias',
    prompt: 'ROLE-PLAY: you are a friendly waiter/waitress in a restaurant in New York and the student is the customer. Practice greeting, ordering food and drinks, special requests, allergies, asking for the check and tipping. Stay in character, but step out briefly to correct mistakes.' },
  { id: 'travel', emoji: '✈️', title: 'Viagem e aeroporto', desc: 'Check-in, imigração, hotel',
    prompt: 'ROLE-PLAY: airport check-in agent, then immigration officer, then hotel receptionist. Ask the typical questions one at a time and help the student answer naturally.' },
  { id: 'job', emoji: '💼', title: 'Entrevista de emprego', desc: 'Perguntas e boas respostas',
    prompt: 'ROLE-PLAY: job interview. First ask which job the student wants, then ask typical interview questions one at a time (tell me about yourself, strengths, weaknesses, experience, why this company) and help them build strong, natural answers.' },
  { id: 'shopping', emoji: '🛍️', title: 'Compras', desc: 'Tamanhos, preços, trocas',
    prompt: 'ROLE-PLAY: shop assistant in a clothing store and later a supermarket cashier. Practice sizes, colors, prices, trying on, paying by card, returns and exchanges.' },
  { id: 'friends', emoji: '🙋', title: 'Conhecer pessoas', desc: 'Apresentações e conversa',
    prompt: 'ROLE-PLAY: you meet the student at a party/meetup. Practice introductions, where are you from, work/study, hobbies, making plans, small talk and keeping a conversation going.' },
  { id: 'doctor', emoji: '🩺', title: 'Médico e farmácia', desc: 'Sintomas e remédios',
    prompt: 'ROLE-PLAY: a doctor (then a pharmacist). Practice describing symptoms, how long, pain scale, allergies, understanding instructions and buying medicine.' },
  { id: 'directions', emoji: '🗺️', title: 'Pedir informações', desc: 'Direções e transporte',
    prompt: 'ROLE-PLAY: a local person in a big city. Practice asking for and giving directions, public transport, tickets, landmarks.' },
  { id: 'review', emoji: '🔁', title: 'Revisar com a professora', desc: 'Usa suas palavras salvas',
    prompt: 'REVIEW LESSON: review the student\'s words that are due for review, one by one: say the Portuguese meaning, ask the student to say the English word and then use it in a short sentence. Praise and correct.' },
];

export const scenarioById = (id) => SCENARIOS.find((s) => s.id === id) || SCENARIOS[0];

// ---------- repetição espaçada (estilo Anki simplificado) ----------
const DAY = 86400000;
const INTERVALS = [0, 1, 3, 7, 16, 35, 90]; // dias por "caixa"

export function srsInit(w) {
  if (w.box == null) w.box = 0;
  if (w.due == null) w.due = Date.now();
  return w;
}

// grade: 0 = errei, 1 = difícil, 2 = acertei, 3 = fácil
export function srsGrade(w, grade) {
  srsInit(w);
  const now = Date.now();
  if (grade === 0) { w.box = 0; w.due = now + 10 * 60000; w.lapses = (w.lapses || 0) + 1; }
  else if (grade === 1) { w.due = now + DAY * Math.max(1, Math.round(INTERVALS[w.box] / 2)); }
  else {
    w.box = Math.min(INTERVALS.length - 1, w.box + (grade === 3 ? 2 : 1));
    w.due = now + INTERVALS[w.box] * DAY;
  }
  w.reviews = (w.reviews || 0) + 1;
  w.last = now;
  return w;
}

export function dueWords(vocab, at = Date.now()) {
  return vocab.filter((w) => (w.due == null ? 0 : w.due) <= at)
    .sort((a, b) => (a.due || 0) - (b.due || 0));
}

export function boxLabel(box) {
  return ['nova', 'aprendendo', 'aprendendo', 'quase lá', 'firme', 'dominada', 'dominada'][box || 0];
}

// ---------- tempo de estudo ----------
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function weekMinutes(mins) {
  // semana de segunda a domingo
  const d = new Date();
  const dow = (d.getDay() + 6) % 7;
  let total = 0;
  for (let i = 0; i <= dow; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() - i);
    const k = `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
    total += mins[k] || 0;
  }
  return Math.round(total);
}

export function monthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// ---------- mudança de cena (para só mandar foto quando muda) ----------
export function sceneSignature(video) {
  if (!video || !video.videoWidth) return null;
  const c = sceneSignature.c || (sceneSignature.c = document.createElement('canvas'));
  c.width = 16; c.height = 12;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(video, 0, 0, 16, 12);
  const d = g.getImageData(0, 0, 16, 12).data;
  const out = new Uint8Array(192);
  for (let i = 0; i < 192; i++) out[i] = (d[i * 4] * 3 + d[i * 4 + 1] * 6 + d[i * 4 + 2]) / 10;
  return out;
}
export function sceneDiff(a, b) {
  if (!a || !b) return 1;
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return s / a.length / 255;
}
