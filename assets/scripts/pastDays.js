var today = new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
});
today = today.split(",")[0];

const PAST_PUZZLES = document.querySelector("#past-puzzles");

var diffTime = new Date(today).getTime() - new Date("1/12/2024").getTime();
var Difference_In_Days = Math.round(diffTime / (1000 * 3600 * 24));
var puzzleNum = Difference_In_Days;
// sessionStorage.setItem("puzzleNum", puzzleNum);

for (let i = 1; i < puzzleNum; i++) {
  let outerNode = document.createElement("a");
  outerNode.innerHTML = `<a href="solo_game.html">
              <div class="past-btn boxed" id="puzzle-${i}">
              ${i}
              </div>
          </a>`;
  PAST_PUZZLES.appendChild(outerNode);
}
