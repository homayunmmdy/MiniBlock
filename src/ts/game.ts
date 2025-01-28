import { ADD_BUSH_SHEEP, AMOUNT_SHEEP, BLOCK_SIZE } from "../config/config.ts";
import { Sheep } from "./characters/sheep.ts";
import { User } from "./characters/user.ts";
import { Bush } from "./land/bush.ts";
import { Grid } from "./land/grid.ts";

class Game {
  private blockElement: HTMLElement;
  private gridContainer: HTMLElement;
  private grid: Grid;
  private user: User;
  private sheeps: Sheep[] = [];
  private bush: Bush;


  constructor() {
    this.blockElement = document.getElementById("user") as HTMLElement;
    this.gridContainer = document.getElementById(
      "gridContainer"
    ) as HTMLElement;

    this.grid = new Grid(this.gridContainer, BLOCK_SIZE);
    this.user = new User(this.blockElement);

    // Initialize Bush with grid cells
    const cells = Array.from(this.gridContainer.querySelectorAll(".cell")) as HTMLElement[];
    this.bush = new Bush(cells);
  }

  initialize(): void {
    this.grid.create();
    this.user.center();
    this.spawnSheeps();
    this.bush.loadBushCount(); // Load bush count from localStorage
    this.bush.startBushTimer(); // Start bush spawning

    // Periodically check and manage shps
    setInterval(() => this.manageSheeps(), ADD_BUSH_SHEEP); 

    this.setupEventListeners();
  }

  private spawnSheeps(): void {
    const totalCells =
      (this.gridContainer.offsetWidth / BLOCK_SIZE) *
      (this.gridContainer.offsetHeight / BLOCK_SIZE);
    const sheepCount = Math.floor(totalCells * AMOUNT_SHEEP);

    for (let i = 0; i < sheepCount; i++) {
      const sheepElement = document.createElement("div");
      sheepElement.className = "sheep";
      this.gridContainer.appendChild(sheepElement);

      const sheep = new Sheep(sheepElement, this.gridContainer);
      this.sheeps.push(sheep);
      sheep.startSound(); 
    }
  }

  private manageSheeps(): void {
    // Remove destroyed sheeps from the array
    this.sheeps = this.sheeps.filter((sheep) => !sheep.isDestroyed());

    // Calculate how many sheeps need to be added to maintain 2% coverage
    const totalCells =
      (this.gridContainer.offsetWidth / BLOCK_SIZE) *
      (this.gridContainer.offsetHeight / BLOCK_SIZE);
    const desiredSheepCount = Math.floor(totalCells * AMOUNT_SHEEP);
    const currentSheepCount = this.sheeps.length;

    if (currentSheepCount < desiredSheepCount) {
      const sheepsToAdd = desiredSheepCount - currentSheepCount;
      for (let i = 0; i < sheepsToAdd; i++) {
        const sheepElement = document.createElement("div");
        sheepElement.className = "sheep";
        this.gridContainer.appendChild(sheepElement);

        const newSheep = new Sheep(sheepElement, this.gridContainer);
        this.sheeps.push(newSheep);
      }
    }
  }

  private setupEventListeners(): void {
    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.user.move(event)
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.initialize();
});
