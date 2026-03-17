const sound = {
    applause: new Audio("sounds/Applause.mp3"),
    drum: new Audio("sounds/Drum.mp3"),
    bell: new Audio("sounds/Bell.mp3"),
    laugh: new Audio("sounds/Laugh.mp3"),
};

let currentSound = null;

const buttons = document.querySelectorAll("button");

buttons.forEach(button =>{
    button.addEventListener("click", () => {
        const soundName = button.dataset.sound;

        if(currentSound){
            currentSound.pause();
            currentSound.currentTime = 0;
        }

        currentSound = sound[soundName];
        currentSound.play();
    });
});