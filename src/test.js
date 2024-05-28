

// CSS flashing
#output {
    font-size: 48px;
    font-weight: bold;
    color: green;
    visibility: hidden; /* Initially hidden */
    animation: flash 0.5s ease infinite alternate; /* Flash animation */
  }
  
  @keyframes flash {
    from {
        visibility: hidden;
    }
    to {
        visibility: visible;
    }
  }
  



  





// INITIAL INITIAL CODE

// import { BOXROWS, BOXCOLS, num_arr, str_arr, guess_arr, last_lins, first_lins } from "./input&calcs.js";

// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('container');
//   let cur_phrase = 0;
//   let lin_idx = first_lins[cur_phrase];
//   let guessing = false;
//   let guessed_letts = "";
//   let last_key_is_del = false;
//   let last_key_is_create = false;
  
  
//   for (let row = 0; row < BOXROWS; row++) {
//     for (let col = 0; col < BOXCOLS; col++) {
//       let idx = BOXCOLS*row + col;
//       const box = document.createElement('div');
//       box.classList.add('box');
//       if (num_arr[row][col] == 2) {
//         if (idx >= first_lins[cur_phrase] && idx <= last_lins[cur_phrase]) {
//           box.classList.add('key');
//         }
//         else {
//           box.classList.add('trans_key');
//         }
//       }
//       else if (num_arr[row][col] == 1) {
//         if (idx >= first_lins[cur_phrase] && idx <= last_lins[cur_phrase]) {
//           box.classList.add('nokey');
//         }
//         else {
//           box.classList.add('trans_nokey');
//         }
//       }
//       else {
//         box.classList.add('blank');
//       }
//       container.appendChild(box);
//     }
//   }

//   const boxes = document.querySelectorAll('.box');


//   document.addEventListener('keydown', (event) => {

//     if (event.key === 'Backspace') {
//       last_key_is_del = true;
//       if (last_key_is_create) {
//         last_key_is_create = false;
//         lin_idx--;
//       }
//       if (lin_idx == first_lins[cur_phrase] - 1) {
//         lin_idx++;
//       }
//       let row = Math.floor(lin_idx/BOXCOLS);
//       let col = lin_idx%BOXCOLS;
//       let log1 = true;
//       while(log1) {
//         if(num_arr[row][col] == 0 || num_arr[row][col] == 4) {
//           lin_idx--;
//         }
//         else {
//           log1 = false;
//         }
//         row = Math.floor(lin_idx/BOXCOLS);
//         col = lin_idx%BOXCOLS;
//       }
//       if (lin_idx >= first_lins[cur_phrase]) {
//         boxes[lin_idx].textContent = '';
//         guess_arr[row][col] = 0;
//       }
//       if (lin_idx >= first_lins[cur_phrase]) {
//         lin_idx--;
//       }
//     }

//     else if (event.key ==='Shift') {
//       guessing = true;
//     }

//     else if (/^[a-zA-Z]$/.test(event.key)) {
//       last_key_is_create = true;
//       if (last_key_is_del == true) {
//         last_key_is_del = false;
//         lin_idx += 1;
//       }

//       if (!guessed_letts.includes(event.key.toUpperCase()) && !guessing) {
//         let row = Math.floor(lin_idx/BOXCOLS);
//         let col = lin_idx%BOXCOLS;
//         let log1 = true;
//         while(log1) {
//           if(num_arr[row][col] == 0 || num_arr[row][col] == 4) {
//             lin_idx++;
//           }
//           else {
//             log1 = false;
//           }
//           row = Math.floor(lin_idx/BOXCOLS);
//           col = lin_idx%BOXCOLS;
//         }
//         if (lin_idx <= last_lins[cur_phrase]) {
//           const currentBox = boxes[lin_idx];
//           currentBox.textContent = event.key.toUpperCase();
//           guess_arr[row][col] = event.key.toUpperCase();
//           lin_idx++; 
//         }
//       }
      
//       else if(!guessed_letts.includes(event.key.toUpperCase()) && guessing) {
//         for (let row = 0; row < BOXROWS; row++) {
//           for (let col = 0; col < BOXCOLS; col++) {
//             let idx = BOXCOLS*row + col;
//             if (str_arr[row][col] == event.key.toUpperCase()) {
//               const currentBox = boxes[idx];
//               currentBox.textContent = event.key.toUpperCase();
//               guess_arr[row][col] = event.key.toUpperCase();
//               num_arr[row][col] = 4;
//             }
//           }
//         }
//         guessed_letts = guessed_letts.concat(event.key.toUpperCase());
//         guessing = false;
//       }

//       else if (guessed_letts.includes(event.key.toUpperCase()) && guessing) {
//         guessing = false;
//       }

//       else if (guessed_letts.includes(event.key.toUpperCase()) && !guessing) {
//         guessing = false;
//       }
//     }

//     else {
//       guessing = false;
//     }

    

//     let correct = true;
//     for (let idx = first_lins[cur_phrase]; idx < last_lins[cur_phrase] + 1; idx++) {
//       let row = Math.floor(idx/BOXCOLS);
//       let col = idx%BOXCOLS;
//       if (guess_arr[row][col] != str_arr[row][col]) {
//         correct = false;
//       }
//     }
    


//     if (correct) {
//       if (cur_phrase != last_lins.length - 1) {
//         cur_phrase++;
//       }
//     }


// });

// });


















//CURRENT CODE WITH COMMENTS

// import { BOXROWS, BOXCOLS, num_arr, str_arr, guess_arr, last_lins, first_lins, underline1, underline2 } from "./input&calcs.js";

// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('container');
//   let cur_phrase = 0;
//   let lin_idx = first_lins[cur_phrase];
//   let guessing = false;
//   let guessed_letts = "";
//   let last_key_is_del = false;
//   let last_key_is_create = false;

//   function updateDisplay() {
//     // Clear previous content
//     container.innerHTML = '';

//     // Loop to create boxes

//     for (let row = 0; row < BOXROWS; row++) {
//       for (let col = 0; col < BOXCOLS; col++) {
//         let idx = BOXCOLS * row + col;
//         const box = document.createElement('div');
//         box.classList.add('box');

//         // Determine appropriate class based on current phrase
//         if (num_arr[row][col] == 2) {
//           if (idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) {
//             box.classList.add('key');
//           } else {
//             box.classList.add('trans_key');
//           }
//         } else if (num_arr[row][col] == 5) {
//           if (idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) {
//             box.classList.add('key1');
//           } else {
//             box.classList.add('trans_key1');
//           }
//         } else if (num_arr[row][col] == 1) {
//           if (idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) {
//             box.classList.add('nokey');
//           } else {
//             box.classList.add('trans_nokey');
//           }
//         } else if (num_arr[row][col] == 4) {
//           if (idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) {
//             box.classList.add('nokey1');
//           } else {
//             box.classList.add('trans_nokey1');
//           }
//         } else {
//           box.classList.add('blank');
//         }

//         container.appendChild(box);

//         // Preserve existing letters from previous phrases
//         const content = guess_arr[row][col];
//         if (content && content !== 0) {
//           box.textContent = content;
//         }
//       }
//     }
//   }

//   // Initial display setup
//   updateDisplay();

//   document.addEventListener('keydown', (event) => {
//     if (event.key === 'Backspace') {
//       last_key_is_del = true;
//       if (last_key_is_create) {
//         last_key_is_create = false;
//         lin_idx--;
//       }
//       if (lin_idx == first_lins[cur_phrase] - 1) {
//         lin_idx++;
//       }
//       let row = Math.floor(lin_idx / BOXCOLS);
//       let col = lin_idx % BOXCOLS;
//       let log1 = true;
//       while (log1) {
//         if (num_arr[row][col] == 0 || num_arr[row][col] == 4 || num_arr[row][col] == 5) {
//           lin_idx--;
//         } else {
//           log1 = false;
//         }
//         row = Math.floor(lin_idx / BOXCOLS);
//         col = lin_idx % BOXCOLS;
//       }
//       if (lin_idx >= first_lins[cur_phrase]) {
//         const box = document.querySelectorAll('.box')[lin_idx];
//         box.textContent = '';
//         guess_arr[row][col] = 0;
//       }
//       if (lin_idx >= first_lins[cur_phrase]) {
//         lin_idx--;
//       }
//     } else if (event.key === 'Shift') {
//       guessing = true;
//     } else if (/^[a-zA-Z]$/.test(event.key)) {
//       last_key_is_create = true;
//       if (last_key_is_del == true) {
//         last_key_is_del = false;
//         lin_idx += 1;
//       }
//       if (!guessed_letts.includes(event.key.toUpperCase()) && !guessing) {
//         let row = Math.floor(lin_idx / BOXCOLS);
//         let col = lin_idx % BOXCOLS;
//         let log1 = true;
//         while (log1) {
//           if (num_arr[row][col] == 0 || num_arr[row][col] == 4 || num_arr[row][col] == 5) {
//             lin_idx++;
//           } else {
//             log1 = false;
//           }
//           row = Math.floor(lin_idx / BOXCOLS);
//           col = lin_idx % BOXCOLS;
//         }
//         if (lin_idx <= last_lins[cur_phrase]) {
//           const currentBox = document.querySelectorAll('.box')[lin_idx];
//           currentBox.textContent = event.key.toUpperCase();
//           guess_arr[row][col] = event.key.toUpperCase();
//           lin_idx++;
//         }
//       } else if (!guessed_letts.includes(event.key.toUpperCase()) && guessing) {
//         for (let row = 0; row < BOXROWS; row++) {
//           for (let col = 0; col < BOXCOLS; col++) {
//             let idx = BOXCOLS * row + col;
//             if (str_arr[row][col] == event.key.toUpperCase()) {
//               const currentBox = document.querySelectorAll('.box')[idx];
//               currentBox.textContent = event.key.toUpperCase();
//               guess_arr[row][col] = event.key.toUpperCase();
//               if (num_arr[row][col] == 1) {
//                 num_arr[row][col] = 4 
//               } else if (num_arr[row][col] == 2) {
//                 num_arr[row][col] = 5
//               }
//             }
//           }
//         }
//         guessed_letts = guessed_letts.concat(event.key.toUpperCase());
//         guessing = false;
//         updateDisplay();
//       } else if (guessed_letts.includes(event.key.toUpperCase()) && guessing) {
//         guessing = false;
//       } else if (guessed_letts.includes(event.key.toUpperCase()) && !guessing) {
//         guessing = false;
//       }
//     } else {
//       guessing = false;
//     }

//     let correct = true;
//     for (let idx = first_lins[cur_phrase]; idx < last_lins[cur_phrase] + 1; idx++) {
//       let row = Math.floor(idx / BOXCOLS);
//       let col = idx % BOXCOLS;
//       if (guess_arr[row][col] != str_arr[row][col]) {
//         correct = false;
//       }
//     }

//     if (correct) {
//       if (cur_phrase != last_lins.length - 1) {
//         cur_phrase++;
//         container.className = `phrase${cur_phrase}`; // Apply class for highlighting. DONT NEED??
//         updateDisplay(); // Update display when phrase changes
//       }
//     }
//   });

// });