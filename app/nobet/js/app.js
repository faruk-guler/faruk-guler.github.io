/**
 * app.js - açılış, antet araçları ve aşama şeridi.
 *
 * Durumu yükler, bölümleri başlatır ve belge eylemelerini bağlar. Modüller birbirini
 * çağırmaz; haberleşme state olayları üzerinden olur, böylece her bölüm bağımsız kalır.
 */

const APP_VERSION = 'v4.0';
/** Antette ve çıktı adlarında kullanılan kısa sürüm etiketi. */
const APP_LABEL = 'v4';

const app = {
    init() {
        state.init();
        ui.initTheme();
        ui.initDialogs();

        settingsPanel.init();
        personnelPanel.init();
        excuseModal.init();
        schedulePanel.init();
        io.init();

        this.bindActions();
        this.bindShortcuts();
        this.bindSteps();
        this.checkLibraries();
        this.report();
    },

    /**
     * Excel ve PDF kütüphaneleri yerelden yüklenir. Dağıtım klasörü vendor/'u
     * taşımıyorsa sayfa açılır ama düğmeler boşa çıkar: sessiz hata yerine
     * açılışta söyle ve düğmeleri kapat.
     */
    checkLibraries() {
        const missing = {
            excel: !window.XLSX,
            pdf: !(window.jspdf && window.jspdf.jsPDF)
        };
        if (!missing.excel && !missing.pdf) return;

        // Her kütüphane AYNI belgeden gelir ama bağımsız çalışır: Excel yoksa PDF
        // yine kullanılabilir, bu yüzden yalnız ilgili düğmeler kapatılır.
        const names = [];
        if (missing.excel) names.push('vendor/xlsx.full.min.js');
        if (missing.pdf) names.push('vendor/jspdf.umd.min.js');

        if (missing.excel) {
            this.disableButtons(['btnTemplate', 'btnImport', 'btnExportStaff', 'btnExcel'],
                'Excel kütüphanesi yüklenemedi');
        }
        if (missing.pdf) {
            this.disableButtons(['btnPdf'], 'PDF kütüphanesi yüklenemedi');
        }

        ui.status(`Eksik kütüphane: ${names.join(' + ')} — ilgili içe/dışa aktarma çalışmaz.`, 'error');
        ui.toast(`Kütüphaneler yüklenemedi: ${names.join(', ')}`, 'error');
    },

    disableButtons(ids, reason) {
        ids.forEach((id) => {
            const button = document.getElementById(id);
            if (!button) return;

            button.disabled = true;
            button.title = reason;
        });
    },

    bindActions() {
        document.getElementById('btnAbout').addEventListener('click', () => ui.openModal('aboutModal'));
        document.getElementById('themeToggle').addEventListener('click', () => ui.toggleTheme());
        document.getElementById('aboutBuild').textContent = `Jupiter ${APP_VERSION}`;
    },

    bindShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+Enter nereden bakılırsa bakılsın çizelgeyi üretir.
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                schedulePanel.generate();
                return;
            }

            // Ctrl+P ekranın değil belgenin yazdırması: bu uygulama HTML olduğu için
            // tarayıcının yazdırma penceresi arayüzü de kâğıda taşıyabiliyor. Güncel
            // çizelge varsa A4 PDF sekmesi açılır; yoksa yine belge düzeni yazdırılır.
            if ((event.ctrlKey || event.metaKey) && (event.key === 'p' || event.key === 'P')) {
                event.preventDefault();
                if (state.scheduleIsFresh()) io.exportPdf();
                else window.print();
            }
        });
    },

    // ---------- Aşama şeridi ----------
    /** İşin üç adımdan oluştuğu şeritte görünür; şerit ilgili bölüme kaydırır. */
    bindSteps() {
        this.steps = [...document.querySelectorAll('.step')];

        this.steps.forEach((step) => {
            step.addEventListener('click', () => this.gotoStep(step.dataset.target));
        });

        ['settings', 'personnel', 'schedule'].forEach(event => state.on(event, () => this.renderSteps()));
        this.watchRail();
        this.renderSteps();
    },

    /**
     * Şerit dar ekranda birden fazla satıra inebiliyor; sayfa başının örtülmemesi
     * için pay şeridin GERÇEK yüksekliğinden okunur (tahmini px eşiği kullanılmaz).
     */
    watchRail() {
        const rail = document.querySelector('.rail');
        if (!rail) return;

        const apply = () => {
            const height = Math.ceil(rail.getBoundingClientRect().height);
            document.documentElement.style.setProperty('--rail-clear', `${height}px`);
        };

        apply();

        if (window.ResizeObserver) new ResizeObserver(apply).observe(rail);
        else window.addEventListener('resize', apply);
    },

    gotoStep(targetId) {
        const section = document.getElementById(targetId);
        if (!section) return;

        const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        section.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    },

    renderSteps() {
        if (!this.steps) return;

        const stats = state.stats();
        const ready = [
            stats.dayCount > 0,
            stats.staffCount > 0 && stats.staffCount >= state.settings.perDay,
            state.hasSchedule() && state.scheduleIsFresh()
        ];
        const current = ready.indexOf(false);
        const LABELS = ['tamamlandı', 'sıradaki aşama', 'bekliyor'];

        this.steps.forEach((step, index) => {
            const stateName = ready[index] ? LABELS[0] : (index === current ? LABELS[1] : LABELS[2]);

            step.dataset.state = ready[index] ? 'done' : (index === current ? 'current' : 'todo');
            step.setAttribute('aria-current', index === current && !ready[index] ? 'step' : 'false');
            step.title = stateName;
        });
    },

    /** Geri yüklenen oturumun belge altlığındaki özeti. */
    report() {
        // Gün/personel sayısı antet künyesinde ve özet kutularında zaten duruyor:
        // durum satırı yinelediği sayıyı değil, olanı söyler.
        if (state.hasSchedule() && state.scheduleIsFresh()) {
            ui.status('Kayıtlı çizelge geri yüklendi.', 'ok');
        } else if (state.hasSchedule()) {
            // Liste silinmedi: kural geri alınırsa yine geçerli sayılır.
            ui.status('Kayıtlı çizelge bayat — kural veya personel değişmiş, yeniden oluşturun.', 'warn');
        } else if (!state.personnel.length) {
            ui.status('Başlamak için personel ekleyin.', 'warn');
        } else {
            ui.status('Kurallar ve personel hazır.', 'info');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
