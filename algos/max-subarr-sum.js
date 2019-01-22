var myArray = [1, -2, 3, 4, 5, -6, -7, 8];

function findSum(vals) {
	let sum = 0;
	for (let idx = 0; idx < vals.length; idx++) {
		sum += vals[idx];
	}
	return sum;
}

leftSum = findSum(myArray.slice(0,4));
rightSum = findSum(myArray.slice(4));

var leftMiddleSum = null;
for (let idx = 3; idx >= 0; idx--) {
	let curMiddleSum = findSum(myArray.slice(0+idx,idx+1));
	if ((leftMiddleSum == null) || (curMiddleSum > leftMiddleSum))
		leftMiddleSum = curMiddleSum;
}

var rightMiddleSum = null;
for (let idx = 4; idx < myArray.length; idx++) {
	let curMiddleSum = findSum(myArray.slice(0+idx,idx+1));
	if ((rightMiddleSum == null) || (curMiddleSum > rightMiddleSum))
		rightMiddleSum = curMiddleSum;
}
