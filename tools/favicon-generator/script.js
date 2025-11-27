let originalImage = null;

function loadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            originalImage = img;
            generatePreviews();
            document.getElementById('preview-section').classList.remove('hidden');
            document.getElementById('download-section').classList.remove('hidden');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function generatePreviews() {
    const sizes = [16, 32, 48, 64];

    sizes.forEach(size => {
        const canvas = document.getElementById(`canvas-${size}`);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(originalImage, 0, 0, size, size);
    });
}

function downloadFavicon() {
    if (!originalImage) return;

    const canvas = document.getElementById('canvas-32');
    canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'favicon-32x32.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}
