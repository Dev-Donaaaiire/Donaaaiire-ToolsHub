document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const colsInput = document.getElementById('cols');
    const rowsInput = document.getElementById('rows');
    const gapInput = document.getElementById('gap');

    const colsVal = document.getElementById('cols-val');
    const rowsVal = document.getElementById('rows-val');
    const gapVal = document.getElementById('gap-val');

    const gridContainer = document.getElementById('grid-container');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    function updateGrid() {
        const cols = colsInput.value;
        const rows = rowsInput.value;
        const gap = gapInput.value;

        // Update labels
        colsVal.textContent = cols;
        rowsVal.textContent = rows;
        gapVal.textContent = `${gap}px`;

        // Apply styles
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gridContainer.style.gap = `${gap}px`;

        // Generate grid items
        gridContainer.innerHTML = '';
        const totalItems = cols * rows;
        for (let i = 1; i <= totalItems; i++) {
            const item = document.createElement('div');
            item.className = 'grid-item bg-purple-500/20 border border-purple-500 rounded-lg flex items-center justify-center text-purple-500 font-bold text-lg shadow-sm hover:bg-purple-500 hover:text-white transition-colors cursor-default';
            item.textContent = i;
            gridContainer.appendChild(item);
        }

        // Generate CSS
        const css = `.container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}`;
        cssOutput.textContent = css;
    }

    // Event Listeners
    const inputs = [colsInput, rowsInput, gapInput];
    inputs.forEach(input => {
        input.addEventListener('input', updateGrid);
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
    updateGrid();
});
