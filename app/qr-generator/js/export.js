'use strict';
// ---- SVG export ----
function buildSvg(opts, matrix) {
  const n = matrix.count, m = opts.margin, dim = n + m * 2;
  const esc = (s) => s.replace(/[<>&"]/g, (x) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[x]));
  const fillRef = opts.gradient ? 'url(#g)' : esc(opts.dark);
  const defs = opts.gradient
    ? `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${esc(opts.dark)}"/><stop offset="1" stop-color="${esc(opts.dark2)}"/></linearGradient></defs>`
    : '';
  let cells = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (!matrix.isDark(r, c)) continue;
    const st = inFinder(r, c, n) ? 'square' : opts.style;
    const x = c + m, y = r + m;
    if (st === 'dots') cells += `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.46"/>`;
    else if (st === 'rounded') cells += `<rect x="${x}" y="${y}" width="1" height="1" rx="0.32"/>`;
    else cells += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
  }
  let logoEl = '';
  if (opts.logo && logoDataUrl) {
    const bs = n * opts.logoFrac, lx = m + (n - bs) / 2, ly = m + (n - bs) / 2;
    if (opts.logoBox) {
      const pad = bs * 0.1;
      logoEl += `<rect x="${(lx - pad).toFixed(3)}" y="${(ly - pad).toFixed(3)}" width="${(bs + pad * 2).toFixed(3)}" height="${(bs + pad * 2).toFixed(3)}" rx="${(bs * 0.15).toFixed(3)}" fill="${esc(opts.light)}"/>`;
    }
    logoEl += `<image href="${logoDataUrl}" x="${lx.toFixed(3)}" y="${ly.toFixed(3)}" width="${bs.toFixed(3)}" height="${bs.toFixed(3)}" preserveAspectRatio="xMidYMid slice"/>`;
  }
  // Label: adds a row below the QR in unit space and increases the viewBox height
  let labelEl = '', H = dim;
  if (opts.label) {
    const fsU = dim * 0.06;
    H = dim + fsU * 1.6;
    labelEl = `<text x="${dim / 2}" y="${(dim + fsU * 1.1).toFixed(3)}" font-size="${fsU.toFixed(3)}" font-family="system-ui,Arial,sans-serif" font-weight="600" fill="${esc(opts.dark)}" text-anchor="middle">${esc(opts.label)}</text>`;
  }
  const pxW = opts.size, pxH = Math.round(opts.size * H / dim);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pxW}" height="${pxH}" viewBox="0 0 ${dim} ${H.toFixed(3)}">` +
    defs + `<rect width="${dim}" height="${H.toFixed(3)}" fill="${esc(opts.light)}"/>` +
    `<g fill="${fillRef}">${cells}</g>${logoEl}${labelEl}</svg>`;
}

// ---- Download / copy ----
function safeName() {
  const raw = ($('f-name').value.trim() || 'qr-code');
  return raw.replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '') || 'qr-code';
}
function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
}
function exportRaster(type) {
  if (!lastJob) return;
  const opts = Object.assign({}, lastJob.opts);
  const cv = makeCanvas(opts);
  const q = type === 'jpeg' ? 0.92 : undefined;
  const url = cv.toDataURL('image/' + type, q);
  triggerDownload(url, safeName() + '.' + (type === 'jpeg' ? 'jpg' : 'png'));
  setStatus((type === 'jpeg' ? 'JPEG' : 'PNG') + ' downloaded.', true);
}
function exportSvg() {
  if (!lastJob) return;
  const opts = lastJob.opts;
  const matrix = { isDark: opts._m.isDark, count: opts._m.count };
  const svg = buildSvg(opts, matrix);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, safeName() + '.svg');
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus('SVG downloaded.', true);
}
async function copyPng() {
  if (!lastJob) return;
  const cv = makeCanvas(lastJob.opts);
  if (!navigator.clipboard || !window.ClipboardItem) {
    setStatus('Copy to clipboard is not supported in this browser; use Download PNG.', true);
    return;
  }
  try {
    const blob = await new Promise((res) => cv.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    setStatus('PNG copied to clipboard.', true);
  } catch (e) { setStatus('Could not copy to clipboard: ' + e.message, true); }
}

// ---- Logo upload ----
function loadLogo(file) {
  if (!file) { logoImg = null; logoDataUrl = ''; requestRender(); return; }
  if (!file.type.startsWith('image/')) { setStatus('Select an image file for the logo.', true); return; }
  if (file.size > 2 * 1024 * 1024) { setStatus('Logo exceeds the 2 MB limit.', true); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => { logoImg = img; logoDataUrl = e.target.result; requestRender(); };
    img.onerror = () => setStatus('Could not read the logo image.', true);
    img.src = e.target.result;
  };
  reader.onerror = () => setStatus('Could not read the logo file.', true);
  reader.readAsDataURL(file);
}
