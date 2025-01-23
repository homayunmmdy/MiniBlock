import { BLOCK_SIZE } from "../config/config.ts";
import { Grid } from "./grid.ts";
import { User } from "./user.ts";

class Game {
  private blockElement: HTMLElement;
  private gridContainer: HTMLElement;

  private grid: Grid;
  private user: User;

  constructor() {
    this.blockElement = document.getElementById("block") as HTMLElement;
    this.gridContainer = document.getElementById(
      "gridContainer"
    ) as HTMLElement;

    this.grid = new Grid(this.gridContainer, BLOCK_SIZE);
    this.user = new User(this.blockElement, BLOCK_SIZE);
  }

  initialize(): void {
    this.grid.create();
    this.user.center();
    this.setupEventListeners();
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
