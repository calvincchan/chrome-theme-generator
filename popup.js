const materialColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#212121'];


const manualPicker = document.getElementById('manual-picker');
const paletteContainer = document.getElementById('material-palette');
const genBtn = document.getElementById('generate-btn');
const themeNameInput = document.getElementById('theme-name');

// Load last picked color from localStorage, fallback to default
let currentHex = localStorage.getItem('lastColor') || "#1a73e8";

// 1. Initialize Palette
materialColors.forEach(color => {
  const swatch = document.createElement('div');
  swatch.className = 'swatch';
  swatch.style.backgroundColor = color;
  swatch.onclick = () => {
    manualPicker.value = color;
    updateTheme(color);
  };
  paletteContainer.appendChild(swatch);
});

manualPicker.oninput = (e) => updateTheme(e.target.value);

// 2. Update UI Simulator
function updateTheme(hex) {
  currentHex = hex;
  localStorage.setItem('lastColor', hex);
  const rgb = hexToRgb(hex);
  const isDark = getLuminance(rgb) < 140;
  const textColor = isDark ? "#ffffff" : "#000000";

  const frameColor = hex;
  const toolbarColor = lightenDarkenColor(hex, 20);

  document.getElementById('sim-frame').style.backgroundColor = frameColor;
  document.getElementById('sim-tab').style.backgroundColor = toolbarColor;
  document.getElementById('sim-tab').style.color = textColor;
  document.getElementById('sim-toolbar').style.backgroundColor = toolbarColor;
}

// 3. The One-Click Zip Generation
genBtn.onclick = async () => {
  const zip = new JSZip();
  const rgb = hexToRgb(currentHex);
  const toolbarRgb = hexToRgb(lightenDarkenColor(currentHex, 20));
  const isDark = getLuminance(rgb) < 140;
  const textRGB = isDark ? [255, 255, 255] : [0, 0, 0];

  // Get theme name from input, fallback to ChromaShift if empty
  let themeName = themeNameInput.value.trim() || `ChromaShift_${currentHex.replace('#', '')}`;
  // Sanitize folder name (remove slashes, etc.)
  themeName = themeName.replace(/[^a-zA-Z0-9-_ ]/g, '_');

  // tints.buttons uses HSL [-1..1]: -1 = no change, lightness 0 = black, 1 = white
  const buttonTint = isDark ? [-1, -1, 1] : [-1, -1, 0];

  const manifest = {
    manifest_version: 3,
    version: "1.0",
    name: themeName,
    theme: {
      colors: {
        frame: rgb,
        toolbar: toolbarRgb,
        tab_text: textRGB,
        tab_background_text: textRGB,
        bookmark_text: textRGB,
        toolbar_text: textRGB,
        ntp_background: [255, 255, 255],
        ntp_text: [0, 0, 0]
      },
      tints: {
        buttons: buttonTint
      }
    }
  };

  // Add manifest.json to a folder in the zip root
  zip.folder(themeName).file("manifest.json", JSON.stringify(manifest, null, 2));

  // Generate the zip content
  const blob = await zip.generateAsync({ type: "blob" });

  // Use Chrome's download API to save the zip
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: `ChromeTheme_${themeName}.zip`
  });
};

// --- Helper Utilities ---
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
}

function getLuminance(rgb) {
  return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
}

function lightenDarkenColor(col, amt) {
  let usePound = col[0] === "#";
  if (usePound) col = col.slice(1);
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00FF) + amt;
  let g = (num & 0x0000FF) + amt;
  const clamp = (val) => Math.min(255, Math.max(0, val));
  return (usePound ? "#" : "") + (clamp(g) | (clamp(b) << 8) | (clamp(r) << 16)).toString(16).padStart(6, '0');
}

// Set picker to last color
manualPicker.value = currentHex;
updateTheme(currentHex);