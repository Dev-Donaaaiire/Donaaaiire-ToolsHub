const amountInput = document.getElementById('amount');
const generateBtn = document.getElementById('generate-btn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generate() {
    const amount = parseInt(amountInput.value) || 1;
    const uuids = [];

    for (let i = 0; i < amount; i++) {
        uuids.push(generateUUID());
    }

    output.value = uuids.join('\n');
}

function copyText() {
    if (!output.value) return;
    window.copyToClipboard(output.value);

    // Visual feedback
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = `<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
    }, 1500);
}

// Event Listeners
generateBtn.addEventListener('click', generate);
copyBtn.addEventListener('click', copyText);

// Init
generate();
