const KEYBOARD_EL = document.querySelector("#keyboard");
const attempt = document.querySelector("#attempt-box");

var wordOne = document.querySelector("#word-one");
var wordTwo = document.querySelector("#word-two");
var wordThree = document.querySelector("#word-three");
var wordFour = document.querySelector("#word-four");
var wordFive = document.querySelector("#word-five");

var wordOnePlayer = document.querySelector("#word-one-player");
var wordTwoPlayer = document.querySelector("#word-two-player");
var wordThreePlayer = document.querySelector("#word-three-player");
var wordFourPlayer = document.querySelector("#word-four-player");
var wordFivePlayer = document.querySelector("#word-five-player");

var wordOneSubmission = "";
var wordTwoSubmission = "";
var wordThreeSubmission = "";
var wordFourSubmission = "";
var wordFiveSubmission = "";

var wordOneSpelling = "";
var wordTwoSpelling = "";
var wordThreeSpelling = "";
var wordFourSpelling = "";
var wordFiveSpelling = "";

var playerLst = [
  [wordOne, wordOnePlayer, wordOneSpelling, wordOneSubmission],
  [wordTwo, wordTwoPlayer, wordTwoSpelling, wordTwoSubmission],
  [wordThree, wordThreePlayer, wordThreeSpelling, wordThreeSubmission],
  [wordFour, wordFourPlayer, wordFourSpelling, wordFourSubmission],
  [wordFive, wordFivePlayer, wordFiveSpelling, wordFiveSubmission],
];

KEYBOARD_EL.innerHTML = `<div id="keyboard-cont">
    <div class="first-row">
        <button class="keyboard-button boxed" id="q">Q</button>
        <button class="keyboard-button boxed" id="w">W</button>
        <button class="keyboard-button boxed" id="e">E</button>
        <button class="keyboard-button boxed" id="r">R</button>
        <button class="keyboard-button boxed" id="t">T</button>
        <button class="keyboard-button boxed" id="y">Y</button>
        <button class="keyboard-button boxed" id="u">U</button>
        <button class="keyboard-button boxed" id="i">I</button>
        <button class="keyboard-button boxed" id="o">O</button>
        <button class="keyboard-button boxed" id="p" >P</button>
    </div>
    <div class="second-row">
        <button class="keyboard-button boxed" id="a">A</button>
        <button class="keyboard-button boxed" id="s">S</button>
        <button class="keyboard-button boxed" id="d">D</button>
        <button class="keyboard-button boxed" id="f">F</button>
        <button class="keyboard-button boxed" id="g">G</button>
        <button class="keyboard-button boxed" id="h">H</button>
        <button class="keyboard-button boxed" id="j">J</button>
        <button class="keyboard-button boxed" id="k">K</button>
        <button class="keyboard-button boxed" id="l">L</button>
    </div>
    <div class="third-row">
        <button class="keyboard-button boxed" id="z">Z</button>
        <button class="keyboard-button boxed" id="x">X</button>
        <button class="keyboard-button boxed" id="c">C</button>
        <button class="keyboard-button boxed" id="v">V</button>
        <button class="keyboard-button boxed" id="b">B</button>
        <button class="keyboard-button boxed" id="n">N</button>
        <button class="keyboard-button boxed" id="m">M</button>
        <button class="keyboard-button boxed fa fa-delete-left" style="line-height:1.5" id="Backspace"></button>
    </div>
    <div class="fourth-row">
        <button class="keyboard-button boxed" id="Enter">submit</button>
    </div>
</div>`;

// CHECK LEVEL
function checkLevel(level) {
  resetPlayer(playerLst);
  attempt.value = attemptStr;
  if (level === "Level One: Easy") {
    assignSound("levelOneNEW", chooseWords(easyWords));
    dictValue = "levelOne";
  } else if (level === "Level Two: Medium") {
    assignSound("levelTwoNEW", chooseWords(mediumWords));
    dictValue = "levelTwo";
  } else if (level === "Level Three: Hard") {
    assignSound("levelThreeNEW", chooseWords(hardWords));
    dictValue = "levelThree";
  } else if (level === "easy") {
    wordLst = shuffle(easyWords);
    levelPath = "levelOneNEW";
    path = `assets/audio/${levelPath}`;
    updateWord();
  } else if (level === "medium") {
    wordLst = shuffle(mediumWords);
    levelPath = "levelTwoNEW";
    path = `assets/audio/${levelPath}`;
    updateWord();
  } else if (level === "hard") {
    wordLst = shuffle(hardWords);
    levelPath = "levelThreeNEW";
    path = `assets/audio/${levelPath}`;
    updateWord();
  } else {
    window.location.replace("ahshit.html");
  }
}

