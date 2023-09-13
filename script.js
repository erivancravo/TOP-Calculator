//____Functions_______________________________________________
function select(value) {
  const equation = document.querySelector('div#inputDisplay');
  equation.innerText = equation.innerText + value;
}

function divide(n1, n2) {
  parseFloat(n1);
  parseFloat(n2);
  return n1 / n2;
}

function multiply() {
  parseFloat(n1);
  parseFloat(n2);
  return n1 * n2;
}

function add(n1, n2) {
  parseFloat(n1);
  parseFloat(n2);
  return n1 + n2;
}

function subtract() {
  parseFloat(n1);
  parseFloat(n2);
  return n1 - n2;
}

function idkYet(equation, operator) {
  let equation2 = equation.slice();
  const operatorIndex = equation2.indexOf(operator);
  let operand1 = '';
  let i;
  for(i = operatorIndex - 1; i >= 0; i--) {
    if(isNaN(equation2[i]) === false) {
      operand1 = equation2[i] + operand1;
    } else {
      break;
    }
  }
  // 0 1 2 3 4 5 6 7 8 9 10 11
  // 2 4 + 1 2 0 / 1 2 + 1  6 
  let operand2 = '';
  let j;
  for(j = operatorIndex + 1; j < equation2.length; j++) {
    if(isNaN(equation2[j]) === false) {
      operand2 += equation2[j];
    } else {
      break;
    }
  }

  i += 1;
  equation2.splice(i, (j - i));
  const newPosition = i;
  if(operator === '*') {
    const result = multiply(operand1, operand2);
    equation2.splice(newPosition, 0, result);
  } else if(operator === '/') {
    const result = divide(operand1, operand2);
    equation2.splice(newPosition, 0, result);
  } else if(operator === '+') {
    const result = add(operand1, operand2);
    equation2.splice(newPosition, 0, result);
  } else {
    const result = subtract(operand1, operand2);
    equation2.splice(newPosition, 0, result);
  }
  return equation2;
}

function calculate() {
  //--------------------------------------------------------------------------
  const display = document.querySelector('div#inputDisplay');
  const equation = display.innerText;
  let changingEq = equation.split('');
  console.log(changingEq);
  console.log(changingEq.indexOf('/'));
  while() {
    let idxDivide = changingEq.indexOf('/');
    let idxMult = changingEq.indexOf('*');
    console.log(idxMult);
    if(idxMult !== -1 && idxDivide !== -1) {
      if(idxMult < idxDivide) {
        changingEq = idkYet(changingEq, '*');
        console.log(changingEq + ' to doidão');
      } else if(idxDivide < idxMult) {
        changingEq = idkYet(changingEq, '/');
        console.log(changingEq + ' heyhey');
      }
    } else if(idxMult !== -1 && idxDivide === -1) {
      changingEq = idkYet(changingEq, '*');
      console.log(changingEq + ' to doidão bagarai');
    } else if(idxMult === -1 && idxDivide !== -1) {
      changingEq = idkYet(changingEq, '/');
      console.log(changingEq + ' heyhey cheguei');
    }
  }
}