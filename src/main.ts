import "./s.css";

const app = document.getElementById("app");
const numberOfRows = 10;
const numberOfLetters = 5;
const rowStartduration = 70;
const letterBlockStartduration = 80;

var secretWord = ["h", "e", "l", "l", "o"];

// helper functions
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// init gameboard
document.addEventListener("DOMContentLoaded", () => {
  initNewGameBoard();
  createHeading();
});

// GAMEBOARD CREATION
function initNewGameBoard() {
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("game-board");
  gameBoard.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`;
  app?.appendChild(gameBoard);

  createRows(gameBoard, numberOfRows);
}

// heading creation
function createHeading() {
  const h1 = document.createElement("h1");
  h1.classList.add("heading1");

  h1.textContent = "Guess the word";
  app?.prepend(h1);
}

// row creation
function createRows(gameBoard: HTMLDivElement, numberOfRows: number) {
  const promises = [];

  for (let i = 0; i < numberOfRows; i++) {
    const row = document.createElement("div");
    const rowNumber = i + 1;

    row.classList.add(`row-${rowNumber}`);
    row.classList.add("row");
    row.style.gridTemplateColumns = `repeat(${numberOfLetters}, 1fr)`;

    const promise = wait(rowStartduration * rowNumber)
      .then(() => gameBoard.appendChild(row))
      .then(() => addLetterBlocksToRow(row, numberOfLetters))
      .then(() => {
        return row;
      });

    promises.push(promise);
  }

  Promise.all(promises).then((row) => {
    hideRowsAndOnlyShowTheFirstAfterInit(row);
  });

  function hideRowsAndOnlyShowTheFirstAfterInit(row: Array<HTMLDivElement>) {
    for (let i = numberOfRows; i > 0; i--) {
      const currentRow = row[i];
      wait(1000 / i).then(() => {
        currentRow?.classList.add("hidden");
      });
    }
  }
}

// letter block creation
function addLetterBlocksToRow(row: HTMLDivElement, numberOfLetters: number) {
  for (let i = 0; i < numberOfLetters; i++) {
    const letterBlock = document.createElement("input");
    const letterBlockNumber = i + 1;

    letterBlock.classList.add(`letter-block-row-${letterBlockNumber}`);
    letterBlock.classList.add("letter-block-row");
    letterBlock.setAttribute("maxlength", "1");

    disableAllLetterBlocksBesidesFirstOneAndFocus(
      letterBlock,
      row,
      letterBlockNumber,
    );

    wait(letterBlockStartduration * letterBlockNumber)
      .then(() => row.appendChild(letterBlock))
      .then(() => {
        listenToInput(letterBlock, i);
      });
  }

  function disableAllLetterBlocksBesidesFirstOneAndFocus(
    letterBlock: HTMLInputElement,
    row: HTMLDivElement,
    letterBlockNumber: number,
  ) {
    letterBlock.disabled = true;

    if (row.classList.contains("row-1") && letterBlockNumber === 1) {
      letterBlock.disabled = false;
      console.log(letterBlock);

      letterBlock.focus();
    }
  }
}

function listenToInput(
  letterBlock: HTMLInputElement,
  i: number,
  secretWord: string[],
) {
  letterBlock.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const index = i + 1;

    // test if the input is a letter otherwise return
    if (!/^[a-zA-Z]*$/.test(value)) {
      target.value = "";
      return;
    }
    // evaluateInput(target, value, index, secretWord);
    if (value === secretWord[index]) {
      target.classList.add("correct");
      target.disabled = true;
    }
    // if (value !== secretWord[index]) {
    //   target.classList.add("incorrect");
    //   target.disabled = true;
    // }
  });

  // function evaluateInput(
  //   target: HTMLInputElement,
  //   value: string,
  //   index: number,
  //   secretWord: string[],
  // ) {
  //   if (value === secretWord[index]) {
  //     target.classList.add("correct");
  //     target.disabled = true;
  //   }
  //   if (value !== secretWord[index]) {
  //     target.classList.add("incorrect");
  //     target.disabled = true;
  //   }
  // }
}
