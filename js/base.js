/* ============================================================
   BASE.JS — Shared across all pages
   ============================================================ */

/* ── CURSOR ── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});
(function animR() {
  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(animR);
})();

/* ── PIXEL STARFIELD ── */
const bgC  = document.getElementById('bgC');
const bctx = bgC.getContext('2d');

function resizeBG() {
  bgC.width  = window.innerWidth;
  bgC.height = window.innerHeight;
}
resizeBG();
window.addEventListener('resize', resizeBG);

const STAR_COLORS = ['#3dff9a','#3cacff','#a259ff','#ffd60a','#f0eeff'];
const stars = Array.from({ length: 220 }, () => ({
  x:  Math.random() * window.innerWidth,
  y:  Math.random() * window.innerHeight,
  sz: Math.random() < .7 ? 2 : 4,
  a:  Math.random() * Math.PI * 2,
  sp: Math.random() * .005 + .001,
  c:  STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
}));

const shooters = [];
function addShooter() {
  shooters.push({
    x: Math.random() * window.innerWidth * .7 + 100,
    y: Math.random() * 150,
    vx: Math.random() * 5 + 4,
    vy: Math.random() * 2.5 + 1,
    life: 1
  });
}
setInterval(addShooter, 2600);

(function drawBG() {
  bctx.clearRect(0, 0, bgC.width, bgC.height);

  stars.forEach(s => {
    s.a += s.sp;
    bctx.globalAlpha = .22 + Math.sin(s.a) * .18;
    bctx.fillStyle = s.c;
    bctx.fillRect(Math.round(s.x), Math.round(s.y), s.sz, s.sz);
  });

  for (let i = shooters.length - 1; i >= 0; i--) {
    const s = shooters[i];
    for (let t = 0; t < 12; t++) {
      bctx.fillStyle = '#3dff9a';
      bctx.globalAlpha = s.life * (1 - t / 12) * .7;
      bctx.fillRect(Math.round(s.x - s.vx * t), Math.round(s.y - s.vy * t), 2, 2);
    }
    s.x += s.vx; s.y += s.vy; s.life -= .022;
    if (s.life <= 0) shooters.splice(i, 1);
  }

  bctx.globalAlpha = 1;
  requestAnimationFrame(drawBG);
})();

/* ── SCROLL REVEAL ── */
const revEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
  { threshold: .1 }
);
revEls.forEach(el => ro.observe(el));

/* ── PIXEL CLICK SPARKS ── */
const SPARK_COLORS = ['#3dff9a','#ffd60a','#ff3cac','#3cacff'];
document.addEventListener('click', e => {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * 60 + 20;
    p.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:4px;height:4px;
      background:${SPARK_COLORS[Math.floor(Math.random() * 4)]};
      pointer-events:none;z-index:9995;
      image-rendering:pixelated;
      transition:all .4s steps(6);
    `;
    document.body.appendChild(p);
    setTimeout(() => {
      p.style.left    = `${e.clientX + Math.cos(angle) * dist}px`;
      p.style.top     = `${e.clientY + Math.sin(angle) * dist}px`;
      p.style.opacity = '0';
    }, 10);
    setTimeout(() => p.remove(), 500);
  }
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.style.background = window.scrollY > 50 ? 'rgba(6,5,15,.98)' : 'rgba(6,5,15,.94)';
});
