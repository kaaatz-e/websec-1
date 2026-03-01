const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const calculateBtn = document.getElementById("calculate");
const resultsDiv = document.getElementById("results");

let history = [];

function validateInput(input) {
    const value = input.value.trim();
    const errorMessage = input.parentElement.querySelector(".error-message");

    if (value === "") {
        input.classList.add("error");
        errorMessage.textContent = "Поле не должно быть пустым";
        return false;
    }

    if (isNaN(value)) {
        input.classList.add("error");
        errorMessage.textContent = "Введите число";
        return false;
    }

    input.classList.remove("error");
    errorMessage.textContent = "";
    return true;
}

function calculate() {
    const valid1 = validateInput(num1Input);
    const valid2 = validateInput(num2Input);

    if (!valid1 || !valid2) return;

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    let result;

    if (operation === "/" && num2 === 0) {
        num2Input.classList.add("error");
        num2Input.parentElement.querySelector(".error-message").textContent = "Деление на ноль!";
        return;
    }

    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
    }

    const expression = `${num1} ${operation} ${num2} = ${result}`;
    history.push(expression);

    if (history.length > 7) history.shift();

    renderHistory();
}

function renderHistory() {
    resultsDiv.innerHTML = "";

    history.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = item;
        div.classList.add("result-item");
        if (index === history.length - 1) {
            div.classList.add("result-item");
        } else {
            div.classList.add("old");
        }
        resultsDiv.appendChild(div);
    });
}

calculateBtn.addEventListener("click", calculate);