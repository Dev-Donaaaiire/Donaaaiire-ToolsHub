let currentTab = 'css';

function switchTab(tab) {
    currentTab = tab;
    document.getElementById('css-tab').className = tab === 'css' ? 'px-4 py-2 bg-primary text-white rounded-lg' : 'px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg';
    document.getElementById('js-tab').className = tab === 'js' ? 'px-4 py-2 bg-primary text-white rounded-lg' : 'px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg';
    document.getElementById('input-code').value = '';
    document.getElementById('output-section').classList.add('hidden');
}

function minify() {
    const input = document.getElementById('input-code').value;

    if (!input) {
        alert('Por favor, ingresa código para minificar');
        return;
    }

    let minified;

    if (currentTab === 'css') {
        minified = minifyCSS(input);
    } else {
        minified = minifyJS(input);
    }

    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

    document.getElementById('output-code').value = minified;
    document.getElementById('original-size').textContent = originalSize + ' bytes';
    document.getElementById('reduction').textContent = reduction + '%';
    document.getElementById('output-section').classList.remove('hidden');
}

function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, '{') // Remove spaces around {
        .replace(/\s*}\s*/g, '}') // Remove spaces around }
        .replace(/\s*:\s*/g, ':') // Remove spaces around :
        .replace(/\s*;\s*/g, ';') // Remove spaces around ;
        .replace(/;\}/g, '}') // Remove last semicolon
        .trim();
}

function minifyJS(js) {
    return js
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around operators
        .trim();
}

function copyMinified() {
    const code = document.getElementById('output-code').value;
    window.copyToClipboard(code);

    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 1500);
}
