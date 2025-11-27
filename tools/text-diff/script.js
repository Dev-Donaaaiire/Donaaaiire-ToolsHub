function comparTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    if (!text1 || !text2) {
        alert('Por favor, ingresa ambos textos para comparar');
        return;
    }

    // Split into words
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);

    // Simple diff algorithm
    const diff = computeDiff(words1, words2);

    // Display results
    displayDiff(diff);

    // Show results section
    document.getElementById('results').classList.remove('hidden');
}

function computeDiff(arr1, arr2) {
    const result = [];
    let addedCount = 0;
    let removedCount = 0;

    // Create a map of words in arr2 for quick lookup
    const arr2Map = new Map();
    arr2.forEach((word, i) => {
        if (!arr2Map.has(word)) {
            arr2Map.set(word, []);
        }
        arr2Map.get(word).push(i);
    });

    let i = 0, j = 0;

    while (i < arr1.length || j < arr2.length) {
        if (i >= arr1.length) {
            // Remaining words in arr2 are added
            result.push({ type: 'added', value: arr2[j] });
            addedCount++;
            j++;
        } else if (j >= arr2.length) {
            // Remaining words in arr1 are removed
            result.push({ type: 'removed', value: arr1[i] });
            removedCount++;
            i++;
        } else if (arr1[i] === arr2[j]) {
            // Words match
            result.push({ type: 'unchanged', value: arr1[i] });
            i++;
            j++;
        } else {
            // Words don't match - check if word exists later
            const foundInArr2 = arr2Map.has(arr1[i]);
            const foundInArr1 = arr1.slice(i).includes(arr2[j]);

            if (!foundInArr2) {
                result.push({ type: 'removed', value: arr1[i] });
                removedCount++;
                i++;
            } else if (!foundInArr1) {
                result.push({ type: 'added', value: arr2[j] });
                addedCount++;
                j++;
            } else {
                // Both exist somewhere - mark as changed
                result.push({ type: 'removed', value: arr1[i] });
                result.push({ type: 'added', value: arr2[j] });
                removedCount++;
                addedCount++;
                i++;
                j++;
            }
        }
    }

    return { diff: result, addedCount, removedCount };
}

function displayDiff(diffResult) {
    const { diff, addedCount, removedCount } = diffResult;
    const output = document.getElementById('diff-output');

    // Build HTML
    let html = '';
    diff.forEach(item => {
        if (item.type === 'added') {
            html += `<span class="diff-added">${escapeHtml(item.value)}</span> `;
        } else if (item.type === 'removed') {
            html += `<span class="diff-removed">${escapeHtml(item.value)}</span> `;
        } else {
            html += `${escapeHtml(item.value)} `;
        }
    });

    output.innerHTML = html;

    // Update stats
    document.getElementById('added-count').textContent = addedCount;
    document.getElementById('removed-count').textContent = removedCount;

    // Calculate similarity
    const totalWords = diff.length;
    const unchangedWords = diff.filter(d => d.type === 'unchanged').length;
    const similarity = totalWords > 0 ? Math.round((unchangedWords / totalWords) * 100) : 0;
    document.getElementById('similarity').textContent = similarity + '%';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
