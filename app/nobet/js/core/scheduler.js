/**
 * scheduler.js - duty distribution engine.
 *
 * Backtracking search over consecutive days with:
 *   hard rules   : excuses, rest days, max consecutive days, max total duties
 *   fairness     : least-loaded person first (weekends can be balanced separately)
 *   safety       : bounded branching + a wall-clock timeout, so the UI never freezes
 */

const scheduler = {
    TIMEOUT_MS: 10000,
    MAX_BRANCH_CANDIDATES: 15,
    MAX_COMBINATIONS: 50,

    /**
     * @param {Array} personnel  state.personnel
     * @param {Object} settings  state.settings
     * @returns {{ok: boolean, days?: Array, error?: string, detail?: string}}
     */
    generate(personnel, settings) {
        const rules = {
            perDay: Math.max(1, settings.perDay),
            maxConsecutive: Math.max(1, settings.maxConsecutive),
            minRestDays: Math.max(0, settings.minRestDays),
            maxTotal: Math.max(0, settings.maxTotal),
            splitWeekends: settings.splitWeekends
        };

        const days = this.buildDays(settings.start, settings.end);
        if (!days.length) {
            return { ok: false, error: 'Geçersiz tarih aralığı.', detail: 'Bitiş tarihi, başlangıç tarihinden önce olamaz.' };
        }

        const staff = personnel.map(person => this.createWorker(person));

        if (staff.length < rules.perDay) {
            return {
                ok: false,
                error: 'Yetersiz personel.',
                detail: `Her gün ${rules.perDay} nöbetçi gerekiyor, listede yalnızca ${staff.length} personel var.`
            };
        }

        // Kaçınılmaz aritmetik: çözücüye girmeden söyle. Aksi halde 10 saniye
        // boşuna aranır ve suçlu olarak yanlış kural (dinlenme) gösterilir.
        const shortfall = this.capacityMessage(staff.length, days.length, rules.perDay, rules.maxTotal);
        if (shortfall) return { ok: false, error: 'Üst sınır yetersiz.', detail: shortfall };

        // Her çalışanın dönem içi müsaitliği: eşit yüklerde önce en az günü olan
        // aday çağrılır, ayrıca bu kişinin kalan müsait gün sayısı aşağıda "zorunlu
        // gün" hesabında kullanılır (freeFrom). Aksi halde tek uygun günü başkasına
        // kaptıran kişi tüm dönem sıfırda kalabilir.
        staff.forEach((worker) => {
            const freeFrom = new Array(days.length + 1).fill(0);
            for (let i = days.length - 1; i >= 0; i--) {
                freeFrom[i] = freeFrom[i + 1] + (worker.excuses.has(days[i].date) ? 0 : 1);
            }
            worker.freeFrom = freeFrom;
            worker.availability = freeFrom[0];
        });

        const started = performance.now();

        // İlk bulunan çözüm değil, EN ADİL çözüm dönmeli: önce herkesin taban
        // (floor) ile tavan (ceil) arasında kaldığı kusursuz denge denenir; tutmazsa
        // bir tık toleranslı, o da tutmazsa kullanıcının kendi sınırıyla aranır.
        // Son deneme her zaman çalıştığı için var olan bir çizelge "bulunamadı" olmaz.
        const demand = days.length * rules.perDay;
        const floor = Math.floor(demand / staff.length);
        const ceil = Math.ceil(demand / staff.length);
        const ceiling = rules.maxTotal > 0 ? rules.maxTotal : Infinity;

        const trials = [];
        const addTrial = (minTotal, maxTotal) => {
            const same = trials.some(trial => trial.minTotal === minTotal && trial.maxTotal === maxTotal);
            if (!same) trials.push({ minTotal, maxTotal });
        };

        // 1) kusursuz denge: herkes [floor, ceil]  2) tabani koru, tavani kullaniciya birak
        // (mazeret yuzunden ceil'a siginayan olurken biri sıfırda kalmasın)  3) serbest arama.
        if (floor > 0) {
            if (ceil <= ceiling) addTrial(floor, ceil);
            addTrial(floor, rules.maxTotal);
        }
        addTrial(0, rules.maxTotal);

        // Sıkı denemeler bütçenin küçük bir dilimini alır; kalan süre son (en gevşek)
        // denemeye saklanır - eskiden tek arama tüm bütçeyi kullanıyordu.
        const share = Math.max(1, Math.floor((this.TIMEOUT_MS * 0.12) / Math.max(1, trials.length - 1)));
        let last = null;

        try {
            for (let i = 0; i < trials.length; i++) {
                const isLast = i === trials.length - 1;
                const deadline = isLast && trials.length > 1 ? started + this.TIMEOUT_MS : performance.now() + share;
                const attempt = this.search(days, staff, { ...rules, ...trials[i] }, deadline);

                if (attempt.solution) return { ok: true, days: attempt.solution };
                last = attempt;
                if (isLast && attempt.timedOut) {
                    return {
                        ok: false,
                        error: 'Dağılım yetiştirilemedi.',
                        detail: `Aralık çok uzun veya kurallar çok sıkı (${this.TIMEOUT_MS / 1000} saniyeden fazla sürdü). ` +
                            'Dinlenme gününü azaltmayı ya da toplam nöbet sınırını gevşetmeyi deneyin.'
                    };
                }
            }
        } catch (error) {
            console.error('Çözücü hatası:', error);
            return {
                ok: false,
                error: 'Planlama sırasında hata oluştu.',
                detail: 'Kuralları gevşetip yeniden deneyin. Ayrıntı tarayıcı konsolunda.'
            };
        }

        // Ayrintiyi en gevşek deneme verir: sıkı denemede her şey "limit"e takilir.
        return { ok: false, error: 'Uygun dağılım bulunamadı.', detail: this.analyze(last.blockedDays, days) };
    },

    /**
     * Tek arama geçişi. İş yükleri geri alındığı için staff aramalar arasında
     * temiz kalır; deadline aşılınca timedOut ile ayrılır (UI donmasın).
     */
    search(days, staff, rules, deadline) {
        const blockedDays = new Map();   // day index -> why people could not serve
        let timedOut = false;

        const solve = (dayIndex) => {
            if (performance.now() > deadline) {
                timedOut = true;
                return null;
            }
            if (dayIndex === days.length) return [];

            const day = days[dayIndex];
            const eligible = [];
            const blockers = new Map();

            for (const worker of staff) {
                const reason = this.blockReason(worker, day, rules);
                if (reason) blockers.set(reason, (blockers.get(reason) || 0) + 1);
                else eligible.push(worker);
            }

            if (eligible.length < rules.perDay) {
                if (!blockedDays.has(dayIndex)) blockedDays.set(dayIndex, blockers);
                return null;
            }

            this.sortByFairness(eligible, day, rules.splitWeekends);

            // Taban zorlaması: eksiği kalan müsait gün sayısına inen kişi BU gün
            // alınmazsa hedefi hiç tutturamaz. Bu, "herkes eşit alabilirken biri
            // sıfırda kalıyor" adaletsizliğini arama sırasında keser.
            const urgent = rules.minTotal > 0
                ? eligible.filter(worker => {
                    const missing = rules.minTotal - worker.assigned;
                    return missing > 0 && missing >= worker.freeFrom[dayIndex];
                })
                : [];

            if (urgent.length > rules.perDay) {
                if (!blockedDays.has(dayIndex)) {
                    blockers.set('limit', urgent.length);
                    blockedDays.set(dayIndex, blockers);
                }
                return null;
            }

            const open = eligible.filter(worker => !urgent.includes(worker));
            const pool = open.slice(0, this.MAX_BRANCH_CANDIDATES);

            for (const combo of this.getCombinations(pool, rules.perDay - urgent.length)) {
                const pick = urgent.concat(combo);
                const snapshots = pick.map(worker => this.snapshot(worker));
                pick.forEach(worker => this.assign(worker, day));

                const rest = solve(dayIndex + 1);
                if (rest !== null) return [this.buildDay(day, pick, staff), ...rest];

                pick.forEach((worker, i) => Object.assign(worker, snapshots[i]));
            }

            return null;
        };

        return { solution: solve(0), timedOut, blockedDays };
    },

    // ---------- Day & worker state ----------

    /**
     * Dağıtılacak nöbet sayısı, kişi başı üst sınırın verdiği kapasiteyi aşıyorsa
     * açıklama metni; sığabiliyorsa null. Alan adı form etiketiyle aynı kalmalı.
     */
    capacityMessage(staffCount, dayCount, perDay, maxTotal) {
        if (!(maxTotal > 0) || !(staffCount > 0)) return null;

        const demand = dayCount * perDay;
        const capacity = maxTotal * staffCount;
        if (demand <= capacity) return null;

        return `${demand} nöbet dağıtılacak; “Maks. Toplam Nöbet” ${maxTotal} olduğu için ` +
            `en fazla ${capacity} nöbet verilebilir. Sınırı yükseltin ya da personel ekleyin.`;
    },

    buildDays(startIso, endIso) {
        return dates.list(startIso, endIso).map((date, index) => ({
            index,
            date,
            weekend: dates.isWeekend(date)
        }));
    },

    /** Excuse dates are normalized once so imported "DD.MM.YYYY" values behave like ISO ones. */
    createWorker(person) {
        return {
            id: person.id,
            name: person.name,
            excuses: new Map(person.excuses.map(e => [e.date, e.note])),
            availability: 0,      // dönem içindeki çalışabilir gün sayısı (aşağıda doldurulur)
            freeFrom: null,       // freeFrom[i] = i. günden dönem sonuna kadar müsait gün sayısı
            score: 0,
            weekdayCount: 0,
            weekendCount: 0,
            assigned: 0,
            streak: 0,
            lastIndex: null
        };
    },

    /** Short reason key when this worker cannot take this day; null = available. */
    blockReason(worker, day, rules) {
        if (worker.excuses.has(day.date)) return 'excuse';

        if (rules.maxTotal > 0 && worker.assigned >= rules.maxTotal) return 'limit';

        if (worker.lastIndex !== null) {
            const gap = day.index - worker.lastIndex;
            if (gap === 1) {
                if (worker.streak >= rules.maxConsecutive) return 'streak';
            } else if (gap - 1 < rules.minRestDays) {
                return 'rest';
            }
        }

        return null;
    },

    /**
     * Fairness order. Ties are broken by shuffling first, so people with equal load
     * have an equal chance instead of always following list order.
     * Sıra: 1) yük 2) müsaitlik (en kısıtlı önce) 3) ağırlıklı puan.
     */
    sortByFairness(candidates, day, splitWeekends) {
        for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }

        const loadOf = (worker) => (splitWeekends
            ? (day.weekend ? worker.weekendCount : worker.weekdayCount)
            : worker.assigned);

        // Once görev sayısı, sonra kısıtlılık, sonra ağırlıklı puan karşılaştırılır: ikisini tek sayıya
        // katlayıp toplamak uzun dönemde bozulur (puan 1000'i aşınca ağırlık anlamsızlaşır).
        candidates.sort((a, b) => loadOf(a) - loadOf(b) || a.availability - b.availability || a.score - b.score);
    },

    snapshot(worker) {
        return {
            score: worker.score,
            weekdayCount: worker.weekdayCount,
            weekendCount: worker.weekendCount,
            assigned: worker.assigned,
            streak: worker.streak,
            lastIndex: worker.lastIndex
        };
    },

    assign(worker, day) {
        // Weekends weigh more, so the score also pushes towards balanced weekends.
        worker.score += day.weekend ? 3 : 1;
        worker.streak = worker.lastIndex === day.index - 1 ? worker.streak + 1 : 1;
        worker.lastIndex = day.index;
        worker.assigned++;
        if (day.weekend) worker.weekendCount++;
        else worker.weekdayCount++;
    },

    buildDay(day, pick, staff) {
        return {
            date: day.date,
            weekend: day.weekend,
            assigned: pick.map(worker => ({ id: worker.id, name: worker.name })),
            excused: staff
                .filter(worker => worker.excuses.has(day.date))
                .map(worker => ({ id: worker.id, name: worker.name, note: worker.excuses.get(day.date) }))
        };
    },

    // ---------- Helpers ----------

    getCombinations(pool, size) {
        const results = [];

        const walk = (start, current) => {
            if (results.length >= this.MAX_COMBINATIONS) return;
            if (current.length === size) {
                results.push([...current]);
                return;
            }
            for (let i = start; i < pool.length; i++) {
                current.push(pool[i]);
                walk(i + 1, current);
                current.pop();
            }
        };

        walk(0, []);
        return results;
    },

    /** Explain the bottleneck day, and point at the rule that actually blocks it. */
    analyze(blockedDays, days) {
        if (blockedDays.size === 0) {
            return 'Kurallar aynı anda karşılanamıyor. Dinlenme ve peş peşe gün sınırlarını gözden geçirin.';
        }

        // What to relax, per blocking reason: naming the wrong knob wastes the user's time.
        // Field names below must match the form labels in index.html.
        const advice = {
            excuse: 'mazeretli gün sayısını azaltın veya personel ekleyin',
            rest: '“Min. Dinlenme (Gün)” değerini azaltın',
            streak: '“Maks. Peş Peşe Gün” sayısını artırın',
            limit: '“Maks. Toplam Nöbet” sınırını artırın veya personel ekleyin'
        };

        // "3" is the number of people blocked by that rule - say "kişi" so it is not read
        // as the value of the rule itself.
        const label = {
            excuse: 'Mazeretli olan',
            rest: 'Dinlenme kuralına takılan',
            streak: 'Peş peşe kuralına takılan',
            limit: 'Üst sınıra ulaşan'
        };

        let worstIndex = null;
        let worstCount = -1;

        for (const [index, blockers] of blockedDays) {
            const total = [...blockers.values()].reduce((sum, value) => sum + value, 0);
            if (total > worstCount) {
                worstCount = total;
                worstIndex = index;
            }
        }

        const reasons = [...blockedDays.get(worstIndex).entries()].sort((a, b) => b[1] - a[1]);
        const reasonText = reasons.map(([key, count]) => `${label[key]}: ${count} kişi`).join(', ');
        const suggestion = reasons
            .filter(([key]) => advice[key])
            .slice(0, 2)
            .map(([key]) => advice[key])
            .join(' veya ');

        return `${dates.formatLong(days[worstIndex].date)} günü kilitlendi (${reasonText}).` +
            (suggestion ? ` Öneri: ${suggestion}.` : ' Kuralları gevşetip yeniden deneyin.');
    }
};
