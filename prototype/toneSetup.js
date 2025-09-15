// Create AudioContext using Tone.js
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an audio context using Tone.js
const playingSources = {}; // Object to track playing sound sources

// List of background music tracks
const backgroundTracks = ["jazz.mp3", "russianmarket.mp3"];

// Function to initialize and play a random background music track
function toneInit() {
  const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
  const backgroundSound = new Tone.Player(
    backgroundTracks[randomIndex]
  ).toDestination();
  backgroundSound.loop = true;
  backgroundSound.autostart = true;
  backgroundSound.start(); // Start playing sound
}

// Soundboard effect setup (example using Tone.js)
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

function playSoundWithEffect(soundKey) {
  // Check if the sound is already playing
  if (playingSources[soundKey]) {
    // Stop the sound if it's playing
    playingSources[soundKey].stop();
    playingSources[soundFile] = null;
  } else {
    // Create a new player for the sound
    let player;
    if (soundKey === "random-sound") {
      // Play a random sound from the randomSoundList
      const randomSounds = ["churchbell.mp3", "train.mp3", "newspaper.mp3"];
      const randomSoundFile =
        randomSoundOptions[Math.floor(Math.random() * randomSoundFile.length)];
      playSoundWithEffect(randomSoundFile);
    } else {
      // Play the selected sound with effects
      const sound = getPlayerWithEffects(sounds[soundFile]);
      sound.start(); // Start playing sound
      playingSources[zone.dataset.sound] = sound;
    }
  }
}

// Set up sound boxes and play sounds with tone.js

document.querySelectorAll(".sound-zone").forEach((box) => {
  box.addEventListener("click", () => {
    const soundPath = box.dataset.sound; // Retrieve sound file from data attribute
    const currentlyPlaying = playingSources[soundPath];

    if (currentlyPlaying) {
      // Stop sound if already playing
      currentlyPlaying.stop();
      delete playingSources[soundPath];
      box.classList.remove("shrunk");
    } else {
      // Play sound and apply reverb
      const player = new Tone.Player(soundPath).connect(reverb).toDestination();
      player.loop = true;
      player.autostart = true;
      playingSources[soundPath] = player; // Track the playing sound
      box.classList.add("shrunk");
    }
  });
});
