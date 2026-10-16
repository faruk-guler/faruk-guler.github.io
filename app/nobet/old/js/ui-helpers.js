/**
 * UI Helper Functions
 * Includes: Toast Queue, Modal Manager, Theme Manager, Global Error Handler
 */

const uiHelpers = {
    // --- Toast Notification System (Stacked & Modern) ---
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        // Create toast element
        const toast = document.createElement('div');
        
        // Colors
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            info: 'bg-blue-600',
            warning: 'bg-yellow-600'
        };
        const icons = {
            success: 'ri-checkbox-circle-line',
            error: 'ri-error-warning-line',
            info: 'ri-information-line',
            warning: 'ri-alert-line'
        };

        // Styling
        toast.className = `toast-item flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-white font-medium transform transition-all duration-300 opacity-0 translate-x-10 pointer-events-auto ${colors[type] || 'bg-blue-600'}`;
        toast.innerHTML = `<i class="${icons[type] || 'ri-information-line'} text-xl"></i><span>${message}</span>`;

        // Prepend so new toasts appear at the top
        container.prepend(toast);

        // Slide in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.remove('opacity-0', 'translate-x-10');
                toast.classList.add('opacity-100', 'translate-x-0');
            });
        });

        // Hide and remove after 3s
        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-x-0');
            toast.classList.add('opacity-0', 'translate-x-10');
            
            // Wait for slide out transition before removing from DOM
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    },

    // --- Theme Management ---
    initTheme() {
        // Check system preference or saved preference
        const savedTheme = storage.loadTheme();
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const theme = savedTheme === 'dark' || (savedTheme === null && systemDark) ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', theme === 'dark');
        this.updateThemeIcon(theme);
    },

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        const theme = isDark ? 'dark' : 'light';
        storage.saveTheme(theme);
        this.updateThemeIcon(theme);
        this.showToast(isDark ? 'Karanlık Mod Açık' : 'Aydınlık Mod Açık', 'info');
    },

    updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = theme === 'dark' ? 'ri-sun-line text-xl' : 'ri-moon-line text-xl';
        }
    },

    // --- Modal Management ---
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
        // Add fade-in effect to content
        modal.querySelector('.modal-content').classList.add('fade-in');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    },

    // --- Utilities ---
    escapeHtml(unsafe) {
        if (unsafe === null || unsafe === undefined) return "";
        return String(unsafe)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    cleanPersonelName(name) {
        if (!name) return "";
        return String(name).replace(/<[^>]*>?/gm, '').trim();
    },

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    },

    showHelp() {
        this.openModal('helpDrawer');
    },

    closeHelp() {
        this.closeModal('helpDrawer');
    }
};

// --- Global Error Boundary ---
window.onerror = function (msg, url, line, col, error) {
    // 1. Log to console for debugging (always)
    console.error("Caught Global Error:", { msg, url, line, col, error });

    // 2. Identify and filter "Noise" errors (Browser extensions, ResizeObserver, etc.)
    const errorMessage = (msg || "").toString().toLowerCase();
    
    const noisePatterns = [
        'resizeobserver',        // Common harmless layout error
        'script error.',         // Cross-origin script error (no details)
        'extension',             // Browser extensions
        'top.globalevent',       // Extension junk
        'null is not an object', // Common extension injection failure
        'permission denied',     // Security/Extension junk
        'evaluating \'e.getattribute\'',
        'loading chunk'          // Network failure
    ];

    const isNoise = noisePatterns.some(pattern => errorMessage.includes(pattern));

    if (isNoise) {
        console.warn("Filtered out harmless noise error from UI toast.");
        return true; // Suppress from console and toast
    }

    // 3. Show toast for actual potential app errors
    uiHelpers.showToast("Beklenmedik bir hata oluştu. Verileriniz güvende.", "error");
    return true; // Suppress default browser error dialog
};

// Handle Promise rejections (Fetch failures, etc.)
window.onunhandledrejection = function (event) {
    console.error("Unhandled Promise Rejection:", event.reason);
    // Only show toast if it's not a noise error
    const reason = (event.reason || "").toString().toLowerCase();
    if (!reason.includes('extension') && !reason.includes('resizeobserver')) {
        uiHelpers.showToast("Bir veri senkronizasyon hatası oluştu.", "warning");
    }
};

// Prevent closing if unsaved changes (optional, maybe too aggressive for now)
// window.onbeforeunload = () => "Değişiklikleriniz kaybolabilir?";
