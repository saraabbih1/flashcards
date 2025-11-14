let questions = [];
let index = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highScoreText").textContent = "High Score : " + highScore;

// fetch JSON
fetch("quiz.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(err => console.log("Erreur JSON:", err));

function loadQuestion() {
  if(index < 0) index = 0;
  if(index >= questions.length) index = questions.length - 1;

  let q = questions[index];
  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option p-3 bg-purple-100 rounded-xl hover:bg-purple-300 transition cursor-pointer";
    div.textContent = opt;
    div.onclick = () => select(div, i);
    optionsDiv.appendChild(div);
  });
}

function select(btn, i) {
  const q = questions[index];
  const all = document.querySelectorAll(".option");
  all.forEach(o => o.classList.add("disabled"));

  if(i === q.correct) {
    btn.classList.add("correct");
    score++;
    document.getElementById("scoreText").textContent = "Score : " + score;
  } else {
    btn.classList.add("wrong");
    all[q.correct].classList.add("correct");
  }
}

document.getElementById("nextBtn").onclick = () => {
  index++;
  if(index >= questions.length) endQuiz();
  else loadQuestion();
};

document.getElementById("backBtn").onclick = () => {
  index--;
  if(index < 0) index = 0;
  loadQuestion();
};

document.getElementById("showAnswerBtn").onclick = () => {
  const q = questions[index];
  const all = document.querySelectorAll(".option");
  all.forEach(o => o.classList.add("disabled"));
  all[q.correct].classList.add("correct");
};

function endQuiz() {
  document.getElementById("question").classList.add("hidden");
  document.getElementById("options").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("backBtn").classList.add("hidden");
  document.getElementById("showAnswerBtn").classList.add("hidden");

  document.getElementById("finalScreen").classList.remove("hidden");
  document.getElementById("finalScore").textContent = "Score final : " + score;

  if(score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }
  document.getElementById("finalHighScore").textContent = "High Score : " + highScore;
}

function restartQuiz() {
  index = 0;
  score = 0;

  document.getElementById("scoreText").textContent = "Score : 0";
  document.getElementById("question").classList.remove("hidden");
  document.getElementById("options").classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");
  document.getElementById("backBtn").classList.remove("hidden");
  document.getElementById("showAnswerBtn").classList.remove("hidden");
  document.getElementById("finalScreen").classList.add("hidden");

  loadQuestion();
};
