var equation = <HTMLInputElement>document.getElementById("input");
var result = <HTMLElement>document.getElementById("result");
var clear = <HTMLElement>document.getElementById("clear");

function addCharToEquation(char) {
  equation.value += char;
}

class Calculator {
  public equation: string;

  constructor(equation: string) {
    this.equation = equation;
  }

  updateEquation(newEqu: string) {
    this.equation = newEqu;
  }

  compute() {
    try {
      return equation ? eval(this.equation) : "Please enter a number";
    } catch (err) {
      return "Invalid Equation";
    }
  }
}

let calculator = new Calculator(equation.value);

// equal button
result.addEventListener("click", function () {
  calculator.updateEquation(equation.value);

  equation.value = calculator.compute();
});

// clear button
clear.addEventListener("click", function () {
  equation.value = "";
});
