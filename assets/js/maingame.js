/* Custom Code */
$(document).ready(function() {
    runGame();
});

function runGame(){
    //set game world parameters
    let level = 1;
    
    //Load Map/level
    loadLevel(level);
    
    $(".green-div").click(function() {
        canMove(this);
    });

    $(".blue-div").click(function() {
        if(canMove(this)){
            endLevelScore();
        }
    });

    $("#restart").click(function() {
        loadLevel(level);
    });

    $("#menu").click(function() {
        returnToMenu();
    });

}

function endLevel(level){
	$("#level").html(++level);
    return ++level;
}

function endLevelScore(){
    let oldScore = parseInt($("#score").text());
	let finishTime = parseInt($("#time").text());

    let levelScore = (oldScore * 10) + (finishTime * 10);

    $("#score").html(levelScore);
}

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

// Used the JavaScript_walk_through_challenge as a template
function incrementScore() {
	// Gets the current score from the DOM and increments it
	let oldScore = parseInt($("#score").text());
	$("#score").html(++oldScore);
}

function loadLevel(level){
    let map = [
        [0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0],
        [2,1,1,1,1,1,3],
        [0,0,1,1,1,1,0],
        [0,0,0,0,0,0,0]
    ];

    $('#game-world').empty();

    for (let i = 0; i < map.length; i++) {
      for(let l = 0; l < map[i].length; l++){
        if(map[i][l] == 1){
            $('#game-world').append('<div class="game-tile green-div"></div>');
        } else if((map[i][l] == 2)){
            $('#game-world').append('<div class="game-tile green-div"><div class="player-div"></div></div>');
        } else if((map[i][l] == 3)){
            $('#game-world').append('<div class="game-tile blue-div"></div>');
        } else{
            $('#game-world').append('<div class="game-tile red-div"></div>');
        } 
      }
    }
}

function canMove(selectedDiv){
    
    //Check if the player is on the current Tile
    if($(selectedDiv).children().hasClass("player-div")){
        alert("You are on the current tile");
    } 
    
    //Check if the selected Tile can be moved to, this is horrible and needs to be corrected 
    if($(selectedDiv).hasClass("green-div")){
        //Check 4 directions around the selected Tile for the player and if so move
        //Up
        if($(selectedDiv).prevAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).prevAll().eq(6).children().remove();
            $(selectedDiv).prevAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            incrementScore();
        }
        //Down
        if($(selectedDiv).nextAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).nextAll().eq(6).children().remove();
            $(selectedDiv).nextAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            incrementScore();
        }
        //left
        if($(selectedDiv).prev().children().hasClass("player-div")){
            $(selectedDiv).prev().children().remove();
            $(selectedDiv).prev().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            incrementScore();
        }
        //right
        if($(selectedDiv).next().children().hasClass("player-div")){
            $(selectedDiv).next().children().remove();
            $(selectedDiv).next().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            incrementScore();
        }
    } else if($(selectedDiv).hasClass("blue-div")){
        //Check 4 dircetions
        //Up
        if($(selectedDiv).prevAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).prevAll().eq(6).children().remove();
            $(selectedDiv).prevAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //Down
        if($(selectedDiv).nextAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).nextAll().eq(6).children().remove();
            $(selectedDiv).nextAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //left
        if($(selectedDiv).prev().children().hasClass("player-div")){
            $(selectedDiv).prev().children().remove();
            $(selectedDiv).prev().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
        //right
        if($(selectedDiv).next().children().hasClass("player-div")){
            $(selectedDiv).next().children().remove();
            $(selectedDiv).next().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
            return true;
        }
    }

}

