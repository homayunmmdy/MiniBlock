// script.js
class GridGame {
  constructor() {
    this.block = document.getElementById("block");
    this.gridContainer = document.getElementById("gridContainer");
    this.blockSize = 50; // Size of each block in pixels
    this.moveSound = document.getElementById("moveSound"); // Audio element
    this.posX = 0; // Initial X position
    this.posY = 0; // Initial Y position

    this.init();
  }

  init() {
    this.createGrid();
    this.centerBlock();
    window.addEventListener("keydown", (event) => this.moveBlock(event));
  }

  createGrid() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const columns = Math.floor(screenWidth / this.blockSize);
    const rows = Math.floor(screenHeight / this.blockSize);

    this.gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${this.blockSize}px)`;
    this.gridContainer.style.gridTemplateRows = `repeat(${rows}, ${this.blockSize}px)`;

    for (let i = 0; i < columns * rows; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      this.gridContainer.appendChild(cell);
    }
  }

  centerBlock() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate the center position
    this.posX = Math.floor((screenWidth - this.blockSize) / 2);
    this.posY = Math.floor((screenHeight - this.blockSize) / 2);

    // Set the block's initial position
    this.block.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
  }

  moveBlock(event) {
    const step = this.blockSize; // Move by one block size
    let moved = false; // Flag to check if the block moved

    switch (event.key) {
      case "ArrowUp":
        if (this.posY - step >= 0) {
          this.posY -= step;
          moved = true;
        }
        break;
      case "ArrowDown":
        if (this.posY + step <= window.innerHeight - this.blockSize) {
          this.posY += step;
          moved = true;
        }
        break;
      case "ArrowLeft":
        if (this.posX - step >= 0) {
          this.posX -= step;
          moved = true;
        }
        break;
      case "ArrowRight":
        if (this.posX + step <= window.innerWidth - this.blockSize) {
          this.posX += step;
          moved = true;
        }
        break;
    }

    if (moved) {
      this.block.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
      this.playMoveSound(); // Play the sound effect
    }
  }

  playMoveSound() {
    this.moveSound.currentTime = 0; // Rewind the sound to the start
    this.moveSound.play(); // Play the sound
  }
}

// Initialize the game
const gridGame = new GridGame();