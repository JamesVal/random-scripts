const NORTH_NODE = 1;
const EAST_NODE = 2;
const SOUTH_NODE = 3;
const WEST_NODE = 4;

const NORTH_DIR = 1;
const EAST_DIR = 2;
const SOUTH_DIR = 3;
const WEST_DIR = 4;

const LEFT_WALL = 1;
const RIGHT_WALL = 2;

const inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
var grid = [];

for (let i = 0; i < height; i++) {
    const line = readline();
    grid.push(line);
}

const side = readline();

console.error(grid);

function character(curNode, dir, wallSide) {
  this.initNode = curNode;
  this.curNode = curNode;
  this.dir = dir;
  this.wallSide = wallSide;
}

character.prototype.getCurrentAdjacentNode = function() {
  let adjacentNode;

  switch (this.dir) {
    case NORTH_DIR:
      if (this.wallSide == LEFT_WALL) adjacentNode = curNode.westNode;
      else adjacentNode = curNode.eastNode;
      break;

    case EAST_DIR:
      adjacentNode = curNode.eastNode;
      break;

    case SOUTH_DIR:
      adjacentNode = curNode.southNode;
      break;

    case WEST_DIR:
      adjacentNode = curNode.westNode;
      break;

    default:
      break;
  }

  if (adjacentNode === null) return null;
  else if (adjacentNode.isWall()) return null;
  else return adjacentNode;
}

character.prototype.getNextForwardNode = function() {
  let nextNode;

  switch (this.dir) {
    case NORTH_DIR:
      nextNode = curNode.northNode;
      break;

    case EAST_DIR:
      nextNode = curNode.eastNode;
      break;

    case SOUTH_DIR:
      nextNode = curNode.southNode;
      break;

    case WEST_DIR:
      nextNode = curNode.westNode;
      break;

    default:
      break;
  }

  if (nextNode === null) return null;
  else if (nextNode.isWall()) return null;
  else return nextNode;
}

character.prototype.rotateCharacter = function() {
  switch (this.wallSide) {
    case LEFT_WALL:
      this.dir++;
      if (this.dir > WEST_DIR) this.dir = NORTH_DIR;
      break;

    case RIGHT_WALL:
      this.dir--;
      if (this.dir < NORTH_DIR) this.dir = WEST_DIR;
      break;
    default:
      break;
  }
}

character.prototype.moveToNextPosition = function() {
  let nextNode = this.getNextForwardNode();
  if (!nextNode) {
    this.rotateCharacter();
  } else {
    this.curNode = nextNode;
  }
}


function node(pos, val) {
  this.pos = pos;
  this.val = val;
  this.northNode = null;
  this.eastNode = null;
  this.southNode = null;
  this.westNode = null;
}

node.prototype.isWall = function() {
  return (this.val === "#");
}

node.prototype.connectNode = function(newNode, dir) {
  switch (dir) {
    case NORTH_NODE:
      this.northNode = newNode;
      break;

    case EAST_NODE:
      this.eastNode = newNode;
      break;

    case SOUTH_NODE:
      this.southNode = newNode;
      break;

    case WEST_NODE:
      this.westNode = newNode;
      break;

    default:
      break;
  }
}

node.prototype.incrementVal = function() {
  this.val++;
}

for (let i = 0; i < height; i++) {

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    console.log('#####');
}