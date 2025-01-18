
class GridGame {
  constructor() {
    this.block = document.getElementById("block");
    this.gridContainer = document.getElementById("gridContainer");
    this.blockSize = 50; // Size of each block in pixels
    this.moveSound = document.getElementById("moveSound"); // Audio element for movement
    this.grassChangeSound = document.getElementById("grassChangeSound"); // Audio element for image change
    this.cellImage = "./assets/images/dirt.jpg"; // Replace with your image path
    this.defaultCellImage = "./assets/images/grass.webp"; // Replace with your default image path

    // Grid configuration and position tracking
    this.grid = new Map(); // Stores the state of each cell by coordinate
    this.posX = 0; // Initial block position X
    this.posY = 0; // Initial block position Y

    this.init();
  }

  init() {
    this.createGrid(20, 20); // Create initial grid of 20x20 cells
    this.centerBlock();
    this.addEventListeners();
  }

  createGrid(rows, cols) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = `${row},${col}`;
        if (!this.grid.has(key)) {
          this.grid.set(key, { image: this.defaultCellImage });
          const cell = document.createElement("div");
          cell.classList.add("grid-cell");
          cell.style.gridRowStart = row + 1;
          cell.style.gridColumnStart = col + 1;
          cell.style.backgroundImage = `url(${this.defaultCellImage})`;

          // Add click listener to change cell image
          cell.addEventListener("click", () => this.changeCellImage(cell, key));
          this.gridContainer.appendChild(cell);
        }
      }
    }

    // Update grid container size
    this.gridContainer.style.width = `${cols * this.blockSize}px`;
    this.gridContainer.style.height = `${rows * this.blockSize}px`;
  }

  expandGrid(direction) {
    const rows = this.gridContainer.style.gridTemplateRows.split(" ").length;
    const cols = this.gridContainer.style.gridTemplateColumns.split(" ").length;

    if (direction === "up") {
      this.createGrid(10, cols); // Add 10 more rows at the top
    } else if (direction === "down") {
      this.createGrid(10, cols); // Add 10 more rows at the bottom
    } else if (direction === "left") {
      this.createGrid(rows, 10); // Add 10 more columns to the left
    } else if (direction === "right") {
      this.createGrid(rows, 10); // Add 10 more columns to the right
    }
  }

  centerBlock() {
    this.block.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
  }

  addEventListeners() {
    window.addEventListener("keydown", (event) => this.handleMovement(event));
  }

  handleMovement(event) {
    const step = this.blockSize;

    switch (event.key) {
      case "ArrowUp":
        this.posY -= step;
        if (this.posY < 0) {
          this.expandGrid("up");
          this.posY = 0;
        }
        break;

      case "ArrowDown":
        this.posY += step;
        if (this.posY >= this.gridContainer.offsetHeight) {
          this.expandGrid("down");
        }
        break;

      case "ArrowLeft":
        this.posX -= step;
        if (this.posX < 0) {
          this.expandGrid("left");
          this.posX = 0;
        }
        break;

      case "ArrowRight":
        this.posX += step;
        if (this.posX >= this.gridContainer.offsetWidth) {
          this.expandGrid("right");
        }
        break;
    }

    this.updateBlockPosition();
  }

  updateBlockPosition() {
    this.block.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
    this.playMoveSound();
  }

  changeCellImage(cell, key) {
    const cellState = this.grid.get(key);
    cellState.image = this.cellImage;
    cell.style.backgroundImage = `url(${this.cellImage})`;

    // Revert back to default image after 1 minute
    setTimeout(() => {
      cellState.image = this.defaultCellImage;
      cell.style.backgroundImage = `url(${this.defaultCellImage})`;
    }, 60000);

    this.playImageChangeSound();
  }

  playMoveSound() {
    this.moveSound.currentTime = 0;
    this.moveSound.play();
  }

  playImageChangeSound() {
    this.grassChangeSound.currentTime = 0;
    this.grassChangeSound.play();
  }
}

// Initialize the game
const gridGame = new GridGame();
  
