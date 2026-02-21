const themeToggle = document.getElementById('themeToggle');
const ipInput = document.getElementById('ipInput');
const maskInput = document.getElementById('maskInput');
const calculateBtn = document.getElementById('calculate');
const resultsDiv = document.getElementById('results');
const versionBtns = document.querySelectorAll('.version-btn');

let currentVersion = 'ipv4';

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
}

// Theme Toggle with persistence
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Version Toggle
versionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        versionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentVersion = btn.dataset.version;
        updatePlaceholders();
        clearResults();
    });
});

function updatePlaceholders() {
    if (currentVersion === 'ipv4') {
        ipInput.placeholder = 'IP Address (e.g., 192.168.1.0)';
        maskInput.placeholder = 'Subnet Mask or CIDR (e.g., 24 or 255.255.255.0)';
    } else {
        ipInput.placeholder = 'IPv6 Address (e.g., 2001:db8::)';
        maskInput.placeholder = 'Prefix Length (e.g., 64)';
    }
}

function clearResults() {
    resultsDiv.innerHTML = '';
}

function isValidIPv4(ip) {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!pattern.test(ip)) return false;
    return ip.split('.').every(num => parseInt(num) >= 0 && parseInt(num) <= 255);
}

function isValidIPv6(ip) {
    const pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$|^([0-9a-fA-F]{1,4}:){1,7}:$|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$|^([0-9a-fA-F]{1,4}:){2}((:[0-9a-fA-F]{1,4}){1,5})$|^([0-9a-fA-F]{1,4}:){3}((:[0-9a-fA-F]{1,4}){1,4})$|^([0-9a-fA-F]{1,4}:){4}((:[0-9a-fA-F]{1,4}){1,3})$|^([0-9a-fA-F]{1,4}:){5}((:[0-9a-fA-F]{1,4}){1,2})$|^([0-9a-fA-F]{1,4}:){6}:([0-9a-fA-F]{1,4})$/;
    return pattern.test(ip);
}

// --- YENI EKLENEN IP SINIFI FONKSIYONU ---
function getIPClass(ip) {
    const firstOctet = parseInt(ip.split('.')[0]);

    if (firstOctet === 0) {
        return 'Special (Default Route)';
    } else if (firstOctet >= 1 && firstOctet <= 126) {
        return 'Class A';
    } else if (firstOctet === 127) {
        return 'Loopback';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        return 'Class B';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        return 'Class C';
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        return 'Class D (Multicast)';
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        return 'Class E (Experimental)';
    } else {
        return 'Invalid';
    }
}

function calculateIPv4Subnet(ip, mask) {
    const ipParts = ip.split('.').map(Number);
    let maskBits;

    if (mask.includes('.')) {
        // Convert subnet mask to CIDR
        const maskParts = mask.split('.').map(Number);

        // Validate each octet is 0-255
        if (maskParts.some(part => part < 0 || part > 255 || isNaN(part))) {
            alert('Invalid subnet mask. Each octet must be 0-255.');
            return null;
        }

        // Convert to binary and count consecutive 1s from the left
        const binaryMask = maskParts.map(part => part.toString(2).padStart(8, '0')).join('');
        maskBits = 0;
        let foundZero = false;

        for (let i = 0; i < 32; i++) {
            if (binaryMask[i] === '1') {
                if (foundZero) {
                    alert('Invalid subnet mask. Must be contiguous (e.g., 255.255.255.0, not 255.0.255.0).');
                    return null;
                }
                maskBits++;
            } else {
                foundZero = true;
            }
        }
    } else {
        maskBits = parseInt(mask);

        // Validate CIDR range
        if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) {
            alert('Invalid CIDR notation. Must be between 0 and 32.');
            return null;
        }
    }

    const maskArray = new Array(32).fill(0);
    for (let i = 0; i < maskBits; i++) {
        maskArray[i] = 1;
    }

    const networkBinary = ipParts.map(part => part.toString(2).padStart(8, '0')).join('');
    const networkBits = networkBinary.split('').map((bit, i) => bit & maskArray[i]).join('');

    const networkAddress = [];
    for (let i = 0; i < 32; i += 8) {
        networkAddress.push(parseInt(networkBits.substr(i, 8), 2));
    }

    const broadcastBits = networkBits.split('').map((bit, i) => {
        return i < maskBits ? bit : '1';
    }).join('');

    const broadcastAddress = [];
    for (let i = 0; i < 32; i += 8) {
        broadcastAddress.push(parseInt(broadcastBits.substr(i, 8), 2));
    }

    const totalHosts = Math.pow(2, 32 - maskBits);
    let usableHosts;

    // RFC 3021 Support for /31 P2P links
    if (maskBits === 31) {
        usableHosts = 2; // Point-to-Point
    } else if (maskBits === 32) {
        usableHosts = 1; // Single Host
    } else {
        usableHosts = totalHosts - 2;
    }

    const networkAddressStr = networkAddress.join('.');
    const broadcastAddressStr = broadcastAddress.join('.');

    return {
        ipClass: getIPClass(ip),
        networkAddress: networkAddressStr,
        broadcastAddress: broadcastAddressStr,
        totalHosts: usableHosts > 0 ? usableHosts : 0,
        maskBits,
        subnetMask: new Array(4).fill(0).map((_, i) => {
            const pos = i * 8;
            return parseInt(maskArray.slice(pos, pos + 8).join(''), 2);
        }).join('.'),
        wildcardMask: new Array(4).fill(0).map((_, i) => {
            const pos = i * 8;
            const maskByte = parseInt(maskArray.slice(pos, pos + 8).join(''), 2);
            return 255 - maskByte;
        }).join('.'),
        firstHost: (maskBits === 31 || maskBits === 32) ? networkAddressStr : incrementIP(networkAddressStr),
        lastHost: (maskBits === 31 || maskBits === 32) ? broadcastAddressStr : decrementIP(broadcastAddressStr)
    };
}

