/* ============================================================
   BATTLE.JS — Cinematic intro + battle timer + HP logic
   ============================================================ */

let battleTimer = null;
let bSecs = 600;

/* ── UPDATE TIMER DISPLAY ── */
function updateBTimer() {
  const m = Math.floor(bSecs / 60);
  const s = bSecs % 60;
  const el = document.getElementById('bTimer');
  if (el) el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/* ── CREATE SPARK PARTICLES ── */
function createSparks() {
  const container = document.getElementById('biSparks');
  if (!container) return;
  container.innerHTML = '';
  const COLORS = ['#ffd60a','#ff3cac','#3dff9a','#ffffff','#3cacff'];
  for (let i = 0; i < 32; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * 220 + 80;
    s.style.cssText = `
      left:50%;top:50%;
      width:${Math.random() * 8 + 3}px;
      height:${Math.random() * 8 + 3}px;
      background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
      --sx:${Math.cos(angle) * dist}px;
      --sy:${Math.sin(angle) * dist}px;
      animation-delay:${Math.random() * 0.15}s;
    `;
    container.appendChild(s);
  }
}

/* ── CINEMATIC INTRO SEQUENCE ── */
function runBattleIntro() {
  const intro  = document.getElementById('battle-intro');
  const p1     = document.getElementById('bip1');
  const p2     = document.getElementById('bip2');
  const center = document.getElementById('biCenter');
  const hp2    = document.getElementById('hp2');

  if (!intro) return;

  // Reset state
  intro.classList.remove('hidden');
  p1.classList.remove('in');
  p2.classList.remove('in');
  center.innerHTML = '<div class="bi-vs">VS</div>';
  bSecs = 600;
  updateBTimer();
  if (hp2) hp2.style.width = '100%';
  const hp1el = document.getElementById('hp1');
  if (hp1el) hp1el.style.width = '100%';

  // Step 1 — players slide in
  setTimeout(() => { p1.classList.add('in'); }, 200);
  setTimeout(() => { p2.classList.add('in'); }, 500);

  // Step 2 — sparks clash + screen flash
  setTimeout(() => {
    createSparks();
    const flash = document.createElement('div');
    flash.className = 'bi-flash';
    intro.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  }, 1300);

  // Step 3 — countdown
  [3, 2, 1].forEach((n, i) => {
    setTimeout(() => {
      center.innerHTML = `<div class="bi-cd">${n}</div>`;
    }, 1600 + i * 900);
  });

  // Step 4 — FIGHT!
  setTimeout(() => {
    center.innerHTML = '<div class="bi-fight">FIGHT!</div>';
  }, 4500);

  // Step 5 — hide intro, start match
  setTimeout(() => {
    intro.classList.add('hidden');
    p1.classList.remove('in');
    p2.classList.remove('in');

    // Start battle countdown
    if (battleTimer) clearInterval(battleTimer);
    battleTimer = setInterval(() => {
      if (bSecs > 0) {
        bSecs--;
        updateBTimer();
      } else {
        clearInterval(battleTimer);
        const statusEl = document.getElementById('bStatus');
        if (statusEl) statusEl.textContent = 'TIME UP!';
      }
    }, 1000);

    // Drain P2 HP after 1s (they're less efficient)
    setTimeout(() => {
      if (hp2) hp2.style.width = '52%';
    }, 1000);

  }, 5200);
}

/* ── REMATCH ── */
function replayBattle() {
  const hp1 = document.getElementById('hp1');
  const hp2 = document.getElementById('hp2');
  if (hp1) hp1.style.width = '100%';
  if (hp2) hp2.style.width = '100%';
  const statusEl = document.getElementById('bStatus');
  if (statusEl) statusEl.textContent = 'FIGHT!';
  runBattleIntro();
}

/* ── AUTO-RUN ON LOAD ── */
window.addEventListener('load', () => {
  runBattleIntro();
});
