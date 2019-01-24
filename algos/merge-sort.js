/* Implementation of a merge sort */

function mergeSort() {
}

mergeSort.prototype.sortSublists = function(listA, listB) {
	let sortedList = []
	let aIdx = 0;
	let bIdx = 0;

	//console.log("LISTA", listA);
	//console.log("LISTB", listB);

	while ((aIdx < listA.length) && (bIdx < listB.length)) {
		if (listA[aIdx] <= listB[bIdx]) {
			sortedList.push(listA[aIdx]);
			aIdx++;
		} else if (listB[bIdx] <= listA[aIdx]) {
			sortedList.push(listB[bIdx]);
			bIdx++;
		}
	}

	if (aIdx == listA.length) {
		sortedList = sortedList.concat(listB.slice(bIdx));
	} else if (bIdx == listB.length) {
		sortedList = sortedList.concat(listA.slice(aIdx));
	}

	return sortedList;
}

var myList = [6,5,3,2,1,4,8,7];
for (let i = 0; i < 800; i++) myList.push(Math.random()*1000);

console.time("algo");
var sortedList = [];
var merge_sort = new mergeSort();
var subArraySize = 2;
var curIdx = 0;

sortedList = myList;

//console.log(myList);

while (subArraySize/2 < (myList.length)) {
	let currentSortedList = [];
	while (curIdx < myList.length) {
		let curSorted = merge_sort.sortSublists(
			sortedList.slice(curIdx, curIdx + subArraySize/2),
			sortedList.slice(curIdx + subArraySize/2, curIdx + subArraySize)
		);
		currentSortedList = currentSortedList.concat(curSorted);
		curIdx += subArraySize;
	}
	sortedList = currentSortedList;
	subArraySize = subArraySize*2;
	curIdx = 0;
}
console.timeEnd("algo");
