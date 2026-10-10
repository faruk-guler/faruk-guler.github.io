/* Open Diff Checker - every comparison runs locally in this page. */

// ── Limits ──────────────────────────────────────────────────
const MAX_TEXT_CHARS = 2 * 1024 * 1024;   // above this the tab would freeze
const MAX_FILE_BYTES = 5 * 1024 * 1024;   // drag & drop ceiling
const MAX_RENDER_ROWS = 5000;             // DOM budget: more rows freeze the page
const CONTEXT_LINES = 3;                  // unchanged lines kept around a fold

// ── Elements ───────────────────────────────────────────────
const els = {
  oldText: document.getElementById('oldText'),
  newText: document.getElementById('newText'),
  compareBtn: document.getElementById('compareBtn'),
  swapBtn: document.getElementById('swapBtn'),
  hideUnchanged: document.getElementById('hideUnchanged'),
  ignoreWhitespace: document.getElementById('ignoreWhitespace'),
  themeToggle: document.getElementById('themeToggle'),
  aboutBtn: document.getElementById('aboutBtn'),
  aboutModal: document.getElementById('aboutModal'),
  modalClose: document.getElementById('modalClose'),
  appVersion: document.getElementById('appVersion'),
  statsBar: document.getElementById('statsBar'),
  statsRemoved: document.getElementById('statsRemoved'),
  statsLines: document.getElementById('statsLines'),
  statsAdded: document.getElementById('statsAdded'),
  outputWrapper: document.getElementById('outputWrapper'),
  diffOutput: document.getElementById('diffOutput'),
  searchDiff: document.getElementById('searchDiff'),
  searchCount: document.getElementById('searchCount'),
  copyBtn: document.getElementById('copyBtn'),
  exportBtn: document.getElementById('exportBtn'),
  clearBtn: document.getElementById('clearBtn'),
  toast: document.getElementById('toast')
};

// ── Text rendering ──────────────────────────────────────────
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Whitespace characters stay in the DOM so copying, pasting and searching the
// result keep working; CSS paints the visible marker on top of them.
function formatContent(text) {
  return escapeHtml(text)
    .replace(/ /g, '<span class="ws ws-space"> </span>')
    .replace(/\t/g, '<span class="ws ws-tab">\t</span>');
}

function inlineDiff(oldStr, newStr) {
  const parts = Diff.diffChars(oldStr, newStr);
  let oldHtml = '', newHtml = '';

  parts.forEach(p => {
    const html = formatContent(p.value);
    if (p.added) {
      newHtml += `<mark class="char-add">${html}</mark>`;
    } else if (p.removed) {
      oldHtml += `<mark class="char-rem">${html}</mark>`;
    } else {
      oldHtml += html;
      newHtml += html;
    }
  });
  return { oldHtml, newHtml };
}

// ── Table building ──────────────────────────────────────────
const toLines = value => value.replace(/\n$/, '').split('\n');

// jsdiff merges an unterminated last line into its change block, which makes
// untouched lines show up as changed. Closing the line fixes the grouping.
const ensureFinalNewline = text => text && !text.endsWith('\n') ? `${text}\n` : text;

// jsdiff's own ignoreWhitespace only covers the ends of a line. To honour
// "lines that differ only in whitespace", the comparison runs on
// whitespace-squashed copies and the original text of every block is restored
// afterwards, so nothing displayed or counted is altered.
const squash = line => line.trim().replace(/[ \t]+/g, ' ');

function diffLineBlocks(oldText, newText, ignoreWS) {
  const oldClosed = ensureFinalNewline(oldText);
  if (!ignoreWS) return Diff.diffLines(oldClosed, ensureFinalNewline(newText));

  const oldLines = toLines(oldClosed);
  const newLines = toLines(ensureFinalNewline(newText));
  const blocks = Diff.diffLines(oldLines.map(squash).join('\n'), newLines.map(squash).join('\n'));
  let oi = 0, ni = 0;

  return blocks.map(block => {
    const count = block.count || toLines(block.value).length;
    let source;
    if (block.removed && !block.added) {
      source = oldLines.slice(oi, oi + count); oi += count;
    } else {
      source = newLines.slice(ni, ni + count); ni += count; oi += count;
    }
    return { added: block.added, removed: block.removed, count, value: `${source.join('\n')}\n` };
  });
}

