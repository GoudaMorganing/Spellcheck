/* https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/ */
var level = document.querySelector("#level");

var lastActiveWord = null;
var attemptStr = "";
var activeWord = null;
var activePlayer = null;
var results = "";
var numSubmitted;
var numWrong = 0;
var correctSpellingLst = [];
var submissionLst = [];

var dictValue;

// POPULATE PAGE WITH LEVEL APPROPRIATE WORDS
function assignSound(levelPath, words) {
  path = `assets/audio/${levelPath}`;
  try {
    // setting neutral values
    wordLst = words;
    numSubmitted = 0;
    activeWord = null;
    activePlayer = null;
    wordOnePlayer.src = `${path}/${words[0]}.mp3`;
    wordTwoPlayer.src = `${path}/${words[1]}.mp3`;
    wordThreePlayer.src = `${path}/${words[2]}.mp3`;
    wordFourPlayer.src = `${path}/${words[3]}.mp3`;
    wordFivePlayer.src = `${path}/${words[4]}.mp3`;
  } catch (error) {
    console.log(error);
  }
}

// MOVE TO NEXT ROUND
function nextRound() {
  if (level.textContent == "Level One: Easy") {
    level.textContent = "Level Two: Medium";
  } else if (level.textContent == "Level Two: Medium") {
    level.textContent = "Level Three: Hard";
  } else if (level.textContent == "Level Three: Hard") {
    endGame();
  } else {
    window.location.replace("ahshit.html");
  }
  nextRoundBtn.innerHTML = `<div></div>`;
  checkLevel(level.textContent);
  return;
}

function endGame() {
  sessionStorage.setItem("numWrong", numWrong);
  sessionStorage.setItem("correctSpellingLst", correctSpellingLst);
  sessionStorage.setItem("submissionLst", submissionLst);
  sessionStorage.setItem("emojiResults", results);
  window.location.replace("results.html");
}

// UPDATE RESULTS
function updateResults() {
  playerLst.forEach((player) => {
    correctSpellingLst.push(player[2]);
    submissionLst.push(player[3]);
    if (player[0].classList.contains("fa-check")) {
      results += "🟩";
    } else if (player[0].classList.contains("fa-xmark")) {
      results += "🟥";
      numWrong += 1;
    }
    results += " ";
  });
  results += "\\n";
}

function checkGuess() {
  //correctSpellingLst.push(`<td>${activeWord}</td>`);
  activePlayer[2] = `<td>${activeWord}</td>`;

  if (attemptStr.toLowerCase() == activeWord.toLowerCase()) {
    stopSound(activePlayer[1]);
    activePlayer[0].style.backgroundColor = "#79b15a";
    activePlayer[0].classList.add("submitted", "fa-check");
    activePlayer[0].classList.remove(
      "clicked",
      "fa-circle-play",
      "fa-circle-stop",
      "btn"
    );

    // RECORD FOR RESULTS
    activePlayer[3] = `<td>${attemptStr}</td>`;
    //submissionLst.push(`<td>${attemptStr}</td>`)

    // DEACTIVATE WORD
    activeWord = null;
    activePlayer = null;
  } else {
    stopSound(activePlayer[1]);
    activePlayer[0].style.backgroundColor = "#d25842";
    activePlayer[0].classList.add("submitted", "fa-xmark");
    activePlayer[0].classList.remove(
      "clicked",
      "fa-circle-stop",
      "fa-circle-play",
      "btn"
    );

    // RECORD FOR RESULTS
    activePlayer[3] = `<td class="error">${attemptStr}</td>`;
    //submissionLst.push(`<td class="error">${attemptStr}</td>`)

    // DEACTIVATE WORD
    activeWord = null;
    activePlayer = null;
  }
  attemptStr = "";
  attempt.value = attemptStr;
  numSubmitted += 1;

  if (numSubmitted == 5) {
    updateResults();
    showNextRound();
    //nextRound();
  }
  return;
}

var nextRoundBtn = document.querySelector("#next-round-btn");
function showNextRound() {
  if (level.textContent == "Level Three: Hard") {
    nextRoundBtn.innerHTML = `
        <div class="boxed btn"> see results&ensp;<i class="fa fa-arrow-right" style="font-size:10pt;"></i></div>
        `;
    return;
  } else {
    nextRoundBtn.innerHTML = `
        <div class="boxed btn"> go to next round&ensp;<i class="fa fa-arrow-right" style="font-size:10pt;"></i></div>
        `;
    return;
  }
}

nextRoundBtn.addEventListener("click", (e) => {
  console.log("going to next round");
  if (level.textContent == "Level Three: Hard") {
    endGame();
    return;
  }
  nextRound();
});

// PROMPT MANAGEMENT

wordOne.addEventListener("click", (e) => {
  activeWord = wordLst[0];
  //activePlayer = [wordOne, wordOnePlayer];
  activePlayer = playerLst[0];
  updatePlayer(playerLst, activePlayer);
});
wordTwo.addEventListener("click", (e) => {
  activeWord = wordLst[1];
  //activePlayer = [wordTwo, wordTwoPlayer];
  activePlayer = playerLst[1];
  updatePlayer(playerLst, activePlayer);
});
wordThree.addEventListener("click", (e) => {
  activeWord = wordLst[2];
  activePlayer = playerLst[2];
  //activePlayer = [wordThree, wordThreePlayer];
  updatePlayer(playerLst, activePlayer);
});
wordFour.addEventListener("click", (e) => {
  activeWord = wordLst[3];
  activePlayer = playerLst[3];
  //activePlayer = [wordFour, wordFourPlayer];
  updatePlayer(playerLst, activePlayer);
});
wordFive.addEventListener("click", (e) => {
  activeWord = wordLst[4];
  activePlayer = playerLst[4];
  //activePlayer = [wordFive, wordFivePlayer];
  updatePlayer(playerLst, activePlayer);
});

checkLevel(level.textContent);
