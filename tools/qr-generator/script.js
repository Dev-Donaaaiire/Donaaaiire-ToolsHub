const qrText = document.getElementById('qr-text');
const qrColorDark = document.getElementById('qr-color-dark');
const qrColorLight = document.getElementById('qr-color-light');
const qrContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

let qrcode = null;

function generateQR() {
    const text = qrText.value || ' '; // QRCode.js crashes with empty string
    const colorDark = qrColorDark.value;
    const colorLight = qrColorLight.value;

    qrContainer.innerHTML = ''; // Clear previous

    qrcode = new QRCode(qrContainer, {
        text: text,
        width: 256,
        height: 256,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQR() {
    const img = qrContainer.querySelector('img');
    if (img && img.src) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = img.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Event Listeners
qrText.addEventListener('input', generateQR);
qrColorDark.addEventListener('input', generateQR);
qrColorLight.addEventListener('input', generateQR);
downloadBtn.addEventListener('click', downloadQR);

// Init
// Wait a bit for library to load if needed, though script tag is blocking
setTimeout(generateQR, 100);
