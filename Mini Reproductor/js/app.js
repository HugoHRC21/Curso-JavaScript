import { songs } from "./playlist.js";
import { Player } from "./player.js";


const audio = document.getElementById("audio");
const currentSongEl = document.getElementById("currentSong");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const playlistEl = document.getElementById("playlist");

const player = new Player(audio, currentSongEl);
player.setPlaylist(songs);


player.loadSong(0); 

songs.forEach((song, index) => { 
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
        player.loadSong(index);
        playBtn.textContent = "▶️";
    });
  playlistEl.appendChild(li);
});


playBtn.addEventListener("click", () => {
  if (!audio.src) {
    player.loadSong(0); 
  }
 
  if (audio.paused) {
    player.play(); 
    playBtn.textContent = "⏸️"; 
  } else {
    player.pause(); 
    playBtn.textContent = "▶️";
  }
});


nextBtn.addEventListener("click", () => {
    player.next();
    playBtn.textContent = "▶️";
});
prevBtn.addEventListener("click", () => {
    player.prev();
    playBtn.textContent = "▶️";
});