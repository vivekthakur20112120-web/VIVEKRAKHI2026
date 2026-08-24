// ========================================
// 🎀 CATCH RAKHI - RAKHI GUARDIAN
// COMPLETE CLEAN VERSION
// ========================================


// ========================================
// GET HTML ELEMENTS
// ========================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const loveMeter = document.getElementById("loveMeter");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupScore = document.getElementById("popupScore");
const popupBtn = document.getElementById("popupBtn");

const menuBtn = document.getElementById("menuBtn");


// ========================================
// SAFETY CHECK
// ========================================

if (!canvas || !ctx) {
    console.error("gameCanvas not found.");
}

// ========================================
// GAME VARIABLES
// ========================================

let score = 0;

let highScore =
    Number(localStorage.getItem("rakhiHighScore")) || 0;

let gameRunning = false;

let countdownRunning = false;

let animationId = null;

let spawnInterval = null;

let objects = [];

let leftPressed = false;

let rightPressed = false;


// ========================================
// GAME SETTINGS
// ========================================

// Infinite game
// No timer

const SPAWN_TIME = 500;

// More objects
const OBJECTS_PER_SPAWN = 1.5;

// Starting speed
const MIN_SPEED = 5;

const MAX_SPEED = 7;


// ========================================
// PLAYER
// ========================================

const player = {

    x: WIDTH / 2 - 45,

    y: HEIGHT - 55,

    width: 90,

    height: 25,

    speed: 9

};


// ========================================
// OBJECT TYPES
// ========================================

const itemTypes = [

    {
        emoji: "🎀",
        type: "rakhi",
        points: 10
    },

    {
        emoji: "❤️",
        type: "heart",
        points: 5
    },

    {
        emoji: "🍫",
        type: "chocolate",
        points: 10
    },

    {
        emoji: "🧸",
        type: "teddy",
        points: 10
    },

    {
        emoji: "🌸",
        type: "flower",
        points: 8
    },

    {
        emoji: "💎",
        type: "diamond",
        points: 20
    }

];


// ========================================
// INITIAL HIGH SCORE
// ========================================

highScoreText.textContent = highScore;


// ========================================
// DRAW BACKGROUND
// ========================================

function drawBackground() {

    const gradient =
        ctx.createLinearGradient(
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
        0.65,
        "#dff7ff"
    );

    gradient.addColorStop(
        1,
        "#fff1bd"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    // Clouds

    ctx.font = "38px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "☁️",
        65,
        70
    );

    ctx.fillText(
        "☁️",
        285,
        120
    );


    // Ground

    ctx.fillStyle = "#7bc96f";

    ctx.fillRect(
        0,
        HEIGHT - 15,
        WIDTH,
        15
    );

}


// ========================================
// DRAW PLAYER
// ========================================

