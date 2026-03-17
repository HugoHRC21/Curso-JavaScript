const colorBox =  document.getElementById("colorBox");

colorBox.addEventListener("mousemove", (event) => {
    const red = event.offsetX;
    const green = event.offsetY;
    const blue = (event.offsetX + event.offsetY) % 255;
    colorBox.style.backgroundColor = `rgb(${red},${green},${blue})`;
})


const textInput = document.getElementById("textInput");
const liveText = document.getElementById("liveText");

textInput.addEventListener("input", () => {
  liveText.innerText = textInput.value || "Aqui aparecera lo que escribas...";
});  

const keyInfo = document.getElementById("keyInfo");

document.addEventListener("keydown", (event) => {
    keyInfo.innerText = `presionaste: ${event.key}`;
})
