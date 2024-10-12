document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  const display = document.querySelector(".current-operand");
  let previousOperandDisplay = document.querySelector(".previous-operand");
  function updateDisplay() {
    if (display.textContent.length <= 11) {
      display.textContent = calculator.displayValue;
    } else {
      return;
    }
  }

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      console.log("Display value: ", calculator.displayValue);
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
        displayValue === "0" ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = "0.";
      calculator.waitingForSecondOperand = false;
      return;
    }

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }

  function calculate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
      return firstOperand + secondOperand;
    } else if (operator === "-") {
      return firstOperand - secondOperand;
    } else if (operator === "×") {
      return firstOperand * secondOperand;
    } else if (operator === "÷") {
      return firstOperand / secondOperand;
    }

    return secondOperand;
  }

  function resetCalculator() {
    previousOperandDisplay.innerHTML = "";
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  function updatePreviousOperand() {
    if (calculator.firstOperand !== null && calculator.operator) {
      previousOperandDisplay.textContent = `${calculator.firstOperand} ${calculator.operator}`;
    } else {
      previousOperandDisplay.textContent = "";
    }
  }

  function handleKeypad(target) {
    if (!target.matches("button")) {
      return;
    }

    if (target.classList.contains("digit")) {
      inputDigit(target.textContent);
      updateDisplay();
      return;
    }

    if (target.classList.contains("function")) {
      const action = target.dataset.action;
      if (action === "clear") {
        resetCalculator();
      } else if (action === "toggle-sign") {
        calculator.displayValue = (
          parseFloat(calculator.displayValue) * -1
        ).toString();
      } else if (action === "percentage") {
        calculator.displayValue = (
          parseFloat(calculator.displayValue) / 100
        ).toString();
      } else if (action === "backspace") {
        calculator.displayValue = calculator.displayValue.slice(0, -1) || "0";
      }
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      const action = target.dataset.action;
      if (action === "equals") {
        handleOperator(null);
      } else {
        handleOperator(target.textContent);
      }
      updateDisplay();
      updatePreviousOperand();
      return;
    }

    if (target.textContent === ".") {
      inputDecimal(target.textContent);
      updateDisplay();
      return;
    }
  }

  const keypad = document.querySelector(".keypad");
  keypad.addEventListener("click", (event) => {
    handleKeypad(event.target);
  });

  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("light-theme");
  });
});
