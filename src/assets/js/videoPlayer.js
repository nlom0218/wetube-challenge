import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrBtn = document.getElementById("jsFullScreenButton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    volumeRange.value = 0;
  }
}

function exitFullScreen() {
  document.exitFullscreen();
  fullScrBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  fullScrBtn.addEventListener("click", goFullScreen);
  fullScrBtn.removeEventListener("click", exitFullScreen);
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  fullScrBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  fullScrBtn.removeEventListener("click", goFullScreen);
  fullScrBtn.addEventListener("click", exitFullScreen);
}

async function setTotalTime() {
  totalTime.innerText = formatDate(videoPlayer.duration);
  getCurrentTime();
  // 비디오를 업르드 할 때 필요한 작업
  // const blob = await fetch(videoPlayer.src).then((response) => response.blob());
  // const duration = await getBlobDuration(URL.createObjectURL(blob);
  // console.log(duration);
}

function getCurrentTime() {
  setInterval(() => {
    currentTime.innerText = formatDate(Math.floor(videoPlayer.currentTime));
  }, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function handleDrag(e) {
  const {
    target: { value },
  } = e;
  videoPlayer.volume = value;
  if (value > 0.7) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value > 0.3) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
