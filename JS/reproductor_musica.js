/** @format */

const songs = [
  {
    src: "../Musica/cancion_1.mp3",
    image: "./Img/Cancion_1.jpeg",
    title: "Aire - Los Cafres",
  },
  { src: "song2.mp3", image: "./Img/Cancion_2.jpeg", title: "Canción 2" },
  { src: "song3.mp3", image: "./Img/Cancion_3.jpeg", title: "Canción 3" },
  { src: "song4.mp3", image: "./Img/Cancion_4.jpeg", title: "Canción 4" },
  { src: "song5.mp3", image: "./Img/Cancion_5.jpeg", title: "Canción 5" },
];

let currentSongIndex = 0;
const audioPlayer = new Audio(songs[currentSongIndex].src);
const coverImage = document.getElementById("coverImage");
const songTitle = document.getElementById("songTitle");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");
const animacionDeMusic = document.getElementById("animacion_de_music").children;

let animacionIndex = 0;

// Cambiar animación cada segundo
setInterval(() => {
  for (let i = 0; i < animacionDeMusic.length; i++) {
    animacionDeMusic[i].style.opacity = i === animacionIndex ? "1" : "0.5";
  }
  animacionIndex = (animacionIndex + 1) % animacionDeMusic.length;
}, 1000);

// Actualizar tiempo total al cargar la canción
audioPlayer.addEventListener("loadedmetadata", () => {
  totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

// Actualizar el progreso de la barra y el tiempo actual
audioPlayer.addEventListener("timeupdate", () => {
  progress.style.width =
    (audioPlayer.currentTime / audioPlayer.duration) * 100 + "%";
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

// Reproducir o pausar la música
function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.classList.replace(
      "bi-play-circle-fill",
      "bi-pause-circle-fill",
    );
  } else {
    audioPlayer.pause();
    playPauseBtn.classList.replace(
      "bi-pause-circle-fill",
      "bi-play-circle-fill",
    );
  }
}

// Avanzar 10 segundos
function skipForward() {
  audioPlayer.currentTime += 10;
}

// Retroceder 10 segundos
function skipBackward() {
  audioPlayer.currentTime -= 10;
}

// Cambio a la siguiente canción
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updatePlayer();
}

// Cambio a la canción anterior
function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updatePlayer();
}

// Actualizar el reproductor con la nueva canción y carátula
function updatePlayer() {
  audioPlayer.src = songs[currentSongIndex].src;
  coverImage.src = songs[currentSongIndex].image;
  songTitle.textContent = songs[currentSongIndex].title;
  audioPlayer.play();
  playPauseBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
}

// barra de progreso
function seek(event) {
  const percent = event.offsetX / progressBar.offsetWidth;
  audioPlayer.currentTime = percent * audioPlayer.duration;
}

//
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}

/**/
function siguiente() {
  let elementos = document.querySelectorAll(".elemento");
  document.querySelector(".diapositiva").appendChild(elementos[0]);
}

function anterior() {
  let elementos = document.querySelectorAll(".elemento");
  document
    .querySelector(".diapositiva")
    .prepend(elementos[elementos.length - 1]);
}
