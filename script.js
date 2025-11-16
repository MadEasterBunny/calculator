const container = document.getElementById("container");

const buttons = ["&#x232B;", "C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
const operators = ["+", "-", "*", "/"];

for(let i = 0; i < buttons.length; i++) {
    const button = document.createElement("button");
    button.innerHTML = buttons[i];
    button.value = buttons[i]

    if(operators.includes(button.value)) {
        button.classList.add("operator");
    }

    if(["&#x232B;", "C"].includes(button.value)) {
        button.classList.add("clearDelBtn");
    }
    
    container.appendChild(button);
}