// IP adresini 32-bit tam sayıya dönüştürür
function ipToLong(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

// 32-bit tam sayıyı IP adresine dönüştürür
function longToIp(long) {
    return [
        (long >>> 24) & 255,
        (long >>> 16) & 255,
        (long >>> 8) & 255,
        long & 255
    ].join('.');
}

function incrementIP(ip) {
    const longIp = ipToLong(ip);
    return longToIp(longIp + 1);
}

function decrementIP(ip) {
    const longIp = ipToLong(ip);
    return longToIp(longIp - 1);
}

function ipToBinary(ip) {
    return ip.split('.')
        .map(octet => parseInt(octet).toString(2).padStart(8, '0'))
        .join('.');
}

function ipToHex(ip) {
    return ip.split('.')
        .map(octet => parseInt(octet).toString(16).toUpperCase().padStart(2, '0'))
        .join('.');
}

function calculateIPv6Subnet(ip, prefixLength) {
    const prefix = parseInt(prefixLength);

    // Validate prefix length
    if (isNaN(prefix) || prefix < 0 || prefix > 128) {
        alert('Invalid prefix length. Must be between 0 and 128.');
        return null;
    }

    // Expand IPv6 address to full format
    const expandedIP = expandIPv6(ip);

    if (!expandedIP) {
        alert('Invalid IPv6 address format.');
        return null;
    }

    // Convert to binary
    const ipBinary = expandedIP.split(':').map(part =>
        parseInt(part, 16).toString(2).padStart(16, '0')
    ).join('');

    // Calculate network address
    const networkBits = ipBinary.substring(0, prefix).padEnd(128, '0');
    const networkAddress = binaryToIPv6(networkBits);

    // Calculate last address (conceptually similar to broadcast range end)
    const lastBits = ipBinary.substring(0, prefix).padEnd(128, '1');
    const lastAddress = binaryToIPv6(lastBits);

    // Calculate host counts using BigInt for precision
    const totalHostBits = BigInt(128 - prefix);
    let totalHosts;
    let usableHosts;

    if (totalHostBits > 64n) {
        totalHosts = 'Too large to calculate';
        usableHosts = 'Too large to calculate';
    } else {
        const total = 2n ** totalHostBits;
        totalHosts = total.toLocaleString('en-US');
        const usable = total > 1n ? total - 1n : 0n;
        usableHosts = usable.toLocaleString('en-US');
    }

    // First usable host (Network + 1)
    const firstHostBits = ipBinary.substring(0, prefix).padEnd(127, '0') + '1';
    const firstHost = binaryToIPv6(firstHostBits);

    // Last usable host (Last - 1)
    const lastUsableBits = ipBinary.substring(0, prefix).padEnd(127, '1') + '0';
    const lastUsableHost = binaryToIPv6(lastUsableBits);

    return {
        prefix,
        networkAddress: compressIPv6(networkAddress),
        broadcastAddress: compressIPv6(lastAddress),
        firstHost: compressIPv6(firstHost),
        lastHost: compressIPv6(lastUsableHost),
        totalHosts: totalHosts,
        usableHosts: usableHosts,
        expandedNetwork: networkAddress,
        ipVersion: 'IPv6'
    };
}

function binaryToIPv6(binary) {
    const parts = [];
    for (let i = 0; i < 128; i += 16) {
        const hexPart = parseInt(binary.substr(i, 16), 2).toString(16).padStart(4, '0');
        parts.push(hexPart);
    }
    return parts.join(':');
}

function expandIPv6(ip) {
    // Handle :: notation
    let expanded = ip;

    if (expanded.includes('::')) {
        const parts = expanded.split('::');

        // IPv6 can only have ONE :: sequence
        if (parts.length > 2) {
            return null; // Invalid: multiple :: found
        }

        const leftParts = parts[0] ? parts[0].split(':') : [];
        const rightParts = parts[1] ? parts[1].split(':') : [];
        const missingParts = 8 - leftParts.length - rightParts.length;

        // If negative, address has too many parts
        if (missingParts < 0) {
            return null; // Invalid: too many parts
        }

        const middleParts = Array(missingParts).fill('0000');
        expanded = [...leftParts, ...middleParts, ...rightParts].join(':');
    }

    const fullParts = expanded.split(':').map(part =>
        (part || '0000').padStart(4, '0')
    );

    // Must have exactly 8 parts
    if (fullParts.length !== 8) {
        return null; // Invalid: wrong number of parts
    }

    return fullParts.join(':');
}

function compressIPv6(ip) {
    // Split into parts and remove leading zeros
    const parts = ip.split(':').map(part => part.replace(/^0+/, '') || '0');

    // Find longest sequence of zeros
    let maxLen = 0;
    let maxStart = -1;
    let currentLen = 0;
    let currentStart = -1;

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '0') {
            if (currentLen === 0) currentStart = i;
            currentLen++;
        } else {
            if (currentLen > maxLen) {
                maxLen = currentLen;
                maxStart = currentStart;
            }
            currentLen = 0;
        }
    }
    // Check end of array
    if (currentLen > maxLen) {
        maxLen = currentLen;
        maxStart = currentStart;
    }

    // Replace longest sequence (must be > 1 to be worth compressing)
    if (maxLen > 1) {
        const front = parts.slice(0, maxStart).join(':');
        const back = parts.slice(maxStart + maxLen).join(':');
        return `${front}::${back}`;
    }

    return parts.join(':');
}

