// Runs before the first paint so the saved theme never flashes the wrong colors.
// Manifest V3 blocks inline scripts on extension pages, therefore it lives in its own file.
(function () {
  var saved = null;
  try {
    saved = localStorage.getItem('dc-theme');
  } catch (err) {
    // Storage can be unavailable (e.g. blocked cookies); fall back to the system theme.
  }
  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  document.documentElement.setAttribute('data-theme', saved || (prefersLight ? 'light' : 'dark'));
})();
