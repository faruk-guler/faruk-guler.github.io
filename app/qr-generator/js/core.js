'use strict';
// ---- Shared helpers and application state ----
// Classic scripts share the global scope; state lives here and is read/written by the other modules.
var $ = (id) => document.getElementById(id);

var logoImg = null;      // uploaded logo (Image)
var logoDataUrl = '';    // data URL, used for SVG export
var lastJob = null;      // { opts, payload } of the last successful generation
var renderTimer = null;  // debounce handle for the live preview

function setStatus(msg, ok) {
  const s = $('status');
  s.textContent = msg || '';
  s.classList.toggle('ok', !!ok);
}
