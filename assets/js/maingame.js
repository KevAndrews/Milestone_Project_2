/* Custom Code */
$(document).ready(function() {
    runGame();
});

function runGame(){
    //set game world parameters
    let level = 1;
    let score = 0;
    let letter = 'a';
    let totalMissedMemories = 0;
    let sfx = new sound("https://kevandrews.github.io/Milestone_Project_2/assets/audio/end_level.mp3");

    //Load Map/level
    loadLevel(level);

    /* 
        Code to fix a reload bug that disabled the click function 
        https://www.codewall.co.uk/jquery-on-click-function-not-working-after-appending-html/ 
    */
    $("body").on("click", "div", function(){
    
        // Display message if the player is on the selected tile
        if($(this).children().hasClass("player-div")){
            $(".game-message").html("You are on the current tile").removeClass("hide").addClass("show");
        } else if($(this).hasClass("grass-div")){
            $(".game-message").html("You cannot move here").removeClass("hide").addClass("show");
        }

        // Check for Enemy and increment score
        if($(this).children().hasClass("enemy-div") && movePlayer(this)){
            sfx = new sound("https://kevandrews.github.io/Milestone_Project_2/assets/audio/hit.mp3");
            sfx.play();
            $(".game-message").removeClass("show").addClass("hide");
            letter = getMemoryLetter(level, $('.enemy-div').length);
            updateMemory(letter);
            incrementScore(10, false);
        } 
        
        if(movePlayer(this)){
            sfx = new sound("https://kevandrews.github.io/Milestone_Project_2/assets/audio/end_level.mp3");
            $(".game-message").removeClass("show").addClass("hide");
            if($(this).hasClass("end-div") && level < 8){
                sfx.play();
                clearInterval(refreshIntervalId);
                $("#game-btn").text("Next Level");
                totalMissedMemories += $('.enemy-div').length;
                openModal(level, totalMissedMemories);
                score = incrementScore(0, true);
                level = endLevel(level);
            } else if($(this).hasClass("end-div") && level >= 8){
                sfx.play();
                clearInterval(refreshIntervalId);
                $("#game-btn").text("Main Menu");
                score = incrementScore(0, true);
                openModal(level, totalMissedMemories);
            } else{
                sfx = new sound("https://kevandrews.github.io/Milestone_Project_2/assets/audio/walk.mp3");
                sfx.play();
                incrementScore(1, false);
            }
        } else{

        } 
    });
    
    // Restart current level
    $("#restart").click(function() {
        $(".game-message").removeClass("show").addClass("hide");
        loadLevel(level);
        levelScore(score); // reset the score to be the same as the start of the level
    });
    
    // Return to Main Menu
    $("#menu").click(function() {
        returnToMenu();
    });

    // Close Modal
    $("#modal-levelend").click(function() {
        closeModal(level);
    });

}

/* Start Status Functions */

// Increment the level
function endLevel(level){
    $("#memory").empty();
	$("#level").html(++level);
    return level;
}

// Used the JavaScript_walk_through_challenge as a template
function incrementScore(points, endOfLevel) {
    // Gets the current score from the DOM and increments it
	let oldScore = parseInt($("#score").text());
    // Calculate the Score at the end of the level
    let finishTime = parseInt($("#time").text());
    let levelScore = oldScore + (finishTime * 10);

    if(!endOfLevel){
        oldScore = oldScore + points;
        $("#score").html(oldScore);
        return oldScore;
    } else{
        $("#score").html(levelScore);
        return levelScore;
    }
    
}

// Get the next letter for the current animal on this level
function getMemoryLetter(currentLevel, remainingEnemies){
    let memories = ['goD','noiL','esroH','acaplA','hateehC','tnahpelE','elidocorC','soreconihR'];
    let memory = memories[currentLevel-1];
    let memoryLetters = memory.split('');

    return memoryLetters[remainingEnemies];
}

// Set memory id
function updateMemory(letter){
    $("#memory").append(letter);
}

// Sets the score if the level is restarted
function levelScore(score){
    $("#score").html(score);
}

/*
    Code used from:
    https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer
*/
let elapsed_seconds = 60;
var refreshIntervalId = setInterval(countdown, 1000);
function countdown(){
    elapsed_seconds = --elapsed_seconds;
    $('#time').text(elapsed_seconds);
    if(elapsed_seconds <= 0){
        gameOver();
        elapsed_seconds = 60;
    } 
}
/* End Status Functions */

/* Start Game / Button Functions */
function gameOver(){
    clearInterval(refreshIntervalId);
    $(".modal-title").text("Game Over");
    $("#game-btn").text("Main Menu");
    $("#modal-levelend").removeClass("hide-modal").addClass("display-modal");
}

// Return player to index.html / Main Menu
function returnToMenu(){
    window.location.href = "index.html";
}

