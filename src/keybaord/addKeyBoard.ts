import { app } from "../config/config";
import { keyRowOne, keyRowTwo, keyRowThree } from "./keyRows";

export default function addKeyBoard() {
  const keyBoard = document.createElement("div");

  createKeyWrappers("firstRowWrapper", keyBoard, keyRowOne, "wrapper1");
  createKeyWrappers("secondRowWrapper", keyBoard, keyRowTwo, "wrapper2");
  createKeyWrappers("thirdRowWrapper", keyBoard, keyRowThree, "wrapper3");

  keyBoard.classList.add("keyBoard");
  if (app !== null) app.appendChild(keyBoard);
}

function createKeyWrappers(
  wrapperName: string,
  keyBoard: HTMLDivElement,
  keyRow: string[],
  wrapperNumb: string, // to select specific wrapper in css
) {
  const wrapperElement = document.createElement("div");
  wrapperElement.classList.add("key-wrappers");
  wrapperElement.classList.add(`${wrapperName}`);
  wrapperElement.classList.add(wrapperNumb);

  addRowToWrappeer(keyRow, wrapperElement);

  keyBoard.appendChild(wrapperElement);
}

function addRowToWrappeer(keyRow: string[], wrapper: HTMLDivElement) {
  for (let i = 0; i < keyRow.length; i++) {
    const keyElement = document.createElement("button");
    const keyName = keyRow[i];

    keyElement.textContent = `${keyName}`;
    keyElement.classList.add(`keys`);
    keyElement.classList.add(`key-${keyName}`);

    wrapper.appendChild(keyElement);
  }
}
