/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var lineArray = new Array();

var inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
for (let i = 0; i < H; i++) {
	const line = readline();
	
	let newLine = new Array();
	for (let i = 0; i < line.length; i++) {
		newLine.push(line[i]);
	}
	lineArray.push(newLine);
	//printErr(line);
}

var startPoints = new Array();

for (let i = 0; i < lineArray[0].length; i++) {
	if (lineArray[0][i] != " ") {
		startPoints.push(i);
	}
}

for (let i = 0; i < startPoints.length; i++) {
	let currentX = startPoints[i];
	let startChar = lineArray[0][currentX];
	//printErr("StartX:", currentX);
	for (let lineIdx = 1; lineIdx < lineArray.length; lineIdx++) {
		//printErr("curX:", currentX, "lineIdx:", lineIdx);
		if ((currentX > 0) && (lineArray[lineIdx][currentX - 1] != " ")) {
			while ((lineArray[lineIdx][currentX - 1] != " ") && (currentX > 0)) {
				//printErr("LEFT", currentX);
				currentX--;
			}
		} else if (((currentX+1) < lineArray[lineIdx].length) && (lineArray[lineIdx][currentX + 1] != " ")) {
			while ((lineArray[lineIdx][currentX + 1] != " ") && ((currentX+1) < lineArray[lineIdx].length)) {
				//printErr("RIGHT", currentX);
				currentX++;
			}
		}
	}
	//printErr(currentX);
	let endChar = lineArray[lineArray.length-1][currentX];
	//printErr(startChar+endChar);
	print(startChar+endChar);
}

// Write an action using print()
// To debug: printErr('Debug messages...');