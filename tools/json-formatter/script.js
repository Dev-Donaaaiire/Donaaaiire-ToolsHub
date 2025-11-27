const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const formatBtn = document.getElementById('format-btn');
const minifyBtn = document.getElementById('minify-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const errorMsg = document.getElementById('error-msg');

function formatJSON() {
    try {
        const input = jsonInput.value;
        if (!input.trim()) return;

        const parsed = JSON.parse(input);
        jsonOutput.value = JSON.stringify(parsed, null, 4);
        errorMsg.classList.add('hidden');
        jsonInput.classList.remove('border-red-500');
    } catch (e) {
        showError(e.message);
    }
}

function minifyJSON() {
    try {
        const input = jsonInput.value;
        if (!input.trim()) return;

        const parsed = JSON.parse(input);
        jsonOutput.value = JSON.stringify(parsed);
        errorMsg.classList.add('hidden');
        jsonInput.classList.remove('border-red-500');
    } catch (e) {
        showError(e.message);
    }
}

function showError(msg) {
    errorMsg.textContent = `Error: ${msg}`;
    errorMsg.classList.remove('hidden');
    jsonInput.classList.add('border-red-500');

    // Auto hide after 5s
    setTimeout(() => {
        errorMsg.classList.add('hidden');
    }, 5000);
}

function copyOutput() {
    if (!jsonOutput.value) return;
    window.copyToClipboard(jsonOutput.value);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = '¡Copiado!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 1500);
}

// Event Listeners
formatBtn.addEventListener('click', formatJSON);
minifyBtn.addEventListener('click', minifyJSON);
clearBtn.addEventListener('click', () => {
    jsonInput.value = '';
    jsonOutput.value = '';
    errorMsg.classList.add('hidden');
    jsonInput.classList.remove('border-red-500');
});
copyBtn.addEventListener('click', copyOutput);

// Auto-format on paste (optional, maybe annoying if large)
// jsonInput.addEventListener('paste', () => setTimeout(formatJSON, 100));
