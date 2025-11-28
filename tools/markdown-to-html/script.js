document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const htmlPreview = document.getElementById('html-preview');
    const copyBtn = document.getElementById('copy-html-btn');

    // Simple Markdown Parser
    function parseMarkdown(markdown) {
        let html = markdown;

        // Code Blocks (pre + code) - Handle this first to avoid conflicts
        // Note: This is a very basic implementation. Nested code blocks might fail.
        html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

        // Inline Code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Headers
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
        html = html.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
        html = html.replace(/^###### (.*$)/gm, '<h6>$1</h6>');

        // Bold
        html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
        html = html.replace(/__(.*)__/gim, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
        html = html.replace(/_(.*)_/gim, '<em>$1</em>');

        // Blockquotes
        html = html.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>');

        // Unordered Lists
        // This is tricky with regex. We'll do a simple pass for single-level lists.
        html = html.replace(/^\s*[\-\*] (.*$)/gm, '<ul><li>$1</li></ul>');
        // Fix adjacent lists (<ul><li>...</li></ul><ul><li>...</li></ul> -> <ul><li>...</li><li>...</li></ul>)
        html = html.replace(/<\/ul>\s*<ul>/g, '');

        // Ordered Lists
        html = html.replace(/^\s*\d+\. (.*$)/gm, '<ol><li>$1</li></ol>');
        html = html.replace(/<\/ol>\s*<ol>/g, '');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Images
        html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />');

        // Horizontal Rules
        html = html.replace(/^---$/gm, '<hr />');

        // Paragraphs
        // Wrap lines that aren't headers, lists, blockquotes, or pre tags in <p>
        // This is a simplified approach.
        html = html.replace(/^([^<].*)/gm, '<p>$1</p>');

        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');

        // Line breaks
        html = html.replace(/\n/g, '<br />');

        // Clean up br tags inside block elements
        html = html.replace(/<\/h1><br \/>/g, '</h1>');
        html = html.replace(/<\/h2><br \/>/g, '</h2>');
        html = html.replace(/<\/h3><br \/>/g, '</h3>');
        html = html.replace(/<\/ul><br \/>/g, '</ul>');
        html = html.replace(/<\/ol><br \/>/g, '</ol>');
        html = html.replace(/<\/pre><br \/>/g, '</pre>');
        html = html.replace(/<\/blockquote><br \/>/g, '</blockquote>');
        html = html.replace(/<\/p><br \/>/g, '</p>');

        return html;
    }

    function updatePreview() {
        const markdown = markdownInput.value;
        const html = parseMarkdown(markdown);
        htmlPreview.innerHTML = html;
    }

    markdownInput.addEventListener('input', updatePreview);

    // Copy functionality
    copyBtn.addEventListener('click', () => {
        const html = parseMarkdown(markdownInput.value);
        navigator.clipboard.writeText(html).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '¡Copiado!';
            copyBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            copyBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                copyBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }, 2000);
        });
    });

    // Initial text
    markdownInput.value = `# Bienvenido al Conversor Markdown

Escribe tu código **Markdown** aquí y mira el resultado a la derecha.

## Características soportadas:

- Encabezados (H1-H6)
- **Negrita** y *Cursiva*
- [Enlaces](https://example.com)
- Listas desordenadas
- \`Código en línea\`

> Citas en bloque

\`\`\`
Bloques de código
\`\`\`
`;
    updatePreview();
});
