document.addEventListener('DOMContentLoaded', () => {
    const baseSizeInput = document.getElementById('base-size');
    const pxInput = document.getElementById('px-input');
    const remInput = document.getElementById('rem-input');
    const resultText = document.getElementById('result-text');

    function updateFromPx() {
        const base = parseFloat(baseSizeInput.value) || 16;
        const px = parseFloat(pxInput.value);

        if (!isNaN(px)) {
            const rem = px / base;
            // Avoid long decimals
            const remFormatted = parseFloat(rem.toFixed(4));
            remInput.value = remFormatted;
            resultText.textContent = `${px}px = ${remFormatted}rem`;
        } else {
            remInput.value = '';
            resultText.textContent = '...';
        }
    }

    function updateFromRem() {
        const base = parseFloat(baseSizeInput.value) || 16;
        const rem = parseFloat(remInput.value);

        if (!isNaN(rem)) {
            const px = rem * base;
            const pxFormatted = parseFloat(px.toFixed(4));
            pxInput.value = pxFormatted;
            resultText.textContent = `${pxFormatted}px = ${rem}rem`;
        } else {
            pxInput.value = '';
            resultText.textContent = '...';
        }
    }

    pxInput.addEventListener('input', updateFromPx);
    remInput.addEventListener('input', updateFromRem);
    baseSizeInput.addEventListener('input', () => {
        if (pxInput.value) updateFromPx();
        else if (remInput.value) updateFromRem();
    });
});
