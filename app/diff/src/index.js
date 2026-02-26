function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function inlineDiff(oldStr, newStr) {
  const parts = Diff.diffChars(oldStr, newStr);
  let oldHtml = '', newHtml = '';

  const processPart = (p, className) => {
    let text = escapeHtml(p.value);
    // Boşlukları görünür karakterlere dönüştürerek yutulmasını engelliyoruz
    text = text.replace(/ /g, '<span class="space-char">·</span>');
    text = text.replace(/\t/g, '<span class="space-char">→   </span>');
    return `<mark class="${className}">${text}</mark>`;
  };

  parts.forEach(p => {
    if (p.added) {
      newHtml += processPart(p, 'char-add');
    } else if (p.removed) {
      oldHtml += processPart(p, 'char-rem');
    } else {
      const esc = escapeHtml(p.value);
      oldHtml += esc;
      newHtml += esc;
    }
  });
  return { oldHtml, newHtml };
}

function updateStats(added, removed, totalLines) {
  const bar = document.getElementById('statsBar');
  const elRem = document.getElementById('statsRemoved');
  const elLines = document.getElementById('statsLines');
  const elAdd = document.getElementById('statsAdded');

  if (!bar) return;

  if (added === 0 && removed === 0) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'flex';
  elRem.innerHTML = `<span class="stat-rem">− ${removed} removal${removed !== 1 ? 's' : ''}</span>`;
  elLines.innerHTML = `<span class="stat-lines">${totalLines} lines</span>`;
  elAdd.innerHTML = `<span class="stat-add">+ ${added} addition${added !== 1 ? 's' : ''}</span>`;
}

