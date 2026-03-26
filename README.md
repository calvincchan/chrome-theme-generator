# ChromaShift Theme Creator

Create custom Chrome/Brave themes from a single colour, preview them in a live simulator, and download a ready-to-install theme package — all from a webpage, no extension required.

Repository: https://github.com/calvincchan/chrome-theme-generator

## Why This Project Exists

Making a custom browser theme should be quick:

- Pick a colour
- See a live preview
- Download a theme package
- Install it in your browser

## Features

- Live browser-chrome simulator with real-time preview
- One-click Material-style colour palette
- Manual colour picker with hex input for exact values
- Auto-contrast text handling based on luminance
- Theme name input with filename-safe sanitization
- One-click ZIP export containing a valid theme `manifest.json`
- Remembers your last selected colour via localStorage

## Browser Support

Tested/targeted browsers:

- Google Chrome
- Brave

Because Brave is Chromium-based, behaviour should be similar to Chrome.

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/calvincchan/chrome-theme-generator.git
cd chrome-theme-generator
```

### 2. Open the app

Open `index.html` directly in your browser, or serve it with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

### 3. Generate a theme package

1. Pick a colour from the palette or use the manual colour picker.
2. Enter a theme name (optional).
3. Click **Download Theme (.zip)**.

### 4. Install the generated theme

1. Unzip the downloaded file.
2. Open `chrome://extensions` (or `brave://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the unzipped theme folder.

If another custom theme is already active, disable or remove it first.

## How It Works

- The UI lets you choose a base colour.
- The script computes:
  - `frame` colour from your chosen hex value
  - `toolbar` colour as a lightened variant
  - text colours (black/white) using luminance checks for readability
- A Chrome theme manifest is generated in memory.
- JSZip packages the theme into a downloadable ZIP.
- The ZIP is saved via a standard browser download.

## Project Structure

- `index.html` — App UI and simulator layout
- `popup.js` — Colour logic, preview rendering, ZIP/theme generation
- `jszip.min.js` — Bundled JSZip library for ZIP export

## Development Notes

- No build step required.
- No framework dependencies — plain HTML, CSS, and vanilla JavaScript.
- Open `index.html` directly to run.

## Roadmap

Planned improvements:

- Gradient support
- Better colour-picking controls

## Contributing

PRs are welcome.

Suggested flow:

1. Open an issue or discussion for major changes.
2. Create a focused branch.
3. Submit a PR with a clear summary and testing notes.

## Support

For help, feature ideas, or bugs, use GitHub Discussions in this repository.

## Third-Party Credits

- JSZip: https://github.com/Stuk/jszip — used for generating downloadable ZIP files.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
