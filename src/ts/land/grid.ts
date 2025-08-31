import {
  GRASS_CELL,
  GROW_GRASS_TIME,
  SOILD_CELL,
} from "../../config/config.js";
import { CellType } from "../../types/types.ts";
import { playSound } from "../features/sounds.ts";
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
      const cell = this.createCell();
      this.container.appendChild(cell);
      this.cells.push(cell);
    }

    this.container.style.width = `${columns * this.blockSize}px`;
    this.container.style.height = `${rows * this.blockSize}px`;

    // Add bushes covering a percentage of the land
    this.bush.addBushes();

    // Start timer to periodically add bushes
    this.bush.startBushTimer();

    // Use event delegation for cell clicks
    this.container.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("grid-cell")) {
        this.handleCellClick(target);
      }
    });
  }

  private createCell(): HTMLElement {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.dataset.type = "grass";
    cell.style.backgroundImage = `url(${GRASS_CELL})`;
    return cell;
  }

  private updateCellType(cell: HTMLElement, type: CellType) {
    try {
      cell.dataset.type = type;
      const imageUrl = type === "grass" ? GRASS_CELL : SOILD_CELL;
      if (!imageUrl) throw new Error(`Image URL for ${type} is not defined.`);
      cell.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
      console.error("Failed to update cell type:", error);
    }
  }

  private handleCellClick(cell: HTMLElement) {
    const cellType = cell.dataset.type as CellType;
    if (cellType === "grass") {
      this.updateCellType(cell, "solid");
      playSound("grassChange");

      setTimeout(() => {
        this.updateCellType(cell, "grass");
      }, GROW_GRASS_TIME);
    } else if (cellType === "bush") {
      this.updateCellType(cell, "grass");
      playSound("bushRemove");
      this.bush.incrementBushCount();
    }
  }
}
