var playersData;
var mapData;
var iAmMaster = true;
var randomNumber;
var gameList;
function initSynchro(){
  var allDataBase = new Firebase('https://resplendent-inferno-5296.firebaseio.com');
  playersData = new Firebase('https://resplendent-inferno-5296.firebaseio.com/players');
  mapData = new Firebase('https://resplendent-inferno-5296.firebaseio.com/map');
  gameList = new Firebase('https://resplendent-inferno-5296.firebaseio.com/games');
  //playersData.remove();
  initPlayersHandler('child_changed');
  initPlayersHandler('child_added');
  initMapHandler('child_changed');
  initGamesHandler('child_added');
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
  //Init player position
  initPLayer();
  document.getElementById('connexion-form').style.display = 'none';

  window.addEventListener("keydown", function(event) {
    //down
    var player = getPlayer();
    if(!player.moves){
      if (event.keyCode === 40 && isTileWalkable(player.x,player.y+1,'down')){
        if (player.y < gameGrid.length-1) {
         player.moves = true;
         player.direction = 'down';
         player.y++;
       } else {
         player.y = 0;
       }
     }
		//up
		if (event.keyCode === 38 && isTileWalkable(player.x,player.y-1,'up')){
      if (player.y != 0) {
       player.moves = true;
       player.direction = 'up';
       player.y--;
     } else {
       player.y = gameGrid.length-1;
     }
   }
		//left
		if (event.keyCode === 37 && isTileWalkable(player.x-1,player.y,'left')){
			player.moves = true;
			player.direction = 'left';
      if (player.x != 0) {
       player.x--;
     } else {
       player.x = gameGrid[0].length-1;
     }
   }
		//right
		if (event.keyCode === 39 && isTileWalkable(player.x+1,player.y,'right')){
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
 playerData.set(playersTemp);
}

/**
* init firebase handler
*/
function initPlayersHandler(handlerName) {
  playersData.on(handlerName, function(snapshot) {
  var player = snapshot.val();
  var newPlayer = true; 
  for (var i = 0; i < players.length; i++) {
    if (players[i].name === player.name) {
      setPlayerFromServer(player, players[i]);
      newPlayer = false;
    }
  }
  if (newPlayer){
    player.xReal = 0;
    player.yReal = 0;
    player.tileId = 0;
    players.push(player);
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
  mapData.set({map: JSON.stringify(map)});
}

/**
* is triggerd on map change
*/
function initMapHandler(handlerName) {
  mapData.on(handlerName, function(snapshot) {
    gameGrid = JSON.parse(snapshot.val());
  });
}

/**
* is triggerd on game added
*/
function initGamesHandler(handlerName) {
  gameList.on(handlerName, function(snapshot) {
    var element = document.createElement('li');
    element.innerHTML = '<li onclick="joinGame(\''+snapshot.name()+'\');">partie de '+snapshot.val().creatorName+'</li>';
    document.getElementById('games-list').appendChild(element);
  });
}


/**
* Create a new game
*/
function createGame() {
  playersData.remove();
  var grid = generateRandomWeightedGrid(20,12);
  saveMap(grid);
  var newGame = {
    grid: JSON.stringify(grid), 
    creatorName: getNomJoueur()
  }
  gameList.push(newGame);
}

function joinGame(gameId) {
  var gameData = new Firebase('https://resplendent-inferno-5296.firebaseio.com/games/'+gameId);
  gameData.once('value', function(snapshot) {
    gameGrid = JSON.parse(snapshot.val().grid);
    playersData.off('child_changed');
    playersData.off('child_added');
    playersData = new Firebase('https://resplendent-inferno-5296.firebaseio.com/games/'+gameId+'/playes');
    initPlayersHandler('child_changed');
    initPlayersHandler('child_added');
  });
}

/**
* Set the master of the game (who can generate the map)
*/
function reloadMap() {
  var grid = generateRandomWeightedGrid(20,12);
  saveMap(grid);
}

function initPLayer(){
  var player = {
    name: getNomJoueur(),
    x:0,
    y:0,
    tileId:1,
    xReal:0,
    yReal:0,
    direction:"",
    moves: false
  };
  players.push(player);
  var playerToInit = {};
  setPlayerFromServer(player, playerToInit);
  sendPosition(playerToInit);
}