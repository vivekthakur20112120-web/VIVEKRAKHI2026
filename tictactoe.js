// ===============================
// TIC TAC TOE PRO
// PART 1
// ===============================

// Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restart");
const friendBtn = document.getElementById("friendBtn");
const botBtn = document.getElementById("botBtn");

// Score Elements
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const drawScore = document.getElementById("drawScore");

// game Variables
let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameRunning = true;

let botMode = false;

// Score
let scoreX = 0;
let scoreO = 0;
let draws = 0;

// Winning Patterns
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// ===============================
// MODE BUTTONS
// ===============================

friendBtn.addEventListener("click", () => {

    botMode = false;

    restartgame();

    statusText.innerHTML = "👥 Friend Mode";
});

botBtn.addEventListener("click", () => {

    botMode = true;

    restartgame();

    statusText.innerHTML = "🤖 Bot Mode";
});

// ===============================
// CELL CLICK EVENTS
// ===============================

cells.forEach(cell => {

    cell.addEventListener("click", cellClicked);

});

// Restart
restartBtn.addEventListener("click", restartgame);

// ===============================
// PLAYER CLICK
// ===============================

function cellClicked() {

    const index = this.dataset.index;

    // Ignore invalid clicks
    if (!gameRunning) return;

    if (board[index] !== "") return;

    // If bot mode, only player X can click
    if (botMode && currentPlayer === "O") return;

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    checkgame();

}
// ===============================
// PART 2
// game LOGIC
// ===============================

function checkgame() {

    let winner = getWinner();

    // Someone wins
    if (winner === "X" || winner === "O") {

        gameRunning = false;

        statusText.innerHTML = `🎉 Player ${winner} Wins!`;

        if (winner === "X") {

            scoreX++;
            xScore.textContent = scoreX;

        } else {

            scoreO++;
            oScore.textContent = scoreO;

        }

        return;
    }

    // Draw
    if (winner === "draw") {

        gameRunning = false;

        draws++;

        drawScore.textContent = draws;

        statusText.innerHTML = "🤝 Match Draw";

        return;
    }

    // Change Turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.innerHTML = `Player ${currentPlayer} Turn`;

    // Bot Turn
    if (botMode && currentPlayer === "O") {

        setTimeout(botMove, 400);

    }

}

// ===============================
// CHECK WINNER
// (Used by both game & AI)
// ===============================

function getWinner() {

    for (let pattern of winPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            return board[a];

        }

    }

    if (!board.includes("")) {

        return "draw";

    }

    return null;

}

// ===============================
// RESTART game
// ===============================

function restartgame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameRunning = true;

    statusText.innerHTML = "Player X Turn";

    cells.forEach(cell => {

        cell.textContent = "";

    });

}// ===============================
// PART 2
// game LOGIC
// ===============================

function checkgame() {

    let winner = getWinner();

    // Someone wins
    if (winner === "X" || winner === "O") {

        gameRunning = false;

        statusText.innerHTML = `🎉 Player ${winner} Wins!`;

        if (winner === "X") {

            scoreX++;
            xScore.textContent = scoreX;

        } else {

            scoreO++;
            oScore.textContent = scoreO;

        }

        return;
    }

    // Draw
    if (winner === "draw") {

        gameRunning = false;

        draws++;

        drawScore.textContent = draws;

        statusText.innerHTML = "🤝 Match Draw";

        return;
    }

    // Change Turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.innerHTML = `Player ${currentPlayer} Turn`;

    // Bot Turn
    if (botMode && currentPlayer === "O") {

        setTimeout(botMove, 400);

    }

}

// ===============================
// CHECK WINNER
// (Used by both game & AI)
// ===============================

function getWinner() {

    for (let pattern of winPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            return board[a];

        }

    }

    if (!board.includes("")) {

        return "draw";

    }

    return null;

}

// ===============================
// RESTART game
// ===============================

function restartgame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameRunning = true;

    statusText.innerHTML = "Player X Turn";

    cells.forEach(cell => {

        cell.textContent = "";

    });

}
// ===============================
// PART 3
// UNBEATABLE BOT (MINIMAX)
// ===============================

function botMove() {

    if (!gameRunning) return;

    let bestScore = -Infinity;
    let move = -1;

    // Try every possible move
    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;
                move = i;

            }

        }

    }

    // Make the best move
    if (move !== -1) {

        board[move] = "O";
        cells[move].textContent = "O";

        checkgame();

    }

}

// ===============================
// MINIMAX
// ===============================

function minimax(tempBoard, depth, isMaximizing) {

    let result = evaluateBoard(tempBoard);

    if (result !== null) {

        return result;

    }

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {

            if (tempBoard[i] === "") {

                tempBoard[i] = "O";

                let score = minimax(tempBoard, depth + 1, false);

                tempBoard[i] = "";

                bestScore = Math.max(bestScore, score);

            }

        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {

            if (tempBoard[i] === "") {

                tempBoard[i] = "X";

                let score = minimax(tempBoard, depth + 1, true);

                tempBoard[i] = "";

                bestScore = Math.min(bestScore, score);

            }

        }

        return bestScore;

    }

}

// ===============================
// BOARD EVALUATION
// ===============================

function evaluateBoard(tempBoard) {

    for (let pattern of winPatterns) {

        let [a, b, c] = pattern;

        if (
            tempBoard[a] !== "" &&
            tempBoard[a] === tempBoard[b] &&
            tempBoard[a] === tempBoard[c]
        ) {

            if (tempBoard[a] === "O") {

                return 10;

            } else {

                return -10;

            }

        }

    }

    if (!tempBoard.includes("")) {

        return 0;

    }

    return null;

}
// ===============================
// PART 4
// FINAL POLISH
// ===============================

// Reset Score Button (Optional)
// If you add this button in HTML:
// <button id="resetScore">Reset Score</button>

const resetScoreBtn = document.getElementById("resetScore");

if (resetScoreBtn) {

    resetScoreBtn.addEventListener("click", () => {

        scoreX = 0;
        scoreO = 0;
        draws = 0;

        xScore.textContent = "0";
        oScore.textContent = "0";
        drawScore.textContent = "0";

        restartgame();

    });

}

// ===============================
// HIGHLIGHT WINNING CELLS
// ===============================

function highlightWinner() {

    for (let pattern of winPatterns) {

        let [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            return;

        }

    }

}

// ===============================
// REMOVE HIGHLIGHT ON RESTART
// ===============================

const oldRestart = restartgame;

restartgame = function () {

    oldRestart();

    cells.forEach(cell => {

        cell.classList.remove("winner");

    });

}

window.onload = function () {

    const popup = document.getElementById("popup");

    // Show popup
    popup.style.display = "block";

    // Hide after 5 seconds
    setTimeout(function () {
        popup.style.display = "none";
    }, 5000);

};

// ===============================
// END
// ===============================