// STOP PLAYING SOUND
function stopSound(soundObj) {
  soundObj.pause();
  soundObj.currentTime = 0;
}

// UPDATE ATTEMPT STR UPON KEYPRESS
function insertLetter(pressedKey) {
  pressedKey = pressedKey.toUpperCase();
  attemptStr = attemptStr + pressedKey;
  attempt.focus();
  attempt.value = attemptStr;
  attempt.scrollLeft = attempt.scrollWidth;
}

// DELETE A LETER
function deleteLetter() {
  if (attemptStr.length > 0) {
    attemptStr = attemptStr.slice(0, -1);
  }
  attempt.value = attemptStr;
}

// CHECK IF GUESS IS CORRECT

function guessPreprocess() {
  if (lastActiveWord != null && activeWord == null) {
    activeWord = lastActiveWord;
    checkGuess();
    return;
  } else if (activeWord == null) {
    console.log("Attempted guess without word selected.");
    attemptStr = "";
    attempt.value = attemptStr;
    return;
  } else if (attemptStr == "") {
    console.log("Empty string submitted as guess. Ignoring that.");
    return;
  } else {
    checkGuess();
  }
}

// update players to reflect their current status
function updatePlayer(playerLst, activePlayer) {
  if (activePlayer[0].classList.contains("clicked")) {
    stopSound(activePlayer[1]);
    activePlayer[0].classList.remove("clicked", "fa-circle-stop");
    activePlayer[0].classList.add("fa-play-circle");

    lastActiveWord = activeWord;

    // DEACTIVATE WORD
    activeWord = null;
    activePlayer = null;
    return;
  }

  playerLst.forEach((player) => {
    if (
      !player[0].classList.contains("submitted") &&
      player[0] != activePlayer[0]
    ) {
      player[0].classList.remove("clicked", "fa-circle-stop");
      stopSound(player[1]);
    } else if (
      !player[0].classList.contains("submitted") &&
      player[0] == activePlayer[0]
    ) {
      activePlayer[0].classList.add("clicked", "fa-circle-stop");
      activePlayer[1].play();
    }
  });
  return;
}

function resetPlayer(playerLst) {
  playerLst.forEach((player) => {
    player[0].style.backgroundColor = null;
    player[0].classList.remove(
      "clicked",
      "fa-xmark",
      "fa-check",
      "fa-circle-stop",
      "submitted"
    );
    player[0].classList.add("fa-play-circle");
  });
}

// LINK ONSCREEN KEYBOARD FUNCTIONALITY TO KEYPRESSS
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }

  let key = target.textContent;

  if (target.classList.contains("fa-delete-left")) {
    deleteLetter();
    return;
    //key = "Backspace"
  }

  if (key === "submit") {
    guessPreprocess();
    return;
    //key = "Enter"
  }

  let pressedKey = target.innerText;
  insertLetter(pressedKey);
});

// KEYPRESS TYPING LISTENER
document.addEventListener("keydown", (e) => {
  let pressedKey = String(e.key);
  let found = pressedKey.match(/[a-z]/gi);

  if (pressedKey === "Enter") {
    document.querySelector(`#${pressedKey}`).classList.add("clicked");
    guessPreprocess();
    return;
  } else if (pressedKey === "Backspace" && attemptStr.length != 0) {
    document.querySelector(`#${pressedKey}`).classList.add("clicked");
    deleteLetter();
    return;
  } else if (found && found.length === 1) {
    insertLetter(pressedKey);
    document
      .querySelector(`#${pressedKey.toLowerCase()}`)
      .classList.add("clicked");
    return;
  }
});

document.addEventListener("keyup", (e) => {
  let pressedKey = String(e.key);
  let found = pressedKey.match(/[a-z]/gi);

  if (pressedKey === "Enter" || pressedKey === "Backspace") {
    document.querySelector(`#${pressedKey}`).classList.remove("clicked");
  }

  if (found && found.length === 1) {
    document
      .querySelector(`#${pressedKey.toLowerCase()}`)
      .classList.remove("clicked");
  }
});
