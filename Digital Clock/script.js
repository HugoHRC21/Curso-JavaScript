function updateClock() {
  const now = new Date();


  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;


  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  document.getElementById("date").innerText = `${dayName}, ${day} ${monthName} ${year}`;
}

setInterval(updateClock, 1000);
updateClock();


setTimeout(() => {
  const welcomeDiv = document.getElementById("welcome");
  const welcomeMsg = document.getElementById("welcomeMsg");
  const closeBtn = document.getElementById("closeWelcome");

  welcomeMsg.innerText = "👋 Welcome! Enjoy your digital clock.";
  welcomeDiv.classList.add("show");


  closeBtn.addEventListener("click", () => {
    welcomeDiv.classList.remove("show");
  });

}, 2000);
