/* https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/ */
var level = sessionStorage.getItem("level");
var publicCount = document.querySelector("#total-count");
var publicCorrectCount = document.querySelector("#correct-count");
var endGameBtn = document.querySelector("#end-game-btn");

var lastActiveWord = null;

var wordCounter = 0;
var numCorrect = 0;
var attemptStr = "";
var activeWord = null;
var activePlayer = null;
var levelPath;

var results = "";
var submissionLst = [];
var correctSpellingLst = [];
var wrongSubmission = "";
var playerLst = [[wordOne, wordOnePlayer]];

var wordLst;

function updateWord() {
  resetPlayer(playerLst);
  activeWord = wordLst[wordCounter];
  wordOnePlayer.src = `${path}/${wordLst[wordCounter]}.mp3`;
  publicCount.innerHTML = `${wordCounter}<br>total words`;
  publicCorrectCount.innerHTML = `${
    5 - (wordCounter - numCorrect)
  }<br>lives remaining`;
}

function endGame() {
  sessionStorage.setItem("submissionLst", submissionLst);
  sessionStorage.setItem("correctSpellingLst", correctSpellingLst);
  sessionStorage.setItem("level", level);
  sessionStorage.setItem("numCorrect", numCorrect);

  window.location.replace("practice_results.html");
}

// CHECK IF GUESS IS CORRECT
function checkGuess() {
  correctSpellingLst.push(`<td>${activeWord}</td>`);
  if (attemptStr.toLowerCase() == activeWord.toLowerCase()) {
    submissionLst.push(`<td>${attemptStr}</td>`);
    wordCounter += 1;
    numCorrect += 1;

    stopSound(activePlayer[1]);

    updatePlayer(playerLst, activePlayer);

    // DEACTIVATE WORD
    activePlayer = null;

    // RECURSIVE CALL FOR NEW WORD
    updateWord();
  } else {
    submissionLst.push(`<td class="error">${attemptStr}</td>`);

    wordCounter += 1;

    stopSound(activePlayer[1]);

    updatePlayer(playerLst, activePlayer);

    // DEACTIVATE WORD
    activePlayer = null;

    // RECURSIVE CALL FOR NEW WORD
    updateWord();
  }

  if (wordCounter - numCorrect == 5) {
    endGame();
    return;
  }

  attemptStr = "";
  attempt.value = attemptStr;
  return;
}

// PROMPT MANAGEMENT

wordOne.addEventListener("click", (e) => {
  activePlayer = [wordOne, wordOnePlayer];
  updatePlayer(playerLst, activePlayer);
});

checkLevel(level);
