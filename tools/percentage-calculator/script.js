function calc1() {
    const percent = parseFloat(document.getElementById('percent1').value);
    const of = parseFloat(document.getElementById('of1').value);

    if (isNaN(percent) || isNaN(of)) {
        alert('Por favor, ingresa valores válidos');
        return;
    }

    const result = (percent / 100) * of;
    document.getElementById('result1').textContent = `${percent}% de ${of} = ${result.toFixed(2)}`;
    document.getElementById('result1').classList.remove('hidden');
}

function calc2() {
    const num = parseFloat(document.getElementById('num2').value);
    const of = parseFloat(document.getElementById('of2').value);

    if (isNaN(num) || isNaN(of) || of === 0) {
        alert('Por favor, ingresa valores válidos');
        return;
    }

    const result = (num / of) * 100;
    document.getElementById('result2').textContent = `${num} es el ${result.toFixed(2)}% de ${of}`;
    document.getElementById('result2').classList.remove('hidden');
}

function calc3() {
    const original = parseFloat(document.getElementById('original').value);
    const percent = parseFloat(document.getElementById('percent3').value);
    const operation = document.getElementById('operation').value;

    if (isNaN(original) || isNaN(percent)) {
        alert('Por favor, ingresa valores válidos');
        return;
    }

    const change = (percent / 100) * original;
    const result = operation === 'increase' ? original + change : original - change;
    const opText = operation === 'increase' ? 'aumento' : 'descuento';

    document.getElementById('result3').textContent = `${original} con ${opText} del ${percent}% = ${result.toFixed(2)}`;
    document.getElementById('result3').classList.remove('hidden');
}