calculateBtn.addEventListener('click', () => {
    const ip = ipInput.value.trim();
    const mask = maskInput.value.trim().replace(/^\//, '');

    clearResults();

    if (currentVersion === 'ipv4') {
        if (!isValidIPv4(ip)) {
            alert('Invalid IPv4 address');
            return;
        }

        const results = calculateIPv4Subnet(ip, mask);
        if (!results) return; // Handle validation errors

        const resultHTML = `
            <div class="result-item">
                <span>IP Class:</span>
                <span>${results.ipClass}</span>
            </div>
            <div class="result-item">
                <span>Network Address:</span>
                <span>${results.networkAddress}</span>
            </div>
            <div class="result-item">
                <span>Broadcast Address:</span>
                <span>${results.broadcastAddress}</span>
            </div>
            <div class="result-item">
                <span>First Usable Host:</span>
                <span>${results.firstHost}</span>
            </div>
            <div class="result-item">
                <span>Last Usable Host:</span>
                <span>${results.lastHost}</span>
            </div>
            <div class="result-item">
                <span>Total Usable Hosts:</span>
                <span>${results.totalHosts}</span>
            </div>
            <div class="result-item">
                <span>Subnet Mask:</span>
                <span>${results.subnetMask}</span>
            </div>
            <div class="result-item">
                <span>Wildcard Mask:</span>
                <span>${results.wildcardMask}</span>
            </div>
            <div class="result-item">
                <span>CIDR Notation:</span>
                <span>/${results.maskBits}</span>
            </div>
            
            <div class="result-item" style="margin-top: 1.5rem; border-bottom: none; color: var(--foreground);">
                <strong>Different Formats (Network Address)</strong>
            </div>
            <div class="result-item">
                <span>Binary:</span>
                <span style="font-family: monospace; font-size: 0.9em;">${ipToBinary(results.networkAddress)}</span>
            </div>
            <div class="result-item">
                <span>Hexadecimal:</span>
                <span style="font-family: monospace;">${ipToHex(results.networkAddress)}</span>
            </div>
            <div class="result-item">
                <span>Integer:</span>
                <span style="font-family: monospace;">${ipToLong(results.networkAddress)}</span>
            </div>

            <div class="result-item" style="display:block; border-bottom:none; margin-top:1.5rem;">
                <strong>Subnet Visualization</strong>
                <div class="subnet-map">
                    <div class="map-bar">
                        <div class="map-segment network" title="Network: ${results.networkAddress}">N</div>
                        <div class="map-segment usable" title="Usable Range: ${results.firstHost} - ${results.lastHost}">
                            <span class="map-label">Usable Hosts (${results.totalHosts})</span>
                        </div>
                        <div class="map-segment broadcast" title="Broadcast: ${results.broadcastAddress}">B</div>
                    </div>
                    <div class="map-legend">
                        <span class="legend-item"><span class="dot network"></span>Network</span>
                        <span class="legend-item"><span class="dot usable"></span>Usable</span>
                        <span class="legend-item"><span class="dot broadcast"></span>Broadcast</span>
                    </div>
                </div>
            </div>
        `;
        resultsDiv.innerHTML = resultHTML;
    } else {
        if (!isValidIPv6(ip)) {
            alert('Invalid IPv6 address');
            return;
        }

        const results = calculateIPv6Subnet(ip, mask);
        if (!results) return;

        const resultHTML = `
            <div class="result-item">
                <span>IP Version:</span>
                <span>${results.ipVersion}</span>
            </div>
            <div class="result-item">
                <span>Network Address:</span>
                <span>${results.networkAddress}/${results.prefix}</span>
            </div>
            <div class="result-item">
                <span>Last Address:</span>
                <span>${results.broadcastAddress}</span>
            </div>
            <div class="result-item">
                <span>First Usable Host:</span>
                <span>${results.firstHost}</span>
            </div>
            <div class="result-item">
                <span>Last Usable Host:</span>
                <span>${results.lastHost}</span>
            </div>
            <div class="result-item">
                <span>Total Hosts:</span>
                <span>${results.totalHosts}</span>
            </div>
            <div class="result-item">
                <span>Usable Hosts:</span>
                <span>${results.usableHosts}</span>
            </div>
            <div class="result-item">
                <span>Prefix Length:</span>
                <span>/${results.prefix}</span>
            </div>
            <div class="result-item">
                <span>Expanded Network:</span>
                <span>${results.expandedNetwork}</span>
            </div>
        `;
        resultsDiv.innerHTML = resultHTML;
    }
});

// === TAB HANDLING ===
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
});

// === VLSM CALCULATOR LOGIC ===
const addSubnetBtn = document.getElementById('addSubnet');
const vlsmInputs = document.getElementById('vlsmInputs');
const calcVLSMBtn = document.getElementById('calcVLSM');
const vlsmResults = document.getElementById('vlsmResults');

addSubnetBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'subnet-row';
    row.innerHTML = `
        <input type="text" placeholder="Name (e.g. LAN B)" class="subnet-name">
        <input type="number" placeholder="Hosts Needed" class="subnet-hosts">
        <div class="btn-icon btn-remove">×</div>
    `;

    row.querySelector('.btn-remove').addEventListener('click', () => {
        row.remove();
    });

    vlsmInputs.appendChild(row);
});

calcVLSMBtn.addEventListener('click', () => {
    const networkInput = document.getElementById('vlsmNetwork').value.trim();
    const rows = document.querySelectorAll('.subnet-row');
    const requirements = [];

    // Parse Input Network
    let majorIp, majorCidr;
    if (networkInput.includes('/')) {
        [majorIp, majorCidr] = networkInput.split('/');
        majorCidr = parseInt(majorCidr);
    } else {
        alert('Please enter network in CIDR format (e.g. 192.168.1.0/24)');
        return;
    }

    if (!isValidIPv4(majorIp)) {
        alert('Invalid Major Network IP');
        return;
    }

    // Validate CIDR
    if (isNaN(majorCidr) || majorCidr < 8 || majorCidr > 32) {
        alert('Invalid CIDR notation. Must be between /8 and /32 for VLSM.');
        return;
    }

    // Collect Requirements
    rows.forEach(row => {
        const name = row.querySelector('.subnet-name').value || 'Unnamed';
        const hosts = parseInt(row.querySelector('.subnet-hosts').value);
        if (hosts && !isNaN(hosts) && hosts > 0) {
            requirements.push({ name, hosts });
        }
    });

    if (requirements.length === 0) {
        alert('Please add at least one subnet requirement with positive host count.');
        return;
    }

    // Sort Descending by Hosts
    requirements.sort((a, b) => b.hosts - a.hosts);

    // Normalize major IP to network address
    const majorIpLong = ipToLong(majorIp);
    const majorMaskBits = 32 - majorCidr;
    const majorNetworkLong = (majorIpLong >>> majorMaskBits) << majorMaskBits;

    let currentIpLong = majorNetworkLong;
    const maxIpLong = majorNetworkLong + Math.pow(2, majorMaskBits);

    let resultHTML = '<h3 style="margin-bottom:1rem; border-bottom:1px solid var(--border); padding-bottom:0.5rem;">VLSM Allocation</h3>';

    for (const req of requirements) {
        // Calculate needed block size (hosts + network + broadcast)
        const needed = req.hosts + 2;

        // Find smallest power of 2
        let size = 1;
        let cidr = 32;
        while (size < needed) {
            size *= 2;
            cidr--;
        }

        // Align current IP to subnet boundary
        // A /25 (128 IPs) must start at multiples of 128
        if (currentIpLong % size !== 0) {
            currentIpLong = Math.ceil(currentIpLong / size) * size;
        }

        // Check if fits
        if (currentIpLong + size > maxIpLong) {
            resultHTML += `<div class="result-item" style="color:var(--destructive);">Failed to allocate for ${req.name} (${req.hosts} hosts): Not enough IP space</div>`;
            break; // Stop processing remaining subnets
        }

        const networkAddr = longToIp(currentIpLong);
        const broadcastAddr = longToIp(currentIpLong + size - 1);
        const rangeStart = size > 2 ? longToIp(currentIpLong + 1) : networkAddr;
        const rangeEnd = size > 2 ? longToIp(currentIpLong + size - 2) : broadcastAddr;
        const availableHosts = size > 2 ? size - 2 : 0;

        resultHTML += `
            <div class="result-item" style="display:block; margin-bottom:1.5rem;">
                <div style="font-weight:bold; color:var(--primary); margin-bottom:0.5rem; display:flex; justify-content:space-between;">
                    <span>${req.name}</span>
                    <span style="background:var(--secondary); padding:0.2rem 0.5rem; border-radius:4px;">/${cidr}</span>
                </div>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:0.5rem; font-size:0.9rem;">
                    <div>Network: <span style="font-family:monospace">${networkAddr}</span></div>
                    <div>Broadcast: <span style="font-family:monospace">${broadcastAddr}</span></div>
                    <div style="grid-column: span 2;">Range: <span style="font-family:monospace">${rangeStart} - ${rangeEnd}</span></div>
                    <div>Hosts Configured: ${req.hosts}</div>
                    <div>Hosts Available: ${availableHosts}</div>
                </div>
            </div>
        `;

        currentIpLong += size;
    }

    // Check remaining space
    if (currentIpLong < maxIpLong) {
        const remaining = maxIpLong - currentIpLong;
        resultHTML += `
            <div class="result-item" style="border-top: 2px dashed var(--border); margin-top:1rem; padding-top:1rem;">
                <strong>Unused Space:</strong> ${remaining} IPs remaining
            </div>
        `;
    }

    vlsmResults.innerHTML = resultHTML;
});

