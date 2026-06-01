function changeLang(lang) {
  if (lang !== 'tr' && lang !== 'en') return;
  currentLang = lang;
  
  // HTML lang attribute
  document.documentElement.lang = lang;
  
  // Dil butonlarının aktifliğini güncelle
  document.getElementById('langTr').classList.toggle('active', lang === 'tr');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');
  
  const trans = TRANSLATIONS[lang];
  
  // Metinleri Güncelle
  document.getElementById('appTitle').innerHTML = trans.title;
  document.getElementById('appSubtitle').textContent = trans.subtitle;
  document.getElementById('textInputLabel').innerHTML = `<div class="dot-indicator"></div> ${trans.textInputLabel}`;
  document.getElementById('morseOutputLabel').innerHTML = `<div class="dot-indicator"></div> ${trans.morseOutputLabel}`;
  
  document.getElementById('lblWpm').textContent = `${trans.labelWpm}: ${wpm}`;
  document.getElementById('lblFreq').textContent = `${trans.labelFreq}: ${freq}`;
  document.getElementById('lblNormalize').textContent = trans.optTurkishNormalize;
  
  document.getElementById('kBtnSpace').textContent = trans.keyboardSpace;
  document.getElementById('kBtnWord').textContent = trans.keyboardWord;
  
  document.getElementById('lblStatChar').textContent = trans.statChar;
  document.getElementById('lblStatWord').textContent = trans.statWord;
  document.getElementById('lblStatSymbols').textContent = trans.statSymbols;
  document.getElementById('lblStatTime').textContent = trans.statTime;
  
  document.getElementById('visualLabel').textContent = trans.visualLabel;
  document.getElementById('refTitle').textContent = trans.refHeader;
  
  // Buton metinlerini güncelle
  const copyBtn = document.getElementById('copyBtn');
  const playBtn = document.getElementById('playBtn');
  const swapBtn = document.getElementById('swapBtn');
  const clearBtn = document.getElementById('clearBtn');
  
  copyBtn.innerHTML = `<span class="btn-icon">⊕</span> ${isReversed ? trans.btnCopyText : trans.btnCopyMorse}`;
  
  if (isPlaying) {
    playBtn.textContent = trans.btnStop;
  } else {
    playBtn.innerHTML = `<span class="btn-icon">▶</span> ${isReversed ? trans.btnListenMorse : trans.btnListen}`;
  }
  
  swapBtn.innerHTML = `<span class="btn-icon">⇄</span> ${trans.btnSwap}`;
  clearBtn.innerHTML = `✕ ${trans.btnClear}`;
  
  // Textarea placeholder
  const input = document.getElementById('textInput');
  input.placeholder = isReversed ? trans.placeholderMorse : trans.placeholderText;
  
  // Referans tablosunu yeniden oluştur (Dil değişince başlık bilgileri değişir)
  const grid = document.getElementById('refGrid');
  grid.innerHTML = '';
  buildRef();
}

function updateWpm(val) {
  wpm = parseInt(val);
  const trans = TRANSLATIONS[currentLang];
  document.getElementById('lblWpm').textContent = `${trans.labelWpm}: ${wpm}`;
  
  // İstatistikleri ve süreyi anında güncellemek için input event'i tetikle
  document.getElementById('textInput').dispatchEvent(new Event('input'));
}

function updateFreq(val) {
  freq = parseInt(val);
  const trans = TRANSLATIONS[currentLang];
  document.getElementById('lblFreq').textContent = `${trans.labelFreq}: ${freq}`;
}

function toggleNormalize(checked) {
  normalizeTurkish = checked;
  // Çeviriyi anında güncellemek için input event'i tetikle
  document.getElementById('textInput').dispatchEvent(new Event('input'));
}

function swapMode() {
  if (isPlaying) {
    stopPlayback = true;
    if (activeOscillator) {
      try { activeOscillator.stop(); } catch (e) {}
    }
  }

  isReversed = !isReversed;
  const input = document.getElementById('textInput');
  const output = document.getElementById('morseOutput');
  const morsKeyboard = document.getElementById('morsKeyboard');
  const normalizeContainer = document.getElementById('normalizeContainer');
  const trans = TRANSLATIONS[currentLang];

  if (isReversed) {
    input.placeholder = trans.placeholderMorse;
    output.style.color = 'var(--text)';
    input.style.color = 'var(--accent)';
    morsKeyboard.style.display = 'flex';
    normalizeContainer.style.display = 'none'; // Mors modunda normalleştirme gerekmez
    showToast(trans.toastModeMorse);
  } else {
    input.placeholder = trans.placeholderText;
    output.style.color = 'var(--accent)';
    input.style.color = '#fff';
    morsKeyboard.style.display = 'none';
    normalizeContainer.style.display = 'flex'; // Metin modunda göster
    showToast(trans.toastModeText);
  }

  input.value = '';
  output.innerHTML = '—';
  document.getElementById('visualTrack').innerHTML = '';
  updateStats('', '');
  
  // Buton etiketlerini güncelle
  changeLang(currentLang);
}

function insertMorse(sym) {
  const input = document.getElementById('textInput');
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.substring(0, start) + sym + input.value.substring(end);
  input.selectionStart = input.selectionEnd = start + sym.length;
  input.dispatchEvent(new Event('input'));
  input.focus();
}

