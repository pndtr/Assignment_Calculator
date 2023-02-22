var equation = document.getElementById("input");
var result = document.getElementById("result");
var clear = document.getElementById("clear");
function addCharToEquation(char) {
    if (equation.value == "Infinity") {
        equation.value = "";
    }
    equation.value += char;
}
var Calculator = /** @class */ (function () {
    function Calculator(equation) {
        this.equation = equation;
    }
    Calculator.prototype.updateEquation = function (newEqu) {
        this.equation = newEqu;
    };
    Calculator.prototype.compute = function () {
        try {
            return equation ? eval(this.equation) : "Please enter a number";
        }
        catch (err) {
            return "Invalid Equation";
        }
    };
    return Calculator;
}());
var calculator = new Calculator(equation.value);
// equal button
result.addEventListener("click", function () {
    calculator.updateEquation(equation.value);
    equation.value = calculator.compute();
});
// clear button
clear.addEventListener("click", function () {
    equation.value = "";
});
