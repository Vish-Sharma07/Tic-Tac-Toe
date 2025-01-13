let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

// Score Variables
let playerOWins = 0;
let playerXWins = 0;
let drawCount = 0;
let drawLimit = 3;

// Modal Elements
const playerOWinsDisplay = document.querySelector("#playerO-wins");
const playerXWinsDisplay = document.querySelector("#playerX-wins");
const drawsDisplay = document.querySelector("#draws");
const modal = document.querySelector("#modal");
const modalMessage = document.querySelector("#modal-message");
const modalCloseBtn = document.querySelector("#modal-close-btn");

modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hide"); // hide modal on close
    startNewGame(); //restart the new game
});

let turn0 = true; // Player X, Player 0
let count = 0; // To count draw
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Update Turn Indicator
const updateTurnIndicator = () => {
    if (turn0) {
        turnIndicator.innerText = "Player 〇's Turn";
    } else {
        turnIndicator.innerText = "Player △'s Turn";
    }
};

// Event Listener for Boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "〇";
                turn0 = false;
            } else {
                box.innerText = "△";
                turn0 = true;
            }
            box.disabled = true;
            count++;

            updateTurnIndicator();

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        // Check if all positions are non-empty and identical
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            highlightWinningPattern(pattern); // Highlight winning pattern
            showWinner(pos1val); // Show winner if match found
            return true; // Exit once winner is found
        }
    }
    return false; // No winner found
};

// Highlight Winning Pattern
const highlightWinningPattern = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].classList.add("highlight"); // Add 'highlight' class to the winning boxes
    });
};

// Reset Game
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator(); // Reset the turn indicator
    removeHighlight(); // Remove highlight from all boxes
};

// New Game (Resets Scores)
const startNewGame = () => {
    playerOWins = 0;
    playerXWins = 0;
    drawCount = 0;

    playerOWinsDisplay.innerText = playerOWins;
    playerXWinsDisplay.innerText = playerXWins;
    drawsDisplay.innerText = drawCount;

    resetGame();
};

// Draw Game
const gameDraw = () => {
    drawCount++;
    drawsDisplay.innerText = drawCount;

    if(drawCount >= drawLimit){
        determineFinalResult();
    } else{
        msg.innerText = "Game was Draw.";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    // turnIndicator.innerText = "Game Over"; // Stop turn indicator
};

//Determine winner after draw result
const determineFinalResult = () => {
    if (playerOWins > playerXWins) {
        modalMessage.innerText = "Player 〇 wins the series!";
    } else if (playerXWins > playerOWins) {
        modalMessage.innerText = "Player △ wins the series!";
    } else {
        modalMessage.innerText = "It's a tie!";
    }
    modal.classList.remove("hide"); // Show the modal
};

// Winner Logic
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    if (winner === "〇") {
        playerOWins++;
        playerOWinsDisplay.innerText = playerOWins;
    } else if (winner === "△") {
        playerXWins++;
        playerXWinsDisplay.innerText = playerXWins;
    }
    turnIndicator.innerText = "Game Over";
};

// Helper Functions
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const removeHighlight = () => {
    boxes.forEach((box) => {
        box.classList.remove("highlight"); // Remove 'highlight' class from all boxes
    });
};

// Initialize
updateTurnIndicator();
newBtn.addEventListener("click", startNewGame);
resetBtn.addEventListener("click", resetGame);
