function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Por favor, ingresa valores válidos');
        return;
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);

    let category, color, percentage;

    if (bmi < 18.5) {
        category = 'Bajo peso';
        color = 'bg-blue-500';
        percentage = (bmi / 18.5) * 25;
    } else if (bmi < 25) {
        category = 'Peso normal';
        color = 'bg-green-500';
        percentage = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    } else if (bmi < 30) {
        category = 'Sobrepeso';
        color = 'bg-yellow-500';
        percentage = 50 + ((bmi - 25) / (30 - 25)) * 25;
    } else {
        category = 'Obesidad';
        color = 'bg-red-500';
        percentage = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
    }

    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    document.getElementById('bmi-category').textContent = category;
    document.getElementById('bmi-indicator').className = `h-full transition-all duration-500 ${color}`;
    document.getElementById('bmi-indicator').style.width = `${percentage}%`;
    document.getElementById('result').classList.remove('hidden');
}
