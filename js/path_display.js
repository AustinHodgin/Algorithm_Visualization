let GRID_ROWS = 20;
let GRID_COLS = 20;

function createGrid() {
  let grid = document.getElementById("grid");
  let tablebody = document.createElement("tbody");

  for (let i = 0; i < GRID_ROWS; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < GRID_COLS; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", i + " " + j);
      cell.setAttribute("class", "gridItem");
      //let cellText = document.createTextNode(i + " " + j);
      let cellText = document.createTextNode(" ");
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tablebody.appendChild(row);
  }
  grid.appendChild(tablebody);
  grid.setAttribute("border", 2);
}

createGrid();
