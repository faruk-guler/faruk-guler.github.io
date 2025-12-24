/**
 * UI Helper Functions
 * Includes: Toast Queue, Modal Manager, Theme Manager, Global Error Handler
 */

const uiHelpers = {
    // --- Toast Notification System ---
    toastQueue: [],
    isToastShowing: false,

    showToast(message, type = 'info') {
        // Muted by user request
        console.log(`[Notification] ${type}: ${message}`);
        // this.toastQueue.push({ message, type });
        // this.processToastQueue();
    },

    processToastQueue() {
        if (this.isToastShowing || this.toastQueue.length === 0) return;

        const { message, type } = this.toastQueue.shift();
        this.isToastShowing = true;

        const toast = document.getElementById('toast');
        toast.className = 'toast'; // Reset

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

        toast.classList.add(colors[type] || 'bg-blue-600');
        toast.innerHTML = `<i class="${icons[type] || 'ri-information-line'} text-xl"></i><span>${message}</span>`;

        // Show
        setTimeout(() => toast.classList.remove('hidden'), 10);

        // Hide after 3s
        setTimeout(() => {
            toast.classList.add('hidden');
            setTimeout(() => {
                this.isToastShowing = false;
                this.processToastQueue();
            }, 300); // Wait for transition
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
        if (!unsafe) return "";
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    cleanPersonelName(name) {
        return name.replace(/<[^>]*>?/gm, '').trim();
    },

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    },

    showHelp() {
        alert(
            "NÖBET PLANLAYICI - KULLANIM KILAVUZU\n\n" +
            "1. AYARLAR: Başlangıç/Bitiş tarihlerini ve kuralları belirleyin.\n" +
            "2. PERSONEL: Ekibinizi oluşturun. 'Mazeret' butonu ile izinli günleri seçin.\n" +
            "3. SONUÇ: 'İleri' tuşuna basarak nöbet listesini oluşturun.\n\n" +
            "İPUCU: Turuncu mazeret butonuna tıklayarak takvimden gün seçebilirsiniz.\n" +
            "Karanlık mod için sağ üstteki ay ikonuna tıklayın."
        );
    }
};

// --- Global Error Boundary ---
window.onerror = function (msg, url, line, col, error) {
    console.error("Global Error:", msg, error);
    // Don't alert on harmless resize observer errors
    if (msg.includes('ResizeObserver')) return;

    uiHelpers.showToast("Beklenmedik bir hata oluştu. Verileriniz güvende.", "error");
    return true; // Suppress default error
};

// Prevent closing if unsaved changes (optional, maybe too aggressive for now)
// window.onbeforeunload = () => "Değişiklikleriniz kaybolabilir?";
