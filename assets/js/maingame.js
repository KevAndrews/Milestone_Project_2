/* Custom Code */
$(document).ready(function() {
    runGame();
});

function runGame(){
    //set game world parameters
    let level = 1;
    let score = 0;

    //Load Map/level
    loadLevel(level);

    /* 
        Code to fix a reload bug that disabled the click function 
        https://www.codewall.co.uk/jquery-on-click-function-not-working-after-appending-html/ 
    */
    $("body").on("click", "div", function(){
        
        if($(this).children().hasClass("enemy-div") && movePlayer(this)){
            incrementScore(10);
        } else if(movePlayer(this)){
            if($(this).hasClass("end-div")){
                score = endLevelScore();
                level = endLevel(level);
                loadLevel(level);
            } else{
                incrementScore(1);
            }
        } else{
            //Check if the player is on the current Tile, display message
            if($(this).children().hasClass("player-div")){
                $(".game-message").html("You are on the current tile").css("visibility","visible");
            } else{
                $(".game-message").css("visibility","hidden");
            }
        } 
    });

    $("#restart").click(function() {
        loadLevel(level);
        levelScore(score); // reset the score to be the same as the start of the level
    });

    $("#menu").click(function() {
        returnToMenu();
    });

}

// Increment the level
function endLevel(level){
	$("#level").html(++level);
    return level;
}

// Calculate the Score at the end of the level
function endLevelScore(){
    let oldScore = parseInt($("#score").text());
	let finishTime = parseInt($("#time").text());

    let levelScore = oldScore + (finishTime * 10);

    $("#score").html(levelScore);

    return levelScore;
}

// Used the JavaScript_walk_through_challenge as a template
function incrementScore(points) {
	// Gets the current score from the DOM and increments it
	let oldScore = parseInt($("#score").text());
    oldScore = oldScore + points;
	$("#score").html(oldScore);
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
/*let elapsed_seconds = 60;
setInterval(function() {
  elapsed_seconds = --elapsed_seconds;
  $('#time').text(elapsed_seconds);
  if(elapsed_seconds <= 0){
      alert("Game Over");
      elapsed_seconds = 60;
  }
}, 1000);*/

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

    if(level == 1){
        return lvl1;
    }

    if(level == 2){
        return lvl2;
    }

    if(level == 3){
        return lvl3;
    }

    return lvl1;
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