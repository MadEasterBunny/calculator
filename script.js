const container = document.getElementById("container");
const display = document.getElementById("display");

const buttons = ["&#x232B;", "C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
const numpad = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];
const equal = ["="];
const clearDelBtns = ["&#x232B;", "C"];
const maxLength = 15;

let operand1 = null;
let operand2 = null;
let currOperator = "";
let setClear = false;
let hasBeenEvaluated = false;

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

    if(num === "." && display.value.includes(".")) {
        return;
    }

    if(display.value.length >= maxLength) {
        return;
    }

    if(display.value === "0" && num !== ".") {
        display.value = num;
    } else {
        display.value += num;
    }
    hasBeenEvaluated = false;
}

const setOperator = operator => {
    if(operand1 !== null && operator !== "") {
        evaluate();
        hasBeenEvaluated = false;
    }

    if(hasBeenEvaluated) {
        hasBeenEvaluated = false;
        return;
    }
    
    operand1 = display.value;
    currOperator = operator;
    setClear = true;
}

const evaluate = () => {
    if(hasBeenEvaluated && currOperator === "") {
        return;
    }

    if(currOperator !== "") {
        operand2 = display.value;
    } else {
        if(operand2 === null) {
            return;
        }
    }

    if(operand1 !== null && operand2 !== null && currOperator !== "") {
        if(currOperator === "/" && operand2 === 0) {
            display.value = "Error";
            clear();
            setClear = true;
            return;
        }

        let total = operate(currOperator, operand1, operand2);
        total = Math.round(total * 1000) / 1000;        
        display.value = total;
        setClear = true;
        hasBeenEvaluated = true;
    }
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
});

const keyActions = {
    ".": appendNumber,
    "0": appendNumber,
    "1": appendNumber,
    "2": appendNumber,
    "3": appendNumber,
    "4": appendNumber,
    "5": appendNumber,
    "6": appendNumber,
    "7": appendNumber,
    "8": appendNumber,
    "9": appendNumber,
    "+": setOperator,
    "-": setOperator,
    "*": setOperator,
    "/": setOperator,
    "Enter": evaluate,
    "Backspace": deleteNum,
    "Escape": clear,
    "C": clear,
    "c": clear,
    "Delete": clear,
};

document.addEventListener("keydown", e => {
    const action = keyActions[e.key];

    if(action) {
        action(e.key);
    }
})