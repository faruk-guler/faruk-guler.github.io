'use strict';
// ---- About dialog ----
function openAbout() {
  const ov = $('aboutOverlay');
  if (!ov) return;
  ov.hidden = false;
  const c = $('aboutClose');
  if (c) c.focus();
}

function closeAbout() {
  const ov = $('aboutOverlay');
  if (ov) ov.hidden = true;
  const b = $('aboutBtn');
  if (b) b.focus();
}
