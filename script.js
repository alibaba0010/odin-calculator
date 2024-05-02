let firstNumber = 0;
let secondNumber = 0;
// let operator = null;
let value1 = 0;
let value2 = "";
let operator = "";
let result = 0;
const btns = document.querySelectorAll(".btn");
const display = document.getElementById("display");
let clearDisplay = false;

btns.forEach((btn) => {
  const btnValue = btn.textContent;
  btn.addEventListener("click", () => {
    display.value += btnValue;
    if (isNaN(btnValue) && btnValue !== ".") {
      display.btnValue = "enter a number";
    }
  });
});

function pressNumber(num) {
  if (operator === null) {
    firstNumber = firstNumber * 10 + Number(num);
    updateDisplay(firstNumber);
  } else {
    secondNumber = secondNumber * 10 + Number(num);
    updateDisplay(secondNumber);
  }
}

function pressOperator(op) {
  operator = op;
  updateDisplay(op);
}

function updateDisplay(val) {
  document.getElementById("display").innerText = val;
}

function calculate() {
  if (operator && secondNumber !== null) {
    const result = operate(operator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    secondNumber = 0;
    operator = null;
  }
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return num2 !== 0 ? divide(num1, num2) : "Err";
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// function clearDisplay() {
//   firstNumber = 0;
//   secondNumber = 0;
//   operator = null;
//   updateDisplay(0);
// }
