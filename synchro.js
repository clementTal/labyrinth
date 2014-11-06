var myDataRef;
function initSynchro(){
  myDataRef = new Firebase('https://resplendent-inferno-5296.firebaseio.com/');

  //get Data
  myDataRef.on('child_changed', function(snapshot) {
    var player = snapshot.val();
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
        players[i] = player;
      }
    }
  });
}

function getPlayer(){
	var player;
	for (var i = 0; i < players.length; i++){
		if (players[i].name == getNomJoueur()) {
			player = players[i];
		}
	}
	return player;
}

//log new player on the game
function login()  {

  window.addEventListener("keydown", function(event) {
    //up
	var player = getPlayer();
    console.log(gameGrid.length);
    if (event.keyCode === 40){
      if (player.y < gameGrid.length-1) {
        player.y++;
      } else {
        player.y = 0;
      }
    }
    //down
    if (event.keyCode === 38){
      if (player.y != 0) {
        player.y--;
      } else {
        player.y = gameGrid.length-1;
      }
    }
    //left
    if (event.keyCode === 37){
      if (player.x != 0) {
        player.x--;
      } else {
        player.x = gameGrid[0].length-1;
      }
    }
    //right
    if (event.keyCode === 39){
      if (player.x < gameGrid[0].length-1) {
        player.x++;
      } else {
        player.x = 0;
      }
    }

    for (var i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
        players[i] = player;
      }
    }
    myDataRef.set(players);
  }, false);
}