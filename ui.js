var gameGrid = generateRandomWeightedGrid(20,12);

var players = [];

var gridWidth = 50;

window.onload = function(){
	document.getElementById('login').addEventListener('click',login,false);
	initSynchro();
	
	gameEngine.updateGame = updateGame;
	gameEngine.drawGame = drawGame;
	gameEngine.start({gameContainerId:'game-container'});
}

function updateGame(){
	updatePlayers(players);
}

function drawGame(ctx){
	drawGrid(gameGrid,ctx);
	drawPlayers(players,ctx);
}

function getNomJoueur(){
	return document.getElementById("nom-joueur").value;
}
