const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.unshift(task);
    saveTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}

function renderTasks() {
    todoList.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = `bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between group transition-all ${task.completed ? 'opacity-75' : ''}`;

            div.innerHTML = `
                <div class="flex items-center gap-4 flex-grow">
                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check-${task.id}">
                        <input type="checkbox" 
                            class="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-secondary checked:before:bg-secondary hover:before:opacity-10"
                            id="check-${task.id}"
                            ${task.completed ? 'checked' : ''}
                            onchange="toggleTask(${task.id})" />
                        <span
                            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <div class="flex flex-col">
                        <span class="text-lg ${task.completed ? 'line-through text-gray-400' : ''}">${task.text}</span>
                        <span class="text-xs text-gray-400 dark:text-gray-500">${new Date(task.createdAt).toLocaleString()}</span>
                    </div>
                </div>
                <button onclick="deleteTask(${task.id})" class="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            `;
            todoList.appendChild(div);
        });
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTask(text);
        todoInput.value = '';
    }
});

// Init
renderTasks();
