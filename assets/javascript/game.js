var gameOver = false;

var wordList = ["Hello", "Running", "Going To Win"];

var wordGuessAnswer = wordList[2].split("");

var wordGuessDisplay = Array.from(wordGuessAnswer);

var numGuessesRemaining = 10;

var isCorrectGuess = false;

var guessedLetters = [];
var correctGuessedLetters = [];
var incorrectGuessedLetters = [];

var key = null;

for (var i = 0; i < wordGuessDisplay.length; i++) {
	if (wordGuessDisplay[i] != " ") {
		wordGuessDisplay[i] = "_";
	}	
}

console.log(wordGuessAnswer);

console.log(wordGuessDisplay);

function checkForKey(key) {
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
}

function wrongGuess(key) {
	//TODO: Write code for wrongGuess function
	numGuessesRemaining--;
	incorrectGuessedLetters.push(key);
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
	debugLog();
}



function debugLog() {

	if(location != null){
		console.log("\n\n\n\n");
		console.log("FROM: " + debugLog.caller.name + "() -------");
		console.log("wordGuessAnswer: " + wordGuessAnswer);
		console.log("wordGuessDisplay: " + wordGuessDisplay);
		console.log("--");
		console.log("guessedLetters: " + guessedLetters);
		console.log("correctGuessedLetters: " + correctGuessedLetters);
		console.log("incorrectGuessedLetters: " + incorrectGuessedLetters);
		console.log("--");
		console.log("numGuessesRemaining: " + numGuessesRemaining);
		console.log("----------------------");
	}
}

