/**
 * Created by mike on 2/3/15.
 */
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


//builds the game panels, called from loadGrid function
function buildPanels(gridSize){
	theBoard = document.getElementById("gameBoard");
	var newGridSize = gridSize * gridSize;
	var panelSize = ((200 / gridSize) - 2) + "px";
    var imagesNeeded = newGridSize / 2;
    generateNumbers(imagesNeeded);

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
        var cardTypeNum = numSet.pop();
        var cardType = "T" + cardTypeNum + ".png";
        cardBack.style.backgroundImage = "url('Mahjong_Pieces/" + cardType + "')";
        gamePanelElement.setAttribute("icon", cardType);

		indPanel.appendChild(cardFront);
		indPanel.appendChild(cardBack);
		gamePanelElement.appendChild(indPanel);

		gamePanelElement.addEventListener("click",function(e){

            //rotates each individual div on the Y axis
            this.style.transform="rotateY(180deg)";

			var panelID = this.getAttribute('id');
			var panelState = this.setAttribute('state','flipped');
			panelState = this.getAttribute('state');
			var panelIcon = this.getAttribute('icon');
			var theTime = new Date();
			var moveTime = theTime.getTime();

            var theMove = {id:panelID, icon:panelIcon, mvTime:moveTime};
            console.log(theMove);
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

                console.log(lastObjIcon + ", " + prevObjIcon);

                if(lastObjIcon === prevObjIcon){
                    lastObj.mvState = "moveMatch";
                    moveCount += 1;
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = moveCount;
                    console.log("correct guess");
                }else{
                    lastObj.mvState = "moveNoMatch";
                    console.log("Calling reset panels function");
                    resetPanels(lastObj.id,prevObj.id);
                    moveCount += 1;
                    wrongMoveCount += 1;
                    var mvCt = document.getElementById("mvCount");
                    mvCt.innerHTML = moveCount;
                    var wgMvCt = document.getElementById("incorrectCount");
                    wgMvCt.innerHTML = wrongMoveCount;
                    console.log("incorrect guess");
                }
                moveState = 0;
            }
		});
		//indGamePanel.appendChild(gamePanelElement);
		theBoard.appendChild(gamePanelElement);
	}
}
