const valA = document.getElementById('val-a');
const valB = document.getElementById('val-b');
const valC = document.getElementById('val-c');
const valX = document.getElementById('val-x');
const modeDirect = document.getElementById('mode-direct');
const modeInverse = document.getElementById('mode-inverse');
const formula = document.getElementById('formula');
const clearBtn = document.getElementById('clear-btn');

let isDirect = true;

function calculate() {
    const a = parseFloat(valA.value);
    const b = parseFloat(valB.value);
    const c = parseFloat(valC.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
        valX.value = '';
        return;
    }

    let result;
    if (isDirect) {
        // X = (B * C) / A
        result = (b * c) / a;
    } else {
        // X = (A * B) / C
        // Inverse: A -> B, C -> X.  A*B = C*X => X = (A*B)/C
        if (c === 0) {
            valX.value = '';
            return;
        }
        result = (a * b) / c;
    }

    // Format to avoid long decimals if integer
    valX.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
}

function setMode(direct) {
    isDirect = direct;

    if (isDirect) {
        modeDirect.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        modeDirect.classList.remove('text-gray-500', 'dark:text-gray-400');
        modeInverse.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        modeInverse.classList.add('text-gray-500', 'dark:text-gray-400');
        formula.textContent = 'X = (B * C) / A';
    } else {
        modeInverse.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        modeInverse.classList.remove('text-gray-500', 'dark:text-gray-400');
        modeDirect.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        modeDirect.classList.add('text-gray-500', 'dark:text-gray-400');
        formula.textContent = 'X = (A * B) / C';
    }
    calculate();
}

// Event Listeners
valA.addEventListener('input', calculate);
valB.addEventListener('input', calculate);
valC.addEventListener('input', calculate);

modeDirect.addEventListener('click', () => setMode(true));
modeInverse.addEventListener('click', () => setMode(false));

clearBtn.addEventListener('click', () => {
    valA.value = '';
    valB.value = '';
    valC.value = '';
    valX.value = '';
});
