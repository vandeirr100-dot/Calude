// Lia — tutora 3D original, construída 100% em código (three.js).
// Cabeça, olhos, pálpebras, sobrancelhas, boca com sincronia labial, cabelo e roupa.
import * as THREE from 'three';

const SKIN = 0xf4c9a8;
const SKIN_DARK = 0xe9b292;
const HAIR = 0x6a3220;
const SWEATER = 0x2f8a8f;
const SWEATER_DARK = 0x256f73;

// ---------- utilidades de forma ----------
const HEAD_SCALE = new THREE.Vector3(0.95, 1.0, 0.95);

// Deforma um ponto da esfera unitária no formato de cabeça estilizada.
function deformHead(v) {
  const y = v.y;
  if (y < 0) {
    const t = Math.min(1, -y);
    v.x *= 1 - 0.3 * t * t;           // maxilar afinando
    v.z *= 1 - 0.06 * t * t;
    v.y *= 1 - 0.04 * t;
  } else {
    v.x *= 1 + 0.03 * y;               // crânio mais largo
  }
  v.multiply(HEAD_SCALE);
  return v;
}

// Ponto na superfície da cabeça a partir de (x, y) da esfera unitária.
function surf(x, y, out = 1) {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  return deformHead(new THREE.Vector3(x, y, z).multiplyScalar(out));
}

