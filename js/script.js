const cards = document.querySelectorAll('.memory-card');
//
const attemptsCounter = document.getElementById('attempts-counter');
//
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
//
let attempts = 0;
//

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  
//
attempts++;
  updateAttemptsCounter();
//
  checkForMatch();
}
//
function updateAttemptsCounter() {
  attemptsCounter.textContent = `Attempts: ${attempts}`;
}
//

function checkForMatch() {
  let isMatch = firstCard.dataset.planet === secondCard.dataset.planet;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//
function resetAttemptsCounter() {
  attempts = 0;
  updateAttemptsCounter();
}

//

(function shuffleCards() {
//
resetAttemptsCounter();
//
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

