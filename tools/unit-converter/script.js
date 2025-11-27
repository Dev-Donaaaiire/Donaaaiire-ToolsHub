const categoryContainer = document.getElementById('category-container');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');

// Conversion factors relative to a base unit for each category
const units = {
    length: {
        base: 'meters',
        rates: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            micrometers: 1000000,
            nanometers: 1000000000,
            miles: 0.000621371,
            yards: 1.09361,
            feet: 3.28084,
            inches: 39.3701,
            nautical_miles: 0.000539957,
            light_years: 1.057e-16
        }
    },
    weight: {
        base: 'kilograms',
        rates: {
            kilograms: 1,
            grams: 1000,
            milligrams: 1000000,
            micrograms: 1000000000,
            metric_tons: 0.001,
            pounds: 2.20462,
            ounces: 35.274,
            stones: 0.157473,
            short_tons: 0.00110231 // US Ton
        }
    },
    temperature: {
        // Special handling
        units: ['celsius', 'fahrenheit', 'kelvin', 'rankine']
    },
    area: {
        base: 'square_meters',
        rates: {
            square_meters: 1,
            square_kilometers: 0.000001,
            square_centimeters: 10000,
            square_millimeters: 1000000,
            hectares: 0.0001,
            acres: 0.000247105,
            square_miles: 3.861e-7,
            square_yards: 1.19599,
            square_feet: 10.7639,
            square_inches: 1550.0031
        }
    },
    volume: {
        base: 'liters',
        rates: {
            liters: 1,
            milliliters: 1000,
            cubic_meters: 0.001,
            cubic_centimeters: 1000,
            cubic_inches: 61.0237,
            cubic_feet: 0.0353147,
            gallons_us: 0.264172,
            gallons_uk: 0.219969,
            quarts_us: 1.05669,
            pints_us: 2.11338,
            cups_us: 4.22675,
            fluid_ounces_us: 33.814,
            tablespoons_us: 67.628,
            teaspoons_us: 202.884
        }
    },
    time: {
        base: 'seconds',
        rates: {
            seconds: 1,
            milliseconds: 1000,
            microseconds: 1000000,
            nanoseconds: 1000000000,
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400,
            weeks: 1 / 604800,
            months: 1 / 2628000, // Approx
            years: 1 / 31536000, // Approx
            decades: 1 / 315360000,
            centuries: 1 / 3153600000
        }
    },
    speed: {
        base: 'meters_per_second',
        rates: {
            meters_per_second: 1,
            kilometers_per_hour: 3.6,
            miles_per_hour: 2.23694,
            knots: 1.94384,
            mach: 0.00293858 // At sea level
        }
    },
    digital: {
        base: 'bytes',
        rates: {
            bits: 8,
            bytes: 1,
            kilobytes: 0.001, // Decimal (1000)
            megabytes: 0.000001,
            gigabytes: 1e-9,
            terabytes: 1e-12,
            petabytes: 1e-15,
            kibibytes: 1 / 1024, // Binary (1024)
            mebibytes: 1 / 1048576,
            gibibytes: 1 / 1073741824
        }
    },
    energy: {
        base: 'joules',
        rates: {
            joules: 1,
            kilojoules: 0.001,
            calories: 0.239006,
            kilocalories: 0.000239006,
            watt_hours: 0.000277778,
            kilowatt_hours: 2.77778e-7,
            electronvolts: 6.242e+18,
            british_thermal_units: 0.000947817
        }
    },
    pressure: {
        base: 'pascal',
        rates: {
            pascal: 1,
            kilopascal: 0.001,
            bar: 0.00001,
            psi: 0.000145038,
            atmosphere: 9.8692e-6,
            torr: 0.00750062
        }
    },
    power: {
        base: 'watts',
        rates: {
            watts: 1,
            kilowatts: 0.001,
            megawatts: 0.000001,
            horsepower: 0.00134102
        }
    }
};

const categoryLabels = {
    length: 'Longitud',
    weight: 'Masa/Peso',
    temperature: 'Temperatura',
    area: 'Área',
    volume: 'Volumen',
    time: 'Tiempo',
    speed: 'Velocidad',
    digital: 'Almacenamiento',
    energy: 'Energía',
    pressure: 'Presión',
    power: 'Potencia'
};

