import {
  GRASS_CELL,
  GROW_GRASS_TIME,
  SOILD_CELL,
} from "../../config/config.js";
import { playSound } from "../sounds.ts";
import { Bush } from "./bush.ts";

export class Grid {
  private container: HTMLElement;
  private blockSize: number;
  private cells: HTMLElement[];
  private bush: Bush;

  constructor(container: HTMLElement, blockSize: number) {
    this.container = container;
    this.blockSize = blockSize;
    this.cells = [];
    this.bush = new Bush(this.cells);

    this.bush.loadBushCount();
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

      cell.addEventListener("click", () => this.handleCellClick(cell));

      this.container.appendChild(cell);
      this.cells.push(cell);
    }

    this.container.style.width = `${columns * this.blockSize}px`;
    this.container.style.height = `${rows * this.blockSize}px`;

    // Add bushes covering 20% of the land
    this.bush.addBushes();

    // Start timer to periodically add bushes
    this.bush.startBushTimer();
  }

  handleCellClick(cell: HTMLElement) {
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
      this.bush.incrementBushCount(); // Increment the bush count when a bush is removed
    }
  }
}
