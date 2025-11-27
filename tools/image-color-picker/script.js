let canvas, ctx;

function loadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            setupCanvas(img);
            extractDominantColors(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function setupCanvas(img) {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    const maxWidth = 800;
    const scale = Math.min(1, maxWidth / img.width);

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    document.getElementById('canvas-container').classList.remove('hidden');

    canvas.onclick = function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        displayColor(pixel[0], pixel[1], pixel[2]);
    };
}

function displayColor(r, g, b) {
    const hex = rgbToHex(r, g, b);
    const rgb = `rgb(${r}, ${g}, ${b})`;

    document.getElementById('color-preview').style.backgroundColor = rgb;
    document.getElementById('hex-value').value = hex;
    document.getElementById('rgb-value').value = rgb;
    document.getElementById('selected-color').classList.remove('hidden');
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function extractDominantColors(img) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    tempCtx.drawImage(img, 0, 0);

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const pixels = imageData.data;

    const colorMap = {};
    for (let i = 0; i < pixels.length; i += 40) {
        const r = Math.floor(pixels[i] / 10) * 10;
        const g = Math.floor(pixels[i + 1] / 10) * 10;
        const b = Math.floor(pixels[i + 2] / 10) * 10;
        const key = `${r},${g},${b}`;
        colorMap[key] = (colorMap[key] || 0) + 1;
    }

    const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([color]) => {
            const [r, g, b] = color.split(',').map(Number);
            return { r, g, b, hex: rgbToHex(r, g, b) };
        });

    displayPalette(sortedColors);
}

function displayPalette(colors) {
    const palette = document.getElementById('color-palette');
    palette.innerHTML = '';

    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'aspect-square rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform';
        div.style.backgroundColor = color.hex;
        div.title = color.hex;
        div.onclick = () => displayColor(color.r, color.g, color.b);
        palette.appendChild(div);
    });

    document.getElementById('palette-container').classList.remove('hidden');
}

function copyColor(type) {
    const value = document.getElementById(`${type}-value`).value;
    window.copyToClipboard(value);
}
