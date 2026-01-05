// Select all permission inputs
const allPermissionInputs = document.querySelectorAll('input[type="checkbox"]');
const fileTypeInputs = document.querySelectorAll('input[name="fileType"]');
const specialPermInputs = document.querySelectorAll('#setuid, #setgid, #sticky');

// Select display elements
const symbolicDisplay = document.getElementById('symbolicDisplay');
const octalInput = document.getElementById('octalInput');
const chmodCommand = document.getElementById('chmodCommand');
const recursiveCommand = document.getElementById('recursiveCommand');
const symbolicCommand = document.getElementById('symbolicCommand');

// Select warning elements
const dirWarning = document.getElementById('dirWarning');
const setuidWarning = document.getElementById('setuidWarning');
const setgidWarning = document.getElementById('setgidWarning');
const stickyWarning = document.getElementById('stickyWarning');

// Update permissions on any checkbox change
allPermissionInputs.forEach(input => {
    input.addEventListener('change', updatePermissions);
});



// Update permissions on file type change
fileTypeInputs.forEach(input => {
    input.addEventListener('change', function () {
        // Don't call updatePermissions immediate here to avoid overwriting state with transitional values
        handleFileTypeChange(this.value);
    });
});

// Update permissions on special permissions change
specialPermInputs.forEach(input => {
    input.addEventListener('change', updatePermissions);
});

