// =====================================
// 🐦 RAKSHA BANDHAN FLAPPY BIRD
// CLEAN COMPLETE JAVASCRIPT
// =====================================


// =====================================
// GET HTML ELEMENTS
// =====================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("score");


// =====================================
// CANVAS SIZE
// =====================================

const WIDTH = 400;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

canvas.style.width = "min(92vw, 400px)";
canvas.style.height = "auto";
canvas.style.display = "block";
canvas.style.margin = "0 auto";
canvas.style.touchAction = "none";


// =====================================
// BIRD
// =====================================

const bird = {

    x: 100,
    y: 300,

    radius: 18,

    velocity: 0

};


// =====================================
// GAME SETTINGS
// =====================================

const gravity = 0.5;
const jumpForce = -9;

const pipeWidth = 70;
const pipeGap = 170;
const pipeSpeed = 3;


// =====================================
// GAME VARIABLES
// =====================================

let pipes = [];

let score = 0;

let gameRunning = false;

let countdownRunning = false;

let animationId = null;

let countdownTimeout = null;


// =====================================
// DRAW INITIAL SCREEN
// =====================================

drawBackground();
drawBird();


// =====================================
// BACKGROUND
// =====================================

function drawBackground() {

    const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        HEIGHT
    );

    gradient.addColorStop(
        0,
        "#87CEEB"
    );

    gradient.addColorStop(
        1,
        "#dff7ff"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    // Clouds

    ctx.font = "42px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "☁️",
        70,
        80
    );

    ctx.fillText(
        "☁️",
        300,
        130
    );

}


// =====================================
// DRAW BIRD
// =====================================