// Return a given level map
function selectLevelMap(level){
    let lvl1 = [
        [0,0,0,0,0,0,0],
        [0,0,0,1,4,0,0],
        [2,1,1,1,1,1,3],
        [0,0,4,1,1,4,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl2 = [
        [2,1,1,1,1,4,0],
        [0,1,0,4,1,1,0],
        [0,1,0,1,0,1,0],
        [0,1,1,4,1,1,0],
        [0,0,0,0,1,4,3]
    ];

    let lvl3 = [
        [0,4,1,0,0,0,0],
        [0,1,1,0,0,0,0],
        [2,1,4,4,1,0,0],
        [0,0,1,1,1,4,0],
        [0,0,4,1,0,3,0]
    ];

    let lvl4 = [
        [2,0,0,0,0,0,0],
        [1,0,1,1,4,0,0],
        [4,1,4,0,1,0,0],
        [0,0,4,1,4,0,0],
        [0,0,1,1,1,4,3]
    ];

    let lvl5 = [
        [0,4,1,1,4,1,1],
        [2,1,0,0,1,0,1],
        [0,0,0,4,1,0,1],
        [0,1,4,1,1,4,3],
        [0,4,1,4,1,1,0]
    ];

    let lvl6 = [
        [1,4,1,1,1,1,1],
        [1,0,0,4,4,0,1],
        [2,0,1,1,0,0,3],
        [0,4,1,1,4,1,4],
        [0,1,4,1,0,4,1]
    ];

    let lvl7 = [
        [0,0,1,4,1,0,0],
        [0,0,1,0,4,4,3],
        [0,0,1,4,0,4,4],
        [2,1,0,4,1,1,0],
        [0,4,1,4,0,1,1]
    ];

    let lvl8 = [
        [0,0,0,4,4,0,0],
        [4,2,4,1,1,1,4],
        [1,0,1,0,0,4,4],
        [1,4,4,1,1,3,1],
        [0,4,1,0,0,0,0]
    ];

    switch (level) {
        case 1:
            return lvl1;
        case 2:
            return lvl2;
        case 3:
            return lvl3;
        case 4:
            return lvl4;
        case 5:
            return lvl5;
        case 6:
            return lvl6;
        case 7:
            return lvl7;
        case 8:
            return lvl8;
        default:
            return lvl1;
    }

}

// Build a level map
function loadLevel(level){
    let map = selectLevelMap(level);

    $("#memory").empty();
    $('#game-world').empty();

    for (let i = 0; i < map.length; i++) {
      for(let l = 0; l < map[i].length; l++){
        if(map[i][l] == 1){
            $('#game-world').append('<div class="game-tile ground-div"></div>');
        } else if((map[i][l] == 2)){
            $('#game-world').append('<div class="game-tile ground-div"><div class="player-div"></div></div>');
        } else if((map[i][l] == 3)){
            $('#game-world').append('<div class="game-tile end-div"></div>');
        } else if((map[i][l] == 4)){
            $('#game-world').append('<div class="game-tile ground-div"><div class="enemy-div"></div></div>');
        } else{
            $('#game-world').append('<div class="game-tile grass-div"></div>');
        } 
      }
    }
}

// Handle player move, returns true if player moved
function movePlayer(selectedDiv){
    
    if($(selectedDiv).hasClass("ground-div")||$(selectedDiv).hasClass("end-div")){
        //Check 4 dircetions
        //Up
        if($(selectedDiv).prevAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).prevAll().eq(6).children().remove();
            $(selectedDiv).prevAll().eq(6).removeClass("ground-div").addClass("grass-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //Down
        if($(selectedDiv).nextAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).nextAll().eq(6).children().remove();
            $(selectedDiv).nextAll().eq(6).removeClass("ground-div").addClass("grass-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //left
        if($(selectedDiv).prev().children().hasClass("player-div")){
            $(selectedDiv).prev().children().remove();
            $(selectedDiv).prev().removeClass("ground-div").addClass("grass-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //right
        if($(selectedDiv).next().children().hasClass("player-div")){
            $(selectedDiv).next().children().remove();
            $(selectedDiv).next().removeClass("ground-div").addClass("grass-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
    }

    return false;
}

/* Used JQuery_Method_Chaining___Challenge_1 as a template */
function openModal(level, totalMissedMemories){
    clearInterval(refreshIntervalId);
    if(level < 8){
        $(".modal-title").text("Level " + level + " Completed");
    } else{
        $(".modal-title").text("Game Completed");
    }
    
    $("#modal-levelend").removeClass("hide-modal").addClass("display-modal");
    populateMadal(totalMissedMemories);
}

// Close the end level Modal
function closeModal(level){
    if($("#game-btn").text() == "Main Menu"){
        returnToMenu();
    } else{
        $("#modal-levelend").removeClass("display-modal").addClass("hide-modal");
        loadLevel(level);
        refreshIntervalId = setInterval(countdown, 1000);
    } 
}

// Populate the end Modal screen
function populateMadal(totalMissedMemories){
    $("#missed-memories").text(totalMissedMemories);
    $("#current-level").text($("#level").text());
    $("#remaining-time").text($("#time").text());
    $("#current-score").text($("#score").text());
}

/* Code from https://www.w3schools.com/graphics/game_sound.asp */ 
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.2;
    this.sound.loop = false;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
}
/* End Game / Button Functions */