const noDiffMessage = () => `<div class="no-diff">✅ No differences found. Both texts are identical.</div>`;

const foldRow = (count, id) =>
  `<tr class="folded-row" data-fold="${id}" data-lines="${count}"><td colspan="4">... ${count} unchanged line${count !== 1 ? 's' : ''} hidden (click to expand) ...</td></tr>`;

// Collapsed context is only registered, never rendered up front: a 60k-line
// unchanged block then costs a single row instead of 60k. Expanding one fold
// materialises at most EXPAND_STEP rows.
const EXPAND_STEP = 1000;
let foldRegistry = new Map();
let foldSeq = 0;

function diffTable(rows, heads) {
  const ths = heads.map(([cls, label]) =>
    `<th${cls ? ` class="${cls}"` : ''}>${label}</th>`).join('');
  return `<table class="diff-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
}

// Banner shown when the render budget cut the output short.
const truncatedNotice = () =>
  `<div class="no-diff info">⚠️ Only the first ${MAX_RENDER_ROWS.toLocaleString()} rows are shown, the diff is larger. `
  + `Turn on "Hide Unchanged Lines" or compare smaller sections to see the rest.</div>`;

// Rows of an unchanged block. With folding enabled only the lines closest to a
// change are rendered; the middle becomes a clickable placeholder. Lines that
// do not fit into the render budget are simply left out.
function buildContextRows(lines, hide, isFirst, isLast, ctx) {
  const { render, add, hasRoom, oldNo, newNo } = ctx;
  const emit = index => hasRoom() &&
    add(render(lines[index], oldNo + index, newNo + index));

  if (!hide || lines.length <= CONTEXT_LINES * 2) {
    for (let i = 0; i < lines.length; i++) if (!emit(i)) return;
    return;
  }

  const before = isFirst ? 0 : CONTEXT_LINES;
  const after = isLast ? 0 : CONTEXT_LINES;
  const hiddenCount = lines.length - before - after;
  let i = 0;

  for (; i < before; i++) if (!emit(i)) return;

  const id = ++foldSeq;
  const collapsed = lines.slice(before, before + hiddenCount);
  foldRegistry.set(id, {
    lines: collapsed,
    text: collapsed.join('\n').toLowerCase(),
    oldNo: oldNo + before,
    newNo: newNo + before,
    render
  });
  if (!add(foldRow(hiddenCount, id))) return;

  i = before + hiddenCount;
  for (; i < lines.length; i++) if (!emit(i)) return;
}

function updateStats(added, removed, totalLines) {
  if (added === 0 && removed === 0) {
    els.statsBar.classList.add('hidden');
    return;
  }
  els.statsBar.classList.remove('hidden');
  els.statsRemoved.textContent = `− ${removed} removal${removed !== 1 ? 's' : ''}`;
  els.statsLines.textContent = `${totalLines} line${totalLines !== 1 ? 's' : ''}`;
  els.statsAdded.textContent = `+ ${added} addition${added !== 1 ? 's' : ''}`;
}

// Shared shape of both renderers: rows are pushed through a budgeted `add`,
// and every counter keeps advancing even for rows that did not fit.
function createSplitDiff(oldText, newText, ignoreWS, hideUnchanged) {
  const changes = diffLineBlocks(oldText, newText, ignoreWS);
  let addCount = 0, removeCount = 0, oldLine = 1, newLine = 1, i = 0;
  let truncated = false;
  const rows = [];
  foldRegistry = new Map();
  foldSeq = 0;

  const hasRoom = () => rows.length < MAX_RENDER_ROWS;
  const add = html => {
    if (!hasRoom()) { truncated = true; return false; }
    rows.push(html);
    return true;
  };

  const renderContext = (line, oldNo, newNo) => {
    const html = formatContent(line);
    return '<tr>' +
      `<td class="ln context-gutter">${oldNo}</td><td class="context">${html}</td>` +
      `<td class="ln context-gutter">${newNo}</td><td class="context">${html}</td></tr>`;
  };

  while (i < changes.length) {
    const c = changes[i];

    // Past the budget nothing is built, but the stats must stay truthful.
    if (!hasRoom()) {
      truncated = true;
      const skipped = c.count || toLines(c.value).length;
      if (c.added) { addCount += skipped; newLine += skipped; }
      else if (c.removed) { removeCount += skipped; oldLine += skipped; }
      else { oldLine += skipped; newLine += skipped; }
      i++;
      continue;
    }

    if (c.removed) {
      removeCount += c.count || 1;
      const next = changes[i + 1];
      const L = toLines(c.value);

      if (next?.added) {
        addCount += next.count || 1;
        const R = toLines(next.value);
        const pairs = Math.max(L.length, R.length);
        let j = 0;
        for (; j < pairs && hasRoom(); j++) {
          const hasL = L[j] !== undefined, hasR = R[j] !== undefined;
          let leftContent = hasL ? formatContent(L[j]) : '';
          let rightContent = hasR ? formatContent(R[j]) : '';
          // Both sides present: highlight the characters that actually changed.
          if (hasL && hasR) {
            const il = inlineDiff(L[j], R[j]);
            leftContent = il.oldHtml;
            rightContent = il.newHtml;
          }
          const oldNo = hasL ? oldLine : '', newNo = hasR ? newLine : '';
          if (!add(`<tr>` +
            `<td class="ln removed-gutter">${oldNo}</td>` +
            `<td class="${hasL ? 'removed' : 'empty'}">${leftContent}</td>` +
            `<td class="ln added-gutter">${newNo}</td>` +
            `<td class="${hasR ? 'added' : 'empty'}">${rightContent}</td></tr>`)) break;
          if (hasL) oldLine++;
          if (hasR) newLine++;
        }
        for (; j < pairs; j++) {
          if (L[j] !== undefined) oldLine++;
          if (R[j] !== undefined) newLine++;
        }
        i += 2;
      } else {
        let j = 0;
        for (; j < L.length && hasRoom(); j++) {
          if (!add(`<tr>` +
            `<td class="ln removed-gutter">${oldLine}</td>` +
            `<td class="removed">${formatContent(L[j])}</td>` +
            `<td class="ln"></td><td class="empty"></td></tr>`)) break;
          oldLine++;
        }
        oldLine += L.length - j;
        i++;
      }
    } else if (c.added) {
      addCount += c.count || 1;
      const A = toLines(c.value);
      let j = 0;
      for (; j < A.length && hasRoom(); j++) {
        if (!add(`<tr>` +
          `<td class="ln"></td><td class="empty"></td>` +
          `<td class="ln added-gutter">${newLine}</td>` +
          `<td class="added">${formatContent(A[j])}</td></tr>`)) break;
        newLine++;
      }
      newLine += A.length - j;
      i++;
    } else {
      const lines = toLines(c.value);
      buildContextRows(lines, hideUnchanged, i === 0, i === changes.length - 1,
        { render: renderContext, add, hasRoom, oldNo: oldLine, newNo: newLine });
      // The counters describe the document, so they also move for the lines
      // that never made it into the render budget.
      oldLine += lines.length;
      newLine += lines.length;
      i++;
    }
  }

  updateStats(addCount, removeCount, Math.max(oldLine - 1, newLine - 1));
  if (!addCount && !removeCount) return noDiffMessage();

  return (truncated ? truncatedNotice() : '') +
    diffTable(rows.join(''), [['ln-head', ''], ['', 'Original Text'], ['ln-head', ''], ['', 'Changed Text']]);
}

function createUnifiedDiff(oldText, newText, ignoreWS, hideUnchanged) {
  const changes = diffLineBlocks(oldText, newText, ignoreWS);
  let addCount = 0, removeCount = 0, oldLine = 1, newLine = 1, i = 0;
  let truncated = false;
  const rows = [];
  foldRegistry = new Map();
  foldSeq = 0;

  const hasRoom = () => rows.length < MAX_RENDER_ROWS;
  const add = html => {
    if (!hasRoom()) { truncated = true; return false; }
    rows.push(html);
    return true;
  };

  const renderContext = (line, oldNo, newNo) => {
    const html = formatContent(line);
    return '<tr>' +
      `<td class="ln context-gutter">${oldNo}</td><td class="ln context-gutter">${newNo}</td>` +
      `<td class="sign context-gutter"></td><td class="context">${html}</td></tr>`;
  };

  while (i < changes.length) {
    const c = changes[i];

    // Past the budget nothing is built, but the stats must stay truthful.
    if (!hasRoom()) {
      truncated = true;
      const skipped = c.count || toLines(c.value).length;
      if (c.added) { addCount += skipped; newLine += skipped; }
      else if (c.removed) { removeCount += skipped; oldLine += skipped; }
      else { oldLine += skipped; newLine += skipped; }
      i++;
      continue;
    }

    if (c.removed) {
      removeCount += c.count || 1;
      const next = changes[i + 1];
      const remLines = toLines(c.value);

      if (next?.added) {
        addCount += next.count || 1;
        const addLines = toLines(next.value);
        let j = 0;
        for (; j < remLines.length && hasRoom(); j++) {
          const paired = addLines[j];
          const html = paired !== undefined ? inlineDiff(remLines[j], paired).oldHtml : formatContent(remLines[j]);
          if (!add(`<tr>` +
            `<td class="ln removed-gutter">${oldLine}</td>` +
            `<td class="ln removed-gutter"></td>` +
            `<td class="sign removed-gutter">−</td>` +
            `<td class="removed">${html}</td></tr>`)) break;
          oldLine++;
        }
        oldLine += remLines.length - j;
        let k = 0;
        for (; k < addLines.length && hasRoom(); k++) {
          const paired = remLines[k];
          const html = paired !== undefined ? inlineDiff(paired, addLines[k]).newHtml : formatContent(addLines[k]);
          if (!add(`<tr>` +
            `<td class="ln added-gutter"></td>` +
            `<td class="ln added-gutter">${newLine}</td>` +
            `<td class="sign added-gutter">+</td>` +
            `<td class="added">${html}</td></tr>`)) break;
          newLine++;
        }
        newLine += addLines.length - k;
        i += 2;
      } else {
        let j = 0;
        for (; j < remLines.length && hasRoom(); j++) {
          if (!add(`<tr>` +
            `<td class="ln removed-gutter">${oldLine}</td>` +
            `<td class="ln removed-gutter"></td>` +
            `<td class="sign removed-gutter">−</td>` +
            `<td class="removed">${formatContent(remLines[j])}</td></tr>`)) break;
          oldLine++;
        }
        oldLine += remLines.length - j;
        i++;
      }
    } else if (c.added) {
      addCount += c.count || 1;
      const A = toLines(c.value);
      let j = 0;
      for (; j < A.length && hasRoom(); j++) {
        if (!add(`<tr>` +
          `<td class="ln added-gutter"></td>` +
          `<td class="ln added-gutter">${newLine}</td>` +
          `<td class="sign added-gutter">+</td>` +
          `<td class="added">${formatContent(A[j])}</td></tr>`)) break;
        newLine++;
      }
      newLine += A.length - j;
      i++;
    } else {
      const lines = toLines(c.value);
      buildContextRows(lines, hideUnchanged, i === 0, i === changes.length - 1,
        { render: renderContext, add, hasRoom, oldNo: oldLine, newNo: newLine });
      oldLine += lines.length;
      newLine += lines.length;
      i++;
    }
  }

  updateStats(addCount, removeCount, Math.max(oldLine - 1, newLine - 1));
  if (!addCount && !removeCount) return noDiffMessage();

  return (truncated ? truncatedNotice() : '') +
    diffTable(rows.join(''), [['ln-head', 'Old'], ['ln-head', 'New'], ['ln-head', ''], ['', 'Unified View']]);
}

// ── Diff run ────────────────────────────────────────────────
const engineReady = typeof Diff !== 'undefined' && typeof Diff.diffLines === 'function';
let diffRunId = 0;

function showResult(html) {
  els.outputWrapper.classList.remove('hidden');
  els.diffOutput.innerHTML = html;
}

function runDiff() {
  if (!engineReady) return;
  disarmClear();   // a fresh run makes an armed "click again to clear" stale

  // Every request gets a token so a slow run can never overwrite a newer one.
  const runId = ++diffRunId;
  const oldText = els.oldText.value;
  const newText = els.newText.value;
  const activeMode = document.querySelector('.mode-btn.active');
  const mode = activeMode ? activeMode.dataset.mode : 'split';
  const ignoreWS = els.ignoreWhitespace.checked;
  const hideUnchanged = els.hideUnchanged.checked;

  if (!oldText.trim() && !newText.trim()) {
    document.body.classList.remove('compact');
    showResult(`<div class="no-diff">⚠️ Please paste text into both panels before comparing.</div>`);
    updateStats(0, 0, 0);
    return;
  }

  if (oldText.length > MAX_TEXT_CHARS || newText.length > MAX_TEXT_CHARS) {
    document.body.classList.remove('compact');
    showResult(`<div class="no-diff">⚠️ Text is too large to compare safely. Keep each panel under ${MAX_TEXT_CHARS / 1024 / 1024}M characters.</div>`);
    updateStats(0, 0, 0);
    return;
  }

  showResult(`<div class="no-diff info">⏳ Computing differences...</div>`);

  // Yield once so the message can paint before the blocking comparison starts.
  setTimeout(() => {
    if (runId !== diffRunId) return;
    try {
      const html = mode === 'split'
        ? createSplitDiff(oldText, newText, ignoreWS, hideUnchanged)
        : createUnifiedDiff(oldText, newText, ignoreWS, hideUnchanged);
      showResult(html);
      document.body.classList.add('compact');
      applySearch();
    } catch (err) {
      showResult(`<div class="no-diff error">❌ An error occurred while computing the diff. The text might be too large or complex.</div>`);
      console.error('Diff error:', err);
    }
  }, 0);
}

// ── Search ─────────────────────────────────────────────────
let searchMatches = [];
let searchCursor = -1;

// Materialises the next slice of a collapsed block and keeps the placeholder
// for whatever is left, so a single click can never flood the page.
function expandFold(foldedRow) {
  const id = Number(foldedRow.dataset.fold);
  const entry = foldRegistry.get(id);
  if (!entry) { foldedRow.remove(); return; }

  const take = Math.min(entry.lines.length, EXPAND_STEP);
  const html = [];
  for (let i = 0; i < take; i++) {
    html.push(entry.render(entry.lines[i], entry.oldNo + i, entry.newNo + i));
  }
  foldedRow.insertAdjacentHTML('beforebegin', html.join(''));

  if (take < entry.lines.length) {
    entry.lines = entry.lines.slice(take);
    entry.oldNo += take;
    entry.newNo += take;
    const left = entry.lines.length;
    foldedRow.dataset.lines = left;
    foldedRow.firstElementChild.textContent =
      `... ${left} unchanged line${left !== 1 ? 's' : ''} hidden (click to expand) ...`;
  } else {
    foldRegistry.delete(id);
    foldedRow.remove();
  }

  // Re-scan only when a search is active, and coalesce the bursts of clicks so
  // walking through a huge block does not rescan it once per click.
  if (els.searchDiff.value.trim()) scheduleSearchRefresh();
}

let searchRefreshTimer;

function scheduleSearchRefresh() {
  clearTimeout(searchRefreshTimer);
  searchRefreshTimer = setTimeout(applySearch, 150);
}

function applySearch() {
  const query = els.searchDiff.value.trim().toLowerCase();
  searchMatches = [];
  searchCursor = -1;

  const rows = els.diffOutput.querySelectorAll('.diff-table tbody tr');
  rows.forEach(row => {
    row.classList.remove('search-match', 'search-current');
    row.removeAttribute('title');
    if (!query || row.classList.contains('folded-row')) return;

    const text = Array.from(row.querySelectorAll('td.added, td.removed, td.context'))
      .map(td => td.textContent).join('\n');
    if (!text.toLowerCase().includes(query)) return;

    row.classList.add('search-match');
    searchMatches.push(row);
  });

  // Collapsed lines are not in the DOM yet: mark the placeholder that hides a hit.
  if (query) {
    foldRegistry.forEach((entry, id) => {
      if (!entry.text.includes(query)) return;
      const row = els.diffOutput.querySelector(`.folded-row[data-fold="${id}"]`);
      if (!row) return;
      row.classList.add('search-match');
      row.title = 'Contains a match - click to expand';
      searchMatches.push(row);
    });
  }

  if (!query) {
    els.searchCount.textContent = '';
    els.searchCount.classList.remove('none');
    return;
  }
  els.searchCount.textContent = searchMatches.length;
  els.searchCount.title = `${searchMatches.length} matching line${searchMatches.length !== 1 ? 's' : ''}`;
  els.searchCount.classList.toggle('none', searchMatches.length === 0);
}

function gotoMatch(step) {
  if (!searchMatches.length) return;
  if (searchCursor >= 0) searchMatches[searchCursor].classList.remove('search-current');
  searchCursor = (searchCursor + step + searchMatches.length) % searchMatches.length;
  const row = searchMatches[searchCursor];
  row.classList.add('search-current');
  row.scrollIntoView({ block: 'center' });
}

// ── Toast ───────────────────────────────────────────────────
let toastTimer;

function notify(message, tone) {
  els.toast.textContent = message;
  els.toast.className = `toast show${tone ? ` ${tone}` : ''}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3800);
}

