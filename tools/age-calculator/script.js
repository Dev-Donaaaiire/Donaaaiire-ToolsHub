function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;

    if (!birthdateInput) {
        alert('Por favor, selecciona tu fecha de nacimiento');
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date();

    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Total days
    const totalDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('total-days').textContent = totalDays.toLocaleString();
    document.getElementById('next-birthday').textContent = `En ${daysUntilBirthday} días`;
    document.getElementById('result').classList.remove('hidden');
}
