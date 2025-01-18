import { BLOCK_SIZE } from "./config.js";
import { Grid } from "./grid.js";
import { User } from "./user.js";

class Game {
  constructor() {
    this.blockElement = document.getElementById("block");
    this.gridContainer = document.getElementById("gridContainer");
    this.moveSound = document.getElementById("moveSound");
    this.grassChangeSound = document.getElementById("grassChangeSound");
    this.hitSound = document.getElementById("hitSound");

    this.grid = new Grid(this.gridContainer, BLOCK_SIZE, this.grassChangeSound);
    this.user = new User(this.blockElement, BLOCK_SIZE, this.moveSound, this.hitSound);
  }

  initialize() {
    this.grid.create();
    this.user.center();
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("keydown", (event) => this.user.move(event));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.initialize();
});