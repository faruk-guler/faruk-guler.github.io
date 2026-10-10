/* OpenDraw WebUI v.3.1 - start-up: builds the app and reports a fatal error instead of failing silently
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: js/config.js, js/app-core.js.
   Shared constants live in js/config.js. */
// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.drawingApp = new DrawingApp();
    } catch (error) {
        // A start-up failure used to leave the app looking alive but dead to input;
        // at least say what went wrong instead of failing silently.
        console.error('OpenDraw could not start:', error);
        const stack = document.getElementById('toastStack');
        if (stack) {
            const note = document.createElement('div');
            note.className = 'toast error';
            note.textContent = `OpenDraw could not start: ${error.message}`;
            stack.appendChild(note);
        }
    }
});

// The canvas has no native context menu - the right button is used for panning
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
    }
});
