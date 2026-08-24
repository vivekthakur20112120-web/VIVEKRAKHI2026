// ========================================
// 🐍 RAKSHA BANDHAN SNAKE GAME
// Complete Responsive Version
// ========================================

// ========================================
// GET HTML ELEMENTS
// ========================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");


// ========================================
// CANVAS SETTINGS
// ========================================

const box = 20;
const canvasSize = 400;

canvas.width = canvasSize;
canvas.height = canvasSize;


// ========================================
// GAME VARIABLES
// ========================================

let snake = [];
let food = {};

let direction = "RIGHT";
let nextDirection = "RIGHT";

let score = 0;
let highScore =
    Number(localStorage.getItem("snakeHighScore")) || 0;

let gameRunning = false;
let countdownRunning = false;

let gameInterval = null;
let countdownTimeout = null;


// ========================================
// GAME SPEED
// ========================================

const GAME_SPEED = 120;


// ========================================
// SCORE DISPLAY
// ========================================

function updateScore() {

    if (scoreElement) {
        scoreElement.textContent = score;
    }

}


// ========================================
// INITIAL DRAW
// ========================================

function drawInitialScreen() {

    ctx.fillStyle = "#111827";

    ctx.fillRect(
        0,
        0,
        canvasSize,
        canvasSize
    );

    // Small title

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 28px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "🐍 SNAKE",
        canvasSize / 2,
        180
    );

    ctx.font = "18px Arial";

    ctx.fillStyle = "#facc15";

    ctx.fillText(
        "Ready to play?",
        canvasSize / 2,
        220
    );

}


// ========================================
// CREATE FOOD
// ========================================

function createFood() {

    let validPosition = false;

    while (!validPosition) {

        food = {

            x:
                Math.floor(
                    Math.random() *
                    (canvasSize / box)
                ) * box,

            y:
                Math.floor(
                    Math.random() *
                    (canvasSize / box)
                ) * box

        };


        validPosition =
            !snake.some(
                part =>
                    part.x === food.x &&
                    part.y === food.y
            );

    }

}


// ========================================
// RESET GAME
// ========================================

function resetGame() {

    stopGame();

    snake = [

        {
            x: 9 * box,
            y: 10 * box
        },

        {
            x: 8 * box,
            y: 10 * box
        },

        {
            x: 7 * box,
            y: 10 * box
        }

    ];

    direction = "RIGHT";

    nextDirection = "RIGHT";

    score = 0;

    updateScore();

    createFood();

    drawGame();

}


// ========================================
// STOP GAME
// ========================================

function stopGame() {

    gameRunning = false;

    if (gameInterval !== null) {

        clearInterval(gameInterval);

        gameInterval = null;

    }

}


// ========================================
// DRAW GAME
// ========================================

function drawGame() {

    // Background

    ctx.fillStyle = "#111827";

    ctx.fillRect(
        0,
        0,
        canvasSize,
        canvasSize
    );


    // Grid

    ctx.strokeStyle =
        "rgba(255,255,255,0.04)";

    ctx.lineWidth = 1;

    for (
        let x = 0;
        x <= canvasSize;
        x += box
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvasSize);

        ctx.stroke();

    }


    for (
        let y = 0;
        y <= canvasSize;
        y += box
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvasSize, y);

        ctx.stroke();

    }


    // ====================================
    // FOOD
    // ====================================

    ctx.font = "18px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText(
        "🎀",
        food.x + box / 2,
        food.y + box / 2
    );


    // ====================================
    // SNAKE
    // ====================================

    for (
        let i = 0;
        i < snake.length;
        i++
    ) {

        const part = snake[i];


        if (i === 0) {

            // Head

            ctx.fillStyle = "#22c55e";

            ctx.fillRect(
                part.x + 1,
                part.y + 1,
                box - 2,
                box - 2
            );


            // Eyes

            ctx.fillStyle = "#ffffff";

            ctx.beginPath();

            ctx.arc(
                part.x + 6,
                part.y + 6,
                2,
                0,
                Math.PI * 2
            );

            ctx.arc(
                part.x + 14,
                part.y + 6,
                2,
                0,
                Math.PI * 2
            );

            ctx.fill();

        } else {

            // Body

            ctx.fillStyle = "#86efac";

            ctx.fillRect(
                part.x + 2,
                part.y + 2,
                box - 4,
                box - 4
            );

        }

    }

}


