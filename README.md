# VisualDSA — Built Different

A pixelated, retro-game styled algorithm visualization and battle platform.

## Project Structure

```
visualdsa-project/
├── index.html              ← Home page
├── pages/
│   ├── battle.html         ← 1v1 Battle Arena page
│   └── learn.html          ← Step-by-step Learning page
├── css/
│   ├── base.css            ← Shared styles (nav, buttons, tokens, cursor)
│   ├── home.css            ← Homepage-specific styles
│   ├── battle.css          ← Battle page styles
│   └── learn.css           ← Learning page styles
├── js/
│   ├── base.js             ← Shared JS (cursor, starfield, sparks, reveal)
│   ├── home.js             ← Homepage binary search + tree viz
│   ├── battle.js           ← Cinematic intro + timer + HP logic
│   └── learn.js            ← Full algorithm data + step engine + AI assistant
└── README.md
```

## How to Run

1. Open the project folder in VS Code
2. Install the **Live Server** extension (if not already installed)
3. Right-click `index.html` → **Open with Live Server**
4. Navigate using the navbar links

> No build step. No npm install. Pure HTML/CSS/JS — open and it works.

## Pages

### 🏠 Home (index.html)
- Live binary search visualization with step-by-step animation
- Tree traversal animation
- Feature cards, leaderboard, CTA

### ⚔ Battle (pages/battle.html)
- **Cinematic Tekken-style intro** — players slide in, countdown, FIGHT!
- HP bars tracking efficiency
- Side-by-side code comparison (P1: Binary Search O(log n) vs P2: Linear Search O(n))
- **Winner Summary** — headline explaining why P1 wins
- **Comparison Matrix** — every metric side by side
- **Critical Line Impact** — the exact lines of code that decided the battle
- Live execution trace showing each player's steps
- Performance analysis text

### 📖 Learn (pages/learn.html)
- 4 algorithms: Binary Search, Bubble Sort, Factorial (Recursion), Linear Search
- **Concept Overview** — what it does, when to use it, tags
- Line-by-line code highlighting as steps play
- **Dual explanation** — Mechanical (what happened) + Conceptual (why it matters)
- **Memory State** — all variables in real time
- **Call Stack** — critical for understanding recursion
- **Array Visualization** — animated L/M/H pointers
- **Play/Pause/Prev/Next** controls + speed selector
- **Improvement Block** — naive approach vs optimized approach
- **Common Mistakes** — 3 per algorithm
- **AI Doubt Assistant** — keyword-triggered answers about each algorithm

## Design System

- **Font:** Press Start 2P (headings) + VT323 (body) — retro pixel aesthetic
- **Pixel buttons** — clip-path corners, inset shadows, 3D press effect
- **Scanlines** — CSS repeating-linear-gradient overlay
- **CRT vignette** — radial-gradient darkening edges
- **Pixel starfield** — canvas-drawn square stars + shooting star trails
- **Click sparks** — pixel particle burst on every click

## Algorithms Covered

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space |
|-----------|-------------|------------|--------------|-------|
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Factorial (Recursion) | O(n) | O(n) | O(n) | O(n) |

---

*Made with 8-bit love. © 2025 VisualDSA*
