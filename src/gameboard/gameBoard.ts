import {
  app,
  numberOfRows,
  numberOfLetters,
  rowStartduration,
  letterBlockStartduration,
} from "../config/config";
import wait from "../utils/utils";
import "./s.css";

function initNewGameBoard() {
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("game-board");
  gameBoard.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`;
  app?.appendChild(gameBoard);

  createRows(gameBoard, numberOfRows);
}

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

    wait(letterBlockStartduration * letterBlockNumber).then(() =>
      row.appendChild(letterBlock),
    );
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

export default initNewGameBoard;
