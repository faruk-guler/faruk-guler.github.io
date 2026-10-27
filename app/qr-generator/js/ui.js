'use strict';
// ---- Content type switching ----
function showTypeFields() {
  const type = document.querySelector('input[name="ctype"]:checked').value;
  document.querySelectorAll('.type-fields').forEach((el) => {
    el.classList.toggle('hide', el.dataset.type !== type);
  });
}

// ---- Theme ----
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const b = $('themeBtn');
  if (b) b.setAttribute('aria-checked', t === 'dark' ? 'true' : 'false');
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('qr-theme', cur); applyTheme(cur);
}

// ---- Initialization ----
function bindAll() {
  const live = ['f-text', 'f-wifi-ssid', 'f-wifi-pass', 'f-wifi-enc', 'f-wifi-hidden',
    'f-email-to', 'f-email-subject', 'f-email-body', 'f-sms-num', 'f-sms-msg', 'f-tel-num',
    'f-geo-lat', 'f-geo-lng', 'f-vc-name', 'f-vc-org', 'f-vc-tel', 'f-vc-email', 'f-vc-url',
    'sel-style', 'sel-ec', 'rng-size', 'rng-margin', 'col-dark', 'col-light', 'col-dark2',
    'chk-grad', 'rng-logo', 'chk-logobox', 'f-label'];
  live.forEach((id) => { const el = $(id); if (el) el.addEventListener('input', requestRender); });
  document.querySelectorAll('input[name="ctype"]').forEach((r) =>
    r.addEventListener('change', () => { showTypeFields(); requestRender(); }));
  $('rng-size').addEventListener('input', () => { $('val-size').textContent = $('rng-size').value; $('val-size2').textContent = $('rng-size').value; });
  $('rng-margin').addEventListener('input', () => $('val-margin').textContent = $('rng-margin').value);
  $('rng-logo').addEventListener('input', () => $('val-logo').textContent = $('rng-logo').value);
  $('logo-input').addEventListener('change', (e) => loadLogo(e.target.files[0]));
  $('btnPng').addEventListener('click', () => exportRaster('png'));
  $('btnJpg').addEventListener('click', () => exportRaster('jpeg'));
  $('btnSvg').addEventListener('click', exportSvg);
  $('btnCopy').addEventListener('click', copyPng);
  $('themeBtn').addEventListener('click', toggleTheme);
  $('f-text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); render(); }
  });
}

function init() {
  const saved = localStorage.getItem('qr-theme') ||
    (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);
  bindAll(); showTypeFields(); render();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
