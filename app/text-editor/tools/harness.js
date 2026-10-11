// Test harness for index.html (Advanced Text Editor).
// Injected from the browser: <script src="/tools/harness.js"></script>
// Results are read back from window.__TEST__ (status/pass/fail/results/errors).
(function () {
  'use strict';
  if (window.__TEST__) { window.__TEST__.status = 'double-injection-blocked'; return; }

  var ta = document.getElementById('girilenMetin');
  var statsEl = document.getElementById('metinBilgisi');
  var ALL_ERRORS = [];
  var STALE_STATS = [];
  var OUT = { status: 'running', pass: 0, fail: 0, info: 0, results: [], errors: ALL_ERRORS };
  window.__TEST__ = OUT;

  window.addEventListener('error', function (e) {
    ALL_ERRORS.push('onerror: ' + (e.message || 'unknown') + ' @ ' + (e.filename || '') + ':' + (e.lineno || ''));
  });
  window.addEventListener('unhandledrejection', function (e) {
    ALL_ERRORS.push('unhandledrejection: ' + e.reason);
  });

  var ALERTS = [];
  var BEKLEYEN = 0; // async checks still running
  var TIKLANAN = {}; // which controls a behavioural test actually exercised
  window.alert = function (m) { ALERTS.push(String(m)); };

  // Stable identity for a control, used by the coverage audit.
  function anahtar(e) {
    if (e.id) { return '#' + e.id; }
    var ip = e.getAttribute('tip') || e.getAttribute('harfduyarli') || e.getAttribute('satirbasikoru') || '';
    var hedef = e.getAttribute('data-target') || '';
    var sinif = (typeof e.className === 'string' ? e.className : '').split(' ')[0];
    return (sinif ? '.' + sinif : String(e.tagName).toLowerCase()) +
      (ip ? '[' + ip + ']' : '') + (hedef ? '[' + hedef + ']' : '') + ':' + (e.textContent || '').trim().slice(0, 18);
  }
  function isaretle(e) { if (e) { TIKLANAN[anahtar(e)] = (TIKLANAN[anahtar(e)] || 0) + 1; } return e; }

  // Record every click, whichever code path performs it, so the coverage
  // audit cannot be fooled by tests that call element.click() directly.
  var GERCEK_TIK = HTMLElement.prototype.click;
  HTMLElement.prototype.click = function () {
    isaretle(this);
    return GERCEK_TIK.apply(this, arguments);
  };

  function esc(s) { try { return JSON.stringify(s); } catch (e) { return String(s); } }
  // Source of the app script, read once so dead-code checks can inspect it.
  function readSource(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url + '?ts=' + Date.now(), false);
      xhr.send();
      return xhr.status === 200 ? xhr.responseText : '';
    } catch (e) { return ''; }
  }
  var SRC_METIN = readSource('/ay/js/metin.js');
  var SRC_HTML = readSource('/index.html');
  function statsText() { return statsEl.textContent.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim(); }
  function setVal(v) {
    ta.value = v;
    if (typeof metinBilgisi === 'function') { metinBilgisi(); }
    ALERTS.length = 0;
  }
  function el(sel, i) {
    var list = document.querySelectorAll(sel);
    return list.length ? list[i || 0] : null;
  }
  function click(sel, i) {
    var e = el(sel, i);
    if (!e) { throw new Error('selector bulunamadi: ' + sel + '[' + (i || 0) + ']'); }
    isaretle(e);
    e.click();
    return e;
  }

  function record(name, ok, expected, actual, extra) {
    OUT.results.push({ n: name, ok: ok, exp: expected, act: actual, x: extra || '' });
    if (ok === null) { OUT.info++; } else if (ok) { OUT.pass++; } else { OUT.fail++; }
  }

  // Fresh text -> action -> compare textarea value. expected===null means "informational".
  function op(name, input, action, expected) {
    setVal(input);
    var errMark = ALL_ERRORS.length;
    var thrown = '';
    try { action(); } catch (e) { thrown = 'THROWN: ' + e.message; }
    var actual = ta.value;
    var newErrs = ALL_ERRORS.slice(errMark).join(' | ');
    var alertTxt = ALERTS.slice().join(' | ');
    var m = /(\d+) karakter/.exec(statsText());
    if (expected !== null && m && Number(m[1]) !== actual.length) { STALE_STATS.push(name); }
    if (expected === null) {
      record(name, null, 'bilgi', esc({ act: actual, err: newErrs, alert: alertTxt, stats: statsText() }));
      return;
    }
    var ok = !thrown && !newErrs && actual === expected;
    record(name, ok, esc(expected), esc(actual),
      (thrown ? thrown + ' ' : '') + (newErrs ? 'ERR> ' + newErrs + ' ' : '') + (alertTxt ? 'ALERT> ' + alertTxt : ''));
  }

  function opAlert(name, input, action, expectedAlert) {
    setVal(input);
    var errMark = ALL_ERRORS.length;
    try { action(); } catch (e) { /* recorded below */ }
    var got = ALERTS.slice().join(' | ');
    record(name, !ALL_ERRORS.slice(errMark).length && got === expectedAlert, 'alert=' + esc(expectedAlert), 'alert=' + esc(got));
  }

  function noop(name, fn) {
    try { fn(); } catch (e) { record(name, false, 'hata yok', 'THROWN: ' + e.message); }
  }

  var BUL = 'button[onclick="bulDegistir();"]';
  var EKLE = 'button[onclick="bsMetinEkle();"]';

  // After an operation the info line must be recomputed. Stale state is detected by
  // poisoning the line with BAYAT and checking that the handler replaced it.
  var FRESH = [
    ['harf: buyuk', function () { click('#btn_hepsiBuyuk'); }],
    ['harf: kucuk', function () { click('#btn_hepsiKucuk'); }],
    ['harf: cumle', function () { click('#btn_cumleBuyuk'); }],
    ['harf: kelime', function () { click('#btn_kelimeBuyuk'); }],
    ['sil: bosluk', function () { click('#btn_boslukSil'); }],
    ['sil: html', function () { click('.btn_HtmlEtiketleriniSil', 0); }],
    ['sil: tekrar', function () { click('.btn_tekrarlayanSatirlariSil', 0); }],
    ['sirala: alfabetik', function () { click('.btn_sirala[tip=alfabetik]'); }],
    ['sirala: dogal', function () { click('.btn_sirala[tip=dogal]'); }],
    ['sil: bos satir', function () { click('#btn_bosSatirSil'); }],
    ['sil: gorunmez', function () { click('#btn_gorunmezSil'); }],
    ['sil: satir sonu', function () { click('#btn_satirSonuNormalize'); }],
    ['kolon sirala', function () { click('#btn_kolonSirala'); }],
    ['sirala: uzunluk', function () { click('.btn_sirala[tip=uzunluk]'); }],
    ['sirala: ters', function () { click('.btn_sirala[tip=ters]'); }],
    ['sirala: rastgele', function () { click('.btn_sirala[tip=rastgele]'); }],
    ['karakter: turkce', function () { click('#btn_turkceHarfliYap'); }],
    ['karakter: ingilizce', function () { click('#btn_ingilizHarfliYap'); }],
    ['url: encode', function () { click('#btn_urlEncode'); }],
    ['url: decode', function () { click('#btn_urlDecode'); }],
    ['bul-degistir', function () {
      el('#buldegistir_bunu').value = 'a';
      el('#buldegistir_su').value = 'b';
      click(BUL);
    }],
    ['ekle', function () { el('#ekleMetin').value = '-'; click(EKLE); }],
    ['temizle', function () { click('#btn_temizle'); }]
  ];
  noop('sayac: her islemden sonra yeniden hesaplanmali', function () {
    var stale = [];
    FRESH.forEach(function (f) {
      setVal('ali hasan\nveli');
      statsEl.textContent = 'BAYAT';
      try { f[1](); } catch (e) { /* reported via ALL_ERRORS */ }
      if (statsEl.textContent === 'BAYAT') { stale.push(f[0]); }
    });
    record('sayac: her islemden sonra yeniden hesaplanmali', stale.length === 0, 'BAYAT kalmamali', esc(stale.length ? stale : 'yok'));
  });

  noop('sayac: bos metinde 0 satir', function () {
    setVal('x');
    click('#btn_temizle');
    record('sayac: bos metinde 0 satir', /^0 satir/.test(statsText()) || /^0\s/.test(statsText()), '0 satir 0 cumle 0 kelime 0 karakter', esc(statsText()));
  });
  noop('sayac: cumle/kelime dogrulamasi', function () {
    setVal('Ali geldi. Dr. Hasan da! Ne iyi? tamam');
    record('sayac: cumle/kelime dogrulamasi', null, '4 cumle, 9 kelime olmali', esc(statsText()));
  });

  // ================================================================ CONTENT
  record('icerik: baslik', document.title === 'Advanced Text Editor', 'Advanced Text Editor', document.title);
  record('icerik: lang=tr', document.documentElement.lang === 'tr', 'tr', document.documentElement.lang);
  record('icerik: meta description', !!document.querySelector('meta[name=description]'), 'var',
    esc((document.querySelector('meta[name=description]') || {}).content || ''));

  var controls = Array.prototype.slice.call(document.querySelectorAll('button, .dropdown-menu a'));
  var dead = [];
  controls.forEach(function (c) {
    var has = !!c.getAttribute('onclick');
    if (!has && (/dropdown-toggle/.test(c.className) || c.getAttribute('data-toggle') || c.getAttribute('data-dismiss'))) { has = true; } // Bootstrap delegates these
    if (!has && window.jQuery) { has = !!window.jQuery._data(c, 'events'); }
    if (!has) { dead.push((c.id || c.className || c.tagName) + ':' + (c.textContent || '').trim().slice(0, 32)); }
  });
  record('icerik: handler bagli olmayan kontrol', dead.length === 0, 'yok', esc(dead.length ? dead : 'yok'), 'kontrol sayisi=' + controls.length);

  // Hit test: no invisible layer may swallow a click on a visible control.
  var covered = [];
  controls.forEach(function (c) {
    var r = c.getBoundingClientRect();
    if (!r.width || !r.height) { return; }
    var top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (top && top !== c && !c.contains(top) && !top.contains(c)) {
      covered.push((c.textContent || '').trim().slice(0, 24) + ' <- ' + (top.id || top.className || top.tagName));
    }
  });
  record('arayuz: tiklanmasini engelleyen katman yok', covered.length === 0, 'yok', esc(covered.length ? covered : 'yok'));

  noop('icerik: olsuz gorunmez alanlar (#siteAdresi/#motto)', function () {
    var a = document.getElementById('siteAdresi');
    var m = document.getElementById('motto');
    if (!a && !m) { record('icerik: olsuz gorunmez alanlar (#siteAdresi/#motto)', true, 'kaldirildi veya doldurulmus', 'elementler kaldirildi'); return; }
    var filled = (a ? a.innerHTML.trim().length : 0) + (m ? m.innerHTML.trim().length : 0);
    record('icerik: olsuz gorunmez alanlar (#siteAdresi/#motto)', filled > 0, 'bos birakilmamali', 'siteAdresi=' + esc(a ? a.innerHTML : '-') + ' motto=' + esc(m ? m.innerHTML : '-'));
  });

  record('icerik: gece modu dugmesi aria-label li', !!el('#btn-nightmode') && !!el('#btn-nightmode').getAttribute('title'),
    'aciklama olmali', el('#btn-nightmode') ? 'title=' + esc(el('#btn-nightmode').getAttribute('title') || '') : 'dugme yok');

  var remote = Array.prototype.slice.call(document.querySelectorAll('script[src], link[href]'))
    .map(function (n) { return n.getAttribute('src') || n.getAttribute('href'); })
    .filter(function (u) { return /^https?:\/\//.test(u) && !/farukguler\.com/.test(u); });
  record('kaynak: uzak (internet) bagimliligi yok', remote.length === 0, 'yok', esc(remote.length ? remote : 'yok'),
    'yuklenen scriptler: ' + esc(Array.prototype.slice.call(document.querySelectorAll('script[src]')).map(function (n) { return n.getAttribute('src'); })));

  // Analytics/AdSense leftovers must be gone from the markup entirely.
  var trackers = ['gtag', 'pagead', 'ca-pub', 'dataLayer', 'google-analytics', 'googlesyndication', 'maxcdn', 'html5shiv', 'respond.min']
    .filter(function (w) { return SRC_HTML.indexOf(w) >= 0; });
  record('gizlilik: izleme/reklam kodu kalmamiss olmali', trackers.length === 0, 'hicbir izleme ifadesi olmamali', esc(trackers.length ? trackers : 'temiz'));

  // ================================================================ LETTER CASE
  op('harf: HEPSI BÜYÜK (Türkçe I/İ)', 'ışık İhi kıvır', function () { click('#btn_hepsiBuyuk'); }, 'IŞIK İHİ KIVIR');
  op('harf: hepsi küçük (Türkçe)', 'IŞIK İHİ KIVIR', function () { click('#btn_hepsiKucuk'); }, 'ışık ihi kıvır');
  op('harf: cümle başı büyük', 'ali vurdu. hasan aldı. ahmet ne yapsın? ışık kapat!', function () { click('#btn_cumleBuyuk'); }, 'Ali vurdu. Hasan aldı. Ahmet ne yapsın? Işık kapat!');
  op('harf: kelime başı büyük', 'ali hasan\nveli ışık', function () { click('#btn_kelimeBuyuk'); }, 'Ali Hasan\nVeli Işık');
  op('harf: HEPSİ BÜYÜK boş metinde', '', function () { click('#btn_hepsiBuyuk'); }, '');
  op('harf: cümle başı büyük (kısaltma/no)', 'Dr. ali geldi. 3.14 sayisi. hasan cikti!', function () { click('#btn_cumleBuyuk'); }, null);

  // ================================================================ SİL MENÜSÜ
  op('sil: satır başı/sonu boşluk', '  a b  \n   c', function () { click('#btn_bsBoslukSil'); }, 'a b\nc');
  op('sil: satır başı/sonu TAB', '\ta\t\n\tb', function () { click('#btn_bsTabSil'); }, 'a\nb');
  op('sil: fazla boşluk', 'a   b    c', function () { click('#btn_fazlaBoslukSil'); }, 'a b c');
  op('sil: tüm boşluklar', 'a b\nc d', function () { click('#btn_boslukSil'); }, 'abcd');
  op('sil: HTML etiketleri', '<p>ali</p>\n<b>veli</b>', function () { click('.btn_HtmlEtiketleriniSil', 0); }, 'ali\nveli');
  op('sil: HTML etiketleri (satırbaşı koru)', '<div>ali</div><p>veli</p>x<br>y', function () { click('.btn_HtmlEtiketleriniSil', 1); }, 'ali\nveli\nx\ny');
  op('sil: HTML silmede script içeriği sızmasın', '<!-- not -->a&amp;b<script>evil()</script>', function () { click('.btn_HtmlEtiketleriniSil', 0); }, 'a&amp;b');
  op('sil: tekrar (harf duyarsız)', 'Ali\nali\nALI\nveli', function () { click('.btn_tekrarlayanSatirlariSil', 0); }, 'Ali\nALI\nveli');
  op('sil: tekrar (harf duyarlı)', 'Ali\nali\nAli', function () { click('.btn_tekrarlayanSatirlariSil', 1); }, 'Ali\nali');
  op('sil: tekrar (Object anahtari satirlar kaybolmasin)', 'constructor\nali\nconstructor\ntoString\n__proto__\nx', function () { click('.btn_tekrarlayanSatirlariSil', 0); }, 'constructor\nali\ntoString\n__proto__\nx');
  op('sil: tekrar duyarlı (Object anahtari satirlar kaybolmasin)', 'constructor\ntoString\nconstructor', function () { click('.btn_tekrarlayanSatirlariSil', 1); }, 'constructor\ntoString');
  op('sil: boş satırlar (sadece boşluk içerenler dahil)', 'a\n\nb\n   \nc\n', function () { click('#btn_bosSatirSil'); }, 'a\nb\nc');
  op('sil: boş satır işlemi tek satırda bir şey yapmasın', 'abc', function () { click('#btn_bosSatirSil'); }, 'abc');
  op('sil: görünmez karakterler (nbsp, zero-width, BOM, yumuşak tire)', 'a\u00A0b\u200Bc\uFEFFd\u00ADe', function () { click('#btn_gorunmezSil'); }, 'a bcde');
  op('sil: görünmez temizliğinde sek ve satır başı korunmalı', 'a\tb\nc', function () { click('#btn_gorunmezSil'); }, 'a\tb\nc');

  noop('sil: satir sonlari LF olur (insertText ile giren CR)', function () {
    ta.value = 'x'; ta.focus(); ta.select();
    document.execCommand('insertText', false, 'a\r\nb\rc');
    var onceki = ta.value;
    click('#btn_satirSonuNormalize');
    record('sil: satir sonlari LF olur (insertText ile giren CR)',
      /\r/.test(onceki) && ta.value === 'a\nb\nc', esc('a\\nb\\nc'), 'onceki=' + esc(onceki) + ' sonra=' + esc(ta.value));
  });

  // ================================================================ SIRALA MENÜSÜ
  op('sırala: alfabetik (Türkçe sıra)', 'elma\narmut\nçay\nılgın\nşeker', function () { click('.btn_sirala[tip=alfabetik]'); }, 'armut\nçay\nelma\nılgın\nşeker');
  op('sırala: doğal (küçük sayı önce gelir)', 'satır 10\nsatır 2\nsatır 1\nsatır 21', function () { click('.btn_sirala[tip=dogal]'); }, 'satır 1\nsatır 2\nsatır 10\nsatır 21');
  op('sırala: alfabetik doğal değil (ikisi farklı olmalı)', 'b2\nb10', function () { click('.btn_sirala[tip=alfabetik]'); }, 'b10\nb2');

  noop('sırala: kolona göre (sek, 2. kolon, artan)', function () {
    setVal('elma\t3\narmut\t10\nkiraz\t1');
    el('#kolonAyirici').value = 'sek';
    el('#kolonNo').value = '2';
    el('#kolonYon').value = 'artan';
    click('#btn_kolonSirala');
    record('sırala: kolona göre (sek, 2. kolon, artan)', ta.value === 'kiraz\t1\nelma\t3\narmut\t10',
      esc('kiraz 1 / elma 3 / armut 10'), esc(ta.value));
  });
  noop('sırala: kolona göre azalan + kolonu olmayan satır sona', function () {
    setVal('a,x\nb,y\nsutunsuz');
    el('#kolonAyirici').value = 'virgul';
    el('#kolonNo').value = '2';
    el('#kolonYon').value = 'azalan';
    click('#btn_kolonSirala');
    record('sırala: kolona göre azalan + kolonu olmayan satır sona', ta.value === 'b,y\na,x\nsutunsuz',
      esc('b,y / a,x / sutunsuz'), esc(ta.value));
  });
  noop('sırala: eşit kolonlar orijinal sırasını korusun (stabil)', function () {
    setVal('bir\tX\niki\tX\nuc\tX');
    el('#kolonAyirici').value = 'sek';
    el('#kolonNo').value = '2';
    el('#kolonYon').value = 'artan';
    click('#btn_kolonSirala');
    record('sırala: eşit kolonlar orijinal sırasını korusun (stabil)', ta.value === 'bir\tX\niki\tX\nuc\tX',
      'sıra değişmemeli', esc(ta.value));
  });
  noop('sırala: gecersiz kolon numarasi 1 olur', function () {
    setVal('b\na\nc');
    el('#kolonAyirici').value = 'sek';
    el('#kolonNo').value = '0';
    el('#kolonYon').value = 'artan';
    click('#btn_kolonSirala');
    record('sırala: gecersiz kolon numarasi 1 olur', ta.value === 'a\nb\nc', esc('a / b / c'), esc(ta.value));
  });
  op('sırala: satır uzunluğu', 'aaa\nb\ncc', function () { click('.btn_sirala[tip=uzunluk]'); }, 'b\ncc\naaa');
  op('sırala: ters', 'a\nb\nc', function () { click('.btn_sirala[tip=ters]'); }, 'c\nb\na');
  op('sırala: rastgele', '1\n2\n3\n4\n5', function () { click('.btn_sirala[tip=rastgele]'); }, null);
  noop('sırala: rastgele içerik korunuyor', function () {
    setVal('1\n2\n3\n4\n5');
    click('.btn_sirala[tip=rastgele]');
    var same = ta.value.split('\n').sort().join() === '1,2,3,4,5';
    record('sırala: rastgele içerik korunuyor', same, '1..5 korunmalı', esc(ta.value));
  });
  noop('sırala: global x/y sızıntısı yok', function () {
    setVal('aa\nb');
    click('.btn_sirala[tip=uzunluk]');
    var leaked = ('x' in window) || ('y' in window);
    record('sırala: global x/y sızıntısı yok', !leaked, 'window.x/window.y oluşmamalı', 'window.x=' + esc(window.x) + ' window.y=' + esc(window.y));
  });

  noop('menu: dort acilir menunun tumu aciliyor, kapaniyor ve ogeleri tam', function () {
    var BEKLENEN = { 'Sil': 11, 'Sırala': 6, 'Karakter': 2, 'Diğer': 2 };
    var gruplar = Array.prototype.slice.call(document.querySelectorAll('.gri-fon > .btn-group'));
    var sorun = [];
    var sayilar = [];
    gruplar.forEach(function (g) {
      var dugme = g.querySelector('.dropdown-toggle');
      var ad = (dugme.textContent || '').trim().replace(/\s+/g, '');
      var menu = g.querySelector('.dropdown-menu');
      var ogceler = menu ? menu.querySelectorAll('li:not(.divider)') : [];
      if (!menu) { sorun.push(ad + ': menu yok'); return; }
      dugme.click();
      var acik = g.classList.contains('open') && menu.offsetHeight > 0;
      if (!acik) { sorun.push(ad + ': acilmadi (yukseklik=' + menu.offsetHeight + ')'); }
      if (BEKLENEN[ad] !== ogceler.length) { sorun.push(ad + ': oge sayisi ' + ogceler.length + ' (beklenen ' + BEKLENEN[ad] + ')'); }
      // her oge bir baglantidir ve tiklanabilir olmali
      Array.prototype.forEach.call(ogceler, function (li) {
        var a = li.querySelector('a');
        if (!a) { sorun.push(ad + ': bos <li> var'); }
        else if (!/javascript:void\(0\)|#/.test(a.getAttribute('href') || '')) { sorun.push(ad + ': href beklenmedik'); }
      });
      sayilar.push(ad + '=' + ogceler.length);
      dugme.click();
      if (g.classList.contains('open')) { sorun.push(ad + ': kapanmadi'); }
    });
    record('menu: dort acilir menunun tumu aciliyor, kapaniyor ve ogeleri tam',
      gruplar.length === 4 && sorun.length === 0, '4 menü: Sil 11, Sırala 6, Karakter 2, Diğer 2',
      esc(sorun.length ? sorun : 'temiz'), sayilar.join(' '));
  });

  noop('menu: Sil dropdown açılıyor (Bootstrap)', function () {
    var grp = el('#btn_bsBoslukSil').closest('.btn-group');
    var toggle = grp.querySelector('.dropdown-toggle');
    toggle.click();
    var menu = grp.querySelector('.dropdown-menu');
    record('menu: Sil dropdown açılıyor (Bootstrap)', grp.classList.contains('open') && menu.offsetHeight > 0,
      'open + görünür', 'class=' + esc(grp.className) + ' menuYukseklik=' + menu.offsetHeight);
    toggle.click();
  });

  // ================================================================ KARAKTER MENÜSÜ
  op('karakter: Türkçe Harfli Yap', 'turkce olmus olabilir', function () { click('#btn_turkceHarfliYap'); }, null);
  op('karakter: İngiliz Alfabesine Uyarla', "İstanbul'u Türkçe Öğrendim", function () { click('#btn_ingilizHarfliYap'); }, "Istanbul'u Turkce Ogrendim");
  op('karakter: İngilizce uyarlamada diğer Unicode kalsın', 'Türkçe 日本語 ±', function () { click('#btn_ingilizHarfliYap'); }, null);

  // ================================================================ DİĞER MENÜSÜ
  op('diğer: URL Encode (boşluk & tırnak)', 'a b&c"d', function () { click('#btn_urlEncode'); }, 'a%20b%26c%22d');
  op('diğer: URL Encode (Türkçe)', 'ışık', function () { click('#btn_urlEncode'); }, '%C4%B1%C5%9F%C4%B1k');
  op('diğer: URL Decode (+ ve %xx)', '%C4%B1%C5%9F%C4%B1k+%C3%A7', function () { click('#btn_urlDecode'); }, 'ışık ç');
  op('diğer: URL Decode bozuk girdi çökmemeli', '%', function () { click('#btn_urlDecode'); }, '%');
  op('diğer: URL round-trip', 'abc çıöü?x=1&y=2', function () { click('#btn_urlEncode'); click('#btn_urlDecode'); }, 'abc çıöü?x=1&y=2');

  // ================================================================ BUL-DEĞİŞTİR
  noop('bul-değiştir: harf duyarlı (işaretli)', function () {
    setVal('i İ ı I');
    el('#buldegistir_bunu').value = 'i';
    el('#buldegistir_su').value = 'X';
    el('#buldegistir_bkhd').checked = true;
    click(BUL);
    record('bul-değiştir: harf duyarlı (işaretli)', ta.value === 'X İ ı I', esc('X İ ı I'), esc(ta.value));
  });
  noop('bul-değiştir: harf duyarsız (Türkçe i/İ/ı/I)', function () {
    setVal('Ali ALİ ali');
    el('#buldegistir_bunu').value = 'ali';
    el('#buldegistir_su').value = 'X';
    el('#buldegistir_bkhd').checked = false;
    click(BUL);
    record('bul-değiştir: harf duyarsız (Türkçe i/İ/ı/I)', ta.value === 'X X X', esc('X X X'), esc(ta.value));
  });
  noop('bul-değiştir: "(" regex meta çökmemeli', function () {
    setVal('a(b');
    el('#buldegistir_bunu').value = '(';
    el('#buldegistir_su').value = ')';
    el('#buldegistir_bkhd').checked = true;
    var mark = ALL_ERRORS.length;
    click(BUL);
    record('bul-değiştir: "(" regex meta çökmemeli', ta.value === 'a)b' && !ALL_ERRORS.slice(mark).length, esc('a)b'), esc(ta.value) + ' ' + ALL_ERRORS.slice(mark).join('|'));
  });
  noop('bul-değiştir: "." tüm metni yememeli', function () {
    setVal('a.b');
    el('#buldegistir_bunu').value = '.';
    el('#buldegistir_su').value = '-';
    el('#buldegistir_bkhd').checked = true;
    click(BUL);
    record('bul-değiştir: "." tüm metni yememeli', ta.value === 'a-b', esc('a-b'), esc(ta.value));
  });
  noop('bul-değiştir: yerine koyulan metin bozulmamalı (İ/ı)', function () {
    setVal('ali');
    el('#buldegistir_bunu').value = 'ali';
    el('#buldegistir_su').value = 'İŞKI';
    el('#buldegistir_bkhd').checked = false;
    click(BUL);
    record('bul-değiştir: yerine koyulan metin bozulmamalı (İ/ı)', ta.value === 'İŞKI', esc('İŞKI'), esc(ta.value));
  });
  opAlert('bul-değiştir: boş aramada uyarı', 'abc', function () {
    el('#buldegistir_bunu').value = '';
    click(BUL);
  }, 'Aranacak ifadeyi girmediniz!');
  noop('bul-değiştir: harf duyarsız tüm Türkçe çiftler', function () {
    // KIŞI "kışı"dır, "kişi" değildir; eşleşmemesi doğrudur.
    setVal('KIŞI KİŞİ kişi Kişi ŞAHANE şahane ÇÜĞÜÖ çüğüö');
    el('#buldegistir_bkhd').checked = false;
    el('#buldegistir_su').value = 'X';
    ['kişi', 'şahane', 'çüğüö'].forEach(function (arama) {
      el('#buldegistir_bunu').value = arama;
      click(BUL);
    });
    record('bul-değiştir: harf duyarsız tüm Türkçe çiftler', ta.value === 'KIŞI X X X X X X X', esc('KIŞI X X X X X X X'), esc(ta.value));
  });
  noop('bul-değiştir: yerleştirilen metin bozulmamalı (sayaç benzeri)', function () {
    setVal('ali geldi ali');
    el('#buldegistir_bunu').value = 'ali';
    el('#buldegistir_su').value = '-<->-';
    el('#buldegistir_bkhd').checked = false;
    click(BUL);
    record('bul-değiştir: yerleştirilen metin bozulmamalı (sayaç benzeri)', ta.value === '-<->- geldi -<->-', esc('-<->- geldi -<->-'), esc(ta.value));
  });
  noop('bul-değiştir: yerleştirilen metin bozulmamalı (Türkçe harfli)', function () {
    setVal('ALI alı ıslak');
    el('#buldegistir_bunu').value = 'alı';
    el('#buldegistir_su').value = 'İı';
    el('#buldegistir_bkhd').checked = false;
    click(BUL);
    record('bul-değiştir: yerleştirilen metin bozulmamalı (Türkçe harfli)', ta.value === 'İı İı ıslak', esc('İı İı ıslak'), esc(ta.value));
  });
  noop('bul-değiştir: kaç eşleşme olduğu söylenmiyor', function () {
    setVal('ali ali ali');
    el('#buldegistir_bunu').value = 'ali';
    el('#buldegistir_su').value = 'X';
    click(BUL);
    record('bul-değiştir: kaç eşleşme olduğu söylenmiyor', null, 'bilgi', 'metin=' + esc(ta.value) + ' bilgiSatiri=' + esc(statsText()));
  });

  // ================================================================ SATIRA EKLE
  noop('ekle: başına %S', function () {
    setVal('a\nb');
    el('#ekleNereye').value = 'basina';
    el('#ekleMetin').value = '%S. ';
    click(EKLE);
    record('ekle: başına %S', ta.value === '1. a\n2. b', esc('1. a\n2. b'), esc(ta.value));
  });
  noop('ekle: sonuna düz metin', function () {
    setVal('a\nb');
    el('#ekleNereye').value = 'sonuna';
    el('#ekleMetin').value = ' ;';
    click(EKLE);
    record('ekle: sonuna düz metin', ta.value === 'a ;\nb ;', esc('a ;\nb ;'), esc(ta.value));
  });
  noop('ekle: iki kez %S', function () {
    setVal('a\nb');
    el('#ekleNereye').value = 'basina';
    el('#ekleMetin').value = '[%S/%S] ';
    click(EKLE);
    record('ekle: iki kez %S', ta.value === '[1/1] a\n[2/2] b', esc('[1/1] a\n[2/2] b'), esc(ta.value));
  });
  noop('ekle: sonuna %S satır numarası doğru mu', function () {
    setVal('a\nb\nc');
    el('#ekleNereye').value = 'sonuna';
    el('#ekleMetin').value = ' (%S)';
    click(EKLE);
    record('ekle: sonuna %S satır numarası doğru mu', ta.value === 'a (1)\nb (2)\nc (3)', esc('a (1)\nb (2)\nc (3)'), esc(ta.value));
  });

  // ================================================================ GECE MODU
  noop('gece modu: aç/kapa', function () {
    // Durumsuz basla: onceki kosumdan kalan sinif/çerez sonucu yanıltabilir.
    document.body.classList.remove('nightMode');
    document.cookie = 'nightMode=0; path=/; max-age=0';
    click('#btn-nightmode');
    var on = document.body.classList.contains('nightMode');
    var ck = document.cookie;
    click('#btn-nightmode');
    var off = !document.body.classList.contains('nightMode');
    record('gece modu: aç/kapa', on && off, 'açılıp kapatılabilmeli', 'on=' + on + ' off=' + off + ' cookie=' + esc(ck));
  });
  noop('gece modu: kalıcı cookie (path+max-age)', function () {
    document.body.classList.remove('nightMode');
    document.cookie = 'nightMode=0; path=/; max-age=0';
    click('#btn-nightmode');
    var has = /nightMode=1/.test(document.cookie);
    var persisted = document.cookie.indexOf('nightMode') === -1 ? 'cookie yok' : 'cookie okundu';
    click('#btn-nightmode');
    record('gece modu: kalıcı cookie (path+max-age)', has, 'nightMode=1 yazılmalı', esc(document.cookie) + ' / ' + persisted);
  });
  noop('gece modu: tercih hem cereze hem localStorage yazilmali (file:// icin)', function () {
    document.body.classList.remove('nightMode');
    document.cookie = 'nightMode=0; path=/; max-age=0';
    try { window.localStorage.removeItem('nightMode'); } catch (e) {}
    click('#btn-nightmode');
    var depolanan = null;
    try { depolanan = window.localStorage.getItem('nightMode'); } catch (e) { depolanan = 'erisilemiyor'; }
    var acikken = /nightMode=1/.test(document.cookie) && depolanan === '1';
    click('#btn-nightmode');
    try { depolanan = window.localStorage.getItem('nightMode'); } catch (e) { depolanan = 'erisilemiyor'; }
    record('gece modu: tercih hem cereze hem localStorage yazilmali (file:// icin)',
      acikken && depolanan === '0', 'acikken 1/1, kapaliiken 0/0', 'kapaliiken localStorage=' + esc(depolanan) + ' (acikken cerez+depolama=' + acikken + ')');
  });

  noop('gece modu: arka plan rengi değişiyor', function () {
    document.body.classList.remove('nightMode');
    var light = getComputedStyle(document.body).backgroundColor;
    click('#btn-nightmode');
    var dark = getComputedStyle(document.body).backgroundColor;
    record('gece modu: arka plan rengi değişiyor', light !== dark, 'farklı renk', light + ' -> ' + dark);
    if (document.body.classList.contains('nightMode')) { click('#btn-nightmode'); }
  });

  // ================================================================ DUMAN TESTLERİ
  noop('duman: boş metinde tüm kontroller hatasız', function () {
    var ids = ['#btn_temizle', '#btn_hepsiBuyuk', '#btn_hepsiKucuk', '#btn_cumleBuyuk', '#btn_kelimeBuyuk',
      '#btn_boslukSil', '#btn_bsBoslukSil', '#btn_bsTabSil', '#btn_fazlaBoslukSil', '#btn_urlEncode',
      '#btn_urlDecode', '#btn_turkceHarfliYap', '#btn_ingilizHarfliYap', '#btn_tumunuSec',
      '#btn_bosSatirSil', '#btn_gorunmezSil', '#btn_satirSonuNormalize', '#btn_kolonSirala'];
    var bad = [];
    ids.forEach(function (s) {
      setVal('');
      var mark = ALL_ERRORS.length;
      try { click(s); } catch (e) { bad.push(s + ':' + e.message); }
      if (ALL_ERRORS.slice(mark).length) { bad.push(s + ':' + ALL_ERRORS.slice(mark).join('|')); }
    });
    ['.btn_HtmlEtiketleriniSil', '.btn_tekrarlayanSatirlariSil', '.btn_sirala'].forEach(function (cls) {
      Array.prototype.forEach.call(document.querySelectorAll(cls), function (node) {
        setVal('');
        var mark = ALL_ERRORS.length;
        try { node.click(); } catch (e) { bad.push(cls + ':' + e.message); }
        if (ALL_ERRORS.slice(mark).length) { bad.push(cls + ':' + ALL_ERRORS.slice(mark).join('|')); }
      });
    });
    setVal('');
    el('#buldegistir_bunu').value = 'a';
    el('#buldegistir_su').value = 'b';
    click(BUL);
    setVal('');
    el('#ekleMetin').value = '-';
    click(EKLE);
    record('duman: boş metinde tüm kontroller hatasız', bad.length === 0, 'hata yok', esc(bad.length ? bad : 'yok'));
  });

  noop('performans: 2000 satır alfabetik sıralama', function () {
    var rows = [];
    for (var i = 0; i < 2000; i++) { rows.push('satır ' + ((i * 7) % 2000)); }
    setVal(rows.join('\n'));
    var t0 = Date.now();
    click('.btn_sirala[tip=alfabetik]');
    var ms = Date.now() - t0;
    record('performans: 2000 satır alfabetik sıralama', ms < 5000, '<5000ms', ms + 'ms, satır=' + ta.value.split('\n').length);
  });
  noop('performans: 300 satır Türkçe Harfli Yap', function () {
    var rows = [];
    for (var i = 0; i < 300; i++) { rows.push('turkce olmus olabilir ' + i); }
    setVal(rows.join('\n'));
    var t0 = Date.now();
    click('#btn_turkceHarfliYap');
    var ms = Date.now() - t0;
    record('performans: 300 satır Türkçe Harfli Yap', ms < 15000, '<15000ms', ms + 'ms, ornek=' + esc(ta.value.split('\n')[0]));
  });

  op('crlf: \r\n satır sonları', 'a\r\nb', function () { click('.btn_sirala[tip=ters]'); }, null);
  op('sekmeler: satır içi tab korunuyor mu', 'a\tb', function () { click('#btn_bsBoslukSil'); }, null);

  noop('sayac: yapistirma (input olayi) sayaclari tazelemeli', function () {
    statsEl.textContent = 'BAYAT';
    ta.value = 'yeni yapistirilmis metin';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    record('sayac: yapistirma (input olayi) sayaclari tazelemeli',
      statsEl.textContent !== 'BAYAT' && /24 karakter/.test(statsText()), 'karakter=24', esc(statsText()));
  });

  noop('sayac: cumle sayimi (kisaltma, ondalik, uzatma)', function () {
    var durumlar = [
      ['Ali geldi. Dr. Hasan da! Ne iyi? tamam', 4],
      ['Pi sayısı 3.14 idi. bitti', 2],
      ['Neyse... devam edelim', 2],
      ['O koş. Ben yürü.', 2],
      ['tek satır işaretsiz', 1],
      ['', 0]
    ];
    var yanlis = [];
    durumlar.forEach(function (d) {
      setVal(d[0]);
      var m = /(\d+) cümle/.exec(statsText());
      var n = m ? Number(m[1]) : -1;
      if (n !== d[1]) { yanlis.push(JSON.stringify(d[0]) + ' -> ' + n + ' (beklenen ' + d[1] + ')'); }
    });
    record('sayac: cumle sayimi (kisaltma, ondalik, uzatma)', yanlis.length === 0, '4,2,2,2,1,0', esc(yanlis.length ? yanlis : 'tamam'));
  });

  // ================================================================ YAPITLAR
  noop('yapit: islemler geri al yiginina yaziyor (insertText)', function () {
    setVal('ali');
    var types = [];
    ta.addEventListener('input', function (e) { types.push(e.inputType); });
    click('#btn_hepsiBuyuk');
    record('yapit: islemler geri al yiginina yaziyor (insertText)', types.indexOf('insertText') >= 0,
      'inputType=insertText (Ctrl+Z calissin)', 'olaylar=' + esc(types) + ' deger=' + esc(ta.value));
  });

  noop('bul-değiştir: "$&" duz metin olarak eklenmeli', function () {
    setVal('abc');
    el('#buldegistir_bunu').value = 'b';
    el('#buldegistir_su').value = '$&X';
    el('#buldegistir_bkhd').checked = true;
    click(BUL);
    record('bul-değiştir: "$&" duz metin olarak eklenmeli', ta.value === 'a$&Xc', esc('a$&Xc'), esc(ta.value));
  });

  noop('karakter: secim varsa yalnizca secim donusmeli', function () {
    setVal('turkce olmus olabilir');
    ta.selectionStart = 0; ta.selectionEnd = 6;
    click('#btn_turkceHarfliYap');
    record('karakter: secim varsa yalnizca secim donusmeli',
      ta.value.slice(6) === ' olmus olabilir' && ta.value.slice(0, 6) !== 'turkce',
      'secim disi aynen kalmali, secim donusmeli', esc(ta.value));
  });

  noop('sil: fazla tab da tek boşluğa iniyor', function () {
    setVal('a\t\tb   c');
    click('#btn_fazlaBoslukSil');
    record('sil: fazla tab da tek boşluğa iniyor', ta.value === 'a b c', esc('a b c'), esc(ta.value));
  });

  noop('gece modu: aria-pressed durumu izliyor', function () {
    var b = el('#btn-nightmode');
    b.setAttribute('aria-pressed', 'false');
    click('#btn-nightmode');
    var on = b.getAttribute('aria-pressed');
    click('#btn-nightmode');
    var off = b.getAttribute('aria-pressed');
    record('gece modu: aria-pressed durumu izliyor', on === 'true' && off === 'false', 'true -> false', on + ' -> ' + off);
  });

  noop('kaynak: kullanilmayan script etiketi kalmamali', function () {
    var scripts = Array.prototype.slice.call(document.querySelectorAll('script[src]')).map(function (n) { return n.getAttribute('src'); });
    var unused = scripts.filter(function (u) { return /deasciify_handler/.test(u); });
    record('kaynak: kullanilmayan script etiketi kalmamali', unused.length === 0, 'deasciify_handler.js yuklenmemeli', esc(scripts));
  });

  noop('arayuz: href="javascript:" kullanimi (CSP engeli)', function () {
    var js = Array.prototype.slice.call(document.querySelectorAll('a[href^="javascript:"]'));
    record('arayuz: href="javascript:" kullanimi (CSP engeli)', null, 'bilgi', js.length + ' baglanti javascript: URI kullaniyor');
  });

  noop('yapit: modal acikken kolon siralama metini degistirir, ustune eklemez', function () {
    setVal('ali\t3\nveli\t1\ndursun\t10');
    var tetik = document.querySelector('[data-target="#kolonModal"]');
    if (tetik) { tetik.click(); }   // modal odak tuzağını kurar
    el('#kolonAyirici').value = 'sek';
    el('#kolonNo').value = '2';
    el('#kolonYon').value = 'artan';
    click('#btn_kolonSirala');
    var satirlar = ta.value.split('\n');
    record('yapit: modal acikken kolon siralama metini degistirir, ustune eklemez',
      satirlar.length === 3 && ta.value === 'veli\t1\nali\t3\ndursun\t10',
      esc('veli 1 / ali 3 / dursun 10 (3 satir)'), 'satir=' + satirlar.length + ' deger=' + esc(ta.value));
  });

  noop('yapit: modal acikken herhangi bir islem metni degistirir, cogaltmaz', function () {
    setVal('ali hasan');
    document.getElementById('btn-hakkinda').click();
    click('#btn_hepsiBuyuk');
    var beklenen = 'ALİ HASAN';
    record('yapit: modal acikken herhangi bir islem metni degistirir, cogaltmaz', ta.value === beklenen, esc(beklenen), esc(ta.value));
    var kapatma = document.querySelector('#hakkindaModal [data-dismiss=modal]');
    if (kapatma) { kapatma.click(); }
  });

  // ================================================================ SAYAÇ + HATA
  noop('cookie: gece modu kalici ve path=/ olmali', function () {
    var writes = SRC_METIN.split('\n').filter(function (l) { return /document\.cookie\s*=/.test(l); });
    var persistent = writes.filter(function (l) { return /max-age|expires/.test(l) && /path=/.test(l); });
    record('cookie: gece modu kalici ve path=/ olmali', writes.length > 0 && persistent.length === writes.length,
      'tum cookie yazimlari path + max-age icermeli', 'yazim=' + esc(writes) + ' kalicisiz=' + esc(writes.length - persistent.length));
  });

  noop('kaynak: olsuz (hic kullanilmayan) kod parcalari', function () {
    var gaps = [];
    if (/id="siteAdresi"/.test(SRC_HTML)) { gaps.push('index.html: bos birakilan #siteAdresi alani'); }
    if (/id="motto"/.test(SRC_HTML)) { gaps.push('index.html: bos birakilan #motto alani'); }
    if (/btn_nightMode/.test(SRC_METIN)) { gaps.push('metin.js: var olmayan #btn_nightMode secicisi'); }
    if (/\$\("#btn_nightMode"\)\.click\(function\(\)\{\s*\}\)/.test(SRC_METIN)) { gaps.push('metin.js: bos click handler'); }
    record('kaynak: olsuz (hic kullanilmayan) kod parcalari', gaps.length === 0, 'olmamali', esc(gaps.length ? gaps : 'yok'));
  });

  // ================================================================ ARAYUZ
  noop('arayuz: baslik yalniz "Advanced Text Editor"', function () {
    var marka = el('.navbar-brand');
    var temiz = !!marka && marka.textContent.trim() === 'Advanced Text Editor' && marka.tagName !== 'A';
    record('arayuz: baslik yalniz "Advanced Text Editor"', temiz, 'baglantısiz yazi', marka ? marka.tagName + ':' + esc(marka.textContent.trim()) : 'marka alani yok');
  });

  noop('arayuz: künye yalnız Hakkında penceresinde gecer', function () {
    var modal = document.getElementById('hakkindaModal');
    var disarida = /farukguler|faruk-guler/i.test(document.body.textContent.replace(modal ? modal.textContent : '', ''));
    var icinde = !!modal && /farukguler\.com/.test(modal.textContent) && /github\.com\/faruk-guler/.test(modal.textContent);
    record('arayuz: künye yalnız Hakkında penceresinde gecer', icinde && !disarida,
      'sadece modal icinde', 'modalIcinde=' + icinde + ' modalDisindaGeciyor=' + disarida);
  });

  noop('arayuz: simge dugmelerinin adi var', function () {
    var eksik = ['#btn-nightmode', '#btn-hakkinda'].filter(function (s) {
      var b = el(s);
      return !b || !b.getAttribute('aria-label') || !b.getAttribute('title');
    });
    record('arayuz: simge dugmelerinin adi var', eksik.length === 0, 'aria-label + title', esc(eksik.length ? eksik : 'tamam'));
  });

  noop('arayuz: hakkinda modali acilip tek Kapat ile kapaniyor', function () {
    var modal = document.getElementById('hakkindaModal');
    var tetik = document.getElementById('btn-hakkinda');
    var ad = 'arayuz: hakkinda modali acilip tek Kapat ile kapaniyor';
    if (!modal || !tetik) { record(ad, false, '#hakkindaModal ve #btn-hakkinda olmali', 'modal=' + !!modal + ' tetik=' + !!tetik); return; }
    BEKLEYEN++;
    // Opening is animated, so the verdict can only be taken after the transition.
    Array.prototype.forEach.call(document.querySelectorAll('.modal-backdrop'), function (n) { n.remove(); });
    modal.className = 'modal fade';
    modal.style.display = 'none';
    var hedefGecerli = tetik.getAttribute('data-target') === '#hakkindaModal';
    tetik.click();

    // Bootstrap gates open/close on transitions, which stall in a hidden
    // automation window, so poll for the end state instead of a fixed delay.
    function acikMi() { return getComputedStyle(modal).display === 'block' && modal.offsetHeight > 0; }
    function temizKapandi() { return getComputedStyle(modal).display === 'none' && !document.querySelector('.modal-backdrop'); }
    function bekle(test, bitti) { var n = 0; (function tur() { if (test()) { bitti(true); } else if (++n > 30) { bitti(false); } else { setTimeout(tur, 100); } })(); }

    bekle(acikMi, function (acildi) {
      var kapatma = modal.querySelector('[data-dismiss=modal]');
      if (kapatma) { kapatma.click(); }
      bekle(temizKapandi, function (kapandi) {
        record(ad, hedefGecerli && acildi && !!kapatma && kapandi,
          'acilir (gorunur) + Kapat ile arka planla birlikte kapanir',
          'tetikHedef=' + hedefGecerli + ' acildi=' + acildi + ' kapatma=' + (kapatma ? esc(kapatma.textContent.trim()) : 'yok') + ' kapandi=' + kapandi);
        BEKLEYEN--; bitir();
      });
    });
  });

  noop('arayuz: kolon penceresi acilir ve Sirala sonrası kapanir', function () {
    var modal = document.getElementById('kolonModal');
    var tetik = document.querySelector('[data-target="#kolonModal"]');
    var ad = 'arayuz: kolon penceresi acilir ve Sirala sonrası kapanir';
    if (!modal || !tetik) { record(ad, false, 'tetik + #kolonModal olmali', 'tetik=' + !!tetik + ' modal=' + !!modal); return; }
    BEKLEYEN++;
    Array.prototype.forEach.call(document.querySelectorAll('.modal-backdrop'), function (n) { n.remove(); });
    modal.className = 'modal fade';
    modal.style.display = 'none';

    function acikMi() { return getComputedStyle(modal).display === 'block' && modal.offsetHeight > 0; }
    function kapandiMi() { return getComputedStyle(modal).display === 'none' && !document.querySelector('.modal-backdrop'); }
    function bekle(test, bitti) { var n = 0; (function tur() { if (test()) { bitti(true); } else if (++n > 30) { bitti(false); } else { setTimeout(tur, 100); } })(); }

    tetik.click();
    bekle(acikMi, function (acildi) {
      var alanlar = ['kolonAyirici', 'kolonNo', 'kolonYon'].every(function (id) { return !!document.getElementById(id); });
      var etiketler = ['kolonAyirici', 'kolonNo', 'kolonYon'].every(function (id) { return !!document.querySelector('label[for="' + id + '"]'); });
      document.getElementById('btn_kolonSirala').click();
      bekle(kapandiMi, function (kapandi) {
        record(ad, acildi && alanlar && etiketler && kapandi,
          'acilir, alanlari etiketli, Sirala basincada kapanir',
          'acildi=' + acildi + ' alanlar=' + alanlar + ' etiketler=' + etiketler + ' kapandi=' + kapandi);
        BEKLEYEN--; bitir();
      });
    });
  });

  noop('arayuz: metin alani yatay suruklenemiyor (tasma yok)', function () {
    var ebeveyn = ta.parentElement;
    var cs = getComputedStyle(ta);
    var dikeyMi = cs.resize === 'vertical';
    ta.style.width = '900px';   // kulpun yatay suruklenmis hali
    var tasiyorMu = ta.getBoundingClientRect().right > ebeveyn.getBoundingClientRect().right + 1;
    ta.removeAttribute('style');
    record('arayuz: metin alani yatay suruklenemiyor (tasma yok)', dikeyMi && !tasiyorMu,
      'resize:vertical + max-width ile sinirli', 'resize=' + cs.resize + ' maxWidth=' + cs.maxWidth + ' 900pxVerinceTasiyorMu=' + tasiyorMu);
  });

  noop('arayuz: butum kucuk alanlar da yatay suruklenemiyor', function () {
    var idler = ['buldegistir_bunu', 'buldegistir_su', 'ekleMetin'];
    var bozuk = [];
    idler.forEach(function (id) {
      var e = document.getElementById(id);
      if (!e) { bozuk.push(id + ': yok'); return; }
      var cs = getComputedStyle(e);
      var satir = e.parentElement;
      e.style.width = '900px';
      var tasiyor = e.getBoundingClientRect().right > satir.getBoundingClientRect().right + 1;
      e.removeAttribute('style');
      if (cs.resize !== 'vertical') { bozuk.push(id + ': resize=' + cs.resize); }
      if (cs.maxWidth === 'none') { bozuk.push(id + ': max-width yok'); }
      if (tasiyor) { bozuk.push(id + ': satirdan tasiyor'); }
      // komsu etiket/dugme ile ust uste binmemeli
      var r1 = e.getBoundingClientRect();
      Array.prototype.forEach.call(satir.querySelectorAll('label, button'), function (k) {
        var r2 = k.getBoundingClientRect();
        var cakisiyor = r1.left < r2.right - 1 && r2.left < r1.right - 1 && r1.top < r2.bottom - 1 && r2.top < r1.bottom - 1;
        if (cakisiyor) { bozuk.push(id + ' x ' + (k.textContent || '').trim().slice(0, 14)); }
      });
    });
    record('arayuz: butum kucuk alanlar da yatay suruklenemiyor', bozuk.length === 0, 'resize:vertical + max-width + cakisma yok', esc(bozuk.length ? bozuk : 'tamam'));
  });

  noop('arayuz: gorunum duzeni (esit alanlar, oranli yukseklik, flex satirlar)', function () {
    var sorun = [];
    var alanlar = ['buldegistir_bunu', 'buldegistir_su', 'ekleMetin'].map(function (id) { return document.getElementById(id); });
    var genislikler = alanlar.map(function (e) { return Math.round(e.getBoundingClientRect().width); });
    if (genislikler[0] !== genislikler[1] || genislikler[1] !== genislikler[2]) {
      sorun.push('kucuk alanlar esit degil: ' + genislikler.join('/'));
    }

    var anaCs = getComputedStyle(ta);
    var anaYukseklik = parseFloat(anaCs.height);
    if (anaYukseklik < 180) { sorun.push('ana alan cok kucuk: ' + Math.round(anaYukseklik)); }
    if (anaYukseklik > innerHeight * 0.45) { sorun.push('ana alan pencerenin %45inden buyuk: ' + Math.round(anaYukseklik) + '/' + innerHeight); }

    Array.prototype.forEach.call(document.querySelectorAll('.islem-satiri'), function (satir) {
      var cs = getComputedStyle(satir);
      if (cs.display !== 'flex' || cs.alignItems !== 'center') { sorun.push('satir flex/ortali degil: ' + cs.display + '/' + cs.alignItems); }
    });

    // her kucuk alani gorunur (veya sr-only) bir <label for> ile bagli mi
    [['buldegistir_bunu', 1], ['buldegistir_su', 1], ['ekleNereye', 1], ['ekleMetin', 0]].forEach(function (c) {
      var etiket = document.querySelector('label[for="' + c[0] + '"]');
      if (!etiket) { sorun.push(c[0] + ' icin label for yok'); return; }
      var gorunur = etiket.getBoundingClientRect().width > 0;
      if (c[1] === 1 && !gorunur) { sorun.push(c[0] + ' etiketi gorunur degil'); }
      if (c[1] === 0 && !etiket.classList.contains('sr-only')) { sorun.push(c[0] + ' etiketi sr-only olmali'); }
    });

    // kapsayiciya sigma: yatay tasma olmamali
    var kap = document.querySelector('.box').getBoundingClientRect();
    var tasan = [];
    Array.prototype.forEach.call(document.querySelectorAll('.box *'), function (e) {
      var r = e.getBoundingClientRect();
      if (!r.width && !r.height) { return; }
      if (r.right > kap.right + 1 || r.left < kap.left - 1) { tasan.push((e.id || e.className || e.tagName) + ' sag=' + Math.round(r.right)); }
    });
    if (tasan.length) { sorun.push('tasiyor: ' + tasan.slice(0, 3).join(', ')); }
    if (document.documentElement.scrollWidth > document.documentElement.clientWidth) {
      sorun.push('sayfada yatay kaydirma var: ' + document.documentElement.scrollWidth + '>' + document.documentElement.clientWidth);
    }

    record('arayuz: gorunum duzeni (esit alanlar, oranli yukseklik, flex satirlar)', sorun.length === 0,
      'esit/genislik sinirli/flex/tasma yok', esc(sorun.length ? sorun : 'tamam'),
      'kucukAlanlar=' + genislikler.join('/') + ' anaYukseklik=' + Math.round(anaYukseklik) + ' pencere=' + innerWidth + 'x' + innerHeight);
  });

  noop('arayuz: satir ici (inline) stil kalmamiss olmali', function () {
    // Kaynak işaret denetlenir: Bootstrap calisma zamaninda body/modal uzerine
    // kendi style niteligi yazar (modal-acma telafisi) — bu bir kusur degil.
    var kalan = (SRC_HTML.match(/\sstyle="[^"]*"/gi) || []).map(function (s) { return s.trim(); });
    record('arayuz: satir ici (inline) stil kalmamiss olmali', kalan.length === 0, 'hepsi CSS sinifina tasinmali', esc(kalan.length ? kalan : 'temiz'));
  });

  noop('arayuz: sayaç satiri sagda hizali kalmali', function () {
    var satir = document.querySelector('.ust-satir');
    var sagda = !!satir && getComputedStyle(satir).textAlign === 'right';
    var dugme = document.getElementById('btn_temizle').getBoundingClientRect();
    var sayac = document.getElementById('metinBilgisi').getBoundingClientRect();
    record('arayuz: sayaç satiri sagda hizali kalmali', sagda && sayac.right <= dugme.left + 1 && dugme.right <= satir.getBoundingClientRect().right + 1,
      'sagda hizali, dugme en sagda', 'textAlign=' + (satir ? getComputedStyle(satir).textAlign : 'yok') + ' sayacSag=' + Math.round(sayac.right) + ' dugmeSol=' + Math.round(dugme.left) + ' dugmeSag=' + Math.round(dugme.right));
  });

  noop('arayuz: hakkinda icerigi - tek Kapat ve iki künye baglantisi', function () {
    var modal = document.getElementById('hakkindaModal');
    var kapatanlar = modal ? modal.querySelectorAll('[data-dismiss=modal], .close').length : 0;
    var hrefler = modal ? Array.prototype.map.call(modal.querySelectorAll('a[href]'), function (a) { return a.getAttribute('href'); }) : [];
    var beklenen = ['https://www.farukguler.com', 'https://github.com/faruk-guler'];
    var dogruBaglantilar = hrefler.length === beklenen.length && beklenen.every(function (u) { return hrefler.indexOf(u) >= 0; });
    // yeni sekmede ve noopener ile acilmali (islenen metin kaybolmasin)
    var guvenliAcilis = modal ? beklenen.every(function (u) {
      var a = modal.querySelector('a[href="' + u + '"]');
      return !!a && a.target === '_blank' && /noopener/.test(a.rel || '');
    }) : false;
    record('arayuz: hakkinda icerigi - tek Kapat ve iki künye baglantisi',
      kapatanlar === 1 && dogruBaglantilar && guvenliAcilis,
      '1 kapatma + 2 bağlantı (yeni sekme, noopener)',
      'kapatmaSayisi=' + kapatanlar + ' hrefler=' + esc(hrefler) + ' guvenliAcilis=' + guvenliAcilis);
  });

  // Final verdicts are taken inside bitir() so the async checks are covered too.
  var SON_KARAR_VERILDI = false;

  function kapsamaDenetimi() {
    var kontroller = Array.prototype.slice.call(document.querySelectorAll('button, .dropdown-menu a'));
    var dokunulmamis = kontroller.map(anahtar).filter(function (k) { return !TIKLANAN[k]; });
    record('kapsama: davranış testinde dokunulmayan kontrol', dokunulmamis.length === 0, 'yok',
      esc(dokunulmamis.length ? dokunulmamis : 'yok'),
      'kontrol=' + kontroller.length + ' davranış testiyle dokunulan=' + (kontroller.length - dokunulmamis.length));

    // Son olarak her kontrolu dolu bir metinde bir kez çalıştır: patlama var mı?
    var hata = [];
    kontroller.forEach(function (e) {
      setVal('ali hasan\nVeli ışık\n');
      var mark = ALL_ERRORS.length;
      try { GERCEK_TIK.call(e); } catch (err) { hata.push(anahtar(e) + ': ' + err.message); }
      if (ALL_ERRORS.slice(mark).length) { hata.push(anahtar(e) + ': ' + ALL_ERRORS.slice(mark).join('|')); }
      var kapatma = document.querySelector('.modal.in [data-dismiss=modal]');
      if (kapatma) { GERCEK_TIK.call(kapatma); }
    });
    setVal('');
    // Tarama gece modunu tersine çevirmis olabilir; sonraki sayfa yuklemesini
    // temiz birakmak icin varsayilana dondur.
    document.body.classList.remove('nightMode');
    document.cookie = 'nightMode=0; path=/; max-age=0';
    record('kapsama: her kontrol dolu metinde hatasız çalışıyor', hata.length === 0, 'hata yok', esc(hata.length ? hata : 'yok'));
  }

  function bitir() {
    if (BEKLEYEN > 0) { return; }
    if (!SON_KARAR_VERILDI) {
      SON_KARAR_VERILDI = true;
      kapsamaDenetimi();
      record('sayac: her işlemden sonra güncel', STALE_STATS.length === 0, 'tüm işlemlerden sonra güncellenmeli', esc(STALE_STATS.length ? STALE_STATS : 'yok'));
      record('sayfa: onerror/konsol hatası yok', ALL_ERRORS.length === 0, '0 hata', ALL_ERRORS.slice(0, 8).join(' ; ') || '0 hata');
    }
    OUT.status = 'done';
  }
  bitir();
})();
