const playingSources = {};

// Function to play a random background music track
// function playRandomBackgroundMusic() {
//   const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
//   const backgroundSound = new Tone.Player(
//     backgroundTracks[randomIndex]
//   ).toDestination();
//   backgroundSound.loop = true;
//   backgroundSound.autostart = true;
//   playingSources["background"] = backgroundSound;
//   backgroundSound.start();
// }

// Define audio effects system
const reverb = new Tone.Reverb({ decay: 1.5, wet: 0.3 }).toDestination();

// Players for background music
const musicPlayer = {
  jazz: new Tone.Player("jazz.mp3").connect(reverb).toDestination(),
  russianmarket: new Tone.Player("russianmarket.mp3")
    .connect(reverb)
    .toDestination(),
};
// Handle playing and stopping background music
let currentBackgroundMusic = null;

function playRandomMusic(box) {
  if (currentBackgroundMusic) {
    // Stop current background music if playing
    currentBackgroundMusic.stop();
    currentBackgroundMusic = null;
    box.classList.remove("shrunk");
  } else {
    // Choose a random background music track
    const keys = Object.keys(musicPlayer);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const musicKey = keys[randomIndex];
    currentBackgroundMusic = musicPlayer[musicKey];
    currentBackgroundMusic.loop = true;
    currentBackgroundMusic.autostart = true;
    currentBackgroundMusic.volume.value = -20; // Lower the volume
    currentBackgroundMusic.start();
    box.classList.add("shrunk");
  }
}

const soundEffects = {
  bird: new Tone.Player("bird.mp3").connect(reverb).toDestination(),
  bird2: new Tone.Player("bird2.mp3").connect(reverb).toDestination(),
  footstep: new Tone.Player("footstep.mp3").connect(reverb).toDestination(),
  train: new Tone.Player("train.mp3").connect(reverb).toDestination(),
  churchbell: new Tone.Player("churchbell.mp3").connect(reverb).toDestination(),
  rain: new Tone.Player("rain.mp3").connect(reverb).toDestination(),
  stream: new Tone.Player("stream.mp3").connect(reverb).toDestination(),
  newspaper: new Tone.Player("newspaper.mp3").connect(reverb).toDestination(),
};

// Manage random sound playback // Random sounds selection
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

// Attach click event to the background music box
document
  .querySelector("#background-zone")
  .addEventListener("click", (event) => {
    playRandomMusic(event.currentTarget);
  });
