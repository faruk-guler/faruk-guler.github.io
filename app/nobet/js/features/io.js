/**
 * io.js - Excel/PDF üretimi, Excel'dan içe aktarma ve yazdırma.
 *
 * Her çıktı state üzerinden üretilir (DOM'dan asla); böylece dışa aktarılan belge
 * ekrandaki çizelgeden sapamaz.
 */

const io = {
    DEFAULT_UNIT: '.......... Birimi Nöbet Çizelgesi',
    hasBoldFace: false,

    init() {
        document.getElementById('btnTemplate').addEventListener('click', () => this.downloadTemplate());
        document.getElementById('btnImport').addEventListener('click', () => this.importPersonnel());
        document.getElementById('btnExportStaff').addEventListener('click', () => this.exportPersonnel());
        document.getElementById('btnExcel').addEventListener('click', () => this.exportRoster());
        document.getElementById('btnPdf').addEventListener('click', () => this.exportPdf());
        document.getElementById('btnRanking').addEventListener('click', () => this.openAnalysis());
    },

    // ---------- Helpers ----------
    xlsxReady() {
        if (!window.XLSX) {
            ui.toast('Excel kütüphanesi yüklü değil: vendor/xlsx.full.min.js eksik.', 'error');
            return false;
        }
        return true;
    },

    /** Döküm ancak geçerli (güncel kurallara üretilmiş) bir çizelgeyle yapılır. */
    rosterReady() {
        if (!state.hasSchedule()) {
            ui.toast('Önce listeyi oluşturun.', 'warn');
            return false;
        }

        if (!state.scheduleIsFresh()) {
            ui.toast('Çizelge güncel değil — “Listeyi oluştur” ile yeniden üretin.', 'error');
            ui.status('Döküm engellendi: çizelge bayat (kural/personel değişmiş).', 'error');
            return false;
        }

        return true;
    },

    /** Birim, dönem ve belge numarası: Excel, PDF ve yazdırma için tek kaynak. */
    documentHead() {
        const first = state.schedule[0];
        const last = state.schedule[state.schedule.length - 1];

        return {
            unit: state.settings.unit || this.DEFAULT_UNIT,
            period: `${dates.toDisplay(first.date)} - ${dates.toDisplay(last.date)}`,
            docNo: state.documentNo()
        };
    },

    /** jsPDF's standard fonts have no Turkish glyphs, so exports use ASCII-safe text. */
    toAscii(text) {
        const map = {
            'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I',
            'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
        };
        return String(text || '').replace(/[çÇğĞıİöÖşŞüÜ]/g, ch => map[ch]);
    },

    /**
     * vendor/roboto.js (tools/make-pdf-font.js üretimi) window.PDF_FONTS'i doldurur.
     * O dosya yoksa belge yerleşik Helvetica + ASCII katlamasiyla üretilir - yani
     * "Şehir" yine "Sehir" olur; uygulama yine de çökmez.
     */
    pdfFonts() {
        return window.PDF_FONTS && window.PDF_FONTS.regular ? window.PDF_FONTS : null;
    },

    /** Yazı tipini belgeye kaydeder; Unicode kullanılabilüyorsa true döner. */
    registerFont(doc) {
        const fonts = this.pdfFonts();
        // Her çağrıda sıfırlanır: font yoksa önceki belgeden kalma "bold var" bilgisi
        // yanlış yüz seçimine yol açardı.
        this.hasBoldFace = false;
        if (!fonts) return false;

        doc.addFileToVFS('Roboto-Regular.ttf', fonts.regular);
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');

        // Kaba yüz ancak Roboto-Bold.ttf eklenirse vardır; yoksa başlıklar normal ağırlıkta
        // çizilir (tablo başlığı zaten dolu mavi zemin + beyaz yazıyla ayrışıyor).
        this.hasBoldFace = !!fonts.bold;
        if (this.hasBoldFace) {
            doc.addFileToVFS('Roboto-Bold.ttf', fonts.bold);
            doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
        }
        return true;
    },

    // ---------- Sheet + column recognition ----------
    findSheet(workbook, patterns, exclude) {
        const names = workbook.SheetNames || [];

        for (const pattern of patterns) {
            const found = names.find(name => pattern.test(name));
            if (found) return found;
        }
        if (exclude) return names.find(name => !exclude.test(name));
        return names[0];
    },

    /**
     * Excel headers differ between teams, so columns are matched semantically.
     * Turkish characters are folded to ASCII first, otherwise "Nöbet Sayısı" would not match.
     */
    findColumn(row, keywords) {
        const clean = (value) => String(value).toLowerCase()
            .replace(/ı/g, 'i').replace(/İ/g, 'i')
            .replace(/ş/g, 's').replace(/ğ/g, 'g')
            .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '');

        const keys = Object.keys(row);

        for (const keyword of keywords) {
            const key = keys.find(k => clean(k) === keyword) || keys.find(k => clean(k).includes(keyword));
            const value = key ? row[key] : null;
            if (value !== undefined && value !== null && String(value).trim() !== '') return value;
        }
        return null;
    },

    // ---------- Excel: template ----------
    downloadTemplate() {
        if (!this.xlsxReady()) return;

        const book = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet([
            { 'Ad Soyad': 'Ahmet Yılmaz', 'Nöbet Sayısı': 0, 'Hafta Sonu': 0 },
            { 'Ad Soyad': 'Ayşe Demir', 'Nöbet Sayısı': 0, 'Hafta Sonu': 0 }
        ]), 'Personel');

        XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet([
            { 'Personel ID': 'ornek-id', 'Ad Soyad': 'Ahmet Yılmaz', 'Tarih': dates.addMonths(dates.today(), 1), 'Açıklama': 'İzin' }
        ]), 'Mazeretler');

        XLSX.writeFile(book, 'jupiter_nobet_sablonu.xlsx');
        ui.toast('Şablon indirildi (Personel + Mazeretler).', 'ok');
    },

    // ---------- Excel: personnel export ----------
    exportPersonnel() {
        if (!this.xlsxReady()) return;

        if (!state.personnel.length) {
            ui.toast('Dışa aktarılacak personel yok.', 'info');
            return;
        }

        const persons = state.personnel.map(p => ({
            'Personel ID': p.id,
            'Ad Soyad': p.name,
            'Nöbet Sayısı': p.shifts,
            'Hafta Sonu': p.weekends
        }));

        const excuses = [];
        state.personnel.forEach(p => p.excuses.forEach(excuse => excuses.push({
            'Personel ID': p.id,
            'Ad Soyad': p.name,
            'Tarih': excuse.date,
            'Açıklama': excuse.note
        })));

        const book = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(persons), 'Personel');
        if (excuses.length) XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(excuses), 'Mazeretler');

        XLSX.writeFile(book, `jupiter_personel_${dates.today()}.xlsx`);
        ui.toast(`${persons.length} personel${excuses.length ? ` + ${excuses.length} mazeret` : ''} aktarıldı.`, 'ok');
    },

    // ---------- Excel: import ----------
    importPersonnel() {
        if (!this.xlsxReady()) return;

        const picker = document.createElement('input');
        picker.type = 'file';
        picker.accept = '.xlsx, .xls';

        picker.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onerror = () => ui.toast('Dosya okunamadı.', 'error');
            reader.onload = (loadEvent) => {
                try {
                    this.importWorkbook(XLSX.read(loadEvent.target.result, { type: 'array', cellDates: true }));
                } catch (error) {
                    console.error('İçe aktarma hatası:', error);
                    ui.toast(`Dosya okunamadı: ${error.message}`, 'error');
                }
            };

            // readAsArrayBuffer: readAsBinaryString is deprecated and corrupts non-ASCII files.
            reader.readAsArrayBuffer(file);
        };

        picker.click();
    },

    importWorkbook(book) {
        const staffSheet = this.findSheet(book, [/personel/i, /calisan/i], /mazeret/i);
        const excuseSheet = this.findSheet(book, [/mazeret/i]);

        const added = this.importStaffRows(XLSX.utils.sheet_to_json(book.Sheets[staffSheet] || {}));
        const excuses = this.importExcuseRows(XLSX.utils.sheet_to_json(book.Sheets[excuseSheet] || {}));

        if (!added && !excuses) {
            ui.toast('Yeni veri bulunamadı (aynı isimler atlandı).', 'warn');
            ui.status('İçe aktarma: yeni kayıt yok.', 'warn');
            return;
        }

        // Aktarılan mazeret/kişi dağıtımı değiştirir: eski liste silinmez, bayatlar.
        state.touchScheduleValidity();
        if (added || excuses) state.savePersonnel();

        const summary = [added ? `${added} personel` : null, excuses ? `${excuses} mazeret` : null].filter(Boolean).join(', ');
        ui.toast(`İçe aktarma tamam: ${summary}.`, 'ok');
        ui.status(`İçe aktarma tamam: ${summary}.`, 'ok');
    },

    importStaffRows(rows) {
        const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

        const prepared = rows.map(row => ({
            name: clean(this.findColumn(row, ['adsoyad', 'isim', 'ad', 'name'])),
            shifts: this.toNumber(this.findColumn(row, ['nobetsayisi', 'nobet', 'shift', 'duty'])),
            weekends: this.toNumber(this.findColumn(row, ['haftasonu', 'weekend', 'sonu']))
        }));

        return state.importPersons(prepared);
    },

    importExcuseRows(rows) {
        let added = 0;

        rows.forEach(row => {
            const id = String(this.findColumn(row, ['personelid', 'id']) || '').trim();
            const name = String(this.findColumn(row, ['adsoyad', 'isim', 'ad', 'name']) || '').trim();
            const person = state.personById(id)
                || state.personnel.find(p => p.name.toLocaleLowerCase('tr-TR') === name.toLocaleLowerCase('tr-TR'));

            if (!person) return;

            const date = dates.normalize(this.findColumn(row, ['tarih', 'date', 'gun', 'mazerettarihi', 'mazzerettarihi']));
            if (!dates.isIso(date)) return;
            if (person.excuses.some(e => e.date === date)) return;

            person.excuses.push({ date, note: String(this.findColumn(row, ['aciklama', 'not', 'sebep', 'note']) || '').trim() });
            person.excuses.sort((a, b) => a.date.localeCompare(b.date));
            added++;
        });

        return added;
    },

    /** Sayisal hucreler bos/metin olabilir; 0'a indirgenir. */
    toNumber(value) {
        const parsed = parseInt(value, 10);
        return Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
    },

    // ---------- Excel: roster ----------
    exportRoster() {
        if (!this.xlsxReady() || !this.rosterReady()) return;

        const head = this.documentHead();
        const columns = Math.max(1, state.settings.perDay);
        const showExcused = state.showsExcused();

        const rows = state.schedule.map(day => {
            const record = {
                'Tarih': dates.toDisplay(day.date),
                'Gün': dates.weekdayLong(day.date)
            };

            day.assigned.forEach((person, index) => {
                record[`Nöbetçi ${index + 1}`] = person ? person.name : '';
            });

            // Gerekçe kişisel olabiliyor: görünürlük kapalıysa sütun hiç açılmaz.
            if (showExcused) record['Mazeretli'] = state.excusedLabel(day);

            return record;
        });

        const book = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(rows, { origin: 'A5' });

        // Künye: birim, dönem ve belge numarası (ana ekranda değil, çıktıda yer alır).
        XLSX.utils.sheet_add_aoa(sheet, [
            [head.unit],
            [`Dönem: ${head.period}`],
            [`Belge No: ${head.docNo}`],
            []
        ], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(sheet, [
            [],
            [],
            [`Not: ${state.settings.minRestDays} gün dinlenme kuralı ve günde ${columns} kişi esas alınmıştır.`]
        ], { origin: `A${rows.length + 7}` });

        sheet['!cols'] = [
            { wch: 12 }, { wch: 12 },
            ...Array.from({ length: columns }, () => ({ wch: 18 })),
            ...(showExcused ? [{ wch: 40 }] : [])
        ];

        XLSX.utils.book_append_sheet(book, sheet, 'Nöbet Listesi');
        const summary = this.summaryRows();
        XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(summary), 'Özet');
        XLSX.writeFile(book, `jupiter_nobet_listesi_${dates.today()}.xlsx`);

        ui.toast(`${rows.length} günlük liste Excel olarak aktarıldı (çizelge + özet).`, 'ok');
        ui.status('Excel üretildi.', 'ok');
    },

    /**
     * Kişi başı yük dökümü (eski sürümdeki ikinci sayfanın bugünkü karşılığı): çizelge
     * tek başına kimin ne kadar nöbet tuttuğunu söylemediği için belgeye eklenir.
     * Yalnız sayılar yer alır - gerekçe metni burada yazılmaz.
     */
    summaryRows() {
        return state.rank().map(item => {
            const person = state.personById(item.id);
            const carried = person ? person.shifts : 0;

            return {
                'Personel': item.name,
                'Devir': carried,
                'Bu dönem': item.total - carried,
                'Toplam': item.total,
                'Hafta sonu': item.weekend,
                'Mazeret günü': person ? person.excuses.length : 0
            };
        });
    },

    // ---------- PDF ----------
    /**
     * Tablo düz jsPDF ile çizilir (autoTable eklentisi yok); böylece PDF çıktısı
     * tıpkı uygulamanın geri kalanı gibi tamamen çevrimdışı çalışır.
     */
    exportPdf() {
        const jsPDFLibrary = window.jspdf && window.jspdf.jsPDF;
        if (!jsPDFLibrary) {
            ui.toast('PDF kütüphanesi yüklü değil: vendor/jspdf.umd.min.js eksik.', 'error');
            return;
        }
        if (!this.rosterReady()) return;

        // putOnlyUsedFonts: kullanılmayan yerleşik yazıların (14 standart font) belgeye
        // yazılmasını engeller - gömülü Roboto varken belge gereksiz büyümesin.
        const doc = new jsPDFLibrary({ putOnlyUsedFonts: true });

        // Font varsa Türkçe olduğu gibi yazılır; yoksa glifi olmayan harfler "?" olacağı
        // için ASCII katlamasına düşülür.
        const unicode = this.registerFont(doc);
        const family = unicode ? 'Roboto' : 'helvetica';
        const boldFace = unicode && !this.hasBoldFace ? 'normal' : 'bold';
        const txt = (value) => (unicode ? String(value) : this.toAscii(value));

        const head = this.documentHead();
        const columns = Math.max(1, state.settings.perDay);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 12;
        const usable = pageWidth - margin * 2;
        const lineHeight = 4.6;
        const pad = 1.8;
        const bottomLimit = pageHeight - 14;

        const dateWidth = 20;
        const dayWidth = 18;
        const showExcused = state.showsExcused();
        // Mazeret sütunu gizliyse genişlik de kalkar: nöbetçi sütunları boşta kalan yeri alır.
        const noteWidth = showExcused ? Math.max(24, Math.min(48, usable * 0.26)) : 0;
        const dutyWidth = Math.max(16, (usable - dateWidth - dayWidth - noteWidth) / columns);
        const widths = [dateWidth, dayWidth, ...Array.from({ length: columns }, () => dutyWidth)];
        if (showExcused) widths.push(noteWidth);

        const headerCells = ['Tarih', 'Gün',
            ...Array.from({ length: columns }, (_, i) => `Nöbetçi ${i + 1}`)];
        if (showExcused) headerCells.push('Mazeretli');

        const wrap = (text, index) => doc.splitTextToSize(txt(text || '—'), widths[index] - pad * 2);
        const heightOf = (lines) => Math.max(...lines.map(l => l.length)) * lineHeight + pad * 2;

        const buildRow = (cells, style) => {
            const lines = cells.map((cell, index) => wrap(cell, index));
            return { lines, height: heightOf(lines), style };
        };

        const paintRow = (row) => {
            const isHeader = row.style === 'head';

            if (isHeader) {
                doc.setFillColor(30, 64, 175);
                doc.rect(margin, y, usable, row.height, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFont(family, boldFace);
            } else {
                if (row.style === 'zebra') {
                    doc.setFillColor(241, 245, 249);
                    doc.rect(margin, y, usable, row.height, 'F');
                }
                doc.setTextColor(23, 33, 46);
                doc.setFont(family, 'normal');
            }

            doc.setFontSize(8);

            let x = margin;
            row.lines.forEach((lines, index) => {
                doc.text(lines, x + pad, y + pad + 2.6, { maxWidth: widths[index] - pad * 2 });
                x += widths[index];
            });

            doc.setDrawColor(170);
            doc.setLineWidth(.2);
            doc.rect(margin, y, usable, row.height);

            x = margin;
            for (let index = 0; index < widths.length - 1; index++) {
                x += widths[index];
                doc.line(x, y, x, y + row.height);
            }

            y += row.height;
        };

        // Künye başlığı: 13 puntodan başlayıp sığana kadar küçülür; taban puntoya
        // dayanırsa satırlara bölünür - kurum adı hiçbir zaman kesilmez.
        const title = txt(head.unit);
        let titleSize = 13;
        doc.setFont(family, boldFace);        // ölçüm, çizilecek yazı tipiyle yapılmalı
        for (; titleSize > 7; titleSize -= 0.5) {
            doc.setFontSize(titleSize);
            if (doc.getTextWidth(title) <= usable) break;
        }
        titleSize = Math.max(7, titleSize);
        doc.setFontSize(titleSize);

        const titleLines = doc.splitTextToSize(title, usable);
        const titleStep = titleSize * 0.36;            // pt -> mm, yaklaşık satır yüksekliği
        const periodY = 14 + (titleLines.length - 1) * titleStep + 4.5;
        const docNoY = periodY + 4;
        const tableTop = docNoY + 5.5;                 // tek satır başlıkta bugünkü 28 mm

        let y = tableTop;
        const headerRow = buildRow(headerCells, 'head');
        paintRow(headerRow);

        state.schedule.forEach((day, index) => {
            const cells = [
                dates.toDisplay(day.date),
                dates.weekdayLong(day.date),
                ...Array.from({ length: columns }, (_, column) => day.assigned[column] ? day.assigned[column].name : '')
            ];
            if (showExcused) cells.push(state.excusedLabel(day));

            const row = buildRow(cells, index % 2 ? 'zebra' : 'plain');

            // Never split a row over two pages: repeat the header on the new page instead.
            if (y + row.height > bottomLimit) {
                doc.addPage();
                y = tableTop - 2;
                paintRow(headerRow);
            }
            paintRow(row);
        });

        // İmza bloğu: ana ekranda gösterilmez, yalnız dökümde yer alır.
        if (y + 30 > bottomLimit) {
            doc.addPage();
            y = tableTop;
            paintRow(headerRow);
        }

        const lineY = y + 16;
        const rightEdge = pageWidth - margin;
        const column = usable * .3;

        doc.setDrawColor(90);
        doc.setLineWidth(.3);
        doc.line(margin, lineY, margin + column, lineY);
        doc.line(rightEdge - column, lineY, rightEdge, lineY);

        doc.setFont(family, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 66, 76);
        doc.text(txt('Hazırlayan'), margin + column / 2, lineY + 4, { align: 'center' });
        doc.text(txt('Onaylayan'), rightEdge - column / 2, lineY + 4, { align: 'center' });

        const total = doc.internal.getNumberOfPages();
        for (let page = 1; page <= total; page++) {
            doc.setPage(page);
            doc.setTextColor(23, 33, 46);
            doc.setFont(family, boldFace);
            doc.setFontSize(titleSize);
            doc.text(titleLines, margin, 14);
            doc.setFont(family, 'normal');
            doc.setFontSize(9);
            doc.text(txt(`Dönem: ${head.period}`), margin, periodY);
            doc.text(txt(`Belge No: ${head.docNo}`), margin, docNoY);
            doc.setFontSize(8);
            doc.setTextColor(110, 120, 135);
            doc.text(txt(`Sayfa ${page}/${total}`), pageWidth - margin, pageHeight - 8, { align: 'right' });
        }

        this.showPdf(doc, `jupiter_nobet_listesi_${dates.today()}.pdf`);
    },

    /** PDF'yi indirmek yerine tarayıcının kendi görüntüleyicisinde yeni sekmede açar. */
    showPdf(doc, fileName) {
        let tab = null;

        try {
            // Tıklama zinciri içinde çağrılıyor; aksi halde tarayıcı açılır pencereyi engeller.
            tab = window.open(doc.output('bloburl'), '_blank');
        } catch (error) {
            console.error('PDF sekmesi açılamadı:', error);
        }

        if (tab) {
            ui.toast('PDF yeni sekmede açıldı.', 'ok');
            ui.status('PDF görüntüleyicide açıldı.', 'ok');
            return;
        }

        // Sekme engellendiyse çıktı kaybolmasın: dosyaya indir.
        doc.save(fileName);
        ui.toast('Yeni sekme açılamadı; PDF dosya olarak indirildi.', 'warn');
        ui.status('PDF indirildi (tarayıcı sekme açmayı engelledi).', 'warn');
    },

    // ---------- Yük analizi ----------
    openAnalysis() {
        if (!state.hasSchedule()) {
            ui.toast('Analiz için önce çizelgeyi oluşturun.', 'warn');
            return;
        }

        const rank = state.rank();
        const min = rank.length ? rank[rank.length - 1].total : 0;
        const max = rank.length ? rank[0].total : 0;
        const average = rank.length ? rank.reduce((sum, p) => sum + p.total, 0) / rank.length : 0;

        document.getElementById('rankBalance').textContent = rank.length
            ? `En çok ${max} · en az ${min} · ortalama ${ui.measure(average)} görev` +
              (max - min <= 1 ? ' · dağılım dengeli' : ` · fark ${max - min} görev`)
            : 'Kişi yok';

        const rows = [this.analysisHead()];
        rank.forEach(item => rows.push(this.analysisRow(item, max)));
        document.getElementById('rankList').replaceChildren(...rows);

        ui.openModal('rankModal');
    },

    analysisHead() {
        const row = ui.create(`
            <div class="rank__row rank__head">
                <span>Personel</span><span>Toplam</span><span>H. sonu</span><span>Oran</span>
            </div>`);
        return row;
    },

    analysisRow(item, max) {
        const row = ui.create(`
            <div class="rank__row">
                <span class="rank__name"></span>
                <span class="rank__num"></span>
                <span class="rank__num"></span>
                <span class="rank__bar"><i></i></span>
            </div>`);

        const numbers = row.querySelectorAll('.rank__num');
        numbers[0].textContent = item.total;
        numbers[1].textContent = item.weekend;
        row.querySelector('.rank__name').textContent = item.name;
        row.querySelector('.rank__bar i')
            .style.setProperty('--w', `${max ? Math.round((item.total / max) * 100) : 0}%`);

        return row;
    }
};
