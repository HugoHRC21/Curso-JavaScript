// 🎼 Funciones del reproductor
export class Player {
  constructor(audioElement, currentSongElement) {
    this.audio = audioElement;  
    this.currentSongElement = currentSongElement;
    this.currentIndex = 0;
    this.songs = [];
  }

  setPlaylist(songs) {
    this.songs = songs;
  }

  loadSong(index) {
    this.currentIndex = index;
    this.audio.src = this.songs[index].file;
    this.currentSongElement.textContent = "🎶 Cargada: " + this.songs[index].title;
    this.audio.pause(); 
  }

  play() {
    this.audio.play().catch(error => {
    console.error("Error al intentar reproducir (posiblemente política de Autoplay):", error);
    });
  }

  pause() {
    this.audio.pause();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    this.loadSong(this.currentIndex);
  }

  prev() {
    this.currentIndex =
    (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.loadSong(this.currentIndex);   
  }
}