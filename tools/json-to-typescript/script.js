document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('json-input');
    const tsOutput = document.getElementById('ts-output');
    const interfaceNameInput = document.getElementById('interface-name');
    const formatBtn = document.getElementById('format-btn');
    const copyBtn = document.getElementById('copy-btn');
    const errorMsg = document.getElementById('error-msg');

    function getType(value) {
        if (value === null) return 'null';
        if (Array.isArray(value)) {
            if (value.length === 0) return 'any[]';
            const type = getType(value[0]);
            // Check if mixed types (simplified)
            return `${type}[]`;
        }
        if (typeof value === 'object') return 'object'; // Should be handled recursively usually
        return typeof value;
    }

    function generateInterface(name, obj) {
        let output = `export interface ${name} {\n`;

        const nestedInterfaces = [];

        for (const key in obj) {
            const value = obj[key];
            let type = typeof value;

            if (value === null) {
                type = 'null';
            } else if (Array.isArray(value)) {
                if (value.length > 0) {
                    const firstItem = value[0];
                    if (typeof firstItem === 'object' && firstItem !== null) {
                        const nestedName = capitalize(key) + 'Item';
                        type = `${nestedName}[]`;
                        nestedInterfaces.push(generateInterface(nestedName, firstItem));
                    } else {
                        type = `${typeof firstItem}[]`;
                    }
                } else {
                    type = 'any[]';
                }
            } else if (typeof value === 'object') {
                const nestedName = capitalize(key);
                type = nestedName;
                nestedInterfaces.push(generateInterface(nestedName, value));
            }

            output += `  ${key}: ${type};\n`;
        }

        output += `}`;

        // Prepend nested interfaces
        if (nestedInterfaces.length > 0) {
            return nestedInterfaces.join('\n\n') + '\n\n' + output;
        }

        return output;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function convert() {
        const jsonStr = jsonInput.value;
        const rootName = interfaceNameInput.value || 'RootObject';

        if (!jsonStr.trim()) {
            tsOutput.value = '';
            errorMsg.textContent = '';
            return;
        }

        try {
            const obj = JSON.parse(jsonStr);
            errorMsg.textContent = '';

            // Handle array root
            if (Array.isArray(obj)) {
                if (obj.length > 0 && typeof obj[0] === 'object') {
                    tsOutput.value = generateInterface(rootName, obj[0]);
                } else {
                    tsOutput.value = `export type ${rootName} = ${getType(obj)};`;
                }
            } else {
                tsOutput.value = generateInterface(rootName, obj);
            }

        } catch (e) {
            errorMsg.textContent = 'JSON inválido: ' + e.message;
        }
    }

    jsonInput.addEventListener('input', convert);
    interfaceNameInput.addEventListener('input', convert);

    formatBtn.addEventListener('click', () => {
        try {
            const obj = JSON.parse(jsonInput.value);
            jsonInput.value = JSON.stringify(obj, null, 2);
            convert();
        } catch (e) {
            errorMsg.textContent = 'JSON inválido para formatear';
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(tsOutput.value).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '¡Copiado!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });

    // Initial run
    convert();
});
