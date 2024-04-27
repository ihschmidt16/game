import {num_arr, BOXROWS, BOXCOLS} from "./input&calcs.js"




// Function to create the grid of boxes based on the array
function createGrid() {
  const container = document.getElementById('container');
  for(let row=0; row<BOXROWS; row++) {
      for(let col=0;col<BOXCOLS;col++) {
          if (num_arr[row][col]!= 0) {
              const box = document.createElement('div');
              box.classList.add('box');
              container.appendChild(box);
              // Set the grid row and column positions based on the array indices
              box.style.gridColumn = col + 1;
              box.style.gridRow = row + 1;
          }
      } } };


// Call the function to create the grid
createGrid();




// function drawBox(container, row, col, letter = " ") {
//   const box = document.createElement("div");
//   box.className = "box";
//   box.id = `box${row}${col}`;
//   box.textContent = letter;
//   container.appendChild(box);
//   return box; }


// function drawGrid(container) {
//   const grid = document.createElement("div");
//   grid.className = "grid";
//   for(let row=0; row<7;row++) {
//     for(let col=0; col<24;col++) {
//       if(row %2 == 0) {
//         drawBox(grid,row,col) }
//       // elseif(num_arr[row][col] == 2) 
//       } }
//   container.appendChild(grid); }

// function startup() {
//   const game = document.getElementById("game");
//   drawGrid(game); }


// startup();
