const playPauseBtn = document.querySelector("#play-pause");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const currentTimeEl = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-time");
const musicImg = document.querySelector(".container img");
const titleEl = document.querySelector(".title");
const authorEl = document.querySelector(".author");
const progressBar = document.querySelector(".progress");
const progressBarDiv = document.querySelector(".progress-bar");
const audio = new Audio();

const audioData = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    image: "image/cover-1.png",
    songsrc: "music/lost-in-city-lights-145038.mp3",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    image: "image/cover-2.png",
    songsrc: "music/forest-lullaby-110624.mp3",
  },
];

let songIndex = 0;
let duration;
let isPlaying = false;

function playSong() {
  isPlaying = true;
  playPauseBtn.firstElementChild.src = "image/pause.svg";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playPauseBtn.firstElementChild.src = "image/play.svg";
  audio.pause();
}
playPauseBtn.addEventListener("click", function () {
  isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
  musicImg.src = song.image;
  titleEl.textContent = song.title;
  authorEl.textContent = song.author;
  audio.src = song.songsrc;
}

loadSong(audioData[songIndex]);

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = audioData.length - 1;
  loadSong(audioData[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > audioData.length - 1) songIndex = 0;
  loadSong(audioData[songIndex]);
  playSong();
}

function updateProgressBar(e) {
  const { currentTime, duration } = e.srcElement;

  // Updating Progress Bar
  const progressBarPercent = (currentTime / duration) * 100;

  progressBar.style.width = `${progressBarPercent}%`;

  // Updating Total Time
  const durationInMin = Math.round(duration / 60);
  let durationInSec = Math.round(duration % 60);

  if (durationInSec < 10) durationInSec = `0${durationInSec}`;
  if (durationInSec)
    totalDuration.textContent = `0${durationInMin}:${durationInSec}`;

  // Updating current time
  const currentTimeInMin = Math.floor(currentTime / 60);
  let currentTimeInSec = Math.round(currentTime % 60);
  if (currentTimeInSec < 10) currentTimeInSec = `0${currentTimeInSec}`;

  if (currentTimeInSec)
    currentTimeEl.textContent = `0${currentTimeInMin}:${currentTimeInSec}`;
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickedX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickedX / width) * duration;
  isPlaying && playSong();
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", nextSong);
progressBarDiv.addEventListener("click", setProgressBar);
