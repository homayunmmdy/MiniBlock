import {
  GRASS_CELL,
  SOILD_CELL,
  BUSH_CELL,
  GROW_GRASS_TIME,
  ADD_BUSH_INTERVAL,
} from "./config.js";
import { playSound } from "./sounds.js";

export class Grid {
  constructor(container, blockSize) {
    this.container = container;
    this.blockSize = blockSize;
    this.cells = [];
    this.bushTimer = null;
    this.bushCount = 0; // Count of bushes removed by the user

    this.loadBushCount();
  }

  create() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const columns = Math.ceil(screenWidth / this.blockSize);
    const rows = Math.ceil(screenHeight / this.blockSize);

    this.container.style.gridTemplateColumns = `repeat(${columns}, ${this.blockSize}px)`;
    this.container.style.gridTemplateRows = `repeat(${rows}, ${this.blockSize}px)`;

    const totalCells = columns * rows;

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.type = "grass"; // Default cell type is grass
      cell.style.backgroundImage = `url(${GRASS_CELL})`;
      cell.style.backgroundSize = "cover";

      cell.addEventListener("click", () => this.handleCellClick(cell));

      this.container.appendChild(cell);
      this.cells.push(cell);
    }

    this.container.style.width = `${columns * this.blockSize}px`;
    this.container.style.height = `${rows * this.blockSize}px`;

    // Add bushes covering 20% of the land
    this.addBushes();

    // Start timer to periodically add bushes
    this.startBushTimer();
  }

  handleCellClick(cell) {
    if (cell.dataset.type === "grass") {
      cell.dataset.type = "solid";
      cell.style.backgroundImage = `url(${SOILD_CELL})`;
      playSound("grassChange");

      setTimeout(() => {
        cell.dataset.type = "grass";
        cell.style.backgroundImage = `url(${GRASS_CELL})`;
      }, GROW_GRASS_TIME);
    } else if (cell.dataset.type === "bush") {
      cell.dataset.type = "grass";
      cell.style.backgroundImage = `url(${GRASS_CELL})`;
      playSound("bushRemove");
      this.incrementBushCount(); // Increment the bush count when a bush is removed
    }
  }

  incrementBushCount() {
    this.bushCount += 1;
    this.saveBushCount();
  }


  saveBushCount() {
    localStorage.setItem("bushCount", this.bushCount);
  }

  loadBushCount() {
    const storedCount = localStorage.getItem("bushCount");
    this.bushCount = storedCount ? parseInt(storedCount, 10) : 0;
  }

  addBushes() {
    const totalCells = this.cells.length;
    const targetBushCount = Math.floor(totalCells * 0.2);
    const currentBushCount = this.cells.filter(
      (cell) => cell.dataset.type === "bush"
    ).length;
    const bushesToAdd = targetBushCount - currentBushCount;

    if (bushesToAdd > 0) {
      let addedBushes = 0;

      while (addedBushes < bushesToAdd) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        const cell = this.cells[randomIndex];

        if (cell.dataset.type === "grass") {
          cell.dataset.type = "bush";
          cell.style.backgroundImage = `url(${BUSH_CELL})`;
          playSound("bushAdd");
          addedBushes++;
        }
      }
    }
  }

  startBushTimer() {
    if (this.bushTimer) clearInterval(this.bushTimer);

    this.bushTimer = setInterval(() => {
      this.addBushes();
    }, ADD_BUSH_INTERVAL);
  }
}
