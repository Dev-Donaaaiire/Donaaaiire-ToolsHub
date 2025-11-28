document.addEventListener('DOMContentLoaded', () => {
    const shapeGrid = document.getElementById('shape-grid');
    const previewBox = document.getElementById('preview-box');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    const shapes = [
        { name: 'Triangle', value: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
        { name: 'Circle', value: 'circle(50% at 50% 50%)' },
        { name: 'Ellipse', value: 'ellipse(25% 40% at 50% 50%)' },
        { name: 'Inset', value: 'inset(5% 20% 15% 10%)' },
        { name: 'Trapezoid', value: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' },
        { name: 'Parallelogram', value: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' },
        { name: 'Rhombus', value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
        { name: 'Pentagon', value: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
        { name: 'Hexagon', value: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
        { name: 'Octagon', value: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' },
        { name: 'Star', value: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
        { name: 'Message', value: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' },
        { name: 'Close', value: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)' },
        { name: 'Arrow Left', value: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)' },
        { name: 'Arrow Right', value: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }
    ];

    // Generate buttons
    shapes.forEach(shape => {
        const btn = document.createElement('button');
        btn.className = 'aspect-square bg-gray-200 dark:bg-gray-700 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-600 rounded-lg p-2 transition-all flex flex-col items-center justify-center gap-2 group';

        // Mini preview
        const miniPreview = document.createElement('div');
        miniPreview.className = 'w-8 h-8 bg-gray-400 dark:bg-gray-500 group-hover:bg-white transition-colors';
        miniPreview.style.clipPath = shape.value;

        const label = document.createElement('span');
        label.className = 'text-xs font-medium text-center';
        label.textContent = shape.name;

        btn.appendChild(miniPreview);
        btn.appendChild(label);

        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('#shape-grid button').forEach(b => {
                b.classList.remove('ring-2', 'ring-pink-500', 'bg-pink-100', 'dark:bg-pink-900/30');
            });
            btn.classList.add('ring-2', 'ring-pink-500', 'bg-pink-100', 'dark:bg-pink-900/30');

            // Apply shape
            previewBox.style.clipPath = shape.value;
            cssOutput.textContent = `clip-path: ${shape.value};`;
        });

        shapeGrid.appendChild(btn);
    });

    // Select first by default
    if (shapeGrid.children.length > 0) {
        shapeGrid.children[0].click();
    }

    // Copy functionality
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.textContent).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });
});
