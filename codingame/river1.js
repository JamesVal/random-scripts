/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const r1 = parseInt(readline());
const r2 = parseInt(readline());

var val1 = r1;
var val2 = r2;

function getNextVal(val) {
	let curVal = val;
	let summation = 0;
	valStr = val.toString();
	for (let i = 0; i < valStr.length; i++) {
		summation += parseInt(valStr[i]);
	}
	return (curVal + summation);
}

while (val1 != val2) {
	if (val1 < val2) {
		val1 = getNextVal(val1);
	} else if (val1 > val2) {
		val2 = getNextVal(val2);
	}
}

print (val1);

// Write an action using print()
// To debug: printErr('Debug messages...');

