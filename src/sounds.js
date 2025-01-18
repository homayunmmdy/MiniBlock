export function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}
