/* Kitty Markdown Editor
 * Runs standalone: opening index.html in a browser is enough.
 * No server, no build step, no internet access required.
 * Bundled libraries: marked (MIT), DOMPurify (Apache-2.0 / MPL-2.0), github-markdown-css (MIT).
 */
(function () {
    'use strict';

    var STORAGE = {
        content: 'kitty-markdown.content',
        theme: 'kitty-markdown.theme',
        sync: 'kitty-markdown.sync',
        split: 'kitty-markdown.split',
        file: 'kitty-markdown.file',
        font: 'kitty-markdown.font'
    };

    var TAB = '  ';
    var SAVE_STATUS = 'Autosaved';
    var APP_NAME = 'Kitty Markdown Editor';
    var APP_VERSION = '1.1';
    var FONT_MIN = 60;
    var FONT_MAX = 200;
    var FONT_STEP = 10;

    var dom = {};
    var fileName = '';
    var splitPercent = 50;
    var fontScale = 100;
    var renderTimer = 0;
    var saveTimer = 0;
    var flashTimer = 0;

    /* ---------- Helpers ---------- */

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
            setStatus('Browser storage is off; autosave disabled');
            return false;
        }
    }

    function setStatus(text) {
        dom.status.textContent = text;
    }

    function clock() {
        return new Date().toLocaleTimeString('en-GB');
    }

    // Single source of truth for the tab title: "<file> - Name v<version>".
    function pageTitle() {
        var base = APP_NAME + ' v' + APP_VERSION;
        return fileName ? fileName + ' - ' + base : base;
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

    /* ---------- Preview ---------- */

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
        // Words are counted from the rendered plain text, so Markdown
        // syntax markers such as #, | and ``` are not counted as words.
        var words = dom.output.textContent.match(/\S+/g);
        dom.words.textContent = 'Words: ' + (words ? words.length : 0);
        dom.chars.textContent = 'Characters: ' + source.length;
        dom.lines.textContent = 'Lines: ' + (source.length ? source.split('\n').length : 0);
    }

    /* ---------- Autosave ---------- */

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

    /* ---------- Open / save file ---------- */

    // Drag-and-drop yields a real File object with no picker filter;
    // binary files would show up as garbage in the editor. Looking for a
    // NUL byte in the first 4 KB is a cheap and reliable heuristic (it
    // also catches UTF-16 text; the user is asked before such a file is
    // opened, so nothing is blocked automatically).
    function looksBinary(file) {
        return file.slice(0, 4096).arrayBuffer().then(function (buffer) {
            var bytes = new Uint8Array(buffer);
            for (var i = 0; i < bytes.length; i++) {
                if (bytes[i] === 0) {
                    return true;
                }
            }
            return false;
        });
    }

    function acceptFile(file) {
        if (!file) {
            return;
        }
        if (file.size > 8 * 1024 * 1024) {
            window.alert('File is too large (over 8 MB): ' + file.name);
            return;
        }
        looksBinary(file).then(function (binary) {
            if (binary) {
                // It may still be a text file that merely looks binary (UTF-16 etc.);
                // the decision belongs to the user.
                if (window.confirm('This does not look like a text file: ' + file.name + '\nOpen it anyway?')) {
                    openFile(file);
                }
            } else {
                openFile(file);
            }
        }, function () {
            openFile(file); // do not block if the readability test itself fails
        });
    }

    function openFile(file) {
        var reader = new FileReader();

        reader.onload = function () {
            dom.editor.value = String(reader.result);
            fileName = file.name;
            document.title = pageTitle();
            write(STORAGE.file, fileName);
            render();
            persistContent();
            dom.editor.scrollTop = 0;
            dom.preview.scrollTop = 0;
            setStatus('Opened file: ' + file.name);
        };
        reader.onerror = function () {
            window.alert('Could not read the file: ' + file.name);
        };
        reader.readAsText(file, 'utf-8');
    }

    function saveFile() {
        var name = fileName || 'document.md';
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
        setStatus('Downloaded file: ' + name);
    }

    function copyText() {
        var text = dom.editor.value;

        function done(ok) {
            flash(dom.copy, ok ? 'Copied' : 'Copy failed');
        }

        if (!text) {
            flash(dom.copy, 'Nothing to copy');
            return;
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
        if (!window.confirm('Reset? Your text will be replaced with the sample document.')) {
            return;
        }
        fileName = '';
        write(STORAGE.file, '');
        document.title = pageTitle();
        dom.editor.value = sampleDocument();
        render();
        persistContent();
        setStatus('Sample document loaded');
    }

    /* ---------- Theme ---------- */

    // Both preview stylesheets are present in the page; the theme only picks
    // which one is active through its media attribute. This way switching
    // the theme never downloads a new stylesheet.
    function applyTheme(dark) {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        dom.cssLight.media = dark ? 'not all' : 'all';
        dom.cssDark.media = dark ? 'all' : 'not all';
        dom.theme.textContent = dark ? 'Light theme' : 'Dark theme';
        write(STORAGE.theme, dark ? 'dark' : 'light');
    }

    /* ---------- Full-screen preview ---------- */

    // Native full screen is requested on the preview pane itself. When the
    // API is unavailable or the request is denied, the same layout is shown
    // through a body class (fallback); ESC leaves either mode. The
    // fullscreenchange event keeps button label and state in sync.
    function fullscreenUI(on) {
        dom.fullscreen.textContent = on ? 'Exit full screen' : 'Full screen';
        dom.fullscreen.setAttribute('aria-pressed', on ? 'true' : 'false');
        document.body.classList.toggle('fullscreen-preview', on);
    }

    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.body.classList.contains('fullscreen-preview')) {
            fullscreenUI(false);
        } else if (dom.preview.requestFullscreen) {
            // Some engines return a promise, others return undefined or throw
            // when the request is not allowed; all of them end in the fallback.
            try {
                var pending = dom.preview.requestFullscreen();
                if (pending && pending.then) {
                    pending.then(null, function () {
                        fullscreenUI(true); // denied: use the layout fallback
                    });
                }
            } catch (error) {
                fullscreenUI(true);
            }
        } else {
            fullscreenUI(true);
        }
    }

    /* ---------- Font size ---------- */

    // One scale factor drives both the editor and the preview text through
    // the --font-scale custom property (see style.css).
    function setFontScale(scale, persist) {
        fontScale = Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round(scale)));
        document.documentElement.style.setProperty('--font-scale', String(fontScale / 100));
        if (persist) {
            write(STORAGE.font, String(fontScale));
            setStatus('Font: ' + fontScale + '%');
        }
    }

    /* ---------- Scroll sync ---------- */

    function applySync(enabled) {
        dom.syncCheck.checked = enabled;
        write(STORAGE.sync, enabled ? '1' : '0');
    }

    var scrollOwner = null;
    var scrollIdleTimer = 0;

    // Two-way sync: the panel currently being scrolled is tracked with a
    // short-lived "owner"; the opposite event triggered programmatically by
    // the scrollTop assignment is ignored, so no feedback loop forms.
    function syncScroll(from, to) {
        if (!dom.syncCheck.checked || scrollOwner === to) {
            return;
        }
        scrollOwner = from;
        clearTimeout(scrollIdleTimer);
        scrollIdleTimer = setTimeout(function () {
            scrollOwner = null;
        }, 120);

        var max = from.scrollHeight - from.clientHeight;
        if (max <= 0) {
            return;
        }
        var ratio = from.scrollTop / max;
        to.scrollTop = (to.scrollHeight - to.clientHeight) * ratio;
    }

    /* ---------- Panel width ---------- */

    // The percentage is kept as an integer; while dragging, nothing is
    // written to storage on every frame — saving happens only on release.
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

        // Dragging also ends when the release happens outside the divider.
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

    /* ---------- About popover ---------- */

    function openAbout() {
        dom.aboutPanel.hidden = false;
        dom.aboutBtn.setAttribute('aria-expanded', 'true');
    }

    function closeAbout() {
        dom.aboutPanel.hidden = true;
        dom.aboutBtn.setAttribute('aria-expanded', 'false');
    }

    function setupAbout() {
        dom.aboutBtn.addEventListener('click', function () {
            if (dom.aboutPanel.hidden) {
                openAbout();
            } else {
                closeAbout();
            }
        });

        // Any click outside the button or the panel closes it.
        document.addEventListener('click', function (event) {
            if (dom.aboutPanel.hidden) {
                return;
            }
            if (dom.aboutBtn === event.target || dom.aboutPanel.contains(event.target)) {
                return;
            }
            closeAbout();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !dom.aboutPanel.hidden) {
                closeAbout();
                dom.aboutBtn.focus();
            }
        });
    }

    /* ---------- File drag and drop ---------- */

    function droppingFile(event) {
        var types = event.dataTransfer && event.dataTransfer.types;
        if (!types) {
            return false;
        }
        return Array.prototype.indexOf.call(types, 'Files') >= 0;
    }

    // Dropping a Markdown file does the same thing as the "Open" button;
    // dragging selected text is left untouched.
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
            acceptFile(event.dataTransfer.files[0]);
        });
    }

    /* ---------- Editor behavior ---------- */

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

        var lineEnd = value.indexOf('\n', start);
        if (lineEnd === -1) {
            lineEnd = value.length;
        }
        var before = value.slice(lineStart, start);
        var after = value.slice(start, lineEnd);

        // If the caret sits on a completely empty line, start a new indented
        // line for the sub item; otherwise (including column 0) insert the
        // indent at the caret.
        if (start === dom.editor.selectionEnd && before.trim() === '' && after.trim() === '') {
            replaceSelection('\n' + TAB, TAB.length + 1);
        } else {
            replaceSelection(TAB, TAB.length);
        }
        event.preventDefault();
    }

    function setupEditor() {
        dom.editor.addEventListener('input', function () {
            scheduleRender();
            scheduleSave();
        });

        dom.editor.addEventListener('scroll', function () {
            syncScroll(dom.editor, dom.preview);
        }, { passive: true });

        dom.preview.addEventListener('scroll', function () {
            syncScroll(dom.preview, dom.editor);
        }, { passive: true });

        // Autosave is debounced; flush the pending keystroke when the tab
        // is being hidden or closed so nothing is lost.
        window.addEventListener('pagehide', function () {
            clearTimeout(saveTimer);
            persistContent();
        });

        dom.editor.addEventListener('keydown', function (event) {
            if (event.key === 'Tab') {
                handleTab(event);
            }
        });

        // Shortcuts should work regardless of editor focus: after a button
        // is clicked, Ctrl+S must not open the browser's save-page dialog.
        // Ctrl+F steals the browser's find bar on purpose (full-screen preview).
        document.addEventListener('keydown', function (event) {
            var mod = event.ctrlKey || event.metaKey;
            if (!mod || event.altKey || typeof event.key !== 'string') {
                return;
            }
            var key = event.key.toLowerCase();

            if (key === 's' && !event.shiftKey) {
                event.preventDefault();
                saveFile();
            } else if (key === 'o' && !event.shiftKey) {
                event.preventDefault();
                dom.fileInput.click();
            } else if (key === 'f' && !event.shiftKey) {
                event.preventDefault();
                toggleFullscreen();
            } else if (key === '=' || key === '+') {
                // Shift stays allowed: Ctrl+Shift+= is how "+" is usually typed.
                event.preventDefault();
                setFontScale(fontScale + FONT_STEP, true);
            } else if (key === '-' && !event.shiftKey) {
                event.preventDefault();
                setFontScale(fontScale - FONT_STEP, true);
            } else if (key === '0' && !event.shiftKey) {
                event.preventDefault();
                setFontScale(100, true);
            }
        });
    }

    /* ---------- Actions ---------- */

    function setupActions() {
        dom.open.addEventListener('click', function () {
            dom.fileInput.click();
        });

        dom.fileInput.addEventListener('change', function () {
            var file = dom.fileInput.files[0];
            dom.fileInput.value = '';
            acceptFile(file);
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
        dom.fullscreen.addEventListener('click', function () {
            toggleFullscreen();
        });

        // Keep the button in sync when the user leaves full screen with ESC
        // or the browser exits it for any other reason.
        document.addEventListener('fullscreenchange', function () {
            fullscreenUI(!!document.fullscreenElement);
        });
        dom.syncCheck.addEventListener('change', function () {
            applySync(dom.syncCheck.checked);
        });
    }

    /* ---------- Startup ---------- */

    function missingLibraries() {
        if (window.marked && window.DOMPurify) {
            return false;
        }
        dom.output.innerHTML = '<p><strong>Libraries not found.</strong> ' +
            'Make sure <code>assets/marked.min.js</code> and <code>assets/purify.min.js</code> ' +
            'live in the <code>assets/</code> folder next to <code>index.html</code>.</p>';
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
            fullscreen: $('btn-fullscreen'),
            syncCheck: $('sync-scroll'),
            aboutBtn: $('btn-about'),
            aboutPanel: $('about-panel'),
            brandVersion: $('brand-version'),
            aboutVersion: $('about-version'),
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

        // Show the version in the header badge and the About panel.
        if (dom.brandVersion) {
            dom.brandVersion.textContent = 'v' + APP_VERSION;
        }
        if (dom.aboutVersion) {
            dom.aboutVersion.textContent = 'v' + APP_VERSION;
        }

        var stored = read(STORAGE.content);
        dom.editor.value = stored === null ? sampleDocument() : stored;
        fileName = read(STORAGE.file) || '';
        if (fileName) {
            document.title = pageTitle();
        }
        applyTheme(read(STORAGE.theme) === 'dark');
        applySync(read(STORAGE.sync) === '1');
        setSplit(parseFloat(read(STORAGE.split)) || 50, false);
        setFontScale(parseFloat(read(STORAGE.font)) || 100, false);

        setupEditor();
        setupActions();
        setupAbout();
        setupDivider();
        setupDragAndDrop();
        render();
        // On reload the browser restores the textarea's scroll position
        // together with focus; while the preview stays at 0 the panels look
        // misaligned. Reset both.
        dom.editor.scrollTop = 0;
        dom.preview.scrollTop = 0;
        setStatus('Ready');
        dom.editor.focus();
    }

    init();
})();
