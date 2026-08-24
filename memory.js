// ======================================
// RAKHI MEMORY CHALLENGE
// PART 1
// VARIABLES + BOARD SYSTEM
// ======================================


// ===============================
// BUTTONS
// ===============================

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const hintBtn = document.getElementById("hintBtn");


// ===============================
// TEXT ELEMENTS
// ===============================

const timerText = document.getElementById("timer");
const bondText = document.getElementById("bond");
const matchesText = document.getElementById("matches");


// ===============================
// POPUP ELEMENTS
// ===============================

const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popupTitle");

const popupMessage = document.getElementById("popupMessage");

const popupStars = document.getElementById("popupStars");

const playAgainBtn = document.getElementById("playAgainBtn");


// ===============================
// game BOARD
// ===============================

const board = document.getElementById("gameBoard");



// ======================================
// game VARIABLES
// ======================================

let timer = 60;

let timerInterval = null;

let score = 0;

let matches = 0;

let hints = 3;


let firstCard = null;

let secondCard = null;

let lockBoard = false;

let gameRunning = false;



// ======================================
// CARD SYMBOLS
// ======================================

const symbols = [

    "🎀",
    "❤️",
    "🍫",
    "🧸",
    "🌸",
    "💎",
    "🎁",
    "💌"

];


// Create pairs

let cards = [...symbols, ...symbols];



// ======================================
// SHUFFLE FUNCTION
// ======================================

function shuffle(array){

    for(let i = array.length - 1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1));


        [array[i], array[j]] = [array[j], array[i]];

    }

}



// ======================================
// CREATE game BOARD
// ======================================

function createBoard(){

    board.innerHTML = "";


    shuffle(cards);


    cards.forEach(symbol => {


        const card = document.createElement("div");


        card.classList.add("card");


        card.dataset.symbol = symbol;


        // hidden card

        card.innerHTML = "🎁";


        board.appendChild(card);


    });


}



// ======================================
// RESET game
// ======================================

function resetgame(){


    clearInterval(timerInterval);


    timer = 60;


    score = 0;


    matches = 0;


    hints = 3;


    firstCard = null;

    secondCard = null;


    lockBoard = false;


    gameRunning = true;



    timerText.innerHTML = timer;


    bondText.innerHTML = "0%";


    matchesText.innerHTML = "0/8";


    hintBtn.innerHTML = "💡 Hint (3)";



    createBoard();


}



// ======================================
// INITIAL BOARD LOAD
// ======================================

createBoard();
// ======================================
// PART 2
// CARD FLIP + MATCH SYSTEM
// ======================================


// ===============================
// CARD CLICK EVENT
// ===============================

board.addEventListener("click", function(e){


    if(!gameRunning) return;


    const card = e.target;



    // Ignore wrong clicks

    if(

        !card.classList.contains("card") ||

        lockBoard ||

        card === firstCard ||

        card.classList.contains("matched")

    ){

        return;

    }



    // Show card

    card.innerHTML = card.dataset.symbol;


    card.classList.add("flipped");



    // First card

    if(!firstCard){


        firstCard = card;


        return;


    }



    // Second card

    secondCard = card;



    checkMatch();



});




// ======================================
// CHECK MATCH
// ======================================

function checkMatch(){


    lockBoard = true;



    // Correct match

    if(firstCard.dataset.symbol === secondCard.dataset.symbol){



        firstCard.classList.add("matched");


        secondCard.classList.add("matched");



        matches++;


        score += 12.5;



        matchesText.innerHTML = matches + "/8";


        bondText.innerHTML = Math.round(score) + "%";



        resetTurn();



        // Player wins

        if(matches === 8){


            setTimeout(()=>{


                gameWin();


            },500);


        }



    }


    // Wrong match

    else{


        setTimeout(()=>{


            firstCard.innerHTML = "🎁";


            secondCard.innerHTML = "🎁";



            firstCard.classList.remove("flipped");


            secondCard.classList.remove("flipped");



            resetTurn();



        },800);



    }


}




// ======================================
// RESET CARD TURN
// ======================================

function resetTurn(){


    firstCard = null;


    secondCard = null;


    lockBoard = false;


}
// ======================================
// PART 3
// TIMER + BUTTONS + HINT SYSTEM
// ======================================



// ======================================
// START TIMER
// ======================================

function startTimer(){


    clearInterval(timerInterval);



    timerInterval = setInterval(function(){


        timer--;


        timerText.innerHTML = timer;



        if(timer <= 0){


            clearInterval(timerInterval);


            gameLose();


        }



    },1000);


}



// ======================================
// START BUTTON
// ======================================

startBtn.addEventListener("click", function(){


    resetgame();


    startTimer();



});




// ======================================
// RESTART BUTTON
// ======================================

restartBtn.addEventListener("click", function(){


    resetgame();


    startTimer();



});





// ======================================
// HINT BUTTON
// ======================================

hintBtn.addEventListener("click", function(){



    if(hints <= 0 || !gameRunning){

        return;

    }



    hints--;



    hintBtn.innerHTML = "💡 Hint (" + hints + ")";



    const allCards = document.querySelectorAll(".card");



    // Show all cards

    allCards.forEach(card=>{


        if(!card.classList.contains("matched")){


            card.innerHTML = card.dataset.symbol;


        }


    });




    // Hide after 2 seconds

    setTimeout(()=>{



        allCards.forEach(card=>{



            if(!card.classList.contains("matched")){


                card.innerHTML = "🎁";


            }



        });



    },2000);



});
// ======================================
// PART 4
// WIN + LOSE + POPUP SYSTEM
// ======================================



// ======================================
// WIN FUNCTION
// ======================================

function gameWin(){


    gameRunning = false;


    clearInterval(timerInterval);



    let stars = "⭐";



    if(timer >= 30){


        stars = "⭐⭐⭐";


    }

    else if(timer >= 15){


        stars = "⭐⭐";


    }


}






// ======================================
// LOSE FUNCTION
// ======================================

function gameLose(){


    gameRunning = false;


    clearInterval(timerInterval);


}


// ======================================
// PLAY AGAIN BUTTON
// ======================================

playAgainBtn.addEventListener("click", function(){



    popup.style.display = "none";



    resetgame();



    startTimer();



});