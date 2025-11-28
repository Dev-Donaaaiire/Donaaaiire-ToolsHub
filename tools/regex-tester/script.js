document.addEventListener('DOMContentLoaded', () => {
    const patternInput = document.getElementById('regex-pattern');
    const flagsInput = document.getElementById('regex-flags');
    const testStringInput = document.getElementById('test-string');
    const matchesOutput = document.getElementById('matches-output');
    const matchCount = document.getElementById('match-count');
    const errorMsg = document.getElementById('error-msg');

    function testRegex() {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const text = testStringInput.value;

        if (!pattern) {
            matchesOutput.textContent = text;
            matchCount.textContent = '0';
            errorMsg.textContent = '';
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            errorMsg.textContent = '';

            // Highlighting logic
            // We need to wrap matches in <span class="highlight">...</span>
            // But we must be careful with HTML escaping if we insert HTML.

            // First, escape HTML in the original text to prevent XSS or rendering issues
            const escapedText = escapeHtml(text);

            // Now we need to find matches in the original text and map them to the escaped text positions?
            // Actually, simpler approach:
            // 1. Find all matches with indices.
            // 2. Construct the new HTML string by slicing the original text (escaped) and inserting spans.

            // However, regex.exec() works on the string.
            // If we use replace(), we can do it easily.

            // Important: If 'g' flag is not present, replace only replaces first.
            // We should probably enforce 'g' for highlighting or handle it manually.
            // But user might want to test without 'g'.

            // Let's try a different approach:
            // Use replace with a callback, but we need to be careful about overlapping matches (not possible in JS regex)
            // and zero-length matches.

            let matchCounter = 0;

            // We can't just run replace on the raw text and then escape, because the match itself might contain HTML chars.
            // We can't run replace on escaped text because the regex might not match the escaped chars correctly (e.g. < vs &lt;)

            // Robust solution:
            // 1. Get all matches with indices from raw text.
            // 2. Build the output HTML string segment by segment, escaping the non-match parts and the match parts separately, wrapping match parts.

            let lastIndex = 0;
            let html = '';
            let match;

            // Ensure 'g' is used for the loop, or handle single match
            // If user didn't provide 'g', we only highlight the first one.
            const isGlobal = flags.includes('g');
            const loopRegex = new RegExp(pattern, isGlobal ? flags : flags + 'g'); // Force g for iteration if needed? No, if not global, just one match.

            // Actually, if we use the user's regex:
            if (!isGlobal) {
                match = regex.exec(text);
                if (match) {
                    matchCounter = 1;
                    const before = text.slice(0, match.index);
                    const matched = match[0];
                    const after = text.slice(match.index + matched.length);

                    html = escapeHtml(before) +
                        `<span class="highlight">${escapeHtml(matched)}</span>` +
                        escapeHtml(after);
                } else {
                    html = escapeHtml(text);
                }
            } else {
                // Global search
                // We use a loop with exec
                while ((match = regex.exec(text)) !== null) {
                    matchCounter++;

                    const before = text.slice(lastIndex, match.index);
                    const matched = match[0];

                    html += escapeHtml(before);
                    html += `<span class="highlight">${escapeHtml(matched)}</span>`;

                    lastIndex = match.index + matched.length;

                    // Prevent infinite loop with zero-width matches
                    if (match.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                }
                html += escapeHtml(text.slice(lastIndex));
            }

            matchesOutput.innerHTML = html;
            matchCount.textContent = matchCounter;

        } catch (e) {
            errorMsg.textContent = e.message;
            matchesOutput.textContent = escapeHtml(text); // Fallback
            matchCount.textContent = '0';
        }
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    patternInput.addEventListener('input', testRegex);
    flagsInput.addEventListener('input', testRegex);
    testStringInput.addEventListener('input', testRegex);

    // Initial test
    testRegex();
});
