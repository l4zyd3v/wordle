interface SecretWord {
  letter: string;
  evaluation: "correct" | "wrong" | "almost" | false;
  almost_at_index: number | null;
}

export var secretWord: SecretWord[] = [
  {
    letter: "h",
    evaluation: false,
    almost_at_index: null,
  },
  {
    letter: "e",
    evaluation: false,
    almost_at_index: null,
  },
  {
    letter: "l",
    evaluation: false,
    almost_at_index: null,
  },
  {
    letter: "l",
    evaluation: false,
    almost_at_index: null,
  },
  {
    letter: "o",
    evaluation: false,
    almost_at_index: null,
  },
];

// export var secretWord: SecretWord[] = [
//   {
//     letter: "h",
//     answer: "",
//     evaluation: false,
//     almost: {
//       index: null,
//       value: false,
//     },
//   },
//   {
//     letter: "e",
//     answer: "",
//     evaluation: false,
//     almost: {
//       index: null,
//       value: false,
//     },
//   },
//   {
//     letter: "l",
//     answer: "",
//     evaluation: false,
//     almost: {
//       index: null,
//       value: false,
//     },
//   },
//   {
//     letter: "l",
//     answer: "",
//     evaluation: false,
//     almost: {
//       index: null,
//       value: false,
//     },
//   },
//   {
//     letter: "o",
//     answer: "",
//     evaluation: false,
//     almost: {
//       index: null,
//       value: false,
//     },
//   },
// ];
