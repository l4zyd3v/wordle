import { secretWord } from "../config/secretWord";

function listenToInGameKeyBoardClick(keyBoard: HTMLElement) {
  console.log("test");
  keyBoard.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const key = target.textContent;

    console.log("key", key);

    // I need to figure out what the currentLetterIndex is
    // And I need to make sure that it only listens for buttons input.
  });
}

function insertUserInput(inputValue: string, currentLetterIndex: number) {
  secretWord[currentLetterIndex].answer = inputValue;
}

function checkIfInputIsLastLetter(
  currentLetterIndex: number,
  nextInput: HTMLInputElement,
) {
  if (currentLetterIndex !== secretWord.length - 1) {
    nextInput.disabled = false;
    nextInput.focus();
  } else {
    console.log("last letter");
    completeEvaluation();
  }
}

function completeEvaluation() {
  console.log("completeEvaluation", secretWord);

  checkIfCorrect();
  checkIfAlmost();
  checkIfWrong();

  LockAnswers();
}

function checkIfWrong() {
  for (let i = 0; i < secretWord.length; i++) {
    const answer = secretWord[i].answer;
    const secretLetter = secretWord[i].letter;
    const evaluation = secretWord[i].evaluation;

    if (answer !== secretLetter && !evaluation) {
      secretWord[i].evaluation = "wrong";
    }
  }
}

function checkIfAlmost() {
  for (let i = secretWord.length - 1; i >= 0; i--) {
    const currentLetterBlock = document.querySelector(
      `.letter-block-row-${i + 1}`,
    ) as HTMLInputElement;
    const currentInputValue = currentLetterBlock.value;

    const answer = secretWord[i].answer;
    const secretLetter = secretWord[i].letter;
    const itExistAndNotYetValued =
      checkExistenceAndEvaluation(currentInputValue);
    const occurrence = checkOccurrence(currentInputValue);

    if (answer !== secretLetter && itExistAndNotYetValued) {
      for (let j = secretWord.length - 1; j >= 0; j--) {
        if (
          answer === secretWord[j].letter &&
          secretWord[j].evaluation !== "correct"
        ) {
          secretWord[j].almost.value = "almost";
          secretWord[j].almost.index = i;
        }
      }
    }
  }
}

function checkIfCorrect() {
  for (let i = 0; i < secretWord.length; i++) {
    const answer = secretWord[i].answer;
    const letter = secretWord[i].letter;

    if (letter === answer) {
      secretWord[i].evaluation = "correct";
    }
  }
}

function LockAnswers() {
  for (let i = 0; i < secretWord.length; i++) {
    const currentLetterBlock = document.querySelector(
      `.letter-block-row-${i + 1}`,
    ) as HTMLInputElement;
    const evalValue = secretWord[i].evaluation;

    const almostValue = secretWord[i].almost.value;
    const almostValueIndex = secretWord[i].almost.index;
    // const almostLocation = secretWord[i].almost_location;

    if (evalValue === "correct") {
      setTarget(currentLetterBlock, "correct");
    }

    if (evalValue === "wrong") {
      setTarget(currentLetterBlock, "wrong");
    }

    if (almostValue === "almost") {
      if (almostValueIndex !== null) {
        // almostLocation !== null is to satisfy TS
        const almostBlock = document.querySelector(
          `.letter-block-row-${almostValueIndex + 1}`,
        ) as HTMLInputElement;
        almostBlock.classList.add("almost");
      }
    }

    function setTarget(target: HTMLElement, validationValue: string) {
      target.classList.add(`${validationValue}`);
    }
  }
}

function checkExistenceAndEvaluation(inputValue: string): boolean | void {
  for (let i = 0; i < secretWord.length; i++) {
    const secretLetter = secretWord[i].letter;
    const evaluation = secretWord[i].evaluation;

    if ((secretLetter === inputValue && evaluation !== "correct") || "almost") {
      return true;
    }
  }
}

// testing to see if I can fit into this function the capability to conclude if a letter which occurs more than; How many times its been evaluated..  badly phrased lol..
function checkOccurrence(inputValue: string): number {
  const occurrences = [];

  for (let i = 0; i < secretWord.length; i++) {
    if (inputValue === secretWord[i].letter) {
      occurrences.push(inputValue);
    }
  }
  console.log(`occurrences`, occurrences.length);
  return occurrences.length;
}

// backup:
// function checkOccurrence(inputValue: string): number {
//   const occurrences = [];
//
//   for (let i = 0; i < secretWord.length; i++) {
//     if (inputValue === secretWord[i].letter) {
//       occurrences.push(inputValue);
//     }
//   }
//
//   return occurrences.length;
// }

export { listenToInGameKeyBoardClick };
