const digitButtons = document.querySelectorAll(".digitButtons");
const operatorButtons = document.querySelectorAll(".operatorButtons");
const display = document.querySelector("#display");
digitButtons.forEach(node => node.addEventListener("click", type));
operatorButtons.forEach(node => node.addEventListener("click", operation));
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", equals);
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);
const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", backspace);
window.addEventListener("keydown", pressButton);

let tempOperation = ["", "", ""];
let eraseDisplay = false;

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function calculate(a, operator, b) {
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return substract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        default:
            break;
    }
}

function type(element) {
    if (eraseDisplay == true) {
        display.textContent = "";
    }
    if (display.textContent == "Infinity") {
        console.log("infinity");
        return;
    }
    const number = element.target.getAttribute("data-digit");
    eraseDisplay = false;
    if (number == "." && display.textContent.indexOf(".") > -1) {
        return;
    }
    display.textContent += number;
}

function operation(e) {
    if (tempOperation[0] != "") {
        tempOperation[2] = display.textContent;
        tempOperation[0] = Math.round(calculate(...tempOperation) * 1000) / 1000;
        tempOperation[1] = e.target.getAttribute("data-operator");
        if (tempOperation[0] == "Infinity") {
            display.textContent = "Alert! Impropability Drive Activated!";
        }
        else {
            display.textContent = tempOperation[0];
        }

    }
    else {
        tempOperation[0] = display.textContent;
        tempOperation[1] = e.target.getAttribute("data-operator");
    }
    eraseDisplay = true;
}

function equals() {
    tempOperation[2] = display.textContent;
    tempOperation[0] = Math.round(calculate(...tempOperation) * 1000) / 1000;
    if (tempOperation[0] == "Infinity") {
        display.textContent = "Alert! Impropability Drive Activated!";
    }
    else {
        display.textContent = tempOperation[0];
    }
    tempOperation[0] = "";
    tempOperation[1] = "";
    tempOperation[2] = "";
}

function clear() {
    display.textContent = "";
    tempOperation[0] = "";
    tempOperation[1] = "";
    tempOperation[2] = "";
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

function pressButton(event) {
    event.preventDefault();
    const keyPressed = event.keyCode;
    const buttonToPress = document.querySelector(`[data-key="${keyPressed}"]`);
    if (buttonToPress != null) {
        buttonToPress.click();
    }
}