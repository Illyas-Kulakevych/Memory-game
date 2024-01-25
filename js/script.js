const cards = document.querySelectorAll('.memory-card');
const restartButton = document.getElementById('restart-button');
const attemptsCounter = document.getElementById('attempts-counter');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let attempts = 0;
//
let pairs = 0;

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
  attempts++;
  updateAttemptsCounter();

  checkForMatch();
}

function updateAttemptsCounter() {
  attemptsCounter.textContent = `Attempts: ${attempts}`;
}

// function checkForMatch() {
//   let isMatch = firstCard.dataset.planet === secondCard.dataset.planet;
//   isMatch ? disableCards() : unflipCards();
// }
function checkForMatch() {
  if (firstCard.dataset.planet === secondCard.dataset.planet) {
    disableCards();
    pairs++;
    if (pairs === cards.length / 2) {
      gameCompleted();
    }
    return;
  } else {
    unflipCards();
  }
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

function resetAttemptsCounter() {
  attempts = 0;
  updateAttemptsCounter();
}

function shuffleCards() {

resetAttemptsCounter();

  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
};

function setupRestartButton() {
  restartButton.addEventListener('click', () => {
    resetGame();
  });
}

setupRestartButton();

function gameCompleted() {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';

  const finalAttemptsSpan = document.getElementById('finalAttempts');
  finalAttemptsSpan.textContent = attempts;

  const playAgainButton = document.getElementById('playAgainButton');
  playAgainButton.addEventListener('click', () => {
    closeModal();
    resetGame();
  });
}

function resetGame() {
  resetBoard();
  resetAttemptsCounter();

  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  pairs = 0;
  shuffleCards();
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

cards.forEach(card => card.addEventListener('click', flipCard));

// START SCREEN

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

function showStartScreen() {
  startScreen.style.display = 'flex';
}

function hideStartScreen() {
  startScreen.style.display = 'none';
}

startButton.addEventListener('click', () => {
  hideStartScreen();
  startGame();
});

function startGame() {
  resetGame();
  shuffleCards()
}

showStartScreen();