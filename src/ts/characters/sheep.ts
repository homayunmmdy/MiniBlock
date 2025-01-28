import { BLOCK_SIZE, SHEEP, SHEEP_MOVE, SHEEP_SOUND } from "../../config/config";
import { playSound } from "../sounds";

export class Sheep {
  private sheepElement: HTMLElement;
  private gridContainer: HTMLElement;
  private posX: number;
  private posY: number;
  private movementInterval: number | undefined;
  private soundInterval: number | undefined;
  private static sheepKilledCount: number = 0; // Static counter for all sheep instances

  constructor(
    sheepElement: HTMLElement,
    gridContainer: HTMLElement,
  ) {
    this.sheepElement = sheepElement;
    this.gridContainer = gridContainer;

    // Randomly place the sheep within the grid
    this.posX =
      Math.floor(Math.random() * (gridContainer.offsetWidth / BLOCK_SIZE)) *
      BLOCK_SIZE;
    this.posY =
      Math.floor(Math.random() * (gridContainer.offsetHeight / BLOCK_SIZE)) *
      BLOCK_SIZE;

    this.updatePosition();

    // Add click listener to remove sheep
    this.sheepElement.addEventListener("click", () => this.handleClick());

    // Start automatic movement
    this.startMovement();

    // Start periodic sound
    this.startSound(); // Ensure sound starts
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
          if (this.posY - BLOCK_SIZE >= 0) this.posY -= BLOCK_SIZE;
          break;
        case 1: // Down
          if (
            this.posY + BLOCK_SIZE <=
            this.gridContainer.offsetHeight - BLOCK_SIZE
          )
            this.posY += BLOCK_SIZE;
          break;
        case 2: // Left
          if (this.posX - BLOCK_SIZE >= 0) this.posX -= BLOCK_SIZE;
          break;
        case 3: // Right
          if (
            this.posX + BLOCK_SIZE <=
            this.gridContainer.offsetWidth - BLOCK_SIZE
          )
            this.posX += BLOCK_SIZE;
          break;
      }

      this.updatePosition();
    }, SHEEP_MOVE); // Move every second
  }

  startSound(): void {
    this.soundInterval = setInterval(() => {
      // Play the sound for this sheep
      console.log('bee');
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

    // Increment the sheep killed count
    Sheep.sheepKilledCount++;

    // Save the count to local storage
    localStorage.setItem(SHEEP, Sheep.sheepKilledCount.toString());

    // Update the inventory slot
    this.updateInventorySlot();
  }

  stopAllIntervals(): void {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.soundInterval) clearInterval(this.soundInterval);
  }

  // Getter method to check if the sheep is destroyed
  public isDestroyed(): boolean {
    return this.sheepElement.getAttribute("data-destroyed") === "true";
  }

  // Static method to get the sheep killed count
  public static getSheepKilledCount(): number {
    return Sheep.sheepKilledCount;
  }

  // Static method to load the sheep killed count from localStorage
  public static loadSheepKilledCount(): void {
    const storedCount = localStorage.getItem(SHEEP);
    Sheep.sheepKilledCount = storedCount ? parseInt(storedCount, 10) : 0;
  }

  // Method to update the inventory slot
  private updateInventorySlot(): void {
    const sheepSlot = document.querySelector('.slot[data-sheep-count]') as HTMLElement;
    if (sheepSlot) {
      sheepSlot.dataset.sheepCount = Sheep.sheepKilledCount.toString();
      const sheepCountElement = sheepSlot.querySelector('.sheep-count') as HTMLElement;
      if (sheepCountElement) {
        sheepCountElement.textContent = Sheep.sheepKilledCount.toString();
      }
    }
  }
}