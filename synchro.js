var myDataRef;
function initSynchro(){
  myDataRef = new Firebase('https://resplendent-inferno-5296.firebaseio.com/');

  //get Data
  myDataRef.on('child_changed', function(snapshot) {
    var player = snapshot.val();
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
          players[i].x = player.x;
          players[i].y = player.y;
          players[i].direction = player.direction;
          players[i].moves = player.moves;
      }
    }
  });

  myDataRef.on('child_added', function(snapshot) {
    var player = snapshot.val();
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
          players[i].x = player.x;
          players[i].y = player.y;
          players[i].direction = player.direction;
          players[i].moves = player.moves;
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

    /*var playerTemp1 = {x: 0, y: 0};
    var playerTemp2 = {x: 0, y: 0};
    playerTemp1.x = players[0].x
    playerTemp1.y = players[0].y
    playerTemp2.x = players[0].x
    playerTemp2.y = players[0].y */
    var playersTemp = [];
		for (var i = 0; i < players.length; i++) {
      playersTemp[i] = {};
		  if (players[i].name === player.name) {
			 playersTemp[i].x = player.x;
       playersTemp[i].y = player.y;
       playersTemp[i].name = player.name;
       playersTemp[i].direction = player.direction;
       playersTemp[i].moves = player.moves;
       
		  }
		}
		myDataRef.set(playersTemp);
    console.info('set');
	}
  }, false);
}