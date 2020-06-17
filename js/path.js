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
let DEFAULT_COLOR;
let VISITED_COLOR;
let WALL_COLOR;
let START_COLOR;
let END_COLOR;
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
  }

  setType(type, htmlCell) {
    switch (type) {
      case "START":
        this.type = "START";
        htmlCell.style.backgroundColor = "green";
        break;
      case "END":
        this.type = "END";
        htmlCell.style.backgroundColor = "red";
        break;
      case "WALL":
        this.type = "WALL";
        htmlCell.style.backgroundColor = "gray";
        break;
      default:
        this.type = "DEFAULT";
        htmlCell.style.backgroundColor = "white";
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
  }
  crateGrid() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (i === startI && j === startJ) {
          let cellID = `${i} ${j}`;
          let htmlCell = document.getElementById(cellID);
          this.grid[i][j] = new Cell(cellID, "START", htmlCell);
        } else if (i === endI && j === endJ) {
          let cellID = `${i} ${j}`;
          let htmlCell = document.getElementById(cellID);
          this.grid[i][j] = new Cell(cellID, "END", htmlCell);
        } else {
          let cellID = `${i} ${j}`;
          let htmlCell = document.getElementById(cellID);
          this.grid[i][j] = new Cell(cellID, "", htmlCell);
        }
      }
    }
  }
}

let firstGrid = new Grid();

firstGrid.crateGrid();
