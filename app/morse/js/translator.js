function textToMorse(text) {
  let processedText = text.toLocaleUpperCase('tr-TR');
  if (normalizeTurkish) {
    processedText = processedText.split('').map(ch => TURKISH_NORMALIZER[ch] || ch).join('');
  }
  return processedText.split('').map(ch => {
    if (ch === ' ') return '/';
    return MORSE[ch] || '?';
  }).join(' ');
}

function morseToText(morse) {
  return morse.trim().split(' / ').map(word =>
    word.split(' ').map(code => MORSE_REVERSE[code] || '?').join('')
  ).join(' ');
}

function renderColoredMorse(morse) {
  return morse.split('').map(ch => {
    if (ch === '.') return `<span class="morse-dot">.</span>`;
    if (ch === '-') return `<span class="morse-dash">-</span>`;
    if (ch === '/') return `<span class="morse-space"> / </span>`;
    return ch;
  }).join('');
}
