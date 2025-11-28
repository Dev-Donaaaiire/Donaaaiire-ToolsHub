document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const fullControlCheck = document.getElementById('full-control');
    const extraControls = document.getElementById('extra-controls');

    const tl = document.getElementById('tl');
    const tr = document.getElementById('tr');
    const br = document.getElementById('br');
    const bl = document.getElementById('bl');

    const tlY = document.getElementById('tl-y');
    const trY = document.getElementById('tr-y');
    const brY = document.getElementById('br-y');
    const blY = document.getElementById('bl-y');

    const previewBox = document.getElementById('preview-box');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    function updateRadius() {
        const isFull = fullControlCheck.checked;

        // X Values
        const v1 = tl.value;
        const v2 = tr.value;
        const v3 = br.value;
        const v4 = bl.value;

        // Update labels
        document.getElementById('tl-val').textContent = `${v1}%`;
        document.getElementById('tr-val').textContent = `${v2}%`;
        document.getElementById('br-val').textContent = `${v3}%`;
        document.getElementById('bl-val').textContent = `${v4}%`;

        let radiusString = '';

        if (isFull) {
            // Y Values
            const v1y = tlY.value;
            const v2y = trY.value;
            const v3y = brY.value;
            const v4y = blY.value;

            // Update Y labels
            document.getElementById('tl-y-val').textContent = `${v1y}%`;
            document.getElementById('tr-y-val').textContent = `${v2y}%`;
            document.getElementById('br-y-val').textContent = `${v3y}%`;
            document.getElementById('bl-y-val').textContent = `${v4y}%`;

            radiusString = `${v1}% ${v2}% ${v3}% ${v4}% / ${v1y}% ${v2y}% ${v3y}% ${v4y}%`;
        } else {
            // Simple mode: just 4 values (or even simpler, but let's stick to 4 corners)
            // Actually, standard border-radius shorthand is: tl tr br bl
            radiusString = `${v1}% ${v2}% ${v3}% ${v4}%`;
        }

        // Apply
        previewBox.style.borderRadius = radiusString;
        cssOutput.textContent = `border-radius: ${radiusString};`;
    }

    // Toggle full control
    fullControlCheck.addEventListener('change', () => {
        if (fullControlCheck.checked) {
            extraControls.classList.remove('hidden');
            // Sync Y values with X values initially for smoothness
            tlY.value = tl.value;
            trY.value = tr.value;
            brY.value = br.value;
            blY.value = bl.value;
        } else {
            extraControls.classList.add('hidden');
        }
        updateRadius();
    });

    // Event Listeners
    const inputs = [tl, tr, br, bl, tlY, trY, brY, blY];
    inputs.forEach(input => {
        input.addEventListener('input', updateRadius);
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
    updateRadius();
});
