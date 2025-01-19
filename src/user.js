
import { playSound } from "./sounds.js";

export class User {
  constructor(blockElement, blockSize) {
    this.blockElement = blockElement;
    this.blockSize = blockSize;
    this.posX = 0;
    this.posY = 0;

    // Add click event listener to the block
    this.blockElement.addEventListener("click", () => this.handleClick());

    // Add keydown event listener for movement controls
    window.addEventListener("keydown", (event) => this.move(event));
  }

  center() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.posX = Math.floor((screenWidth - this.blockSize) / 2);
    this.posY = Math.floor((screenHeight - this.blockSize) / 2);
    this.updatePosition();
  }

  updatePosition() {
    this.blockElement.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
  }

  move(event) {
    const step = this.blockSize;
    let moved = false;

    // Handle arrow keys and WASD keys for movement
    switch (event.key) {
      case "ArrowUp": // Move up
      case "w":
        if (this.posY - step >= 0) this.posY -= step, moved = true;
        break;
      case "ArrowDown": // Move down
      case "s":
        if (this.posY + step <= window.innerHeight - this.blockSize)
          this.posY += step, moved = true;
        break;
      case "ArrowLeft": // Move left
      case "a":
        if (this.posX - step >= 0) this.posX -= step, moved = true;
        break;
      case "ArrowRight": // Move right
      case "d":
        if (this.posX + step <= window.innerWidth - this.blockSize)
          this.posX += step, moved = true;
        break;
    }

    if (moved) {
      this.updatePosition();
      playSound('move'); // Play movement sound
    }
  }

  handleClick() {
    // Apply the filter style
    this.blockElement.style.filter = "brightness(50%) sepia(100%) saturate(1000%) hue-rotate(0deg)";

    // Play the click sound
    playSound('hit');

    setTimeout(() => {
      this.blockElement.style.filter = ""; // Reset the filter
    }, 3000); // 3000 milliseconds = 3 seconds
  }
}
