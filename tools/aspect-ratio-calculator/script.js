document.addEventListener('DOMContentLoaded', () => {
    // Mode 1: Find Ratio
    const w1 = document.getElementById('w1');
    const h1 = document.getElementById('h1');
    const ratioResult = document.getElementById('ratio-result');

    // Mode 2: Calculate Dimension
    const rW = document.getElementById('r-w');
    const rH = document.getElementById('r-h');
    const w2 = document.getElementById('w2');
    const h2 = document.getElementById('h2');

    // Preview
    const previewBox = document.getElementById('preview-box');
    const previewText = document.getElementById('preview-text');

    // GCD function
    function gcd(a, b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    function calculateRatio() {
        const width = parseInt(w1.value);
        const height = parseInt(h1.value);

        if (width && height) {
            const divisor = gcd(width, height);
            const rw = width / divisor;
            const rh = height / divisor;
            ratioResult.textContent = `${rw}:${rh}`;

            // Update preview based on this calculation
            updatePreview(rw, rh);
        } else {
            ratioResult.textContent = '-:-';
        }
    }

    function calculateDimension(source) {
        const rw = parseFloat(rW.value);
        const rh = parseFloat(rH.value);

        if (!rw || !rh) return;

        if (source === 'w' && w2.value) {
            const width = parseFloat(w2.value);
            const height = (width / rw) * rh;
            h2.value = Math.round(height * 100) / 100; // Round to 2 decimals
        } else if (source === 'h' && h2.value) {
            const height = parseFloat(h2.value);
            const width = (height / rh) * rw;
            w2.value = Math.round(width * 100) / 100;
        }

        // Update preview based on ratio inputs
        updatePreview(rw, rh);
    }

    function updatePreview(rw, rh) {
        // Normalize size to fit in 300px height/width container
        const maxSize = 250;
        let w, h;

        if (rw > rh) {
            w = maxSize;
            h = (maxSize / rw) * rh;
        } else {
            h = maxSize;
            w = (maxSize / rh) * rw;
        }

        previewBox.style.width = `${w}px`;
        previewBox.style.height = `${h}px`;
        previewText.textContent = `${rw}:${rh}`;
    }

    // Event Listeners
    w1.addEventListener('input', calculateRatio);
    h1.addEventListener('input', calculateRatio);

    rW.addEventListener('input', () => calculateDimension('w'));
    rH.addEventListener('input', () => calculateDimension('w'));
    w2.addEventListener('input', () => calculateDimension('w'));
    h2.addEventListener('input', () => calculateDimension('h'));

    // Initialize
    updatePreview(16, 9);
});
