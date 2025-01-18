import { GRASS_CELL, SOILD_CELL } from "./config.js";
import { playSound } from "./sounds.js";

export class Grid {
  constructor(container, blockSize, grassChangeSound) {
    this.container = container;
    this.blockSize = blockSize;
    this.grassChangeSound = grassChangeSound;
  }

  create() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const columns = Math.ceil(screenWidth / this.blockSize);
    const rows = Math.ceil(screenHeight / this.blockSize);

    this.container.style.gridTemplateColumns = `repeat(${columns}, ${this.blockSize}px)`;
    this.container.style.gridTemplateRows = `repeat(${rows}, ${this.blockSize}px)`;

    for (let i = 0; i < columns * rows; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.addEventListener("click", () => this.changeCellImage(cell));
      this.container.appendChild(cell);
    }

    this.container.style.width = `${columns * this.blockSize}px`;
    this.container.style.height = `${rows * this.blockSize}px`;
  }

  changeCellImage(cell) {
    cell.style.backgroundImage = `url(${SOILD_CELL})`;
    cell.style.backgroundSize = "cover";
    playSound(this.grassChangeSound);

    setTimeout(() => {
      cell.style.backgroundImage = `url(${GRASS_CELL})`;
    }, 60000);
  }
}
