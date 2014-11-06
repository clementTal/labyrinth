var myDataRef;
function initSynchro(){
  myDataRef = new Firebase('https://resplendent-inferno-5296.firebaseio.com/');

  //get Data
  myDataRef.on('child_changed', function(snapshot) {
    var player = snapshot.val();
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
        if(!player.moves){
          players[i] = player;
        }
      }
    }
  });
}

function getPlayer(){
	var player;
	for (var i = 0; i < players.length; i++){
		if (players[i].name == getNomJoueur()) {
			player = JSON.parse(JSON.stringify(players[i]));
		}
	}
	return player;
}

//log new player on the game
function login()  {

  window.addEventListener("keydown", function(event) {
    //down
	var player = getPlayer();
	if(!player.moves){
		console.log(gameGrid.length);
		if (event.keyCode === 40){
		  if (player.y < gameGrid.length-1) {
			player.moves = true;
			player.direction = 'down';
			player.y++;
		  } else {
			player.y = 0;
		  }
		}
		//up
		if (event.keyCode === 38){
		  if (player.y != 0) {
			player.moves = true;
			player.direction = 'up';
			player.y--;
		  } else {
			player.y = gameGrid.length-1;
		  }
		}
		//left
		if (event.keyCode === 37){
			player.moves = true;
			player.direction = 'left';
		  if (player.x != 0) {
			player.x--;
		  } else {
			player.x = gameGrid[0].length-1;
		  }
		}
		//right
		if (event.keyCode === 39){
			player.moves = true;
			player.direction = 'right';
		  if (player.x < gameGrid[0].length-1) {
			player.x++;
		  } else {
			player.x = 0;
		  }
		}

    var playersTemp = JSON.parse(JSON.stringify(players));
		for (var i = 0; i < playersTemp.length; i++) {
		  if (playersTemp[i].name === player.name) {
			playersTemp[i] = player;
		  }
		}
		myDataRef.set(playersTemp);
	}
  }, false);
}