// ========================================
// CHANGE DIRECTION
// ========================================

function setDirection(newDirection) {

    if (!gameRunning) {
        return;
    }


    if (
        newDirection === "LEFT" &&
        direction !== "RIGHT"
    ) {

        nextDirection = "LEFT";

    }


    if (
        newDirection === "RIGHT" &&
        direction !== "LEFT"
    ) {

        nextDirection = "RIGHT";

    }


    if (
        newDirection === "UP" &&
        direction !== "DOWN"
    ) {

        nextDirection = "UP";

    }


    if (
        newDirection === "DOWN" &&
        direction !== "UP"
    ) {

        nextDirection = "DOWN";

    }

}


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key.toLowerCase();


        if (
            key === "arrowleft" ||
            key === "a"
        ) {

            event.preventDefault();

            setDirection("LEFT");

        }


        if (
            key === "arrowright" ||
            key === "d"
        ) {

            event.preventDefault();

            setDirection("RIGHT");

        }


        if (
            key === "arrowup" ||
            key === "w"
        ) {

            event.preventDefault();

            setDirection("UP");

        }


        if (
            key === "arrowdown" ||
            key === "s"
        ) {

            event.preventDefault();

            setDirection("DOWN");

        }

    }
);


// ========================================
// MOVE SNAKE
// ========================================

function moveSnake() {

    direction = nextDirection;


    let headX =
        snake[0].x;

    let headY =
        snake[0].y;


    if (direction === "LEFT") {

        headX -= box;

    }

    if (direction === "RIGHT") {

        headX += box;

    }

    if (direction === "UP") {

        headY -= box;

    }

    if (direction === "DOWN") {

        headY += box;

    }


    const newHead = {

        x: headX,
        y: headY

    };


    // ====================================
    // WALL COLLISION
    // ====================================

    if (

        headX < 0 ||

        headY < 0 ||

        headX >= canvasSize ||

        headY >= canvasSize

    ) {

        gameOver();

        return;

    }


    // ====================================
    // SELF COLLISION
    // ====================================

    if (
        collision(
            newHead,
            snake
        )
    ) {

        gameOver();

        return;

    }


    // ====================================
    // FOOD
    // ====================================

    if (

        headX === food.x &&

        headY === food.y

    ) {

        score++;

        updateScore();

        createFood();

        // Do NOT remove tail.
        // Snake grows.

    } else {

        snake.pop();

    }


    snake.unshift(newHead);

}


// ========================================
// COLLISION CHECK
// ========================================

function collision(
    head,
    body
) {

    for (
        let i = 0;
        i < body.length;
        i++
    ) {

        if (

            head.x === body[i].x &&

            head.y === body[i].y

        ) {

            return true;

        }

    }

    return false;

}


// ========================================
// MAIN GAME LOOP
// ========================================

function gameTick() {

    if (!gameRunning) {
        return;
    }

    moveSnake();

    if (gameRunning) {
        drawGame();
    }

}


// ========================================
// START GAME
// ========================================
function beginGame() {

    resetGame();

    gameRunning = true;

    // Start button hide during game
    if (startBtn) {
        startBtn.style.display = "none";
    }

    // Restart button show
    if (restartBtn) {
        restartBtn.style.display = "block";
    }

    gameInterval = setInterval(
        gameTick,
        GAME_SPEED
    );

}

// ========================================
// COUNTDOWN
// ========================================

