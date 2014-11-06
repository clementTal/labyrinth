var gameGrid = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
var players=[
	{
		name:"thomas",
		x:0,
		y:0,
		color: "blue",
		prevX:0,
		prevY:0,
		tileId:1,
		xReal:0,
		yReal:0,
		direction:"",
		moves: false
	},
	{
		name:"clement",
		x:0,
		y:0,
		color: "red",
		prevX:0,
		prevY:0,
		tileId:2,
		xReal:0,
		yReal:0,
		direction:"",
		moves: false
	}
];

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
