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
  let addCount = 0, removeCount = 0, oldLine = 1, newLine = 1, i = 0;
  const rows = [];

  while (i < changes.length) {
    const c = changes[i];
    if (c.removed) {
      removeCount += c.count || 1;
      const next = changes[i + 1];
      if (next?.added) {
        addCount += next.count || 1;
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
          rows.push(`<tr>
            <td class="ln removed-gutter">${hasL ? oldLine++ : ''}</td>
            <td class="${hasL ? 'removed' : 'empty'}">${leftContent}</td>
            <td class="ln added-gutter">${hasR ? newLine++ : ''}</td>
            <td class="${hasR ? 'added' : 'empty'}">${rightContent}</td>
          </tr>`);
        }
        i += 2;
      } else {
        c.value.replace(/\n$/, '').split('\n').forEach(line => {
          rows.push(`<tr>
            <td class="ln removed-gutter">${oldLine++}</td>
            <td class="removed">${escapeHtml(line)}</td>
            <td class="ln"></td><td class="empty"></td>
          </tr>`);
        });
        i++;
      }
    } else if (c.added) {
      addCount += c.count || 1;
      c.value.replace(/\n$/, '').split('\n').forEach(line => {
        rows.push(`<tr>
          <td class="ln"></td><td class="empty"></td>
          <td class="ln added-gutter">${newLine++}</td>
          <td class="added">${escapeHtml(line)}</td>
        </tr>`);
      });
      i++;
    } else {
      const isHide = document.getElementById('hideUnchanged').checked;
      const lines = c.value.replace(/\n$/, '').split('\n');
      const isFirstBlock = i === 0;
      const isLastBlock = i === changes.length - 1;

      if (isHide && lines.length > 6) {
        // Eğer ilk bloksa, sadece "alt" (bottom) 3 satır context olarak gösterilmeli, üst taraf gizlenmeli
        if (isFirstBlock) {
          const hiddenCount = lines.length - 3;
          rows.push(`<tr class="folded-row" data-lines="${hiddenCount}"><td colspan="4">... ${hiddenCount} unchanged lines hidden ...</td></tr>`);

          lines.slice(0, -3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr class="hidden-line"><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });

          lines.slice(-3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });
        }
        // Eğer son bloksa, sadece "üst" (top) 3 satır context olarak gösterilmeli, alt taraf tamamen gizlenmeli
        else if (isLastBlock) {
          lines.slice(0, 3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });

          const hiddenCount = lines.length - 3;
          rows.push(`<tr class="folded-row" data-lines="${hiddenCount}"><td colspan="4">... ${hiddenCount} unchanged lines hidden ...</td></tr>`);

          lines.slice(3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr class="hidden-line"><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });
        }
        // Eğer ortada bir bloksa (standart), hem üst 3 hem alt 3 gösterilir
        else {
          lines.slice(0, 3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });

          const hiddenCount = lines.length - 6;
          rows.push(`<tr class="folded-row" data-lines="${hiddenCount}"><td colspan="4">... ${hiddenCount} unchanged lines hidden ...</td></tr>`);

          lines.slice(3, -3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr class="hidden-line"><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });

          lines.slice(-3).forEach(line => {
            const e = escapeHtml(line);
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td><td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td></tr>`);
          });
        }
      } else {
        lines.forEach(line => {
          const e = escapeHtml(line);
          rows.push(`<tr>
            <td class="ln context-gutter">${oldLine++}</td><td class="context">${e}</td>
            <td class="ln context-gutter">${newLine++}</td><td class="context">${e}</td>
          </tr>`);
        });
      }
      i++;
    }
  }

  updateStats(addCount, removeCount, Math.max(oldLine - 1, newLine - 1));
  if (!addCount && !removeCount)
    return `<div class="no-diff">✅ No differences found. Both texts are identical.</div>`;

  return diffTable(rows.join(''), [['ln-head', ''], ['', 'Original Text'], ['ln-head', ''], ['', 'Changed Text']]);
}

function createUnifiedDiff(oldText, newText, ignoreWS) {
  const changes = Diff.diffLines(oldText, newText, { ignoreWhitespace: ignoreWS });
  let addCount = 0, removeCount = 0, oldLine = 1, newLine = 1, i = 0;
  const rows = [];

  while (i < changes.length) {
    const c = changes[i];
    if (c.removed) {
      removeCount += c.count || 1;
      const next = changes[i + 1];
      const remLines = c.value.replace(/\n$/, '').split('\n');
      if (next?.added) {
        addCount += next.count || 1;
        const addLines = next.value.replace(/\n$/, '').split('\n');
        remLines.forEach((line, idx) => {
          const paired = addLines[idx];
          const html = paired !== undefined ? inlineDiff(line, paired).oldHtml : escapeHtml(line);
          rows.push(`<tr>
            <td class="ln removed-gutter">${oldLine++}</td>
            <td class="ln removed-gutter"></td>
            <td class="sign removed-gutter">−</td>
            <td class="removed">${html}</td>
          </tr>`);
        });
        addLines.forEach((line, idx) => {
          const paired = remLines[idx];
          const html = paired !== undefined ? inlineDiff(paired, line).newHtml : escapeHtml(line);
          rows.push(`<tr>
            <td class="ln added-gutter"></td>
            <td class="ln added-gutter">${newLine++}</td>
            <td class="sign added-gutter">+</td>
            <td class="added">${html}</td>
          </tr>`);
        });
        i += 2;
      } else {
        remLines.forEach(line => {
          rows.push(`<tr>
            <td class="ln removed-gutter">${oldLine++}</td>
            <td class="ln removed-gutter"></td>
            <td class="sign removed-gutter">−</td>
            <td class="removed">${escapeHtml(line)}</td>
          </tr>`);
        });
        i++;
      }
    } else if (c.added) {
      addCount += c.count || 1;
      c.value.replace(/\n$/, '').split('\n').forEach(line => {
        rows.push(`<tr>
          <td class="ln added-gutter"></td>
          <td class="ln added-gutter">${newLine++}</td>
          <td class="sign added-gutter">+</td>
          <td class="added">${escapeHtml(line)}</td>
        </tr>`);
      });
      i++;
    } else {
      const isHide = document.getElementById('hideUnchanged').checked;
      const lines = c.value.replace(/\n$/, '').split('\n');
      const isFirstBlock = i === 0;
      const isLastBlock = i === changes.length - 1;

      if (isHide && lines.length > 6) {
        if (isFirstBlock) {
          const hiddenCount = lines.length - 3;
          rows.push(`<tr class="folded-row" data-lines="${hiddenCount}"><td colspan="4">... ${hiddenCount} unchanged lines hidden ...</td></tr>`);

          lines.slice(0, -3).forEach(line => {
            rows.push(`<tr class="hidden-line"><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });

          lines.slice(-3).forEach(line => {
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });
        }
        else if (isLastBlock) {
          lines.slice(0, 3).forEach(line => {
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });

          const hiddenCount = lines.length - 3;
          rows.push(`<tr class="folded-row" data-lines="${hiddenCount}"><td colspan="4">... ${hiddenCount} unchanged lines hidden ...</td></tr>`);

          lines.slice(3).forEach(line => {
            rows.push(`<tr class="hidden-line"><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });
        }
        else {
          lines.slice(0, 3).forEach(line => {
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });

          const hiddenCount = lines.length - 6;
          rows.push(`<tr class="folded-row" data-lines="${hiddenCount}"><td colspan="4">... ${hiddenCount} unchanged lines hidden ...</td></tr>`);

          lines.slice(3, -3).forEach(line => {
            rows.push(`<tr class="hidden-line"><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });

          lines.slice(-3).forEach(line => {
            rows.push(`<tr><td class="ln context-gutter">${oldLine++}</td><td class="ln context-gutter">${newLine++}</td><td class="sign context-gutter"></td><td class="context">${escapeHtml(line)}</td></tr>`);
          });
        }
      } else {
        lines.forEach(line => {
          rows.push(`<tr>
            <td class="ln context-gutter">${oldLine++}</td>
            <td class="ln context-gutter">${newLine++}</td>
            <td class="sign context-gutter"></td>
            <td class="context">${escapeHtml(line)}</td>
          </tr>`);
        });
      }
      i++;
    }
  }

  updateStats(addCount, removeCount, Math.max(oldLine - 1, newLine - 1));
  if (!addCount && !removeCount)
    return `<div class="no-diff">✅ No differences found. Both texts are identical.</div>`;

  return diffTable(rows.join(''), [['ln-head', 'Old'], ['ln-head', 'New'], ['ln-head', ''], ['', 'Unified View']]);
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

    // YENİ EKLENTİ: Eğer halihazırda bir arama kelimesi varsa, HTML yeniden çizildiğinde onu tekrar uygula.
    applySearch();
  } catch (err) {
    wrapper.style.display = 'block';
    output.innerHTML = `<div class="no-diff" style="color:var(--removed-text);background:var(--removed-bg);border-color:var(--removed-text);">❌ An error occurred while computing the diff. The text might be too large or complex.</div>`;
    console.error('Diff error:', err);
  }
}

