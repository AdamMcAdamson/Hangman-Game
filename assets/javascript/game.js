var gameOver = false;
var gameStarted = false;

var wordList = ["Hello", "Running", "Going To Win"];

var wordGuessAnswer = wordList[2].split("");

var wordGuessDisplay = Array.from(wordGuessAnswer);

var numGuessesRemaining = 12;

var isCorrectGuess = false;

var guessedLetters = [];
var correctGuessedLetters = [];
var incorrectGuessedLetters = [];

var key = null;

var debugName = -1;

for (var i = 0; i < wordGuessDisplay.length; i++) {
	if (wordGuessDisplay[i] != " ") {
		wordGuessDisplay[i] = "_";
	}	
}

console.log(wordGuessAnswer);

console.log(wordGuessDisplay);

function checkForKey(key) {
	if(gameStarted){
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
	}
	debugLog();
}


// Handles if it the user's letter (key) guessed is wrong
function wrongGuess(key) {

	numGuessesRemaining--;
	incorrectGuessedLetters.push(key);
	
	// Determines gameOver
	if(numGuessesRemaining === 0){
		gameOver = true;
	}
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
}

function startGame() {
	for (var i = 0; i < wordGuessDisplay.length; i++) {
		if (wordGuessDisplay[i] != " ") {
			wordGuessDisplay[i] = "_";
		}
	}	
	gameStarted = true;
}


function debugLog() {

	debugName = debugLog.caller.name || onkeyup;
	
	console.log("\n");
	console.log("FROM: " + debugName + "() -------");
	console.log("wordGuessAnswer: " + wordGuessAnswer);
	console.log("wordGuessDisplay: " + wordGuessDisplay);
	// console.log("--");
	// console.log("guessedLetters: " + guessedLetters);
	// console.log("correctGuessedLetters: " + correctGuessedLetters);
	// console.log("incorrectGuessedLetters: " + incorrectGuessedLetters);
	// console.log("--");
	console.log("numGuessesRemaining: " + numGuessesRemaining);
	console.log("\n----------------------");
	
}