// ── Clipboard ───────────────────────────────────────────────
// navigator.clipboard can be missing (insecure page) or refuse (no permission),
// so the legacy copy command stays as a fallback.
function copyToClipboard(text) {
  const legacyCopy = () => new Promise((resolve, reject) => {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.className = 'clipboard-helper';
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand ? document.execCommand('copy') : false;
    helper.remove();
    ok ? resolve() : reject(new Error('execCommand copy was rejected'));
  });

  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(legacyCopy);
  }
  return legacyCopy();
}

// ── Persistence and controls ────────────────────────────────
function hasResult() {
  return !els.outputWrapper.classList.contains('hidden');
}

// Storage can be blocked (private mode, strict settings): reading and writing
// preferences must never break the page.
function readItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

function storeItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    // Preferences simply are not remembered.
  }
}

// Restore the saved diff mode (split/unified)
const modeButtons = [...document.querySelectorAll('.mode-btn')];

function markActiveMode(active) {
  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn === active);
    btn.setAttribute('aria-pressed', String(btn === active));
  });
}

const savedMode = readItem('dc-mode') || 'split';
markActiveMode(modeButtons.find(btn => btn.dataset.mode === savedMode) || modeButtons[0]);

modeButtons.forEach(btn => btn.addEventListener('click', () => {
  if (btn.classList.contains('active')) return;   // no needless recomputation
  markActiveMode(btn);
  storeItem('dc-mode', btn.dataset.mode);
  if (hasResult()) runDiff();
}));

