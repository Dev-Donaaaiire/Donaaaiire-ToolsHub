document.addEventListener('DOMContentLoaded', () => {
    const svgInput = document.getElementById('svg-input');
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('preview-img');
    const previewPlaceholder = document.getElementById('preview-placeholder');
    const outputB64 = document.getElementById('output-b64');
    const outputUrl = document.getElementById('output-url');
    const copyB64Btn = document.getElementById('copy-b64-btn');
    const copyUrlBtn = document.getElementById('copy-url-btn');

    function processSVG() {
        let svg = svgInput.value.trim();

        if (!svg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
            previewPlaceholder.style.display = 'block';
            outputB64.value = '';
            outputUrl.value = '';
            return;
        }

        // Basic validation
        if (!svg.includes('<svg')) {
            // Maybe it's not full SVG code, but we'll try processing anyway or show error
            // For now, assume user pastes valid SVG
        }

        // Base64
        try {
            const b64 = btoa(unescape(encodeURIComponent(svg)));
            const dataUriB64 = `data:image/svg+xml;base64,${b64}`;
            outputB64.value = dataUriB64;

            // Preview
            previewImg.src = dataUriB64;
            previewImg.style.display = 'block';
            previewPlaceholder.style.display = 'none';

            // URL Encoded (Optimized for CSS)
            // Replace quotes with single quotes, escape special chars
            let encoded = svg
                .replace(/"/g, "'")
                .replace(/%/g, '%25')
                .replace(/#/g, '%23')
                .replace(/{/g, '%7B')
                .replace(/}/g, '%7D')
                .replace(/</g, '%3C')
                .replace(/>/g, '%3E');

            // Remove newlines and extra spaces
            encoded = encoded.replace(/\s+/g, ' ');

            const dataUriUrl = `data:image/svg+xml,${encoded}`;
            outputUrl.value = dataUriUrl;

        } catch (e) {
            console.error(e);
            outputB64.value = 'Error procesando SVG';
        }
    }

    svgInput.addEventListener('input', processSVG);

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                svgInput.value = e.target.result;
                processSVG();
            };
            reader.readAsText(file);
        }
    });

    function copyToClipboard(element, btn) {
        navigator.clipboard.writeText(element.value).then(() => {
            const originalText = btn.textContent;
            btn.textContent = '¡Copiado!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    }

    copyB64Btn.addEventListener('click', () => copyToClipboard(outputB64, copyB64Btn));
    copyUrlBtn.addEventListener('click', () => copyToClipboard(outputUrl, copyUrlBtn));
});
