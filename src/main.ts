import "./s.css";

const app = document.getElementById("app");
const numberOfRows = 10;
const numberOfLetters = 5;
const rowStartduration = 70;
const letterBlockStartduration = 80;

interface SecretWord {
  letter: string;
  answer: "correct" | "wrong" | "almost" | false;
}

// answer can either be: correct, wrong, almost.
var secretWord: SecretWord[] = [
  { letter: "h", answer: false },
  { letter: "e", answer: false },
  { letter: "l", answer: false },
  { letter: "l", answer: false },
  { letter: "o", answer: false },
];

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
}

function disableAllLetterBlocksBesidesFirstOneAndFocus(
  letterBlock: HTMLInputElement,
  row: HTMLDivElement,
  letterBlockNumber: number,
) {
  letterBlock.disabled = true;

  // enable the absolute first letter block, and focus it
  if (row.classList.contains("row-1") && letterBlockNumber === 1) {
    letterBlock.disabled = false;

    letterBlock.focus();
  }
}
// ----------------------------------------------------------
function listenToInput(letterBlock: HTMLInputElement, i: number) {
  letterBlock.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const currentLetterIndex = i;
    const nextInput = target.nextElementSibling as HTMLInputElement;

    // test if the input is a letter otherwise return
    if (!/^[a-zA-Z]*$/.test(value)) {
      target.value = "";
      return;
    }
    evaluateInput(value, currentLetterIndex);
    checkIfLastLetter(target, value, currentLetterIndex, nextInput);
  });
}

function checkIfLastLetter(
  target: HTMLInputElement,
  value: string,
  currentLetterIndex: number,
  nextInput: HTMLInputElement,
) {
  if (currentLetterIndex !== secretWord.length - 1) {
    nextInput.disabled = false;
    nextInput.focus();
  } else {
    console.log("last letter");
    completeEvaluation();
    console.log(secretWord);
  }
}

function completeEvaluation() {
  console.log("completeEvaluation", secretWord);

  for (let i = 0; i < secretWord.length; i++) {
    const currentLetterBlockNumber = i + 1;
    const currentLetterBlock = document.querySelector(
      `.letter-block-row-${currentLetterBlockNumber}`,
    ) as HTMLInputElement;

    console.log(currentLetterBlock);

    const evalValue = secretWord[i].answer;

    if (evalValue === "correct") {
      setTarget(currentLetterBlock, "correct");
    }

    if (evalValue === "wrong") {
      setTarget(currentLetterBlock, "wrong");
    }

    if (evalValue === "almost") {
      setTarget(currentLetterBlock, "almost");
    }
  }

  function setTarget(target: HTMLElement, validationValue: string) {
    target.classList.add(`${validationValue}`);
  }
}

function evaluateInput(inputValue: string, currentLetterIndex: number) {
  const currentLetter = secretWord[currentLetterIndex].letter;
  const answer = secretWord[currentLetterIndex].answer;
  const itExist = checkExistence(inputValue);

  checkOccurrence(inputValue);

  if (inputValue) {
    if (inputValue === currentLetter) {
      secretWord[currentLetterIndex].answer = "correct";
    }
    if (inputValue !== currentLetter) {
      if (itExist) {
        secretWord[currentLetterIndex].answer = "almost";
      }
    }
  }
}

function checkExistence(inputValue: string): boolean | void {
  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord[i].letter;

    if (letter === inputValue) {
      return true;
    }
  }
}

function checkOccurrence(inputValue: string): number {
  const occurrences = [];

  for (let i = 0; i < secretWord.length; i++) {
    if (inputValue === secretWord[i].letter) {
      occurrences.push(inputValue);
    }
  }
  console.log("occurrences: ", occurrences.length);

  return occurrences.length;
}
