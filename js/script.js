// script.js
const block = document.getElementById('block');
const gridContainer = document.getElementById('gridContainer');
const blockSize = 50; // Size of each block in pixels
let posX = 0; // Initial X position
let posY = 0; // Initial Y position


// Create the grid dynamically
function createGrid() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const columns = Math.floor(screenWidth / blockSize);
  const rows = Math.floor(screenHeight / blockSize);

  gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${blockSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, ${blockSize}px)`;

  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    gridContainer.appendChild(cell);
  }
}

// Center the block on the screen
function centerBlock() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Calculate the center position
  posX = Math.floor((screenWidth - blockSize) / 2);
  posY = Math.floor((screenHeight - blockSize) / 2);

  // Set the block's initial position
  block.style.transform = `translate(${posX}px, ${posY}px)`;
}

// Move the block based on keyboard input
function moveBlock(event) {
  const step = blockSize; // Move by one block size

  switch (event.key) {
    case 'ArrowUp':
      posY = Math.max(posY - step, 0);
      break;
    case 'ArrowDown':
      posY = Math.min(posY + step, window.innerHeight - blockSize);
      break;
    case 'ArrowLeft':
      posX = Math.max(posX - step, 0);
      break;
    case 'ArrowRight':
      posX = Math.min(posX + step, window.innerWidth - blockSize);
      break;
  }

  block.style.transform = `translate(${posX}px, ${posY}px)`;
}

// Initialize the grid, center the block, and add event listener
createGrid();
centerBlock();
window.addEventListener('keydown', moveBlock);