/* Custom Code */
$(document).ready(function() {
    runGame();
});

function runGame(){
    //set game world parameters
    let level = 1;
    
    //Load Map/level
    loadLevel(level);

    /* 
        Code to fix a reload bug that disabled the click function 
        https://www.codewall.co.uk/jquery-on-click-function-not-working-after-appending-html/ 
    */
    $("body").on("click", "div", function(){
        if(movePlayer(this)){
            if($(this).hasClass("end-div")){
                endLevelScore();
                level = endLevel(level);
                loadLevel(level);
            } else{
                incrementScore();
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
}

// Used the JavaScript_walk_through_challenge as a template
function incrementScore() {
	// Gets the current score from the DOM and increments it
	let oldScore = parseInt($("#score").text());
	$("#score").html(++oldScore);
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

function selectLevelMap(level){
    let lvl1 = [
        [0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0],
        [2,1,1,1,1,1,3],
        [0,0,1,1,1,1,0],
        [0,0,0,0,0,0,0]
    ];

    let lvl2 = [
        [2,1,1,1,1,1,0],
        [0,1,0,1,1,1,0],
        [0,1,0,1,0,1,0],
        [0,0,1,1,1,1,0],
        [0,0,0,0,1,1,3]
    ];

    let lvl3 = [
        [0,1,1,0,0,0,0],
        [0,1,1,0,0,0,0],
        [2,1,1,1,1,0,0],
        [0,0,1,1,1,1,0],
        [0,0,1,1,0,3,0]
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
        } else{
            $('#game-world').append('<div class="game-tile tree-div"></div>');
        } 
      }
    }
}

//Handle player move, returns true if player moved
function movePlayer(selectedDiv){
    
    if($(selectedDiv).hasClass("ground-div")||$(selectedDiv).hasClass("end-div")){
        //Check 4 dircetions
        //Up
        if($(selectedDiv).prevAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).prevAll().eq(6).children().remove();
            $(selectedDiv).prevAll().eq(6).removeClass("ground-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //Down
        if($(selectedDiv).nextAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).nextAll().eq(6).children().remove();
            $(selectedDiv).nextAll().eq(6).removeClass("ground-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //left
        if($(selectedDiv).prev().children().hasClass("player-div")){
            $(selectedDiv).prev().children().remove();
            $(selectedDiv).prev().removeClass("ground-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //right
        if($(selectedDiv).next().children().hasClass("player-div")){
            $(selectedDiv).next().children().remove();
            $(selectedDiv).next().removeClass("ground-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
    }

    return false;
}