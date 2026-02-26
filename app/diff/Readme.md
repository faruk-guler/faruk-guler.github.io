# Code Diff Checker — Browser Extension & Web Tool

A lightweight, high-performance tool that visually compares two blocks of text or code and highlights their differences with character-level accuracy, inspired by diffchecker.com.

## 🚀 Features
- **Split View** — Old and new versions side by side with independent line numbers.
- **Unified View** — Single column comparison with `+` / `−` prefixes.
- **Inline Character Diffing** — Granular highlighting of exactly which letters or spaces changed inside a line.
- **Whitespace Detection** — Option to ignore exact whitespace/indentation differences.
- **Export & Copy** — Instantly copy the output or export it as a standard `.diff` file.
- **System Theme Detection** — Beautiful Dark & Light modes that automatically match your OS settings.
- **Standalone or Extension** — Pure HTML/CSS/JS without any messy build steps, run it locally or compile as a Chrome V3 Extension.

## 📁 File Structure
```text
├── manifest.json       Chrome extension manifest (MV3 - Highly Secured)
├── background.js       Opens index.html on icon click in a new secure tab
├── index.html          Main UI layout
├── icon48.png / 128    Extension icons
├── Readme.md           Documentation
└── src/
    ├── diff.min.js     jsdiff v7.0.0 local library (No external CDN dependencies)
    ├── index.js        Diff processing, rendering, and UI logic
    └── styles.css      Complete visual ruleset (Dark/Light themes + Custom Scrollbars)
```

## 🛠 Load as Extension (Chrome / Edge)
1. Open `chrome://extensions/`
2. Enable **Developer mode** at the top right.
3. Click **Load unpacked** and select this project folder.

## 🌐 Standalone Use
Since there are no build steps like webpack or node_modules, you can simply **double-click `index.html`** to open the tool directly in any web browser.

## 🔒 Privacy & Security
Everything runs **100% locally** in your browser. No strings or code snippets are ever sent to an external server. The `manifest.json` restricts all access rights for maximum security.