// Add click event for checkbox containers
document.querySelectorAll('.checkbox-container').forEach(container => {
    container.addEventListener('click', function (e) {
        // If the click is not directly on the checkbox
        if (e.target.type !== 'checkbox') {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
});

// Add input event for Octal Input (Reverse Calculation)
octalInput.addEventListener('input', function () {
    // Remove non-numeric characters
    this.value = this.value.replace(/[^0-7]/g, '');

    const val = this.value;
    let s = 0, u = 0, g = 0, o = 0;

    // Auto-pad or handle short inputs logically if needed, but standard behavior 
    // is often to wait or interpret. Let's interpret valid lengths only.
    if (val.length === 3) {
        // Format: ugo (e.g., 755)
        u = parseInt(val[0]);
        g = parseInt(val[1]);
        o = parseInt(val[2]);
        updateCheckboxesFromValue(s, u, g, o);
        updatePermissions(true);
    } else if (val.length === 4) {
        // Format: sugo (e.g., 1755)
        s = parseInt(val[0]);
        u = parseInt(val[1]);
        g = parseInt(val[2]);
        o = parseInt(val[3]);
        updateCheckboxesFromValue(s, u, g, o);
        updatePermissions(true);
    }
});

// Add input event for Symbolic Display (Reverse Calculation)
symbolicDisplay.addEventListener('input', function () {
    // Sanitize input: allow only drwxsStTl- characters (dash at end to avoid range interpretation)
    this.value = this.value.replace(/[^drwxsStTl-]/g, '');
    let val = this.value;

    // Very basic validation/parsing
    // Expected format length 10: -rwxrwxrwx or drwxrwxrwx
    // Or length 9: rwxrwxrwx

    if (val.length === 9 || val.length === 10) {
        let permsPart = val;
        if (val.length === 10) {
            // Update file type based on first char
            const typeChar = val[0];
            let typeVal = '-';
            if (typeChar === 'd') typeVal = 'd';
            else if (typeChar === 'l') typeVal = 'l';

            // Activate the radio button
            const typeRadio = document.querySelector(`input[name="fileType"][value="${typeVal}"]`);
            if (typeRadio) {
                typeRadio.checked = true;
                // We handle file type change logic manually to avoid loop or reset
                handleFileTypeChange(typeVal);
            }
            permsPart = val.substring(1);
        }

        const parsed = parseSymbolicString(permsPart);
        if (parsed) {
            updateCheckboxesFromValue(parsed.s, parsed.u, parsed.g, parsed.o);
            // We pass 'true' to skip updating this input while we type
            // But we actually DO want to re-format it? 
            // Better to NOT update the symbolicDisplay while typing to avoid cursor jumps
            // Use a specific flag
            updatePermissions(false, true);
        }
    }
});

function parseSymbolicString(str) {
    if (str.length !== 9) return null;

    // Groups: User(0-2), Group(3-5), Other(6-8)
    const uStr = str.substring(0, 3);
    const gStr = str.substring(3, 6);
    const oStr = str.substring(6, 9);

    let u = 0, g = 0, o = 0, s = 0;

    // Helper to parse rwx block
    const parseBlock = (block, type) => {
        let val = 0;
        if (block[0] === 'r') val += 4;
        if (block[1] === 'w') val += 2;

        if (block[2] === 'x') val += 1;
        else if (block[2] === 's' || block[2] === 'S') {
            if (type === 'u') s += 4;
            if (type === 'g') s += 2;
            if (block[2] === 's') val += 1; // lowercase s implies x is present
        }
        else if (block[2] === 't' || block[2] === 'T') {
            if (type === 'o') s += 1;
            if (block[2] === 't') val += 1; // lowercase t implies x is present
        }
        return val;
    };

    u = parseBlock(uStr, 'u');
    g = parseBlock(gStr, 'g');
    o = parseBlock(oStr, 'o');

    return { s, u, g, o };
}

function updateCheckboxesFromValue(s, u, g, o) {
    // Set special permissions
    document.getElementById('setuid').checked = (s & 4) !== 0;
    document.getElementById('setgid').checked = (s & 2) !== 0;
    document.getElementById('sticky').checked = (s & 1) !== 0;

    // Helper to set rwx components
    const setGroup = (prefix, val) => {
        document.getElementById(`${prefix}r`).checked = (val & 4) !== 0;
        document.getElementById(`${prefix}w`).checked = (val & 2) !== 0;
        document.getElementById(`${prefix}x`).checked = (val & 1) !== 0;
    };

    setGroup('u', u);
    setGroup('g', g);
    setGroup('o', o);
}

// Function to calculate and update permissions
function updatePermissions() {
    // Calculate basic permissions
    const userPerms = getPermValue('u');
    const groupPerms = getPermValue('g');
    const otherPerms = getPermValue('o');

    // Calculate special permissions
    let specialPerms = 0;
    if (document.getElementById('setuid').checked) specialPerms += 4;
    if (document.getElementById('setgid').checked) specialPerms += 2;
    if (document.getElementById('sticky').checked) specialPerms += 1;

    // Update octal value
    const showLeadingZero = document.getElementById('showLeadingZero').checked;
    let octalValue = `${userPerms}${groupPerms}${otherPerms}`;
    if (specialPerms > 0) {
        octalValue = `${specialPerms}${octalValue}`;
    } else if (showLeadingZero) {
        octalValue = `0${octalValue}`;
    }

    // Only update input if we aren't typing in it
    // flags: skipOctalUpdate, skipSymbolicUpdate
    const skipOctalUpdate = (arguments.length > 0 && arguments[0] === true);
    const skipSymbolicUpdate = (arguments.length > 1 && arguments[1] === true);

    // Use fresh element reference to avoid stale cache issues
    const octalInputEl = document.getElementById('octalInput');
    if (!skipOctalUpdate && octalInputEl) {
        octalInputEl.value = octalValue;
    }

    // Update symbolic notation
    const fileType = document.querySelector('input[name="fileType"]:checked').value;
    const symbolic = getSymbolicDisplay(fileType, userPerms, groupPerms, otherPerms);

    const symbolicDisplayEl = document.getElementById('symbolicDisplay');
    if (!skipSymbolicUpdate && symbolicDisplayEl) {
        symbolicDisplayEl.value = symbolic;
    }

    // Update commands
    const chmodCommandEl = document.getElementById('chmodCommand');
    const recursiveCommandEl = document.getElementById('recursiveCommand');
    const symbolicCommandEl = document.getElementById('symbolicCommand');

    if (chmodCommandEl) chmodCommandEl.textContent = `chmod ${octalValue} file`;
    if (recursiveCommandEl) recursiveCommandEl.textContent = `chmod -R ${octalValue} directory`;
    if (symbolicCommandEl) symbolicCommandEl.textContent = `chmod ${getSymbolicCommand()} file`;

    // Check and display warnings
    checkWarnings(fileType, userPerms, groupPerms, otherPerms);

    // Save state if we are in a mode that allows editing (not Symbolic Link)
    // This ensures we persist the latest user configuration
    if (fileType !== 'l') {
        savePermState();
    }
}

// Calculate permission value for a category (0-7)
function getPermValue(category) {
    let value = 0;
    if (document.getElementById(`${category}r`).checked) value += 4;
    if (document.getElementById(`${category}w`).checked) value += 2;
    if (document.getElementById(`${category}x`).checked) value += 1;
    return value;
}

// Generate symbolic notation (e.g., -rwxr-xr--)
function getSymbolicDisplay(fileType, user, group, other) {
    const userSymbolic = getSymbolicForValue(user, 'u');
    const groupSymbolic = getSymbolicForValue(group, 'g');
    const otherSymbolic = getSymbolicForValue(other, 'o');

    return `${fileType}${userSymbolic}${groupSymbolic}${otherSymbolic}`;
}

// Generate symbolic notation for a specific value
function getSymbolicForValue(value, category) {
    let result = '';

    // Add r, w, x
    result += (value & 4) ? 'r' : '-';
    result += (value & 2) ? 'w' : '-';

    // Check for execute permission
    const hasExec = (value & 1) ? true : false;

    if (category === 'u' && document.getElementById('setuid').checked) {
        result += hasExec ? 's' : 'S';
    }
    else if (category === 'g' && document.getElementById('setgid').checked) {
        result += hasExec ? 's' : 'S';
    }
    else if (category === 'o' && document.getElementById('sticky').checked) {
        result += hasExec ? 't' : 'T';
    }
    else {
        result += hasExec ? 'x' : '-';
    }

    return result;
}

// Generate symbolic command
function getSymbolicCommand() {
    const parts = [];

    const getFullPart = (category) => {
        let part = getSymbolicPart(category);
        if (category === 'u' && document.getElementById('setuid').checked) part += 's';
        if (category === 'g' && document.getElementById('setgid').checked) part += 's';
        if (category === 'o' && document.getElementById('sticky').checked) part += 't';
        return `${category}=${part || ''}`;
    };

    parts.push(getFullPart('u'));
    parts.push(getFullPart('g'));
    parts.push(getFullPart('o'));

    return parts.join(',');
}

// Generate symbolic part for a category
function getSymbolicPart(category) {
    let part = '';
    if (document.getElementById(`${category}r`).checked) part += 'r';
    if (document.getElementById(`${category}w`).checked) part += 'w';
    if (document.getElementById(`${category}x`).checked) part += 'x';
    return part;
}

// Check and display warnings
function checkWarnings(fileType, userPerms, groupPerms, otherPerms) {
    if (fileType === 'd' && !(userPerms & 1) && !(groupPerms & 1) && !(otherPerms & 1)) {
        dirWarning.style.display = 'block';
    } else {
        dirWarning.style.display = 'none';
    }

    if (document.getElementById('setuid').checked && fileType !== '-') {
        setuidWarning.style.display = 'block';
    } else {
        setuidWarning.style.display = 'none';
    }

    if (document.getElementById('setgid').checked && fileType !== '-' && fileType !== 'd') {
        setgidWarning.style.display = 'block';
    } else {
        setgidWarning.style.display = 'none';
    }

    if (document.getElementById('sticky').checked && fileType !== 'd') {
        stickyWarning.style.display = 'block';
    } else {
        stickyWarning.style.display = 'none';
    }

    // FIX: Show recursive warning for directories
    const recursiveWarning = document.getElementById('recursiveWarning');
    if (recursiveWarning) {
        if (fileType === 'd') {
            recursiveWarning.style.display = 'block';
        } else {
            recursiveWarning.style.display = 'none';
        }
    }
}


// Copy functionality with fallback for non-HTTPS contexts
function copyText(elementId) {
    const el = document.getElementById(elementId);
    // Handle both input and div/span
    const textToCopy = el.tagName === 'INPUT' ? el.value : el.textContent;
    // Find button: either passed as element or looked up by onclick (legacy support removed)
    // We now traverse/find the button in a more generic way or assume logic passed the right one.
    // However, function copyText(elementId) logic depended on querySelector.
    // Let's rely on the fact that the button is often near the element or we should pass the button ref?
    // Current design: copyText(id). We need to find the button that triggered this.
    // Since we now use event listeners, we don't naturally have 'this'.
    // We can query selector by data attribute.
    const btn = document.querySelector(`button[data-copy-target="${elementId}"]`);
    const originalText = btn.textContent;

    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopyFeedback(btn, originalText);
        }).catch(err => {
            // Fallback to execCommand
            fallbackCopy(textToCopy, btn, originalText);
        });
    } else {
        // Use fallback for older browsers or HTTP contexts
        fallbackCopy(textToCopy, btn, originalText);
    }
}

