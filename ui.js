var gameGrid = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
var players=[
	{
		name:"thomas",
		x:0,
		y:0,
		tileId:1
	},
	{
		name:"clement",
		x:0,
		y:0,
		tileId:2
	}
];

var gridWidth = 50;

window.onload = function(){
	document.getElementById('login').addEventListener('click',login,false);
	loadGrid(gameGrid);
	initSynchro();
	showPlayer();
}


function getNomJoueur(){
	return document.getElementById("nom-joueur").value;
}

function loadGrid(grid){
	var buildcontent = '';
	for(var i = 0;i<grid.length; i++){
		for(var j = 0;j<grid[i].length; j++){
			buildcontent+= '<div class="tile t-' + grid[i][j] + '" id="' + j+ '-' + i + '"></div>';
		}
		buildcontent+='<br>';
	}
	document.getElementById('game-container').innerHTML = buildcontent;
}

function showPlayer(){

	
	for(var i = 0;i<players.length; i++){
		var tiles = document.getElementsByClassName('tile');
		for(var j = 0;j<tiles.length; j++){
			tiles[j].classList.remove(players[i].name);
		}
	}
	
	for(var i = 0;i<players.length; i++){
		var playerTile = document.getElementById(players[i].x + '-' + players[i].y);
		if(playerTile)
			playerTile.classList.add(players[i].name);
	}
	
}