document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "0";
  let previousInput = "";
  let operator = "";

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function handleNumberClick(number) {
    if (currentInput === "0") {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function handleOperatorClick(op) {
    if (operator && previousInput) {
      calculate();
    }
    previousInput = currentInput;
    operator = op;
    currentInput = "0";
  }

  function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
      case "+":
        currentInput = (num1 + num2).toString();
        break;
      case "-":
        currentInput = (num1 - num2).toString();
        break;
      case "*":
        currentInput = (num1 * num2).toString();
        break;
      case "/":
        currentInput = num2 === 0 ? "Error" : (num1 / num2).toString();
        break;
    }

    operator = "";
    previousInput = "";
    updateDisplay();
  }

  function handleEqualsClick() {
    calculate();
  }

  function clear() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    updateDisplay();
  }

  function backspace() {
    if (currentInput.length === 1) {
      currentInput = "0";
    } else {
      currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
  }

  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => handleNumberClick(button.dataset.number));
  });

  document.querySelectorAll("[data-operator]").forEach((button) => {
    button.addEventListener("click", () => handleOperatorClick(button.dataset.operator));
  });

  document.getElementById("equals").addEventListener("click", handleEqualsClick);
  document.getElementById("clear").addEventListener("click", clear);
  document.getElementById("backspace").addEventListener("click", backspace);
  document.getElementById("decimal").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay();
    }
  });

  updateDisplay();
});
