/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());

var cellVals = [],
    pendingActions = [];

function action(op, arg1, arg2, idx) {
  this.op = op;
  this.arg1 = arg1;
  this.arg2 = arg2;
  this.idx = idx;
  this.success = false;
}

action.prototype.execute = function() {
  let val1, val2;

  if (this.arg1[0] == "$") val1 = cellVals[parseInt(this.arg1.split("$")[1])];
  else val1 = parseInt(this.arg1);
  
  if (this.arg2[0] == "$") val2 = cellVals[parseInt(this.arg2.split("$")[1])];
  else val2 = parseInt(this.arg2);

  if ((val1 == null) || (val2 == null)) {
    /*console.error("???", this)*/
    return;
  }

  switch (this.op) {
    case "VALUE":
      cellVals[this.idx] = val1;
      break;

    case "ADD":
      cellVals[this.idx] = val1+val2;
      break;

    case "SUB":
      cellVals[this.idx] = val1-val2;
      break;

    case "MULT":
      cellVals[this.idx] = val1*val2;
      break;

    default:
      console.log("ERR?");
      break;
  }

  /* The game doesn't like -0... */
  if (cellVals[this.idx] == -0) cellVals[this.idx] = 0;

  this.success = true;
}

/* Initialize Cells and Action List */
for (let i = 0; i < N; i++) {
  var inputs = readline().split(' ');
  const operation = inputs[0];
  const arg1 = inputs[1];
  const arg2 = inputs[2];

  cellVals.push(null);

  let newAction = new action(operation, arg1, arg2, i);
  pendingActions.push(newAction);
}

/* Execute Actions */
while (pendingActions.length) {
  for (let i = 0; i < pendingActions.length; i++) {
    pendingActions[i].execute();
  }
  pendingActions = pendingActions.filter((item) => {
    /*console.error("filter", item);*/
    return item.success == false;
  });
}

console.error(pendingActions.length);

/* Print output */
for (let i = 0; i < N; i++) {
  console.log(cellVals[i]);
}