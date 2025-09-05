// your JS code here.

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.querySelector("#questions");
const scoreElement = document.querySelector("#score");

// Load saved progress from sessionStorage
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Restore saved progress
      if (savedProgress[i] === choice) {
        choiceInput.checked = true;
        choiceInput.setAttribute("checked", "true"); // Cypress fix
      }

      // Save progress on change
      choiceInput.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(choiceInput);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Submit quiz
function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = resultText;

  // Save final score in localStorage
  localStorage.setItem("score", score);
}

// Render quiz on page load
renderQuestions();

// Restore score if already submitted
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}

// Add event listener to submit button
document.querySelector("#submit").addEventListener("click", submitQuiz);