function deformGeometry(geo, out = 1, pre) {
  const p = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    if (pre) pre(v);
    v.normalize().multiplyScalar(out);
    deformHead(v);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

// Retalho (patch) da superfície do rosto com textura desenhada em canvas.
function makePatch(thetaC, thetaHalf, phiHalf, w, h, out) {
  const phiStart = Math.PI / 2 - phiHalf, phiLen = phiHalf * 2;
  const thetaStart = thetaC - thetaHalf, thetaLen = thetaHalf * 2;
  const geo = new THREE.SphereGeometry(1, 72, 48, phiStart, phiLen, thetaStart, thetaLen);
  deformGeometry(geo, out);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.MeshStandardMaterial({
    map: tex, transparent: true, depthWrite: false, roughness: 0.55,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  const mesh = new THREE.Mesh(geo, mat);
  // converte coordenadas (x,y) da esfera unitária para pixels do canvas
  const toPx = (x, y) => {
    const theta = Math.acos(Math.max(-1, Math.min(1, y)));
    const s = Math.sin(theta) || 1e-6;
    const phi = Math.acos(Math.max(-1, Math.min(1, -x / s)));
    return [((phi - phiStart) / phiLen) * w, ((theta - thetaStart) / thetaLen) * h];
  };
  const unit = (x, y, dx) => { // tamanho em px de dx unidades perto de (x,y)
    const a = toPx(x - dx / 2, y), b = toPx(x + dx / 2, y);
    return Math.abs(b[0] - a[0]);
  };
  return { mesh, canvas, ctx, tex, toPx, unit };
}

function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function hairTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#7a3a24'; g.fillRect(0, 0, 256, 256);
  const r = seeded(7);
  for (let i = 0; i < 420; i++) {
    const x = r() * 256, w = 0.6 + r() * 1.8;
    const l = r();
    g.strokeStyle = l > 0.6 ? `rgba(190,110,70,${0.25 + r() * 0.3})` : `rgba(40,15,8,${0.25 + r() * 0.35})`;
    g.lineWidth = w;
    g.beginPath(); g.moveTo(x, 0);
    g.bezierCurveTo(x + (r() - 0.5) * 14, 85, x + (r() - 0.5) * 14, 170, x + (r() - 0.5) * 10, 256);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function eyeTexture() {
  const W = 1024, H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  // esclera
  const sg = g.createRadialGradient(256, 256, 40, 256, 256, 330);
  sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.6, '#f7f2ef'); sg.addColorStop(1, '#e8d2cf');
  g.fillStyle = sg; g.fillRect(0, 0, W, H);
  const cx = 256, cy = 256, R = 86, P = 34;
  // íris (âmbar/avelã)
  const ig = g.createRadialGradient(cx, cy, P * 0.8, cx, cy, R);
  ig.addColorStop(0, '#3b2210');
  ig.addColorStop(0.18, '#7a4a1c');
  ig.addColorStop(0.55, '#b9792f');
  ig.addColorStop(0.85, '#8a5222');
  ig.addColorStop(1, '#2a160a');
  g.fillStyle = ig;
  g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill();
  // estrias
  const r = seeded(3);
  for (let i = 0; i < 90; i++) {
    const a = r() * Math.PI * 2, r0 = P + 4, r1 = R * (0.75 + r() * 0.2);
    g.strokeStyle = r() > 0.5 ? 'rgba(240,190,110,0.35)' : 'rgba(60,30,10,0.35)';
    g.lineWidth = 1 + r() * 1.5;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
    g.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); g.stroke();
  }
  // anel límbico
  g.strokeStyle = 'rgba(30,14,5,0.85)'; g.lineWidth = 7;
  g.beginPath(); g.arc(cx, cy, R - 3, 0, Math.PI * 2); g.stroke();
  // pupila
  g.fillStyle = '#0b0605';
  g.beginPath(); g.arc(cx, cy, P, 0, Math.PI * 2); g.fill();
  // brilhos
  g.fillStyle = 'rgba(255,255,255,0.95)';
  g.beginPath(); g.ellipse(cx - 28, cy - 30, 16, 13, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.7)';
  g.beginPath(); g.arc(cx + 26, cy + 28, 7, 0, Math.PI * 2); g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------- visemas (formatos de boca) ----------
const VIS = {
  a: { open: 0.8, wide: 0.35, round: 0 },
  e: { open: 0.5, wide: 0.7, round: 0 },
  i: { open: 0.32, wide: 0.95, round: 0 },
  o: { open: 0.65, wide: -0.2, round: 0.85 },
  u: { open: 0.32, wide: -0.4, round: 1 },
  m: { open: 0, wide: 0, round: 0 },
  f: { open: 0.12, wide: 0.3, round: 0 },
  w: { open: 0.22, wide: -0.4, round: 0.9 },
  l: { open: 0.38, wide: 0.3, round: 0 },
  s: { open: 0.18, wide: 0.6, round: 0 },
  c: { open: 0.3, wide: 0.2, round: 0.1 },
  rest: { open: 0, wide: 0, round: 0 },
};
function letterViseme(ch, next) {
  if ('a'.includes(ch)) return VIS.a;
  if ('e'.includes(ch)) return VIS.e;
  if ('iy'.includes(ch)) return VIS.i;
  if ('o'.includes(ch)) return (next === 'o' || next === 'u') ? VIS.u : VIS.o;
  if ('u'.includes(ch)) return VIS.u;
  if ('mbp'.includes(ch)) return VIS.m;
  if ('fv'.includes(ch)) return VIS.f;
  if ('wq'.includes(ch)) return VIS.w;
  if ('lntdr'.includes(ch)) return VIS.l;
  if ('szjx'.includes(ch)) return VIS.s;
  if ('h'.includes(ch)) return null; // geralmente mudo/aspirado
  return VIS.c;
}

export class Avatar {
  constructor(canvas) {
    this.canvas = canvas;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0x000000, 0);
    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(22, 1, 0.1, 60);

    this._lights();
    this._build();

    // estado de animação
    this.mode = 'idle';
    this.mood = 'neutral';
    this.mouth = { open: 0, wide: 0, round: 0, smile: 0.35 };
    this.mouthTarget = { ...this.mouth };
    this.brow = { raise: 0, frown: 0, asym: 0 };
    this.browTarget = { ...this.brow };
    this.gaze = new THREE.Vector2();
    this.gazeTarget = new THREE.Vector2();
    this.nextSaccade = 0;
    this.blink = 0; this.blinkT = -1; this.nextBlink = 1.5; this.doubleBlink = false;
    this.squint = 0;
    this.word = null;
    this.speakingUntil = 0;
    this.micLevel = 0;
    this.nod = 0; this.nodVel = 0;
    this.lastMouthKey = '';
    this.lastBrowKey = '';
    this.clock = new THREE.Timer();
    this.clock.connect(document);

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this._drawFace();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  _lights() {
    const s = this.scene;
    s.add(new THREE.HemisphereLight(0xfff0dd, 0x3a2218, 1.1));
    const key = new THREE.DirectionalLight(0xffe0c0, 2.6);
    key.position.set(-2.5, 3, 4.5); s.add(key);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 0.7);
    fill.position.set(3, 0.5, 3); s.add(fill);
    const rimWarm = new THREE.DirectionalLight(0xffa860, 2.2);
    rimWarm.position.set(3, 2.5, -3); s.add(rimWarm);
    const rimCool = new THREE.DirectionalLight(0xb48cff, 1.4);
    rimCool.position.set(-3.5, 1, -2.5); s.add(rimCool);
  }

  _build() {
    const root = new THREE.Group();
    this.scene.add(root);
    this.root = root;

    const skinMat = new THREE.MeshPhysicalMaterial({
      color: SKIN, roughness: 0.55, sheen: 0.7, sheenColor: new THREE.Color(0xff9c88), sheenRoughness: 0.45,
    });
    this.skinMat = skinMat;

    // corpo
    const body = new THREE.Group();
    root.add(body);
    this.body = body;
    const sweaterMat = new THREE.MeshPhysicalMaterial({ color: SWEATER, roughness: 0.85, sheen: 1, sheenColor: new THREE.Color(0x7fd6d0), sheenRoughness: 0.8 });
    // tronco com perfil de ombros (lathe)
    const prof = [];
    const P = [[0.0, 0.05], [0.4, 0.05], [0.72, -0.04], [1.08, -0.16], [1.34, -0.38], [1.45, -0.72], [1.47, -1.2], [1.47, -2.8]];
    for (const [r, y] of P) prof.push(new THREE.Vector2(r, y));
    const torsoGeo = new THREE.LatheGeometry(new THREE.SplineCurve(prof).getPoints(40), 64);
    const torso = new THREE.Mesh(torsoGeo, sweaterMat);
    torso.scale.set(1, 1, 0.62);
    torso.position.set(0, -1.24, -0.12);
    body.add(torso);
    this.torso = torso;
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 1.0, 32), skinMat);
    neck.position.set(0, -0.85, -0.12);
    body.add(neck);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.085, 16, 48), new THREE.MeshPhysicalMaterial({ color: SWEATER_DARK, roughness: 0.9, sheen: 1, sheenColor: new THREE.Color(0x7fd6d0) }));
    collar.scale.set(1, 0.85, 1);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, -1.2, -0.12);
    body.add(collar);
    // colar dourado com pingente de estrela
    const gold = new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.9, roughness: 0.25 });
    const chain = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.012, 8, 64, Math.PI * 0.62), gold);
    chain.rotation.set(Math.PI / 2 - 0.55, 0, Math.PI + Math.PI * 0.19);
    chain.position.set(0, -1.3, 0.02);
    body.add(chain);
    const star = new THREE.Mesh(this._starGeo(0.07, 0.03, 0.025), gold);
    star.position.set(0, -1.65, 0.3);
    star.rotation.x = -0.35;
    body.add(star);

    // cabeça
    const head = new THREE.Group();
    head.position.set(0, 0, 0);
    root.add(head);
    this.head = head;

    const headGeo = deformGeometry(new THREE.SphereGeometry(1, 96, 72), 1);
    head.add(new THREE.Mesh(headGeo, skinMat));

    // orelhas
    for (const s of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), skinMat);
      ear.scale.set(0.55, 1, 0.7);
      const p = surf(s * 0.97, -0.08, 0.98);
      ear.position.copy(p);
      ear.rotation.y = s * 0.3;
      head.add(ear);
    }

    // retalhos de rosto: base (blush/sardas), sobrancelhas, boca
    this.facePatch = makePatch(Math.acos(-0.05), 0.85, 1.05, 512, 512, 1.003);
    head.add(this.facePatch.mesh);
    this.browPatch = makePatch(Math.acos(0.33), 0.24, 0.8, 512, 192, 1.005);
    head.add(this.browPatch.mesh);
    this.mouthPatch = makePatch(Math.acos(-0.53), 0.3, 0.42, 384, 320, 1.005);
    head.add(this.mouthPatch.mesh);

    // nariz
    const noseMat = new THREE.MeshPhysicalMaterial({ color: SKIN_DARK, roughness: 0.5, sheen: 0.7, sheenColor: new THREE.Color(0xff9c88) });
    const np = surf(0, -0.19, 1.0);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.085, 32, 24), noseMat);
    nose.scale.set(1.0, 0.78, 0.85);
    nose.position.copy(np).add(new THREE.Vector3(0, 0, -0.035));
    head.add(nose);
    const bridge = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 16), skinMat);
    bridge.scale.set(0.8, 1.9, 0.7);
    bridge.position.copy(surf(0, -0.07, 1.0)).add(new THREE.Vector3(0, 0, -0.035));
    head.add(bridge);

    // olhos
    this.eyes = [];
    const eyeTex = eyeTexture();
    const eyeMat = new THREE.MeshStandardMaterial({ map: eyeTex, roughness: 0.12, metalness: 0 });
    const lidMat = new THREE.MeshPhysicalMaterial({ color: SKIN, roughness: 0.55, side: THREE.DoubleSide, sheen: 0.7, sheenColor: new THREE.Color(0xff9c88) });
    const lashMat = new THREE.MeshStandardMaterial({ color: 0x1a0d08, roughness: 0.6 });
    const EYE_R = 0.2;
    for (const s of [-1, 1]) {
      const g = new THREE.Group();
      const sp = surf(s * 0.335, -0.01, 1.0);
      const n = sp.clone().normalize();
      g.position.copy(sp).addScaledVector(n, -0.095);
      g.rotation.y = s * 0.06;
      head.add(g);
      const gazeG = new THREE.Group();
      g.add(gazeG);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(EYE_R, 48, 32), eyeMat);
      gazeG.add(ball);
      // pálpebra superior
      const upper = new THREE.Group();
      g.add(upper);
      const ul = new THREE.Mesh(new THREE.SphereGeometry(EYE_R * 1.03, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2 + 0.05), lidMat);
      upper.add(ul);
      const liner = new THREE.Mesh(new THREE.TorusGeometry(EYE_R * 1.035, 0.022, 8, 48, Math.PI), lashMat);
      liner.rotation.x = Math.PI / 2;
      liner.position.y = -0.008;
      upper.add(liner);
      // cílios no canto externo
      for (let k = 0; k < 3; k++) {
        const lash = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.07, 6), lashMat);
        const a = (s > 0 ? 0.12 : Math.PI - 0.12) + (s > 0 ? 1 : -1) * k * 0.2;
        lash.position.set(Math.cos(a) * EYE_R * 1.04, -0.005, Math.sin(a) * EYE_R * 1.06);
        lash.rotation.z = -s * (0.9 + k * 0.15);
        lash.rotation.x = 0.3;
        upper.add(lash);
      }
      // pálpebra inferior
      const lower = new THREE.Group();
      g.add(lower);
      const ll = new THREE.Mesh(new THREE.SphereGeometry(EYE_R * 1.012, 40, 16, 0, Math.PI * 2, Math.PI / 2 - 0.05, Math.PI / 2 + 0.05), lidMat);
      lower.add(ll);
      // reflexo fixo (catchlight)
      const cl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      cl.position.set(-0.05, 0.06, EYE_R * 0.985);
      g.add(cl);
      this.eyes.push({ g, gazeG, upper, lower, side: s });
    }

    // cabelo
    this._buildHair(head);
  }

  _starGeo(r1, r2, depth) {
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? r2 : r1, a = Math.PI / 2 + (i * Math.PI) / 5;
      const x = Math.cos(a) * r, y = Math.sin(a) * r;
      i ? shape.lineTo(x, y) : shape.moveTo(x, y);
    }
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 });
    g.center();
    return g;
  }

  // superfície de cabelo construída a partir de uma grade (u,v) -> (phi, theta)
  _hairSheet(mat, nu, nv, fn) {
    const geo = new THREE.PlaneGeometry(1, 1, nu, nv);
    const p = geo.attributes.position, uv = geo.attributes.uv;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      const u = uv.getX(i), v = 1 - uv.getY(i); // v=0 topo, v=1 ponta
      const { phi, theta, out } = fn(u, v);
      v3.set(-Math.cos(phi) * Math.sin(theta), Math.cos(theta), Math.sin(phi) * Math.sin(theta)).multiplyScalar(out);
      deformHead(v3);
      p.setXYZ(i, v3.x, v3.y, v3.z);
    }
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, mat);
  }

  _buildHair(head) {
    const tex = hairTexture();
    tex.repeat.set(6, 1);
    const hairMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, map: tex, roughness: 0.42, sheen: 1, sheenColor: new THREE.Color(0xd08050), sheenRoughness: 0.35,
      clearcoat: 0.25, clearcoatRoughness: 0.5, side: THREE.DoubleSide,
    });
    const hair = new THREE.Group();
    head.add(hair);
    this.hair = hair;
    const PI = Math.PI;

    // calota (topo da cabeça) inclinada para trás, deixando a testa livre
    const capGeo = new THREE.SphereGeometry(1, 96, 64, 0, PI * 2, 0, 1.78);
    capGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-0.8));
    deformGeometry(capGeo, 1.06);
    hair.add(new THREE.Mesh(capGeo, hairMat));

    // chanel: cortina contínua pelas laterais e nuca, abrindo um pouco na ponta
    const open = 0.92; // abertura do rosto (rad a partir da frente)
    hair.add(this._hairSheet(hairMat, 96, 40, (u, v) => {
      const phi = PI / 2 + open + u * (2 * PI - 2 * open);
      const side = Math.abs(Math.cos(phi - PI / 2)); // 1 nas laterais/frente, menor atrás
      const tip = 0.04 * Math.pow(Math.abs(Math.sin(u * PI * 22)), 3);
      const thetaEnd = 2.3 - 0.12 * (1 - side) + tip;
      const theta = 0.55 + v * (thetaEnd - 0.55);
      const out = 1.075 + 0.13 * Math.pow(v, 2.2) - 0.05 * Math.pow(v, 6);
      return { phi, theta, out };
    }));

    // franja lateral em uma peça, com pontas
    hair.add(this._hairSheet(hairMat, 80, 30, (u, v) => {
      const phi = PI / 2 - 1.12 + u * 2.24; // u=0 lado esquerdo da tela
      // linha inferior da franja (em y) — mais baixa à esquerda, risca à direita
      const part = 0.74;
      let yEdge;
      if (u < part) yEdge = 0.3 + 0.28 * Math.pow(u / part, 1.8);
      else yEdge = 0.6 - 0.1 * ((u - part) / (1 - part));
      const f = (u * 4.5) % 1;
      yEdge -= u < part ? 0.06 * Math.pow(Math.sin(f * PI), 2.5) : 0;
      // nas pontas laterais desce mais (moldura do rosto)
      yEdge -= 0.22 * Math.pow(Math.max(0, 0.18 - u) / 0.18, 1.5);
      const thetaEnd = Math.acos(Math.max(-0.95, Math.min(0.95, yEdge)));
      const theta = 0.12 + v * (thetaEnd - 0.12);
      const out = 1.075 + 0.035 * Math.sin(v * PI) + 0.01 * (1 - v);
      return { phi, theta, out };
    }));

    // presilha de estrela amarela
    const clipMat = new THREE.MeshPhysicalMaterial({ color: 0xffc83d, roughness: 0.3, clearcoat: 1 });
    const clip = new THREE.Mesh(this._starGeo(0.09, 0.04, 0.04), clipMat);
    const cp = surf(0.6, 0.62, 1.13);
    clip.position.copy(cp);
    clip.lookAt(cp.clone().multiplyScalar(2));
    clip.rotateZ(-0.3);
    hair.add(clip);
  }

  // ---------- desenho 2D dos detalhes do rosto ----------
  _drawFace() {
    const { ctx, canvas, toPx, unit, tex } = this.facePatch;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // blush
    for (const s of [-1, 1]) {
      const [x, y] = toPx(s * 0.48, -0.2);
      const r = unit(s * 0.48, -0.2, 0.36);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,110,105,0.42)');
      g.addColorStop(1, 'rgba(255,110,105,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.75, 0, 0, Math.PI * 2); ctx.fill();
    }
    // sardas
    const r = seeded(11);
    for (let i = 0; i < 34; i++) {
      const s = i % 2 ? 1 : -1;
      const fx = s * (0.12 + r() * 0.42), fy = -0.08 - r() * 0.2;
      const [x, y] = toPx(fx, fy);
      ctx.fillStyle = `rgba(150,78,45,${0.25 + r() * 0.25})`;
      ctx.beginPath(); ctx.arc(x, y, 1.2 + r() * 1.6, 0, Math.PI * 2); ctx.fill();
    }
    // sombra suave sob o lábio inferior / queixo
    const [cx, cy] = toPx(0, -0.66);
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, unit(0, -0.66, 0.3));
    cg.addColorStop(0, 'rgba(200,120,100,0.18)');
    cg.addColorStop(1, 'rgba(200,120,100,0)');
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(cx, cy, unit(0, -0.66, 0.3), 0, Math.PI * 2); ctx.fill();
    tex.needsUpdate = true;
  }

  _drawBrows() {
    const b = this.brow;
    const key = `${b.raise.toFixed(3)}|${b.frown.toFixed(3)}|${b.asym.toFixed(3)}`;
    if (key === this.lastBrowKey) return;
    this.lastBrowKey = key;
    const { ctx, canvas, toPx, tex } = this.browPatch;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of [-1, 1]) {
      const raise = b.raise + b.asym * s * 0.5;
      const dy = raise * 0.05;
      const innerDy = dy - b.frown * 0.04 + raise * 0.01;
      const pts = [
        [s * 0.15, 0.315 + innerDy],
        [s * 0.3, 0.375 + dy],
        [s * 0.46, 0.345 + dy * 0.8],
      ].map(([x, y]) => toPx(x, y));
      // forma afinada (grossa no começo, fina no fim)
      const thick0 = 15, thick1 = 5;
      const top = [], bot = [];
      const N = 16;
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const x = (1 - t) * (1 - t) * pts[0][0] + 2 * (1 - t) * t * pts[1][0] + t * t * pts[2][0];
        const y = (1 - t) * (1 - t) * pts[0][1] + 2 * (1 - t) * t * pts[1][1] + t * t * pts[2][1];
        const th = lerp(thick0, thick1, t) * (1 - 0.3 * t * t);
        top.push([x, y - th / 2]); bot.push([x, y + th / 2]);
      }
      ctx.fillStyle = '#4b2415';
      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (const p of top) ctx.lineTo(p[0], p[1]);
      for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]);
      ctx.closePath();
      ctx.fill();
    }
    tex.needsUpdate = true;
  }

  _drawMouth() {
    const m = this.mouth;
    const key = `${m.open.toFixed(3)}|${m.wide.toFixed(3)}|${m.round.toFixed(3)}|${m.smile.toFixed(3)}`;
    if (key === this.lastMouthKey) return;
    this.lastMouthKey = key;
    const { ctx, canvas, toPx, unit, tex } = this.mouthPatch;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const [cx, cy0] = toPx(0, -0.47);
    const u = unit(0, -0.47, 1); // px por unidade
    const hw = u * 0.155 * (1 + 0.22 * m.wide - 0.38 * m.round + 0.12 * m.smile);
    const openH = u * 0.3 * m.open;
    const lift = u * 0.035 * m.smile;
    const cy = cy0;
    const L = [cx - hw, cy - lift], R = [cx + hw, cy - lift];

    if (m.open < 0.05) {
      // boca fechada: linha com sorriso + lábio inferior
      const dip = u * 0.03 * m.smile + 2;
      ctx.strokeStyle = '#9a3f47'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(L[0], L[1]);
      ctx.bezierCurveTo(cx - hw * 0.4, cy + dip, cx + hw * 0.4, cy + dip, R[0], R[1]);
      ctx.stroke();
      // lábio inferior
      const lg = ctx.createRadialGradient(cx, cy + dip + 9, 1, cx, cy + dip + 9, hw * 0.7);
      lg.addColorStop(0, 'rgba(214,105,110,0.75)'); lg.addColorStop(1, 'rgba(214,105,110,0)');
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.ellipse(cx, cy + dip + 8, hw * 0.62, 9, 0, 0, Math.PI * 2); ctx.fill();
      // lábio superior suave
      const ug = ctx.createRadialGradient(cx, cy - 5, 1, cx, cy - 5, hw * 0.6);
      ug.addColorStop(0, 'rgba(200,95,100,0.45)'); ug.addColorStop(1, 'rgba(200,95,100,0)');
      ctx.fillStyle = ug;
      ctx.beginPath(); ctx.ellipse(cx, cy - 5, hw * 0.55, 6, 0, 0, Math.PI * 2); ctx.fill();
      tex.needsUpdate = true;
      return;
    }

    const upY = cy - openH * 0.38 - lift * 0.2 + u * 0.012 * m.smile;
    const loY = cy + openH * 1.0 + u * 0.02 * m.smile;
    const roundPull = m.round * hw * 0.35;
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(L[0], L[1]);
      ctx.bezierCurveTo(cx - hw * 0.55 + roundPull * 0.3, upY, cx + hw * 0.55 - roundPull * 0.3, upY, R[0], R[1]);
      ctx.bezierCurveTo(cx + hw * 0.8 - roundPull, loY, cx - hw * 0.8 + roundPull, loY, L[0], L[1]);
      ctx.closePath();
    };
    // interior
    path();
    const ig = ctx.createLinearGradient(0, upY, 0, loY);
    ig.addColorStop(0, '#3a0f14'); ig.addColorStop(1, '#6b2128');
    ctx.fillStyle = ig; ctx.fill();
    ctx.save();
    path(); ctx.clip();
    // dentes superiores
    ctx.fillStyle = '#fbf6ef';
    const teethH = Math.max(6, Math.min(openH * 0.3, 20));
    ctx.beginPath();
    ctx.ellipse(cx, upY + teethH * 0.15, hw * 0.78, teethH, 0, 0, Math.PI * 2);
    ctx.fill();
    // língua
    if (m.open > 0.25) {
      ctx.fillStyle = '#d4646c';
      ctx.beginPath();
      ctx.ellipse(cx, loY - 2, hw * 0.55, openH * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    // lábios
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeStyle = '#c4626a'; ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(L[0], L[1]);
    ctx.bezierCurveTo(cx - hw * 0.55 + roundPull * 0.3, upY - 3, cx + hw * 0.55 - roundPull * 0.3, upY - 3, R[0], R[1]);
    ctx.stroke();
    ctx.strokeStyle = '#cf6c73'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(L[0] + 3, L[1] + 1);
    ctx.bezierCurveTo(cx - hw * 0.8 + roundPull, loY + 4, cx + hw * 0.8 - roundPull, loY + 4, R[0] - 3, R[1] + 1);
    ctx.stroke();
    // brilho no lábio inferior
    ctx.strokeStyle = 'rgba(255,210,210,0.45)'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - hw * 0.25, loY + 5); ctx.lineTo(cx + hw * 0.15, loY + 5);
    ctx.stroke();
    tex.needsUpdate = true;
  }

  // ---------- API pública ----------
  setMode(mode) { this.mode = mode; }
  setMood(mood) { this.mood = mood || 'neutral'; this.moodUntil = performance.now() + 4000; }
  setMicLevel(v) { this.micLevel = clamp(v, 0, 1); }
  nodOnce(strength = 1) { this.nodVel += 0.9 * strength; }

  // fala uma palavra durante `ms` milissegundos (sincronia labial)
  speakWord(word, ms) {
    const w = (word || '').toLowerCase().replace(/[^a-záàâãéêíóôõúç']/g, '');
    const seq = [];
    for (let i = 0; i < w.length; i++) {
      const v = letterViseme(w[i], w[i + 1]);
      if (v && seq[seq.length - 1] !== v) seq.push(v);
    }
    if (!seq.length) seq.push(VIS.c);
    seq.push(VIS.rest);
    const now = performance.now();
    this.word = { seq, start: now, dur: Math.max(120, ms) };
    this.speakingUntil = now + ms + 250;
    if (Math.random() < 0.18) this.browTarget.raise = 0.35 + Math.random() * 0.3;
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    const t = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const wantW = 2.75, wantH = 3.7;
    const d = Math.max(wantW / (t * aspect), wantH / t);
    const lookY = -0.38;
    this.camera.position.set(0, lookY + 0.25, d);
    this.camera.lookAt(0, lookY, 0);
    this.camera.updateProjectionMatrix();
  }

  _loop() {
    requestAnimationFrame(this._loop);
    this.clock.update();
    const dt = Math.min(0.05, this.clock.getDelta());
    const t = this.clock.getElapsed();
    const now = performance.now();
    this._update(dt, t, now);
    this.renderer.render(this.scene, this.camera);
  }

  _update(dt, t, now) {
    const mode = this.mode;
    const k = 1 - Math.pow(0.0005, dt); // suavização independente de FPS

    // humor base
    let mood = this.mood;
    if (this.moodUntil && now > this.moodUntil && mood !== 'neutral') mood = this.mood = 'neutral';
    let baseSmile = 0.4, browRaise = 0, browFrown = 0, browAsym = 0, squint = 0;
    if (mood === 'happy') { baseSmile = 0.95; browRaise = 0.3; squint = 0.6; }
    else if (mood === 'surprised') { baseSmile = 0.25; browRaise = 0.9; }
    else if (mood === 'thinking') { baseSmile = 0.15; browAsym = 0.6; browFrown = 0.2; }
    else if (mood === 'sad') { baseSmile = 0; browFrown = -0.6; browRaise = 0.2; }
    if (mode === 'listening') { browRaise += 0.15; baseSmile = Math.max(baseSmile, 0.5); }
    if (mode === 'thinking') { browAsym = 0.55; baseSmile = 0.2; }

    // boca
    const speaking = now < this.speakingUntil || mode === 'speaking';
    let tgt = { open: 0, wide: 0, round: 0, smile: baseSmile };
    if (this.word && now < this.word.start + this.word.dur + 200) {
      const { seq, start, dur } = this.word;
      const p = clamp((now - start) / dur, 0, 0.999);
      const v = seq[Math.floor(p * seq.length)];
      tgt = { open: v.open * (0.85 + 0.15 * Math.sin(t * 20)), wide: v.wide, round: v.round, smile: baseSmile * 0.55 };
    } else if (speaking && mode === 'speaking' && !this.word) {
      const o = Math.abs(Math.sin(t * 10.5)) * (0.4 + 0.3 * Math.sin(t * 3.1));
      tgt = { open: o, wide: 0.3 * Math.sin(t * 4.7), round: 0.2 * Math.max(0, Math.sin(t * 2.3)), smile: baseSmile * 0.6 };
    }
    if (this.word && now > this.word.start + this.word.dur + 200) this.word = null;
    const mk = speaking ? 1 - Math.pow(0.00002, dt) : k;
    for (const key of ['open', 'wide', 'round', 'smile']) this.mouth[key] = lerp(this.mouth[key], tgt[key], mk);
    if (this.mouth.open < 0.02) this.mouth.open = 0;
    this._drawMouth();

    // sobrancelhas
    this.browTarget.raise = lerp(this.browTarget.raise, browRaise, 1 - Math.pow(0.2, dt));
    const bt = { raise: this.browTarget.raise, frown: browFrown, asym: browAsym };
    for (const key of ['raise', 'frown', 'asym']) {
      this.brow[key] = lerp(this.brow[key], bt[key], k);
      this.brow[key] = Math.round(this.brow[key] * 200) / 200;
    }
    this._drawBrows();

    // olhar
    if (t > this.nextSaccade) {
      if (mode === 'thinking') this.gazeTarget.set(0.45 + Math.random() * 0.2, 0.55 + Math.random() * 0.15);
      else if (Math.random() < 0.75) this.gazeTarget.set((Math.random() - 0.5) * 0.18, (Math.random() - 0.5) * 0.12);
      else this.gazeTarget.set((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.35);
      this.nextSaccade = t + 0.6 + Math.random() * 2.2;
    }
    this.gaze.lerp(this.gazeTarget, 1 - Math.pow(1e-6, dt));

    // piscar
    if (this.blinkT < 0 && t > this.nextBlink) { this.blinkT = 0; }
    if (this.blinkT >= 0) {
      this.blinkT += dt;
      const d = 0.17;
      const p = this.blinkT / d;
      this.blink = p < 0.5 ? p * 2 : Math.max(0, 2 - p * 2);
      if (p >= 1) {
        this.blinkT = -1; this.blink = 0;
        if (!this.doubleBlink && Math.random() < 0.2) { this.doubleBlink = true; this.nextBlink = t + 0.12; }
        else { this.doubleBlink = false; this.nextBlink = t + 1.8 + Math.random() * 3.5; }
      }
    }
    this.squint = lerp(this.squint, squint, k);
    for (const e of this.eyes) {
      e.gazeG.rotation.y = this.gaze.x * 0.38;
      e.gazeG.rotation.x = -this.gaze.y * 0.3;
      const open = -0.5 + this.gaze.y * 0.25 + this.squint * 0.12;
      const closed = 0.68;
      e.upper.rotation.x = lerp(open, closed, this.blink);
      e.lower.rotation.x = 0.68 - this.squint * 0.25 + this.blink * 0.05;
    }

    // cabeça e corpo
    this.nodVel += -this.nod * 60 * dt - this.nodVel * 8 * dt;
    this.nod += this.nodVel * dt;
    if (mode === 'listening' && this.micLevel > 0.35 && Math.random() < dt * 0.8) this.nodOnce(0.5);
    const talk = speaking ? 1 : 0;
    const tilt = mode === 'listening' ? 0.07 : mode === 'thinking' ? -0.05 : 0;
    this.head.rotation.y = 0.07 * Math.sin(t * 0.45) + 0.03 * Math.sin(t * 1.3) + talk * 0.04 * Math.sin(t * 2.1);
    this.head.rotation.x = 0.03 * Math.sin(t * 0.7) + this.nod * 0.12 + talk * 0.025 * Math.sin(t * 3.3) + (mode === 'thinking' ? -0.06 : 0);
    this.head.rotation.z = lerp(this.head.rotation.z, tilt + 0.025 * Math.sin(t * 0.37), k * 0.5);
    this.head.position.y = 0.012 * Math.sin(t * 1.6);
    this.torso.scale.y = 1.0 + 0.012 * Math.sin(t * 1.6);
    this.body.rotation.y = this.head.rotation.y * 0.3;
  }
}
