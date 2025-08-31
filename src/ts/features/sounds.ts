import { SoundsFileType } from "../../types/types.ts";
import { SoundController } from "../Controller/soundController.ts";

// Preloaded sounds
const sounds: SoundsFileType = {
  move: new Audio("sounds/Step.mp3"),
  grassChange: new Audio("sounds/grass.mp3"),
  hit: new Audio("sounds/hit.mp3"),
  bushRemove: new Audio("sounds/bushRemove.mp3"),
  sheep: new Audio("sounds/sheep.mp3"),
};

type SoundName = keyof SoundsFileType;

// Function to play a sound by name
export function playSound(soundName: SoundName) {
  if (SoundController.isSoundMuted()) {
    return; // If muted, don't play anything
  }

  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0; // Reset audio to start
    sound.play();
  } else {
    console.error(`Sound "${soundName}" not found.`);
  }
}
