/* Custom Code */
document.addEventListener('DOMContentLoaded', (event) => {
    let bgMusic = new sound("https://kevandrews.github.io/Milestone_Project_2/assets/audio/bg_music.mp3");
    document.getElementById("audio-Controller").addEventListener("click", function(){ soundController(bgMusic, this); });
});

// Toggle Music on / off
function soundController(bgMusic, element){

    if(bgMusic.paused){
        element.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i> Pause Music';
        bgMusic.play();
        bgMusic.paused = false;
    } else{
        element.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i> Play Music';
        bgMusic.stop();
        bgMusic.paused = true;
    }
}

/* Code from https://www.w3schools.com/graphics/game_sound.asp */ 
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.2;
    this.sound.loop = true;
    this.paused = true;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}