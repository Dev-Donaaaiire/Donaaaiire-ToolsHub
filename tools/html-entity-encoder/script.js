document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const modeEncode = document.getElementById('mode-encode');
    const modeDecode = document.getElementById('mode-decode');

    let isEncoding = true;

    function encodeHTML(str) {
        return str.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
        });
    }

    function decodeHTML(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    function process() {
        const text = inputText.value;
        if (isEncoding) {
            outputText.value = encodeHTML(text);
        } else {
            outputText.value = decodeHTML(text);
        }
    }

    function setMode(encode) {
        isEncoding = encode;
        if (isEncoding) {
            modeEncode.classList.add('bg-yellow-500', 'text-white', 'border-yellow-500');
            modeEncode.classList.remove('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');

            modeDecode.classList.remove('bg-yellow-500', 'text-white', 'border-yellow-500');
            modeDecode.classList.add('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');

            document.querySelector('h2:first-of-type').textContent = 'Entrada (Texto Normal)';
            document.querySelector('h2:last-of-type').textContent = 'Salida (Codificado)';
        } else {
            modeDecode.classList.add('bg-yellow-500', 'text-white', 'border-yellow-500');
            modeDecode.classList.remove('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');

            modeEncode.classList.remove('bg-yellow-500', 'text-white', 'border-yellow-500');
            modeEncode.classList.add('bg-white', 'text-gray-900', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');

            document.querySelector('h2:first-of-type').textContent = 'Entrada (Codificado)';
            document.querySelector('h2:last-of-type').textContent = 'Salida (Texto Normal)';
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
