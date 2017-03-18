var gameOver = false;
var gameStarted = false;
var winCondition = false;

var wordIndex = -1;

var wordGuessAnswer = "DEFAULT_NULL";
var wordGuessDisplay = "DEFAULT_NULL";

var wordDirections = "DEFAULT_NULL";

// TODO: Add Real, Themed, [Word, Hint] combinations
var wordList = [
["Hello", "Directions for Hello"], 
["Running", "Directions for Running"], 
["Going To Win", "Directions for Going To Win"]];



// TODO: Remove Test Case, Uncomment startGame() real case
function testCaseStart(){ 
	wordIndex = 2;

	wordGuessAnswer = wordList[wordIndex][0].split("");

	wordGuessDisplay = Array.from(wordGuessAnswer);

	wordDirections = wordList[wordIndex][1];
}
// STOP REMOVE


var numWins = 0;
var numGuessesRemaining = 12;

var key = null;
var isCorrectGuess = false;

var guessedLetters = [];
var correctGuessedLetters = [];
var incorrectGuessedLetters = [];



var haveTagVariables = false;
var directionsTag, guessTag, guessesRemainingTag, wrongLettersTag, winsTag, winSpanTag;


for (var i = 0; i < wordGuessDisplay.length; i++) {
	if (wordGuessDisplay[i] != " ") {
		wordGuessDisplay[i] = "_";
	}	
}

debugLog("[BASE DEBUG]", "all");

function checkForKey(key) {
	if(gameStarted && !gameOver && !winCondition){
		console.log("checkGuessed: " + checkGuessed(key));
		console.log("key: " + key);
		if(!checkGuessed(key)){
			for (var i = 0; i < wordGuessAnswer.length; i++) {
				if (key === wordGuessAnswer[i].toUpperCase()) {
					wordGuessDisplay[i] = wordGuessAnswer[i];
					console.log("Correct! One letter is - " + key.toUpperCase());
					isCorrectGuess = true;	
				} 
			}
			
			guessedLetters.push(key);

			if(isCorrectGuess){
				correctGuessedLetters.push(key);	
				isCorrectGuess = false;
			} else {
				wrongGuess(key);
			}
		}
	} else {
		startGame()
		gameOver = false;
	} 
	checkOver();
	
	updateDisplay();
	console.log("gameStarted: " + gameStarted);
	console.log("winCondition: " + winCondition);
	console.log("gameOver: " + gameOver);
}

function checkOver() {
	debugLog("CHECK OVER: ", "word");
	if(numGuessesRemaining === 0){
		gameOver = true;
	}
	for(var i = 0; i < wordGuessAnswer.length; i++){
		if(wordGuessAnswer[i] !== wordGuessDisplay[i]){
			console.log("WINDCODITION FALSE")
			return false;
		}
	}
	console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
	numWins++;
	winCondition = true;

	debugLog("CHECK OVER -------END--------", "none");
}

// Handles if it the user's letter (key) guessed is wrong
function wrongGuess(key) {

	numGuessesRemaining--;
	incorrectGuessedLetters.push(key);
	
	// Determines gameOver

}

function checkGuessed(key) {
	console.log("Key Check Guessed");
	if (guessedLetters.includes(key)){
		return true;
	}
	return false;
}


document.onkeyup = function(event){
	console.log(event.keyCode)
	if(event.keyCode > 64 && event.keyCode < 91) {
		key = String.fromCharCode(event.keyCode).toUpperCase();
		console.log(key);
		checkForKey(key);
	}
	if(winCondition === true){
		
	}
}