const unitLabels = {
    // Length
    meters: 'Metros', kilometers: 'Kilómetros', centimeters: 'Centímetros', millimeters: 'Milímetros',
    micrometers: 'Micrómetros', nanometers: 'Nanómetros', miles: 'Millas', yards: 'Yardas',
    feet: 'Pies', inches: 'Pulgadas', nautical_miles: 'Millas Náuticas', light_years: 'Años Luz',

    // Weight
    kilograms: 'Kilogramos', grams: 'Gramos', milligrams: 'Miligramos', micrograms: 'Microgramos',
    metric_tons: 'Toneladas (Métricas)', pounds: 'Libras', ounces: 'Onzas', stones: 'Stones', short_tons: 'Toneladas Cortas (US)',

    // Temperature
    celsius: 'Celsius', fahrenheit: 'Fahrenheit', kelvin: 'Kelvin', rankine: 'Rankine',

    // Area
    square_meters: 'Metros Cuadrados', square_kilometers: 'Kilómetros Cuadrados', square_centimeters: 'Centímetros Cuadrados',
    square_millimeters: 'Milímetros Cuadrados', hectares: 'Hectáreas', acres: 'Acres',
    square_miles: 'Millas Cuadradas', square_yards: 'Yardas Cuadradas', square_feet: 'Pies Cuadrados', square_inches: 'Pulgadas Cuadradas',

    // Volume
    liters: 'Litros', milliliters: 'Mililitros', cubic_meters: 'Metros Cúbicos', cubic_centimeters: 'Centímetros Cúbicos',
    cubic_inches: 'Pulgadas Cúbicas', cubic_feet: 'Pies Cúbicos', gallons_us: 'Galones (US)', gallons_uk: 'Galones (UK)',
    quarts_us: 'Cuartos (US)', pints_us: 'Pintas (US)', cups_us: 'Tazas (US)', fluid_ounces_us: 'Onzas Líquidas (US)',
    tablespoons_us: 'Cucharadas (US)', teaspoons_us: 'Cucharaditas (US)',

    // Time
    seconds: 'Segundos', milliseconds: 'Milisegundos', microseconds: 'Microsegundos', nanoseconds: 'Nanosegundos',
    minutes: 'Minutos', hours: 'Horas', days: 'Días', weeks: 'Semanas', months: 'Meses (Promedio)',
    years: 'Años', decades: 'Décadas', centuries: 'Siglos',

    // Speed
    meters_per_second: 'Metros/segundo', kilometers_per_hour: 'Kilómetros/hora', miles_per_hour: 'Millas/hora',
    knots: 'Nudos', mach: 'Mach',

    // Digital
    bits: 'Bits', bytes: 'Bytes', kilobytes: 'Kilobytes (KB)', megabytes: 'Megabytes (MB)',
    gigabytes: 'Gigabytes (GB)', terabytes: 'Terabytes (TB)', petabytes: 'Petabytes (PB)',
    kibibytes: 'Kibibytes (KiB)', mebibytes: 'Mebibytes (MiB)', gibibytes: 'Gibibytes (GiB)',

    // Energy
    joules: 'Julios', kilojoules: 'Kilojulios', calories: 'Calorías', kilocalories: 'Kilocalorías',
    watt_hours: 'Vatios-hora', kilowatt_hours: 'Kilovatios-hora', electronvolts: 'Electronvoltios',
    british_thermal_units: 'BTU',

    // Pressure
    pascal: 'Pascal', kilopascal: 'Kilopascal', bar: 'Bar', psi: 'PSI', atmosphere: 'Atmósfera', torr: 'Torr',

    // Power
    watts: 'Vatios', kilowatts: 'Kilovatios', megawatts: 'Megavatios', horsepower: 'Caballos de Fuerza'
};

let currentCategory = 'length';

function initCategories() {
    categoryContainer.innerHTML = '';
    Object.keys(units).forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = categoryLabels[cat] || cat;
        btn.dataset.category = cat;
        btn.className = 'py-2 px-4 rounded-lg text-sm font-medium transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';

        if (cat === currentCategory) {
            btn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
            btn.classList.remove('text-gray-500', 'dark:text-gray-400');
        }

        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('#category-container button').forEach(b => {
                b.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
                b.classList.add('text-gray-500', 'dark:text-gray-400');
            });
            btn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-primary');
            btn.classList.remove('text-gray-500', 'dark:text-gray-400');

            currentCategory = cat;
            populateUnits();
        });

        categoryContainer.appendChild(btn);
    });
}

function populateUnits() {
    const categoryData = units[currentCategory];
    let unitKeys = [];

    if (currentCategory === 'temperature') {
        unitKeys = categoryData.units;
    } else {
        unitKeys = Object.keys(categoryData.rates);
    }

    // Sort alphabetically for better UX? Or keep logical order? Logical order defined in object is better.

    const optionsHtml = unitKeys.map(unit =>
        `<option value="${unit}">${unitLabels[unit] || unit}</option>`
    ).join('');

    fromUnit.innerHTML = optionsHtml;
    toUnit.innerHTML = optionsHtml;

    // Set defaults (try to set different units)
    if (unitKeys.length > 1) {
        toUnit.selectedIndex = 1;
    }
    convert();
}

function convert() {
    const value = parseFloat(fromValue.value);
    if (isNaN(value)) {
        toValue.value = '';
        return;
    }

    const from = fromUnit.value;
    const to = toUnit.value;

    if (currentCategory === 'temperature') {
        toValue.value = convertTemperature(value, from, to).toFixed(2);
    } else {
        const rates = units[currentCategory].rates;
        // Convert to base, then to target
        // rate is "units per base". E.g. 1000 mm = 1 m.
        // So value_in_base = value_in_from / rate_from
        // value_in_to = value_in_base * rate_to

        const baseValue = value / rates[from];
        const result = baseValue * rates[to];

        // Format nicely - avoid scientific notation for common numbers if possible, but use it for extremes
        if (Math.abs(result) < 0.000001 || Math.abs(result) > 10000000) {
            toValue.value = result.toExponential(6);
        } else {
            toValue.value = parseFloat(result.toPrecision(8)); // Clean up floating point errors
        }
    }
}

function convertTemperature(value, from, to) {
    if (from === to) return value;

    let celsius;
    // To Celsius
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
    else if (from === 'kelvin') celsius = value - 273.15;
    else if (from === 'rankine') celsius = (value - 491.67) * 5 / 9;

    // From Celsius
    if (to === 'celsius') return celsius;
    else if (to === 'fahrenheit') return (celsius * 9 / 5) + 32;
    else if (to === 'kelvin') return celsius + 273.15;
    else if (to === 'rankine') return (celsius + 273.15) * 9 / 5;
}

// Event Listeners
fromValue.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);

// Init
initCategories();
populateUnits();
