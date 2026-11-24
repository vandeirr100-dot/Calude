import { Avatar } from '../src/avatar.js';
const prof = new URLSearchParams(location.search).get('p') || 'lia';
const a = new Avatar(document.getElementById('c'), prof);
a.nextBlink = 1e9;
window.av = a;
