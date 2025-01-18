import { playSound } from "./sounds.js";

export class User {
  constructor(blockElement, blockSize, moveSound) {
    this.blockElement = blockElement;
    this.blockSize = blockSize;
    this.moveSound = moveSound;
    this.posX = 0;
    this.posY = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.isDragging = false;
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

    switch (event.key) {
      case "ArrowUp":
        if (this.posY - step >= 0) this.posY -= step, moved = true;
        break;
      case "ArrowDown":
        if (this.posY + step <= window.innerHeight - this.blockSize)
          this.posY += step, moved = true;
        break;
      case "ArrowLeft":
        if (this.posX - step >= 0) this.posX -= step, moved = true;
        break;
      case "ArrowRight":
        if (this.posX + step <= window.innerWidth - this.blockSize)
          this.posX += step, moved = true;
        break;
    }

    if (moved) {
      this.updatePosition();
      playSound(this.moveSound);
    }
  }
}