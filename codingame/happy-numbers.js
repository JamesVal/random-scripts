/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var allVals = [];
var resultEmote = [":)", ":("];

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
  let result = 0;

  while (result == 0) {
    curVal = getDigitSquareSum(curVal);

    if (curVal == 1) result = 1;
    else if (previousResults.indexOf(curVal) != -1) result = 2;

    previousResults.push(curVal);
  }

  return result;
}

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    const x = readline();
    allVals.push(x);
}

for (let i = 0; i < N; i++) {
  let result = determineHappy(allVals[i]);
  console.log(allVals[i] + " " + resultEmote[result-1]);
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

/*console.log('23 :)');*/