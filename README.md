# type practice

A lightweight, Monkeytype-style typing trainer rendered on **HTML5 Canvas**.  
No frameworks. No build step. Just open the file and type.  
**This project is also Vibe Code.**

---

## Live demo
`https://typepracticegame.vercel.app/?w=50&t=90`

> URL params:
> - `w` = word target (e.g. `50`)
> - `t` = timer seconds (`15`, `30`, `60`, `90`)

---

## Features
- **Canvas renderer** with fixed cell grid (monospace) for crisp spacing.
- **Word wrapping at spaces** with **first-word alignment** (no leading indent).
- **Correct WPM**: `(correct_chars / 5) / elapsed_minutes` from *first keystroke*.
- Raw WPM, Accuracy, simple **WPM-over-time chart**.
- **Timer selector**: 15 / 30 / 60 / 90 (30s default).
- **Colors**: correct = green, wrong = red, pending = muted.
- **Paste your own text** overlay.
- **Results screen** (full page) with actions: repeat / next / use my text.
- **Focus recovery** after tab switch.

---

## Quick start (local)
1. Clone or download this repo.
2. Open `index.html` in a modern browser (Chrome / Edge / Firefox / Safari).
3. Start typing — the timer starts on the first keystroke.

> Tip: If your browser blocks local fonts or you want a URL bar, serve it:
> ```bash
> python -m http.server 5173
> # then open http://localhost:5173
> ```

## File structure

```
index.html  - main HTML entry point
styles.css  - presentation styles
main.js     - application logic
```

---

## Deploy on Vercel
Already live here: `https://typepracticegame.vercel.app/?w=50&t=90`

If you want to deploy your own:
1. Push this repo to GitHub.
2. In Vercel, **New Project** → import the repo.
3. Framework preset: **Other** (no build).
4. Build command: **None**.
5. Output directory: **/** (root).
6. Click **Deploy**.

Optional `vercel.json` (not required, but nice to have):
```json
{
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
