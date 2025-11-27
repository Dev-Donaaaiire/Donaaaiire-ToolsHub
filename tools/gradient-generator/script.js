let colorStops = [
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
];

function init() {
    renderColorStops();
    updateGradient();
}

function renderColorStops() {
    const container = document.getElementById('color-stops');
    container.innerHTML = '';

    colorStops.forEach((stop, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center gap-3';
        div.innerHTML = `
            <input type="color" value="${stop.color}" onchange="updateColorStop(${index}, this.value)" 
                class="w-12 h-10 rounded cursor-pointer border-2 border-gray-300 dark:border-gray-600">
            <input type="range" min="0" max="100" value="${stop.position}" oninput="updatePosition(${index}, this.value)"
                class="flex-1">
            <span class="text-sm w-12">${stop.position}%</span>
            ${colorStops.length > 2 ? `<button onclick="removeColorStop(${index})" class="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors">×</button>` : ''}
        `;
        container.appendChild(div);
    });
}

function updateColorStop(index, color) {
    colorStops[index].color = color;
    updateGradient();
}

function updatePosition(index, position) {
    colorStops[index].position = parseInt(position);
    renderColorStops();
    updateGradient();
}

function addColorStop() {
    const newPosition = colorStops.length > 0 ? 50 : 0;
    colorStops.push({ color: '#ff0000', position: newPosition });
    colorStops.sort((a, b) => a.position - b.position);
    renderColorStops();
    updateGradient();
}

function removeColorStop(index) {
    if (colorStops.length > 2) {
        colorStops.splice(index, 1);
        renderColorStops();
        updateGradient();
    }
}

function updateGradient() {
    const direction = document.getElementById('direction').value;
    const preview = document.getElementById('gradient-preview');
    const output = document.getElementById('css-output');

    let gradientType = 'linear-gradient';
    let gradientDirection = direction;

    if (direction === 'circle') {
        gradientType = 'radial-gradient';
        gradientDirection = 'circle';
    } else if (direction === 'to right') {
        const angle = document.getElementById('angle').value;
        gradientDirection = `${angle}deg`;
        document.getElementById('angle-value').textContent = angle;
    }

    const stops = colorStops
        .sort((a, b) => a.position - b.position)
        .map(stop => `${stop.color} ${stop.position}%`)
        .join(', ');

    const gradient = `${gradientType}(${gradientDirection}, ${stops})`;

    preview.style.background = gradient;
    output.value = `background: ${gradient};`;
}

function copyCss() {
    const css = document.getElementById('css-output').value;
    window.copyToClipboard(css);

    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 1500);
}

init();
