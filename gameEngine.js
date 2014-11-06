var img = new Image();   // Crée un nouvel objet Image
img.src = 'indiana_jones.gif'; // Définit le chemin vers sa source

var gameEngine = (function(){
	var realGameWidth;
	var realGameHeight;
	var ctx;
	var canvas;
	var gameWidth = 800;
	var gameHeight = 480;
	

	var ge = {};
	ge.FPS = 40;
	function _setGameFrame(){
		realGameWidth = window.innerWidth; 
		realGameHeight = window.innerHeight; 
		var scaleToFitX = realGameWidth / gameWidth; 
		var scaleToFitY = realGameHeight / gameHeight; 

		var currentScreenRatio = realGameWidth / realGameHeight; 
		var optimalRatio = Math.min(scaleToFitX, scaleToFitY); 

		if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) { 
			canvas.style.width = realGameWidth + "px"; 
			canvas.style.height = realGameHeight + "px"; 
		} 
		else { 
			canvas.style.width = gameWidth * optimalRatio + "px"; 
			canvas.style.height = gameHeight * optimalRatio + "px"; 
			realGameWidth = gameWidth * optimalRatio;
			realGameHeight = gameHeight * optimalRatio;
		}
	};
	
	function _setGameLoop(){
		ctx = canvas.getContext('2d');
		setInterval( _mainloop, 1000.0 / ge.FPS );

		var animFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			null ;

		if ( animFrame !== null ) {
			var now;
			var then = Date.now();
			var interval = 1000.0/ge.FPS;
			var delta;
			var recursiveAnim = function() {
				now = Date.now();
				delta = now - then;
				if (delta > interval) {
					then = now - (delta % interval);
					_mainloop();
					animFrame( recursiveAnim, canvas );
				}
			};
			animFrame( recursiveAnim, canvas );
		} else {
			setInterval( _mainloop, 1000.0 / ge.FPS );
		}
	};
	
	function _mainloop() {
		ge.updateGame();
		ge.drawGame(ctx);
	};
	
	ge.updateGame = function(){}; // à redéfinir par la fonction principale
	ge.drawGame = function(){}; // à redéfinir par la fonction principale

	ge.start = function(parameters){
		if(parameters.gameContainerId){
			canvas = document.getElementById(parameters.gameContainerId);
			_setGameFrame();
			_setGameLoop();
		}
	};
	return ge;
})();
var tileSize = 40;

function drawGrid(grid,ctx){
	for(var i = 0; i< grid.length; i++){
		for(var j = 0; j< grid[i].length; j++){
			drawTile(j,i,grid[i][j],ctx);
		}
	}
}

function drawPlayers(players,ctx){
	for(var i = 0; i< players.length; i++){
		drawPlayer(players[i],ctx);
	}
}

function drawTile(x,y,tileId,ctx){
	ctx.beginPath();
		ctx.fillStyle = "antiquewhite";
		ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
	ctx.closePath();
	
	ctx.beginPath();
		ctx.strokeStyle = "grey";
		ctx.strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
	ctx.closePath();
}

function drawPlayer(player,ctx){
	var ratio = 0.8;
	var marge = (1-ratio)*tileSize/2;
	ctx.drawImage(img,player.xReal+marge,player.yReal+marge,tileSize*ratio,tileSize*ratio)
}

function updatePlayers(players){
	for(var i = 0; i< players.length; i++){
		updatePlayer(players[i]);
	}
}

function updatePlayer(player){
	if(player.moves){
		var timeToMove = 1000;
		var pas = 2;//TODO tileSize/timeToMove/gameEngine.FPS;
		var playerUpdated = false;
		/* case left */
		if(player.direction == 'left'){
			if(player.xReal>player.x*tileSize){
				player.xReal -= pas;
			}else{
				player.xReal = player.x*tileSize;
				player.moves=false;
				playerUpdated = true;
			}
		/* case right */
		}else if(player.direction == 'right'){
			if(player.xReal<player.x*tileSize){
				player.xReal += pas;
			}else{
				player.xReal = player.x*tileSize;
				player.moves=false;
				playerUpdated = true;
			}
		/* case down */	
		}else if(player.direction == 'down'){
			if(player.yReal<player.y*tileSize){
				player.yReal += pas;
			}else{
				player.yReal = player.y*tileSize;
				player.moves=false;
				playerUpdated = true;
			}
		/* case up */	
		}else if(player.direction == 'up'){
			if(player.yReal>player.y*tileSize){
				player.yReal -= pas;
			}else{
				player.yReal = player.y*tileSize;
				player.moves=false;
				playerUpdated = true;
			}
		}
		/*if(playerUpdated){
			myDataRef.push(player);
		}*/
		
		
	}
	
	
}