// === RANGE TO CIDR LOGIC ===
const calcCIDRBtn = document.getElementById('calcCIDR');
const cidrResults = document.getElementById('cidrResults');

calcCIDRBtn.addEventListener('click', () => {
    const startIP = document.getElementById('startIP').value.trim();
    const endIP = document.getElementById('endIP').value.trim();

    if (!isValidIPv4(startIP) || !isValidIPv4(endIP)) {
        alert('Please enter valid IPv4 addresses for Start and End IP.');
        return;
    }

    let start = ipToLong(startIP);
    let end = ipToLong(endIP);

    if (start > end) {
        alert('Start IP must be less than or equal to End IP.');
        return;
    }

    let resultHTML = '<h3 style="margin-bottom:1rem; border-bottom:1px solid var(--border); padding-bottom:0.5rem;">CIDR Blocks</h3>';
    resultHTML += `<div style="margin-bottom:1rem;">Range: <strong>${startIP}</strong> - <strong>${endIP}</strong> (${(end - start + 1).toLocaleString()} IPs)</div>`;
    resultHTML += '<ul style="list-style: none;">';

    let current = start;
    const blocks = [];

    while (current <= end) {
        let found = false;
        // Optimization: Loop 0 to 32 finding the first (largest) that fits
        for (let i = 0; i <= 32; i++) {
            const blockSize = Math.pow(2, 32 - i);

            if (current % blockSize === 0) {
                if (current + blockSize - 1 <= end) {
                    blocks.push({
                        ip: longToIp(current),
                        cidr: i,
                        count: blockSize
                    });
                    current += blockSize;
                    found = true;
                    break;
                }
            }
        }
        if (!found) break;
    }

    blocks.forEach(block => {
        resultHTML += `
            <li class="result-item" style="margin-bottom: 0.5rem;">
                <span style="font-family:monospace; font-weight:bold; color:var(--primary);">${block.ip}/${block.cidr}</span>
                <span class="text-sm text-muted-foreground">(${block.count.toLocaleString()} IPs)</span>
            </li>
        `;
    });

    resultHTML += '</ul>';
    cidrResults.innerHTML = resultHTML;
});

// === SUBNET SPLITTER LOGIC ===
const calcSplitterBtn = document.getElementById('calcSplitter');
const splitterResults = document.getElementById('splitterResults');

calcSplitterBtn.addEventListener('click', () => {
    const networkInput = document.getElementById('splitterNetwork').value.trim();
    const count = parseInt(document.getElementById('splitterCount').value);

    // Parse network
    if (!networkInput.includes('/')) {
        alert('Please enter network in CIDR format (e.g. 192.168.0.0/24)');
        return;
    }

    const [networkIP, cidrStr] = networkInput.split('/');
    const originalCIDR = parseInt(cidrStr);

    if (!isValidIPv4(networkIP)) {
        alert('Invalid network IP address');
        return;
    }

    // Validate CIDR
    if (isNaN(originalCIDR) || originalCIDR < 8 || originalCIDR > 32) {
        alert('Invalid CIDR notation. Must be between /8 and /32 for Subnet Splitter.');
        return;
    }

    if (!count || count < 2 || count > 256) {
        alert('Please enter a valid number of subnets (2-256)');
        return;
    }

    // Calculate new CIDR
    const bitsNeeded = Math.ceil(Math.log2(count));
    const newCIDR = originalCIDR + bitsNeeded;

    if (newCIDR > 32) {
        alert(`Cannot split /${originalCIDR} into ${count} subnets. Not enough address space.`);
        return;
    }

    const subnetSize = Math.pow(2, 32 - newCIDR);
    const actualSubnets = Math.pow(2, bitsNeeded);

    let resultHTML = '<h3 style="margin-bottom:1rem; border-bottom:1px solid var(--border); padding-bottom:0.5rem;">Subnet Split Results</h3>';
    resultHTML += `<div style="margin-bottom:1rem;">Original Network: <strong>${networkInput}</strong> → Split into <strong>${actualSubnets}</strong> subnets of <strong>/${newCIDR}</strong></div>`;

    if (actualSubnets > count) {
        resultHTML += `<div style="margin-bottom:1rem; color:var(--muted-foreground); font-size:0.9rem;">Note: Splitting into ${actualSubnets} subnets (next power of 2) instead of ${count}</div>`;
    }

    resultHTML += '<div style="display:grid; gap:1rem;">';

    // Normalize network IP to network address
    const networkLong = ipToLong(networkIP);
    const maskBits = 32 - originalCIDR;
    const normalizedNetworkLong = (networkLong >>> maskBits) << maskBits;
    let currentIP = normalizedNetworkLong;

    for (let i = 0; i < actualSubnets; i++) {
        const subnetIP = longToIp(currentIP);
        const broadcastIP = longToIp(currentIP + subnetSize - 1);
        const firstHost = subnetSize > 2 ? longToIp(currentIP + 1) : subnetIP;
        const lastHost = subnetSize > 2 ? longToIp(currentIP + subnetSize - 2) : broadcastIP;
        const usableHosts = subnetSize > 2 ? subnetSize - 2 : 0;

        resultHTML += `
            <div class="result-item" style="display:block; padding:1rem; background:var(--card); border:1px solid var(--border); border-radius:8px;">
                <div style="font-weight:bold; color:var(--primary); margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center;">
                    <span>Subnet ${i + 1}</span>
                    <span style="background:var(--secondary); padding:0.2rem 0.6rem; border-radius:4px; font-family:monospace;">${subnetIP}/${newCIDR}</span>
                </div>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:0.5rem; font-size:0.9rem;">
                    <div>Network: <span style="font-family:monospace">${subnetIP}</span></div>
                    <div>Broadcast: <span style="font-family:monospace">${broadcastIP}</span></div>
                    <div>First Host: <span style="font-family:monospace">${firstHost}</span></div>
                    <div>Last Host: <span style="font-family:monospace">${lastHost}</span></div>
                    <div style="grid-column: span 2;">Usable Hosts: <strong>${usableHosts.toLocaleString()}</strong></div>
                </div>
            </div>
        `;

        currentIP += subnetSize;
    }

    resultHTML += '</div>';
    splitterResults.innerHTML = resultHTML;
});
// === ADMIN TOOLS: SUBNET OVERLAP CHECKER ===
const checkOverlapBtn = document.getElementById('checkOverlap');
const overlapResults = document.getElementById('overlapResults');

