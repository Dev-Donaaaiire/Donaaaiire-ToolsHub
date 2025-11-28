document.addEventListener('DOMContentLoaded', () => {
    const initialState = document.getElementById('initial-state');
    const resultState = document.getElementById('result-state');

    const mainKey = document.getElementById('main-key');
    const mainCode = document.getElementById('main-code');

    const infoKey = document.getElementById('info-key');
    const infoCode = document.getElementById('info-code');
    const infoWhich = document.getElementById('info-which');
    const infoLocation = document.getElementById('info-location');

    const metaCtrl = document.getElementById('meta-ctrl');
    const metaShift = document.getElementById('meta-shift');
    const metaAlt = document.getElementById('meta-alt');
    const metaMeta = document.getElementById('meta-meta');

    window.addEventListener('keydown', (e) => {
        // Prevent default action for some keys to keep focus on the tool
        if (e.code === 'Space' || e.code.startsWith('Arrow')) {
            e.preventDefault();
        }

        initialState.classList.add('hidden');
        resultState.classList.remove('hidden');

        // Main Display
        mainKey.textContent = e.key === ' ' ? '(Space)' : e.key;
        mainCode.textContent = e.code;

        // Grid Info
        infoKey.textContent = e.key;
        infoCode.textContent = e.code;
        infoWhich.textContent = e.which;

        let locationText = 'General';
        if (e.location === 1) locationText = 'Left';
        if (e.location === 2) locationText = 'Right';
        if (e.location === 3) locationText = 'Numpad';
        infoLocation.textContent = `${e.location} (${locationText})`;

        // Meta Keys
        updateMeta(metaCtrl, e.ctrlKey);
        updateMeta(metaShift, e.shiftKey);
        updateMeta(metaAlt, e.altKey);
        updateMeta(metaMeta, e.metaKey);
    });

    function updateMeta(element, isActive) {
        if (isActive) {
            element.classList.remove('bg-gray-200', 'dark:bg-gray-800', 'text-gray-400');
            element.classList.add('bg-green-500', 'text-white');
        } else {
            element.classList.add('bg-gray-200', 'dark:bg-gray-800', 'text-gray-400');
            element.classList.remove('bg-green-500', 'text-white');
        }
    }
});
