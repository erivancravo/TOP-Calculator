//____Functions_______________________________________________
function select(value) {
  const equation = document.querySelector('div#inputDisplay');
  equation.innerText = equation.innerText + value;
}

function contarFrequencia(array, element) {
  let contador = 0;
  // Percorra o array
  for (let i = 0; i < array.length; i++) {
    // Verifique se o elemento atual é igual ao elemento desejado
    if (array[i] === element) {
      contador++;
    }
  }
  return contador;
}

function divide(n1, n2) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  return n1 / n2;
}

function multiply(n1, n2) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  return n1 * n2;
}

function add(n1, n2) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  return n1 + n2;
}

function subtract(n1, n2) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  return n1 - n2;
}

function clearing() {
  const display = document.querySelector('div#inputDisplay');
  display.innerText = '';
}

function deleting() {
  const display = document.querySelector('div#inputDisplay');
  display.innerText = display.innerText.slice(0, -1);

}

function idkYet(equation, operator, counter) {
  let operatorIndex = equation.indexOf(operator);
  let operand1 = '';
  let i;
  for(i = operatorIndex - 1; i >= 0; i--) {
    if(isNaN(equation[i]) === false || equation[i] === '.') {
      operand1 = equation[i] + operand1;
    } else {
      break;
    }
  }
  // 0 1 2 3 4 5 6 7 8 9 10 11
  // 2 4 + 1 2 0 / 1 2 + 1  6 
  let operand2 = '';
  let j;
  for(j = operatorIndex + 1; j < equation.length; j++) {
    if(isNaN(equation[j]) === false || equation[j] === '.') {
      operand2 += equation[j];
    } else {
      break;
    }
  }

  i += 1;
  equation.splice(i, (j - i));
  let newPosition = i;
  if(operator === '*') {
    let result = multiply(operand1, operand2);
    counter--;
    equation.splice(newPosition, 0, result);
  } else if(operator === '/') {
    let result = divide(operand1, operand2);
    counter--;
    equation.splice(newPosition, 0, result);
  } else if(operator === '+') {
    let result = add(operand1, operand2);
    counter--;
    equation.splice(newPosition, 0, result);
  } else {
    let result = subtract(operand1, operand2);
    counter--;
    equation.splice(newPosition, 0, result);
  }
  return equation;
}

function calculate() {
  //--------------------------------------------------------------------------
  const display = document.querySelector('div#inputDisplay');
  const equation = display.innerText;
  let changingEq = equation.split('');
  let countDivide = contarFrequencia(changingEq, '/');
  let countMultiply = contarFrequencia(changingEq, '*');

  for(let i = 0; i < countDivide + countMultiply; i++) {
    let idxDivide = changingEq.indexOf('/');
    let idxMult = changingEq.indexOf('*');
    if(idxMult !== -1 && idxDivide !== -1) {
      if(idxMult < idxDivide) {
        changingEq = idkYet(changingEq, '*', countMultiply);
        //console.log(changingEq + ' to doidão');
      } else if(idxDivide < idxMult) {
        changingEq = idkYet(changingEq, '/', countDivide);
        //console.log(changingEq + ' heyhey');
      }
    } else if(idxMult !== -1 && idxDivide === -1) {
      changingEq = idkYet(changingEq, '*', countMultiply);
      //console.log(changingEq + ' to doidão bagarai');
    } else if(idxMult === -1 && idxDivide !== -1) {
      changingEq = idkYet(changingEq, '/', countDivide);
      console.log(changingEq + ' heyhey cheguei');
    }
  }

  let countAdd = contarFrequencia(changingEq, '+');
  let countSub = contarFrequencia(changingEq, '-');
  for(let j = 0; j < countAdd + countSub; j++) {
    let idxAdd = changingEq.indexOf('+');
    let idxSub = changingEq.indexOf('-');
    if(idxAdd !== -1 && idxSub !== -1) {
      if(idxAdd < idxSub) {
        changingEq = idkYet(changingEq, '+', countAdd);
      } else {
        changingEq = idkYet(changingEq, '-', countSub);
      } 
    } else if(idxAdd !== -1 && idxSub === -1) {
      changingEq = idkYet(changingEq, '+', countAdd);
    } else if(idxAdd === -1 && idxSub !== -1) {
      changingEq = idkYet(changingEq, '-', countSub);
    } 
  }

  alert('O resultado é: ' + changingEq);
  clearing();
}

alert('Infeliz não digite expressão errada como "1++1" ou "3/+5**8"');