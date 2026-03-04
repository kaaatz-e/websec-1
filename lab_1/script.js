const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const form = document.getElementById("calculate");
const resultsDiv = document.getElementById("results");

let history = [];

form.addEventListener("click", function(event) {
    event.preventDefault();
    if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

    calculate();
})

function calculate() {
    const num1 = Number(num1Input.value);
    const num2 = Number(num2Input.value);
    const operation = operationSelect.value;

    let result;

    if (operation === "/" && num2 === 0) {
        alert("Деление на ноль!");
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