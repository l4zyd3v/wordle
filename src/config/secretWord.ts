interface SecretWord {
  letter: string;
  answer: string;
  evaluation: "correct" | "wrong" | "almost" | false;
  almost: { index: number | null; value: boolean | string };
}

export var secretWord: SecretWord[] = [
  {
    letter: "h",
    answer: "",
    evaluation: false,
    almost: {
      index: null,
      value: false,
    },
  },
  {
    letter: "e",
    answer: "",
    evaluation: false,
    almost: {
      index: null,
      value: false,
    },
  },
  {
    letter: "l",
    answer: "",
    evaluation: false,
    almost: {
      index: null,
      value: false,
    },
  },
  {
    letter: "l",
    answer: "",
    evaluation: false,
    almost: {
      index: null,
      value: false,
    },
  },
  {
    letter: "o",
    answer: "",
    evaluation: false,
    almost: {
      index: null,
      value: false,
    },
  },
];
