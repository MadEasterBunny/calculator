const container = document.getElementById("container");
const display = document.getElementById("display");

const buttons = ["&#x232B;", "C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
const numpad = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];
const equal = ["="];
const clearDelBtns = ["&#x232B;", "C"];

let operand1 = null;
let operand2 = null;
let currOperator = "";
let setClear = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, operand1, operand2) => {
    const a = +operand1;
    const b = +operand2;

    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const appendNumber = num => {
    if(setClear) {
        clearDisplay();
        setClear = false;
    }

    if(display.value === "0" && num !== ".") {
        display.value = num;
    } else {
        display.value += num;
    }
}

const setOperator = operator => {
    if(operand1 !== null && operator !== "") {
        evaluate();
    }
    if(operand1 === null) {
        operand1 = display.value;
    }
    currOperator = operator;
    setClear = true;
}

const evaluate = () => {
    if(currOperator === "") {
        return;
    }
    operand2 = display.value;
    const total = operate(currOperator, operand1, operand2);
    display.value = total;
    operand1 = total;
    currOperator = "";
    operand2 = null;
}

const clearDisplay = () => {
    display.value = 0;
}

const clear = () => {
    operand1 = null;
    operand2 = null;
    currOperator = "";
    display.value = 0;
}

const deleteNum = () => {
    let currValue = display.value;
    let newValue = currValue.slice(0, -1);
    if(display.value.length <= 1) {
        display.value = 0;
    } else {
        display.value = newValue
    }
}

for(let i = 0; i < buttons.length; i++) {
    const button = document.createElement("button");
    button.innerHTML = buttons[i];
    button.value = buttons[i]

    if(numpad.includes(button.value)) {
        button.setAttribute("data-type", "number");
    }

    if(operators.includes(button.value)) {
        button.classList.add("operator");
        button.setAttribute("data-type", "operator");
    }

    if(equal.includes(button.value)) {
        button.setAttribute("data-type", "utility");
        button.setAttribute("data-action", "equal");
    }

    if(clearDelBtns.includes(button.value)) {
        button.classList.add("clearDelBtn");
        button.setAttribute("data-type", "utility");
        if(button.value === "&#x232B;") {
            button.setAttribute("data-action", "delete");
        } else {
            button.setAttribute("data-action", "clear");
        }
    }

    container.appendChild(button);
}

container.addEventListener("click", e => {
    const target = e.target;

    if(target.tagName !== "BUTTON") {
        return;
    }
    
    const type = target.getAttribute("data-type");
    const value = target.value;
    const action = target.getAttribute("data-action");

    switch(type) {
        case "number":
            appendNumber(value);
            break;
        case "operator":
            setOperator(value);
            break;
        case "utility":
            if(action === "clear") {
                clear();
            } else if (action === "delete") {
                deleteNum();
            } else {
                evaluate();
            }
            break;
    }


})