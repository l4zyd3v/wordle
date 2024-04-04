function checkIfRowIsFilled() {
  const currentRow = getCurrentRow() as HTMLElement;
  const currentRowChildren = currentRow.childNodes as NodeListOf<HTMLElement>;
  let blocksThatsNotFilled = [];

  for (let i = 0; i < currentRowChildren.length; i++) {
    const currentChild = currentRowChildren[i] as HTMLElement;

    if (currentChild.textContent === "") {
      blocksThatsNotFilled.push(currentChild);
    }
  }

  if (blocksThatsNotFilled.length > 0) {
    return true;
  } else {
    return false;
  }
}

function getLatestFilledLetterBlock() {
  const currentRow = getCurrentRow() as HTMLElement;
  const currentRowChildren = currentRow.childNodes as NodeListOf<HTMLElement>;

  for (let i = currentRowChildren.length - 1; i >= 0; i--) {
    const currentChildValue = currentRowChildren[i]?.textContent;

    if (currentChildValue !== "") {
      return currentRowChildren[i];
    }
  }
}

function getCurrentRow(key?: string) {
  const rows = document.querySelectorAll(".row");

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];

    if (currentRow.getAttribute("data-empty") === "true") {
      getCurrentLetterBlock(currentRow.childNodes, key);

      return currentRow;
    }
  }
}

// local function(s)
function getCurrentLetterBlock(
  letterBlocks: NodeListOf<ChildNode>,
  key?: string,
) {
  for (let i = 0; i < letterBlocks.length; i++) {
    //O(n^²)
    const currentLetterBlock = letterBlocks[i] as HTMLElement;

    if (currentLetterBlock.textContent === "") {
      // console.log(currentLetterBlock);
      if (key) currentLetterBlock.textContent = key;

      return currentLetterBlock;
    }
  }
}

export { checkIfRowIsFilled, getCurrentRow, getLatestFilledLetterBlock };
