const nameOutput = document.getElementById('name-output');
const generateBtn = document.getElementById('generate-btn');
const saveBtn = document.getElementById('save-btn');
const categorySelect = document.getElementById('category');
const favoritesList = document.getElementById('favorites-list');
const clearFavoritesBtn = document.getElementById('clear-favorites');

// Data
const names = {
    realistic: {
        first: ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofía', 'Luis', 'Elena', 'Miguel', 'Lucía', 'Javier', 'Carmen', 'David', 'Paula'],
        last: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz']
    },
    fantasy: {
        first: ['Ael', 'Thar', 'Zil', 'Mor', 'Fae', 'Gor', 'Xan', 'Vel', 'Kael', 'Lyn', 'Syl', 'Dra', 'Fen', 'Rin', 'Vor', 'Zar'],
        last: ['wind', 'fire', 'storm', 'shadow', 'light', 'blade', 'heart', 'moon', 'star', 'walker', 'singer', 'weaver', 'hunter', 'seeker']
    }
};

// Load favorites
let favorites = JSON.parse(localStorage.getItem('nameFavorites')) || [];

function generateName() {
    const category = categorySelect.value;
    const firstList = names[category].first;
    const lastList = names[category].last;

    const first = firstList[Math.floor(Math.random() * firstList.length)];
    const last = lastList[Math.floor(Math.random() * lastList.length)];

    let fullName = `${first} ${last}`;
    if (category === 'fantasy') {
        // Fantasy names often combine syllables, so let's just join them or add a suffix
        // Simple approach: First + Last (as suffix)
        // Or keep space. Let's keep space for now, maybe capitalize last for fantasy too.
        // Actually for fantasy "Tharwind" looks better than "Thar Wind" sometimes, but let's stick to First Last for consistency
    }

    nameOutput.textContent = fullName;
    saveBtn.classList.remove('hidden');
}

function saveFavorite() {
    const name = nameOutput.textContent;
    if (favorites.includes(name)) return;

    favorites.push(name);
    localStorage.setItem('nameFavorites', JSON.stringify(favorites));
    renderFavorites();
}

function deleteFavorite(name) {
    favorites = favorites.filter(n => n !== name);
    localStorage.setItem('nameFavorites', JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="text-gray-400 text-sm w-full text-center">No tienes favoritos guardados.</p>';
        return;
    }

    favorites.forEach(name => {
        const div = document.createElement('div');
        div.className = 'inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium';
        div.innerHTML = `
            ${name}
            <button onclick="deleteFavorite('${name}')" class="ml-2 text-gray-400 hover:text-red-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        `;
        favoritesList.appendChild(div);
    });
}

// Event Listeners
generateBtn.addEventListener('click', generateName);
saveBtn.addEventListener('click', saveFavorite);
clearFavoritesBtn.addEventListener('click', () => {
    favorites = [];
    localStorage.removeItem('nameFavorites');
    renderFavorites();
});

// Init
renderFavorites();
