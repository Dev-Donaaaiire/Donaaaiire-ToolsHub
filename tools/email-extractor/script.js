let extractedEmails = [];

function extractEmails() {
    const text = document.getElementById('input-text').value;

    if (!text) {
        alert('Por favor, ingresa un texto para extraer emails');
        return;
    }

    // Email regex pattern
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    // Extract all emails
    const allEmails = text.match(emailRegex) || [];

    // Get unique emails
    const uniqueEmails = [...new Set(allEmails)];

    extractedEmails = uniqueEmails;

    // Display results
    displayResults(allEmails.length, uniqueEmails);

    // Show results section
    document.getElementById('results').classList.remove('hidden');
}

function displayResults(total, uniqueEmails) {
    document.getElementById('total-count').textContent = total;
    document.getElementById('unique-count').textContent = uniqueEmails.length;

    const emailList = document.getElementById('email-list');

    if (uniqueEmails.length === 0) {
        emailList.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No se encontraron emails</p>';
        return;
    }

    // Create list of emails
    let html = '<div class="space-y-2">';
    uniqueEmails.forEach((email, index) => {
        html += `
            <div class="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg">
                <span class="font-mono text-sm">${email}</span>
                <button onclick="copySingleEmail('${email}')" class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors">
                    Copiar
                </button>
            </div>
        `;
    });
    html += '</div>';

    emailList.innerHTML = html;
}

function copyEmails() {
    if (extractedEmails.length === 0) return;

    const emailsText = extractedEmails.join('\n');
    window.copyToClipboard(emailsText);

    const btn = document.getElementById('copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('bg-green-500', 'text-white');
    }, 1500);
}

function copySingleEmail(email) {
    window.copyToClipboard(email);
}
