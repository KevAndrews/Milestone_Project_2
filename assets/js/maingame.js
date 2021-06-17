/* Custom Code */
$(document).ready(function() {
    loadMap();

    $(".green-div").click(function() {
        checkTile(this);
    });
});

function loadMap(){
    let map = [
        [1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1],
        [1,0,1,2,1,0,1],
        [1,0,0,1,0,0,1],
        [1,1,1,1,1,1,1]
    ];

    document.getElementById('game-world').innerHTML = "";

    for (let i = 0; i < map.length; i++) {
      for(let l = 0; l < map[i].length; l++){
        if(map[i][l] == 1){
            $('#game-world').append('<div class="game-tile green-div"></div>');
        } else if((map[i][l] == 2))
        {
            $('#game-world').append('<div class="game-tile green-div"><div class="player-div"></div></div>');
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
        
    //Check 4 dircetions
    //Up
    alert($(selectedDiv).prevAll().eq(6).children().hasClass("player-div") + " Up");
    //Down
    alert($(selectedDiv).nextAll().eq(6).children().hasClass("player-div") + " Down");
    //left
    alert($(selectedDiv).prev().children().hasClass("player-div") + " left");
    //right
    alert($(selectedDiv).next().children().hasClass("player-div") + " right");

    //alert($(selectedDiv).prev().children().hasClass("player-div"));

}