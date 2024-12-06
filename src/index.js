import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const confetti = window.confetti;

const initialTexts = [
  "Code not compiling",
  "I’ll fix it in the next release",
  "I’m going to be here a while",
  "I’ll just comment that out for now",
  "It works, but...",
  "It works on my machine",
  "Spent hours on a bug that’s a typo",
  "Let’s Google that",
  "This will only take 5 minutes...",
  "Restarting the server",
  "This code worked last week!",
  "Server down",
  "The fix broke something else",
  "Issue only happens on Tuesdays",
  "It stopped working!",
  "It was fine when I tested it",
  "Code freeze",
  "It’s the JavaScript’s fault",
  "Restart computer",
  "I didn’t touch that part of the code",
  "It's not a bug, it's a 'feature'",
  "I think I need more coffee",
  "The fix is simple...",
  "Forgot to push changes",
];

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

function shuffleAndAssign() {
  let shuffledTexts = [...initialTexts];
  shuffle(shuffledTexts);

  let textIndex = 0;
  for (let i = 1; i <= 25; i++) {
    if (i === 13) continue;

    const button = document.getElementById(i);
    if (button && textIndex < shuffledTexts.length) {
      button.textContent = shuffledTexts[textIndex];
      textIndex++;
    }
  }
}

const buttonGrid = Array.from({ length: 5 }, () => Array(5).fill(false));
buttonGrid[2][2] = true;
const printedMessages = new Set(); 

function toggleColor(event) {
  const clickedButton = event.target;

  const buttonIndex = parseInt(clickedButton.id)-1;
  const row = Math.floor(buttonIndex / 5); 
  const col = buttonIndex % 5;

  buttonGrid[row][col] = !buttonGrid[row][col];

  if (clickedButton && clickedButton.classList) {
    clickedButton.classList.toggle("active");
  }

  checkRow();
  checkColumn();
  checkDiagonal();
}

function checkRow() {
  for (let row = 0; row < 5; row++) {
    let check = 0;
    for (let col = 0; col < 5; col++) {
      if (buttonGrid[row][col]) check++;
    }
    if (check === 5) {
      bingoCompleted(`Row ${row + 1} is completed!`);
    }
  }
}

function checkColumn() {
  for (let col = 0; col < 5; col++) {
    let check = 0;
    for (let row = 0; row < 5; row++) {
      if (buttonGrid[row][col]) check++;
    }
    if (check === 5) {
      bingoCompleted(`Column ${col + 1} is completed!`);
    }
  }
}

function checkDiagonal() {
  let leftDiagonalCheck = 0;
  let rightDiagonalCheck = 0;

  for (let i = 0; i < 5; i++) {
    if (buttonGrid[i][i]) leftDiagonalCheck++;

    if (buttonGrid[i][4 - i]) rightDiagonalCheck++;
  }

  if (leftDiagonalCheck === 5) {
    bingoCompleted("Left diagonal is completed!");
  }
  if (rightDiagonalCheck === 5) {
    bingoCompleted("Right diagonal is completed!");
  }
}

function bingoCompleted(message) {
  if (printedMessages.has(message)) return;
  printedMessages.add(message);
  const bingoMessageDiv = document.getElementById("bingoMessage");
  if (bingoMessageDiv) {
    bingoMessageDiv.innerHTML = ""; 
    const newMessage = document.createElement("p");
    newMessage.textContent = message;
    bingoMessageDiv.appendChild(newMessage); 
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function App() {
  useEffect(() => {
    shuffleAndAssign();
  }, []);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><button className="bingobutton" id="1" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="2" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="3" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="4" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="5" onClick={toggleColor}></button></td>
          </tr>
          <tr>
            <td><button className="bingobutton" id="6" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="7" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="8" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="9" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="10" onClick={toggleColor}></button></td>
          </tr>
          <tr>
            <td><button className="bingobutton" id="11" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="12" onClick={toggleColor}></button></td>
            <td><button className="center">Developer Challenges BINGO</button></td>
            <td><button className="bingobutton" id="14" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="15" onClick={toggleColor}></button></td>
          </tr>
          <tr>
            <td><button className="bingobutton" id="16" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="17" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="18" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="19" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="20" onClick={toggleColor}></button></td>
          </tr>
          <tr>
            <td><button className="bingobutton" id="21" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="22" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="23" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="24" onClick={toggleColor}></button></td>
            <td><button className="bingobutton" id="25" onClick={toggleColor}></button></td>
          </tr>
        </tbody>
      </table>
      <div id="bingoMessage" className="bingoMessage"></div>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found. Check your public/index.html.");
}