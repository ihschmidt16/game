import { inputs } from "./input&calcs.js";
import { ALL_PHRASES } from "./phrases.js";


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const dateDisplay = document.getElementById('date-display');
  const solvedPopup = document.getElementById("solved-popup");
  const scoreValue = document.getElementById("score-value");
  const solvedToBlur = document.querySelectorAll("body > :not(#solved-popup):not(#share-button-pop");
  const infoToBlur = document.querySelectorAll("body > :not(#info-popup)");
  const clueValue = document.getElementById('clue-value')
  const infoButton = document.getElementById('info-button')
  const infoPopup = document.getElementById("info-popup");
  const shareButton = document.getElementById("share-button")
  const shareButtonPop = document.getElementById("share-button-pop")
  
  let cur_phrase, lin_idx, guessing, last_key_is_del, last_key_is_create, formattedDateX, puzScore,
      BOXROWS, BOXCOLS, num_arr, str_arr, guess_arr, last_lins, first_lins, underline1, underline2, clueLog;
  let guessed_letts = '';
  let puzzle_solved, info_showing = false;
  shareButtonPop.style.display = "none";
  let seconds = 0;

  function initialize() {
    const today = new Date().toLocaleDateString('en-CA');
    const formattedDate = today.replace(/-/g, '');
    const formattedDate1 = formatDate(formattedDate);
    startTimer()
    updateScoreDisplay(puzScore)
    setDateDisplay(formattedDate1);
    handleDatePickerChange({ target: { value: today } });
  }

  function updateDisplay() {
    container.innerHTML = '';
    for (let row = 0; row < BOXROWS; row++) {
      for (let col = 0; col < BOXCOLS; col++) {
        let idx = BOXCOLS * row + col;
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.index = idx;

        if (num_arr[row][col] == 2) {
          if ((idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) || puzzle_solved) {
            box.classList.add('key');
          } else {
            box.classList.add('trans_key');
          }
        } else if (num_arr[row][col] == 5) {
          if ((idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) || puzzle_solved) {
            box.classList.add('key1');
          } else {
            box.classList.add('trans_key1');
          }
        } else if (num_arr[row][col] == 1) {
          if ((idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) || puzzle_solved) {
            box.classList.add('nokey');
          } else {
            box.classList.add('trans_nokey');
          }
        } else if (num_arr[row][col] == 4) {
          if ((idx >= underline1[cur_phrase] && idx <= underline2[cur_phrase]) || puzzle_solved) {
            box.classList.add('nokey1');
          } else {
            box.classList.add('trans_nokey1');
          }
        } else {
          box.classList.add('blank');
        }

        container.appendChild(box);

        const content = guess_arr[row][col];
        if (content && content !== 0) {
          box.textContent = content;
        }
      }
    }
  }

  function createKeyboard() {
    keyboard.innerHTML = '';
    const rows = [
      { keys: 'QWERTYUIOP', guess: false, backspace: false },
      { keys: 'ASDFGHJKL', guess: false, backspace: false },
      { keys: 'ZXCVBNM', guess: true, backspace: true }
    ];

    rows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('keyboard-row');

      if (row.guess) {
        const shiftButton = document.createElement('button');
        if (!guessing) {
          shiftButton.classList.add('clue-shift-key-btn');
        } else {
          shiftButton.classList.add('shift-when-actived');
        }
        shiftButton.textContent = 'Show Letter';
        shiftButton.addEventListener('click', () => {
          handleKeyPress('Shift');
        });
        rowDiv.appendChild(shiftButton);
      }

      row.keys.split('').forEach(key => {
        const button = document.createElement('button');
        if (guessed_letts.includes(key)) {
          button.classList.add('keyboard-btn-used');
        }
        else {
          button.classList.add('keyboard-btn');
        }
        button.textContent = key;
        button.addEventListener('click', () => handleKeyPress(key));
        rowDiv.appendChild(button);
      });

      if (row.backspace) {
        const backspaceButton = document.createElement('button');
        backspaceButton.classList.add('backspace-btn');
        backspaceButton.textContent = '⌫';
        backspaceButton.addEventListener('click', () => handleKeyPress('Backspace'));
        rowDiv.appendChild(backspaceButton);
      }

      keyboard.appendChild(rowDiv);
    });
  }

  function handleKeyPress(key) {
    const event = new KeyboardEvent('keydown', { key: key });
    document.dispatchEvent(event);
  }

  function handleBackspace() {
    last_key_is_del = true;
    if (last_key_is_create) {
      last_key_is_create = false;
      lin_idx--;
    }
    if (lin_idx == first_lins[cur_phrase] - 1) {
      lin_idx++;
    }
    let row = Math.floor(lin_idx / BOXCOLS);
    let col = lin_idx % BOXCOLS;
    let log1 = true;
    while (log1) {
      if (num_arr[row][col] == 0 || num_arr[row][col] == 4 || num_arr[row][col] == 5) {
        lin_idx--;
      } else {
        log1 = false;
      }
      row = Math.floor(lin_idx / BOXCOLS);
      col = lin_idx % BOXCOLS;
    }
    if (lin_idx >= first_lins[cur_phrase]) {
      const box = document.querySelectorAll('.box')[lin_idx];
      box.textContent = '';
      guess_arr[row][col] = 0;
    }
    if (lin_idx >= first_lins[cur_phrase]) {
      lin_idx--;
    }
  }

  function handleTyping() {
    last_key_is_create = true;
        if (last_key_is_del == true) {
          last_key_is_del = false;
          lin_idx += 1;
        }
        if (!guessed_letts.includes(event.key.toUpperCase()) && !guessing) {
          let row = Math.floor(lin_idx / BOXCOLS);
          let col = lin_idx % BOXCOLS;
          let log1 = true;
          while (log1) {
            if (num_arr[row][col] == 0 || num_arr[row][col] == 4 || num_arr[row][col] == 5) {
              lin_idx++;
            } else {
              log1 = false;
            }
            row = Math.floor(lin_idx / BOXCOLS);
            col = lin_idx % BOXCOLS;
          }
          if (lin_idx <= last_lins[cur_phrase]) {
            const currentBox = document.querySelectorAll('.box')[lin_idx];
            currentBox.textContent = event.key.toUpperCase();
            guess_arr[row][col] = event.key.toUpperCase();
            lin_idx++;
          }
        } else if (!guessed_letts.includes(event.key.toUpperCase()) && guessing) {
          for (let row = 0; row < BOXROWS; row++) {
            for (let col = 0; col < BOXCOLS; col++) {
              let idx = BOXCOLS * row + col;
              if (str_arr[row][col] == event.key.toUpperCase()) {
                const currentBox = document.querySelectorAll('.box')[idx];
                currentBox.textContent = event.key.toUpperCase();
                guess_arr[row][col] = event.key.toUpperCase();
                if (num_arr[row][col] == 1) {
                  num_arr[row][col] = 4;
                } else if (num_arr[row][col] == 2) {
                  num_arr[row][col] = 5;
                }
              }
            }
          }
          let vowels = 'AEIOU';
          let consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
          if (vowels.includes(event.key.toUpperCase())) {
            puzScore -= 4;
          } else if (consonants.toUpperCase().includes(event.key.toUpperCase())) {
            puzScore -= 3;
          }
          guessed_letts = guessed_letts.concat(event.key.toUpperCase());
          guessing = false;
          updateScoreDisplay(puzScore);
        } else if (guessed_letts.includes(event.key.toUpperCase()) && guessing) {
          guessing = false;
        } else if (guessed_letts.includes(event.key.toUpperCase()) && !guessing) {
          guessing = false;
        }

  }
  
  function checkIfCorrect() {
    let correct = true;
    for (let idx = first_lins[cur_phrase]; idx < last_lins[cur_phrase] + 1; idx++) {
      let row = Math.floor(idx / BOXCOLS);
      let col = idx % BOXCOLS;
      if (guess_arr[row][col] != str_arr[row][col]) {
        correct = false;
      }
    }
    cycleCorrect(correct);
  }

  function cycleCorrect(correct) {
    if (correct) {
      if (cur_phrase != last_lins.length - 1) {
        cur_phrase++;
        lin_idx = first_lins[cur_phrase];
        clueLog = true;
        updateClue(clueLog)
        checkIfCorrect();
        updateDisplay();
      } else {
        puzzle_solved = true;
        updateDisplay();
        solvedPopup.style.display = "block";
        shareButtonPop.style.display = "block";
        solvedBlur(true);
      }
    }
  }

  function handleDatePickerChange(event) {
    const selectedDate = event.target.value;
    const formattedDate = selectedDate.replace(/-/g, '');
    let currentString = ALL_PHRASES[formattedDate];
    ({BOXROWS, BOXCOLS, num_arr, str_arr, guess_arr, last_lins, first_lins, underline1, underline2} = inputs(currentString));
    cur_phrase = 0;
    lin_idx = first_lins[cur_phrase];
    guessing = false;
    guessed_letts = '';
    last_key_is_del = false;
    last_key_is_create = false;
    puzScore = 100;
    clueLog = true;
    puzzle_solved = false;
    formattedDateX = formattedDate;
    document.documentElement.style.setProperty('--BOXROWS', BOXROWS);
    document.documentElement.style.setProperty('--BOXCOLS', BOXCOLS);
    updateDisplay();
    createKeyboard();
    updateScoreDisplay(puzScore);
    updateClue(clueLog);
  }

  function setDateDisplay(date) {
    dateDisplay.textContent = date;
  }

  function updateClue(clueLog) {
    if (clueLog) {
      let clue1 = cur_phrase.toString();
      let clue2 = formattedDateX;
      let clue3 = clue2 + "_" + clue1;
      clueValue.textContent = ALL_PHRASES[clue3];
      // puzScore -= 5;
      updateScoreDisplay(puzScore);
    }
    else {
      clueValue.textContent = "";
    }
  }

  function formatDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${month} / ${day} / ${year}`;
  }

  function updateScoreDisplay(score) {
    scoreValue.textContent = Math.round(score * 10) / 10;
  }

  function solvedBlur(show) {
    solvedToBlur.forEach(element => {
      if (show) {
        element.classList.add('solvedBlur');
      } else {
        element.classList.remove('solvedBlur');
      }
    });
  }

  function infoBlur(show) {
    infoToBlur.forEach(element => {
      if (show) {
        element.classList.add('infoBlur');
      } else {
        element.classList.remove('infoBlur');
      }
    });
  }

  function startTimer() {
    setInterval(() => {
      seconds++;
      puzScore -= 0.1
      updateScoreDisplay(puzScore);
    }, 1000);
  }

  const fp = flatpickr("#date-display", {
    yearSelectorType: 'dropdown',
    onChange: function(selectedDates, dateStr, instance) {
      const formattedDate = dateStr.replace(/-/g, '');
      const formattedDate1 = formatDate(formattedDate);
      setDateDisplay(formattedDate1);
      handleDatePickerChange({ target: { value: dateStr } });
    },

    onOpen: function(selectedDates, dateStr, instance) {
      const rect = dateDisplay.getBoundingClientRect();
      instance.calendarContainer.style.top = `${rect.bottom + window.scrollY}px`;
      instance.calendarContainer.style.left = `${rect.left + window.scrollX}px`;

      const todayButton = document.createElement('button');
      todayButton.textContent = 'Today';
      todayButton.className = 'flatpickr-today-btn';
      todayButton.addEventListener('click', () => {
        const today = new Date().toLocaleDateString('en-CA');
        instance.setDate(today, true);
        const formattedDate = dateStr.replace(/-/g, '');
        const formattedDate1 = formatDate(formattedDate);
        setDateDisplay(formattedDate1);
        handleDatePickerChange({ target: { value: today } });
        instance.close();
      });
      instance.calendarContainer.appendChild(todayButton);
    },

    onClose: function(selectedDates, dateStr, instance) {
      const formattedDate = dateStr.replace(/-/g, '');
      const formattedDate1 = formatDate(formattedDate);
      setDateDisplay(formattedDate1);
    },

    minDate: "2024-07-29",
    maxDate: "today"
  });
  
  document.addEventListener('keydown', (event) => {
    if ((puzzle_solved || info_showing) && event.key !== 'Escape') {
      return;
    }

    else if (event.key === 'Escape') {
      solvedPopup.style.display = "none";
      solvedBlur(false);
      shareButtonPop.style.display = "none";
      infoPopup.style.display = "none";
      infoBlur(false);
      info_showing = false;
    }

    else {
      if (event.key === 'Backspace') {
        handleBackspace();
      } 
  
      // else if (event.key === ' ') {
      //   if (!clueLog) {
      //     clueLog = true;
      //     updateClue(clueLog);
      //   }
      // } 
      
      else if (event.key === 'Shift') {
        if (guessing) {
          guessing = false;
        } else {
          guessing = true;
        }
      } 
      
      else if (/^[a-zA-Z]$/.test(event.key)) {
        handleTyping();
      }
      
      updateDisplay();
      createKeyboard()
      checkIfCorrect();
    }
  });

  dateDisplay.addEventListener('click', () => {
    fp.open();
  });

  document.querySelector(".solvedClose").addEventListener("click", function() {
    solvedPopup.style.display = "none";
    solvedBlur(false);
    shareButtonPop.style.display = "none";
  });

  infoButton.addEventListener('click', () => {
    infoPopup.style.display = "block";
    infoBlur(true);
    info_showing = true;
  })

  document.querySelector(".infoClose").addEventListener("click", function() {
    infoPopup.style.display = "none";
    infoBlur(false);
    info_showing = false;
  });

  shareButton.addEventListener('click', () => {
    let shareDate = dateDisplay.textContent;
    let shareDate1 = shareDate.replace(/ /g, "");
    if (puzzle_solved) {
      if (navigator.share) {
        navigator.share({
            text: "My " + shareDate1 + " Caphrase Score --> " + scoreValue.textContent
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
      } else {
        alert('Sharing Not Avaliable.');
      }
    }
  })

  shareButtonPop.addEventListener('click', () => {
    let shareDate = dateDisplay.textContent;
    let shareDate1 = shareDate.replace(/ /g, "");
    if (puzzle_solved) {
      if (navigator.share) {
        navigator.share({
            text: "My " + shareDate1 + " Caphrase Score --> " + scoreValue.textContent + "\nPlay at caphrase.com"
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
      } else {
        alert('Sharing Not Avaliable.');
      }
    }
  })

  updateDisplay();
  createKeyboard()
  initialize();
});