function drawBird() {

    // Body

    ctx.beginPath();

    ctx.arc(
        bird.x,
        bird.y,
        bird.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#FFD700";

    ctx.fill();

    ctx.closePath();


    // Eye

    ctx.beginPath();

    ctx.arc(
        bird.x + 6,
        bird.y - 6,
        3,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "black";

    ctx.fill();

    ctx.closePath();


    // Beak

    ctx.fillStyle = "#FF8C00";

    ctx.fillRect(
        bird.x + 15,
        bird.y - 3,
        12,
        7
    );

}


// =====================================
// CREATE PIPE
// =====================================

function createPipe() {

    const topHeight =
        Math.random() * 220 + 60;


    pipes.push({

        x: WIDTH,

        top: topHeight,

        bottom: topHeight + pipeGap,

        passed: false

    });

}


// =====================================
// DRAW PIPES
// =====================================

function drawPipes() {

    ctx.fillStyle = "#28a745";

    for (const pipe of pipes) {

        // Top pipe

        ctx.fillRect(

            pipe.x,

            0,

            pipeWidth,

            pipe.top

        );


        // Bottom pipe

        ctx.fillRect(

            pipe.x,

            pipe.bottom,

            pipeWidth,

            HEIGHT - pipe.bottom

        );

    }

}


// =====================================
// UPDATE BIRD
// =====================================

function updateBird() {

    bird.velocity += gravity;

    bird.y += bird.velocity;


    // Top boundary

    if (bird.y < bird.radius) {

        bird.y = bird.radius;

        bird.velocity = 0;

    }


    // Bottom boundary

    if (
        bird.y >
        HEIGHT - bird.radius
    ) {

        bird.y =
            HEIGHT - bird.radius;

        gameOver();

    }

}


// =====================================
// UPDATE PIPES
// =====================================

function updatePipes() {

    for (
        let i = pipes.length - 1;
        i >= 0;
        i--
    ) {

        const pipe = pipes[i];


        // Move pipe

        pipe.x -= pipeSpeed;


        // Score

        if (
            !pipe.passed &&
            pipe.x + pipeWidth < bird.x
        ) {

            pipe.passed = true;

            score++;

            updateScore();

        }


        // Remove old pipe

        if (
            pipe.x + pipeWidth < 0
        ) {

            pipes.splice(i, 1);

        }

    }


    // Create next pipe

    if (
        pipes.length === 0 ||
        pipes[pipes.length - 1].x < 220
    ) {

        createPipe();

    }

}


// =====================================
// COLLISION
// =====================================

function checkCollision() {

    for (const pipe of pipes) {

        const horizontalCollision =

            bird.x + bird.radius >
            pipe.x &&

            bird.x - bird.radius <
            pipe.x + pipeWidth;


        if (!horizontalCollision) {

            continue;

        }


        const verticalCollision =

            bird.y - bird.radius <
            pipe.top ||

            bird.y + bird.radius >
            pipe.bottom;


        if (verticalCollision) {

            gameOver();

            return;

        }

    }

}


// =====================================
// SCORE
// =====================================

function updateScore() {

    if (scoreText) {

        scoreText.textContent =
            score;

    }

}


// =====================================
// JUMP
// =====================================

function jump() {

    if (!gameRunning) {

        return;

    }

    bird.velocity =
        jumpForce;

}


// =====================================
// RESET GAME
// =====================================

function resetGame() {

    gameRunning = false;

    pipes = [];

    score = 0;

    bird.x = 100;

    bird.y = 300;

    bird.velocity = 0;

    updateScore();


    if (animationId !== null) {

        cancelAnimationFrame(
            animationId
        );

        animationId = null;

    }


    drawBackground();

    drawBird();

}


// =====================================
// START COUNTDOWN
// =====================================

function startCountdown() {

    if (countdownRunning) {

        return;

    }


    countdownRunning = true;


    // Reset game first

    resetGame();


    // Create overlay

    const overlay =
        document.createElement("div");

    overlay.id =
        "flappyCountdownOverlay";


    Object.assign(
        overlay.style,
        {

            position: "fixed",

            inset: "0",

            display: "flex",

            justifyContent:
                "center",

            alignItems:
                "center",

            background:
                "rgba(0,0,0,0.45)",

            backdropFilter:
                "blur(5px)",

            zIndex: "999999",

            pointerEvents:
                "none"

        }
    );


    // Number

    const number =
        document.createElement("div");


    number.id =
        "flappyCountdownNumber";


    Object.assign(
        number.style,
        {

            fontSize:
                "clamp(90px,25vw,180px)",

            fontWeight:
                "900",

            color:
                "white",

            textShadow:
                "0 0 30px #ff1493, 0 0 60px #ff69b4",

            fontFamily:
                "Arial, sans-serif",

            textAlign:
                "center"

        }
    );


    overlay.appendChild(number);

    document.body.appendChild(overlay);


    const values =
        ["3", "2", "1", "GO!"];


    let index = 0;


    function showNumber() {

        if (!number) {

            return;

        }


        number.textContent =
            values[index];


        // Animation

        number.style.transform =
            "scale(0.3)";

        number.style.opacity =
            "0";


        requestAnimationFrame(
            function () {

                number.style.transition =
                    "all 0.35s ease";

                number.style.transform =
                    "scale(1)";

                number.style.opacity =
                    "1";

            }
        );


        index++;


        // Continue countdown

        if (
            index < values.length
        ) {

            countdownTimeout =
                setTimeout(
                    showNumber,
                    1000
                );

        } else {

            // GO stays visible briefly

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


// =====================================
// BEGIN GAME
// =====================================

function beginGame() {

    resetGame();


    gameRunning = true;


    // First pipe

    createPipe();


    // Start game loop

    gameLoop();

}


// =====================================
// GAME LOOP
// =====================================

function gameLoop() {

    if (!gameRunning) {

        return;

    }


    drawBackground();

    updateBird();

    updatePipes();

    checkCollision();

    drawPipes();

    drawBird();


    animationId =
        requestAnimationFrame(
            gameLoop
        );

}


// =====================================
// GAME OVER
// =====================================

function gameOver() {

    if (!gameRunning) {

        return;

    }


    gameRunning = false;


    if (animationId !== null) {

        cancelAnimationFrame(
            animationId
        );

        animationId = null;

    }


    // Draw final frame

    drawBackground();

    drawPipes();

    drawBird();


    // Dark overlay

    ctx.fillStyle =
        "rgba(0,0,0,0.65)";

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    // Game over text

    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 42px Arial";


    ctx.fillText(
        "GAME OVER!",
        WIDTH / 2,
        220
    );


    ctx.font =
        "bold 25px Arial";


    ctx.fillText(
        "🎀 Score: " + score,
        WIDTH / 2,
        270
    );


    createGameOverButtons();

}


// =====================================
// GAME OVER BUTTONS
// =====================================

function createGameOverButtons() {

    // Remove old buttons

    removeGameOverButtons();


    // Restart

    const restart =
        document.createElement("button");


    restart.id =
        "flappyGameOverRestart";


    restart.textContent =
        "🔄 RESTART GAME";


    styleGameOverButton(
        restart,
        "linear-gradient(45deg,#ff1493,#ff8c00)",
        "58%"
    );


    // Menu

    const menu =
        document.createElement("button");


    menu.id =
        "flappyGameOverMenu";


    menu.textContent =
        "🏠 BACK TO GAME MENU";


    styleGameOverButton(
        menu,
        "linear-gradient(45deg,#4169e1,#00bfff)",
        "69%"
    );


    document.body.appendChild(
        restart
    );

    document.body.appendChild(
        menu
    );


    // Restart event

    restart.addEventListener(
        "click",
        function () {

            removeGameOverButtons();

            startCountdown();

        }
    );


    // Menu event

    menu.addEventListener(
        "click",
        function () {

            window.location.href =
                "game.html";

        }
    );

}


// =====================================
// GAME OVER BUTTON STYLE
// =====================================

function styleGameOverButton(
    button,
    background,
    top
) {

    Object.assign(
        button.style,
        {

            position:
                "fixed",

            left:
                "50%",

            top:
                top,

            transform:
                "translate(-50%,-50%)",

            padding:
                "14px 25px",

            border:
                "none",

            borderRadius:
                "50px",

            fontSize:
                "16px",

            fontWeight:
                "bold",

            color:
                "white",

            background:
                background,

            cursor:
                "pointer",

            zIndex:
                "1000000",

            boxShadow:
                "0 0 25px rgba(255,255,255,0.35)",

            minWidth:
                "220px"

        }
    );

}


// =====================================
// REMOVE GAME OVER BUTTONS
// =====================================

function removeGameOverButtons() {

    const restart =
        document.getElementById(
            "flappyGameOverRestart"
        );


    const menu =
        document.getElementById(
            "flappyGameOverMenu"
        );


    if (restart) {

        restart.remove();

    }


    if (menu) {

        menu.remove();

    }

}


// =====================================
// KEYBOARD CONTROL
// =====================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.code === "Space" ||
            event.code === "ArrowUp"
        ) {

            event.preventDefault();

            jump();

        }

    }
);


// =====================================
// MOUSE CONTROL
// =====================================

canvas.addEventListener(
    "click",
    function () {

        jump();

    }
);


// =====================================
// TOUCH CONTROL
// =====================================

canvas.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        jump();

    },
    {
        passive: false
    }
);


