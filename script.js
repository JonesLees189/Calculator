const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const percent = document.querySelector('.percent');
const period = document.querySelector('.period');
const sign = document.querySelector('.sign');
const display = document.getElementById('numbers');
const displayResult = document.getElementById('result');
const displayEqual = document.getElementById('equal');
const operatorSymbols = ['+', '-', '×', '÷'];
const numberSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function typeNumber(e) {
    if (display.innerText === '0') {
        display.innerText = '';
    }
    if (display.innerText.length >= 15) return;
    if (display.innerText[display.innerText.length - 1] === "%") return;
    display.innerText += e.target.innerText;
}

function typeOperator(e) {
    if (display.innerText.length >= 15) return;
    if (display.innerText[display.innerText.length - 1] === e.target.innerText) return;
    if (operatorSymbols.includes(display.innerText[display.innerText.length - 1])) {
        display.innerText = display.innerText.slice(0, -1);
    }
    display.innerText += e.target.innerText;
}

function typePercent() {
    if (display.innerText.length >= 15) return;
    if (numberSymbols.includes(display.innerText[display.innerText.length - 1])) {
        display.innerText += '%';
    }
}


function typePeriod() {
    if (display.innerText.length >= 15) return;
    if (display.innerText[display.innerText.length - 1] === '%') return;
    // find the index of the last operator in the display
    let lastOperatorIndex = -1;
    for (let i = display.innerText.length - 1; i >= 0; i--) {
        if (operatorSymbols.includes(display.innerText[i])) {
            lastOperatorIndex = i;
            break;
        }
    }
    // if there is no period between the last operator and the end of the display, add a period
    if (display.innerText.slice(lastOperatorIndex + 1).indexOf('.') === -1) {
        display.innerText += '.';
        return;
    }

}

function typeSign() {
    if (display.innerText.length >= 15) return;
    if (display.innerText[display.innerText.length - 1] === '%') return;
    if (display.innerText === '0') {
        display.innerText = '-';
        return;
    }
    //if the last character is a negative sign, remove it
    if (display.innerText[display.innerText.length - 1] === '-') {
        display.innerText = display.innerText.slice(0, -1);
        if (display.innerText === '') {
            display.innerText = '0';
        }
        return;
    }
    // if the last character in the display is a operator, add the sign to the end
    if (operatorSymbols.includes(display.innerText[display.innerText.length - 1])) {
        display.innerText += '-';
        return;
    }
}
function clearDisplay() {
    display.innerText = '0';
    displayEqual.classList.add('d-none');
    displayResult.classList.add('d-none');
}

function calculate() {

    if (operatorSymbols.includes(display.innerText[display.innerText.length - 1])) {
        display.innerText = display.innerText.slice(0, -1);
    }
    displayInnerText = display.innerText.replace(/%/g, '/100');
    let result = eval(displayInnerText.replace(/×/g, '*').replace(/÷/g, '/'));

    displayResult.innerText = result;
    // remove class d-none from displayEqual
    displayEqual.classList.remove('d-none');
    displayResult.classList.remove('d-none');
}
numbers.forEach(number => {
    number.addEventListener('click', typeNumber);
})

operators.forEach(operator => {
    operator.addEventListener('click', typeOperator);
})

clear.addEventListener('click', clearDisplay);
percent.addEventListener('click', typePercent);
period.addEventListener('click', typePeriod);
sign.addEventListener('click', typeSign);
equal.addEventListener('click', calculate);
display.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate();
    }
})