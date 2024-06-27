import { secretWord } from "../config/secretWord";
import {
  checkIfRowIsFilled,
  getLatestFilledLetterBlock,
  getCurrent,
  Current,
} from "./utils";

function listenToInGameKeyBoardClick(keyBoard: HTMLElement): void {
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
  const currentLetterBlock = getCurrent()?.letterBlock();
  if (currentLetterBlock) {
    currentLetterBlock.textContent = key;
  }
}

function enterClick(): void {
  const rowIsNotFilled = checkIfRowIsFilled();

  if (rowIsNotFilled) {
    console.log("row is not filled");
    return;
  }
  validate();
}

function deleteClick(): void {
  const latestFilledLetterBlock = getLatestFilledLetterBlock();

  if (latestFilledLetterBlock) latestFilledLetterBlock.textContent = "";
}

async function validate() {
  console.log(secretWord);
  const current = getCurrent();
  if (!current) {
    throw new Error("No current row found");
  }

  const currentRowChildren = Array.from(
    current.row().childNodes as NodeListOf<HTMLElement>,
  );

  for (let i = 0; i < secretWord.length; i++) {
    const secretLetter = secretWord[i].letter;
    const answer = currentRowChildren[i].textContent;
    const evaluation = secretWord[i].evaluation;

    await checkCorrect(secretLetter, answer, i, currentRowChildren);
    await checkAlmost(secretLetter, answer, i, evaluation, currentRowChildren);
    await checkWrong(secretLetter, answer, i, evaluation, currentRowChildren);
    // await lockAnswerToRow();
  }
}

async function checkWrong(
  secretLetter: string,
  answer: string | null,
  index: number,
  evaluation: string | boolean,
  currentRowChildren: Array<HTMLElement>,
) {
  if (answer !== secretLetter) {
    secretWord[index].evaluation = "wrong";
    currentRowChildren[index].classList.add("wrong");
  }
}

async function checkAlmost(
  secretLetter: string,
  answer: string | null,
  index: number,
  evaluation: string | boolean,
  currentRowChildren: Array<HTMLElement>,
) {
  if (answer !== secretLetter) {
    for (let j = 0; j < secretWord.length; j++) {
      if (
        secretWord[j].evaluation !== "correct" &&
        answer === secretWord[j].letter
      ) {
        secretWord[j].evaluation = "almost";
        secretWord[j].almost_at_index = index;

        currentRowChildren[index].classList.add("almost");
      }
    }
  }
}

async function checkCorrect(
  secretLetter: string,
  answer: string | null,
  index: number,
  currentRowChildren: Array<HTMLElement>,
) {
  new Promise<void>((resolve) => {
    if (answer === secretLetter) {
      secretWord[index].evaluation = "correct";
      currentRowChildren[index].classList.add("correct");
    }

    return resolve();
  });
}
export { listenToInGameKeyBoardClick };
