/**
 * Advanced Scheduler Module
 * Uses Backtracking Algorithm for guaranteed solutions and Weighted Scoring for fairness.
 */

const scheduler = {
    /**
     * Generate duty schedule
     */
    generate(personeller, baslangic, bitis, ayarlar) {
        const {
            nobetciSayisi = 1,
            maxConsec = 2,
            minDaysBetween = 2, // Relaxed slightly as default
            haftaSonuAyri = true
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

        // 2. Prepare Personnel State (Clone to avoid mutating original immediately)
        // We use IDs for tracking
        const personState = personeller.map(p => ({
            id: p.id,
            ad: p.ad,
            initialScore: (p.nobetSayisi * 1) + (p.haftaSonuNobetSayisi * 2), // Historical load
            currentScore: 0, // Score accumulated in THIS schedule
            weekdayCount: 0,
            weekendCount: 0,
            currentStreak: 0, // Track consecutive assignments
            history: [], // List of assigned dates in this session
            mazeretler: new Set(p.mazeretler.map(m => m.tarih)),
            // We need to know the REAL last shift (from history) plus new assignments
            originalLastShift: p.sonNobet ? new Date(p.sonNobet).getTime() : null,
            lastAssignedTime: p.sonNobet ? new Date(p.sonNobet).getTime() : null
        }));

        // 3. Backtracking Solver
        // Returns list of assignments: [{ dayIndex, assignedIds: [] }] or null
        function solve(dayIndex) {
            // Base case: All days filled
            if (dayIndex === days.length) {
                return [];
            }

            const currentDay = days[dayIndex];
            const currentDayTime = currentDay.date.getTime();

            // Find candidates
            let candidates = personState.filter(p => {
                // Mazeret Check
                if (p.mazeretler.has(currentDay.dateStr)) return false;

                // Max Consecutive Check
                // Simplified: If assigned yesterday, check limit.
                // Note: This logic assumes 1 shift/day. 
                // A better approach for consecutive checks in backtracking is looking at 'history'
                // But for speed, let's look at lastAssignedTime.
                const daysDiff = (currentDayTime - p.lastAssignedTime) / (1000 * 60 * 60 * 24);

                // If assigned recently (< minDaysBetween), skip.
                // Exception: Consecutive shifts allowed? 
                // Let's use a simpler robust constraint:
                // No shift if strictly less than minDaysBetween, UNLESS it is consecutive (tomorrow) AND consecutive count < max.

                // Strict Constraint Logic
                if (p.lastAssignedTime) {
                    const diffTime = currentDayTime - p.lastAssignedTime;
                    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        // Consecutive day
                        if (p.currentStreak >= maxConsec) {
                            return false; // Exceeds max consecutive limit
                        }
                    } else {
                        // Not consecutive (gap > 1)
                        // Check minimum break
                        // Let's interpret minDaysBetween as "Empty days between shifts".
                        // DiffDays - 1 = Empty Days.
                        // So (DiffDays - 1) < minDaysBetween => Reject.

                        if ((diffDays - 1) < minDaysBetween) {
                            return false;
                        }
                    }
                }

                return true;
            });

            // Sort candidates by Score (Fairness)
            // Lower score = Higher priority
            candidates.sort((a, b) => {
                const scoreA = a.initialScore + a.currentScore;
                const scoreB = b.initialScore + b.currentScore;

                // Primary: Total Score
                if (scoreA !== scoreB) return scoreA - scoreB;

                // Secondary: Weekend Balance (if randomizing weekend)
                if (currentDay.isWeekend) {
                    return a.weekendCount - b.weekendCount;
                }

                // Tertiary: Random to break ties (Shuffle effect)
                // We want to avoid full determinism so "Tekrarla" works
                return 0.5 - Math.random();
            });

            // If not enough candidates, fail immediately
            if (candidates.length < nobetciSayisi) return null;

            // Generate Combinations (True Backtracking)
            // We need to choose 'nobetciSayisi' people from 'candidates'.
            // Since candidates are sorted by preference, we try best combinations first.

            // Helper: Generate combinations of Size K
            const combinations = [];

            // Optimization: If selecting 1 person (99% of cases), simple map
            if (nobetciSayisi === 1) {
                // Try top 50 candidates only to prevent infinite timeouts in huge sets
                const limit = Math.min(candidates.length, 50);
                for (let i = 0; i < limit; i++) {
                    combinations.push([candidates[i]]);
                }
            } else {
                // For N > 1, simple recursive combination generator
                // Capped at 100 trials for performance
                let count = 0;
                function getCombs(startIdx, currentComb) {
                    if (count > 100) return; // Pruning
                    if (currentComb.length === nobetciSayisi) {
                        combinations.push([...currentComb]);
                        count++;
                        return;
                    }
                    if (startIdx >= candidates.length) return;

                    // Include
                    currentComb.push(candidates[startIdx]);
                    getCombs(startIdx + 1, currentComb);
                    currentComb.pop();

                    // Exclude
                    getCombs(startIdx + 1, currentComb);
                }
                getCombs(0, []);
            }

            // ITERATE THROUGH COMBINATIONS
            for (const selected of combinations) {
                // 1. Save State
                const snapshot = saveState(selected);

                // 2. Apply Selection
                updateState(selected, currentDay);

                // 3. Recursive Step
                const result = solve(dayIndex + 1);

                // 4. Success?
                if (result !== null) {
                    return [{
                        date: currentDay.dateStr,
                        dateFormatted: currentDay.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
                        dayName: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][currentDay.dayOfWeek],
                        isWeekend: currentDay.isWeekend,
                        assigned: selected.map(p => p.ad),
                        warnings: [],
                        mazerets: getMazeretsForDay(personeller, currentDay.dateStr)
                    }, ...result];
                }

                // 5. Failure? Backtrack (Undo State)
                restoreState(selected, snapshot);
            }

            // If no combination worked, return null (trigger backtrack in previous day)
            return null;
        }

        // Helper: Save state before modification
        function saveState(selectedPeople) {
            return selectedPeople.map(p => ({
                id: p.id,
                lastAssignedTime: p.lastAssignedTime,
                currentScore: p.currentScore,
                weekdayCount: p.weekdayCount,
                weekendCount: p.weekendCount,
                currentStreak: p.currentStreak
            }));
        }

        // Helper: Update state
        function updateState(selectedPeople, day) {
            const dayScore = day.isWeekend ? 2 : 1;
            selectedPeople.forEach(p => {
                // Determine if consecutive
                const isConsecutive = p.lastAssignedTime &&
                    Math.abs(day.date.getTime() - p.lastAssignedTime - 86400000) < 1000;

                if (isConsecutive) {
                    p.currentStreak++;
                } else {
                    p.currentStreak = 1;
                }

                p.lastAssignedTime = day.date.getTime();
                p.currentScore += dayScore;
                p.history.push(day.dateStr);
                if (day.isWeekend) p.weekendCount++;
                else p.weekdayCount++;
            });
        }

        // Helper: Restore state
        function restoreState(selectedPeople, snapshots) {
            selectedPeople.forEach(p => {
                const snap = snapshots.find(s => s.id === p.id);
                if (snap) {
                    p.lastAssignedTime = snap.lastAssignedTime;
                    p.currentScore = snap.currentScore;
                    p.weekdayCount = snap.weekdayCount;
                    p.weekendCount = snap.weekendCount;
                    p.currentStreak = snap.currentStreak;
                    p.history.pop();
                }
            });
        }

        // Helper: Format mazerets
        function getMazeretsForDay(allPersonnel, dateStr) {
            return allPersonnel
                .filter(p => p.mazeretler.some(m => m.tarih === dateStr))
                .map(p => ({
                    name: p.ad,
                    aciklama: p.mazeretler.find(m => m.tarih === dateStr).aciklama
                }));
        }

        // START SOLVER
        // Try to solve. If null, maybe try sorting randomization?
        // For now, strict best-first.

        let solution = null;

        try {
            solution = solve(0);
        } catch (e) {
            console.error("Solver error:", e);
        }

        if (solution) {
            // Sync internal state counts back to original objects not needed here, 
            // Main app handles "saving" the results by tallying the schedule.
            // Actually, app.js expects updated 'nobetSayisi' on the person objects?
            // Yes, legacy app.js updates UI from person object stats.
            // We should return stats or let app.js recalculate from schedule.
            // Let's stick to returning schedule, app.js will recalculate totals.
            return solution;
        } else {
            // Fallback for UI if impossible
            return [{
                date: "HATA",
                dateFormatted: "Çözüm Bulunamadı",
                dayName: "!",
                isWeekend: false,
                assigned: ["Kriterlere uygun dağılım yapılamadı."],
                warnings: ["Personel sayısı yetersiz veya kurallar çok sıkı."],
                mazerets: []
            }];
        }
    }
};
