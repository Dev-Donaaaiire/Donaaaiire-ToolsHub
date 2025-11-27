// Tabs
const tabStopwatch = document.getElementById('tab-stopwatch');
const tabTimer = document.getElementById('tab-timer');
const sectionStopwatch = document.getElementById('stopwatch-section');
const sectionTimer = document.getElementById('timer-section');

// Stopwatch Elements
const swDisplay = document.getElementById('sw-display');
const swStart = document.getElementById('sw-start');
const swPause = document.getElementById('sw-pause');
const swReset = document.getElementById('sw-reset');
const swLap = document.getElementById('sw-lap');
const swLaps = document.getElementById('sw-laps');

// Timer Elements
const tmInput = document.getElementById('timer-input');
const tmDisplay = document.getElementById('timer-display');
const tmStart = document.getElementById('tm-start');
const tmPause = document.getElementById('tm-pause');
const tmReset = document.getElementById('tm-reset');
const tmInputs = {
    h: document.getElementById('tm-hours'),
    m: document.getElementById('tm-minutes'),
    s: document.getElementById('tm-seconds')
};
const alarmSound = document.getElementById('alarm-sound');

// --- Stopwatch Logic ---
let swInterval;
let swTime = 0;
let swRunning = false;

function formatTime(ms) {
    const date = new Date(ms);
    const m = date.getUTCMinutes().toString().padStart(2, '0');
    const s = date.getUTCSeconds().toString().padStart(2, '0');
    const cs = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${m}:${s}.${cs}`;
}

function updateStopwatch() {
    swTime += 10;
    swDisplay.textContent = formatTime(swTime);
}

swStart.addEventListener('click', () => {
    swRunning = true;
    swInterval = setInterval(updateStopwatch, 10);
    swStart.classList.add('hidden');
    swPause.classList.remove('hidden');
});

swPause.addEventListener('click', () => {
    swRunning = false;
    clearInterval(swInterval);
    swPause.classList.add('hidden');
    swStart.classList.remove('hidden');
});

swReset.addEventListener('click', () => {
    swRunning = false;
    clearInterval(swInterval);
    swTime = 0;
    swDisplay.textContent = '00:00.00';
    swLaps.innerHTML = '';
    swPause.classList.add('hidden');
    swStart.classList.remove('hidden');
});

swLap.addEventListener('click', () => {
    if (swRunning) {
        const li = document.createElement('li');
        li.textContent = `Vuelta ${swLaps.children.length + 1}: ${formatTime(swTime)}`;
        swLaps.prepend(li);
    }
});

// --- Timer Logic ---
let tmInterval;
let tmTotalSeconds = 0;
let tmRunning = false;

function formatTimer(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateTimer() {
    if (tmTotalSeconds <= 0) {
        clearInterval(tmInterval);
        tmRunning = false;
        alarmSound.play();
        alert('¡Tiempo terminado!');
        alarmSound.pause();
        alarmSound.currentTime = 0;
        resetTimerUI();
        return;
    }
    tmTotalSeconds--;
    tmDisplay.textContent = formatTimer(tmTotalSeconds);
}

function resetTimerUI() {
    tmInput.classList.remove('hidden');
    tmDisplay.classList.add('hidden');
    tmPause.classList.add('hidden');
    tmStart.classList.remove('hidden');
}

tmStart.addEventListener('click', () => {
    if (!tmRunning) {
        // If starting fresh
        if (tmInput.classList.contains('hidden') === false) {
            const h = parseInt(tmInputs.h.value) || 0;
            const m = parseInt(tmInputs.m.value) || 0;
            const s = parseInt(tmInputs.s.value) || 0;
            tmTotalSeconds = h * 3600 + m * 60 + s;

            if (tmTotalSeconds <= 0) return;

            tmInput.classList.add('hidden');
            tmDisplay.classList.remove('hidden');
            tmDisplay.textContent = formatTimer(tmTotalSeconds);
        }

        tmRunning = true;
        tmInterval = setInterval(updateTimer, 1000);
        tmStart.classList.add('hidden');
        tmPause.classList.remove('hidden');
    }
});

tmPause.addEventListener('click', () => {
    tmRunning = false;
    clearInterval(tmInterval);
    tmPause.classList.add('hidden');
    tmStart.classList.remove('hidden');
});

tmReset.addEventListener('click', () => {
    tmRunning = false;
    clearInterval(tmInterval);
    resetTimerUI();
    tmInputs.h.value = '';
    tmInputs.m.value = '';
    tmInputs.s.value = '';
});

// --- Tabs Logic ---
function switchTab(tab) {
    if (tab === 'stopwatch') {
        sectionStopwatch.classList.remove('hidden');
        sectionTimer.classList.add('hidden');
        tabStopwatch.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        tabStopwatch.classList.remove('text-gray-500', 'dark:text-gray-400');
        tabTimer.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        tabTimer.classList.add('text-gray-500', 'dark:text-gray-400');
    } else {
        sectionStopwatch.classList.add('hidden');
        sectionTimer.classList.remove('hidden');
        tabTimer.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        tabTimer.classList.remove('text-gray-500', 'dark:text-gray-400');
        tabStopwatch.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
        tabStopwatch.classList.add('text-gray-500', 'dark:text-gray-400');
    }
}

tabStopwatch.addEventListener('click', () => switchTab('stopwatch'));
tabTimer.addEventListener('click', () => switchTab('timer'));
