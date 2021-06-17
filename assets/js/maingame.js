function loadMap(){
    let map = [
        [1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1],
        [1,0,0,2,0,0,1],
        [1,0,0,0,0,0,1],
        [1,0,0,0,0,0,1]
    ];

    document.getElementById('game-world').innerHTML = "";

    for (let i = 0; i < map.length; i++) {
      for(let l = 0; l < map[i].length; l++){
        if(map[i][l] == 1){
            document.getElementById('game-world').innerHTML += `<div class="game-tile green-div"></div>`;
        } else{
            document.getElementById('game-world').innerHTML += `<div class="game-tile red-div"></div>`;
        } 
      }
    }
}