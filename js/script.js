const cards = document.querySelectorAll('.memory-card');
const restartButton = document.getElementById('restart-button');
const attemptsCounter = document.getElementById('attempts-counter');
// 
const recordsContainer = document.getElementById('records-container');
const recordsList = document.getElementById('records-list');
// 
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

  saveRecord(attempts);
  updateRecordsList();
}

function saveRecord(record) {
  const records = JSON.parse(localStorage.getItem('memoryGameRecords')) || [];
  records.push(record);
  localStorage.setItem('memoryGameRecords', JSON.stringify(records));
}

function updateRecordsList() {
  const records = JSON.parse(localStorage.getItem('memoryGameRecords')) || [];
  const sortedRecords = records.sort((a, b) => a - b);
  
  const topRecords = sortedRecords.slice(0, 3);
  recordsList.innerHTML = '';

  sortedRecords.forEach((record, index) => {
    if (window.innerWidth <= 767 && index < 3) {
      const listItem = document.createElement('li');
      listItem.textContent = `Place ${index + 1}: ${record} attempts`;
      recordsList.appendChild(listItem);
    } else if (window.innerWidth > 767) {
      const listItem = document.createElement('li');
      listItem.textContent = `Place ${index + 1}: ${record} attempts`;
      recordsList.appendChild(listItem);
    }
  });

  // sortedRecords.forEach((record, index) => {
  //   const listItem = document.createElement('li');
  //   listItem.textContent = `Place ${index + 1}: ${record} attempts`;
  //   recordsList.appendChild(listItem);
  // });
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
const clearLeaderboardButton = document.getElementById('clear-leaderboard-button');

clearLeaderboardButton.addEventListener('click', () => {
  localStorage.clear();
  updateRecordsList();
});

cards.forEach(card => card.addEventListener('click', flipCard));

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
  hideStartScreen();
  updateRecordsList();
  resetGame();
  shuffleCards();
}

showStartScreen();