class Calculator {
  constructor(prevOperandandTextElement, currentOperandandTextElement) {
    this.prevOperandandTextElement = prevOperandandTextElement;
    this.currentOperandandTextElement = currentOperandandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    const floatNumber = parseFloat(number);

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return integerDisplay + "." + decimalDigits;
    } else {
      return integerDisplay;
    }
    //if (isNaN(floatNumber)) return "";
    //return floatNumber.toLocaleString("en");
  }
  updateDisplay() {
    this.currentOperandandTextElement.innerHTML = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.prevOperandandTextElement.innerHTML =
        this.getDisplayNumber(this.previousOperand) + this.operation;
    } else {
      this.prevOperandandTextElement.innerHTML = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevOperandandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  prevOperandandTextElement,
  currentOperandandTextElement
);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  })
);

operationButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  })
);

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  console.log("delete");
  calculator.delete();
  calculator.updateDisplay();
});
