// List of audio elements
const sounds = {
  move: new Audio('./assets/sounds/Step.mp3'),
  grassChange: new Audio('./assets/sounds/grass.mp3'),
  hit: new Audio('./assets/sounds/hit.mp3'),
};

// Function to play a sound by name
export function playSound(soundName) {
  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0; // Reset audio to start
    sound.play();
  } else {
    console.warn(`Sound "${soundName}" not found.`);
  }
}

// Example usage:
// playSound('move');
// playSound('grassChange');
// playSound('hit');