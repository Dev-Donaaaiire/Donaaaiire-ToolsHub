function generateSlug() {
    const input = document.getElementById('input-text').value;
    const lowercase = document.getElementById('lowercase').checked;
    const removeAccents = document.getElementById('remove-accents').checked;
    const separator = document.getElementById('separator').value;

    if (!input) {
        document.getElementById('output-slug').value = '';
        document.getElementById('slug-preview').textContent = 'tu-slug-aqui';
        return;
    }

    let slug = input;

    // Remove accents if option is checked
    if (removeAccents) {
        slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Convert to lowercase if option is checked
    if (lowercase) {
        slug = slug.toLowerCase();
    }

    // Replace spaces and special characters with separator
    slug = slug
        .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
        .trim()
        .replace(/[\s_-]+/g, separator) // Replace spaces, underscores, hyphens with chosen separator
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), ''); // Remove leading/trailing separators

    document.getElementById('output-slug').value = slug;
    document.getElementById('slug-preview').textContent = slug || 'tu-slug-aqui';
}

function copySlug() {
    const slug = document.getElementById('output-slug').value;
    if (!slug) return;

    window.copyToClipboard(slug);

    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 1500);
}
