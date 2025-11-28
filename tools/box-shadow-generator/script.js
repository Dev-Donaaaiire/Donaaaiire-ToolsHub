document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const xOffset = document.getElementById('x-offset');
    const yOffset = document.getElementById('y-offset');
    const blurRadius = document.getElementById('blur-radius');
    const spreadRadius = document.getElementById('spread-radius');
    const shadowColor = document.getElementById('shadow-color');
    const shadowOpacity = document.getElementById('shadow-opacity');
    const insetCheck = document.getElementById('inset-check');

    const xVal = document.getElementById('x-val');
    const yVal = document.getElementById('y-val');
    const blurVal = document.getElementById('blur-val');
    const spreadVal = document.getElementById('spread-val');

    const previewBox = document.getElementById('preview-box');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    // Helper to convert hex to rgb
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function updateShadow() {
        const x = xOffset.value;
        const y = yOffset.value;
        const blur = blurRadius.value;
        const spread = spreadRadius.value;
        const colorHex = shadowColor.value;
        const opacity = shadowOpacity.value;
        const inset = insetCheck.checked ? 'inset ' : '';

        // Update value labels
        xVal.textContent = `${x}px`;
        yVal.textContent = `${y}px`;
        blurVal.textContent = `${blur}px`;
        spreadVal.textContent = `${spread}px`;

        // Calculate color with opacity
        const rgb = hexToRgb(colorHex);
        const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

        // Construct CSS string
        const boxShadowValue = `${inset}${x}px ${y}px ${blur}px ${spread}px ${rgbaColor}`;
        const cssString = `box-shadow: ${boxShadowValue};`;

        // Apply to preview
        previewBox.style.boxShadow = boxShadowValue;

        // Update code block
        cssOutput.textContent = cssString;
    }

    // Event Listeners
    const inputs = [xOffset, yOffset, blurRadius, spreadRadius, shadowColor, shadowOpacity, insetCheck];
    inputs.forEach(input => {
        input.addEventListener('input', updateShadow);
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
    updateShadow();
});
