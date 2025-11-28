document.addEventListener('DOMContentLoaded', () => {
    const cursorGrid = document.getElementById('cursor-grid');
    const searchInput = document.getElementById('search');
    const toast = document.getElementById('toast');

    const cursors = [
        'alias',
        'all-scroll',
        'auto',
        'cell',
        'col-resize',
        'context-menu',
        'copy',
        'crosshair',
        'default',
        'e-resize',
        'ew-resize',
        'grab',
        'grabbing',
        'help',
        'move',
        'n-resize',
        'ne-resize',
        'nesw-resize',
        'no-drop',
        'none',
        'not-allowed',
        'ns-resize',
        'nw-resize',
        'nwse-resize',
        'pointer',
        'progress',
        'row-resize',
        's-resize',
        'se-resize',
        'sw-resize',
        'text',
        'vertical-text',
        'w-resize',
        'wait',
        'zoom-in',
        'zoom-out'
    ];

    function showToast() {
        toast.classList.remove('opacity-0');
        setTimeout(() => {
            toast.classList.add('opacity-0');
        }, 2000);
    }

    function renderCursors(filter = '') {
        cursorGrid.innerHTML = '';
        const filteredCursors = cursors.filter(c => c.includes(filter.toLowerCase()));

        filteredCursors.forEach(cursor => {
            const btn = document.createElement('button');
            btn.className = 'bg-gray-100 dark:bg-gray-800 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 p-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 group';
            btn.style.cursor = cursor;

            const label = document.createElement('span');
            label.className = 'font-mono text-sm font-medium';
            label.textContent = cursor;

            btn.appendChild(label);

            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(`cursor: ${cursor};`).then(() => {
                    showToast();
                });
            });

            cursorGrid.appendChild(btn);
        });
    }

    searchInput.addEventListener('input', (e) => {
        renderCursors(e.target.value);
    });

    // Initialize
    renderCursors();
});
