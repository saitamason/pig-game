'use strict';

// Selecting elements
const btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  btnNew = document.querySelector('.btn--new'),
  imgDice = document.querySelector('.dice'),
  // Default label
  defaultLabel = document.querySelector('.current-label').textContent;

// Variables
let activePlayer, currentScore, gameStatus, totalScore;

// Reset game
const resetGame = () => {
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  removeWinner();

  currentScore = 0;
  activePlayer = 0;
  displayCurrentScore(0);
  displayCurrentScore(1);

  displayLabel('Current', true);
  displayLabel('Current', false);

  totalScore = [0, 0];
  displayTotalScore(0);
  displayTotalScore(1);

  gameStatus = true;
};

// Display current score
const displayCurrentScore = playerId =>
  (document.getElementById(`current--${playerId}`).textContent = currentScore);

// Display total score
const displayTotalScore = playerId =>
  (document.getElementById(`score--${playerId}`).textContent =
    totalScore[activePlayer]);

// Display label
const displayLabel = (newText, currentPlayer) =>
  (document.getElementById(
    `current-label--${
      currentPlayer ? activePlayer : activePlayer === 0 ? 1 : 0
    }`
  ).textContent = newText);

// Switch player class
const switchPlayerClass = playerId => {
  document
    .querySelector(`.player--${playerId}`)
    .classList.toggle('player--active');
};

// Switch player
const switchPlayer = () => {
  switchPlayerClass(activePlayer);

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  displayCurrentScore(activePlayer);

  displayLabel('Current', true);
  switchPlayerClass(activePlayer);
};

// Remove winner class
const removeWinner = () => {
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
};

// Resetting the game before it starts

resetGame();

// Roll functionality
btnRoll.addEventListener('click', () => {
  if (gameStatus) {
    // Roll dice
    const randomDice = Math.trunc(Math.random() * 6 + 1);
    imgDice.src = `dice-${randomDice}.png`;
    imgDice.classList.remove('hidden');

    if (randomDice !== 1) {
      // Add current score
      currentScore += randomDice;
      displayCurrentScore(activePlayer);

      // Switch player
    } else {
      displayLabel('Just lost', true);
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', () => {
  if (gameStatus) {
    totalScore[activePlayer] += currentScore;
    displayTotalScore(activePlayer);

    // Winning condition
    if (totalScore[activePlayer] >= 100) {
      displayLabel('Winner', true);
      displayLabel('Loser', false);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Ending the game
      gameStatus = false;
    } else {
      displayLabel('Just won', true);
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', resetGame);
