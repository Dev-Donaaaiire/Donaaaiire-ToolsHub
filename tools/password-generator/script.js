const lengthSlider = document.getElementById('length');
const lengthInput = document.getElementById('length-input');
const passwordOutput = document.getElementById('password-output');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

const options = {
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols')
};

const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Load history from local storage
let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
let isCopying = false; // Prevent cumulative clicks

function updateLengthFromSlider() {
    lengthInput.value = lengthSlider.value;
}

function updateLengthFromInput() {
    const value = parseInt(lengthInput.value) || 4;
    // Clamp to minimum of 4
    if (value < 4) {
        lengthInput.value = 4;
    }
    // Update slider only if within its range
    if (value <= 50) {
        lengthSlider.value = value;
    }
}

function generatePassword() {
    let charSet = '';
    if (options.uppercase.checked) charSet += chars.uppercase;
    if (options.lowercase.checked) charSet += chars.lowercase;
    if (options.numbers.checked) charSet += chars.numbers;
    if (options.symbols.checked) charSet += chars.symbols;

    if (charSet === '') {
        alert('Por favor selecciona al menos una opción.');
        return;
    }

    let password = '';
    const length = parseInt(lengthInput.value) || 16;
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    passwordOutput.value = password;
    addToHistory(password);
}

function addToHistory(password) {
    // Add to beginning, limit to 10
    history.unshift(password);
    if (history.length > 10) history.pop();

    localStorage.setItem('passwordHistory', JSON.stringify(history));
    renderHistory();
}

function copyFromHistory(password, buttonElement) {
    window.copyToClipboard(password);

    // Visual feedback
    const originalText = buttonElement.textContent;
    buttonElement.textContent = '¡Copiado!';
    buttonElement.classList.add('text-green-500');
    buttonElement.classList.remove('text-gray-400');

    setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.classList.remove('text-green-500');
        buttonElement.classList.add('text-gray-400');
    }, 1000);
}

// Expose to global scope for inline onclick
window.copyFromHistory = copyFromHistory;

function renderHistory() {
    historyList.innerHTML = '';
    history.forEach(pass => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group';
        li.innerHTML = `
            <span class="font-mono text-sm truncate max-w-[200px]">${pass}</span>
            <button class="text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" onclick="copyFromHistory('${pass}', this)">
                Copiar
            </button>
        `;
        historyList.appendChild(li);
    });
}

function handleCopyPassword() {
    if (!passwordOutput.value || isCopying) return;

    isCopying = true;
    window.copyToClipboard(passwordOutput.value);

    // Visual feedback
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = `<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
        isCopying = false;
    }, 1500);
}

// Event Listeners
lengthSlider.addEventListener('input', updateLengthFromSlider);
lengthInput.addEventListener('input', updateLengthFromInput);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', handleCopyPassword);
clearHistoryBtn.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('passwordHistory');
    renderHistory();
});

// Init
updateLengthFromSlider();
renderHistory();
generatePassword();
