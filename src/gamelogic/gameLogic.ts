import { secretWord } from "../config/secretWord";
import {
  checkIfRowIsFilled,
  getCurrentRow,
  getLatestFilledLetterBlock,
} from "./utils";

function listenToInGameKeyBoardClick(keyBoard: HTMLElement) {
  keyBoard.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const key = target.textContent;

    console.log(key);

    if (!(target instanceof HTMLButtonElement)) return;

    if (key === "enter") {
      enterClick();
      return;
    }

    if (key === "del") {
      deleteClick();
      return;
    }

    // only insert if key is in fact a letter... either give the letter a data attribute or check programmatically
    if (key) insertKey(key);
  });
}

function insertKey(key: string) {
  getCurrentRow(key);
}

function enterClick() {
  const rowIsNotFilled = checkIfRowIsFilled();

  if (rowIsNotFilled) {
    console.log("row is not filled");
    return;
  }

  validate();
}

function deleteClick() {
  const latestFilledLetterBlock = getLatestFilledLetterBlock();

  if (latestFilledLetterBlock) latestFilledLetterBlock.textContent = "";
}

function validate() {
  console.log("Row Validation");
}

export { listenToInGameKeyBoardClick };
