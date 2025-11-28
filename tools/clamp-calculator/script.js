document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const minVwInput = document.getElementById('min-vw');
    const maxVwInput = document.getElementById('max-vw');
    const minFsInput = document.getElementById('min-fs');
    const maxFsInput = document.getElementById('max-fs');
    const remBaseInput = document.getElementById('rem-base');

    const cssOutput = document.getElementById('css-output');
    const previewText = document.getElementById('preview-text');
    const copyBtn = document.getElementById('copy-btn');

    function calculateClamp() {
        const minVw = parseFloat(minVwInput.value);
        const maxVw = parseFloat(maxVwInput.value);
        const minFs = parseFloat(minFsInput.value);
        const maxFs = parseFloat(maxFsInput.value);
        const remBase = parseFloat(remBaseInput.value);

        if (minVw >= maxVw || minFs >= maxFs) {
            cssOutput.textContent = '/* Error: Min values must be less than Max values */';
            return;
        }

        // Formula:
        // slope = (maxFontSize - minFontSize) / (maxViewport - minViewport)
        // yAxisIntersection = -minViewport * slope + minFontSize
        // preferredValue = yAxisIntersection[rem] + (slope * 100)[vw]

        // Convert all to pixels for calculation, then back to rem
        const minFsPx = minFs * remBase;
        const maxFsPx = maxFs * remBase;

        const slope = (maxFsPx - minFsPx) / (maxVw - minVw);
        const yAxisIntersection = -minVw * slope + minFsPx;

        const slopeVw = (slope * 100).toFixed(4);
        const yAxisRem = (yAxisIntersection / remBase).toFixed(4);

        const clampFunc = `clamp(${minFs}rem, ${yAxisRem}rem + ${slopeVw}vw, ${maxFs}rem)`;
        const css = `font-size: ${clampFunc};`;

        cssOutput.textContent = css;
        previewText.style.fontSize = clampFunc;
    }

    // Event Listeners
    const inputs = [minVwInput, maxVwInput, minFsInput, maxFsInput, remBaseInput];
    inputs.forEach(input => {
        input.addEventListener('input', calculateClamp);
    });

    // Copy functionality
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.textContent).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });

    // Initialize
    calculateClamp();
});
