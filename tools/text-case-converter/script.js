const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const charCount = document.getElementById('char-count');

// Update character count
inputText.addEventListener('input', () => {
    charCount.textContent = inputText.value.length;
});

function convertCase(type) {
    const text = inputText.value;
    if (!text) {
        outputText.value = '';
        return;
    }

    let result = '';

    switch (type) {
        case 'upper':
            result = text.toUpperCase();
            break;

        case 'lower':
            result = text.toLowerCase();
            break;

        case 'title':
            result = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
            break;

        case 'sentence':
            result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
            break;

        case 'alternating':
            result = text.split('').map((char, i) =>
                i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
            ).join('');
            break;

        case 'inverse':
            result = text.split('').map(char => {
                if (char === char.toUpperCase()) {
                    return char.toLowerCase();
                } else {
                    return char.toUpperCase();
                }
            }).join('');
            break;
    }

    outputText.value = result;
}

function copyResult() {
    const text = outputText.value;
    if (!text) return;

    window.copyToClipboard(text);

    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 1500);
}

function clearAll() {
    inputText.value = '';
    outputText.value = '';
    charCount.textContent = '0';
}
