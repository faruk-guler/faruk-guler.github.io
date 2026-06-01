async function playMorse() {
  if (isPlaying) {
    stopPlayback = true;
    if (activeOscillator) {
      try { activeOscillator.stop(); } catch (e) {}
    }
    // Tüm görsel parlamaları hemen temizle
    document.querySelectorAll('#visualTrack .mv-dot, #visualTrack .mv-dash').forEach(el => el.classList.remove('active'));
    return;
  }

  let morse = '';
  if (isReversed) {
    morse = document.getElementById('textInput').value;
  } else {
    morse = document.getElementById('morseOutput').textContent;
  }

  if (!morse || morse === '—' || !/[.\-]/.test(morse)) {
    showToast(TRANSLATIONS[currentLang].toastTypeFirst);
    return;
  }

  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }

  isPlaying = true;
  stopPlayback = false;
  const btn = document.getElementById('playBtn');
  btn.textContent = TRANSLATIONS[currentLang].btnStop;
  btn.classList.add('is-playing');

  // Görsel parlatma için elementleri seç
  const visualElements = Array.from(document.querySelectorAll('#visualTrack .mv-dot, #visualTrack .mv-dash'));
  let symbolIndex = 0;

  // Çalmaya başlamadan önce tüm aktif sınıflarını temizle
  visualElements.forEach(el => el.classList.remove('active'));

  for (const ch of morse) {
    if (stopPlayback) break;
    
    // WPM tabanlı dinamik süreleri ve frekansı her adımda dinamik oku (Anlık slider tepkisi için)
    const currentDot = 1200 / wpm;
    const currentDash = currentDot * 3;
    const currentGap = currentDot;
    const currentCharGap = currentDot * 3;
    const currentWordGap = currentDot * 7;
    
    if (ch === '.' || ch === '-') {
      const activeEl = visualElements[symbolIndex];
      if (activeEl) {
        activeEl.classList.add('active');
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      if (ch === '.') {
        await beep(currentDot, freq);
      } else {
        await beep(currentDash, freq);
      }

      if (activeEl) {
        activeEl.classList.remove('active');
      }
      
      symbolIndex++;
      await sleep(currentGap);
    } 
    else if (ch === ' ') {
      await sleep(currentCharGap);
    } 
    else if (ch === '/') {
      await sleep(currentWordGap);
    }
  }


  // Bittiğinde veya durdurulduğunda temizle
  visualElements.forEach(el => el.classList.remove('active'));

  isPlaying = false;
  activeOscillator = null;
  btn.innerHTML = `<span class="btn-icon">▶</span> ${isReversed ? TRANSLATIONS[currentLang].btnListenMorse : TRANSLATIONS[currentLang].btnListen}`;
  btn.classList.remove('is-playing');
}

function beep(duration, frequency) {
  return new Promise(resolve => {
    if (stopPlayback) {
      resolve();
      return;
    }
    const osc = audioCtx.createOscillator();
    activeOscillator = osc;
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = frequency;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.005);
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime + duration/1000 - 0.005);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration/1000);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration/1000);
    
    osc.onended = () => {
      activeOscillator = null;
      resolve();
    };
  });
}

// Anında kesilebilir uyku motoru (10ms çözünürlüklü)
async function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    if (stopPlayback) return;
    await new Promise(r => setTimeout(r, 10));
  }
}
