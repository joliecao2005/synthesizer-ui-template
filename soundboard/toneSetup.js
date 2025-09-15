const playingSources = {};

const backgroundTracks = ["jazz.mp3", "russianmarket.mp3"];
// Function to initialize and play random background music
function toneInit() {
  const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
  const backgroundSound = new Tone.Player(backgroundTracks[randomIndex])
    .connect(reverb)
    .toDestination();
  backgroundSound.loop = true;
  backgroundSound.volume.value = -20; // Lower the volume
  backgroundSound.start();
  playingSources["background"] = backgroundSound; // Track background sound
}

// Initialize Tone.js and setup sound effects with optional effects
function setupSounds() {
  Object.keys(soundEffects).forEach((key) => {
    const player = soundEffects[key];

    // Optionally add effects, like reverb, here
    const reverb = new Tone.Reverb({ decay: 1.5, wet: 0.3 }).toDestination();
    player.connect(reverb);
  });
}

const soundEffects = {
  bird: new Tone.Player("bird.mp3").toDestination(),
  bird2: new Tone.Player("bird2.mp3").toDestination(),
  footstep: new Tone.Player("footstep.mp3").toDestination(),
  train: new Tone.Player("train.mp3").toDestination(),
  churchbell: new Tone.Player("churchbell.mp3").toDestination(),
  rain: new Tone.Player("rain.mp3").toDestination(),
  stream: new Tone.Player("stream.mp3").toDestination(),
  newspaper: new Tone.Player("newspaper.mp3").toDestination(),
};

// Manage random sound playback
// Random sounds selection
const randomSounds = ["churchbell", "train", "newspaper"];
let currentRandomSound = null;

// Function to play or stop a sound and toggle visual effect
function playSoundWithEffect(soundKey, box) {
  if (playingSources[soundKey]) {
    // Stop the sound if it's playing and reset box size
    playingSources[soundKey].stop();
    delete playingSources[soundKey];
    box.classList.remove("shrunk");
  } else {
    let player;
    if (soundKey === "random-sound") {
      if (currentRandomSound) {
        currentRandomSound.stop();
        currentRandomSound = null;
        box.classList.remove("shrunk");
      } else {
        const randomSoundKey =
          randomSounds[Math.floor(Math.random() * randomSounds.length)];
        player = soundEffects[randomSoundKey];
        currentRandomSound = player;
      }
    } else {
      player = soundEffects[soundKey];
    }
    player.volume.value = -10; // Lower the volume
    player.start();
    playingSources[soundKey] = player;
    box.classList.add("shrunk");
  }
}

// Set up event listeners for sound boxes
document.querySelectorAll(".sound-zone").forEach((box) => {
  box.addEventListener("click", () => {
    const soundKey = box.dataset.sound || "random-sound";
    playSoundWithEffect(soundKey, box);
  });
});
