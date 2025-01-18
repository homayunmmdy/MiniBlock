import { Grid } from "./grid.js";
import { BLOCK_SIZE } from "./config.js";
import { User } from "./user.js";

document.addEventListener("DOMContentLoaded", () => {
  const blockElement = document.getElementById("block");
  const gridContainer = document.getElementById("gridContainer");
  const moveSound = document.getElementById("moveSound");
  const grassChangeSound = document.getElementById("grassChangeSound");

  const grid = new Grid(gridContainer, BLOCK_SIZE, grassChangeSound);
  grid.create();

  const user = new User(blockElement, BLOCK_SIZE, moveSound);
  user.center();

  window.addEventListener("keydown", (event) => user.move(event));
});

console.log('load')