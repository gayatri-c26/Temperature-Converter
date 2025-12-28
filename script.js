// Main conversion function
function convertTemp() {
    var input = document.getElementById('tempInput').value;
    var fromUnit = document.querySelector('input[name="fromUnit"]:checked').value;
    var toUnit = document.querySelector('input[name="toUnit"]:checked').value;
    var resultBox = document.getElementById('resultBox');
    var resultValue = document.getElementById('resultValue');
    var errorBox = document.getElementById('errorBox');

    // Reset displays
    errorBox.classList.remove('show');
    resultBox.classList.remove('show');

    // Validate input - check if empty
    if (input.trim() === '') {
        errorBox.textContent = 'Please enter a temperature value';
        errorBox.classList.add('show');
        return;
    }

    // Validate input - check if number
    var temp = parseFloat(input);
    if (isNaN(temp)) {
        errorBox.textContent = 'Please enter a valid number';
        errorBox.classList.add('show');
        return;
    }

    // Check if converting to same unit
    if (fromUnit === toUnit) {
        resultValue.textContent = temp.toFixed(2) + ' ' + getUnitSymbol(toUnit);
        resultBox.classList.add('show');
        return;
    }

    // Step 1: Convert input to Celsius (intermediate step)
    var tempInCelsius;
    if (fromUnit === 'celsius') {
        tempInCelsius = temp;
    } else if (fromUnit === 'fahrenheit') {
        tempInCelsius = (temp - 32) * (5/9);
    } else { // kelvin
        tempInCelsius = temp - 273.15;
    }

    // Step 2: Convert from Celsius to target unit
    var converted;
    if (toUnit === 'celsius') {
        converted = tempInCelsius;
    } else if (toUnit === 'fahrenheit') {
        converted = (tempInCelsius * 9/5) + 32;
    } else { // kelvin
        converted = tempInCelsius + 273.15;
    }

    // Display result
    resultValue.textContent = converted.toFixed(2) + ' ' + getUnitSymbol(toUnit);
    resultBox.classList.add('show');
}

// Helper function to get unit symbol
function getUnitSymbol(unit) {
    if (unit === 'celsius') {
        return '°C';
    } else if (unit === 'fahrenheit') {
        return '°F';
    } else if (unit === 'kelvin') {
        return 'K';
    }
    return '';
}

// Enter key support
document.getElementById('tempInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertTemp();
    }
});