['ignoreWhitespace', 'hideUnchanged'].forEach(id => {
  const el = els[id];
  const saved = readItem('dc-' + id);
  if (saved !== null) el.checked = saved === 'true';
  el.addEventListener('change', () => {
    storeItem('dc-' + id, el.checked);
    if (hasResult()) runDiff();
  });
});

els.compareBtn.addEventListener('click', runDiff);

els.swapBtn.addEventListener('click', () => {
  const temp = els.oldText.value;
  els.oldText.value = els.newText.value;
  els.newText.value = temp;
  if (hasResult()) runDiff();
});

// Clearing is destructive, so the button has to be confirmed by a second click.
let clearArmed = false;
let clearTimer;

function disarmClear() {
  clearArmed = false;
  clearTimeout(clearTimer);
  els.clearBtn.classList.remove('armed');
  els.clearBtn.textContent = '✕ Clear';
}

els.clearBtn.addEventListener('click', () => {
  if ((els.oldText.value || els.newText.value) && !clearArmed) {
    clearArmed = true;
    els.clearBtn.classList.add('armed');
    els.clearBtn.textContent = '✕ Click again to clear';
    clearTimer = setTimeout(disarmClear, 4000);
    return;
  }
  disarmClear();
  els.oldText.value = '';
  els.newText.value = '';
  els.searchDiff.value = '';
  els.diffOutput.innerHTML = '';
  els.outputWrapper.classList.add('hidden');
  els.statsBar.classList.add('hidden');
  document.body.classList.remove('compact');
  searchMatches = [];
  searchCursor = -1;
  els.searchCount.textContent = '';
});

