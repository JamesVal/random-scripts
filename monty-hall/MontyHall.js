function Door() {
  this.picked = false;
  this.isPrize = false;
}

Door.prototype.getPicked = function() {
  return this.picked;
}

Door.prototype.setPicked = function () {
  this.picked = true;
};

Door.prototype.clearPicked = function () {
  this.picked = false;
};

Door.prototype.getIsPrize = function() {
  return this.isPrize;
}

Door.prototype.setIsPrize = function () {
  this.isPrize = true;
};

Door.prototype.clearIsPrize = function () {
  this.isPrize = false;
};

var door1 = new Door();
var door2 = new Door();
var door3 = new Door();

var doorArray = [door1,door2,door3];

var totalRuns = 0;
var totalMatches = 0;

for (var i = 0; i < 1000; i++) {

  totalRuns++;

  for (var doorIdx = 0; doorIdx < doorArray.length; doorIdx++) {
    doorArray[doorIdx].clearPicked();
    doorArray[doorIdx].clearIsPrize();
  }

  var randIdx = Math.floor(Math.random() * 10) % 3;
  doorArray[randIdx].setPicked();

  var randIdx = Math.floor(Math.random() * 10) % 3;
  doorArray[randIdx].setIsPrize();
  
  for (var doorIdx = 0; doorIdx < doorArray.length; doorIdx++) {
    if (doorArray[doorIdx].getPicked() && doorArray[doorIdx].getIsPrize()) {
      totalMatches++;
    }
  }
}

console.log("\r\n--- No switch ---");
console.log("Matches: "+totalMatches);
console.log("Runs: "+totalRuns);
console.log("%: "+((totalMatches/totalRuns)*1.0));

var totalRuns = 0;
var totalMatches = 0;

for (var i = 0; i < 1000; i++) {

  totalRuns++;

  for (var doorIdx = 0; doorIdx < doorArray.length; doorIdx++) {
    doorArray[doorIdx].clearPicked();
    doorArray[doorIdx].clearIsPrize();
  }

  var randIdx = Math.floor(Math.random() * 10) % 3;
  doorArray[randIdx].setPicked();

  var randIdx = Math.floor(Math.random() * 10) % 3;
  doorArray[randIdx].setIsPrize();
  
  var doorToIgnore;

  for (var doorIdx = 0; doorIdx < doorArray.length; doorIdx++) {
    if (!doorArray[doorIdx].getPicked() && !doorArray[doorIdx].getIsPrize()) {
      doorToIgnore = doorIdx;
      break;
    }
  }
  
  var pickedIdx;
  var newIdx;
  
  for (var doorIdx = 0; doorIdx < doorArray.length; doorIdx++) {
    if (doorIdx != doorToIgnore) {
      if (doorArray[doorIdx].getPicked()) {
        pickedIdx = doorIdx;
      }
      if (!doorArray[doorIdx].getPicked()) {
        newIdx = doorIdx;
      }
    }
  }
  
  doorArray[pickedIdx].clearPicked();
  doorArray[newIdx].setPicked();
  
  for (var doorIdx = 0; doorIdx < doorArray.length; doorIdx++) {
    if (doorArray[doorIdx].getPicked() && doorArray[doorIdx].getIsPrize()) {
      totalMatches++;
    }
  }
}

console.log("\r\n--- With switch ---");
console.log("Matches: "+totalMatches);
console.log("Runs: "+totalRuns);
console.log("%: "+((totalMatches/totalRuns)*1.0));
