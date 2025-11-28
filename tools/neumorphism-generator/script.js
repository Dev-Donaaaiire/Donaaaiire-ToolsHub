document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const colorInput = document.getElementById('color');
    const colorText = document.getElementById('color-text');
    const sizeInput = document.getElementById('size');
    const radiusInput = document.getElementById('radius');
    const distanceInput = document.getElementById('distance');
    const intensityInput = document.getElementById('intensity');
    const blurInput = document.getElementById('blur');
    const shapeBtns = document.querySelectorAll('.shape-btn');

    const sizeVal = document.getElementById('size-val');
    const radiusVal = document.getElementById('radius-val');
    const distanceVal = document.getElementById('distance-val');
    const intensityVal = document.getElementById('intensity-val');
    const blurVal = document.getElementById('blur-val');

    const previewBg = document.getElementById('preview-bg');
    const previewElement = document.getElementById('preview-element');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    let currentShape = 'flat';

    // Helper to convert hex to rgb
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Helper to adjust color brightness
    function adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }

    // Helper to get luminance
    function getLuminance(hex) {
        const rgb = hexToRgb(hex);
        return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    }

    function updateNeumorphism() {
        const color = colorInput.value;
        const size = sizeInput.value;
        const radius = radiusInput.value;
        const distance = parseInt(distanceInput.value);
        const intensity = parseFloat(intensityInput.value);
        const blur = blurInput.value;

        // Update labels
        sizeVal.textContent = `${size}px`;
        radiusVal.textContent = `${radius}px`;
        distanceVal.textContent = `${distance}px`;
        intensityVal.textContent = intensity;
        blurVal.textContent = `${blur}px`;

        // Sync color inputs
        colorText.value = color;
        previewBg.style.backgroundColor = color;
        previewElement.style.backgroundColor = color;
        previewElement.style.width = `${size}px`;
        previewElement.style.height = `${size}px`;
        previewElement.style.borderRadius = `${radius}px`;

        // Calculate colors for shadows
        const isDark = getLuminance(color) < 0.5;
        const lightColor = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff';
        const darkColor = isDark ? 'rgba(0,0,0,0.6)' : '#bebebe'; // simplified approximation

        // More accurate color calculation based on intensity would be complex without a library,
        // so we'll use a simplified approach with opacity/mix.
        // For a real generator, we'd calculate lighter and darker shades of the base color.

        // Let's try to generate lighter/darker hexes for better results if possible, or fallback to rgba
        // Simple logic: 
        // Light shadow: base color + intensity (towards white)
        // Dark shadow: base color - intensity (towards black)

        const rgb = hexToRgb(color);
        const lightShadowColor = isDark
            ? `rgba(255,255,255,${intensity * 0.5})`
            : `rgba(255,255,255,${intensity + 0.4})`;

        const darkShadowColor = isDark
            ? `rgba(0,0,0,${intensity + 0.2})`
            : `rgba(163,177,198,${intensity + 0.4})`; // Using a bluish grey for dark shadow on light bg often looks better

        let boxShadow = '';
        let background = color;

        if (currentShape === 'flat') {
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadowColor}, -${distance}px -${distance}px ${blur}px ${lightShadowColor}`;
        } else if (currentShape === 'pressed') {
            boxShadow = `inset ${distance}px ${distance}px ${blur}px ${darkShadowColor}, inset -${distance}px -${distance}px ${blur}px ${lightShadowColor}`;
        } else if (currentShape === 'concave') {
            background = `linear-gradient(145deg, ${darkShadowColor.replace(')', ',0.1)')}, ${lightShadowColor.replace(')', ',0.1)')})`; // Simplified gradient logic
            // Actually, for concave/convex we usually use gradients on background + flat shadows
            // Let's stick to standard neumorphism gradient approximation
            // Convex: Light top-left, Dark bottom-right
            // Concave: Dark top-left, Light bottom-right
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadowColor}, -${distance}px -${distance}px ${blur}px ${lightShadowColor}`;
            background = `linear-gradient(145deg, ${adjustColor(color, -10)}, ${adjustColor(color, 10)})`;
        } else if (currentShape === 'convex') {
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadowColor}, -${distance}px -${distance}px ${blur}px ${lightShadowColor}`;
            background = `linear-gradient(145deg, ${adjustColor(color, 10)}, ${adjustColor(color, -10)})`;
        }

        previewElement.style.boxShadow = boxShadow;
        if (currentShape === 'concave' || currentShape === 'convex') {
            previewElement.style.background = background;
        } else {
            previewElement.style.background = color;
        }

        // Generate CSS
        let css = `border-radius: ${radius}px;\n`;
        css += `background: ${color};\n`;
        if (currentShape !== 'flat' && currentShape !== 'pressed') {
            css += `background: ${background};\n`;
        }
        css += `box-shadow: ${boxShadow};`;

        cssOutput.textContent = css;
    }

    // Event Listeners
    const inputs = [sizeInput, radiusInput, distanceInput, intensityInput, blurInput];
    inputs.forEach(input => {
        input.addEventListener('input', updateNeumorphism);
    });

    colorInput.addEventListener('input', () => {
        colorText.value = colorInput.value;
        updateNeumorphism();
    });

    colorText.addEventListener('input', () => {
        if (/^#[0-9A-F]{6}$/i.test(colorText.value)) {
            colorInput.value = colorText.value;
            updateNeumorphism();
        }
    });

    shapeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            shapeBtns.forEach(b => {
                b.classList.remove('bg-blue-500', 'text-white');
                b.classList.add('bg-gray-200', 'dark:bg-gray-700');
            });
            btn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
            btn.classList.add('bg-blue-500', 'text-white');
            currentShape = btn.dataset.shape;
            updateNeumorphism();
        });
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
    const flatBtn = document.querySelector('[data-shape="flat"]');
    if (flatBtn) {
        flatBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
        flatBtn.classList.add('bg-blue-500', 'text-white');
    }
    updateNeumorphism();
});
