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

/* ── FOOLPROOF AUTHENTICATION SYSTEM & PROFILE ROUTING ── */
document.addEventListener('DOMContentLoaded', () => {
  
  function updateNavState() {
    const currentUser = localStorage.getItem('vdsa_user');
    // We target both the generic button and the specific a-tag in the profile
    const navLoginBtns = document.querySelectorAll('.nav-cta .px-btn-o, #navAuthBtn');
    
    navLoginBtns.forEach(btn => {
      if (currentUser) {
        btn.textContent = `[ ${currentUser} ]`;
        btn.style.color = 'var(--green)';
        btn.style.borderColor = 'var(--green)';
        // When logged in, click to go to profile
        btn.onclick = (e) => {
          e.preventDefault();
          const isInPagesFolder = window.location.pathname.includes('/pages/');
          window.location.href = isInPagesFolder ? 'profile.html' : 'pages/profile.html';
        };
      } else {
        btn.textContent = 'LOGIN / SIGNUP';
        btn.style.color = ''; 
        btn.style.borderColor = ''; 
        // When logged out, click to open modal
        btn.onclick = (e) => {
          e.preventDefault();
          const modal = document.getElementById('authModal');
          if (modal) {
            modal.classList.remove('hidden');
          } else {
            alert("Oops! The Auth Modal HTML is missing from this file.");
          }
        };
      }
    });
  }

  // ── MODAL INTERACTIONS (Using Event Delegation) ──
  // This guarantees clicks are registered even if the HTML loads late
  document.body.addEventListener('click', (e) => {
    
    // 1. Close Button
    if (e.target.closest('#closeAuth')) {
      const modal = document.getElementById('authModal');
      if(modal) modal.classList.add('hidden');
    }
    
    // 2. Submit Button (Initialize)
    if (e.target.closest('#authSubmit')) {
      const authUsername = document.getElementById('authUsername');
      const userVal = authUsername ? authUsername.value.trim().toUpperCase() : '';
      if (userVal) {
        localStorage.setItem('vdsa_user', userVal);
        const modal = document.getElementById('authModal');
        if(modal) modal.classList.add('hidden');
        updateNavState();
      }
    }

    // 3. Tab Switching
    if (e.target.closest('#tabRegister')) {
      e.target.closest('#tabRegister').classList.add('active');
      document.getElementById('tabLogin').classList.remove('active');
      document.getElementById('authSubmit').innerHTML = 'REGISTER ▶';
    }
    if (e.target.closest('#tabLogin')) {
      e.target.closest('#tabLogin').classList.add('active');
      document.getElementById('tabRegister').classList.remove('active');
      document.getElementById('authSubmit').innerHTML = 'INITIALIZE ▶';
    }

    // 4. Logout Button (On Profile Page)
    if (e.target.closest('#logoutBtn')) {
      localStorage.removeItem('vdsa_user');
      const isInPagesFolder = window.location.pathname.includes('/pages/');
      window.location.href = isInPagesFolder ? '../index.html' : 'index.html';
    }
  });

  // ── PROFILE PAGE POPULATION ──
  const profileNameEl = document.getElementById('profileName');
  if (profileNameEl) {
    const currentUser = localStorage.getItem('vdsa_user');
    if (currentUser) {
      profileNameEl.textContent = currentUser;
    } else {
      // Boot them to the homepage if they access the profile while logged out
      const isInPagesFolder = window.location.pathname.includes('/pages/');
      window.location.href = isInPagesFolder ? '../index.html' : 'index.html';
    }
  }

  // Run once on page load to set correct button state
  updateNavState();
});