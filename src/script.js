
class GridGame {

  constructor() {

    this.block = document.getElementById("block");

    this.gridContainer = document.getElementById("gridContainer");

    this.blockSize = 50; // Size of each block in pixels

    this.moveSound = document.getElementById("moveSound"); // Audio element for movement

    this.grassChangeSound = document.getElementById("grassChangeSound"); // Audio element for image change

    this.posX = 0; // Initial X position

    this.posY = 0; // Initial Y position

    this.touchStartX = 0; // Initial touch X position

    this.touchStartY = 0; // Initial touch Y position

    this.isDragging = false; // Flag to check if the block is being dragged


    this.cellImage = "./assets/images/dirt.jpg"; // Replace with your image path

    this.defaultCellImage = "./assets/images/grass.webp"; // Replace with your default image path


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


    // Calculate the number of columns and rows, rounding up to ensure full coverage

    const columns = Math.ceil(screenWidth / this.blockSize);

    const rows = Math.ceil(screenHeight / this.blockSize);


    // Set the grid template columns and rows

    this.gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${this.blockSize}px)`;

    this.gridContainer.style.gridTemplateRows = `repeat(${rows}, ${this.blockSize}px)`;


    // Create the grid cells

    for (let i = 0; i < columns * rows; i++) {

      const cell = document.createElement("div");

      cell.classList.add("grid-cell");


      // Add click and touch event listeners to each cell

      cell.addEventListener("click", () => this.changeCellImage(cell));

      cell.addEventListener("touchstart", () => this.changeCellImage(cell));


      this.gridContainer.appendChild(cell);

    }


    // Ensure the grid container covers the entire screen

    this.gridContainer.style.width = `${columns * this.blockSize}px`;

    this.gridContainer.style.height = `${rows * this.blockSize}px`;

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


    // Touch event listeners for dragging

    this.block.addEventListener("touchstart", (event) =>

      this.handleTouchStart(event)

    );

    this.block.addEventListener("touchmove", (event) =>

      this.handleTouchMove(event)

    );

    this.block.addEventListener("touchend", () => this.handleTouchEnd());

  }


expandGrid(direction) {

  const columns = Math.ceil(this.gridContainer.offsetWidth / this.blockSize);

  const rows = Math.ceil(this.gridContainer.offsetHeight / this.blockSize);


  if (direction === "up") {

    // Add a new row at the top

    for (let i = 0; i < columns; i++) {

      const cell = document.createElement("div");

      cell.classList.add("grid-cell");

      cell.addEventListener("click", () => this.changeCellImage(cell));

      cell.addEventListener("touchstart", () => this.changeCellImage(cell));

      this.gridContainer.insertBefore(cell, this.gridContainer.firstChild);

    }

    this.gridContainer.style.gridTemplateRows = `repeat(${rows + 1}, ${this.blockSize}px)`;

  } else if (direction === "down") {

    // Add a new row at the bottom

    for (let i = 0; i < columns; i++) {

      const cell = document.createElement("div");

      cell.classList.add("grid-cell");

      cell.addEventListener("click", () => this.changeCellImage(cell));

      cell.addEventListener("touchstart", () => this.changeCellImage(cell));

      this.gridContainer.appendChild(cell);

    }

    this.gridContainer.style.gridTemplateRows = `repeat(${rows + 1}, ${this.blockSize}px)`;

  } else if (direction === "left") {

    // Add a new column to the left

    const allCells = Array.from(this.gridContainer.children);

    for (let i = 0; i < rows; i++) {

      const cell = document.createElement("div");

      cell.classList.add("grid-cell");

      cell.addEventListener("click", () => this.changeCellImage(cell));

      cell.addEventListener("touchstart", () => this.changeCellImage(cell));

      this.gridContainer.insertBefore(cell, allCells[i * columns]);

    }

    this.gridContainer.style.gridTemplateColumns = `repeat(${columns + 1}, ${this.blockSize}px)`;

  } else if (direction === "right") {

    // Add a new column to the right

    const allCells = Array.from(this.gridContainer.children);

    for (let i = 0; i < rows; i++) {

      const cell = document.createElement("div");

      cell.classList.add("grid-cell");

      cell.addEventListener("click", () => this.changeCellImage(cell));

      cell.addEventListener("touchstart", () => this.changeCellImage(cell));

      this.gridContainer.insertBefore(cell, allCells[(i + 1) * columns - 1].nextSibling);

    }

    this.gridContainer.style.gridTemplateColumns = `repeat(${columns + 1}, ${this.blockSize}px)`;

  }

}


 moveBlock(event) {

  const step = this.blockSize;

  let moved = false;


  switch (event.key) {

    case "ArrowUp":

      if (this.posY - step < 0) {

        this.expandGrid("up");

        this.posY += step; // Adjust position after expanding

      } else {

        this.posY -= step;

        moved = true;

      }

      break;

    case "ArrowDown":

      if (this.posY + step >= this.gridContainer.offsetHeight) {

        this.expandGrid("down");

      } else {

        this.posY += step;

        moved = true;

      }

      break;

    case "ArrowLeft":

      if (this.posX - step < 0) {

        this.expandGrid("left");

        this.posX += step; // Adjust position after expanding

      } else {

        this.posX -= step;

        moved = true;

      }

      break;

    case "ArrowRight":

      if (this.posX + step >= this.gridContainer.offsetWidth) {

        this.expandGrid("right");

      } else {

        this.posX += step;

        moved = true;

      }

      break;

  }


  if (moved) {

    this.updateBlockPosition();

    this.playMoveSound();

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

    this.posX = Math.max(

      0,

      Math.min(window.innerWidth - this.blockSize, this.posX)

    );

    this.posY = Math.max(

      0,

      Math.min(window.innerHeight - this.blockSize, this.posY)

    );


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


  // Change the image of the clicked/touched cell

  changeCellImage(cell) {

    // Apply the single image to the cell

    cell.style.backgroundImage = `url(${this.cellImage})`;

    cell.style.backgroundSize = "cover"; // Ensure the image fits the cell


    // Play the image change sound effect

    this.playImageChangeSound();


    setTimeout(() => {

      cell.style.backgroundImage = `url(${this.defaultCellImage})`;

    }, 60000); // 60,000 milliseconds = 1 minute

  }


  // Play the image change sound effect

  playImageChangeSound() {

    this.grassChangeSound.currentTime = 0; // Rewind the sound to the start

    this.grassChangeSound.play(); // Play the sound

  }

}


// Initialize the game

const gridGame = new GridGame();


      
