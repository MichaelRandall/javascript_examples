var moveState = 0;

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



//global game area variables
var gameStats = [];
var gameTime = 0;
var moveCount = 0;


//individual move area variables
var moveTime = 0;
var move = 1;
var mvData = [];
var mvStart = "";
var mvEnd = "";

var container = document.getElementById("container");

//records the game clock for game duration, will need to modify to show seconds, minutes, hours, etc...
function gmClock(){
	gameTime += 1;
	console.log(gameTime);
}

function resetPanels(_1stp,_2ndp){
    var allPanels = document.getElementsByClassName('gamePanel');
    for(var i = 0; i < allPanels.length; i++){
        if(allPanels[i].id === _1stp || allPanels[i].id === _2ndp){
            allPanels[i].state = "unflipped";
            console.log(allPanels[i]);
            console.log(allPanels[i].id + ", " + allPanels[i].state + ", " + allPanels[i].icon);
        }
    }
}

//generate numbers takes an integer representing the number of images needed for half the game board
//loops through and adds those numbers twice to the array, numSet
var numSet = [];
function generateNumbers(theCount) {

    var j = 0;
    while (j < 2) {
        for (var i = 1; i <= theCount; i++) {
         numSet.push(i);
        }
        j += 1;
    }
}

//can remove later, this is for testing
//var animals = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];



//builds the game panels, called from loadGrid function
function buildPanels(gridSize){
	theBoard = document.getElementById("gameBoard");
	var newGridSize = gridSize * gridSize;
	var panelSize = ((200 / gridSize) - 2) + "px";
    var imgsNeeded = newGridSize / 2;
    generateNumbers(imgsNeeded);
	
	for (var i = 0; i < newGridSize; i++){
		
		gamePanelElement = document.createElement("div");
		gamePanelElement.setAttribute("id", "p_" + i);
		gamePanelElement.setAttribute("state", "unflipped");
        //var theAnimal = Math.floor(Math.random()*4);
		//gamePanelElement.setAttribute("icon", animals[theAnimal]);
		gamePanelElement.classList.add("gamePanel");
		gamePanelElement.style.width = panelSize;
		gamePanelElement.style.height = panelSize;
		
		indPanel = document.createElement("div");
		indPanel.setAttribute("class","panel");
		
		cardFront = document.createElement("div");
		cardFront.setAttribute("class","card front face");
        cardFront.style.backgroundImage = "url('Mahjong_Pieces/Mahjong_Cover.png')";


		cardBack = document.createElement("div");
		cardBack.setAttribute("class", "card back face");
        var cardType = numSet.pop();
        cardBack.style.backgroundImage = "url('Mahjong_Pieces/T" + cardType + ".png')";
		
		indPanel.appendChild(cardFront);
		indPanel.appendChild(cardBack);
		gamePanelElement.appendChild(indPanel);
		
		gamePanelElement.addEventListener("click",function(e){
			//uncomment for testing in console
			//var theType = typeof this;
			//console.log(theType + ", " + this.getAttribute("id"));

            //rotates each individual div on the Y axis
            this.style.transform="rotateY(180deg)";
			
			var panelID = this.getAttribute('id');
			var panelState = this.setAttribute('state','flipped');
			panelState = this.getAttribute('state');
			var panelIcon = this.getAttribute('icon');
			var theTime = new Date();
			var moveTime = theTime.getTime();

            var theMove = {id:panelID, icon:panelIcon, mvTime:moveTime};
			gameState.addMove(theMove);

            if(moveState === 0){
                var lastObjNum = gameState.moves.length - 1;
                var lastObj = gameState.moves[lastObjNum];

                lastObj.mvState = "moveIncomplete";

                moveState = 1;
            } else{
                var lastObjNum = gameState.moves.length - 1;
                var prevObjNum = gameState.moves.length - 2;

                var lastObj = gameState.moves[lastObjNum];
                var prevObj = gameState.moves[prevObjNum];

                var lastObjIcon = lastObj.icon;
                var prevObjIcon = prevObj.icon;

                if(lastObjIcon === prevObjIcon){
                    lastObj.mvState = "moveMatch";
                }else{
                    lastObj.mvState = "moveNoMatch";
                    resetPanels(lastObj.id,prevObj.id);
                }
                moveState = 0;
            }
		});
		//indGamePanel.appendChild(gamePanelElement);
		theBoard.appendChild(gamePanelElement);
	}
}

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
		//ntime = setInterval(gmClock, 1000);
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