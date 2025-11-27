function calculateDiff() {
    const date1Input = document.getElementById('date1').value;
    const date2Input = document.getElementById('date2').value;

    if (!date1Input || !date2Input) {
        alert('Por favor, selecciona ambas fechas');
        return;
    }

    const date1 = new Date(date1Input);
    const date2 = new Date(date2Input);

    let start = date1 < date2 ? date1 : date2;
    let end = date1 < date2 ? date2 : date1;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((end - start) / (1000 * 60 * 60));

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('total-days').textContent = totalDays.toLocaleString();
    document.getElementById('total-hours').textContent = totalHours.toLocaleString();
    document.getElementById('result').classList.remove('hidden');
}
