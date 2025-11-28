document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const dirBtns = document.querySelectorAll('.dir-btn');
    const colorInput = document.getElementById('color');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');

    const widthVal = document.getElementById('width-val');
    const heightVal = document.getElementById('height-val');

    const previewTriangle = document.getElementById('preview-triangle');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    let currentDir = 'top';

    function updateTriangle() {
        const color = colorInput.value;
        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);

        // Update labels
        widthVal.textContent = `${width}px`;
        heightVal.textContent = `${height}px`;

        let css = `width: 0; \nheight: 0; \nborder-style: solid; \n`;
        let borderStyle = '';

        // Logic for borders based on direction
        // Top: border-left/right transparent, border-bottom colored
        // Right: border-top/bottom transparent, border-left colored
        // etc.

        const w2 = width / 2;
        const h2 = height / 2;

        switch (currentDir) {
            case 'top':
                css += `border-width: 0 ${w2}px ${height}px ${w2}px; \n`;
                css += `border-color: transparent transparent ${color} transparent;`;
                break;
            case 'bottom':
                css += `border-width: ${height}px ${w2}px 0 ${w2}px; \n`;
                css += `border-color: ${color} transparent transparent transparent;`;
                break;
            case 'left':
                css += `border-width: ${h2}px ${width}px ${h2}px 0; \n`;
                css += `border-color: transparent ${color} transparent transparent;`;
                break;
            case 'right':
                css += `border-width: ${h2}px 0 ${h2}px ${width}px; \n`;
                css += `border-color: transparent transparent transparent ${color};`;
                break;
            case 'top-left':
                css += `border-width: ${height}px ${width}px 0 0; \n`;
                css += `border-color: ${color} transparent transparent transparent;`;
                break;
            case 'top-right':
                css += `border-width: 0 ${width}px ${height}px 0; \n`;
                css += `border-color: transparent ${color} transparent transparent;`;
                break;
            case 'bottom-left':
                css += `border-width: ${height}px 0 0 ${width}px; \n`;
                css += `border-color: transparent transparent transparent ${color};`;
                break;
            case 'bottom-right':
                css += `border-width: 0 0 ${height}px ${width}px; \n`;
                css += `border-color: transparent transparent ${color} transparent;`;
                break;
        }

        // Apply to preview
        previewTriangle.style.cssText = css;
        cssOutput.textContent = css;
    }

    // Event Listeners
    dirBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dirBtns.forEach(b => {
                b.classList.remove('bg-orange-500', 'text-white');
                b.classList.add('bg-gray-200', 'dark:bg-gray-700');
            });
            btn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
            btn.classList.add('bg-orange-500', 'text-white');
            currentDir = btn.dataset.dir;
            updateTriangle();
        });
    });

    const inputs = [colorInput, widthInput, heightInput];
    inputs.forEach(input => {
        input.addEventListener('input', updateTriangle);
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
    const defaultBtn = document.querySelector('[data-dir="top"]');
    if (defaultBtn) {
        defaultBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
        defaultBtn.classList.add('bg-orange-500', 'text-white');
    }
    updateTriangle();
});
