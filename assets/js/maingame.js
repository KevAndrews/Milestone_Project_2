/* Custom Code */
$(document).ready(function() {
    runGame();
});

function runGame(){
    //set game world parameters
    let level = 1;
    let score = 0;
    let letter = 'a';

    //Load Map/level
    loadLevel(level);

    /* 
        Code to fix a reload bug that disabled the click function 
        https://www.codewall.co.uk/jquery-on-click-function-not-working-after-appending-html/ 
    */
    $("body").on("click", "div", function(){
        // Check to see if the player can end the level, restart if not
        if(!canEndLevel()){
            $(".game-message").html("You are unable to end the level").removeClass("hide").addClass("show");
            $("#memory").empty();   
            loadLevel(level);
            levelScore(score);
        }
        // Display message that the player is on the current tile
        if($(this).children().hasClass("player-div")){
            $(".game-message").html("You are on the current tile").removeClass("hide").addClass("show");
        }
        // Check for Enemy and increment score
        if($(this).children().hasClass("enemy-div") && movePlayer(this)){
            $(".game-message").removeClass("show").addClass("hide");
            letter = getMemoryLetter(level, $('.enemy-div').length);
            updateMemory(letter);
            incrementScore(10, false);
        } else if(movePlayer(this)){
            $(".game-message").removeClass("show").addClass("hide");
            if($(this).hasClass("end-div")){
                score = incrementScore(0, true);
                level = endLevel(level);
                loadLevel(level);
            } else{
                incrementScore(1, false);
            }
        } else{
            
        } 
    });
    
    // Restart current level
    $("#restart").click(function() {
        $("#memory").empty();
        loadLevel(level);
        levelScore(score); // reset the score to be the same as the start of the level
    });
    
    // Return to Main Menu
    $("#menu").click(function() {
        returnToMenu();
    });

}

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
    let memories = ['goD','noiL','esroH','acaplA'];
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

// Return player to index.html / Main Menu
function returnToMenu(){
    window.location.href = "index.html";
}

/*
    Code used from:
    https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer
*/
let elapsed_seconds = 60;
setInterval(function() {
  elapsed_seconds = --elapsed_seconds;
  $('#time').text(elapsed_seconds);
  if(elapsed_seconds <= 0){
      alert("Game Over");
      elapsed_seconds = 60;
  }
}, 1000);

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
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl5 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl6 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl7 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl8 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl9 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl10 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
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
        case 9:
            return lvl9;
        case 10:
            return lvl10;
        default:
            return lvl1;
    }

}

// Build a level map
function loadLevel(level){
    let map = selectLevelMap(level);

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

// Check if the player can reach the end-div
function canEndLevel(){
    //Up
    if($(".end-div").prevAll().eq(6).hasClass("ground-div")){
        return true;
    }
    //Down
    if($(".end-div").nextAll().eq(6).hasClass("ground-div")){
        return true;
    }
    //left
    if($(".end-div").prev().hasClass("ground-div")){
        return true;
    }
    //right
    if($(".end-div").next().hasClass("ground-div")){
        return true;
    }

    return false;
}