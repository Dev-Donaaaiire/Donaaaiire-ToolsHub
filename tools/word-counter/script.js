const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const charNoSpaceCount = document.getElementById('char-no-space-count');
const paragraphCount = document.getElementById('paragraph-count');
const readingTime = document.getElementById('reading-time');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

function updateStats() {
    const text = textInput.value;

    // Words (split by whitespace and filter empty)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;

    // Characters
    charCount.textContent = text.length;

    // Characters no spaces
    charNoSpaceCount.textContent = text.replace(/\s/g, '').length;

    // Paragraphs (split by newline and filter empty)
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    paragraphCount.textContent = paragraphs.length;

    // Reading time (avg 200 wpm)
    const minutes = Math.ceil(words.length / 200);
    readingTime.textContent = words.length > 0 ? `~${minutes}` : '0';
}

function clearText() {
    textInput.value = '';
    updateStats();
    textInput.focus();
}

function copyText() {
    if (!textInput.value) return;
    window.copyToClipboard(textInput.value);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = '¡Copiado!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 1500);
}

// Event Listeners
textInput.addEventListener('input', updateStats);
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyText);

// Init
updateStats();
