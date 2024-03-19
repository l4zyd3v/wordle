import { app } from "../config/config";

export default function createHeading() {
  const h1 = document.createElement("h1");
  h1.classList.add("heading1");

  h1.textContent = "Guess the word";
  app?.prepend(h1);
}