// =====================================
// START BUTTON
// =====================================

if (startBtn) {

    startBtn.addEventListener(
        "click",
        function () {

            startCountdown();

        }
    );

}


// =====================================
// RESTART BUTTON
// =====================================

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        function () {

            removeGameOverButtons();

            startCountdown();

        }
    );

}


// =====================================
// MOBILE SETTINGS
// =====================================

document.body.style.touchAction =
    "manipulation";


// =====================================
// START POPUP
// =====================================

function createStartPopup() {

    const oldPopup =
        document.getElementById(
            "flappyStartPopup"
        );


    if (oldPopup) {

        oldPopup.remove();

    }


    const popup =
        document.createElement("div");


    popup.id =
        "flappyStartPopup";


    popup.innerHTML = `

        <div class="flappy-popup-box">

            <div style="
                font-size:70px;
                margin-bottom:10px;
            ">
                🐦
            </div>

            <h1>
                Flappy Bird
            </h1>

            <p>
                🎀 Raksha Bandhan Edition
            </p>

            <p style="
                margin-top:15px;
                line-height:1.7;
            ">
                💻 Space / ↑ / Mouse<br>
                📱 Tap the screen
            </p>

            <button id="flappyPopupStart">
                🚀 START GAME
            </button>

        </div>

    `;


    Object.assign(
        popup.style,
        {

            position:
                "fixed",

            inset:
                "0",

            display:
                "flex",

            justifyContent:
                "center",

            alignItems:
                "center",

            background:
                "rgba(0,0,0,0.7)",

            backdropFilter:
                "blur(8px)",

            zIndex:
                "999998",

            padding:
                "20px"

        }
    );


    const box =
        popup.querySelector(
            ".flappy-popup-box"
        );


    Object.assign(
        box.style,
        {

            width:
                "min(90vw,380px)",

            padding:
                "30px 20px",

            borderRadius:
                "25px",

            textAlign:
                "center",

            background:
                "linear-gradient(135deg,#ff69b4,#ffd700)",

            color:
                "white",

            fontFamily:
                "Arial,sans-serif",

            boxShadow:
                "0 0 40px rgba(255,20,147,0.8)"

        }
    );


    const button =
        popup.querySelector(
            "#flappyPopupStart"
        );


    Object.assign(
        button.style,
        {

            marginTop:
                "20px",

            padding:
                "14px 30px",

            border:
                "none",

            borderRadius:
                "50px",

            fontSize:
                "18px",

            fontWeight:
                "bold",

            cursor:
                "pointer",

            color:
                "white",

            background:
                "linear-gradient(45deg,#ff1493,#ff8c00)",

            boxShadow:
                "0 0 20px rgba(255,255,255,0.6)"

        }
    );


    document.body.appendChild(
        popup
    );


    button.addEventListener(
        "click",
        function () {

            popup.remove();

            startCountdown();

        }
    );

}


// =====================================
// PAGE LOAD
// =====================================

window.addEventListener(
    "load",
    function () {

        resetGame();

        createStartPopup();

    }
);