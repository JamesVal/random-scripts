/* Testing how much slower this is */

var myArray = [];
var myArray2 = [];

for (let i = 0; i < 8192; i++) {
	let rando = Math.random() * 100;
	myArray.push(rando);
	myArray2.push(rando);
}

var arraySize = 2;
var arrayIncrement = 1;
var doubleArraySize  = myArray.length * 2;

function sumArray(arr, idx, arrayIncrement) {
	arr[idx] = arr[idx] + arr[idx + arrayIncrement];
}

console.time("test");
while (arraySize < doubleArraySize) {
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
let sum2 = 0;
for (let i = 0; i < myArray2.length; i++) {
	sum2 += myArray2[i];
}
console.timeEnd("test2");
//console.log(myArray2);
console.log(sum2);