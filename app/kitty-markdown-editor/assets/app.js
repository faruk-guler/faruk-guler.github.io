/* Kitty Markdown Editor
 * Tek başına çalışır: index.html dosyasını tarayıcıda açmak yeterlidir.
 * Sunucu, derleme ve internet erişimi gerekmez.
 * Yerel kütüphaneler: marked (MIT), DOMPurify (Apache-2.0 / MPL-2.0), github-markdown-css (MIT).
 */
(function () {
    'use strict';

    var STORAGE = {
        content: 'kitty-markdown.content',
        theme: 'kitty-markdown.theme',
        sync: 'kitty-markdown.sync',
        split: 'kitty-markdown.split'
    };

    var TAB = '  ';
    var SAVE_STATUS = 'Otomatik kaydedildi';

    var dom = {};
    var fileName = '';
    var splitPercent = 50;
    var renderTimer = 0;
    var saveTimer = 0;
    var flashTimer = 0;

    /* ---------- Yardımcılar ---------- */

    function $(id) {
        return document.getElementById(id);
    }

    function read(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function write(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            setStatus('Tarayıcı deposu kapalı, otomatik kayıt yok');
            return false;
        }
    }

    function setStatus(text) {
        dom.status.textContent = text;
    }

    function clock() {
        return new Date().toLocaleTimeString('tr-TR');
    }

    function sampleDocument() {
        var node = $('sample-doc');
        return node ? node.textContent.trim() + '\n' : '';
    }

    function flash(button, text) {
        var label = button.dataset.label || button.textContent;
        button.dataset.label = label;
        button.textContent = text;
        clearTimeout(flashTimer);
        flashTimer = setTimeout(function () {
            button.textContent = label;
        }, 1400);
    }

    /* ---------- Önizleme ---------- */

    function render() {
        var source = dom.editor.value;
        dom.output.innerHTML = DOMPurify.sanitize(marked.parse(source));
        updateCounts(source);
    }

    function scheduleRender() {
        clearTimeout(renderTimer);
        renderTimer = setTimeout(render, 120);
    }

    function updateCounts(source) {
        var words = source.match(/\S+/g);
        dom.words.textContent = 'Kelime: ' + (words ? words.length : 0);
        dom.chars.textContent = 'Karakter: ' + source.length;
        dom.lines.textContent = 'Satır: ' + source.split('\n').length;
    }

    /* ---------- Otomatik kayıt ---------- */

    function persistContent() {
        return write(STORAGE.content, dom.editor.value);
    }

    function scheduleSave() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(function () {
            if (persistContent()) {
                setStatus(SAVE_STATUS + ' · ' + clock());
            }
        }, 500);
    }

    /* ---------- Dosya aç / kaydet ---------- */

    function openFile(file) {
        var reader = new FileReader();

        reader.onload = function () {
            dom.editor.value = String(reader.result);
            fileName = file.name;
            document.title = file.name + ' - Kitty Markdown Editor';
            render();
            persistContent();
            dom.editor.scrollTop = 0;
            dom.preview.scrollTop = 0;
            setStatus('Açılan dosya: ' + file.name);
        };
        reader.onerror = function () {
            window.alert('Dosya okunamadı: ' + file.name);
        };
        reader.readAsText(file, 'utf-8');
    }

    function saveFile() {
        var name = fileName || 'belge.md';
        var blob = new Blob([dom.editor.value], { type: 'text/markdown;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');

        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
        setStatus('İndirilen dosya: ' + name);
    }

    function copyText() {
        var text = dom.editor.value;

        function done(ok) {
            flash(dom.copy, ok ? 'Kopyalandı' : 'Kopyalanamadı');
        }

        function legacyCopy() {
            var area = document.createElement('textarea');
            area.value = text;
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.appendChild(area);
            area.select();
            var ok = false;
            try {
                ok = document.execCommand('copy');
            } catch (error) {
                ok = false;
            }
            area.remove();
            done(ok);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                done(true);
            }, legacyCopy);
        } else {
            legacyCopy();
        }
    }

    function reset() {
        if (!window.confirm('Sıfırlansın mı? Yazdıklarınız tarayıcı kaydından silinir.')) {
            return;
        }
        fileName = '';
        document.title = 'Kitty Markdown Editor';
        dom.editor.value = sampleDocument();
        render();
        persistContent();
        setStatus('Örnek belge yüklendi');
    }

    /* ---------- Tema ---------- */

    // İki önizleme stili de sayfada bulunur; tema, media niteliğiyle hangisinin
    // etkili olduğunu seçer. Böylece tema değişiminde yeni bir stil indirilmez.
    function applyTheme(dark) {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        dom.cssLight.media = dark ? 'not all' : 'all';
        dom.cssDark.media = dark ? 'all' : 'not all';
        dom.theme.textContent = dark ? 'Açık tema' : 'Koyu tema';
        write(STORAGE.theme, dark ? 'dark' : 'light');
    }

    /* ---------- Kaydırma senkronu ---------- */

    function applySync(enabled) {
        dom.syncCheck.checked = enabled;
        write(STORAGE.sync, enabled ? '1' : '0');
    }

    function syncScroll() {
        if (!dom.syncCheck.checked) {
            return;
        }
        var max = dom.editor.scrollHeight - dom.editor.clientHeight;
        if (max <= 0) {
            return;
        }
        var ratio = dom.editor.scrollTop / max;
        dom.preview.scrollTop = (dom.preview.scrollHeight - dom.preview.clientHeight) * ratio;
    }

    /* ---------- Panel genişliği ---------- */

    // Yüzde tam sayı olarak tutulur; sürükleme sırasında her karede depoya yazılmaz,
    // kayıt yalnızca bırakıldığında yapılır.
    function setSplit(percent, persist) {
        splitPercent = Math.round(Math.min(85, Math.max(15, percent)));
        document.documentElement.style.setProperty('--split', splitPercent + '%');
        dom.divider.setAttribute('aria-valuenow', splitPercent);
        if (persist) {
            write(STORAGE.split, String(splitPercent));
        }
    }

    function percentFromEvent(event) {
        var rect = dom.main.getBoundingClientRect();
        if (rect.width <= 0) {
            return splitPercent;
        }
        return (event.clientX - rect.left) / rect.width * 100;
    }

    function setupDivider() {
        var dragging = false;

        dom.divider.addEventListener('pointerdown', function (event) {
            dragging = true;
            dom.divider.setPointerCapture(event.pointerId);
        });

        dom.divider.addEventListener('pointermove', function (event) {
            if (dragging) {
                setSplit(percentFromEvent(event), false);
            }
        });

        function stopDragging(event) {
            if (!dragging) {
                return;
            }
            dragging = false;
            if (dom.divider.hasPointerCapture(event.pointerId)) {
                dom.divider.releasePointerCapture(event.pointerId);
            }
            setSplit(splitPercent, true);
        }

        // Bırakma ayraç dışında gerçekleşse de sürükleme sonlanır.
        window.addEventListener('pointerup', stopDragging);
        window.addEventListener('pointercancel', stopDragging);

        dom.divider.addEventListener('dblclick', function () {
            setSplit(50, true);
        });

        dom.divider.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                setSplit(splitPercent - 2, true);
                event.preventDefault();
            } else if (event.key === 'ArrowRight') {
                setSplit(splitPercent + 2, true);
                event.preventDefault();
            } else if (event.key === 'Home') {
                setSplit(50, true);
                event.preventDefault();
            }
        });
    }

    /* ---------- Dosya sürükle-bırak ---------- */

    function droppingFile(event) {
        var types = event.dataTransfer && event.dataTransfer.types;
        if (!types) {
            return false;
        }
        return Array.prototype.indexOf.call(types, 'Files') >= 0;
    }

    // Markdown dosyasını sürüklemek "Aç" düğmesiyle aynı işi yapar;
    // metin sürüklemesine dokunulmaz.
    function setupDragAndDrop() {
        document.addEventListener('dragover', function (event) {
            if (droppingFile(event)) {
                event.preventDefault();
            }
        });

        document.addEventListener('drop', function (event) {
            if (!droppingFile(event)) {
                return;
            }
            event.preventDefault();
            var file = event.dataTransfer.files[0];
            if (file) {
                openFile(file);
            }
        });
    }

    /* ---------- Editör davranışı ---------- */

    function replaceSelection(replacement, caretOffset) {
        var start = dom.editor.selectionStart;
        var end = dom.editor.selectionEnd;

        dom.editor.setRangeText(replacement, start, end, 'preserve');
        dom.editor.selectionStart = dom.editor.selectionEnd = start + caretOffset;
        scheduleRender();
        scheduleSave();
    }

    function handleTab(event) {
        var value = dom.editor.value;
        var start = dom.editor.selectionStart;
        var lineStart = value.lastIndexOf('\n', start - 1) + 1;

        if (event.shiftKey) {
            var leading = value.slice(lineStart).match(/^ {1,2}/);
            if (!leading) {
                event.preventDefault();
                return;
            }
            dom.editor.setSelectionRange(lineStart, lineStart + leading[0].length);
            replaceSelection('', 0);
            dom.editor.selectionStart = dom.editor.selectionEnd = Math.max(lineStart, start - leading[0].length);
            event.preventDefault();
            return;
        }

        if (start !== dom.editor.selectionEnd || value.slice(lineStart, start).trim() !== '') {
            replaceSelection(TAB, TAB.length);
            event.preventDefault();
            return;
        }
        replaceSelection('\n' + TAB, TAB.length + 1);
        event.preventDefault();
    }

    function setupEditor() {
        dom.editor.addEventListener('input', function () {
            scheduleRender();
            scheduleSave();
        });

        dom.editor.addEventListener('scroll', syncScroll, { passive: true });

        dom.editor.addEventListener('keydown', function (event) {
            var mod = event.ctrlKey || event.metaKey;

            if (event.key === 'Tab') {
                handleTab(event);
            } else if (mod && event.key.toLowerCase() === 's') {
                event.preventDefault();
                saveFile();
            } else if (mod && event.key.toLowerCase() === 'o') {
                event.preventDefault();
                dom.fileInput.click();
            }
        });
    }

    /* ---------- Eylemler ---------- */

    function setupActions() {
        dom.open.addEventListener('click', function () {
            dom.fileInput.click();
        });

        dom.fileInput.addEventListener('change', function () {
            var file = dom.fileInput.files[0];
            dom.fileInput.value = '';
            if (file) {
                openFile(file);
            }
        });

        dom.save.addEventListener('click', saveFile);
        dom.copy.addEventListener('click', copyText);
        dom.pdf.addEventListener('click', function () {
            window.print();
        });
        dom.reset.addEventListener('click', reset);
        dom.theme.addEventListener('click', function () {
            applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
        });
        dom.syncCheck.addEventListener('change', function () {
            applySync(dom.syncCheck.checked);
        });
    }

    /* ---------- Başlangıç ---------- */

    function missingLibraries() {
        if (window.marked && window.DOMPurify) {
            return false;
        }
        dom.output.innerHTML = '<p><strong>Kütüphaneler bulunamadı.</strong> ' +
            '<code>assets/marked.min.js</code> ve <code>assets/purify.min.js</code> dosyalarının ' +
            '<code>index.html</code> ile aynı klasördeki <code>assets/</code> klasöründe ' +
            'olduğundan emin olun.</p>';
        return true;
    }

    function init() {
        dom = {
            editor: $('editor'),
            output: $('output'),
            preview: $('preview-pane'),
            main: $('panes'),
            divider: $('divider'),
            cssLight: $('css-light'),
            cssDark: $('css-dark'),
            open: $('btn-open'),
            fileInput: $('file-input'),
            save: $('btn-save'),
            copy: $('btn-copy'),
            pdf: $('btn-pdf'),
            reset: $('btn-reset'),
            theme: $('btn-theme'),
            syncCheck: $('sync-scroll'),
            words: $('stat-words'),
            chars: $('stat-chars'),
            lines: $('stat-lines'),
            status: $('stat-status')
        };

        if (missingLibraries()) {
            return;
        }

        DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            var href = node.getAttribute && node.getAttribute('href');
            if (node.tagName === 'A' && href && /^https?:/i.test(href)) {
                node.setAttribute('target', '_blank');
                node.setAttribute('rel', 'noopener noreferrer');
            }
        });

        marked.setOptions({ gfm: true, breaks: false });

        var stored = read(STORAGE.content);
        dom.editor.value = stored === null ? sampleDocument() : stored;
        applyTheme(read(STORAGE.theme) === 'dark');
        applySync(read(STORAGE.sync) === '1');
        setSplit(parseFloat(read(STORAGE.split)) || 50, false);

        setupEditor();
        setupActions();
        setupDivider();
        setupDragAndDrop();
        render();
        setStatus('Hazır');
        dom.editor.focus();
    }

    init();
})();
