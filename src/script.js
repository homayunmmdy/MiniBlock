// script.js
const block = document.getElementById("block");
const gridContainer = document.getElementById("gridContainer");
const blockSize = 50; // Size of each block in pixels
const moveSound = document.getElementById("moveSound"); // Audio element
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
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
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
  let moved = false; // Flag to check if the block moved

  switch (event.key) {
    case "ArrowUp":
      if (posY - step >= 0) {
        posY -= step;
        moved = true;
      }
      break;
    case "ArrowDown":
      if (posY + step <= window.innerHeight - blockSize) {
        posY += step;
        moved = true;
      }
      break;
    case "ArrowLeft":
      if (posX - step >= 0) {
        posX -= step;
        moved = true;
      }
      break;
    case "ArrowRight":
      if (posX + step <= window.innerWidth - blockSize) {
        posX += step;
        moved = true;
      }
      break;
  }

  if (moved) {
    block.style.transform = `translate(${posX}px, ${posY}px)`;
    playMoveSound(); // Play the sound effect
  }
}

// Play the move sound effect
function playMoveSound() {
  moveSound.currentTime = 0; // Rewind the sound to the start
  moveSound.play(); // Play the sound
}

// Initialize the grid, center the block, and add event listener
createGrid();
centerBlock();
window.addEventListener("keydown", moveBlock);
