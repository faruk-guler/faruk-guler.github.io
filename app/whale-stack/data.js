export let portfolio = [];
export let fileHandle = null;
export let lastFileTimestamp = 0;
export let isSaving = false;
export let isUpdating = false;

const DB_NAME = "WhaleStackDB";
const DB_VERSION = 1;

export function setPortfolio(newPortfolio) {
    portfolio = newPortfolio;
}

export function setFileHandle(handle) {
    fileHandle = handle;
}

export function setIsUpdating(val) {
    isUpdating = val;
}

export async function getHandle() {
    return new Promise(r => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = e => {
            if (!e.target.result.objectStoreNames.contains("handles")) {
                e.target.result.createObjectStore("handles");
            }
        };
        req.onsuccess = e => {
            const tx = e.target.result.transaction("handles", "readonly");
            const store = tx.objectStore("handles");
            const get = store.get("lastFile");
            get.onsuccess = () => r(get.result);
            get.onerror = () => r(null);
        };
        req.onerror = () => r(null);
    });
}

export async function setHandle(handle) {
    return new Promise((r, j) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = e => {
            if (!e.target.result.objectStoreNames.contains("handles")) {
                e.target.result.createObjectStore("handles");
            }
        };
        req.onsuccess = e => {
            const tx = e.target.result.transaction("handles", "readwrite");
            const store = tx.objectStore("handles");
            store.put(handle, "lastFile");
            tx.oncomplete = () => r();
            tx.onerror = () => j();
        };
        req.onerror = () => j();
    });
}

export function formatDate(d) {
    return d.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export async function savePortfolio() {
    if (!fileHandle) return;
    try {
        isSaving = true;
        const timestamp = formatDate(new Date());
        const dbData = {
            lastUpdated: timestamp,
            assets: portfolio
        };

        const w = await fileHandle.createWritable();
        await w.write(JSON.stringify(dbData, null, 2));
        await w.close();
        return timestamp;
    } catch (e) {
        console.error("Save Failed", e);
        throw e;
    } finally {
        setTimeout(() => { isSaving = false; }, 500);
    }
}

export async function checkForExternalChanges() {
    if (!fileHandle || isSaving || isUpdating) return null;
    try {
        const file = await fileHandle.getFile();
        if (file.lastModified > lastFileTimestamp) {
            console.log("External change detected, reloading...");
            const text = await file.text();
            const dbContents = JSON.parse(text);
            let newPortfolio = [];
            let lastUpdate = null;

            if (Array.isArray(dbContents)) {
                newPortfolio = dbContents;
            } else if (dbContents.assets) {
                newPortfolio = dbContents.assets;
                lastUpdate = dbContents.lastUpdated;
            }
            
            portfolio = newPortfolio;
            lastFileTimestamp = file.lastModified;
            return { portfolio, lastUpdate };
        }
    } catch (e) {
        console.error("External check failed", e);
    }
    return null;
}

export function updateField(id, field, value) {
    const item = portfolio.find(p => p.id === id);
    if (item) {
        item[field] = (field === 'amount' || field === 'cost') ? parseFloat(value) || 0 : value;
        item.lastEdit = formatDate(new Date());
        return true;
    }
    return false;
}

export function deleteAsset(id) {
    const originalLength = portfolio.length;
    portfolio = portfolio.filter(p => p.id !== id);
    return portfolio.length !== originalLength;
}

export function cycleRisk(id) {
    const item = portfolio.find(p => p.id === id);
    if (!item) return null;

    const levels = ['Low', 'Mid', 'High'];
    let currentIndex = levels.indexOf(item.risk || 'Low');
    let nextIndex = (currentIndex + 1) % levels.length;

    item.risk = levels[nextIndex];
    item.lastEdit = formatDate(new Date());
    return item.risk;
}

export function addOrUpdateAsset(assetData) {
    const { id, category, amount, cost, circulatingSupply, maxSupply, risk } = assetData;
    const exist = portfolio.find(p => p.id === id);
    
    if (exist) {
        const total = (parseFloat(exist.amount) || 0) + amount;
        const oldTotalVal = (parseFloat(exist.amount) || 0) * (parseFloat(exist.cost) || 0);
        const newEntryVal = amount * cost;
        
        exist.cost = total > 0 ? (oldTotalVal + newEntryVal) / total : cost;
        exist.amount = total;
        exist.category = category;
        exist.circulatingSupply = circulatingSupply || exist.circulatingSupply;
        exist.maxSupply = maxSupply || exist.maxSupply;
        exist.risk = risk;
        exist.lastEdit = formatDate(new Date());
    } else {
        portfolio.push({
            id, amount, cost, category,
            circulatingSupply: circulatingSupply || "∞",
            maxSupply: maxSupply || "∞",
            risk,
            lastEdit: formatDate(new Date())
        });
    }
}
