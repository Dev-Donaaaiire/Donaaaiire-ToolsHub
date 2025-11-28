document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const modeEncode = document.getElementById('mode-encode');
    const modeDecode = document.getElementById('mode-decode');

    let isEncoding = true;

    function process() {
        const text = inputText.value;
        try {
            if (isEncoding) {
                outputText.value = encodeURIComponent(text);
            } else {
                outputText.value = decodeURIComponent(text);
            }
        } catch (e) {
            outputText.value = 'Error: URL inválida';
        }
    }

    function setMode(encode) {
        isEncoding = encode;
        if (isEncoding) {
            modeEncode.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
            modeEncode.classList.remove('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');

            modeDecode.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
            modeDecode.classList.add('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');
        } else {
            modeDecode.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
            modeDecode.classList.remove('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');

            modeEncode.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
            modeEncode.classList.add('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');
        }
        process();
    }

    inputText.addEventListener('input', process);

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '¡Copiado!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });

    modeEncode.addEventListener('click', () => setMode(true));
    modeDecode.addEventListener('click', () => setMode(false));
});
