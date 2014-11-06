var playersData;
var mapData;
function initSynchro(){
  playersData = new Firebase('https://resplendent-inferno-5296.firebaseio.com/players');
  mapData = new Firebase('https://resplendent-inferno-5296.firebaseio.com/map');
  initPlayersHandler('child_changed');
  initPlayersHandler('child_added');
}

/**
* get a copy of the current player
*/
function getPlayer(){
	var player;
	for (var i = 0; i < players.length; i++){
		if (players[i].name == getNomJoueur()) {
			player = JSON.parse(JSON.stringify(players[i]));
		}
	}
	return player;
}

/**
* Log user and init key handler
*/
function login()  {

  window.addEventListener("keydown", function(event) {
    //down
    var player = getPlayer();
    if(!player.moves){
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

   sendPosition(player);
 }
}, false);
}

/**
* save position ^^
*/
function sendPosition(player)  {
  var playerData = playersData.child(player.name);
  var playersTemp = {};
  for (var i = 0; i < players.length; i++) {

    if (players[i].name === player.name) {
     setPlayerFromServer(player, playersTemp);
   }
 }
 playerData.update(playersTemp);
}

/**
* init firebase handler
*/
function initPlayersHandler(handlerName) {
 playersData.on(handlerName, function(snapshot) {
  var player = snapshot.val();
  for (var i = 0; i < players.length; i++) {
    if (players[i].name === player.name) {
      setPlayerFromServer(player, players[i]);
    }
  }
});
}

/**
* Create or update player obj from server
*/
function setPlayerFromServer(playerFrom, playerTo) {
  playerTo.x = playerFrom.x;
  playerTo.y = playerFrom.y;
  playerTo.direction = playerFrom.direction;
  playerTo.moves = playerFrom.moves;
  playerTo.name = playerFrom.name;  
}

/**
* Save a map
*/ 
function saveMap(map) {
  mapData.set(map);
}

/**
* is triggerd on map change
*/
function initMapHandler(handlerName) {
  mapData.on(handlerName, function(snapshot) {
    displayMap(snapshot);
  });
}