const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encodeBtn = document.getElementById('encode-btn');
const decodeBtn = document.getElementById('decode-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

function encode() {
    try {
        const input = inputText.value;
        if (!input) return;
        // Handle utf-8 characters correctly
        const encoded = btoa(unescape(encodeURIComponent(input)));
        outputText.value = encoded;
    } catch (e) {
        outputText.value = "Error: No se pudo codificar.";
    }
}

function decode() {
    try {
        const input = inputText.value;
        if (!input) return;
        // Handle utf-8 characters correctly
        const decoded = decodeURIComponent(escape(atob(input)));
        outputText.value = decoded;
    } catch (e) {
        outputText.value = "Error: Cadena Base64 inválida.";
    }
}

function copyOutput() {
    if (!outputText.value) return;
    window.copyToClipboard(outputText.value);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = '¡Copiado!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 1500);
}

// Event Listeners
encodeBtn.addEventListener('click', encode);
decodeBtn.addEventListener('click', decode);
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
});
copyBtn.addEventListener('click', copyOutput);
