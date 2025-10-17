const boardSize = 4;
let board = [];
let score = 0;
const goal = 2048;

// Selectors
const boardContainer = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const finalScoreEl = document.getElementById('finalScore');
const finalMessageEl = document.getElementById('finalMessage');
const gameModalEl = document.getElementById('gameModal');
const playAgainBtn = document.getElementById('playAgainBtn');

const gameModal = new bootstrap.Modal(gameModalEl);

function createEmptyBoard() {
  return Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
}

function addRandomTile() {
  const emptyCells = [];
  board.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === 0) emptyCells.push({ r, c });
    });
  });

  if (emptyCells.length > 0) {
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
}

function drawBoard() {
  boardContainer.innerHTML = '';
  board.flat().forEach(value => {
    const cell = document.createElement('div');
    cell.className = `cell cell-${value}`;
    cell.textContent = value > 0 ? value : '';
    boardContainer.appendChild(cell);
  });
  scoreElement.textContent = score;
}

function slide(row) {
  const newRow = row.filter(val => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }
  return newRow.filter(val => val !== 0).concat(Array(boardSize - newRow.filter(val => val !== 0).length).fill(0));
}

function moveLeft() {
  let moved = false;
  for (let r = 0; r < boardSize; r++) {
    const newRow = slide(board[r]);
    if (newRow.toString() !== board[r].toString()) moved = true;
    board[r] = newRow;
  }
  if (moved) addRandomTile();
  drawBoard();
  checkGameState();
}

function rotateClockwise(matrix) {
  const result = matrix.map((_, i) => matrix.map(row => row[i]).reverse());
  return result;
}

function moveRight() {
  board = board.map(row => row.reverse());
  moveLeft();
  board = board.map(row => row.reverse());
}

function moveUp() {
  board = rotateClockwise(board);
  moveLeft();
  board = rotateClockwise(board);
  board = rotateClockwise(board);
  board = rotateClockwise(board);
}

function moveDown() {
  board = rotateClockwise(board);
  board = rotateClockwise(board);
  board = rotateClockwise(board);
  moveLeft();
  board = rotateClockwise(board);
}

function checkGameState() {
  if (board.flat().includes(goal)) {
    showModal('You Win!', '🎉 You reached 2048!');
    return;
  }

  if (board.flat().includes(0)) return;

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize - 1; c++) {
      if (board[r][c] === board[r][c + 1]) return;
    }
  }
  for (let c = 0; c < boardSize; c++) {
    for (let r = 0; r < boardSize - 1; r++) {
      if (board[r][c] === board[r + 1][c]) return;
    }
  }

  showModal('Game Over', 'No more moves left!');
}

function showModal(title, message) {
  document.getElementById('gameModalLabel').textContent = title;
  finalMessageEl.textContent = message;
  finalScoreEl.textContent = score;
  gameModal.show();
}

function handleKey(e) {
  switch (e.key) {
    case 'ArrowLeft': moveLeft(); break;
    case 'ArrowRight': moveRight(); break;
    case 'ArrowUp': moveUp(); break;
    case 'ArrowDown': moveDown(); break;
  }
}

function startGame() {
  score = 0;
  board = createEmptyBoard();
  addRandomTile();
  addRandomTile();
  drawBoard();
}

restartBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
window.addEventListener('keydown', handleKey);

startGame();
