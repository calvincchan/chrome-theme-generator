# ChromaShift Theme Creator

Create custom Chrome/Brave themes from a single color, preview them in a built-in simulator, and download a ready-to-install theme package.

Repository: https://github.com/calvincchan/chrome-theme-generator

## Why This Project Exists

Making a custom browser theme should be quick:

- Pick a color
- See a live preview
- Download a theme package
- Install it in your browser

ChromaShift Theme Creator is a lightweight Chrome extension that does exactly that.

## Features

- Live browser-chrome simulator inside the popup
- One-click Material-style color palette
- Manual color picker for exact color input
- Auto-contrast text handling based on luminance
- Theme name input with filename-safe sanitization
- One-click ZIP export containing a valid theme `manifest.json`
- Remembers your last selected color via localStorage

## Browser Support

Tested/targeted browsers:

- Google Chrome
- Brave

Because Brave is Chromium-based, behavior should be similar to Chrome in most cases.

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/calvincchan/chrome-theme-generator.git
cd chrome-theme-generator
```

### 2. Load the extension in your browser

1. Open `chrome://extensions` (or `brave://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the project folder.

### 3. Generate a theme package

1. Open the extension popup.
2. Pick a color from the palette or use the manual color picker.
3. Enter a theme name (optional).
4. Click **Download Theme (.zip)**.

The extension generates a ZIP containing a folder with a theme `manifest.json`.

### 4. Install the generated theme

1. Unzip the downloaded file.
2. Open `chrome://extensions` (or `brave://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the unzipped generated theme folder.

If another custom theme is already active, disable/remove it first if needed.

## Screenshots

No screenshots are included yet.

If you want to add them later, create a folder like `docs/images/` and reference them here.

## How It Works

- The popup UI lets you choose a base color.
- The script computes:
  - `frame` color from your chosen hex color
  - `toolbar` color as a lightened variant
  - text colors (black/white) using luminance checks for readability
- A Chrome theme manifest is generated in memory.
- JSZip packages the theme into a downloadable ZIP.
- Chrome downloads API saves the ZIP locally.

## Project Structure

- `manifest.json` - Extension manifest (popup and permissions)
- `popup.html` - Popup UI and simulator layout
- `popup.js` - Color logic, preview rendering, ZIP/theme generation
- `jszip.min.js` - Bundled JSZip library used for ZIP export

## Development Notes

- This project is intentionally simple and dependency-light.
- No build step is required.
- Open the folder and load unpacked to run.

## Roadmap

Planned improvements:

- Gradient support
- Better color-picking controls

## Contributing

PRs are welcome.

Suggested flow:

1. Open an issue or discussion for major changes.
2. Create a focused branch.
3. Submit a PR with a clear summary and testing notes.

## Support

For help, feature ideas, or bugs, use GitHub Discussions in this repository.

## Third-Party Credits

- JSZip: https://github.com/Stuk/jszip
- Used for generating downloadable ZIP files in the extension.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
