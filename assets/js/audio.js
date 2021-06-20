document.addEventListener('DOMContentLoaded', (event) => {
    let bgMusic = new sound("http://127.0.0.1:5500/assets/audio/bg_music.mp3");
    bgMusic.play();
});


/* Code from https://www.w3schools.com/graphics/game_sound.asp */ 
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.2;
    this.sound.loop = true;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}