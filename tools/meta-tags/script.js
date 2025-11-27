function generateTags() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;
    const image = document.getElementById('image').value;
    const keywords = document.getElementById('keywords').value;

    if (!title || !description) {
        alert('Por favor, completa al menos el título y la descripción');
        return;
    }

    const tags = `<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${description}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
<meta name="author" content="">
<title>${title}</title>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
${url ? `<meta property="og:url" content="${url}">` : ''}
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${image ? `<meta property="og:image" content="${image}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
${url ? `<meta property="twitter:url" content="${url}">` : ''}
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
${image ? `<meta property="twitter:image" content="${image}">` : ''}`;

    document.getElementById('meta-tags').value = tags;
    document.getElementById('output').classList.remove('hidden');
}

function copyTags() {
    const tags = document.getElementById('meta-tags').value;
    window.copyToClipboard(tags);

    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 1500);
}
