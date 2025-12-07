// Global Copy to Clipboard with Fallback
window.copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            throw new Error('Clipboard API unavailable');
        }
    } catch (err) {
        // Fallback for http/file protocol
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            textArea.remove();
            return true;
        } catch (e) {
            console.error('Copy failed', e);
            textArea.remove();
            return false;
        }
    }
};

// Theme Toggle Logic
// Redirect to the index page when accessed directly on the specified domain
if (window.location.hostname === 'donaaaiire-tools-hub.vercel.app' && window.location.pathname === '/') {
    window.location.href = '/index.html';
}
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Only proceed if elements exist
if (themeToggleBtn && darkIcon && lightIcon) {
    // Change the icons inside the button based on previous settings
    // Default to dark mode if not specified or if explicitly set to dark
    if (localStorage.getItem('color-theme') === 'dark' || !('color-theme' in localStorage)) {
        darkIcon.classList.remove('hidden');
        document.documentElement.classList.add('dark');
    } else {
        lightIcon.classList.remove('hidden');
        document.documentElement.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', function () {
        // toggle icons inside button
        darkIcon.classList.toggle('hidden');
        lightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });
}

// Fix hover state during scroll
let scrollTimer;
window.addEventListener('scroll', () => {
    document.body.classList.add('disable-hover');

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.body.classList.remove('disable-hover');
    }, 100);
}, { passive: true });

// Scroll position persistence for index page
// We detect index page by checking for the presence of tool cards
const toolCards = document.querySelectorAll('.glass-card');
const isIndexPage = toolCards.length > 0;

if (isIndexPage) {
    // 1. Save position when clicking a tool
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            sessionStorage.setItem('indexScrollPos', window.scrollY.toString());
        });
    });

    // 2. Restore position if we have one
    const savedPos = sessionStorage.getItem('indexScrollPos');
    if (savedPos) {
        // Disable native restoration to avoid conflicts
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Check if page was reloaded
        const navEntry = performance.getEntriesByType("navigation")[0];
        if (navEntry && navEntry.type === 'reload') {
            // If reloaded, do NOT restore scroll.
            // Browser will handle it (or start at top because of 'manual')
            return;
        }

        const pos = parseInt(savedPos);

        if (!isNaN(pos) && pos > 0) {
            const forceScroll = () => {
                window.scrollTo({
                    top: pos,
                    behavior: 'instant'
                });
            };

            // Try immediately
            forceScroll();

            // Try on load
            window.addEventListener('load', forceScroll);

            // Retry for a short period to handle layout shifts
            let attempts = 0;
            const interval = setInterval(() => {
                forceScroll();
                attempts++;
                if (attempts > 5) clearInterval(interval);
            }, 50);
        }
    }
}

// Typing effect for main title
const typingH1 = document.getElementById("typing-title");
if (typingH1) {
    const fragments = [
        "Herramientas Online ",
        { tag: "span", className: "text-primary", text: "Gratuitas" },
        " y ",
        { tag: "span", className: "text-secondary", text: "Rápidas" }
    ];

    typingH1.innerHTML = "";
    let fragIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (fragIndex < fragments.length) {
            const frag = fragments[fragIndex];

            if (typeof frag === "string") {
                // Plain text
                if (charIndex < frag.length) {
                    typingH1.innerHTML += frag.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    charIndex = 0;
                    fragIndex++;
                    typeWriter();
                }
            } else {
                // Span element
                if (!frag.element) {
                    // Create span once
                    frag.element = document.createElement(frag.tag);
                    frag.element.className = frag.className;
                    typingH1.appendChild(frag.element);
                }

                if (charIndex < frag.text.length) {
                    frag.element.innerHTML += frag.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    charIndex = 0;
                    fragIndex++;
                    typeWriter();
                }
            }
        }
    }

    // Start typing effect with a small delay
    setTimeout(typeWriter, 500);
}

// Fuzzy Search Implementation
const searchInput = document.getElementById('tool-search');
// Select the grid that contains the tool cards. Fallback to any .grid if the specific selector fails.
let toolsGrid = document.querySelector('section.pb-24 .grid');
if (!toolsGrid) {
    console.warn('toolsGrid selector "section.pb-24 .grid" not found, falling back to first .grid element');
    toolsGrid = document.querySelector('.grid');
}
const cards = toolsGrid ? toolsGrid.querySelectorAll('.glass-card') : [];
console.log('Search init: found', cards.length, 'cards');


if (searchInput && cards.length > 0) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        cards.forEach(card => {
            // Get text content from h3 (title) and p (description)
            const titleElement = card.querySelector('h3');
            const descElement = card.querySelector('p');

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const description = descElement ? descElement.textContent.toLowerCase() : '';

            // Combine them for searching. We prioritize matches in title then description
            const content = title + ' ' + description;

            // 1. Check for Contiguous/Exact substring match (Priority 1)
            const isContiguous = content.includes(searchTerm);

            // 2. Check for Fuzzy match (Priority 2)
            let isFuzzy = true;
            let searchIndex = 0;

            for (let i = 0; i < searchTerm.length; i++) {
                const char = searchTerm[i];
                // Find the character starting from the position of the last found character + 1
                const index = content.indexOf(char, searchIndex);

                if (index === -1) {
                    isFuzzy = false;
                    break;
                }
                searchIndex = index + 1; // Update position for next search
            }

            if (isContiguous) {
                card.style.display = ''; // Restore display
                card.classList.remove('hidden');
                card.style.order = '-1'; // Show first
            } else if (isFuzzy) {
                card.style.display = ''; // Restore display
                card.classList.remove('hidden');
                card.style.order = '0'; // Show after contiguous
            } else {
                card.style.display = 'none'; // Hide the card
                card.classList.add('hidden');
                card.style.order = '0';
            }
        });
    });
}
});