function drawPlayer() {

    // Outer plate

    ctx.beginPath();

    ctx.arc(
        player.x + player.width / 2,
        player.y,
        40,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#b8860b";

    ctx.fill();


    // Golden center

    ctx.beginPath();

    ctx.arc(
        player.x + player.width / 2,
        player.y,
        27,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ffd700";

    ctx.fill();


    // Pink decoration

    ctx.beginPath();

    ctx.arc(
        player.x + player.width / 2,
        player.y,
        7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ff1493";

    ctx.fill();

}


// ========================================
// PLAYER MOVEMENT
// ========================================

function updatePlayer() {

    if (leftPressed) {

        player.x -= player.speed;

    }

    if (rightPressed) {

        player.x += player.speed;

    }


    // Left boundary

    if (player.x < 0) {

        player.x = 0;

    }


    // Right boundary

    if (
        player.x + player.width > WIDTH
    ) {

        player.x =
            WIDTH - player.width;

    }

}


// ========================================
// CREATE OBJECT
// ========================================

function createObject() {

    const random =
        Math.random();


    // 20% bomb

    if (random < 0.20) {

        objects.push({

            x:
                Math.random() *
                (WIDTH - 40) + 20,

            y: -40,

            size: 38,

            speed:
                MIN_SPEED +
                Math.random() *
                (MAX_SPEED - MIN_SPEED),

            emoji: "💣",

            type: "bomb",

            points: -50

        });

        return;

    }


    // Good object

    const item =
        itemTypes[
            Math.floor(
                Math.random() *
                itemTypes.length
            )
        ];


    objects.push({

        x:
            Math.random() *
            (WIDTH - 40) + 20,

        y: -40,

        size: 38,

        speed:
            MIN_SPEED +
            Math.random() *
            (MAX_SPEED - MIN_SPEED),

        emoji: item.emoji,

        type: item.type,

        points: item.points

    });

}


// ========================================
// DRAW OBJECTS
// ========================================

function drawObjects() {

    ctx.font = "34px Arial";

    ctx.textAlign = "center";

    for (const object of objects) {

        ctx.fillText(

            object.emoji,

            object.x,

            object.y

        );

    }

}


// ========================================
// UPDATE OBJECTS
// ========================================

function updateObjects() {

    for (
        let i = objects.length - 1;
        i >= 0;
        i--
    ) {

        objects[i].y +=
            objects[i].speed;


        // Remove objects outside canvas

        if (
            objects[i].y >
            HEIGHT + 50
        ) {

            objects.splice(i, 1);

        }

    }

}


// ========================================
// COLLISION
// ========================================

function checkCollision() {

    for (
        let i = objects.length - 1;
        i >= 0;
        i--
    ) {

        const object =
            objects[i];


        const objectLeft =
            object.x - 18;

        const objectRight =
            object.x + 18;

        const objectTop =
            object.y - 30;

        const objectBottom =
            object.y + 10;


        const playerLeft =
            player.x;

        const playerRight =
            player.x +
            player.width;

        const playerTop =
            player.y - 38;

        const playerBottom =
            player.y + 15;


        const collision =

            objectRight >
            playerLeft &&

            objectLeft <
            playerRight &&

            objectBottom >
            playerTop &&

            objectTop <
            playerBottom;


        if (!collision) {

            continue;

        }


        // ========================================
        // BOMB
        // ========================================

        if (
            object.type === "bomb"
        ) {

            objects.splice(i, 1);

            gameOver();

            return;

        }


        // ========================================
        // GOOD OBJECT
        // ========================================

        score +=
            object.points;


        if (score < 0) {

            score = 0;

        }


        scoreText.textContent =
            score;


        updateLoveMeter();


        objects.splice(i, 1);

    }

}


// ========================================
// LOVE METER
// ========================================

function updateLoveMeter() {

    // Infinite mode:
    // meter cycles every 300 points

    const percentage =
        score % 300;

    loveMeter.style.width =
        percentage / 3 + "%";

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    if (!gameRunning) {

        return;

    }


    drawBackground();

    updatePlayer();

    updateObjects();

    checkCollision();

    drawObjects();

    drawPlayer();


    animationId =
        requestAnimationFrame(
            gameLoop
        );

}


// ========================================
// SPAWN SYSTEM
// ========================================

function startSpawning() {

    stopSpawning();


    spawnInterval =
        setInterval(
            function () {

                if (!gameRunning) {

                    return;

                }


                // Spawn multiple objects

                for (
                    let i = 0;
                    i < OBJECTS_PER_SPAWN;
                    i++
                ) {

                    createObject();

                }

            },
            SPAWN_TIME
        );

}


// ========================================
// STOP SPAWNING
// ========================================

function stopSpawning() {

    if (
        spawnInterval !== null
    ) {

        clearInterval(
            spawnInterval
        );

        spawnInterval = null;

    }

}


// ========================================
// RESET GAME
// ========================================

function resetGame() {

    stopSpawning();


    if (
        animationId !== null
    ) {

        cancelAnimationFrame(
            animationId
        );

        animationId = null;

    }


    score = 0;

    objects = [];


    player.x =
        WIDTH / 2 -
        player.width / 2;


    scoreText.textContent =
        "0";


    loveMeter.style.width =
        "0%";


    leftPressed = false;

    rightPressed = false;

}


// ========================================
// COUNTDOWN
// ========================================

function startCountdown() {

    if (countdownRunning) {

        return;

    }


    countdownRunning = true;


    const overlay =
        document.createElement("div");


    overlay.className =
        "countdown-overlay";


    const number =
        document.createElement("div");


    number.className =
        "countdown-number";


    overlay.appendChild(
        number
    );


    document.body.appendChild(
        overlay
    );


    const values =
        ["3", "2", "1", "GO!"];


    let index = 0;


    function showNumber() {

        number.textContent =
            values[index];


        number.style.animation =
            "none";


        void number.offsetWidth;


        number.style.animation =
            "countdownPop 0.9s ease";


        index++;


        if (
            index < values.length
        ) {

            setTimeout(
                showNumber,
                1000
            );

        } else {

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
// BEGIN GAME
// ========================================

function beginGame() {

    resetGame();


    gameRunning = true;


    // Initial objects

    createObject();

    createObject();


    startSpawning();


    gameLoop();

}


// ========================================
// SHOW START POPUP
// ========================================

function showStartPopup() {

    popupTitle.textContent =
        "🎀 CATCH RAKHI";


    popupMessage.textContent =
        "Catch the beautiful gifts and avoid the bombs! ❤️";


    popupScore.textContent =
        "Infinite Game Mode";


    popupBtn.textContent =
        "🚀 START GAME";


    if (menuBtn) {

        menuBtn.style.display =
            "none";

    }


    popup.style.display =
        "flex";


    popup.setAttribute(
        "aria-hidden",
        "false"
    );

}


// ========================================
// HIDE POPUP
// ========================================

function hidePopup() {

    popup.style.display =
        "none";


    popup.setAttribute(
        "aria-hidden",
        "true"
    );

}


// ========================================
// START GAME
// ========================================

function startGame() {

    if (gameRunning) {

        return;

    }


    hidePopup();


    startCountdown();

}


// ========================================
// GAME OVER
// ========================================

function gameOver() {

    if (!gameRunning) {

        return;

    }


    gameRunning = false;


    stopSpawning();


    if (
        animationId !== null
    ) {

        cancelAnimationFrame(
            animationId
        );

        animationId = null;

    }


    // Update high score

    if (
        score > highScore
    ) {

        highScore =
            score;


        localStorage.setItem(
            "rakhiHighScore",
            highScore
        );


        highScoreText.textContent =
            highScore;

    }


    // Game over popup

    popupTitle.textContent =
        "💔 GAME OVER";


    popupMessage.textContent =
        "Oops! You caught a bomb! Try again ❤️";


    popupScore.textContent =
        "🏆 Score: " +
        score +
        " | ⭐ Best: " +
        highScore;


    popupBtn.textContent =
        "🔄 PLAY AGAIN";


    if (menuBtn) {

        menuBtn.style.display =
            "block";

    }


    popup.style.display =
        "flex";


    popup.setAttribute(
        "aria-hidden",
        "false"
    );

}


// ========================================
// BUTTON EVENTS
// ========================================

if (startBtn) {

    startBtn.addEventListener(
        "click",
        function () {

            startGame();

        }
    );

}


if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        function () {

            if (countdownRunning) {

                return;

            }


            hidePopup();

            startCountdown();

        }
    );

}


if (popupBtn) {

    popupBtn.addEventListener(
        "click",
        function () {

            startGame();

        }
    );

}


// ========================================
// GAME MENU
// ========================================

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "game.html";

        }
    );

}


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            leftPressed = true;

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            event.preventDefault();

            rightPressed = true;

        }

    }
);


