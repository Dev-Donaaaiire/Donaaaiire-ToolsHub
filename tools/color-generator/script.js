// Tabs Logic
const tabs = document.querySelectorAll('[role="tab"]');
const tabContents = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabsTarget);

        // Hide all contents
        tabContents.forEach(tc => tc.classList.add('hidden'));
        // Show target
        target.classList.remove('hidden');

        // Update tab styles
        tabs.forEach(t => {
            t.classList.remove('text-accent', 'border-accent');
            t.classList.add('border-transparent');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('text-accent', 'border-accent');
        tab.classList.remove('border-transparent');
        tab.setAttribute('aria-selected', 'true');
    });
});

// --- Hex Generator ---
const hexPreview = document.getElementById('hex-preview');
const hexValue = document.getElementById('hex-value');
const rgbValue = document.getElementById('rgb-value');
const generateHexBtn = document.getElementById('generate-hex-btn');

function getRandomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function updateHexGenerator() {
    const color = getRandomHex();
    hexPreview.style.backgroundColor = color;
    hexValue.textContent = color;
    rgbValue.textContent = hexToRgb(color);
}

function handleCopyHex() {
    window.copyToClipboard(hexValue.textContent);
    const originalText = hexValue.textContent;
    hexValue.textContent = '¡Copiado!';
    setTimeout(() => hexValue.textContent = originalText, 1000);
}

generateHexBtn.addEventListener('click', updateHexGenerator);
hexPreview.addEventListener('click', handleCopyHex);
hexValue.addEventListener('click', handleCopyHex);

// --- Palette Generator ---
const paletteContainer = document.getElementById('palette-container');
const generatePaletteBtn = document.getElementById('generate-palette-btn');
const savePaletteBtn = document.getElementById('save-palette-btn');
const savedPalettesContainer = document.getElementById('saved-palettes');
const clearPalettesBtn = document.getElementById('clear-palettes');

let currentPalette = [];
let lockedColors = [false, false, false, false, false];

// Load saved palettes
let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];

function generatePalette() {
    // If first run or completely new, generate 5 colors
    // If locked, keep locked colors

    const newPalette = [];
    for (let i = 0; i < 5; i++) {
        if (lockedColors[i] && currentPalette[i]) {
            newPalette.push(currentPalette[i]);
        } else {
            newPalette.push(getRandomHex());
        }
    }
    currentPalette = newPalette;
    renderPalette();
}

function renderPalette() {
    paletteContainer.innerHTML = '';
    currentPalette.forEach((color, index) => {
        const div = document.createElement('div');
        div.className = 'h-full w-full rounded-xl shadow-md flex flex-col items-center justify-end p-4 relative group color-swatch';
        div.style.backgroundColor = color;

        // Determine text color based on brightness
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const textColor = brightness > 125 ? 'text-gray-800' : 'text-white';

        div.innerHTML = `
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="toggleLock(${index})" class="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm ${textColor}">
                    ${lockedColors[index] ?
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>' :
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>'
            }
                </button>
            </div>
            <span class="font-mono font-bold ${textColor} cursor-pointer select-all" onclick="window.copyToClipboard('${color}')">${color}</span>
        `;
        paletteContainer.appendChild(div);
    });
}

function toggleLock(index) {
    lockedColors[index] = !lockedColors[index];
    renderPalette();
}

// Expose toggleLock to global scope for inline onclick
window.toggleLock = toggleLock;

function savePalette() {
    // Check if already saved (deep comparison not strictly necessary, just check if exists)
    // Simple check: join array string
    const paletteStr = JSON.stringify(currentPalette);
    const exists = savedPalettes.some(p => JSON.stringify(p) === paletteStr);

    if (!exists) {
        savedPalettes.push(currentPalette);
        localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
        renderSavedPalettes();
    }
}

function deletePalette(index) {
    savedPalettes.splice(index, 1);
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
    renderSavedPalettes();
}
window.deletePalette = deletePalette;

function renderSavedPalettes() {
    savedPalettesContainer.innerHTML = '';

    if (savedPalettes.length === 0) {
        savedPalettesContainer.innerHTML = '<p class="text-gray-400 text-sm w-full text-center">No tienes paletas guardadas.</p>';
        return;
    }

    savedPalettes.forEach((palette, index) => {
        const div = document.createElement('div');
        div.className = 'bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between';

        let colorsHtml = '<div class="flex rounded-lg overflow-hidden h-12 w-full max-w-md">';
        palette.forEach(color => {
            colorsHtml += `<div style="background-color: ${color}" class="flex-grow h-full" title="${color}"></div>`;
        });
        colorsHtml += '</div>';

        div.innerHTML = `
            ${colorsHtml}
            <button onclick="deletePalette(${index})" class="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;
        savedPalettesContainer.appendChild(div);
    });
}

generatePaletteBtn.addEventListener('click', generatePalette);
savePaletteBtn.addEventListener('click', savePalette);
clearPalettesBtn.addEventListener('click', () => {
    savedPalettes = [];
    localStorage.removeItem('savedPalettes');
    renderSavedPalettes();
});

// Init
updateHexGenerator();
generatePalette();
renderSavedPalettes();
