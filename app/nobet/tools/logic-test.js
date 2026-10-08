/**
 * logic-test.js - headless regression test for the v4 core modules.
 *
 * Run with: node tools/logic-test.js
 * The browser modules are loaded into a vm context with minimal DOM/localStorage stubs,
 * so date handling, the v3 -> v4 migration, validation rules and the scheduler's
 * constraints can be verified without opening a browser.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..', 'js');
const load = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

// --- minimal browser stubs ---
const store = {};
const sandbox = {
    console,
    performance: { now: () => Date.now() },
    Date,
    Math,
    JSON,
    Number,
    String,
    Array,
    Object,
    Set,
    Map,
    RegExp,
    parseInt,
    parseFloat,
    isNaN,
    encodeURIComponent,
    CustomEvent: class { constructor(t, o) { this.type = t; this.detail = o && o.detail; } },
    document: {
        documentElement: { dataset: {}, classList: { toggle() {}, add() {}, remove() {} } },
        addEventListener() {},
        getElementById: () => null,
        createElement: () => ({ style: {}, classList: { add() {}, toggle() {} }, setAttribute() {}, append() {}, textContent: '' }),
        querySelector: () => null,
        querySelectorAll: () => []
    },
    localStorage: {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; }
    },
    window: {},
    setTimeout
};
vm.createContext(sandbox);

[
    'core/dates.js',
    'core/ui.js',
    'core/storage.js',
    'core/state.js',
    'core/scheduler.js',
    'features/settings.js',
    'features/personnel.js',
    'features/excuses.js',
    'features/schedule.js',
    'features/io.js',
    'app.js'
].forEach(file => vm.runInContext(load(file), sandbox, { filename: file }));

let failures = 0;
const check = (name, condition, extra = '') => {
    if (condition) console.log(`PASS  ${name}`);
    else { failures++; console.log(`FAIL  ${name}  ${extra}`); }
};

// `const` top-level bindings live in the context's lexical scope, not on the sandbox object.
const pick = (name) => vm.runInContext(name, sandbox);
const dates = pick('dates');
const storage = pick('storage');
const state = pick('state');
const scheduler = pick('scheduler');
const io = pick('io');
const ui = pick('ui');
const excuseModal = pick('excuseModal');

// ---------- dates ----------
check('normalize DD.MM.YYYY', dates.normalize('05.10.2026') === '2026-10-05', dates.normalize('05.10.2026'));
check('normalize DD/MM/YYYY', dates.normalize('5/10/2026') === '2026-10-05');
check('normalize keeps ISO', dates.normalize('2026-10-05') === '2026-10-05');
check('normalize Date object', dates.normalize(new Date(2026, 9, 5)) === '2026-10-05');
check('normalize garbage -> empty', dates.normalize('not-a-date') === '');
check('list inclusive', dates.list('2026-10-05', '2026-10-07').length === 3);
check('list invalid -> empty', dates.list('2026-10-07', '2026-10-05').length === 0);
check('weekend detection', dates.isWeekend('2026-10-10') && !dates.isWeekend('2026-10-05'));
check('monday-first index', dates.weekdayIndex('2026-10-05') === 0 && dates.weekdayIndex('2026-10-11') === 6);
check('display format', dates.toDisplay('2026-10-05') === '05.10.2026');

// ---------- storage: legacy v3 migration ----------
const legacyPerson = storage.normalizePerson({
    id: 'abc123', ad: 'O&#39;Brien,  Sean', nobetSayisi: '3',
    mazeretler: [{ tarih: '10.05.2026', aciklama: 'İzin' }, { tarih: '2026-05-10', aciklama: 'dup' }]
});
check('legacy name unescaped + collapsed', legacyPerson.name === `O'Brien, Sean`, legacyPerson.name);
check('legacy shifts numeric', legacyPerson.shifts === 3);
check('legacy excuse dates normalized + deduped', legacyPerson.excuses.length === 1 && legacyPerson.excuses[0].date === '2026-05-10');

const legacySettings = storage.normalizeSettings({
    listeBasligi: ' Acil ', baslangicTarihi: '2026-10-05', bitisTarihi: '2026-11-05',
    nobetciSayisi: '2', ustUsteNobetSayisi: '2', nobetArasiGun: 0, maxShifts: '4', haftaSonuAyri: false
});
check('legacy settings mapped', legacySettings.unit === 'Acil' && legacySettings.perDay === 2
    && legacySettings.minRestDays === 0 && legacySettings.maxTotal === 4 && legacySettings.splitWeekends === false);
check('zero preserved (not replaced by default)', legacySettings.minRestDays === 0);

// ---------- io helpers ----------
check('toAscii turkish', io.toAscii('Şişe Çğöü İI') === 'Sise Cgou II', io.toAscii('Şişe Çğöü İI'));
const row = { 'Personel Adı': 'Ali Veli', 'Nöbet Sayısı': 2, 'Mazeret Tarihi': '05.10.2026' };
check('findColumn diacritic-insensitive', io.findColumn(row, ['adsoyad', 'isim', 'ad']) === 'Ali Veli');
check('findColumn number cell', io.findColumn(row, ['nobet']) === 2);
check('findColumn missing -> null', io.findColumn(row, ['yok']) === null);

// ---------- state + scheduler ----------
state.personnel = [
    storage.normalizePerson({ id: 'p1', name: 'A One' }),
    storage.normalizePerson({ id: 'p2', name: 'B Two' }),
    storage.normalizePerson({ id: 'p3', name: 'C Three' }),
    storage.normalizePerson({ id: 'p4', name: 'D Four' }),
    storage.normalizePerson({ id: 'p5', name: 'E Five' })
];
state.personnel[0].excuses = [{ date: '2026-10-07', note: 'Rapor' }, { date: '2026-10-08', note: '' }];
state.settings = storage.normalizeSettings({ start: '2026-10-05', end: '2026-10-18', perDay: 2, maxConsecutive: 2, minRestDays: 2, maxTotal: 0 });

const validation = state.validate();
check('validate ok', validation === null, validation);

const result = scheduler.generate(state.personnel, state.settings);
check('generation ok', result.ok === true, result.error + ' ' + (result.detail || ''));

const days = result.days || [];
check('day count', days.length === 14, days.length);
check('two per day', days.every(d => d.assigned.length === 2));
check('no duplicates in a day', days.every(d => new Set(d.assigned.map(a => a.id)).size === 2));
check('excuse respected', days.filter(d => ['2026-10-07', '2026-10-08'].includes(d.date))
    .every(d => d.assigned.every(a => a.id !== 'p1')));
check('excused listed for display', days.find(d => d.date === '2026-10-07').excused[0].note === 'Rapor');

const counts = {};
days.forEach(d => d.assigned.forEach(a => { counts[a.id] = (counts[a.id] || 0) + 1; }));
const spread = Math.max(...Object.values(counts)) - Math.min(...Object.values(counts));
check('fair distribution (spread <= 1)', spread <= 1, JSON.stringify(counts));

// rest rule: gap of >= minRestDays rest days between duties of the same person (except consecutive)
const perPerson = {};
days.forEach(d => d.assigned.forEach(a => { (perPerson[a.id] ||= []).push(d.date); }));
let restViolations = 0;
Object.values(perPerson).forEach(list => {
    for (let i = 1; i < list.length; i++) {
        const gap = Math.round((dates.toDate(list[i]) - dates.toDate(list[i - 1])) / 86400000);
        if (gap > 1 && gap - 1 < state.settings.minRestDays) restViolations++;
    }
});
check('rest-day rule holds', restViolations === 0, `violations=${restViolations}`);

let streakViolations = 0;
Object.values(perPerson).forEach(list => {
    let streak = 1;
    for (let i = 1; i < list.length; i++) {
        const gap = Math.round((dates.toDate(list[i]) - dates.toDate(list[i - 1])) / 86400000);
        streak = gap === 1 ? streak + 1 : 1;
        if (streak > state.settings.maxConsecutive) streakViolations++;
    }
});
check('consecutive rule holds', streakViolations === 0, `violations=${streakViolations}`);

// infeasible config -> clear error, not exception
state.settings.perDay = 6;
const impossible = scheduler.generate(state.personnel, state.settings);
check('infeasible rejected with message', impossible.ok === false && /personel/i.test(impossible.error + impossible.detail));

state.settings.perDay = 2;
state.settings.minRestDays = 30;
const tooStrict = scheduler.generate(state.personnel, state.settings);
// Advice must name the actual form field ("Min. Dinlenme (Gün)"), not a paraphrase.
check('over-strict rules explained', tooStrict.ok === false &&
    /dinlenme/i.test(tooStrict.detail || '') && /azaltın/i.test(tooStrict.detail || ''), tooStrict.detail);
state.settings.minRestDays = 1;

// Deterministic bottleneck: 4 of 5 people per day with maxConsecutive 1 is impossible on day 2,
// so the advice must name the consecutive-day rule (not the rest-day rule).
state.settings.perDay = 4;
state.settings.maxConsecutive = 1;
state.settings.minRestDays = 0;
const streakBlocked = scheduler.generate(state.personnel, state.settings);
check('advice names the blocking rule', streakBlocked.ok === false &&
    /peş peşe/i.test(streakBlocked.detail || '') && /Öneri:/.test(streakBlocked.detail || ''),
    streakBlocked.detail);
state.settings.perDay = 2;
state.settings.maxConsecutive = 2;

// signature behaviour
state.schedule = days;
state.scheduleSignature = state.signature();
const settingsBefore = { ...state.settings };
check('fresh schedule recognised', state.scheduleIsFresh() === true);

state.setSettings({ end: '2026-10-20' });
check('rule change invalidates schedule', state.signature() !== state.scheduleSignature);
check('stale schedule is kept, not destroyed',
    state.hasSchedule() && state.schedule.length === days.length, `${state.schedule.length}/${days.length}`);

// name validation
check('duplicate name caught (case-insensitive)', /zaten var/.test(state.validateName('a one') || ''));
check('empty name caught', state.validateName('   ') === 'İsim boş olamaz.');
check('long name caught', /60 karakter/.test(state.validateName('x'.repeat(61)) || ''));
check('new name accepted', state.validateName('F Six') === null);

// rank combines history + generated
state.personnel[4].shifts = 5;
state.personnel[4].weekends = 2;
const rank = state.rank();
const five = rank.find(r => r.id === 'p5');
check('rank = history + schedule', five.total >= 5 + (counts.p5 || 0) && rank[0].total >= rank[rank.length - 1].total, JSON.stringify(five));

// stats
const stats = state.stats();
check('stats totals', stats.total === 16 * 2 && stats.dayCount === 16, JSON.stringify(stats));

// document number (used by print/PDF/Excel headers, not shown on screen)
const docNo = state.documentNo();
check('documentNo encodes period + day count', /^NOP-\d{4}-\d{2}-16G\d{2}P$/.test(docNo), docNo);
check('documentNo is stable', state.documentNo() === docNo, state.documentNo());

state.setSettings({ start: '', end: '' });
check('documentNo without period', state.documentNo() === '—', state.documentNo());

// Kural geri alınınca bayat liste kendiliğinden yine geçerli sayılmalı (silinmiyor).
state.setSettings(settingsBefore);
check('stale roster survives a rule revert and is still the same list',
    state.hasSchedule() && state.schedule.length === days.length, `${state.schedule.length}`);
check('reverting the rules restores freshness', state.scheduleIsFresh() === true);

// ---------- dates hardening ----------
check('addMonths clamps to the shorter month end', dates.addMonths('2026-10-31', 1) === '2026-11-30', dates.addMonths('2026-10-31', 1));
check('addMonths keeps an ordinary day', dates.addMonths('2026-10-05', 1) === '2026-11-05', dates.addMonths('2026-10-05', 1));
check('normalize rounds the Excel second artifact', dates.normalize(new Date(2026, 9, 4, 23, 59, 59, 999)) === '2026-10-05',
    dates.normalize(new Date(2026, 9, 4, 23, 59, 59, 999)));
check('normalize drops an invalid Date', dates.normalize(new Date('yok')) === '');

// ---------- ids ----------
const generated = new Set();
for (let i = 0; i < 500; i++) generated.add(storage.uniqueId(generated));
check('uniqueId never repeats inside a roster', generated.size === 500, generated.size);

// ---------- excuse visibility (privacy) ----------
const excusedDay = days.find(day => day.date === '2026-10-07');

check('hidden by default', !state.showsExcused() && state.excusedFor(excusedDay).length === 0,
    JSON.stringify(state.excusedFor(excusedDay)));

state.setSettings({ showExcuses: true });
check('switch on shows name + reason', state.excusedLabel(excusedDay) === 'A One (Rapor)', state.excusedLabel(excusedDay));

state.setSettings({ showExcuses: false });
check('switch off drops every excuse', !state.showsExcused() && state.excusedFor(excusedDay).length === 0
    && state.excusedLabel(excusedDay) === '');
check('visibility change does not stale the roster', state.scheduleIsFresh() === true, `${state.signature()} / ${state.scheduleSignature}`);

state.setSettings({ showExcuses: true });
check('missing setting defaults to hidden', storage.normalizeSettings({}).showExcuses === false);
check('legacy excuseMode "note" maps to visible', storage.normalizeSettings({ excuseMode: 'note' }).showExcuses === true);
check('legacy excuseMode "hidden" maps to hidden', storage.normalizeSettings({ excuseMode: 'hidden' }).showExcuses === false);

// ---------- Excel roster summary (ported from the previous version) ----------
const summary = io.summaryRows();
check('summary lists every person', summary.length === state.personnel.length, summary.length);
check('summary splits carried duty from this period',
    summary.every(row => row.Toplam === row.Devir + row['Bu dönem']), JSON.stringify(summary[0]));
check('summary counts excuse days, no reason text',
    summary.find(row => row.Personel === 'A One')['Mazeret günü'] === 2 && !('Rapor' in summary[0]));

// ---------- excuse edits keep the roster behind the signature ----------
const excusesBefore = state.personnel[0].excuses.map(excuse => ({ ...excuse }));
state.setExcuses('p1', [{ date: '2026-10-09', note: 'Rapor' }]);
check('excuse edit keeps the roster, marks it stale', state.hasSchedule() && !state.scheduleIsFresh());
state.setExcuses('p1', excusesBefore);
check('reverting excuses makes the roster fresh again', state.hasSchedule() && state.scheduleIsFresh());

// ---------- renaming must reach the stored roster (names are outside the signature) ----------
const renamed = state.personnel.find(person => person.id === 'p1');
const signatureBeforeRename = state.scheduleSignature;
state.renamePerson(renamed.id, 'A One Yeniden');
const storedSchedule = JSON.parse(store[storage.KEYS.schedule]);

check('rename updates the duty names',
    state.schedule.some(day => day.assigned.some(assigned => assigned.name === 'A One Yeniden')));
check('rename is written to storage, not only memory',
    storedSchedule.days.some(day => day.assigned.some(assigned => assigned.name === 'A One Yeniden')));
check('rename syncs the excuse column',
    state.schedule.some(day => (day.excused || []).some(person => person.id === 'p1' && person.name === 'A One Yeniden')));
check('rename leaves the roster fresh and unchanged in signature',
    state.scheduleSignature === signatureBeforeRename && state.scheduleIsFresh());

// ---------- form labels and the texts that quote them must not drift apart ----------
const page = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const FIELD_LABELS = [
    'Liste Başlığı (Resmi İsim)', 'Başlangıç Tarihi', 'Bitiş Tarihi', 'Vardiya Başına Kişi',
    'Maks. Peş Peşe Gün', 'Min. Dinlenme (Gün)', 'Maks. Toplam Nöbet'
];
FIELD_LABELS.forEach((label) =>
    check(`form field label present: ${label}`, page.includes(`<span>${label}</span>`)));

// The solver tells the user which field to relax - the quoted names must exist in the form.
const quotedNames = [tooStrict.detail, streakBlocked.detail]
    .join(' ').match(/\u201c([^\u201d]+)\u201d/g) || [];
check('advice quotes real field names', quotedNames.length > 0 && quotedNames.every((quoted) => {
    const name = quoted.slice(1, -1);
    return page.includes(`<span>${name}</span>`);
}), quotedNames.join(' | '));

// ---------- Turkish number formatting ----------
check('measure uses the Turkish decimal comma',
    ui.measure(6.24) === '6,2' && ui.measure(10) === '10' && ui.measure(12.04) === '12' && ui.measure('x') === '—',
    `${ui.measure(6.24)}|${ui.measure(10)}|${ui.measure(12.04)}|${ui.measure('x')}`);

// ---------- delivery audit regressions ----------
// 1) a period longer than one year must be refused before the solver runs
const periodBefore = { start: state.settings.start, end: state.settings.end };
state.setSettings({ start: '2026-01-01', end: '2027-12-31' });
const tooLong = state.validate();
check('period over the cap is refused', /en fazla 366 gün/.test(tooLong || ''), tooLong);
state.setSettings(periodBefore);
check('normal period still accepted after the cap check', state.validate() === null, state.validate());

// 2) duplicate ids coming from old or hand edited storage are separated
const doubled = storage.withUniqueIds([
    storage.normalizePerson({ id: 'ayni', name: 'Bir Kisi' }),
    storage.normalizePerson({ id: 'ayni', name: 'Ikinci Kisi' })
]);
check('duplicate person ids are made unique', doubled[0].id !== doubled[1].id, JSON.stringify(doubled.map(d => d.id)));
check('unique ids keep the original first id', doubled[0].id === 'ayni', doubled[0].id);

// 3) user text coming from Excel cannot grow past the UI limits
const longPerson = storage.normalizePerson({
    id: 'x1', name: 'A'.repeat(90),
    excuses: [{ date: '2026-10-05', note: 'N'.repeat(120) }]
});
check('name is clamped to the limit', longPerson.name.length === storage.LIMITS.name, longPerson.name.length);
check('excuse note is clamped to the limit', longPerson.excuses[0].note.length === storage.LIMITS.note, longPerson.excuses[0].note.length);
const longUnit = storage.normalizeSettings({ unit: 'U'.repeat(300) });
check('unit title is clamped', longUnit.unit.length === storage.LIMITS.unit, longUnit.unit.length);

// 4) carried counters cannot be negative, text or absurd
check('count() clamps garbage counters',
    storage.count(-5) === 0 && storage.count('abc') === 0 && storage.count('12') === 12 && storage.count(1e9) === 9999,
    [storage.count(-5), storage.count('abc'), storage.count('12'), storage.count(1e9)].join(','));
const negativePerson = storage.normalizePerson({ id: 'x2', name: 'Negatif', nobetSayisi: -7 });
check('person counters are never negative', negativePerson.shifts === 0, negativePerson.shifts);

// 5) fairness compares duty count FIRST, then the weighted score
const light = { assigned: 1, weekendCount: 1, weekdayCount: 1, score: 1500 };
const heavy = { assigned: 2, weekendCount: 2, weekdayCount: 2, score: 0 };
const ordered = [heavy, light];
scheduler.sortByFairness(ordered, { weekend: false }, false);
check('fewer duties wins even against a big score', ordered[0] === light, `${ordered[0].assigned}/${ordered[0].score}`);
const weekendOrder = [heavy, light];
scheduler.sortByFairness(weekendOrder, { weekend: true }, true);
check('split weekends rank by the weekend counter first', weekendOrder[0] === light, `${weekendOrder[0].weekendCount}`);

// 6) a stored roster without names must not render "undefined"
store[storage.KEYS.schedule] = JSON.stringify({
    signature: 'deneme-imza',
    days: [{ date: '2026-10-05', assigned: [{ id: 'p1' }], excused: [{ id: 'p2' }] }]
});
const repaired = storage.loadSchedule();
check('missing roster names become empty strings',
    repaired.days[0].assigned[0].name === '' && repaired.days[0].excused[0].name === '',
    JSON.stringify(repaired.days[0]));

// ---------- PDF font switch (lib/roboto.js) ----------
const fontCalls = [];
const stubDoc = {
    addFileToVFS: (name) => fontCalls.push('vfs:' + name),
    addFont: (file, name, style) => fontCalls.push(`font:${name}:${style}`)
};

check('PDF falls back to ASCII when no font file is present',
    io.registerFont(stubDoc) === false && fontCalls.length === 0, fontCalls.join(','));

sandbox.window.PDF_FONTS = { regular: 'Zm9v' };
check('Roboto is registered when lib/roboto.js exists',
    io.registerFont(stubDoc) === true && fontCalls.join(',') === 'vfs:Roboto-Regular.ttf,font:Roboto:normal', fontCalls.join(','));

fontCalls.length = 0;
sandbox.window.PDF_FONTS = { regular: 'Zm9v', bold: 'YmFy' };
io.registerFont(stubDoc);
check('bold face is used only when Roboto-Bold.ttf exists',
    fontCalls.join(',') === 'vfs:Roboto-Regular.ttf,font:Roboto:normal,vfs:Roboto-Bold.ttf,font:Roboto:bold', fontCalls.join(','));
delete sandbox.window.PDF_FONTS;
io.registerFont(stubDoc);
check('fallback state is restored', io.hasBoldFace === false);

// ---------- new regression tests ----------
check('normalize YYYY.MM.DD', dates.normalize('2026.10.05') === '2026-10-05', dates.normalize('2026.10.05'));
check('normalize YYYY/MM/DD', dates.normalize('2026/10/05') === '2026-10-05', dates.normalize('2026/10/05'));
check('normalize DD-MM-YYYY', dates.normalize('05-10-2026') === '2026-10-05', dates.normalize('05-10-2026'));
check('normalize invalid month/day rejected', dates.normalize('99.99.2026') === '', dates.normalize('99.99.2026'));

// findSheet returns null if patterns not found and no exclude
check('findSheet returns null on pattern mismatch', io.findSheet({ SheetNames: ['Sheet1', 'Data'] }, [/mazeret/i]) === null);

// setPersonShifts
const testPerson = state.personnel[0];
state.setPersonShifts(testPerson.id, 7, 3);
check('setPersonShifts updates shifts', testPerson.shifts === 7 && testPerson.weekends === 3, `${testPerson.shifts}/${testPerson.weekends}`);

// excuse firstVisibleMonth inside active period
excuseModal.range = { start: '2026-10-01', end: '2026-10-31' };
excuseModal.selected = new Map([['2026-05-10', 'Eski'], ['2026-10-15', 'Guncel']]);
check('excuse firstVisibleMonth prefers period date over past date',
    excuseModal.firstVisibleMonth() === '2026-10', excuseModal.firstVisibleMonth());

console.log(failures === 0 ? '\nALL LOGIC TESTS PASSED' : `\n${failures} FAILURE(S)`);
process.exit(failures ? 1 : 0);

