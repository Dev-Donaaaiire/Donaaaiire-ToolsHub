const timezones = [
    { name: 'UTC', offset: 0 },
    { name: 'EST (UTC-5)', offset: -5 },
    { name: 'EDT (UTC-4)', offset: -4 },
    { name: 'PST (UTC-8)', offset: -8 },
    { name: 'PDT (UTC-7)', offset: -7 },
    { name: 'CET (UTC+1)', offset: 1 },
    { name: 'CEST (UTC+2)', offset: 2 },
    { name: 'CST China (UTC+8)', offset: 8 },
    { name: 'JST (UTC+9)', offset: 9 },
    { name: 'AEST (UTC+10)', offset: 10 }
];

function convert() {
    const fromOffset = parseInt(document.getElementById('from-tz').value);
    const timeInput = document.getElementById('time-input').value;

    if (!timeInput) return;

    const [hours, minutes] = timeInput.split(':').map(Number);

    const results = document.getElementById('results');
    results.innerHTML = '';

    timezones.forEach(tz => {
        const diff = tz.offset - fromOffset;
        let newHours = hours + diff;

        let dayIndicator = '';
        if (newHours >= 24) {
            newHours -= 24;
            dayIndicator = ' (+1 día)';
        } else if (newHours < 0) {
            newHours += 24;
            dayIndicator = ' (-1 día)';
        }

        const formattedTime = `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        const div = document.createElement('div');
        div.className = 'flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg';
        div.innerHTML = `
            <span class="font-medium">${tz.name}</span>
            <span class="text-lg font-bold text-primary">${formattedTime}${dayIndicator}</span>
        `;
        results.appendChild(div);
    });
}

convert();
