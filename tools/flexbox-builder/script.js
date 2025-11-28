document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const flexDirection = document.getElementById('flex-direction');
    const flexWrap = document.getElementById('flex-wrap');
    const justifyContent = document.getElementById('justify-content');
    const alignItems = document.getElementById('align-items');
    const alignContent = document.getElementById('align-content');
    const gap = document.getElementById('gap');
    const gapVal = document.getElementById('gap-val');

    const addItemBtn = document.getElementById('add-item');
    const removeItemBtn = document.getElementById('remove-item');

    const flexContainer = document.getElementById('flex-container');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    let itemCount = 4;

    function updateFlex() {
        const dir = flexDirection.value;
        const wrap = flexWrap.value;
        const justify = justifyContent.value;
        const align = alignItems.value;
        const content = alignContent.value;
        const gapValue = gap.value;

        // Update gap label
        gapVal.textContent = `${gapValue}px`;

        // Apply styles
        flexContainer.style.flexDirection = dir;
        flexContainer.style.flexWrap = wrap;
        flexContainer.style.justifyContent = justify;
        flexContainer.style.alignItems = align;
        flexContainer.style.alignContent = content;
        flexContainer.style.gap = `${gapValue}px`;

        // Generate CSS
        const css = `.container {
  display: flex;
  flex-direction: ${dir};
  flex-wrap: ${wrap};
  justify-content: ${justify};
  align-items: ${align};
  align-content: ${content};
  gap: ${gapValue}px;
}`;
        cssOutput.textContent = css;
    }

    function addItem() {
        if (itemCount >= 20) return;
        itemCount++;
        const item = document.createElement('div');
        item.className = 'flex-item w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg';
        item.textContent = itemCount;
        // Randomize color slightly for fun
        const hues = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-red-500'];
        const randomHue = hues[Math.floor(Math.random() * hues.length)];
        item.classList.remove('bg-blue-500');
        item.classList.add(randomHue);

        flexContainer.appendChild(item);
    }

    function removeItem() {
        if (itemCount <= 1) return;
        flexContainer.removeChild(flexContainer.lastElementChild);
        itemCount--;
    }

    // Event Listeners
    const inputs = [flexDirection, flexWrap, justifyContent, alignItems, alignContent, gap];
    inputs.forEach(input => {
        input.addEventListener('input', updateFlex);
    });

    addItemBtn.addEventListener('click', addItem);
    removeItemBtn.addEventListener('click', removeItem);

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
    updateFlex();
});