function checkSubnetOverlap(network1, network2) {
    // Parse both networks
    if (!network1.includes('/') || !network2.includes('/')) {
        return { error: 'Both networks must be in CIDR format (e.g., 192.168.1.0/24)' };
    }

    const [ip1, cidr1] = network1.split('/');
    const [ip2, cidr2] = network2.split('/');

    if (!isValidIPv4(ip1) || !isValidIPv4(ip2)) {
        return { error: 'Invalid IP address format' };
    }

    const cidr1Num = parseInt(cidr1);
    const cidr2Num = parseInt(cidr2);

    if (isNaN(cidr1Num) || cidr1Num < 0 || cidr1Num > 32 ||
        isNaN(cidr2Num) || cidr2Num < 0 || cidr2Num > 32) {
        return { error: 'Invalid CIDR notation. Must be between 0 and 32.' };
    }

    // Normalize to network addresses
    const net1Long = (ipToLong(ip1) >>> (32 - cidr1Num)) << (32 - cidr1Num);
    const net2Long = (ipToLong(ip2) >>> (32 - cidr2Num)) << (32 - cidr2Num);

    const size1 = Math.pow(2, 32 - cidr1Num);
    const size2 = Math.pow(2, 32 - cidr2Num);

    const net1End = net1Long + size1 - 1;
    const net2End = net2Long + size2 - 1;

    // Check overlap conditions
    const overlaps = (net1Long <= net2End && net1End >= net2Long);

    return {
        overlaps,
        network1: {
            address: longToIp(net1Long) + '/' + cidr1Num,
            start: longToIp(net1Long),
            end: longToIp(net1End),
            size: size1
        },
        network2: {
            address: longToIp(net2Long) + '/' + cidr2Num,
            start: longToIp(net2Long),
            end: longToIp(net2End),
            size: size2
        }
    };
}

checkOverlapBtn.addEventListener('click', () => {
    const network1 = document.getElementById('overlapNetwork1').value.trim();
    const network2 = document.getElementById('overlapNetwork2').value.trim();

    if (!network1 || !network2) {
        alert('Please enter both networks');
        return;
    }

    const result = checkSubnetOverlap(network1, network2);

    if (result.error) {
        alert(result.error);
        return;
    }

    let resultHTML = '';

    if (result.overlaps) {
        resultHTML = `
            <div style="padding: 1.5rem; background: rgba(239, 68, 68, 0.1); border: 2px solid var(--destructive); border-radius: 8px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚠️</div>
                <h3 style="color: var(--destructive); margin-bottom: 0.5rem;">Networks Overlap!</h3>
                <p style="color: var(--muted-foreground);">These subnets cannot coexist in the same routing domain</p>
            </div>
        `;
    } else {
        resultHTML = `
            <div style="padding: 1.5rem; background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">✅</div>
                <h3 style="color: #22c55e; margin-bottom: 0.5rem;">No Overlap</h3>
                <p style="color: var(--muted-foreground);">These subnets can safely coexist</p>
            </div>
        `;
    }

    resultHTML += `
        <div style="margin-top: 1.5rem; display: grid; gap: 1rem;">
            <div class="result-item" style="display: block; background: var(--card); padding: 1rem; border-radius: 8px;">
                <div style="font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">Network 1: ${result.network1.address}</div>
                <div style="font-size: 0.9rem; color: var(--muted-foreground);">
                    Range: ${result.network1.start} - ${result.network1.end}<br>
                    Total IPs: ${result.network1.size.toLocaleString()}
                </div>
            </div>
            <div class="result-item" style="display: block; background: var(--card); padding: 1rem; border-radius: 8px;">
                <div style="font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">Network 2: ${result.network2.address}</div>
                <div style="font-size: 0.9rem; color: var(--muted-foreground);">
                    Range: ${result.network2.start} - ${result.network2.end}<br>
                    Total IPs: ${result.network2.size.toLocaleString()}
                </div>
            </div>
        </div>
    `;

    overlapResults.innerHTML = resultHTML;
});

// === ADMIN TOOLS: ROUTE SUMMARIZATION ===
const addSummaryNetworkBtn = document.getElementById('addSummaryNetwork');
const calcSummaryBtn = document.getElementById('calcSummary');
const summaryInputs = document.getElementById('summaryInputs');
const summaryResults = document.getElementById('summaryResults');

addSummaryNetworkBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'summary-row';
    row.innerHTML = `
        <input type="text" class="summary-network" placeholder="e.g., 10.1.1.0/24" />
        <button class="btn-icon btn-remove">×</button>
    `;

    row.querySelector('.btn-remove').addEventListener('click', () => {
        row.remove();
    });

    summaryInputs.appendChild(row);
});

function calculateRouteSummary(networks) {
    if (networks.length === 0) {
        return { error: 'Please add at least one network' };
    }

    // Parse and validate all networks
    const parsed = [];
    for (const net of networks) {
        if (!net.includes('/')) {
            return { error: `Invalid network format: ${net}` };
        }

        const [ip, cidr] = net.split('/');
        if (!isValidIPv4(ip)) {
            return { error: `Invalid IP address: ${ip}` };
        }

        const cidrNum = parseInt(cidr);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            return { error: `Invalid CIDR: /${cidr}` };
        }

        // Normalize to network address
        const netLong = (ipToLong(ip) >>> (32 - cidrNum)) << (32 - cidrNum);
        parsed.push({ long: netLong, cidr: cidrNum, original: net });
    }

    // Sort networks by address
    parsed.sort((a, b) => a.long - b.long);

    // Find common prefix length by comparing all networks
    let minNet = parsed[0].long;
    let maxNet = 0;

    // Find the actual end of the range covered by ALL networks
    for (const p of parsed) {
        const netEnd = p.long + Math.pow(2, 32 - p.cidr) - 1;
        if (netEnd > maxNet) maxNet = netEnd;
    }

    // Calculate summary by finding common bits
    let summaryPrefix = 0;
    for (let i = 31; i >= 0; i--) {
        const minBit = (minNet >>> i) & 1;
        const maxBit = (maxNet >>> i) & 1;

        if (minBit === maxBit) {
            summaryPrefix++;
        } else {
            break;
        }
    }

    const summaryNet = (minNet >>> (32 - summaryPrefix)) << (32 - summaryPrefix);
    const summarySize = Math.pow(2, 32 - summaryPrefix);

    // Calculate Efficiency
    const totalInputIPs = parsed.reduce((sum, net) => sum + Math.pow(2, 32 - net.cidr), 0);
    const efficiency = (totalInputIPs / summarySize) * 100;

    return {
        summaryRoute: `${longToIp(summaryNet)}/${summaryPrefix}`,
        summaryStart: longToIp(summaryNet),
        summaryEnd: longToIp(summaryNet + summarySize - 1),
        totalIPs: summarySize,
        coveredIPs: totalInputIPs,
        efficiency: efficiency.toFixed(1),
        networks: parsed.map(p => ({
            address: longToIp(p.long) + '/' + p.cidr,
            original: p.original
        }))
    };
}

calcSummaryBtn.addEventListener('click', () => {
    const rows = document.querySelectorAll('.summary-network');
    const networks = [];

    rows.forEach(input => {
        const value = input.value.trim();
        if (value) {
            networks.push(value);
        }
    });

    if (networks.length === 0) {
        alert('Please add at least one network');
        return;
    }

    const result = calculateRouteSummary(networks);

    if (result.error) {
        alert(result.error);
        return;
    }

    // Determine efficiency status color
    let effColor = 'var(--muted-foreground)';
    let effIcon = '📊';

    if (result.efficiency < 50) {
        effColor = 'var(--destructive)'; // Low efficiency (large gaps)
        effIcon = '⚠️';
    } else if (result.efficiency >= 100) {
        effColor = '#22c55e'; // Perfect (contiguous)
        effIcon = '✅';
    }

    let resultHTML = `
        <div style="padding: 1.5rem; background: var(--card); border: 2px solid var(--primary); border-radius: 8px; margin-bottom: 1.5rem;">
            <h3 style="color: var(--primary); margin-bottom: 1rem; text-align: center;">Summary Route</h3>
            <div style="text-align: center; font-size: 1.5rem; font-family: monospace; font-weight: bold; color: var(--foreground); margin-bottom: 0.5rem;">
                ${result.summaryRoute}
            </div>
            <div style="text-align: center; color: var(--muted-foreground); font-size: 0.9rem;">
                Range: ${result.summaryStart} - ${result.summaryEnd}<br>
                Total IPs: ${result.totalIPs.toLocaleString()}
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); text-align: center;">
                <div style="font-size: 0.9rem; color: ${effColor}; font-weight: bold;">
                   ${effIcon} Efficiency: ${result.efficiency}%
                </div>
                <div style="font-size: 0.8rem; color: var(--muted-foreground);">
                    Covered IPs: ${result.coveredIPs.toLocaleString()}
                </div>
            </div>
        </div>

        <h4 style="margin-bottom: 0.5rem;">Networks Included:</h4>
        <div style="display: grid; gap: 0.5rem;">
    `;

    result.networks.forEach(net => {
        resultHTML += `
            <div class="result-item" style="font-family: monospace; background: var(--secondary);">
                ✓ ${net.address}
            </div>
        `;
    });

    resultHTML += '</div>';

    summaryResults.innerHTML = resultHTML;
});

// === UTILITY TOOLS: MAC ADDRESS CONVERTER ===
const convertMACBtn = document.getElementById('convertMAC');
const macResults = document.getElementById('macResults');

function convertMACAddress(mac) {
    // Remove all separators and convert to uppercase
    const clean = mac.replace(/[:\-\.]/g, '').toUpperCase();

    // Validate length (should be exactly 12 hex characters)
    if (clean.length !== 12 || !/^[0-9A-F]{12}$/.test(clean)) {
        return { error: 'Invalid MAC address. Must be 12 hexadecimal characters.' };
    }

    // Generate different formats
    return {
        cisco: clean.match(/.{4}/g).join('.').toLowerCase(),     // aabb.ccdd.eeff
        colon: clean.match(/.{2}/g).join(':'),                   // AA:BB:CC:DD:EE:FF
        dash: clean.match(/.{2}/g).join('-'),                    // AA-BB-CC-DD-EE-FF
        bare: clean,                                              // AABBCCDDEEFF
        bareLower: clean.toLowerCase()                           // aabbccddeeff
    };
}