function showCopyFeedback(btn, originalText) {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
    }, 1500);
}

function fallbackCopy(text, btn, originalText) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback(btn, originalText);
    } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1500);
    }
    document.body.removeChild(textarea);
}

// Dark mode toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// SVG icons
const moonIcon = '\u003csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\u003e\u003cpath d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"/\u003e\u003c/svg\u003e';
const sunIcon = '\u003csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\u003e\u003cpath d=\"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z\"/\u003e\u003c/svg\u003e';

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = sunIcon; // Show sun icon to switch back to light mode
} else {
    themeToggle.innerHTML = moonIcon; // Show moon icon to switch to dark mode
}

themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = sunIcon;
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = moonIcon;
        localStorage.setItem('theme', 'light');
    }
});

// ========== TAB NAVIGATION ==========
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        switchTab(tabName);
    });
});

function switchTab(tabName) {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-section`);

    if (activeButton && activeContent) {
        activeButton.classList.add('active');
        activeContent.classList.add('active');
    }

    // Update sidebar - show only the relevant help section
    const allSidebarContents = document.querySelectorAll('.sidebar-content');
    allSidebarContents.forEach(sidebar => {
        sidebar.style.display = 'none';
    });

    const activeSidebar = document.getElementById(`sidebar-${tabName}`);
    if (activeSidebar) {
        activeSidebar.style.display = 'block';
    }
}

// ========== OWNERSHIP (chown/chgrp) ==========
const ownerInput = document.getElementById('ownerInput');
const groupInput = document.getElementById('groupInput');
const chownTypeInputs = document.querySelectorAll('input[name="chownType"]');
const chownRecursive = document.getElementById('chownRecursive');

[ownerInput, groupInput, chownRecursive].forEach(el => {
    el.addEventListener('input', updateChownCommands);
    el.addEventListener('change', updateChownCommands);
});

chownTypeInputs.forEach(input => {
    input.addEventListener('change', updateChownCommands);
});

function updateChownCommands() {
    const ownerRaw = ownerInput.value.trim() || 'user';
    const groupRaw = groupInput.value.trim() || 'group';

    // Helper to quote if contains spaces
    const quoteIfNeeded = (str) => str.includes(' ') ? `"${str}"` : str;

    const owner = quoteIfNeeded(ownerRaw);
    const group = quoteIfNeeded(groupRaw);

    const type = document.querySelector('input[name="chownType"]:checked').value;
    const recursive = chownRecursive.checked;

    let basicCmd = '';
    let recursiveCmd = '';

    if (type === 'both') {
        basicCmd = `chown ${owner}:${group} file`;
        recursiveCmd = `chown -R ${owner}:${group} directory`;
    } else if (type === 'user') {
        basicCmd = `chown ${owner} file`;
        recursiveCmd = `chown -R ${owner} directory`;
    } else if (type === 'group') {
        basicCmd = `chgrp ${group} file`;
        recursiveCmd = `chgrp -R ${group} directory`;
    }

    document.getElementById('chownBasic').textContent = basicCmd;
    document.getElementById('chownRecursiveCmd').textContent = recursiveCmd;
}

// ========== ACL (setfacl/getfacl) ==========
let aclRules = [];

function addAclRule() {
    const entity = document.getElementById('aclEntity').value;
    const nameInput = document.getElementById('aclName');
    // Ensure name is empty for 'other' and 'mask'
    if (entity === 'o' || entity === 'm') {
        nameInput.value = '';
    }
    const name = nameInput.value.trim();
    const read = document.getElementById('aclRead').checked;
    const write = document.getElementById('aclWrite').checked;
    const execute = document.getElementById('aclExecute').checked;
    const isDefault = document.getElementById('aclDefault').checked;

    let perms = '';
    if (read) perms += 'r';
    if (write) perms += 'w';
    if (execute) perms += 'x';
    if (!perms) perms = '-';

    const rule = {
        entity,
        name,
        perms,
        isDefault
    };

    // Upsert logic: Check if rule exists
    const existingIndex = aclRules.findIndex(r =>
        r.entity === entity &&
        r.name === name &&
        r.isDefault === isDefault
    );

    if (existingIndex !== -1) {
        // Update existing rule
        aclRules[existingIndex] = rule;
    } else {
        // Add new rule
        aclRules.push(rule);
    }

    renderAclRules();
    updateAclCommands();
}

// Handle ACL Entity change to toggle Name input
document.getElementById('aclEntity').addEventListener('change', function () {
    const nameInput = document.getElementById('aclName');
    if (this.value === 'o' || this.value === 'm') {
        nameInput.value = '';
        nameInput.disabled = true;
        nameInput.placeholder = 'Not applicable for ' + (this.value === 'o' ? 'Other' : 'Mask');
    } else {
        nameInput.disabled = false;
        nameInput.placeholder = 'e.g., john, developers';
    }
});

// State Persistence
let savedPermState = null;

function savePermState() {
    savedPermState = {};
    // Save standard permissions
    document.querySelectorAll('.permission-grid input[type="checkbox"]').forEach(cb => {
        savedPermState[cb.id] = cb.checked;
    });
    // Save special permissions
    document.querySelectorAll('.special-perms-container input[type="checkbox"]').forEach(cb => {
        savedPermState[cb.id] = cb.checked;
    });
}

function restorePermState() {
    if (!savedPermState) return;

    // Restore standard permissions
    document.querySelectorAll('.permission-grid input[type="checkbox"]').forEach(cb => {
        if (savedPermState.hasOwnProperty(cb.id)) {
            cb.checked = savedPermState[cb.id];
        }
    });
    // Restore special permissions
    document.querySelectorAll('.special-perms-container input[type="checkbox"]').forEach(cb => {
        if (savedPermState.hasOwnProperty(cb.id)) {
            cb.checked = savedPermState[cb.id];
        }
    });
}

// Handle File Type change for Symbolic Link locking
function handleFileTypeChange(type) {
    const checkBoxes = document.querySelectorAll('.permission-grid input[type="checkbox"]');
    const warning = document.getElementById('symlinkWarning');

    if (type === 'l') {
        // Symbolic Link: Force 777 and Disable
        checkBoxes.forEach(cb => {
            cb.checked = true;
            cb.disabled = true;
        });
        // Show specific warning if element exists
        if (warning) warning.style.display = 'block';

        // We update permissions to reflect 777 
        updatePermissions();
    } else {
        // Re-enable checkboxes
        checkBoxes.forEach(cb => {
            cb.disabled = false;
        });
        if (warning) warning.style.display = 'none';

        // Restore permissions from saved state
        restorePermState();
        updatePermissions();
    }
}

function removeAclRule(index) {
    aclRules.splice(index, 1);
    renderAclRules();
    updateAclCommands();
}

function clearAclRules() {
    aclRules = [];
    renderAclRules();
    updateAclCommands();
}

function renderAclRules() {
    const container = document.getElementById('aclRulesList');
    container.innerHTML = ''; // Clear current content

    if (aclRules.length === 0) {
        container.innerHTML = '<em style="color: var(--text-secondary);">No rules added yet. Add rules above.</em>';
        return;
    }

    // Create safe DOM elements instead of unsafe HTML string
    aclRules.forEach((rule, index) => {
        const div = document.createElement('div');
        div.className = 'acl-rule-item';

        const defaultPrefix = rule.isDefault ? 'd:' : '';
        const nameStr = rule.name ? `:${rule.name}` : '';
        const ruleStr = `${defaultPrefix}${rule.entity}${nameStr}:${rule.perms}`;

        const code = document.createElement('code');
        code.textContent = ruleStr; // Secure: treats content as text, preventing XSS

        const btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.className = 'acl-remove-btn';
        // Add listener directly, no need to delegate or parse data-index logic (though we can keep data attr for debug)
        btn.onclick = () => removeAclRule(index);

        div.appendChild(code);
        div.appendChild(btn);
        container.appendChild(div);
    });
}

function updateAclCommands() {
    const recursive = document.getElementById('aclRecursive').checked;
    const recursiveFlag = recursive ? ' -R' : '';

    if (aclRules.length === 0) {
        document.getElementById('setfaclCmd').textContent = 'setfacl -m u:user:rwx file';
        return;
    }

    // Build setfacl command
    const regularRules = aclRules.filter(r => !r.isDefault);
    const defaultRules = aclRules.filter(r => r.isDefault);

    let setfaclCmd = '';

    if (regularRules.length > 0) {
        const ruleStrs = regularRules.map(r => {
            const nameStr = r.name ? `:${r.name}` : '';
            return `${r.entity}${nameStr}:${r.perms}`;
        }).join(',');
        setfaclCmd = `setfacl${recursiveFlag} -m ${ruleStrs} file`;
    }

    if (defaultRules.length > 0) {
        const ruleStrs = defaultRules.map(r => {
            const nameStr = r.name ? `:${r.name}` : '';
            return `${r.entity}${nameStr}:${r.perms}`;
        }).join(',');
        if (setfaclCmd) {
            setfaclCmd += ` && setfacl${recursiveFlag} -d -m ${ruleStrs} directory`;
        } else {
            setfaclCmd = `setfacl${recursiveFlag} -d -m ${ruleStrs} directory`;
        }
    }

    document.getElementById('setfaclCmd').textContent = setfaclCmd;
    document.getElementById('getfaclCmd').textContent = 'getfacl file';
    document.getElementById('removeAclCmd').textContent = 'setfacl -b file';
}

// ========== UMASK ==========
const umaskInput = document.getElementById('umaskInput');
umaskInput.addEventListener('input', calculateUmask);

function setUmask(value) {
    umaskInput.value = value;
    calculateUmask();
}

function calculateUmask() {
    let umaskValue = umaskInput.value.replace(/[^0-7]/g, '');

    // Ensure 4 digits
    if (umaskValue.length > 4) {
        umaskValue = umaskValue.substring(0, 4);
    }
    umaskInput.value = umaskValue;

    // Parse umask (can be 3 or 4 digits)
    let umask = 0;
    if (umaskValue.length === 3) {
        umask = parseInt(umaskValue, 8);
    } else if (umaskValue.length === 4) {
        umask = parseInt(umaskValue.substring(1), 8); // ignore special bits for calculation
    }

    // Calculate resulting permissions
    const filePerms = 0o666 & ~umask;
    const dirPerms = 0o777 & ~umask;

    // Convert to symbolic
    const fileSymbolic = octalToSymbolic(filePerms);
    const dirSymbolic = octalToSymbolic(dirPerms);

    // Update display
    document.getElementById('currentUmask').textContent = umaskValue || '0000';
    document.getElementById('umaskFiles').textContent = `${filePerms.toString(8).padStart(3, '0')} (${fileSymbolic})`;
    document.getElementById('umaskDirs').textContent = `${dirPerms.toString(8).padStart(3, '0')} (${dirSymbolic})`;

    // Update commands
    document.getElementById('umaskSetCmd').textContent = `umask ${umaskValue || '0000'}`;
    document.getElementById('umaskPermanent').textContent = `echo "umask ${umaskValue || '0000'}" >> ~/.bashrc`;
}

function octalToSymbolic(octal) {
    const perms = [
        (octal & 0o400) ? 'r' : '-',
        (octal & 0o200) ? 'w' : '-',
        (octal & 0o100) ? 'x' : '-',
        (octal & 0o040) ? 'r' : '-',
        (octal & 0o020) ? 'w' : '-',
        (octal & 0o010) ? 'x' : '-',
        (octal & 0o004) ? 'r' : '-',
        (octal & 0o002) ? 'w' : '-',
        (octal & 0o001) ? 'x' : '-'
    ];
    return perms.join('');
}

// ========== CHATTR (File Attributes) ==========
const chattrAttributes = ['i', 'a', 'd', 's', 'u', 'A', 'S', 'c', 'j', 't', 'C', 'D'];

function updateChattrCommands() {
    const selectedAttrs = [];

    chattrAttributes.forEach(attr => {
        const checkbox = document.getElementById(`attr-${attr}`);
        if (checkbox && checkbox.checked) {
            selectedAttrs.push(attr);
        }
    });

    const recursive = document.getElementById('chattrRecursive');
    const recursiveFlag = (recursive && recursive.checked) ? '-R ' : '';

    const attrString = selectedAttrs.join('');

    // Update commands
    const setCmd = document.getElementById('chattrSetCmd');
    const removeCmd = document.getElementById('chattrRemoveCmd');
    const lsattrCmd = document.getElementById('lsattrCmd');
    const warning = document.getElementById('chattrWarning');

    if (attrString) {
        setCmd.textContent = `chattr ${recursiveFlag}+${attrString} file`;
        removeCmd.textContent = `chattr ${recursiveFlag}-${attrString} file`;
    } else {
        setCmd.textContent = 'chattr +i file';
        removeCmd.textContent = 'chattr -i file';
    }

    lsattrCmd.textContent = recursive && recursive.checked ? 'lsattr -R directory' : 'lsattr file';

    // Show warning if immutable is selected
    if (warning) {
        if (selectedAttrs.includes('i')) {
            warning.style.display = 'block';
        } else {
            warning.style.display = 'none';
        }
    }
}

// ========== SUDOERS ==========
function updateSudoersRule() {
    const user = document.getElementById('sudoUser').value.trim() || 'user';
    const hosts = document.getElementById('sudoHosts').value.trim() || 'ALL';
    const runAs = document.getElementById('sudoRunAs').value.trim() || 'ALL:ALL';
    const commands = document.getElementById('sudoCommands').value.trim() || 'ALL';

    const nopasswd = document.getElementById('sudo-nopasswd');
    const setenv = document.getElementById('sudo-setenv');

    // Build options string
    const options = [];
    if (nopasswd && nopasswd.checked) options.push('NOPASSWD');
    if (setenv && setenv.checked) options.push('SETENV');

    const optionsStr = options.length > 0 ? options.join(', ') + ': ' : '';

    // Format run-as with parentheses
    const runAsFormatted = runAs.includes(':') || runAs.includes('ALL') ? `(${runAs})` : `(${runAs})`;

    // Build sudoers rule
    const rule = `${user} ${hosts}=${runAsFormatted} ${optionsStr}${commands}`;

    // Update displays
    const ruleOutput = document.getElementById('sudoersRule');
    if (ruleOutput) {
        ruleOutput.textContent = rule;
    }

    // Show NOPASSWD warning
    const warning = document.getElementById('sudoNopasswdWarning');
    if (warning) {
        if (nopasswd && nopasswd.checked) {
            warning.style.display = 'block';
        } else {
            warning.style.display = 'none';
        }
    }
}

// ========== REFERENCE - Copy Examples ==========
function copyExample(button) {
    const codeElement = button.previousElementSibling;
    const text = codeElement.textContent;
    const originalText = button.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button, originalText);
        }).catch(() => {
            fallbackCopy(text, button, originalText);
        });
    } else {
        fallbackCopy(text, button, originalText);
    }
}

// ========== INITIALIZATION ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    updateChownCommands();
    updateAclCommands();
    calculateUmask();
    updatePermissions();

    // Initialize ACL entity state
    const aclEntitySelect = document.getElementById('aclEntity');
    const aclNameInput = document.getElementById('aclName');
    if (aclEntitySelect && aclNameInput) {
        const initialEntity = aclEntitySelect.value;
        if (initialEntity === 'o' || initialEntity === 'm') {
            aclNameInput.disabled = true;
            aclNameInput.placeholder = 'Not applicable for ' + (initialEntity === 'o' ? 'Other' : 'Mask');
        }
    }

    // Add event listener for Leading Zero toggle
    document.getElementById('showLeadingZero').addEventListener('change', updatePermissions);

    // Copy Buttons with data-copy-target
    document.querySelectorAll('.copy-btn[data-copy-target]').forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-copy-target');
            copyText(targetId);
        });
    });

    // Copy Example Buttons (class copy-example-btn)
    document.querySelectorAll('.copy-example-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            copyExample(this);
        });
    });

    // ACL Buttons
    const btnAddAcl = document.getElementById('btnAddAclRule');
    if (btnAddAcl) {
        btnAddAcl.addEventListener('click', addAclRule);
    }

    const btnClearAcl = document.getElementById('btnClearAclRules');
    if (btnClearAcl) {
        btnClearAcl.addEventListener('click', clearAclRules);
    }

    // Umask Preset Buttons
    document.querySelectorAll('.preset-btn[data-umask]').forEach(btn => {
        btn.addEventListener('click', function () {
            const val = this.getAttribute('data-umask');
            setUmask(val);
        });
    });

    // Chattr Attribute Checkboxes
    chattrAttributes.forEach(attr => {
        const checkbox = document.getElementById(`attr-${attr}`);
        if (checkbox) {
            checkbox.addEventListener('change', updateChattrCommands);
        }
    });

    // Chattr Recursive Checkbox
    const chattrRecursive = document.getElementById('chattrRecursive');
    if (chattrRecursive) {
        chattrRecursive.addEventListener('change', updateChattrCommands);
    }

    // Initialize chattr commands
    updateChattrCommands();

    // Sudoers inputs and checkboxes
    const sudoInputs = ['sudoUser', 'sudoHosts', 'sudoRunAs', 'sudoCommands'];
    sudoInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updateSudoersRule);
        }
    });

    const sudoNopasswd = document.getElementById('sudo-nopasswd');
    const sudoSetenv = document.getElementById('sudo-setenv');
    if (sudoNopasswd) sudoNopasswd.addEventListener('change', updateSudoersRule);
    if (sudoSetenv) sudoSetenv.addEventListener('change', updateSudoersRule);

    // Initialize sudoers rule
    updateSudoersRule();
});
