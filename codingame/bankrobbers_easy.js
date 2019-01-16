/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var vaultArray = new Array();
var robberArray = new Array();

function Robber(idx) {
	this.totalTime = 0;
	this.timeToFinish;
	this.vaultIdx = -1;
}

Robber.prototype.setVaultIndex = function (idx, timeToFinish) {
	this.vaultIdx = idx;
	this.timeToFinish = timeToFinish;
}

Robber.prototype.addTime = function(timeToAdd) {
	this.totalTime += timeToAdd;
	if (this.timeToFinish) this.timeToFinish -= timeToAdd;
}

Robber.prototype.getTimeToFinish = function() {
	return this.timeToFinish;
}

function Vault(idx, totalChars, totalNumbers) {
	this.idx = idx;
	this.totalChars = totalChars;
	this.totalNumbers = totalNumbers;

	let totalNumberCombos = 1;
	let totalVowelCombos = 1;

	if (this.totalNumbers) {
		totalNumberCombos = Math.pow(10, this.totalNumbers);
	}

	if ((this.totalChars-this.totalNumbers) > 0) {
		totalVowelCombos = Math.pow(5, (this.totalChars-this.totalNumbers));
	}

	this.totalCombos = totalNumberCombos*totalVowelCombos;
	//printErr(this.totalCombos);
}

Vault.prototype.getTotalCombos = function() {
	return this.totalCombos;
}

const R = parseInt(readline());
for (let i = 0; i < R; i++) {
	let newRobber = new Robber(i);

	robberArray.push(newRobber);
}

const V = parseInt(readline());
for (let i = 0; i < V; i++) {
	var inputs = readline().split(' ');
	const C = parseInt(inputs[0]);
	const N = parseInt(inputs[1]);

	//printErr(C);
	//printErr(N);

	var newVault = new Vault(i, C, N);

	vaultArray.push(newVault);
}

//printErr(R);
//printErr(V);

/* Actual algorithm begins here */

var nextVaultIdx = 0;
var calculateTime = true;

for (let idx = 0; idx < robberArray.length; idx++) {
	if (idx < vaultArray.length) {
		robberArray[idx].setVaultIndex(nextVaultIdx, vaultArray[nextVaultIdx].getTotalCombos());
		nextVaultIdx++;
	}
}

while (calculateTime) {
	let shortestTimeToFinish = null;
	for (let idx = 0; idx < robberArray.length; idx++) {
		if (robberArray[idx].vaultIdx >= 0) {
			if (!shortestTimeToFinish) {
				shortestTimeToFinish = robberArray[idx].getTimeToFinish();
			}

			if (robberArray[idx].getTimeToFinish() < shortestTimeToFinish) {
				shortestTimeToFinish = robberArray[idx].getTimeToFinish();
			}
		}
	}

	for (let idx = 0; idx < robberArray.length; idx++) {
		if (robberArray[idx].vaultIdx >= 0) {
			//printErr("time");
			//printErr(shortestTimeToFinish);
			//printErr(robberArray[idx].getTimeToFinish());
			robberArray[idx].addTime(shortestTimeToFinish);
			if (robberArray[idx].getTimeToFinish() == 0) {
				if (nextVaultIdx < vaultArray.length) {
					robberArray[idx].setVaultIndex(nextVaultIdx, vaultArray[nextVaultIdx].getTotalCombos());
					nextVaultIdx++;
				} else {
					robberArray[idx].setVaultIndex(-1, 0);
				}
			}
		}
	}

	for (let idx = 0; idx < robberArray.length; idx++) {
		calculateTime = false;
		if (robberArray[idx].vaultIdx >= 0) {
			calculateTime = true;
			break;
		}
	}
}

robberArray.sort((a,b) => {
	return (b.totalTime - a.totalTime);
});

// Write an action using print()
// To debug: printErr('Debug messages...');

print(robberArray[0].totalTime);