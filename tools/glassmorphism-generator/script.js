document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const blurInput = document.getElementById('blur');
    const transparencyInput = document.getElementById('transparency');
    const saturationInput = document.getElementById('saturation');
    const colorInput = document.getElementById('color');
    const outlineCheck = document.getElementById('outline-check');

    const blurVal = document.getElementById('blur-val');
    const transparencyVal = document.getElementById('transparency-val');
    const saturationVal = document.getElementById('saturation-val');

    const previewCard = document.getElementById('preview-card');
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

    function updateGlass() {
        const blur = blurInput.value;
        const transparency = transparencyInput.value;
        const saturation = saturationInput.value;
        const colorHex = colorInput.value;
        const hasOutline = outlineCheck.checked;

        // Update labels
        blurVal.textContent = `${blur}px`;
        transparencyVal.textContent = transparency;
        saturationVal.textContent = `${saturation}%`;

        // Calculate RGBA
        const rgb = hexToRgb(colorHex);
        const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`;
        const borderRgba = `rgba(255, 255, 255, ${Math.min(parseFloat(transparency) + 0.1, 1).toFixed(2)})`;

        // Construct CSS
        let css = `background: ${rgbaColor};\n`;
        css += `backdrop-filter: blur(${blur}px) saturate(${saturation}%);\n`;
        css += `-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);`;

        if (hasOutline) {
            css += `\nborder: 1px solid ${borderRgba};`;
        }

        // Apply to preview
        previewCard.style.background = rgbaColor;
        previewCard.style.backdropFilter = `blur(${blur}px) saturate(${saturation}%)`;
        previewCard.style.webkitBackdropFilter = `blur(${blur}px) saturate(${saturation}%)`;

        if (hasOutline) {
            previewCard.style.border = `1px solid ${borderRgba}`;
        } else {
            previewCard.style.border = 'none';
        }

        // Update code block
        cssOutput.textContent = css;
    }

    // Event Listeners
    const inputs = [blurInput, transparencyInput, saturationInput, colorInput, outlineCheck];
    inputs.forEach(input => {
        input.addEventListener('input', updateGlass);
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
    updateGlass();
});
