//couldn't get db working

var divIds = [];
var score = 0;
var lblScore;
var numTiles = 3;
var wrongTileId = [];
var numOfClicks = 0;
var isCorrect = 1;
var numberOfTiles = 0;
var difficultyLevel = 1;
var row = 5;
var column = 5;

function startGame() {	//start the Game by bulding a temp table before starting the round
    document.getElementById('lblTiles').innerHTML = numTiles;
    localStorage.setItem("finalScoreCalc", score);
	buildTable(row,column);
    setTimeout(nextRound, 2000);
}

function buildTable(row, column){
	numberOfTiles = row * column;
	var counter = 1;
	var table = document.getElementById("memoryTable");
	var output = '';
	if(row <5){//check
		row = 5;
	}
	if(column < 5){//check
		column = 5;
	}
	for(var i = 0; i < row; i++){//nested for loop to build the table for the game
		output += '<tr>'
		for(var j = 0 ; j < column; j++){
			output += '<td><div class="square" id="'+ counter + '" onclick="getClicked_id(' + counter + ')"></div></td>';
		counter++;
		}
		output += '</tr>';
	}
document.getElementById("memoryTable").innerHTML = output;
}

function nextRound(){//does all thing that need to be done before match starts
    document.getElementById('lblTiles').innerHTML = numTiles;
    document.getElementById("memoryTable").style.visibility = "visible";
    lblScore = document.getElementById('lblScore');
    document.getElementById("bodyContent").style.pointerEvents = 'none';
    divIds = [];
	buildTable(row,column);
    revealTiles();
    setTimeout(rotate, 2000);
    setTimeout(hideTiles, 2000);
}

function revealTiles() {//shows all tiles that need to be matched
    var randomNums = [];
    for (var i = 0; i < numTiles; i++) {//nested for loop to choose which tiles will need to be matched
        var random = Math.floor((Math.random() * numberOfTiles) + 1);
            for(var j = 0; j < randomNums.length; j++) {
                if(randomNums[j] === random) {
                    var random = Math.floor((Math.random() * numberOfTiles) + 1);
                }
            }
        randomNums.push(random);
        document.getElementById(random).style.backgroundColor = "SkyBlue";
        divIds.push(random);
    }
}

function hideTiles() {
    for (var i = 0; i < divIds.length; i++){//resets the color of the table cells if correct
        document.getElementById(divIds[i]).style.backgroundColor = "Sienna";
    }
	for (var i = 0; i < wrongTileId.length; i++){//resets the color of the table cells if incorrect
        document.getElementById(wrongTileId[i]).style.backgroundColor = "Sienna";
    }
	document.getElementById("bodyContent").style.pointerEvents = 'auto';
}

function rotate(){//rotates the memory game by 90 
    document.getElementById("memoryTable").style.transform = "rotate(90deg)";
    document.getElementById("memoryTable").style.transitionDuration = "2s";
}

function rotateToOriginal() {
    document.getElementById("memoryTable").style.transform = "rotate(0deg)";
    document.getElementById("memoryTable").style.transitionDuration = "0s";

}

function getClicked_id(clicked_id) {
	new Audio ("./sounds/click.mp3").play();
    if (clickedTile(Number(clicked_id)) === true) { //updating the score after 	
        document.getElementById(clicked_id).style.backgroundColor = "SkyBlue"; 
        score++;
        numOfClicks++;		
        lblScore.innerHTML = score; 
        if (numOfClicks === numTiles) {//all tiles are correct, round over start next round
            localStorage.setItem("finalScoreCalc", score);
            document.getElementById("bodyContent").style.pointerEvents = 'none';
			checkDifficultyLevel();
            numOfClicks = 0;
			isCorrect = 1;
            document.getElementById("memoryTable").style.visibility = "hidden";
            setTimeout(hideTiles, 2000);
            setTimeout(rotateToOriginal, 2000);
            setTimeout(nextRound, 2000);
        }
    }else if (score <= 0) {//lost the round/game, end the game
        window.location.replace("summary.html");
    }else {//got incorrect tile mark red and continue   
		wrongTileId[wrongTileId.length] = clicked_id;
        document.getElementById(clicked_id).style.backgroundColor = "OrangeRed";
        score--;
		isCorrect = 0;    	
        lblScore.innerHTML = score;
        localStorage.setItem("finalScoreCalc", score);    
    }
}

function checkDifficultyLevel(){//function that checks and insures difficulty is correct
	if (numTiles < 12 && isCorrect == 1) {
		new Audio ("./sounds/cheer.mp3").play();
		if(difficultyLevel == 1){
			numTiles++;
			difficultyLevel++;
		}else if(difficultyLevel == 2){
			row++;
			difficultyLevel++;
		}else{
			column++;
			difficultyLevel = 1;
		}  
	}else if(numTiles > 3 && isCorrect == 0){
		new Audio ("./sounds/laugh.mp3").play();
		if(difficultyLevel == 1){
			numTiles--;
			difficultyLevel = 3;
		}else if(difficultyLevel == 2){
			row--;
			difficultyLevel--;
		}else{
			column--;
			difficultyLevel--;
		}	
	}else{
		numTiles = 3;
		row = 5;
		column = 5;
	}
}

function clickedTile(clicked_id) {//ches to see if the clicked id is within the divIds
    for (var i = 0; i < divIds.length; i++) {
        if (divIds[i] === clicked_id) {
            return true;
        }
    }
    return false;
}

function quit(){//quit the came
    var quitVerify = window.prompt("Quit? (Lowercase yes or no)");
    if (quitVerify === "yes") {
        window.location.replace("summary.html");
    }
}

function restartGame(){//reopens index into a defaut state
    window.location.replace("index.html");
}
function getScore(){//retrieves the score
    var finalScore = localStorage.getItem("finalScoreCalc");
    lblFinalScore.innerHTML = finalScore;
}
function submitForm(){//lets you submit your score
    var username = document.getElementById('username').value;
    localStorage.setItem("username", username);
    window.location.replace("leaderboard.html");
}
function getUserInfo() {
    var finalScore = localStorage.getItem("finalScoreCalc");
    var username = localStorage.getItem("username");
    console.log(username, finalScore);
}
