const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const questionCountEl = document.getElementById("questionCount");

let score = 0;
let questionCount = 0;

async function loadQuestion() {
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "<p>Cargando...</p>";

  const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986");
  const data = await res.json();
  const trivia = data.results[0];

  const question = decodeURIComponent(trivia.question);
  const correctAnswer = decodeURIComponent(trivia.correct_answer);
  const incorrectAnswers = trivia.incorrect_answers.map(ans => decodeURIComponent(ans));

  const answers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);

  questionCount++;
  questionCountEl.textContent = `Pregunta: ${questionCount}`;
  questionEl.textContent = question;
  optionsEl.innerHTML = "";

  answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => checkAnswer(btn, answer, correctAnswer));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    scoreEl.textContent = `Puntos: ${score}`;
  } else {
    button.classList.add("incorrect");
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", loadQuestion);

loadQuestion();