els.copyBtn.addEventListener('click', () => {
  const text = els.oldText.value;
  if (!text.trim()) {
    notify('There is nothing in the original panel to copy.', 'warn');
    return;
  }
  copyToClipboard(text).then(() => {
    notify('Original text copied to the clipboard.', 'ok');
  }).catch(err => {
    console.error('Clipboard error:', err);
    notify('Copy failed: clipboard access was denied.', 'warn');
  });
});

els.exportBtn.addEventListener('click', () => {
  const oldText = els.oldText.value;
  const newText = els.newText.value;
  if (!oldText.trim() && !newText.trim()) {
    notify('There is nothing to export yet.', 'warn');
    return;
  }

  let patch;
  try {
    patch = Diff.createTwoFilesPatch('original.txt', 'changed.txt', oldText, newText, '', '',
      { ignoreWhitespace: els.ignoreWhitespace.checked });
  } catch (err) {
    console.error('Export error:', err);
    notify('Export failed: the text is too large or complex.', 'warn');
    return;
  }

  const url = URL.createObjectURL(new Blob([patch], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'diff-output.diff';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoking too early can abort the download.
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  notify('diff-output.diff downloaded.', 'ok');
});

// ── Theme ──────────────────────────────────────────────────
const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

function paintTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  els.themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  els.themeToggle.setAttribute('aria-pressed', theme === 'light');
}

let savedTheme = readItem('dc-theme');
if (!savedTheme) {
  savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
paintTheme(savedTheme);

els.themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  paintTheme(next);
  storeItem('dc-theme', next);
});

