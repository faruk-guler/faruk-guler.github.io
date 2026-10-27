'use strict';
// ---- Matrix generation (library QR algorithm, our own drawing) ----
function getMatrix(text, ecLevel) {
  if (typeof QRCode === 'undefined') {
    throw new Error('qrcode.min.js is not loaded.');
  }
  const holder = document.createElement('div');
  const obj = new QRCode(holder, {
    text: text, width: 8, height: 8,
    correctLevel: QRCode.CorrectLevel[ecLevel]
  });
  const q = obj._oQRCode;
  return { isDark: (r, c) => q.isDark(r, c), count: q.getModuleCount() };
}

function readOptions() {
  const grad = $('chk-grad').checked;
  return {
    style: $('sel-style').value,
    ec: $('sel-ec').value,
    size: parseInt($('rng-size').value, 10),
    margin: parseInt($('rng-margin').value, 10),
    dark: $('col-dark').value,
    dark2: $('col-dark2').value,
    light: $('col-light').value,
    gradient: grad && $('col-dark2').value !== $('col-dark').value,
    label: $('f-label').value.trim(),
    logo: logoImg,
    logoFrac: parseInt($('rng-logo').value, 10) / 100,
    logoBox: $('chk-logobox').checked
  };
}

// 7x7 finder squares are always drawn square (for scanner reliability)
function inFinder(r, c, n) {
  return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Draws the QR onto the given ctx; returns total height (including label)
function drawMatrix(ctx, matrix, opts, scale) {
  const n = matrix.count;
  const cell = (opts.size * scale) / (n + opts.margin * 2);
  const off = cell * opts.margin;
  const qrPx = cell * n;
  ctx.save();
  ctx.fillStyle = opts.light;
  ctx.fillRect(0, 0, opts.size * scale, opts.size * scale);
  let fill;
  if (opts.gradient) {
    const g = ctx.createLinearGradient(off, off, off + qrPx, off + qrPx);
    g.addColorStop(0, opts.dark); g.addColorStop(1, opts.dark2);
    fill = g;
  } else { fill = opts.dark; }
  ctx.fillStyle = fill;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!matrix.isDark(r, c)) continue;
      const x = off + c * cell, y = off + r * cell;
      const style = inFinder(r, c, n) ? 'square' : opts.style;
      if (style === 'dots') {
        ctx.beginPath();
        ctx.arc(x + cell / 2, y + cell / 2, cell * 0.46, 0, Math.PI * 2);
        ctx.fill();
      } else if (style === 'rounded') {
        roundRectPath(ctx, x, y, cell, cell, cell * 0.32); ctx.fill();
      } else {
        ctx.fillRect(x, y, cell + 0.4, cell + 0.4);
      }
    }
  }
  // Logo
  if (opts.logo) {
    const lsz = qrPx * opts.logoFrac;
    const lx = off + (qrPx - lsz) / 2, ly = off + (qrPx - lsz) / 2;
    if (opts.logoBox) {
      ctx.fillStyle = opts.light;
      const pad = lsz * 0.1;
      roundRectPath(ctx, lx - pad, ly - pad, lsz + pad * 2, lsz + pad * 2, lsz * 0.15);
      ctx.fill();
    }
    ctx.drawImage(opts.logo, lx, ly, lsz, lsz);
  }
  ctx.restore();
  return 0; // label handled separately
}

function drawLabel(ctx, opts, scale, topPx) {
  if (!opts.label) return 0;
  const fs = Math.max(10, opts.size * scale * 0.055);
  ctx.save();
  ctx.fillStyle = opts.light;
  ctx.fillRect(0, topPx, opts.size * scale, fs + fs * 0.6);
  ctx.fillStyle = opts.dark;
  ctx.font = '600 ' + fs + 'px system-ui, "Segoe UI", Arial';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(opts.label, opts.size * scale / 2, topPx + (fs + fs * 0.6) / 2, opts.size * scale - 8);
  ctx.restore();
  return fs + fs * 0.6;
}

// Produces a new full-size canvas (preview and export)
function makeCanvas(opts) {
  const matrix = { isDark: opts._m.isDark, count: opts._m.count };
  const labelH = opts.label ? Math.max(10, opts.size * 0.055) * 1.6 : 0;
  const cv = document.createElement('canvas');
  cv.width = Math.round(opts.size); cv.height = Math.round(opts.size + labelH);
  const ctx = cv.getContext('2d');
  drawMatrix(ctx, matrix, opts, 1);
  if (opts.label) drawLabel(ctx, opts, 1, opts.size);
  return cv;
}

// ---- Preview ----
function requestRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 120);
}

function render() {
  const view = $('previewCanvas');
  let opts, payload, matrix;
  try {
    if (typeof QRCode === 'undefined') {
      throw new Error('Failed to load qrcode.min.js. Make sure the file is in the same folder as this HTML.');
    }
    payload = buildPayload();
    opts = readOptions();
    if (opts.dark.toLowerCase() === opts.light.toLowerCase()) {
      throw new Error('Code and background color cannot be the same; the QR would be unreadable.');
    }
    matrix = getMatrix(payload, opts.ec);
  } catch (e) {
    setStatus(e.message || 'Could not generate.', false);
    view.width = 320; view.height = 320;
    lastJob = null;
    $('btnPng').disabled = $('btnJpg').disabled = $('btnSvg').disabled = $('btnCopy').disabled = true;
    return;
  }
  opts._m = matrix;
  const cv = makeCanvas(opts);
  view.width = cv.width; view.height = cv.height;
  view.getContext('2d').drawImage(cv, 0, 0);
  lastJob = { opts, payload };
  $('btnPng').disabled = $('btnJpg').disabled = $('btnSvg').disabled = $('btnCopy').disabled = false;
  setStatus(opts.logo && opts.ec !== 'H' ? 'QR ready — H level recommended with a logo.' : 'QR code ready.', true);
}
