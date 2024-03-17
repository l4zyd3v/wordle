import initNewGameBoard from "./gameboard/gameBoard";
import createHeading from "./heading/heading";
import addKeyboard from "./keybaord/addKeyBoard";

document.addEventListener("DOMContentLoaded", () => {
  initNewGameBoard();
  createHeading();
  addKeyboard();
});