convertMACBtn.addEventListener('click', () => {
    const macInput = document.getElementById('macInput').value.trim();

    if (!macInput) {
        alert('Please enter a MAC address');
        return;
    }

    const result = convertMACAddress(macInput);

    if (result.error) {
        alert(result.error);
        return;
    }

    macResults.innerHTML = `
        <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            <div class="result-item">
                <span>Cisco Format:</span>
                <span style="font-family: monospace; font-weight: bold;">${result.cisco}</span>
            </div>
            <div class="result-item">
                <span>Colon Format:</span>
                <span style="font-family: monospace; font-weight: bold;">${result.colon}</span>
            </div>
            <div class="result-item">
                <span>Dash Format:</span>
                <span style="font-family: monospace; font-weight: bold;">${result.dash}</span>
            </div>
            <div class="result-item">
                <span>Bare (Upper):</span>
                <span style="font-family: monospace; font-weight: bold;">${result.bare}</span>
            </div>
            <div class="result-item">
                <span>Bare (Lower):</span>
                <span style="font-family: monospace; font-weight: bold;">${result.bareLower}</span>
            </div>
        </div>
    `;
});

// === UTILITY TOOLS: IP ADDRESS PLANNER ===
const planIPsBtn = document.getElementById('planIPs');
const plannerResults = document.getElementById('plannerResults');

function planIPAddresses(subnet) {
    if (!subnet.includes('/')) {
        return { error: 'Please enter subnet in CIDR format (e.g., 192.168.1.0/24)' };
    }

    const [ip, cidr] = subnet.split('/');
    if (!isValidIPv4(ip)) {
        return { error: 'Invalid IP address' };
    }

    const cidrNum = parseInt(cidr);
    if (isNaN(cidrNum) || cidrNum < 8 || cidrNum > 30) {
        return { error: 'CIDR must be between /8 and /30 for practical planning' };
    }

    // Normalize to network address
    const netLong = (ipToLong(ip) >>> (32 - cidrNum)) << (32 - cidrNum);
    const size = Math.pow(2, 32 - cidrNum);
    const broadcastLong = netLong + size - 1;

    // Dynamic allocation zones based on subnet size
    const usableSize = size - 2;
    const gatewayIp = netLong + 1;

    // Define zones with safety clamping
    const zones = [];

    // 1. Gateway (Always first usable)
    zones.push({
        name: 'Gateway',
        start: gatewayIp,
        end: gatewayIp,
        description: 'Default router address (First Usable)'
    });

    // Strategy changes based on size
    if (cidrNum >= 30) {
        // Very small subnets (P2P) - No fancy zones
        zones.push({
            name: 'Upstream/Peer',
            start: gatewayIp + 1,
            end: broadcastLong - 1,
            description: 'Peer IP address'
        });
    } else {
        // Normal subnets
        // Reserve ~20% for Servers (static), starting after Gateway
        const serverStart = gatewayIp + 1;
        const serverCount = Math.floor(usableSize * 0.2);
        const serverEnd = Math.min(serverStart + serverCount, broadcastLong - 1);

        if (serverEnd >= serverStart) {
            zones.push({
                name: 'Servers / Static',
                start: serverStart,
                end: serverEnd,
                description: 'Servers, Printers, WAPs (Static IPs)'
            });
        }

        // DHCP Pool (Main chunk, ~50%)
        const dhcpStart = serverEnd + 1;
        const dhcpCount = Math.floor(usableSize * 0.5);
        const dhcpEnd = Math.min(dhcpStart + dhcpCount, broadcastLong - 1);

        if (dhcpEnd >= dhcpStart) {
            zones.push({
                name: 'DHCP Pool',
                start: dhcpStart,
                end: dhcpEnd,
                description: 'Client devices (Workstations, Phones)'
            });
        }

        // Reserved (Remainder)
        const reservedStart = dhcpEnd + 1;
        const reservedEnd = broadcastLong - 1;

        if (reservedEnd >= reservedStart) {
            zones.push({
                name: 'Reserved',
                start: reservedStart,
                end: reservedEnd,
                description: 'Future expansion / VPN / Guest'
            });
        }
    }

    return {
        network: longToIp(netLong) + '/' + cidrNum,
        networkAddr: longToIp(netLong),
        broadcastAddr: longToIp(broadcastLong),
        totalIPs: size,
        usableIPs: size - 2,
        zones: zones.filter(z => z.start <= z.end && z.start < broadcastLong)
    };
}

planIPsBtn.addEventListener('click', () => {
    const subnet = document.getElementById('plannerSubnet').value.trim();

    if (!subnet) {
        alert('Please enter a subnet');
        return;
    }

    const result = planIPAddresses(subnet);

    if (result.error) {
        alert(result.error);
        return;
    }

    let resultHTML = `
        <div style="background: var(--card); border: 2px solid var(--primary); border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Network: ${result.network}</h4>
            <div style="font-size: 0.9rem; color: var(--muted-foreground);">
                Network: ${result.networkAddr} | Broadcast: ${result.broadcastAddr}<br>
                Total IPs: ${result.totalIPs.toLocaleString()} | Usable: ${result.usableIPs.toLocaleString()}
            </div>
        </div>
        
        <h4 style="margin-bottom: 1rem;">Suggested Allocation Zones:</h4>
        <div style="display: grid; gap: 1rem;">
    `;

    result.zones.forEach(zone => {
        const count = zone.end - zone.start + 1;
        resultHTML += `
            <div class="result-item" style="display: block; background: var(--secondary); padding: 1rem; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong style="color: var(--primary);">${zone.name}</strong>
                    <span style="background: var(--primary); color: var(--primary-foreground); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">${count} IPs</span>
                </div>
                <div style="font-family: monospace; font-size: 0.9rem; color: var(--foreground); margin-bottom: 0.25rem;">
                    ${longToIp(zone.start)} - ${longToIp(zone.end)}
                </div>
                <div style="font-size: 0.85rem; color: var(--muted-foreground);">
                    ${zone.description}
                </div>
            </div>
        `;
    });

    resultHTML += '</div>';
    plannerResults.innerHTML = resultHTML;
});

// === UTILITY TOOLS: BANDWIDTH CALCULATOR ===
const calcBandwidthBtn = document.getElementById('calcBandwidth');
const bandwidthResults = document.getElementById('bandwidthResults');

