/*************************
 * Path:
 *  Classes:
 *      Cell:
 *          SetType: Sets the type and changes the background color of the cell
 *      Grid:
 *          createGrid: creates a 2D array that contains cell objects
 *
 *
 *
 */

/* Global Checks */
let SET = false;
let GRID_SIZE = 20;
let toggleStart = false;
let toggleEnd = false;

/*Color Definitions*/
let DEFAULT_COLOR = "white";
let VISITED_COLOR = "yellow";
let WALL_COLOR = "gray";
let START_COLOR = "green";
let END_COLOR = "red";
let PATH_COLOR = "blue";

/* Default start and end i and j*/
let startI = GRID_SIZE / 2;
let startJ = 3;
let endI = GRID_SIZE / 2;
let endJ = GRID_SIZE - 4;

let step = null;

class Cell {
  constructor(cellID, type, htmlCell) {
    this.cellID = cellID;
    this.htmlCell = htmlCell;
    this.setType(type, htmlCell);
    this.visited = false;
  }

  setType(type, htmlCell) {
    switch (type) {
      case "START":
        this.type = "START";
        htmlCell.style.backgroundColor = START_COLOR;
        break;
      case "END":
        this.type = "END";
        htmlCell.style.backgroundColor = END_COLOR;
        break;
      case "WALL":
        this.type = "WALL";
        htmlCell.style.backgroundColor = WALL_COLOR;
        break;
      case "VISITED":
        this.visited = true;
        this.type = "VISITED";
        htmlCell.style.backgroundColor = VISITED_COLOR;
        break;
      case "PATH":
        this.visited = false;
        htmlCell.style.backgroundColor = PATH_COLOR;
        break;
      default:
        this.type = "DEFAULT";
        this.visited = false;
        htmlCell.style.backgroundColor = DEFAULT_COLOR;
    }
  }
}

/* Grid Class */
class Grid {
  constructor() {
    //creates and fills array with 0's will be replaced later with cell objects
    this.grid = new Array(GRID_SIZE)
      .fill(0)
      .map(() => new Array(GRID_SIZE).fill(0));
    this.startID = 0;
    this.endID = 0;
    this.parent = null;
  }
  crateGrid() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        let cellID = `${i} ${j}`;
        let htmlCell = document.getElementById(cellID);
        if (i === startI && j === startJ) {
          this.grid[i][j] = new Cell(cellID, "START", htmlCell);
          this.startID = cellID;
        } else if (i === endI && j === endJ) {
          this.grid[i][j] = new Cell(cellID, "END", htmlCell);
          this.endID = cellID;
        } else {
          this.grid[i][j] = new Cell(cellID, "", htmlCell);
        }
      }
    }
  }

  setStart(cellID) {
    if (cellID !== mainGrid.endID && cellID !== mainGrid.startID) {
      let i = cellID.split(" ")[0];
      let j = cellID.split(" ")[1];
      let orginalStartI = this.startID.split(" ")[0];
      let orginalStartJ = this.startID.split(" ")[1];
      let newStartCell = this.grid[i][j];
      let orginalStartCell = this.grid[orginalStartI][orginalStartJ];
      newStartCell.setType("START", newStartCell.htmlCell);
      orginalStartCell.setType("", orginalStartCell.htmlCell);
      this.startID = cellID;
    }
  }

  setEnd(cellID) {
    if (cellID !== mainGrid.endID && cellID !== mainGrid.startID) {
      let i = cellID.split(" ")[0];
      let j = cellID.split(" ")[1];
      let orginalEndI = this.endID.split(" ")[0];
      let orginalEndJ = this.endID.split(" ")[1];
      let newEndCell = this.grid[i][j];
      let orginalEndCell = this.grid[orginalEndI][orginalEndJ];
      newEndCell.setType("END", newEndCell.htmlCell);
      orginalEndCell.setType("", orginalEndCell.htmlCell);
      this.endID = cellID;
    }
  }

  toggleWall(cellID) {
    if (cellID !== mainGrid.endID && cellID !== mainGrid.startID) {
      let i = cellID.split(" ")[0];
      let j = cellID.split(" ")[1];
      let newWall = this.grid[i][j];
      if (newWall.type == "WALL") {
        newWall.setType("", newWall.htmlCell);
      } else {
        newWall.setType("WALL", newWall.htmlCell);
      }
    }
  }

  clearWalls() {
    this.resetGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.grid[i][j].type === "WALL") {
          this.toggleWall(this.grid[i][j].cellID);
        }
      }
    }
  }

  addRandomWalls() {
    //number of walls to be added
    let numofWalls = Math.floor(Math.random() * 50);

    for (let i = 0; i < numofWalls; i++) {
      let randomI = Math.floor(Math.random() * 20);
      let randomJ = Math.floor(Math.random() * 20);
      if (
        this.grid[randomI][randomJ].type !== "WALL" &&
        this.grid[randomI][randomJ].type !== "START" &&
        this.grid[randomI][randomJ].type !== "END"
      ) {
        this.toggleWall(this.grid[randomI][randomJ].cellID);
      }
    }
  }

  addOnClick() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j].htmlCell.onclick = function (event) {
          let id = event.target.id.split(" ");
          let i = parseInt(id[0]);
          let j = parseInt(id[1]);
          this.toggleWall(this.grid[i][j].cellID);
        }.bind(this);
      }
    }
  }
  getCellPostion(cellID) {
    let b = cellID.split(" ");
    return [parseInt(b[0]), parseInt(b[1])];
  }

  displayPath(path) {
    // console.log("inside display path!");
    // console.log(path);

    for (let i = 0; i < path.length; i++) {
      if (path[i].type !== "END") {
        path[i].setType("PATH", path[i].htmlCell);
      }
    }
  }
  //checks to see if a node is within the search array
  checkSearch(current, search) {
    for (let i = 0; i < search.length; i++) {
      if (current.cellID === search[i].cellID) {
        return true;
      }
    }
    return false;
  }
  backTrace(end) {
    let path = [];
    let current = end;
    while (current.type !== "START") {
      path.push(current);
      current = current.parent;
    }

    return path.reverse();
  }
  findNeighbors(node, search) {
    let id = this.getCellPostion(node.cellID);
    let row = id[0];
    let col = id[1];
    let path = [];
    //Check Left
    if (row - 1 >= 0) {
      if (this.checkSearch(this.grid[row - 1][col], search) === false) {
        if (
          this.grid[row - 1][col].visited === false &&
          this.grid[row - 1][col].type !== "WALL"
        ) {
          this.grid[row - 1][col].parent = this.grid[row][col];
          path.push(this.grid[row - 1][col]);
        }
      }
    }
    //Check Right
    if (row + 1 < GRID_SIZE) {
      if (this.checkSearch(this.grid[row + 1][col], search) === false) {
        if (
          this.grid[row + 1][col].visited === false &&
          this.grid[row + 1][col].type !== "WALL"
        ) {
          this.grid[row + 1][col].parent = this.grid[row][col];
          path.push(this.grid[row + 1][col]);
        }
      }
    }
    //Check TOP
    if (col - 1 >= 0) {
      if (this.checkSearch(this.grid[row][col - 1], search) === false) {
        if (
          this.grid[row][col - 1].visited === false &&
          this.grid[row][col - 1].type != "WALL"
        ) {
          this.grid[row][col - 1].parent = this.grid[row][col];
          path.push(this.grid[row][col - 1]);
        }
      }
    }
    //Check Bottom
    if (col + 1 < GRID_SIZE) {
      if (this.checkSearch(this.grid[row][col + 1], search) === false) {
        if (
          this.grid[row][col + 1].visited === false &&
          this.grid[row][col + 1].type != "WALL"
        ) {
          this.grid[row][col + 1].parent = this.grid[row][col];

          path.push(this.grid[row][col + 1]);
        }
      }
    }

    return path;
  }
  breadthFirst(interval) {
    this.resetGrid();
    turnOffButtons();
    let search = [];
    let path = [];
    let startID = this.getCellPostion(this.startID);
    search.push(this.grid[startID[0]][startID[1]]);

    step = window.setInterval(function () {
      let node = search.shift(); // get first node;
      path.push(node);
      if (node.type === "DEFAULT") {
        node.setType("VISITED", node.htmlCell);
      }
      if (node.type === "END") {
        clearInterval(step);
        //found the node, send path
        let finalPath = mainGrid.backTrace(node);
        mainGrid.displayPath(finalPath);
        turnOnButtons();
      } else {
        let neighbors = mainGrid.findNeighbors(node, search);
        search = search.concat(neighbors); // add neighbors to list if not wall, or already visited
      }
      if (search.length === 0) {
        alert("No path found");
        turnOnButtons();
        clearInterval(step);
      }
    }, interval);
    turnOnButtons();
  }

  depthFirst(interval) {
    this.resetGrid();
    turnOffButtons();
    let search = [];
    let path = [];
    let startID = this.getCellPostion(this.startID);
    search.push(this.grid[startID[0]][startID[1]]);

    step = window.setInterval(function () {
      let node = search.pop(); // get first node;
      path.push(node);
      if (node.type === "DEFAULT") {
        node.setType("VISITED", node.htmlCell);
      }
      if (node.type === "END") {
        clearInterval(step);
        //found the node, send path
        let finalPath = mainGrid.backTrace(node);
        mainGrid.displayPath(finalPath);
        turnOnButtons();
      } else {
        let neighbors = mainGrid.findNeighbors(node, search);
        search = search.concat(neighbors); // add neighbors to list if not wall, or already visited
      }
      if (search.length === 0) {
        alert("No path found");
        turnOnButtons();
        clearInterval(step);
      }
    }, interval);
    turnOnButtons();
  }

  resetGrid() {
    clearInterval(step);
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (
          this.grid[i][j].type === "PATH" ||
          this.grid[i][j].type === "VISITED"
        ) {
          this.grid[i][j].setType("DEFAULT", this.grid[i][j].htmlCell);
        }
      }
    }
    turnOnButtons();
  }
}

let mainGrid = new Grid();

mainGrid.crateGrid();
mainGrid.addOnClick();
