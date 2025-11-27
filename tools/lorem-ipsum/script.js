const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const generateBtn = document.getElementById('generate-btn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";

const words = loremIpsum.replace(/[.,]/g, '').toLowerCase().split(' ');
const sentences = loremIpsum.split('. ').map(s => s.trim() + '.');
const paragraphs = [
    loremIpsum,
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.",
    "Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue.",
    "Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Vestibulum sed ante. Donec sagittis euismod purus. Sed ut perspiciatis sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce nibh. Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat."
];

function generateLorem() {
    const amount = parseInt(amountInput.value) || 1;
    const type = typeSelect.value;
    let result = '';

    if (type === 'words') {
        const generatedWords = [];
        for (let i = 0; i < amount; i++) {
            generatedWords.push(words[i % words.length]);
        }
        result = generatedWords.join(' ');
        // Capitalize first letter
        result = result.charAt(0).toUpperCase() + result.slice(1);
    } else if (type === 'sentences') {
        const generatedSentences = [];
        for (let i = 0; i < amount; i++) {
            generatedSentences.push(sentences[i % sentences.length]);
        }
        result = generatedSentences.join(' ');
    } else {
        const generatedParagraphs = [];
        for (let i = 0; i < amount; i++) {
            generatedParagraphs.push(paragraphs[i % paragraphs.length]);
        }
        result = generatedParagraphs.join('\n\n');
    }

    output.value = result;
}

function copyText() {
    if (!output.value) return;
    window.copyToClipboard(output.value);

    // Visual feedback
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = `<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
    }, 1500);
}

// Event Listeners
generateBtn.addEventListener('click', generateLorem);
copyBtn.addEventListener('click', copyText);

// Init
generateLorem();
