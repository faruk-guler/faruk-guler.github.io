document.getElementById('textInput').addEventListener('input', function() {
  const val = this.value;
  if (isReversed) {
    // Gelişmiş temizleme: Çift slash'leri temizle, baştaki ve sondaki slash'leri uçur
    const normalizedVal = val
      .replace(/(\s*\/\s*)+/g, ' / ')
      .trim()
      .replace(/^\/|\/$/g, '')
      .trim();
      
    const text = normalizedVal ? morseToText(normalizedVal) : '—';
    document.getElementById('morseOutput').innerHTML = text;
    updateStats(text === '—' ? '' : text, normalizedVal);
    renderVisual(normalizedVal);
  } else {
    const normalizedText = val.replace(/\s+/g, ' ').trim();
    const morse = normalizedText ? textToMorse(normalizedText) : '—';
    document.getElementById('morseOutput').innerHTML = normalizedText ? renderColoredMorse(morse) : '—';
    updateStats(normalizedText, morse);
    renderVisual(normalizedText ? morse : '');
  }
});

// Başlangıçta dil ayarlarını uygula (Türkçe varsayılan)
changeLang(currentLang);
