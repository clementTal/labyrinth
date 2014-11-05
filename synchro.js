var myDataRef;
function initSynchro(){
  myDataRef = new Firebase('https://resplendent-inferno-5296.firebaseio.com/');

  //get Data
  myDataRef.on('child_added', function(snapshot) {
    var player = snapshot.val();
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
        players[i] = player;
      }
    }
    showPlayer();
  });
}

//log new player on the game
function login()  {
  var player1;

  for (var i = 0; i < players.length; i++){
    if (players[i].name == getNomJoueur()) {
      player1 = players[i];
    }
  }

  window.addEventListener("keydown", function(event) {
    //up
    console.log(gameGrid.length);
    if (event.keyCode === 40){
      console.log('up!');
      if (player1.y < gameGrid.length-1) {
        player1.y++;
      } else {
        player1.y = 0;
      }
    }
    //down
    if (event.keyCode === 38){
      console.log('down!');
      if (player1.y != 0) {
        player1.y--;
      } else {
        player1.y = gameGrid.length-1;
      }
    }
    //left
    if (event.keyCode === 37){
      console.log('left!');
      if (player1.x != 0) {
        player1.x--;
      } else {
        player1.x = gameGrid[0].length-1;
      }
    }
    //right
    if (event.keyCode === 39){
      console.log('right!');
      if (player1.x < gameGrid[0].length-1) {
        player1.x++;
      } else {
        player1.x = 0;
      }
    }
    myDataRef.push(player1);
  }, false);
}