import { ADD_BUSH_INTERVAL, BUSH_CELL, BUSHES } from "../../config/config";
import { UpdateInventorySlot } from "../Inventoary";

export class Bush {
  private cells: HTMLElement[];
  private bushTimer: number | null;
  private bushCount: number;

  constructor(cells: HTMLElement[]) {
    this.cells = cells;
    this.bushTimer = null;
    this.bushCount = 0; // Count of bushes removed by the user
  }

  incrementBushCount() {
    this.bushCount += 1;
    this.saveBushCount();
    UpdateInventorySlot(this.bushCount,'bush'); // Update the inventory slot
  }

  saveBushCount() {
    localStorage.setItem(BUSHES, this.bushCount.toString());
  }

  loadBushCount() {
    const storedCount = localStorage.getItem(BUSHES);
    this.bushCount = storedCount ? parseInt(storedCount, 10) : 0;
    UpdateInventorySlot(this.bushCount,'bush'); // Update the inventory slot
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