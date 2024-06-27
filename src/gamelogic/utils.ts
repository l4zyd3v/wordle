interface Current {
  row: () => HTMLElement;
  letterBlock: () => HTMLElement | undefined;
}

function getCurrent(): Current | undefined {
  const allRows = Array.from(document.querySelectorAll<HTMLElement>(".row"));

  for (const currentRow of allRows) {
    if (currentRow.getAttribute("data-empty") === "true") {
      const letterBlocks = Array.from(currentRow.childNodes);

      const emptyLetterBlock = letterBlocks.find(
        (block: ChildNode) => block.textContent === "",
      );

      return {
        row: () => currentRow as HTMLElement,
        letterBlock: () => emptyLetterBlock as HTMLElement,
      };
    }
  }
}

function checkIfRowIsFilled(): boolean {
  const current = getCurrent();
  if (!current) {
    throw new Error("No current row found");
  }

  const currentRowChildren = Array.from(
    current.row().childNodes as NodeListOf<HTMLElement>,
  );

  return currentRowChildren.some((child) => child.textContent === "");
}

function getLatestFilledLetterBlock(): HTMLElement | null {
  const current = getCurrent();
  if (!current) {
    throw new Error("No current row found");
  }

  const currentRowChildren = Array.from(
    current.row().childNodes as NodeListOf<HTMLElement>,
  );

  for (let i = currentRowChildren.length - 1; i >= 0; i--) {
    if (currentRowChildren[i].textContent !== "") {
      return currentRowChildren[i];
    }
  }

  return null;
}

export { checkIfRowIsFilled, getLatestFilledLetterBlock, getCurrent };
export type { Current };
