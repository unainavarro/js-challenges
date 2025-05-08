const questions = [
  {
    question: "¿Para qué se utiliza principalmente JavaScript?",
    answers: [
      {
        text: "Para diseñar páginas web",
        correct: false,
      },
      {
        text: "Para crear elementos interactivos en la web",
        correct: true,
      },
      {
        text: "Para estructurar el contenido web",
        correct: false,
      },
      {
        text: "Para gestionar bases de datos",
        correct: false,
      },
    ],
  },
  {
    question: "¿Qué empresa desarrolló JavaScript?",
    answers: [
      {
        text: "Apple",
        correct: false,
      },
      {
        text: "Microsoft",
        correct: false,
      },
      {
        text: "Sun Microsystems",
        correct: false,
      },
      {
        text: "Netscape",
        correct: true,
      },
    ],
  },
  {
    question: "¿Qué declaración de variables tiene un alcance de bloque?",
    answers: [
      {
        text: "var",
        correct: false,
      },
      {
        text: "let",
        correct: true,
      },
      {
        text: "const",
        correct: true,
      },
      {
        text: "Ninguna de las anteriores",
        correct: false,
      },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Siguiente";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  console.log(selectedBtn);

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Volver a jugar";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