function startGame() {

	// Defining variables for HTML Tags used for displaying game properties.
	if(!haveTagVariables){
		directionsTag = document.getElementById("game-directions");
		guessTag = document.getElementById("word-guess-display");
		guessesRemainingTag = document.getElementById("num-guesses-remaining");
		wrongLettersTag = document.getElementById("wrong-letters");
		winsTag = document.getElementById("wins-display");
		winSpanTag = document.getElementById("win-span");
		haveTagVariables = true;
	}

// TODO: Remove testCaseStart() and Uncomment below.
	testCaseStart();

// TODO: Uncomment when ready
	// wordIndex = Math.floor(Math.random() * wordList.length);
	// wordGuessAnswer = wordList[wordIndex][0].split("");
	// wordGuessDisplay = Array.from(wordGuessAnswer);
	// wordDirections = wordList[wordIndex][1];

	for (var i = 0; i < wordGuessDisplay.length; i++) {
		if (wordGuessDisplay[i] != " ") {
			wordGuessDisplay[i] = "_";
		}
	}
	gameStarted = true;

}


function updateDisplay(){
	if(winCondition === true){
		winSpanTag.style.visibility = "visible";
	}
	if(haveTagVariables){
		directionsTag.innerHTML = wordDirections;
		guessTag.innerHTML = wordGuessDisplay.join("");
		guessesRemainingTag.innerHTML = numGuessesRemaining;
		wrongLettersTag.innerHTML = incorrectGuessedLetters.join(", ");
		winsTag.innerHTML = "Wins: " + numWins;
	} else {
		debugLog("[ERROR] Display Failed: {{updateDisplay() Called Early [From: " + updateDisplay.caller.name + "]}}  \n////// 'haveTagVariables(boolean)' - " + haveTagVariables, "all");
	}
}

function debugLog(custom, logType) {

	var debugName = "window";

	if(debugLog.caller !== null){
		var debugName = debugLog.caller.name || "onkeyup";
	}
	logType = logType || "main";

	logTypePrint = logType.charAt(0).toUpperCase() + logType.slice(1);

	console.log("\n");
	console.log("FROM: " + debugName + "() -------");
	if(custom != null){
		console.log(custom);

	}

	if(logType !== "none"){
		
		console.log("----------------------");

		if(logType === "word"){

			console.log("Variable Status [" + logTypePrint + "]: -----");
			console.log("wordGuessAnswer: " + wordGuessAnswer);
			console.log("wordGuessDisplay: " + wordGuessDisplay);
			console.log("wordDirections: " + wordDirections);

		} else if(logType === "main" || logType === "state" || logType === "all"){

			console.log("Variable Status [" + logTypePrint + "]: -----");
			console.log("wordGuessAnswer: " + wordGuessAnswer);
			console.log("wordGuessDisplay: " + wordGuessDisplay);
			console.log("wordDirections: " + wordDirections);
			console.log("--");
			console.log("guessedLetters: " + guessedLetters);
			console.log("correctGuessedLetters: " + correctGuessedLetters);
			console.log("incorrectGuessedLetters: " + incorrectGuessedLetters);
			console.log("--");
			console.log("numWins: " + numWins);
			console.log("numGuessesRemaining: " + numGuessesRemaining);

			if(logType === "state" || logType === "all"){

				console.log("--");
				console.log("gameStarted: " + gameStarted);
				console.log("winCondition: " + winCondition);
				console.log("gameOver: " + gameOver);
				
				if(logType === "all"){
					
					console.log("--");
					console.log("wordList: " + wordList);
					console.log("wordIndex: " + wordIndex);
					console.log("--");
					console.log("key: " + key);
					console.log("isCorrectGuess: " + isCorrectGuess);
					console.log("--");
					console.log("haveTagVariables: " + haveTagVariables);
					console.log("directionsTag: " + directionsTag);
					console.log("guessTag: " + guessTag);
					console.log("guessesRemainingTag: " + guessesRemainingTag);
					console.log("wrongLettersTag: " + wrongLettersTag);
					console.log("winsTag: " + winsTag)

				}
			}
		} else {
			console.log("[ERROR] DebugLog Failed: {{Unrecognized logType parameter [From: " + debugName + "]}}");
			console.log("////// 'logType(String)' - " + logType);
		}

	}
	console.log("\n----------------------");
}