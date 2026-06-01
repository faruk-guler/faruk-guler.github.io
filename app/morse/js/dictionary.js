const MORSE = {
  'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---',
  'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
  'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',
  ':':'---...','=':'-...-','+':'.-.-.','@':'.--.-.','_':'..--.-','"':'.-..-.','$':'...-..-',
  'Ç':'-.-..','Ğ':'--.-.','İ':'..-..','Ö':'---.','Ş':'----','Ü':'..--'
};

const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k,v]) => [v,k]));

const TURKISH_NORMALIZER = {
  'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
};

const TRANSLATIONS = {
  tr: {
    title: "MOR<span>SE</span> KODU",
    subtitle: "Metin → Mors Kodu Dönüştürücü",
    textInputLabel: "Metin Girişi",
    morseOutputLabel: "Mors Çıktısı",
    placeholderText: "Mesajınızı buraya yazın...",
    placeholderMorse: "· · · — — — · · · Mors kodunu buraya yazın...",
    btnCopyMorse: "⊕ Mors Kopyala",
    btnCopyText: "⊕ Metin Kopyala",
    btnListen: "▶ Dinle",
    btnListenMorse: "▶ Mors Dinle",
    btnStop: "■ Durdur",
    btnSwap: "⇄ Değiştir",
    btnClear: "✕ Temizle",
    statChar: "Karakter",
    statWord: "Kelime",
    statSymbols: "Mors Sembolü",
    statTime: "Sinyal Süresi",
    visualLabel: "⬡ Görsel Sinyal Gösterimi",
    refHeader: "⊞ Mors Kodu Referans Tablosu",
    toastCopied: "PANOYA KOPYALANDI ✓",
    toastFailedCopy: "KOPYALAMA BAŞARISIZ",
    toastTypeFirst: "Önce bir şeyler yazın!",
    toastModeMorse: "MORS → METİN MODU",
    toastModeText: "METİN → MORS MODU",
    keyboardSpace: "Boşluk (Karakter Arası)",
    keyboardWord: "/ (Kelime Arası)",
    optTurkishNormalize: "Türkçe karakterleri dönüştür (Ç->C, Ş->S vb.)",
    labelWpm: "Hız (WPM)",
    labelFreq: "Ton (Hz)"
  },
  en: {
    title: "MOR<span>SE</span> CODE",
    subtitle: "Text → Morse Code Converter",
    textInputLabel: "Text Input",
    morseOutputLabel: "Morse Output",
    placeholderText: "Type your message here...",
    placeholderMorse: "· · · — — — · · · Type morse code here...",
    btnCopyMorse: "⊕ Copy Morse",
    btnCopyText: "⊕ Copy Text",
    btnListen: "▶ Listen",
    btnListenMorse: "▶ Listen Morse",
    btnStop: "■ Stop",
    btnSwap: "⇄ Swap",
    btnClear: "✕ Clear",
    statChar: "Characters",
    statWord: "Words",
    statSymbols: "Morse Symbols",
    statTime: "Signal Time",
    visualLabel: "⬡ Visual Signal Representation",
    refHeader: "⊞ Morse Code Reference Table",
    toastCopied: "COPIED TO CLIPBOARD ✓",
    toastFailedCopy: "FAILED TO COPY",
    toastTypeFirst: "Type something first!",
    toastModeMorse: "MORSE → TEXT MODE",
    toastModeText: "TEXT → MORSE MODE",
    keyboardSpace: "Space (Char Gap)",
    keyboardWord: "/ (Word Gap)",
    optTurkishNormalize: "Normalize Turkish characters (Ç->C, Ş->S etc.)",
    labelWpm: "Speed (WPM)",
    labelFreq: "Tone (Hz)"
  }
};

// Global Durum Değişkenleri (State)
let isReversed = false;
let audioCtx = null;
let isPlaying = false;
let stopPlayback = false;
let activeOscillator = null; // Anlık ses kesme (Stop Latency) için aktif osilatör referansı
let currentLang = 'tr'; // Varsayılan olarak Türkçe başlasın (Kullanıcı tercihi)
let wpm = 15;
let freq = 700;
let normalizeTurkish = false;

