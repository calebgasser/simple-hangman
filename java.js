// How to get input using plain 'ol javascript
// onkeyup is a function that document contains, we are setting that function
// to be our own funciton.
document.onkeyup = function(event){
	//console.log("Plain javascript onkeyup function");
}

var guessed = [];
var dictionary = ['one','tree','cow'];
var currentWord = '';
var wordGuessed = '';
var wins = 0;
var losses = 0;
var guessesRemaining = 0;
var gameOver = false;

//This is jQuery's on ready, which we pass our own virtual function. 
$(function(){
	gameStart();
	console.log(currentWord);
	//Inside here goes our own code.
	$(document).on("keyup",function(event){
		if(validate(event.key)){
			if(currentWord.includes(event.key)){
				replaceUnderscore(event.key);
				$("#currentWord").html("Word: " + wordGuessed);
				if(currentWord ===  wordGuessed){
					wins += 1;
					$("#wins").html("Wins: " + wins);
					gameOver = true;
				}
			} else if(!guessed.includes(event.key)){
				guessed.push(event.key);
			 	$("#wrongLetters").html("Guessed Letter: " + guessed);
			 	if(guessesRemaining > 0){
				 	guessesRemaining -= 1;
				 	$("#guessRemaining").html("Remaining Guesses: " + guessesRemaining);
				 	if(guessesRemaining === 0){
				 		losses += 1;
				 		$("#losses").html("Losses: " + losses);
				 		gameOver = true;
				 	}
				 }
			 }
		}
	});
});

function validate(strValue){
	var objRegExp  = /^[a-z]+$/;
	return objRegExp.test(strValue);
}

function randomWord(dict){
	var pickedWord = dict[Math.floor(Math.random()*dict.length)];
	return pickedWord;
}

function gameStart(){
	currentWord = randomWord(dictionary);
	guessesRemaining = currentWord.length;
	$("#guessRemaining").html("Remaining Guesses: " + guessesRemaining);
	fillWordWithDashes(currentWord.length);
	$("#currentWord").html("Word: " + wordGuessed);
}

function fillWordWithDashes(arrayLength){
	for(var i = 0; i < arrayLength; i++){
		wordGuessed = wordGuessed.concat("-");
	}
}

function replaceUnderscore(letterToReplace){
	for(var i = 0; i < currentWord.length; i++){
		if(currentWord.charAt(i) === letterToReplace){
			wordGuessed = replaceAt(wordGuessed, i, letterToReplace);
		}
	}
}

function replaceAt(string, index, replace) {
	return string.substring(0, index) + replace + string.substring(index + 1);
}