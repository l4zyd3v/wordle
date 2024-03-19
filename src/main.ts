import initNewGameBoard from "./gameboard/gameBoard";
import createHeading from "./heading/heading";
import addKeyBoard from "./keybaord/addKeyBoard";

document.addEventListener("DOMContentLoaded", () => {
  initNewGameBoard();
  createHeading();
  addKeyBoard();
});
