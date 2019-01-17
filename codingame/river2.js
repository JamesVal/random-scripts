/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const r1 = parseInt(readline());

function getNextVal(val) {
	let curVal = val;
	let summation = 0;
	valStr = val.toString();
	for (let i = 0; i < valStr.length; i++) {
		summation += parseInt(valStr[i]);
	}
	return (curVal + summation);
}

var startVal = r1-1;
var is_unique = true;
var curVal = startVal;

var maxChecks = 9 * r1.toString().length;

while ((curVal > (r1-maxChecks)) && (curVal > 0)) {
	let newVal = getNextVal(curVal);
	if (newVal == r1) {
		is_unique = false;
		break;
	}
	curVal--;
}

if (is_unique) print("NO");
else print("YES");

// Write an action using print()
// To debug: printErr('Debug messages...');