function diffTable(rows, heads) {
  const ths = heads.map(([cls, label]) =>
    `<th${cls ? ` class="${cls}"` : ''}>${label}</th>`).join('');
  return `<table class="diff-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
}

function createSplitDiff(oldText, newText, ignoreWS) {
  const changes = Diff.diffLines(oldText, newText, { ignoreWhitespace: ignoreWS });
  let rows = '', addCount = 0, removeCount = 0, oldLine = 1, newLine = 1, i = 0;

  while (i < changes.length) {
    const c = changes[i];
    if (c.removed) {
      removeCount++;
      const next = changes[i + 1];
      if (next?.added) {
        addCount++;
        const L = c.value.replace(/\n$/, '').split('\n');
        const R = next.value.replace(/\n$/, '').split('\n');
        for (let j = 0; j < Math.max(L.length, R.length); j++) {
          const hasL = L[j] !== undefined, hasR = R[j] !== undefined;
          let leftContent = hasL ? escapeHtml(L[j]) : '';
          let rightContent = hasR ? escapeHtml(R[j]) : '';
          if (hasL && hasR) {
            const il = inlineDiff(L[j], R[j]);
            leftContent = il.oldHtml;
            rightContent = il.newHtml;
          }
          rows += `<tr>
            <td class="ln removed-gutter">${hasL ? oldLine++ : ''}</td>
            <td class="${hasL ? 'removed' : 'empty'}">${leftContent}</td>
            <td class="ln added-gutter">${hasR ? newLine++ : ''}</td>
            <td class="${hasR ? 'added' : 'empty'}">${rightContent}</td>
          </tr>`;
        }
        i += 2;
      } else {
        c.value.replace(/\n$/, '').split('\n').forEach(line => {
          rows += `<tr>
            <td class="ln removed-gutter">${oldLine++}</td>
            <td class="removed">${escapeHtml(line)}</td>
            <td class="ln"></td><td class="empty"></td>
          </tr>`;
        });
        i++;
      }
    } else if (c.added) {
      addCount++;
      c.value.replace(/\n$/, '').split('\n').forEach(line => {
        rows += `<tr>
          <td class="ln"></td><td class="empty"></td>
          <td class="ln added-gutter">${newLine++}</td>
          <td class="added">${escapeHtml(line)}</td>
        </tr>`;
      });
      i++;
    } else {
      c.value.replace(/\n$/, '').split('\n').forEach(line => {
        const e = escapeHtml(line);
        rows += `<tr>
          <td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td>
          <td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td>
        </tr>`;
      });
      i++;
    }
  }

  updateStats(addCount, removeCount, Math.max(oldLine - 1, newLine - 1));
  if (!addCount && !removeCount)
    return `<div class="no-diff">✅ No differences found. Both texts are identical.</div>`;

  return diffTable(rows, [['ln-head', ''], ['', 'Original Text'], ['ln-head', ''], ['', 'Changed Text']]);
}

function createUnifiedDiff(oldText, newText, ignoreWS) {
  const changes = Diff.diffLines(oldText, newText, { ignoreWhitespace: ignoreWS });
  let rows = '', addCount = 0, removeCount = 0, oldLine = 1, newLine = 1, i = 0;

  while (i < changes.length) {
    const c = changes[i];
    if (c.removed) {
      removeCount++;
      const next = changes[i + 1];
      const remLines = c.value.replace(/\n$/, '').split('\n');
      if (next?.added) {
        addCount++;
        const addLines = next.value.replace(/\n$/, '').split('\n');
        remLines.forEach((line, idx) => {
          const paired = addLines[idx];
          const html = paired !== undefined ? inlineDiff(line, paired).oldHtml : escapeHtml(line);
          rows += `<tr>
            <td class="ln removed-gutter">${oldLine++}</td>
            <td class="ln removed-gutter"></td>
            <td class="sign removed-gutter">−</td>
            <td class="removed">${html}</td>
          </tr>`;
        });
        addLines.forEach((line, idx) => {
          const paired = remLines[idx];
          const html = paired !== undefined ? inlineDiff(paired, line).newHtml : escapeHtml(line);
          rows += `<tr>
            <td class="ln added-gutter"></td>
            <td class="ln added-gutter">${newLine++}</td>
            <td class="sign added-gutter">+</td>
            <td class="added">${html}</td>
          </tr>`;
        });
        i += 2;
      } else {
        remLines.forEach(line => {
          rows += `<tr>
            <td class="ln removed-gutter">${oldLine++}</td>
            <td class="ln removed-gutter"></td>
            <td class="sign removed-gutter">−</td>
            <td class="removed">${escapeHtml(line)}</td>
          </tr>`;
        });
        i++;
      }
    } else if (c.added) {
      addCount++;
      c.value.replace(/\n$/, '').split('\n').forEach(line => {
        rows += `<tr>
          <td class="ln added-gutter"></td>
          <td class="ln added-gutter">${newLine++}</td>
          <td class="sign added-gutter">+</td>
          <td class="added">${escapeHtml(line)}</td>
        </tr>`;
      });
      i++;
    } else {
      c.value.replace(/\n$/, '').split('\n').forEach(line => {
        rows += `<tr>
          <td class="ln context-gutter">${oldLine++}</td>
          <td class="ln context-gutter">${newLine++}</td>
          <td class="sign context-gutter"></td>
          <td class="context">${escapeHtml(line)}</td>
        </tr>`;
      });
      i++;
    }
  }

  updateStats(addCount, removeCount, Math.max(oldLine - 1, newLine - 1));
  if (!addCount && !removeCount)
    return `<div class="no-diff">✅ No differences found. Both texts are identical.</div>`;

  return diffTable(rows, [['ln-head', 'Old'], ['ln-head', 'New'], ['ln-head', ''], ['', 'Unified View']]);
}

function runDiff() {
  const oldText = document.getElementById('oldText').value;
  const newText = document.getElementById('newText').value;
  const ignoreWS = document.getElementById('ignoreWhitespace').checked;
  const output = document.getElementById('diffOutput');
  const wrapper = document.getElementById('outputWrapper');

  if (!oldText.trim() && !newText.trim()) {
    wrapper.style.display = 'block';
    output.innerHTML = `<div class="no-diff">⚠️ Please paste text into both panels before comparing.</div>`;
    updateStats(0, 0, 0);
    return;
  }

  try {
    const mode = document.querySelector('.mode-btn.active').dataset.mode;
    wrapper.style.display = 'block';
    output.innerHTML = mode === 'split'
      ? createSplitDiff(oldText, newText, ignoreWS)
      : createUnifiedDiff(oldText, newText, ignoreWS);

    document.body.classList.add('compact');
  } catch (err) {
    wrapper.style.display = 'block';
    output.innerHTML = `<div class="no-diff" style="color:var(--removed-text);background:var(--removed-bg);border-color:var(--removed-text);">❌ An error occurred while computing the diff. The text might be too large or complex.</div>`;
    console.error('Diff error:', err);
  }
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (document.getElementById('diffOutput').innerHTML.trim()) runDiff();
  });
});

document.getElementById('ignoreWhitespace').addEventListener('change', () => {
  if (document.getElementById('diffOutput').innerHTML.trim()) runDiff();
});

document.getElementById('compareBtn').addEventListener('click', runDiff);

document.getElementById('clearBtn').addEventListener('click', () => {
  ['oldText', 'newText'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('diffOutput').innerHTML = '';
  document.getElementById('outputWrapper').style.display = 'none';
  document.getElementById('statsBar').style.display = 'none';
  document.body.classList.remove('compact');
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('oldText').value;
  if (!text.trim()) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    const origHTML = btn.innerHTML;
    btn.innerHTML = '✔ Copied!';
    btn.style.color = 'var(--added-text)';
    setTimeout(() => { btn.innerHTML = origHTML; btn.style.color = ''; }, 1500);
  });
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const oldText = document.getElementById('oldText').value;
  const newText = document.getElementById('newText').value;
  const ignoreWS = document.getElementById('ignoreWhitespace').checked;
  if (!oldText.trim() && !newText.trim()) return;

  const changes = Diff.diffLines(oldText, newText, { ignoreWhitespace: ignoreWS });
  const lines = changes.map(c => {
    const prefix = c.added ? '+' : c.removed ? '-' : ' ';
    return c.value.trimEnd().split('\n').map(l => prefix + l).join('\n');
  }).join('\n');

  const blob = new Blob([lines], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'diff-output.diff';
  a.click();
  URL.revokeObjectURL(url);
});

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
let savedTheme = localStorage.getItem('dc-theme');
if (!savedTheme) {
  // Sistem temasını kontrol et
  savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  themeBtn.innerHTML = next === 'dark' ? sunIcon : moonIcon;
  localStorage.setItem('dc-theme', next);
});

// About modal
const modal = document.getElementById('aboutModal');
const aboutBtn = document.getElementById('aboutBtn');
const modalClose = document.getElementById('modalClose');

aboutBtn.addEventListener('click', () => modal.classList.add('open'));
modalClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });