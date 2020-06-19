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
let PATH_COLOR;

/* Default start and end i and j*/
let startI = GRID_SIZE / 2;
let startJ = 3;
let endI = GRID_SIZE / 2;
let endJ = GRID_SIZE - 4;

class Cell {
  constructor(cellID, type, htmlCell) {
    this.cellID = cellID;
    this.htmlCell = htmlCell;
    this.setType(type, htmlCell);
    this.viewed = false;
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
        this.viwed = true;
        htmlCell.sytle.backgroundColor = VISITED_COLOR;
        break;
      case "Path":
        htmlCell.sytle.backgroundColor = PATH_COLOR;
        break;
      default:
        this.type = "DEFAULT";
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

  toggleCellWall(cell, gridObj) {
    let type = cell.type;

    let grid = gridObj.grid;
    let startID = gridObj.startID.split(" ");
    let endID = gridObj.endID.split(" ");

    switch (type) {
      case "DEFAULT":
        cell.setType("WALL", cell.htmlCell);
        break;
      case "WALL":
        cell.setType("Defualt", cell.htmlCell);
        break;
    }
  }

  addOnClick() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j].htmlCell.onclick = function (event) {
          let id = event.target.id.split(" ");
          let i = parseInt(id[0]);
          let j = parseInt(id[1]);
          this.toggleCellWall(this.grid[i][j], this);
        }.bind(this);
      }
    }
  }
}

let firstGrid = new Grid();

firstGrid.crateGrid();
firstGrid.addOnClick();