function startCountdown() {

    if (countdownRunning) {
        return;
    }


    countdownRunning = true;

    stopGame();


    const overlay =
        document.createElement("div");

    overlay.id =
        "snakeCountdown";


    Object.assign(
        overlay.style,
        {

            position: "fixed",

            inset: "0",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            background:
                "rgba(0,0,0,0.65)",

            backdropFilter:
                "blur(6px)",

            zIndex: "99999",

            pointerEvents: "none"

        }
    );


    const number =
        document.createElement("div");


    Object.assign(
        number.style,
        {

            fontSize:
                "clamp(90px,25vw,180px)",

            fontWeight: "900",

            color: "#ffffff",

            textShadow:
                "0 0 30px #22c55e",

            fontFamily:
                "Arial,sans-serif",

            textAlign:
                "center"

        }
    );


    overlay.appendChild(number);

    document.body.appendChild(overlay);


    const values =
        [
            "3",
            "2",
            "1",
            "GO!"
        ];


    let index = 0;


    function showNumber() {

        number.textContent =
            values[index];


        number.style.transform =
            "scale(0.5)";

        number.style.opacity =
            "0";


        requestAnimationFrame(
            function () {

                number.style.transition =
                    "all 0.3s ease";

                number.style.transform =
                    "scale(1)";

                number.style.opacity =
                    "1";

            }
        );


        index++;


        if (
            index < values.length
        ) {

            countdownTimeout =
                setTimeout(
                    showNumber,
                    900
                );

        } else {

            countdownTimeout =
                setTimeout(
                    function () {

                        overlay.remove();

                        countdownRunning =
                            false;

                        beginGame();

                    },
                    700
                );

        }

    }


    showNumber();

}


// ========================================
// GAME OVER POPUP
// ========================================

function showGameOverPopup() {

    removeOldGameOverPopup();


    const overlay =
        document.createElement("div");

    overlay.id =
        "snakeGameOver";


    Object.assign(
        overlay.style,
        {

            position: "fixed",

            inset: "0",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            background:
                "rgba(0,0,0,0.72)",

            backdropFilter:
                "blur(8px)",

            zIndex: "99999",

            padding: "20px"

        }
    );


    const boxElement =
        document.createElement("div");


    Object.assign(
        boxElement.style,
        {

            width:
                "min(92vw,380px)",

            padding:
                "30px 20px",

            borderRadius:
                "28px",

            textAlign:
                "center",

            color:
                "white",

            background:
                "linear-gradient(135deg,#064e3b,#16a34a)",

            boxShadow:
                "0 0 45px rgba(34,197,94,0.45)",

            fontFamily:
                "Arial,sans-serif"

        }
    );


    boxElement.innerHTML = `

        <div style="
            font-size:60px;
            margin-bottom:10px;
        ">
            🐍
        </div>

        <h1 style="
            margin:0 0 10px;
            font-size:34px;
        ">
            GAME OVER
        </h1>

        <p style="
            font-size:20px;
            margin:10px 0;
        ">
            🎀 Score: ${score}
        </p>

        <p style="
            font-size:17px;
            margin:8px 0 20px;
        ">
            ⭐ Best: ${highScore}
        </p>

    `;


    // ====================================
    // RESTART BUTTON
    // ====================================

    const restart =
        document.createElement("button");


    restart.textContent =
        "🔄 RESTART";


    stylePopupButton(
        restart,
        "#f59e0b"
    );


    restart.addEventListener(
        "click",
        function () {

            overlay.remove();

            startCountdown();

        }
    );


    // ====================================
    // MENU BUTTON
    // ====================================

    const menu =
        document.createElement("button");


    menu.textContent =
        "🏠 GAME MENU";


    stylePopupButton(
        menu,
        "#2563eb"
    );


    menu.addEventListener(
        "click",
        function () {

            window.location.href =
                "game.html";

        }
    );


    boxElement.appendChild(restart);

    boxElement.appendChild(menu);

    overlay.appendChild(boxElement);

    document.body.appendChild(overlay);

}


// ========================================
// POPUP BUTTON STYLE
// ========================================

function stylePopupButton(
    button,
    background
) {

    Object.assign(
        button.style,
        {

            display:
                "block",

            width:
                "100%",

            padding:
                "14px",

            margin:
                "10px 0",

            border:
                "none",

            borderRadius:
                "50px",

            fontSize:
                "17px",

            fontWeight:
                "bold",

            color:
                "white",

            background:
                background,

            cursor:
                "pointer",

            boxShadow:
                "0 6px 15px rgba(0,0,0,0.25)"

        }
    );

}


// ========================================
// REMOVE OLD GAME OVER POPUP
// ========================================

function removeOldGameOverPopup() {

    const old =
        document.getElementById(
            "snakeGameOver"
        );

    if (old) {
        old.remove();
    }

}


