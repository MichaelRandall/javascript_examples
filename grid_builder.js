//global game area variables
var gameTime = 0;
var moveCount = 0;
var wrongMoveCount = 0;
var moveState = 0;

//individual move area variables
var move = 1;


var gameState = {
	moves : [],
	
	addMove: function(move){
		this.moves.push(move);
	},
	
	getGameState : function(){
		console.log("get some game state");
	},

	getLastElement : function(){
		return this.moves[this.moves.length - 1];
	},

	checkMoveState : function(){
		if(this.moves.length % 2 !== 0){
			//gameMoveState = "incomplete";
		}
	},

	getMoveTimeDiff : function(){
		console.log(this.moves[3].mvTime - this.moves[1].mvTime);
	}
}


var container = document.getElementById("container");


//builds the game board when user clicks start
function loadGrid(){
	console.log("loadGrid function called");
	var gameBoard = document.createElement("div");
	gameBoard.setAttribute("id","gameBoard");
	container = document.getElementById("container");
	container.appendChild(gameBoard);
    //specify a dimension for the grid
	buildPanels(4);
}


function init(){
	var strtBttn = document.getElementById("startBttn");
	strtBttn.addEventListener('click', function(){
		loadGrid();
		//Commented out for testing. Uncomment for full game
		ntime = setInterval(gmClock, 1000);
	});
	var pauseBttn = document.getElementById("pauseBttn");
	pauseBttn.addEventListener("click", function(){
		clearInterval(ntime);
	});
	
	var resumeBttn = document.getElementById("resumeBttn");
	resumeBttn.addEventListener('click', function(){
		ntime = setInterval(gmClock, 1000);
	});
}// JavaScript Document