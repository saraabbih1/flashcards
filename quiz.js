const card = document.getElementById("card");
const flipBtn = document.getElementById("flipBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

let index = 0;

// Quiz data (BLA JSON, direct)
const quiz = [
  {
    question: "Que signifie HTML ?",
    answer: "Hyper Text Markup Language"
  },
  {
    question: "La balise <div> est-elle sémantique ?",
    answer: "Non, elle n'est pas sémantique."
  },
  {
    question: "La balise <p> sert à quoi ?",
    answer: "Créer un paragraphe."
  }
];

// Load question
function loadCard() {
  const q = document.querySelector(".flip-card-front");
  const a = document.querySelector(".flip-card-back");

  q.textContent = quiz[index].question;
  a.textContent = quiz[index].answer;

  // Reset flip
  card.classList.remove("flipped");
  flipBtn.textContent = "Show Answer";
}

loadCard();

// Flip card
flipBtn.addEventListener("click", () => {
  card.classList.toggle("flipped");

  if (card.classList.contains("flipped")) {
    flipBtn.textContent = "Show Question";
  } else {
    flipBtn.textContent = "Show Answer";
  }
});

// Next
nextBtn.addEventListener("click", () => {
  index = (index + 1) % quiz.length;
  loadCard();
});

// Back
backBtn.addEventListener("click", () => {
  index = (index - 1 + quiz.length) % quiz.length;
  loadCard();
});