// ── About modal ─────────────────────────────────────────────
let lastFocused = null;

function openAbout() {
  lastFocused = document.activeElement;
  els.aboutModal.classList.add('open');
  els.modalClose.focus();
}

function closeAbout() {
  els.aboutModal.classList.remove('open');
  if (lastFocused?.focus) lastFocused.focus();
}

els.aboutBtn.addEventListener('click', openAbout);
els.modalClose.addEventListener('click', closeAbout);
els.aboutModal.addEventListener('click', e => { if (e.target === els.aboutModal) closeAbout(); });

// Tab has to stay inside the open dialog
els.aboutModal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = [...els.aboutModal.querySelectorAll('button, a[href]')]
    .filter(el => !el.disabled && el.offsetParent !== null);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

// Keep the advertised version in sync with the manifest when running as an extension
if (els.appVersion && typeof chrome !== 'undefined' && chrome.runtime?.getManifest) {
  const manifest = chrome.runtime.getManifest();
  if (manifest?.version) els.appVersion.textContent = `Version ${manifest.version}`;
}

// ── Keyboard shortcuts ──────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (els.aboutModal.classList.contains('open')) closeAbout();
    else if (document.activeElement === els.searchDiff && els.searchDiff.value) {
      els.searchDiff.value = '';
      applySearch();
    }
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    runDiff();
  } else if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'k') && hasResult()) {
    e.preventDefault();
    els.searchDiff.focus();
    els.searchDiff.select();
  }
});

