/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function CostAdd() {
	this.totalCost = 0;
	this.costList = [];
}

CostAdd.prototype.addAll = function (values) {
	values.sort((a,b) => {
		return a-b;
	});

	while (values.length >= 2 ) {
		let val1 = values.shift();
		let val2 = values.shift();
		let currentCost = val1 + val2;
		let inserted = false;
		this.costList.push(currentCost);
		for (let i = 0; i < values.length; i++) {
			if (currentCost < values[i]) {
				values.splice(i, 0, currentCost);
				inserted = true;
				break;
			}
		}
		if (!inserted) {
			values.push(currentCost);
		}
	}

	this.totalCost = 0;
	for (let i = 0; i < this.costList.length; i++) {
		this.totalCost += this.costList[i];
	}

	return this.totalCost;
}

var allVals = new Array();

const N = parseInt(readline());
var inputs = readline().split(' ');
for (let i = 0; i < N; i++) {
    const x = parseInt(inputs[i]);
    printErr(x);
    allVals.push(x);
}

var costAdd = new CostAdd();

var totalCost = costAdd.addAll(allVals);

// Write an action using print()
// To debug: printErr('Debug messages...');

print(totalCost);