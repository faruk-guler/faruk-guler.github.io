/**
 * Nöbet Planlama Modülü
 * Features:
 * - Backtracking with weighted randomization
 * - Separated Weekend/Weekday fairness balancing
 * - Max shifts hard constraint
 * - Enhanced conflict analysis
 */

const scheduler = {
    /**
     * Generate duty schedule
     */
    generate(personeller, baslangic, bitis, ayarlar) {
        const {
            nobetciSayisi = 1,
            maxConsec = 2,
            minDaysBetween = 2,
            haftaSonuAyri = true,
            maxShifts = 0 // 0 means no limit
        } = ayarlar;

        // 1. Prepare Days
        const days = [];
        for (let d = new Date(baslangic); d <= new Date(bitis); d.setDate(d.getDate() + 1)) {
            days.push({
                date: new Date(d),
                dateStr: d.toISOString().split('T')[0],
                dayOfWeek: d.getDay(),
                isWeekend: d.getDay() === 0 || d.getDay() === 6
            });
        }

        // 2. Prepare Personnel State
        const personState = personeller.map(p => ({
            id: p.id,
            ad: p.ad,
            // Geçmiş nöbet sayılarını (tarayıcı/Excel verisi) dikkate almıyoruz.
            // Herkes listeye sıfırdan, eşit şartlarda başlar (Kullanıcı talebi).
            // Bu, geçmiş verilerin mevcut nesli/dağılımı manipüle etmesini engeller.
            initialScore: 0,
            currentScore: 0,
            weekdayCount: 0,
            weekendCount: 0,
            totalAssigned: 0,
            currentStreak: 0,
            history: [],
            mazeretler: new Set((p.mazeretler || []).map(m => {
                // Normalize date to YYYY-MM-DD
                if (m.tarih.includes('.')) {
                    return m.tarih.split('.').reverse().join('-');
                }
                return m.tarih;
            })),
            lastAssignedTime: p.sonNobet ? new Date(p.sonNobet).getTime() : null
        }));

        // Failure tracking for analysis
        const failurePoints = {};

        const startTime = performance.now();
        const timeout = 5000; // 5 seconds safety limit

        // 3. Backtracking Solver
        const solve = (dayIndex) => {
            // Safety: Prevention of infinite/long loops
            if (performance.now() - startTime > timeout) {
                return null; 
            }

            // Base case: All days filled
            if (dayIndex === days.length) {
                return [];
            }

            const currentDay = days[dayIndex];
            const currentDayTime = currentDay.date.getTime();
            const excusedToday = [];

            // Find candidates
            let candidates = personState.filter(p => {
                // Check excuses
                const matchedExcuse = p.mazeretler && p.mazeretler.find(m => {
                    const mDate = m.tarih.includes('.') ? m.tarih.split('.').reverse().join('-') : m.tarih;
                    return mDate === currentDay.dateStr;
                });

                if (matchedExcuse) {
                    excusedToday.push({ id: p.id, name: p.ad, aciklama: matchedExcuse.aciklama || "" });
                    return false;
                }

                // 2. Max Shifts Check
                if (maxShifts > 0 && p.totalAssigned >= maxShifts) {
                    this.logFailure(failurePoints, currentDay.dateStr, "Maks. Nöbet Dolu");
                    return false;
                }

                // 3. Constraint Logic (Consecutive & Break)
                if (p.lastAssignedTime) {
                    const diffDays = Math.round((currentDayTime - p.lastAssignedTime) / 86400000);

                    if (diffDays === 1) {
                        // Consecutive day
                        if (p.currentStreak >= maxConsec) {
                            this.logFailure(failurePoints, currentDay.dateStr, "Peş Peşe Sınırı");
                            return false;
                        }
                    } else if (diffDays > 1) {
                        // Break check
                        if ((diffDays - 1) < minDaysBetween) {
                            this.logFailure(failurePoints, currentDay.dateStr, "Dinlenme Günü Yetersiz");
                            return false;
                        }
                    }
                }

                return true;
            });

            // 1. Random shuffle to break ties completely
            candidates.sort(() => Math.random() - 0.5);

            // 2. Sort candidates by Fairness
            candidates.sort((a, b) => {
                let scoreA, scoreB;
                if (haftaSonuAyri) {
                    scoreA = (a.initialScore + a.currentScore) + (currentDay.isWeekend ? a.weekendCount * 5 : a.weekdayCount);
                    scoreB = (b.initialScore + b.currentScore) + (currentDay.isWeekend ? b.weekendCount * 5 : b.weekdayCount);
                } else {
                    scoreA = a.initialScore + a.currentScore + a.totalAssigned;
                    scoreB = b.initialScore + b.currentScore + b.totalAssigned;
                }
                return scoreA - scoreB;
            });

            // If not enough candidates
            if (candidates.length < nobetciSayisi) {
                this.logFailure(failurePoints, currentDay.dateStr, "Yetersiz Personel");
                return null;
            }

            // Optimization: Only try top candidates to prevent exponential explosion
            const searchLimit = Math.min(candidates.length, 10);
            const limitedCandidates = candidates.slice(0, searchLimit);

            // Combination generation
            const combinations = this.getCombinations(limitedCandidates, nobetciSayisi);

            for (const selected of combinations) {
                const snapshot = this.saveState(selected);
                this.updateState(selected, currentDay);

                const result = solve(dayIndex + 1);

                if (result !== null) {
                    return [{
                        date: currentDay.dateStr,
                        dateFormatted: currentDay.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
                        dayName: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][currentDay.dayOfWeek],
                        isWeekend: currentDay.isWeekend,
                        assigned: selected.map(p => ({ id: p.id, ad: p.ad })),
                        warnings: [],
                        mazerets: this.getMazeretsForDay(personeller, currentDay.dateStr)
                    }, ...result];
                }

                this.restoreState(selected, snapshot);
            }

            return null;
        };

        // Execution
        let solution = null;
        try {
            solution = solve(0);
        } catch (e) {
            console.error("Solver exception:", e);
        }

        if (solution) {
            return { success: true, schedule: solution };
        } else {
            return {
                success: false,
                error: "Uygun dağılım bulunamadı.",
                analysis: this.analyzeFailures(failurePoints)
            };
        }
    },

    // --- Helper Methods ---

    logFailure(points, date, reason) {
        if (!points[date]) points[date] = {};
        points[date][reason] = (points[date][reason] || 0) + 1;
    },

    analyzeFailures(points) {
        const dates = Object.keys(points);
        if (dates.length === 0) return "Genel personel yetersizliği.";

        const criticalDate = dates.sort((a, b) => {
            const sumA = Object.values(points[a]).reduce((s, v) => s + v, 0);
            const sumB = Object.values(points[b]).reduce((s, v) => s + v, 0);
            return sumB - sumA;
        })[0];

        const reasons = Object.entries(points[criticalDate])
            .map(([r, c]) => `${r} (${c})`)
            .join(", ");

        return `${criticalDate} tarihinde kilitlenme: ${reasons}. Kriterleri esnetmeyi deneyin.`;
    },

    getCombinations(arr, k) {
        const results = [];
        const helper = (start, current) => {
            if (current.length === k) {
                results.push([...current]);
                return;
            }
            if (results.length > 50) return; 

            for (let i = start; i < arr.length; i++) {
                current.push(arr[i]);
                helper(i + 1, current);
                current.pop();
            }
        };
        helper(0, []);
        return results;
    },

    saveState(selected) {
        return selected.map(p => ({
            id: p.id,
            lastAssignedTime: p.lastAssignedTime,
            currentScore: p.currentScore,
            weekdayCount: p.weekdayCount,
            weekendCount: p.weekendCount,
            totalAssigned: p.totalAssigned,
            currentStreak: p.currentStreak
        }));
    },

    updateState(selected, day) {
        const score = day.isWeekend ? 3 : 1;
        selected.forEach(p => {
            let isConsecutive = false;
            if (p.lastAssignedTime) {
                const diffDays = Math.round((day.date.getTime() - p.lastAssignedTime) / 86400000);
                isConsecutive = (diffDays === 1);
            }

            p.currentStreak = isConsecutive ? p.currentStreak + 1 : 1;
            p.lastAssignedTime = day.date.getTime();
            p.currentScore += score;
            p.totalAssigned++;
            if (day.isWeekend) p.weekendCount++;
            else p.weekdayCount++;
            p.history.push(day.dateStr);
        });
    },

    restoreState(selected, snapshots) {
        selected.forEach(p => {
            const snap = snapshots.find(s => s.id === p.id);
            if (snap) {
                Object.assign(p, snap);
                p.history.pop();
            }
        });
    },

    getMazeretsForDay(allPersonnel, dateStr) {
        return allPersonnel
            .filter(p => p.mazeretler.some(m => m.tarih === dateStr))
            .map(p => ({
                name: p.ad,
                aciklama: p.mazeretler.find(m => m.tarih === dateStr).aciklama
            }));
    }
};