let searchTimer;
els.searchDiff.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(applySearch, 200);
});

els.searchDiff.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    gotoMatch(e.shiftKey ? -1 : 1);
  }
});

// Editing a panel cancels a pending "click again to clear"
[els.oldText, els.newText].forEach(panel => panel.addEventListener('input', disarmClear));

// ── Scroll sync ─────────────────────────────────────────────
// The panels can hold different amounts of text, so mirror the scroll ratio
// instead of the raw offset: assigning an equal value fires no event, which
// lets the two panels settle without a lock flag that could get stuck.
function mirrorScroll(source, target) {
  const sourceMax = source.scrollHeight - source.clientHeight;
  const targetMax = target.scrollHeight - target.clientHeight;
  const ratio = sourceMax > 0 ? source.scrollTop / sourceMax : 0;
  const next = Math.round(ratio * targetMax);
  if (Math.abs(target.scrollTop - next) > 1) target.scrollTop = next;
  if (Math.abs(target.scrollLeft - source.scrollLeft) > 1) target.scrollLeft = source.scrollLeft;
}

els.oldText.addEventListener('scroll', () => mirrorScroll(els.oldText, els.newText));
els.newText.addEventListener('scroll', () => mirrorScroll(els.newText, els.oldText));

// ── Result interactions ─────────────────────────────────────
els.diffOutput.addEventListener('click', e => {
  const foldedRow = e.target.closest('.folded-row');
  if (foldedRow) expandFold(foldedRow);
});

