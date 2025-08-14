# Type Practice Game

A lightweight Monkeytype-style typing trainer rendered on **HTML5 Canvas**. It runs entirely in the browser: no frameworks, no build tools—just open the `index.html` file.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Demo

Live example: [typepracticegame.vercel.app](https://typepracticegame.vercel.app/?w=50&t=90)

URL parameters:

- `w` – target word count (e.g. `50`)
- `t` – timer length in seconds (`15`, `30`, `60`, `90`)

## Features

- Canvas renderer with fixed cell grid for crisp monospace layout.
- Word wrapping at spaces with first-word alignment (no leading indent).
- Correct WPM: `(correct_chars / 5) / elapsed_minutes` starting from the first keystroke.
- Raw WPM, Accuracy, and a WPM-over-time chart.
- Timer selector: 15 / 30 / 60 / 90 seconds (30s default).
- Color feedback: green for correct, red for wrong, muted for pending.
- Paste your own text overlay.
- Results screen with actions: repeat / next / use my text.
- Focus recovery after tab switch.

## Quick Start

1. Clone or download this repository.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).
3. Start typing—the timer begins on the first key press.

> **Tip:** To serve the files locally with a URL bar:
>
> ```bash
> python -m http.server 5173
> # then open http://localhost:5173
> ```

## Configuration

The app can be customized at runtime:

- Use on-screen controls to change timer length or word target.
- Press **Use my text** to practice with a custom snippet.
- URL parameters `w` and `t` also adjust the word goal and timer.

## File Structure

```
index.html  - main HTML entry point
styles.css  - presentation styles
main.js     - application logic
```

## Deployment

The app is already live at [typepracticegame.vercel.app](https://typepracticegame.vercel.app/?w=50&t=90).

To deploy your own copy on Vercel:

1. Push this repository to GitHub.
2. In Vercel, choose **New Project** → import the repo.
3. Framework preset: **Other** (no build).
4. Build command: **None**.
5. Output directory: `/` (root).
6. Click **Deploy**.

Optional `vercel.json` (not required but nice to have):

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
```

## Contributing

Issues and pull requests are welcome. Please keep the project lightweight and framework-free.

## License

No license has been specified. If you plan to use this code, please contact the author.

