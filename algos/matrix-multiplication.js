/* Just a small template for divide-and-conquer algorithms, as they always seem to use this pattern (I'm trying to avoid using recursion!) */

/*
var matrixA = [
	[1, 2, 5, 6],
	[3, 4, 7, 8],
	[1, 2, 5, 6],
	[3, 4, 7, 8]
];

var matrixB = [
	[1, 2, 5, 6],
	[3, 4, 7, 8],
	[1, 2, 5, 6],
	[3, 4, 7, 8]
];
*/

function rowColMultiply(mA, mB, rowIdx, colIdx) {
	let result = 0;
	for (let idx = 0; idx < mA.length; idx++) {
		result += mA[rowIdx][idx] * mB[colIdx][idx];
	}
	return result;
}

function matrixMultiply(mA, mB) {
	let resultMatrix = [];

	for (let rowIdx = 0; rowIdx < mA.length; rowIdx++) {
		let curRow = [];
		for (let colIdx = 0; colIdx < mA.length; colIdx++) {
			 curRow.push(rowColMultiply(mA, mB, rowIdx, colIdx));
		}
		resultMatrix.push(curRow);
	}

	return resultMatrix; 
}

var matrixA = [];
var matrixB = [];

var n = 16;

for (let i = 0; i < n; i++) {
	let curRow = [];
	for (let j = 0; j < n; j++) {
		curRow.push(Math.floor(Math.random()*10));
	}
	matrixA.push(curRow);
}
for (let i = 0; i < n; i++) {
	let curRow = [];
	for (let j = 0; j < n; j++) {
		curRow.push(Math.floor(Math.random()*10));
	}
	matrixB.push(curRow);
}

console.time("test1");

let matrixSize = 2;
let resultMatrix = initResultMatrix(matrixA, matrixB);

//console.log("init", resultMatrix);

while ((matrixSize) < (matrixA.length/2)) {
	let rowStartIdx = 0;
	let rowEndIdx = rowStartIdx + matrixSize; 
	let colStartIdx = 0;
	let colEndIdx = colStartIdx + matrixSize; 

	/* This will need a condition to break out of the loop! It will either replace (true) or will be implemented as a break somewhere in here */
	while (true) {
		let currentMatrix = resultMatrix; 
		//matrixAddition(currentMatrix, resultMatrix, rowStartIdx, colStartIdx, matrixSize);

		console.log("rowStartIdx", rowStartIdx);
		console.log("rowEndIdx", rowEndIdx);
		console.log("colStartIdx", colStartIdx);
		console.log("colEndIdx", colEndIdx);

		colStartIdx += matrixSize;
		colEndIdx += matrixSize;

		if (colEndIdx > matrixA.length) {
			rowStartIdx += matrixSize;
			rowEndIdx += matrixSize;
			colStartIdx = 0;
			colEndIdx = colStartIdx + matrixSize; 
		}

		if (rowEndIdx > matrixA.length) break;
	}

	//console.log(resultMatrix);

	matrixSize = 2 * matrixSize;
}

console.timeEnd("test1");
//console.log(resultMatrix);

/* Brute Force Check */
function rowColMultiplyB(mA, mB, rowIdx, colIdx) {
	let result = 0;
	for (let idx = 0; idx < mA.length; idx++) {
		result += mA[rowIdx][idx] * mB[colIdx][idx];
	}
	return result;
}

function matrixMultiplyB(mA, mB) {
	let resultMatrix2 = [];

	for (let rowIdx = 0; rowIdx < mA.length; rowIdx++) {
		let curRow = [];
		for (let colIdx = 0; colIdx < mA.length; colIdx++) {
			 curRow.push(rowColMultiplyB(mA, mB, rowIdx, colIdx));
		}
		resultMatrix2.push(curRow);
	}

	return resultMatrix2; 
}
console.time("test2");
let bruteResult = matrixMultiplyB(matrixA, matrixB);
//console.log(bruteResult);
console.timeEnd("test2");
//console.log(bruteResult);