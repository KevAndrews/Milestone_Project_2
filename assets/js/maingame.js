/* Custom Code */
$(document).ready(function() {
    loadMap();

    $(".green-div").click(function() {
        checkTile(this);
    });

    $(".blue-div").click(function() {
        checkTile(this);
    });

});

function loadMap(){
    let map = [
        [0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0],
        [2,1,1,1,1,1,3],
        [0,0,1,1,1,1,0],
        [0,0,0,0,0,0,0]
    ];

    document.getElementById('game-world').innerHTML = "";

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

function checkTile(selectedDiv){
    
    if($(selectedDiv).children().hasClass("player-div")){
        alert("Already Here");
    } 
    
    if($(selectedDiv).hasClass("green-div")){
        //Check 4 dircetions
        //Up
        if($(selectedDiv).prevAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).prevAll().eq(6).children().remove();
            $(selectedDiv).prevAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
        //Down
        if($(selectedDiv).nextAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).nextAll().eq(6).children().remove();
            $(selectedDiv).nextAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
        //left
        if($(selectedDiv).prev().children().hasClass("player-div")){
            $(selectedDiv).prev().children().remove();
            $(selectedDiv).prev().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
        //right
        if($(selectedDiv).next().children().hasClass("player-div")){
            $(selectedDiv).next().children().remove();
            $(selectedDiv).next().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
    } else if($(selectedDiv).hasClass("blue-div")){
        //Check 4 dircetions
        //Up
        if($(selectedDiv).prevAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).prevAll().eq(6).children().remove();
            $(selectedDiv).prevAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
        //Down
        if($(selectedDiv).nextAll().eq(6).children().hasClass("player-div")){
            $(selectedDiv).nextAll().eq(6).children().remove();
            $(selectedDiv).nextAll().eq(6).removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
        //left
        if($(selectedDiv).prev().children().hasClass("player-div")){
            $(selectedDiv).prev().children().remove();
            $(selectedDiv).prev().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
        //right
        if($(selectedDiv).next().children().hasClass("player-div")){
            $(selectedDiv).next().children().remove();
            $(selectedDiv).next().removeClass("green-div");
            $(selectedDiv).html('<div class="player-div"></div>');
        }
    }

}