/*var myArray = [3, 9, -12, 6, -2, 10, 5];*/

var myArray = [];
for (let i = 0; i < 800; i++) {
	let isNegative = (Math.random() > .5);
	let curVal = Math.random()*10;
	
	if (isNegative) curVal *= -1;
	myArray.push(curVal);
}

function areaSum(startIdx, endIdx, sum) {
	this.startIdx = startIdx;
	this.endIdx = endIdx;
	this.sum = sum 
}

function findAreaSum(array, startIdx, endIdx) {
	let sum = 0;
	if (startIdx == endIdx) {
		let newAreaSum = new areaSum(startIdx, endIdx, array[startIdx]);
	}
	for (let idx = startIdx; idx <= endIdx; idx++) {
		sum += array[idx];
	}
	let newAreaSum = new areaSum(startIdx, endIdx, sum);
	return newAreaSum;
}

function midAreaLeftSum(array, startIdx, endIdx) {
	let greatestSum = null;
	for (let idx = endIdx; idx >= startIdx; idx--) {
		let curSum = findAreaSum(array, idx, endIdx);
		if ((greatestSum == null) || (curSum.sum > greatestSum.sum)) greatestSum = curSum;
	}
	return greatestSum;
}

function midAreaRightSum(array, startIdx, endIdx) {
	let greatestSum = null;
	for (let idx = startIdx; idx <= endIdx; idx++) {
		let curSum = findAreaSum(array, startIdx, idx);
		if ((greatestSum == null) || (curSum.sum > greatestSum.sum)) greatestSum = curSum;
	}
	return greatestSum;
}

console.time("test");

let currentMaxAreaSum = null;
let arraySize = 2;

while ((arraySize/2) < myArray.length) {

	let startIdx = 0;
	let endIdx = (startIdx + arraySize)-1;
	let halfArraySize = arraySize/2;
	let midLeftEndIdx = (startIdx+halfArraySize)-1;
	let midRightStartIdx = (startIdx+halfArraySize);

	while (true) {

		let leftAreaSum = findAreaSum(myArray, startIdx, midLeftEndIdx);
		let rightAreaSum = findAreaSum(myArray, midRightStartIdx, endIdx);
		let _midAreaLeftSum = midAreaLeftSum(myArray, startIdx, midLeftEndIdx);
		let _midAreaRightSum = midAreaRightSum(myArray, midRightStartIdx, endIdx);
		let midAreaSum = new areaSum(_midAreaLeftSum.startIdx, _midAreaRightSum.endIdx, _midAreaLeftSum.sum+_midAreaRightSum.sum);

		if (currentMaxAreaSum == null) currentMaxAreaSum = leftAreaSum;
		if (leftAreaSum.sum >= currentMaxAreaSum.sum) currentMaxAreaSum = leftAreaSum;
		if (rightAreaSum.sum >= currentMaxAreaSum.sum) currentMaxAreaSum = rightAreaSum;
		if (midAreaSum.sum >= currentMaxAreaSum.sum) currentMaxAreaSum = midAreaSum;

		if ((startIdx >= myArray.length-1) || (endIdx >= myArray.length-1)) break;

		startIdx += arraySize;
		endIdx += arraySize;
		midLeftEndIdx = (startIdx+halfArraySize)-1;
		midRightStartIdx = (startIdx+halfArraySize);

		if (startIdx >= myArray.length) startIdx = myArray.length-1;
		if (endIdx >= myArray.length) endIdx = myArray.length-1;
		if (midLeftEndIdx >= myArray.length) midLeftEndIdx = myArray.length-1;
		if (midRightStartIdx >= myArray.length) midRightStartIdx = myArray.length-1;

		//console.log("allVars:", arraySize, startIdx, endIdx, halfArraySize, midLeftEndIdx, midRightStartIdx);
		//console.log("allSums:", leftAreaSum, rightAreaSum, _midAreaLeftSum, _midAreaRightSum, midAreaSum);
		//console.log("curMax:", currentMaxAreaSum);
	}

	arraySize = 2*arraySize;
}

console.log("Final Max:", currentMaxAreaSum);

console.timeEnd("test");

/* Brute - Force verify */

console.time("test2");

currentMaxAreaSum = null;
for (let i = 0; i < myArray.length; i++) {
	for (let j = 0; j < myArray.length; j++) {
		let curSum = findAreaSum(myArray, i, j);
		if ((currentMaxAreaSum == null) || (curSum.sum >= currentMaxAreaSum.sum)) currentMaxAreaSum = curSum;
	}
}

console.log("Final Max #2:", currentMaxAreaSum);

console.timeEnd("test2");
