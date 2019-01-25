var myArray = [];
var myArray_b = [];
var myArray2 = [];
var myArray2_b = [];
var answerArray = [];
var answerArray2 = [];

for (let i = 0; i < 8; i++) {
	let rando = Math.floor(Math.random() * 10);
	let rando2 = Math.floor(Math.random() * 10);
	myArray.push(rando);
	myArray2.push(rando);
	myArray_b.push(rando2);
	myArray2_b.push(rando2);
	answerArray.push(0);
	answerArray2.push(0);
}

var arraySize = 2;
var arrayIncrement = 1;
var totalRun = myArray.length * 2;

function sumArray(arr, idx, arrayIncrement) {
	arr[idx] = arr[idx] + arr[idx + arrayIncrement];
}

console.time("test");
while (arraySize < totalRun) {
	let startIdx = 0;
	while (true) {
		sumArray(myArray, startIdx, arrayIncrement);

		startIdx += arraySize;

		if (startIdx >= myArray.length) break;
	}

	arrayIncrement += arrayIncrement;
	arraySize += arraySize;
}
console.timeEnd("test");
console.log(myArray[0]);

/* Brute Force Validate */
console.time("test2");
for (let i = 0; i < myArray2.length; i++) {
	for (let j = 0; j < myArray2_b.length; j++) {
		answerArray2[i] += myArray2[i] * myArray2_b[j];
	}
}
console.timeEnd("test2");
console.log(myArray2);
console.log(myArray2_b);
console.log(answerArray2);