document.addEventListener(
    "keyup",
    function (event) {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            leftPressed = false;

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            rightPressed = false;

        }

    }
);


// ========================================
// TOUCH + MOUSE CONTROLS
// ========================================

function pressLeft(event) {

    if (event) {

        event.preventDefault();

    }

    leftPressed = true;

}


function releaseLeft(event) {

    if (event) {

        event.preventDefault();

    }

    leftPressed = false;

}


function pressRight(event) {

    if (event) {

        event.preventDefault();

    }

    rightPressed = true;

}


function releaseRight(event) {

    if (event) {

        event.preventDefault();

    }

    rightPressed = false;

}


// LEFT

if (leftBtn) {

    leftBtn.addEventListener(
        "pointerdown",
        pressLeft
    );

    leftBtn.addEventListener(
        "pointerup",
        releaseLeft
    );

    leftBtn.addEventListener(
        "pointercancel",
        releaseLeft
    );

    leftBtn.addEventListener(
        "pointerleave",
        releaseLeft
    );

}


// RIGHT

if (rightBtn) {

    rightBtn.addEventListener(
        "pointerdown",
        pressRight
    );

    rightBtn.addEventListener(
        "pointerup",
        releaseRight
    );

    rightBtn.addEventListener(
        "pointercancel",
        releaseRight
    );

    rightBtn.addEventListener(
        "pointerleave",
        releaseRight
    );

}


// ========================================
// PREVENT STUCK CONTROLS
// ========================================

window.addEventListener(
    "blur",
    function () {

        leftPressed = false;

        rightPressed = false;

    }
);


// ========================================
// INITIAL PAGE
// ========================================

window.addEventListener(
    "load",
    function () {

        resetGame();

        drawBackground();

        drawPlayer();

        showStartPopup();

    }
);