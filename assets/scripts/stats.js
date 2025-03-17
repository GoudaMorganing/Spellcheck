let dataRows = 0;
let alltimeResults;

let statsHTML = document.querySelector("#stats-box");
let statsContent = document.createElement("table");
statsContent.setAttribute("id", "stats-table");

if (localStorage.getItem("alltimeResults")) {
  alltimeResults = JSON.parse(localStorage.getItem("alltimeResults"));
  dataRows = alltimeResults.history.length;

  const fragment = document
    .createDocumentFragment()
    .appendChild(document.createElement("tbody"));

  alltimeResults.history = alltimeResults.history.sort(
    (a, b) => parseInt(b.puzzle) - parseInt(a.puzzle)
  );

  for (let i = 0; i < dataRows; i++) {
    let row = fragment.appendChild(document.createElement("tr"));

    let easy = parseInt(alltimeResults.history[i].easy);
    let med = parseInt(alltimeResults.history[i].med);
    let hard = parseInt(alltimeResults.history[i].hard);
    let total = easy + med + hard;

    let emojiText = alltimeResults.history[i].emojiResults;

    emojiText = emojiText.replaceAll(
      "🟩",
      `<i class="fa-solid fa-check" style="color: #39C6A3;"></i>`
    );
    emojiText = emojiText.replaceAll(
      "🟥",
      `<i class="fa-solid fa-xmark" style="color: #A81F1F;"></i>`
    );
    let arr = emojiText.split(" \\n");
    arr.pop();
    console.log(alltimeResults.history[i].emojiResults);
    console.log(arr);

    let colNum = row.appendChild(document.createElement("td"));
    let colEasy = row.appendChild(document.createElement("td"));
    let colMed = row.appendChild(document.createElement("td"));
    let colHard = row.appendChild(document.createElement("td"));
    // let colTotal = row.appendChild(document.createElement("td"));
    colNum.textContent = alltimeResults.history[i].puzzle;
    // colEasy.textContent = easy;
    colEasy.innerHTML = `${arr[0]}`;
    colMed.innerHTML = `${arr[1]}`;
    colHard.innerHTML = `${arr[2]}`;
    // colTotal.textContent = total;
  }

  statsContent.innerHTML = `
        <thead>
            <tr>
                <th class="header" style="min-width: 10%; max-width: 10%;"><i class="fa-solid fa-hashtag"></i></th>
                <th class="header"><i class="fa-solid fa-signal-bars-weak"></i></th>
                <th class="header"><i class="fa-solid fa-signal-bars-fair"></i></th>
                <th class="header"><i class="fa-solid fa-signal-bars-good"></i></th>
            </tr></thead>
    `;

  statsContent.appendChild(fragment);
  statsHTML.appendChild(statsContent);
} else {
  let text = document.createElement("div");
  text.innerHTML = `<div>No stats available</div>`;

  statsHTML.appendChild(text);
}
