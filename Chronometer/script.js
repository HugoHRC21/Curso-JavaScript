const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const modeRadios = document.querySelectorAll("input[name='mode']");
const timeInputDiv = document.getElementById("timeInput");

const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");

const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");

const alarmSound = document.getElementById("alarmSound");

let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
let mode = "stopwatch"; // modo inicial
let totalSeconds = 0;   // para temporizador
let remainingSeconds = 0;

// Mostrar tiempo en pantalla
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = `${h}:${m}:${s}`;
}

// Iniciar cronómetro o temporizador
function startTimer() {
  if (timer !== null) return; // evitar múltiples intervalos

  if (mode === "countdown" && hours === 0 && minutes === 0 && seconds === 0) {
    hours = parseInt(hoursInput.value) || 0;
    minutes = parseInt(minutesInput.value) || 0;
    seconds = parseInt(secondsInput.value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    remainingSeconds = totalSeconds;

    if (totalSeconds === 0) {
      alert("⏳ Ingresa un tiempo válido");
      return;
    }

    progressContainer.style.display = "block";
  }

  timer = setInterval(() => {
    if (mode === "stopwatch") {
      seconds++;
      if (seconds === 60) { seconds = 0; minutes++; }
      if (minutes === 60) { minutes = 0; hours++; }
    } else {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timer);
        timer = null;
        alarmSound.play(); // 🔔 reproducir alarma
        alert("⏰ ¡Tiempo terminado!");
        return;
      }

      if (seconds === 0) {
        if (minutes === 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }

      remainingSeconds--;
      let progressPercent = (remainingSeconds / totalSeconds) * 100;
      progressBar.style.width = progressPercent + "%";
    }

    updateDisplay();
  }, 1000);
}

// Pausar
function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

// Resetear
function resetTimer() {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  progressBar.style.width = "100%";
  progressContainer.style.display = "none";
  alarmSound.pause();
  alarmSound.currentTime = 0; // reiniciar audio
}

// Cambiar modo
modeRadios.forEach(radio => {
  radio.addEventListener("change", (e) => {
    mode = e.target.value;
    resetTimer();
    timeInputDiv.style.display = mode === "countdown" ? "block" : "none";
  });
});

// Botones
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Pantalla inicial
updateDisplay();