// ========================================
// GAME OVER
// ========================================

function gameOver() {

    if (!gameRunning) {
        return;
    }


    stopGame();


    if (
        score > highScore
    ) {

        highScore =
          score;

        localStorage.setItem(
            "snakeHighScore",
            highScore
        );

    }
if (restartBtn) {
    restartBtn.style.display = "none";
}

if (startBtn) {
    startBtn.style.display = "none";
}

    showGameOverPopup();

}


// ========================================
// START BUTTON
// ========================================

if (startBtn) {

    startBtn.addEventListener(
        "click",
        function () {

            startCountdown();

        }
    );

}


// ========================================
// RESTART BUTTON
// ========================================

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        function () {

            startCountdown();

        }
    );

}


// ========================================
// TOUCH / MOUSE BUTTON CONTROL
// ========================================

function setupControl(
    button,
    dir
) {

    if (!button) {
        return;
    }


    button.addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            setDirection(dir);

        }
    );

}


setupControl(
    upBtn,
    "UP"
);

setupControl(
    downBtn,
    "DOWN"
);

setupControl(
    leftBtn,
    "LEFT"
);

setupControl(
    rightBtn,
    "RIGHT"
);


// ========================================
// PREVENT PAGE SCROLL
// ========================================

document.body.style.touchAction =
    "manipulation";

canvas.style.touchAction =
    "none";


// ========================================
// INITIAL PAGE
// ========================================


    // Start button visible
    if (startBtn) {
        startBtn.style.display = "block";
    }

    // Restart button initially hidden
    if (restartBtn) {
        restartBtn.style.display = "none";
    }

// ========================================
// 🎀 START GAME POPUP
// ========================================

function showStartPopup() {

    // Remove old popup
    const oldPopup =
        document.getElementById("snakeStartPopup");

    if (oldPopup) {
        oldPopup.remove();
    }

    const popup =
        document.createElement("div");

    popup.id = "snakeStartPopup";

    popup.innerHTML = `
        <div class="snake-popup-box">

            <div class="snake-popup-icon">🐍</div>

            <h1>RAKSHA BANDHAN SNAKE</h1>

            <p>
                🎀 Collect the Rakhi<br>
                🐍 Grow your snake<br>
                ❤️ Make the bond stronger!
            </p>

            <button id="snakePopupStart">
                🚀 START GAME
            </button>

        </div>
    `;

    document.body.appendChild(popup);


    // Popup background
    Object.assign(popup.style, {

        position: "fixed",
        inset: "0",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background: "rgba(0,0,0,0.72)",

        backdropFilter: "blur(8px)",

        zIndex: "99999",

        padding: "20px"

    });


    // Popup box
    const boxElement =
        popup.querySelector(".snake-popup-box");

    Object.assign(boxElement.style, {

        width: "min(92vw,400px)",

        padding: "32px 22px",

        borderRadius: "30px",

        textAlign: "center",

        color: "white",

        background:
            "linear-gradient(135deg,#064e3b,#16a34a,#22c55e)",

        boxShadow:
            "0 0 50px rgba(34,197,94,0.55)",

        fontFamily: "Arial,sans-serif"

    });


    // Snake icon
    const icon =
        popup.querySelector(".snake-popup-icon");

    Object.assign(icon.style, {

        fontSize: "75px",

        marginBottom: "10px",

        animation: "snakeFloat 1.5s ease-in-out infinite"

    });


    // Start button
    const popupStart =
        popup.querySelector("#snakePopupStart");

    Object.assign(popupStart.style, {

        marginTop: "20px",

        width: "100%",

        padding: "15px",

        border: "none",

        borderRadius: "50px",

        fontSize: "18px",

        fontWeight: "bold",

        color: "white",

        background:
            "linear-gradient(45deg,#f59e0b,#ef4444)",

        cursor: "pointer",

        boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)"

    });


    // Start popup button
    popupStart.addEventListener(
        "click",
        function () {

            popup.remove();

            startCountdown();

        }
    );

}


// ========================================
// SHOW POPUP WHEN PAGE OPENS
// ========================================

window.addEventListener(
    "load",
    function () {

        resetGame();

        drawInitialScreen();

        // Show START popup
        showStartPopup();

    }
);