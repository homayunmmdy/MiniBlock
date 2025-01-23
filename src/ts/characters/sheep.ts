import { SHEEP_MOVE, SHEEP_SOUND } from "../../config/config";
import { playSound } from "../sounds";

export class Sheep {
  private sheepElement: HTMLElement;
  private gridContainer: HTMLElement;
  private blockSize: number;
  private posX: number;
  private posY: number;
  private movementInterval: number | undefined;
  private soundInterval: number | undefined;

  constructor(
    sheepElement: HTMLElement,
    gridContainer: HTMLElement,
    blockSize: number
  ) {
    this.sheepElement = sheepElement;
    this.gridContainer = gridContainer;
    this.blockSize = blockSize;

    // Randomly place the sheep within the grid
    this.posX =
      Math.floor(Math.random() * (gridContainer.offsetWidth / blockSize)) *
      blockSize;
    this.posY =
      Math.floor(Math.random() * (gridContainer.offsetHeight / blockSize)) *
      blockSize;

    this.updatePosition();

    // Add click listener to remove sheep
    this.sheepElement.addEventListener("click", () => this.handleClick());

    // Start automatic movement
    this.startMovement();

    // Start periodic sound
    () => this.startSound(); // Ensure sound starts
  }

  updatePosition(): void {
    this.sheepElement.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
  }

  startMovement(): void {
    this.movementInterval = setInterval(() => {
      // Randomly move the sheep in one direction
      const direction = Math.floor(Math.random() * 4); // 0 = up, 1 = down, 2 = left, 3 = right
      switch (direction) {
        case 0: // Up
          if (this.posY - this.blockSize >= 0) this.posY -= this.blockSize;
          break;
        case 1: // Down
          if (
            this.posY + this.blockSize <=
            this.gridContainer.offsetHeight - this.blockSize
          )
            this.posY += this.blockSize;
          break;
        case 2: // Left
          if (this.posX - this.blockSize >= 0) this.posX -= this.blockSize;
          break;
        case 3: // Right
          if (
            this.posX + this.blockSize <=
            this.gridContainer.offsetWidth - this.blockSize
          )
            this.posX += this.blockSize;
          break;
      }

      this.updatePosition();
    }, SHEEP_MOVE); // Move every second
  }
  

  startSound(): void {
    this.soundInterval = setInterval(() => {
      // Play the sound for this ship
      console.log('bee')
      playSound("sheep");
    }, SHEEP_SOUND); // Play sound every 1 minute
  }

  handleClick(): void {
    this.sheepElement.style.filter =
      "brightness(50%) sepia(100%) saturate(1000%) hue-rotate(0deg)";

    // Remove sheep from the grid
    this.sheepElement.remove();

    // Play sound
    playSound("hit");

    // Stop movement
    if (this.movementInterval) clearInterval(this.movementInterval);

     // Stop sound
     if (this.soundInterval) clearInterval(this.soundInterval);

    // Mark as "destroyed" (this can be managed by the Game class)
    this.sheepElement.setAttribute("data-destroyed", "true");
  }

  stopAllIntervals(): void {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.soundInterval) clearInterval(this.soundInterval);
  }
  
  // Getter method to check if the sheep is destroyed
  public isDestroyed(): boolean {
    return this.sheepElement.getAttribute("data-destroyed") === "true";
  }
}