// YENİ EKLENTİ: Arama fonksiyonunu hem "input" anında hem de tablo yeniden oluşturulduğunda kullanmak için dışarı çıkardık.
function applySearch() {
  const query = document.getElementById('searchDiff').value.toLowerCase();
  const rows = document.querySelectorAll('.diff-table tbody tr:not(.folded-row)');

  rows.forEach(row => {
    row.classList.remove('search-match');
    if (query.trim() === '') return;

    // Sadece tablo html'sinde değil, string değerinde harf araması.
    if (row.textContent.toLowerCase().includes(query)) {
      row.classList.add('search-match');
    }
  });
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

document.getElementById('hideUnchanged').addEventListener('change', () => {
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
  }).catch(err => {
    console.error('Clipboard error:', err);
    alert('Kopyalama başarısız oldu: Panoya erişim engellendi.');
  });
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const oldText = document.getElementById('oldText').value;
  const newText = document.getElementById('newText').value;
  const ignoreWS = document.getElementById('ignoreWhitespace').checked;
  if (!oldText.trim() && !newText.trim()) return;

  const changes = Diff.createTwoFilesPatch("original.txt", "changed.txt", oldText, newText, "", "", { ignoreWhitespace: ignoreWS });

  const blob = new Blob([changes], { type: 'text/plain' });
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

// Sync scroll between oldText and newText areas
const oldPanel = document.getElementById('oldText');
const newPanel = document.getElementById('newText');
let isSyncingLeft = false;
let isSyncingRight = false;

oldPanel.addEventListener('scroll', function () {
  if (!isSyncingLeft) {
    isSyncingRight = true;
    newPanel.scrollTop = this.scrollTop;
  }
  isSyncingLeft = false;
});

newPanel.addEventListener('scroll', function () {
  if (!isSyncingRight) {
    isSyncingLeft = true;
    oldPanel.scrollTop = this.scrollTop;
  }
  isSyncingRight = false;
});

// Swap panels logic
document.getElementById('swapBtn').addEventListener('click', () => {
  const oldText = document.getElementById('oldText');
  const newText = document.getElementById('newText');

  const temp = oldText.value;
  oldText.value = newText.value;
  newText.value = temp;

  // Re-run diff if properties exist
  if (document.getElementById('diffOutput').innerHTML.trim()) runDiff();
});

// Run existing UI functionalities including expanding rows and search
document.getElementById('diffOutput').addEventListener('click', (e) => {
  const foldedRow = e.target.closest('.folded-row');
  if (!foldedRow) return;

  // Find all subsequent .hidden-line elements until next .folded-row or valid row
  let next = foldedRow.nextElementSibling;
  while (next && next.classList.contains('hidden-line')) {
    next.classList.remove('hidden-line');
    next = next.nextElementSibling;
  }
  foldedRow.remove();
});

// Search functionality
document.getElementById('searchDiff').addEventListener('input', applySearch);