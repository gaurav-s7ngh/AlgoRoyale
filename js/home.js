/* ============================================================
   HOME.JS — Homepage binary search viz + tree viz
   ============================================================ */

/* ── BINARY SEARCH VIZ ── */
const ARR = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72];
const TGT = 23;

let hSteps = [], hIdx = 0, hPaused = false;

(function computeSteps() {
  let lo = 0, hi = ARR.length - 1;
  while (lo <= hi) {
    const mi = Math.floor((lo + hi) / 2);
    hSteps.push({ lo, hi, mi, found: ARR[mi] === TGT });
    if (ARR[mi] === TGT) break;
    else if (ARR[mi] < TGT) lo = mi + 1;
    else hi = mi - 1;
  }
})();

const STEP_MSGS = [
  'INIT: low=0, high=9',
  'MID=4 (16) < 23 → RIGHT',
  'MID=7 (45) > 23 → LEFT',
  'MID=5 (23) ✓ FOUND!'
];

function renderHomeArr(lo, hi, mi, found) {
  const row = document.getElementById('homeArr');
  if (!row) return;
  row.innerHTML = '';

  ARR.forEach((v, i) => {
    const c = document.createElement('div'); c.className = 'ac';
    const b = document.createElement('div'); b.className = 'ab';
    if (i === lo) b.classList.add('lo');
    if (i === hi) b.classList.add('hi');
    if (i === mi) b.classList.add(found ? 'fd' : 'mi');
    b.textContent = v;

    const ix = document.createElement('div'); ix.className = 'aidx'; ix.textContent = i;
    const tg = document.createElement('div'); tg.className = 'atag';
    if (i === lo) { tg.textContent = 'L'; tg.classList.add('tl'); }
    if (i === hi) { tg.textContent = 'H'; tg.classList.add('th'); }
    if (i === mi) { tg.textContent = 'M'; tg.classList.add('tm'); }

    c.appendChild(b); c.appendChild(ix); c.appendChild(tg);
    row.appendChild(c);
  });

  const idx = hSteps.findIndex(s => s.lo === lo && s.mi === mi);
  const el  = document.getElementById('homeStep');
  if (el) el.innerHTML = `STEP ${idx+1}/${hSteps.length} — <span>${STEP_MSGS[Math.min(idx, STEP_MSGS.length-1)]}</span>`;
}

function hNext() {
  if (!hPaused) {
    const s = hSteps[hIdx % hSteps.length];
    renderHomeArr(s.lo, s.hi, s.mi, s.found);
    hIdx++;
    if (hIdx >= hSteps.length) setTimeout(() => { hIdx = 0; }, 2200);
  }
}

hNext();
const hInt = setInterval(hNext, 2000);

const homePauseBtn = document.getElementById('homePause');
const homeResetBtn = document.getElementById('homeReset');
if (homePauseBtn) homePauseBtn.addEventListener('click', () => {
  hPaused = !hPaused;
  homePauseBtn.textContent = hPaused ? '▶' : '⏸';
});
if (homeResetBtn) homeResetBtn.addEventListener('click', () => {
  hIdx = 0; hPaused = false; hNext();
});

/* ── TREE TRAVERSAL VIZ ── */
const TREE_ORDER = [['ht-4'],['ht-2'],['ht-5'],['ht-1'],['ht-3'],['ht-6']];
let tIdx = 0;
const vis = new Set();

function nextTree() {
  document.querySelectorAll('.tn').forEach(n => n.classList.remove('active'));
  const ids = TREE_ORDER[tIdx % TREE_ORDER.length];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.add('active'); vis.add(id); }
  });
  tIdx++;
  if (tIdx >= TREE_ORDER.length) {
    setTimeout(() => {
      tIdx = 0; vis.clear();
      document.querySelectorAll('.tn').forEach(n => n.classList.remove('active','visited'));
    }, 1800);
  }
  document.querySelectorAll('.tn').forEach(n => {
    if (vis.has(n.id) && !n.classList.contains('active')) n.classList.add('visited');
  });
}

nextTree();
setInterval(nextTree, 950);
