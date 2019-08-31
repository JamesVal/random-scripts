/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var allVals = [];

function getDigitSquareSum(val) {
  let myStr = val.toString();
  let squareArr = [];
  let sumVal;

  for (let i = 0; i < myStr.length; i++) {
    let curVal = parseInt(myStr[i]);
    squareArr.push(curVal*curVal);
  }

  sumVal = squareArr.reduce((total, val) => {
    return total + val;
  })

  return sumVal;
}

function determineHappy(val) {
  let previousResults = [];
  let curVal = val;

  
}

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    const x = readline();
    allVals.push(x);
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log('23 :)');