function backspaceMorse() {
  const input = document.getElementById('textInput');
  const start = input.selectionStart;
  const end = input.selectionEnd;
  if (start === end && start > 0) {
    input.value = input.value.substring(0, start - 1) + input.value.substring(end);
    input.selectionStart = input.selectionEnd = start - 1;
  } else if (start !== end) {
    input.value = input.value.substring(0, start) + input.value.substring(end);
    input.selectionStart = input.selectionEnd = start;
  }
  input.dispatchEvent(new Event('input'));
  input.focus();
}

function copyMorse() {
  const output = document.getElementById('morseOutput').textContent;
  const trans = TRANSLATIONS[currentLang];
  if (!output || output === '—') { showToast(trans.toastTypeFirst); return; }
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(output)
      .then(() => showToast(trans.toastCopied))
      .catch(() => fallbackCopy(output));
  } else {
    fallbackCopy(output);
  }
}

function fallbackCopy(text) {
  const trans = TRANSLATIONS[currentLang];
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) showToast(trans.toastCopied);
    else showToast(trans.toastFailedCopy);
  } catch (err) {
    showToast(trans.toastFailedCopy);
  }
  document.body.removeChild(textArea);
}

function clearAll() {
  document.getElementById('textInput').value = '';
  document.getElementById('morseOutput').innerHTML = '—';
  document.getElementById('visualTrack').innerHTML = '';
  updateStats('', '');
  stopPlayback = true;
  if (activeOscillator) {
    try { activeOscillator.stop(); } catch (e) {}
  }
  // Sesi hemen kesince durum butonlarını resetle
  setTimeout(() => changeLang(currentLang), 50);
}

function updateStats(text, morse) {
  const chars = text.replace(/\s/g,'').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const symbols = (morse.match(/[.\-]/g) || []).length;
  
  // WPM tabanlı dinamik sinyal süresi hesabı (saniye cinsinden)
  const dotTime = 1.2 / wpm; // 1 unit
  let time = 0;
  for (const ch of morse) {
    if (ch === '.') time += dotTime * 2;       // dot (1 unit) + gap (1 unit)
    else if (ch === '-') time += dotTime * 4;  // dash (3 units) + gap (1 unit)
    else if (ch === ' ') time += dotTime * 3;  // char gap (3 units)
    else if (ch === '/') time += dotTime * 7;  // word gap (7 units)
  }
  
  document.getElementById('charCount').textContent = chars;
  document.getElementById('wordCount').textContent = words;
  document.getElementById('symbolCount').textContent = symbols;
  document.getElementById('signalTime').textContent = time.toFixed(1) + 's';
}

function renderVisual(morse) {
  const track = document.getElementById('visualTrack');
  track.innerHTML = '';
  if (!morse || morse === '—') return;

  const maxSymbols = 1000;
  let symbolCount = 0;
  const fragment = document.createDocumentFragment();

  const words = morse.split(' / ');
  for (let wi = 0; wi < words.length; wi++) {
    const chars = words[wi].split(' ');
    for (let ci = 0; ci < chars.length; ci++) {
      const codeArray = chars[ci].split('');
      for (let si = 0; si < codeArray.length; si++) {
        const sym = codeArray[si];
        if (sym === '.' || sym === '-') {
          const el = document.createElement('div');
          el.className = sym === '.' ? 'mv-dot' : 'mv-dash';
          fragment.appendChild(el);
          symbolCount++;
        }
        if (symbolCount > maxSymbols) break;
      }
      if (symbolCount > maxSymbols) break;
      
      if (ci < chars.length - 1) {
        const gap = document.createElement('div');
        gap.className = 'mv-char-gap';
        fragment.appendChild(gap);
      }
    }
    if (symbolCount > maxSymbols) break;

    if (wi < words.length - 1) {
      const wg = document.createElement('div');
      wg.className = 'mv-word-gap';
      fragment.appendChild(wg);
    }
  }

  if (symbolCount > maxSymbols) {
    const overflow = document.createElement('div');
    overflow.className = 'visual-morse-label';
    overflow.style.marginLeft = '12px';
    overflow.style.alignSelf = 'center';
    overflow.textContent = '... (Limit 1000)';
    fragment.appendChild(overflow);
  }

  track.appendChild(fragment);
  track.scrollLeft = 0; // Başlangıçta sola hizalı kalsın
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function toggleRef() {
  const header = document.getElementById('refHeader');
  const body = document.getElementById('refBody');
  header.classList.toggle('open');
  body.classList.toggle('open');
}

function buildRef() {
  const grid = document.getElementById('refGrid');
  const clickToInsertText = currentLang === 'tr' ? 'eklemek için tıklayın' : 'click to insert';
  
  Object.entries(MORSE).forEach(([ch, code]) => {
    const item = document.createElement('div');
    item.className = 'ref-item';
    item.innerHTML = `<span class="ref-char">${ch}</span><span class="ref-code">${code}</span>`;
    item.onclick = () => {
      const ta = document.getElementById('textInput');
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      let textToInsert = '';
      
      let processedCh = ch;
      if (normalizeTurkish && !isReversed) {
        processedCh = TURKISH_NORMALIZER[ch] || ch;
      }
      
      if (!isReversed) {
        textToInsert = processedCh;
      } else {
        const valBefore = ta.value.substring(0, start);
        if (valBefore && !valBefore.endsWith(' ')) {
          textToInsert = ' ';
        }
        textToInsert += code + ' ';
      }
      ta.value = ta.value.substring(0, start) + textToInsert + ta.value.substring(end);
      ta.selectionStart = ta.selectionEnd = start + textToInsert.length;
      ta.dispatchEvent(new Event('input'));
      ta.focus();
    };
    item.title = `${ch} = ${code} (${clickToInsertText})`;
    grid.appendChild(item);
  });
}