function calculateBandwidth(fileSize, fileSizeUnit, bandwidth, bandwidthUnit) {
    // Convert file size to bytes
    const sizeMultipliers = {
        'KB': 1024,
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024
    };
    const fileSizeBytes = fileSize * sizeMultipliers[fileSizeUnit];

    // Convert bandwidth to bits per second
    const bandwidthMultipliers = {
        'Kbps': 1000,
        'Mbps': 1000 * 1000,
        'Gbps': 1000 * 1000 * 1000
    };
    const bandwidthBps = bandwidth * bandwidthMultipliers[bandwidthUnit];

    // Calculate transfer time (theoretical)
    const fileSizeBits = fileSizeBytes * 8;
    const transferSeconds = fileSizeBits / bandwidthBps;

    // Apply TCP overhead (typical ~15% overhead)
    const realTransferSeconds = transferSeconds * 1.15;

    // Format time
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }

    // Convert bandwidth to MB/s
    const mbps = (bandwidthBps / 8 / (1024 * 1024)).toFixed(2);

    return {
        theoretical: formatTime(transferSeconds),
        real: formatTime(realTransferSeconds),
        mbps: mbps,
        fileSize: `${fileSize} ${fileSizeUnit}`,
        bandwidth: `${bandwidth} ${bandwidthUnit}`
    };
}

calcBandwidthBtn.addEventListener('click', () => {
    const fileSize = parseFloat(document.getElementById('fileSize').value);
    const fileSizeUnit = document.getElementById('fileSizeUnit').value;
    const bandwidth = parseFloat(document.getElementById('bandwidth').value);
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;

    if (!fileSize || fileSize <= 0) {
        alert('Please enter a valid file size');
        return;
    }

    if (!bandwidth || bandwidth <= 0) {
        alert('Please enter a valid bandwidth');
        return;
    }

    const result = calculateBandwidth(fileSize, fileSizeUnit, bandwidth, bandwidthUnit);

    bandwidthResults.innerHTML = `
        <div style="background: var(--card); border: 2px solid var(--primary); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
            <h4 style="color: var(--primary); margin-bottom: 1rem; text-align: center;">Transfer Time</h4>
            
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 0.9rem; color: var(--muted-foreground); margin-bottom: 0.5rem;">
                    ${result.fileSize} @ ${result.bandwidth}
                </div>
                <div style="font-size: 2rem; font-weight: bold; color: var(--foreground);">
                    ${result.real}
                </div>
                <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-top: 0.5rem;">
                    (includes TCP overhead)
                </div>
            </div>
            
            <div style="display: grid; gap: 0.75rem;">
                <div class="result-item">
                    <span>Theoretical Time:</span>
                    <span>${result.theoretical}</span>
                </div>
                <div class="result-item">
                    <span>Real-world Time:</span>
                    <span style="font-weight: bold;">${result.real}</span>
                </div>
                <div class="result-item">
                    <span>Speed (MB/s):</span>
                    <span>${result.mbps} MB/s</span>
                </div>
            </div>
        </div>
        
        <div style="font-size: 0.85rem; color: var(--muted-foreground); text-align: center;">
            💡 Actual speeds may vary due to network conditions, latency, and protocol overhead
        </div>
    `;
});

// === REFERENCE TABLE DYNAMIC POPULATION ===
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('referenceTableBody');
    if (!tableBody) return;

    const referenceData = [
        { type: 'header', label: 'CIDR / Supernets' },
        { prefix: '/0', mask: '0.0.0.0', hosts: '4,294,967,294' },
        { prefix: '/1', mask: '128.0.0.0', hosts: '2,147,483,646' },
        { prefix: '/2', mask: '192.0.0.0', hosts: '1,073,741,822' },
        { prefix: '/3', mask: '224.0.0.0', hosts: '536,870,910' },
        { prefix: '/4', mask: '240.0.0.0', hosts: '268,435,454' },
        { prefix: '/5', mask: '248.0.0.0', hosts: '134,217,726' },
        { prefix: '/6', mask: '252.0.0.0', hosts: '67,108,862' },
        { prefix: '/7', mask: '254.0.0.0', hosts: '33,554,430' },
        { type: 'header', label: 'Class A' },
        { prefix: '/8', mask: '255.0.0.0', hosts: '16,777,214' },
        { prefix: '/9', mask: '255.128.0.0', hosts: '8,388,606' },
        { prefix: '/10', mask: '255.192.0.0', hosts: '4,194,302' },
        { prefix: '/11', mask: '255.224.0.0', hosts: '2,097,150' },
        { prefix: '/12', mask: '255.240.0.0', hosts: '1,048,574' },
        { prefix: '/13', mask: '255.248.0.0', hosts: '524,286' },
        { prefix: '/14', mask: '255.252.0.0', hosts: '262,142' },
        { prefix: '/15', mask: '255.254.0.0', hosts: '131,070' },
        { type: 'header', label: 'Class B' },
        { prefix: '/16', mask: '255.255.0.0', hosts: '65,534' },
        { prefix: '/17', mask: '255.255.128.0', hosts: '32,766' },
        { prefix: '/18', mask: '255.255.192.0', hosts: '16,382' },
        { prefix: '/19', mask: '255.255.224.0', hosts: '8,190' },
        { prefix: '/20', mask: '255.255.240.0', hosts: '4,094' },
        { prefix: '/21', mask: '255.255.248.0', hosts: '2,046' },
        { prefix: '/22', mask: '255.255.252.0', hosts: '1,022' },
        { prefix: '/23', mask: '255.255.254.0', hosts: '510' },
        { type: 'header', label: 'Class C' },
        { prefix: '/24', mask: '255.255.255.0', hosts: '254' },
        { prefix: '/25', mask: '255.255.255.128', hosts: '126' },
        { prefix: '/26', mask: '255.255.255.192', hosts: '62' },
        { prefix: '/27', mask: '255.255.255.224', hosts: '30' },
        { prefix: '/28', mask: '255.255.255.240', hosts: '14' },
        { prefix: '/29', mask: '255.255.255.248', hosts: '6' },
        { prefix: '/30', mask: '255.255.255.252', hosts: '2' },
        { prefix: '/31', mask: '255.255.255.254', hosts: '2' },
        { prefix: '/32', mask: '255.255.255.255', hosts: '1' }
    ];

    referenceData.forEach(item => {
        const tr = document.createElement('tr');
        if (item.type === 'header') {
            tr.innerHTML = `<td colspan="3"><strong>${item.label}</strong></td>`;
        } else {
            tr.innerHTML = `
                <td>${item.prefix}</td>
                <td>${item.mask}</td>
                <td>${item.hosts}</td>
            `;
        }
        tableBody.appendChild(tr);
    });
});
