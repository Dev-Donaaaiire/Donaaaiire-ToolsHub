document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const inputs = {
        blur: document.getElementById('blur'),
        brightness: document.getElementById('brightness'),
        contrast: document.getElementById('contrast'),
        grayscale: document.getElementById('grayscale'),
        hueRotate: document.getElementById('hue-rotate'),
        invert: document.getElementById('invert'),
        opacity: document.getElementById('opacity'),
        saturate: document.getElementById('saturate'),
        sepia: document.getElementById('sepia')
    };

    const labels = {
        blur: document.getElementById('blur-val'),
        brightness: document.getElementById('brightness-val'),
        contrast: document.getElementById('contrast-val'),
        grayscale: document.getElementById('grayscale-val'),
        hueRotate: document.getElementById('hue-rotate-val'),
        invert: document.getElementById('invert-val'),
        opacity: document.getElementById('opacity-val'),
        saturate: document.getElementById('saturate-val'),
        sepia: document.getElementById('sepia-val')
    };

    const previewImage = document.getElementById('preview-image');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');
    const resetBtn = document.getElementById('reset-btn');

    const defaults = {
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0
    };

    function updateFilters() {
        const values = {
            blur: inputs.blur.value,
            brightness: inputs.brightness.value,
            contrast: inputs.contrast.value,
            grayscale: inputs.grayscale.value,
            hueRotate: inputs.hueRotate.value,
            invert: inputs.invert.value,
            opacity: inputs.opacity.value,
            saturate: inputs.saturate.value,
            sepia: inputs.sepia.value
        };

        // Update labels
        labels.blur.textContent = `${values.blur}px`;
        labels.brightness.textContent = `${values.brightness}%`;
        labels.contrast.textContent = `${values.contrast}%`;
        labels.grayscale.textContent = `${values.grayscale}%`;
        labels.hueRotate.textContent = `${values.hueRotate}deg`;
        labels.invert.textContent = `${values.invert}%`;
        labels.opacity.textContent = `${values.opacity}%`;
        labels.saturate.textContent = `${values.saturate}%`;
        labels.sepia.textContent = `${values.sepia}%`;

        // Generate CSS string
        const filters = [];
        if (values.blur > 0) filters.push(`blur(${values.blur}px)`);
        if (values.brightness != 100) filters.push(`brightness(${values.brightness}%)`);
        if (values.contrast != 100) filters.push(`contrast(${values.contrast}%)`);
        if (values.grayscale > 0) filters.push(`grayscale(${values.grayscale}%)`);
        if (values.hueRotate > 0) filters.push(`hue-rotate(${values.hueRotate}deg)`);
        if (values.invert > 0) filters.push(`invert(${values.invert}%)`);
        if (values.opacity < 100) filters.push(`opacity(${values.opacity}%)`);
        if (values.saturate != 100) filters.push(`saturate(${values.saturate}%)`);
        if (values.sepia > 0) filters.push(`sepia(${values.sepia}%)`);

        const filterString = filters.length > 0 ? filters.join(' ') : 'none';
        const css = `filter: ${filterString};`;

        // Apply
        previewImage.style.filter = filterString;
        cssOutput.textContent = css;
    }

    function resetFilters() {
        Object.keys(defaults).forEach(key => {
            inputs[key].value = defaults[key];
        });
        updateFilters();
    }

    // Event Listeners
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', updateFilters);
    });

    resetBtn.addEventListener('click', resetFilters);

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
    updateFilters();
});
