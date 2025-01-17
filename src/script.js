// script.js
class GridGame {
  constructor() {
    this.block = document.getElementById("block");
    this.gridContainer = document.getElementById("gridContainer");
    this.blockSize = 50; // Size of each block in pixels
    this.moveSound = document.getElementById("moveSound"); // Audio element
    this.posX = 0; // Initial X position
    this.posY = 0; // Initial Y position
    this.touchStartX = 0; // Initial touch X position
    this.touchStartY = 0; // Initial touch Y position
    this.isDragging = false; // Flag to check if the block is being dragged

    this.init();
  }

  init() {
    this.createGrid();
    this.centerBlock();
    this.addEventListeners();
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

  addEventListeners() {
    // Keyboard event listener
    window.addEventListener("keydown", (event) => this.moveBlock(event));

    // Touch event listeners
    this.block.addEventListener("touchstart", (event) => this.handleTouchStart(event));
    this.block.addEventListener("touchmove", (event) => this.handleTouchMove(event));
    this.block.addEventListener("touchend", () => this.handleTouchEnd());
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
      this.updateBlockPosition();
      this.playMoveSound(); // Play the sound effect
    }
  }

  handleTouchStart(event) {
    // Get the initial touch position
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isDragging = true;
  }

  handleTouchMove(event) {
    if (!this.isDragging) return;

    // Calculate the new position based on touch movement
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = touchX - this.touchStartX;
    const deltaY = touchY - this.touchStartY;

    // Update the block's position
    this.posX += deltaX;
    this.posY += deltaY;

    // Constrain the block within the screen boundaries
    this.posX = Math.max(0, Math.min(window.innerWidth - this.blockSize, this.posX));
    this.posY = Math.max(0, Math.min(window.innerHeight - this.blockSize, this.posY));

    // Update the block's position on the screen
    this.updateBlockPosition();

    // Update the initial touch position for the next move
    this.touchStartX = touchX;
    this.touchStartY = touchY;

    // Play the move sound effect
    this.playMoveSound();
  }

  handleTouchEnd() {
    this.isDragging = false;
  }

  updateBlockPosition() {
    this.block.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
  }

  playMoveSound() {
    this.moveSound.currentTime = 0; // Rewind the sound to the start
    this.moveSound.play(); // Play the sound
  }
}

// Initialize the game
const gridGame = new GridGame();