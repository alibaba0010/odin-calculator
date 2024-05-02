let firstNumber = 0;
let secondNumber = 0;
// let operator = null;
let value1 = 0;
let value2 = "";
let operator = "";
let result = 0;
const numberBtns = document.querySelectorAll(".no");
const display = document.getElementById("display");
let clearDisplay = false;
numberBtns.forEach((btn) => {
  checkValue(btn);
});

function checkValue(value) {
  const btnValue = value.textContent;
  value.addEventListener("click", () => {
    if (display.value === "0") {
      display.value = "";
    }
    display.value += btnValue;
    if (isNaN(btnValue) && btnValue !== ".") {
      display.btnValue = "enter a number";
    }
  });
}
