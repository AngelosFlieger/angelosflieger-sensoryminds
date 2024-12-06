import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const confetti = window.confetti;

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
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><button className = "bingobutton" id = "1" onClick={toggleColor}>Code not compiling</button></td>
            <td><button className = "bingobutton" id = "2" onClick={toggleColor}>I’ll fix it in the next release</button></td>
            <td><button className = "bingobutton" id = "3" onClick={toggleColor}>I’m going to be here a while</button></td>
            <td><button className = "bingobutton" id = "4" onClick={toggleColor}>I’ll just comment that out for now</button></td>
            <td><button className = "bingobutton" id = "5" onClick={toggleColor}>It works, but...</button></td>
          </tr>
          <tr>
            <td><button className = "bingobutton" id = "6" onClick={toggleColor}>It works on my machine</button></td>
            <td><button className = "bingobutton" id = "7" onClick={toggleColor}>Spent hours on a bug that’s a typo</button></td>
            <td><button className = "bingobutton" id = "8" onClick={toggleColor}>Let’s Google that</button></td>
            <td><button className = "bingobutton" id = "9" onClick={toggleColor}>This will only take 5 minutes...</button></td>
            <td><button className = "bingobutton" id = "10" onClick={toggleColor}>Restarting the server</button></td>
          </tr>
          <tr>
            <td><button className = "bingobutton" id = "11" onClick={toggleColor}>This code worked last week!</button></td>
            <td><button className = "bingobutton" id = "12" onClick={toggleColor}>Server down</button></td>
            <td><button className = "center">Developer Challenges BINGO</button></td>
            <td><button className = "bingobutton" id = "14" onClick={toggleColor}>The fix broke something else</button></td>
            <td><button className = "bingobutton" id = "15" onClick={toggleColor}>Issue only happens on Tuesdays</button></td>
          </tr>
          <tr>
            <td><button className = "bingobutton" id = "16" onClick={toggleColor}>It stopped working!</button></td>
            <td><button className = "bingobutton" id = "17" onClick={toggleColor}>It was fine when I tested it</button></td>
            <td><button className = "bingobutton" id = "18" onClick={toggleColor}>Code freeze</button></td>
            <td><button className = "bingobutton" id = "19" onClick={toggleColor}>It’s the JavaScript’s fault</button></td>
            <td><button className = "bingobutton" id = "20" onClick={toggleColor}>Restart computer</button></td>
          </tr>
          <tr>
            <td><button className = "bingobutton" id = "21" onClick={toggleColor}>I didn’t touch that part of the code</button></td>
            <td><button className = "bingobutton" id = "22" onClick={toggleColor}>It's not a bug, it's a 'feature'</button></td>
            <td><button className = "bingobutton" id = "23" onClick={toggleColor}>I think I need more coffee</button></td>
            <td><button className = "bingobutton" id = "24" onClick={toggleColor}>The fix is simple... </button></td>
            <td><button className = "bingobutton" id = "25" onClick={toggleColor}>Forgot to push changes</button></td>
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