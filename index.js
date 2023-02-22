var equation = document.getElementById("input");
var number = document.querySelectorAll(".numbers div");
var operator = document.querySelectorAll(".operators div");
var result = document.getElementById("result");
var clear = document.getElementById("clear");
var resultDisplayed = false;

// click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    var currentString = equation.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
        equation.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      resultDisplayed = false;
      equation.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      equation.innerHTML = "";
      equation.innerHTML += e.target.innerHTML;
    }
  });
}

// adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    // storing current input string and its last character in variables - used later
    var currentString = equation.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
        equation.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an operator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      equation.innerHTML += e.target.innerHTML;
    }
  });
}

// click equal button
result.addEventListener("click", function() {
  var strEquation = equation.innerHTML;

  // split numbers to array from the original equation string
  var numbers = strEquation.split(/\+|\-|\×|\÷/g);

  // split operators to array from the original equation string
  var operators = strEquation.replace(/[0-9]|\./g, "").split("");

  console.log(strEquation);
  console.log(numbers);
  console.log(operators);
  console.log('-------------------------');

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alternating the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    console.log(numbers);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    console.log(numbers);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    console.log(numbers);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    console.log(numbers);
    add = operators.indexOf("+");
  }

  equation.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clear button
clear.addEventListener("click", function() {
  input.innerHTML = "";
});
