var emojiResults = sessionStorage.getItem("emojiResults");
const numWrong = sessionStorage.getItem("numWrong");
const correctSpellingLst = sessionStorage
  .getItem("correctSpellingLst")
  .split(",");
const submissionLst = sessionStorage.getItem("submissionLst").split(",");
const puzzleNum = sessionStorage.getItem("puzzleNum");
const results = document.querySelector("#results");
const copyBtn = document.querySelector("#copy-btn");
const typos = document.querySelector("#typos");

copyBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  shareableResults = `Spellcheck #${puzzleNum}\n${sessionStorage
    .getItem("emojiResults")
    .replaceAll("\\n", "\n")
    .replaceAll(" ", "")}`;
  await navigator.clipboard.writeText(shareableResults);
});

if (emojiResults != null) {
  localStorage.setItem("dailyStatus", true);
}

numRows = correctSpellingLst.length;
test = "";
for (var i = 0; i < numRows; i++) {
  if (i == 0) {
    test += `
        <tr>
            <td colspan=3 style="text-align: center"><b>EASY WORDS</b></td>
        </tr>
        `;
  }
  if (i == 5) {
    test += `
        <tr>
            <td colspan=3 style="text-align: center"><b>MEDIUM WORDS</b></td>
        </tr>
        `;
  }
  if (i == 10) {
    test += `
        <tr>
            <td colspan=3 style="text-align: center"><b>HARD WORDS</b></td>
        </tr>
        `;
  }
  test += `
    <tr>
        <td>${i + 1}</td>
        ${correctSpellingLst[i]}
        ${submissionLst[i]}
    </tr>
    `;
}
typos.innerHTML = test;
emojiResults = emojiResults.replaceAll("\\n", "<br>");
results.innerHTML = `${emojiResults}`;

let emojiMsg = `🟩 🟩 🟩 🟩 🟩 \n🟩 🟩 🟩 🟩 🟩 \n🟥 🟥 🟥 🟩 🟥 \n`;
let chunkSize = 5;

emojiMsg = emojiMsg.replaceAll(" ", "");
let emojiSplit = emojiMsg.split("\n");
emojiSplit.pop();

let easy = 0;
let med = 0;
let hard = 0;

let arr = [];
let counts = {};

for (let i = 0; i < emojiSplit.length; i++) {
  for (const num of emojiSplit[i]) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  arr.push(counts);
  counts = {};
}

easy = arr[0]["🟩"];
med = arr[1]["🟩"];
hard = arr[2]["🟩"];

if (localStorage.getItem("alltimeResults")) {
  let alltimeResults = JSON.parse(localStorage.getItem("alltimeResults"));

  let newValue = {
    puzzle: puzzleNum,
    emojiResults: sessionStorage.getItem("emojiResults"),
    easy: easy,
    med: med,
    hard: hard,
  };

  let historyCheck = alltimeResults.history.some(
    (el) => el.puzzle === puzzleNum
  );

  console.log(historyCheck);

  if (!historyCheck) {
    alltimeResults.history.push(newValue);
    alltimeResults.totalScoreEasy =
      parseInt(alltimeResults.totalScoreEasy) + easy;
    alltimeResults.totalScoreMed = parseInt(alltimeResults.totalScoreMed) + med;
    alltimeResults.totalScoreHard =
      parseInt(alltimeResults.totalScoreHard) + hard;
  }
  localStorage.setItem("alltimeResults", JSON.stringify(alltimeResults));
} else {
  let newValue = {
    totalScoreEasy: easy,
    totalScoreMed: med,
    totalScoreHard: hard,
    history: [
      {
        puzzle: puzzleNum,
        emojiResults: sessionStorage.getItem("emojiResults"),
        easy: easy,
        med: med,
        hard: hard,
      },
    ],
  };

  localStorage.setItem("alltimeResults", JSON.stringify(newValue));
}
