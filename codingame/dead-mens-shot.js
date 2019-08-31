/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function LineSegment(X1, Y1, X2, Y2) {
	this.startX = X1;
	this.startY = Y1;
	this.endX = X2;
	this.endY = Y2;
}

LineSegment.prototype.inRange = function inRange(x, y) {
	let retVal = false;

	if (((x >= this.startX) && (x <= this.endX)) && ((y >= this.startY) && (y <= this.endY)))
		retVal = true;

	return retVal;
}

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
}



const M = parseInt(readline());
for (let i = 0; i < M; i++) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
}

// Write an action using print()
// To debug: printErr('Debug messages...');

print('hit_or_miss');