// ── Drag & drop ─────────────────────────────────────────────
const hasFiles = e => Array.from(e.dataTransfer?.types || []).includes('Files');

function loadFile(file, target) {
  if (file.size > MAX_FILE_BYTES) {
    notify(`"${file.name}" is bigger than ${MAX_FILE_BYTES / 1024 / 1024} MB and was not loaded.`, 'warn');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result !== 'string') {
      notify(`"${file.name}" could not be read as text.`, 'warn');
      return;
    }
    target.value = reader.result;
    notify(`Loaded "${file.name}".`, 'ok');
    if (hasResult()) runDiff();
  };
  reader.onerror = () => notify(`"${file.name}" could not be read.`, 'warn');
  reader.readAsText(file);
}

[els.oldText, els.newText].forEach(panel => {
  panel.addEventListener('dragover', e => {
    if (!hasFiles(e)) return;      // plain text drags are handled by the browser
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    panel.classList.add('drag-over');
  });
  panel.addEventListener('dragleave', () => panel.classList.remove('drag-over'));
  panel.addEventListener('drop', e => {
    panel.classList.remove('drag-over');
    if (!hasFiles(e)) return;      // keep dropping selected text into the panel working
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file, panel);
  });
});

// ── Startup ─────────────────────────────────────────────────
if (!engineReady) {
  els.compareBtn.disabled = true;
  showResult(`<div class="no-diff error">❌ The diff engine (src/diff.min.js) failed to load, comparison is unavailable.</div>`);
}
