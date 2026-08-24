// =====================================
// 🎵 RAKSHA BANDHAN MUSIC PLAYER
// SUPERHERO MUSIC CONTROLLER
// =====================================

const audioPlayer = document.getElementById("audioPlayer");
const currentSong = document.getElementById("currentSong");
const playButtons = document.querySelectorAll(".play-btn");
const stopBtn = document.getElementById("stopBtn");

let currentIndex = -1;


// =====================================
// 🎨 CREATE CONTROLLER INSIDE CARD
// =====================================

function createCardController(card) {

    // Remove old controller if it exists
    const oldController = card.querySelector(".card-music-controller");

    if (oldController) {
        oldController.remove();
    }


    const controller = document.createElement("div");

    controller.className = "card-music-controller";


    controller.innerHTML = `

        <div class="superman-track">

            <div class="superman-line"></div>

            <div class="superman" id="superman">
                
            </div>

        </div>


        <div class="music-time">

            <span class="current-time">
                0:00
            </span>

            <span class="total-time">
                0:00
            </span>

        </div>


        <div class="card-controls">

            <button class="card-play">
                ▶
            </button>

            <button class="card-stop">
                ⏹
            </button>

        </div>

    `;


    card.appendChild(controller);


    // =====================================
    // CARD PLAY BUTTON
    // =====================================

    const playBtn =
        controller.querySelector(".card-play");


    playBtn.addEventListener("click", function (event) {

        event.stopPropagation();


        // Find original play button
        const originalButton =
            card.querySelector(".play-btn");


        const index =
            Array.from(playButtons).indexOf(originalButton);


        if (index !== -1) {

            if (
                currentIndex === index &&
                !audioPlayer.paused
            ) {

                audioPlayer.pause();

            } else {

                playSong(index);

            }

        }

    });


    // =====================================
    // CARD STOP BUTTON
    // =====================================

    const cardStop =
        controller.querySelector(".card-stop");


    cardStop.addEventListener("click", function (event) {

        event.stopPropagation();

        stopSong();

    });


    return controller;
}


// =====================================
// 🎵 PLAY SONG
// =====================================

function playSong(index) {

    if (
        index < 0 ||
        index >= playButtons.length
    ) {
        return;
    }


    const button =
        playButtons[index];


    const song =
        button.dataset.song;


    const card =
        button.closest(".music-card");


    const title =
        card.querySelector("h2").textContent;


    // =====================================
    // REMOVE OLD PLAYING STATE
    // =====================================

    document
        .querySelectorAll(".music-card")
        .forEach(card => {

            card.classList.remove("playing");

            const old =
                card.querySelector(".card-music-controller");

            if (old) {
                old.remove();
            }

        });


    // =====================================
    // CURRENT CARD
    // =====================================

    card.classList.add("playing");


    const controller =
        createCardController(card);


    currentIndex =
        index;


    // =====================================
    // LOAD SONG
    // =====================================

    audioPlayer.src =
        song;


    currentSong.textContent =
        "🎶 Now Playing: " + title;


    // =====================================
    // PLAY
    // =====================================

    audioPlayer.play()
        .then(() => {

            updateCardPlayButton();

        })
        .catch(error => {

            console.log(
                "Play error:",
                error
            );

        });

}


// =====================================
// ▶ ORIGINAL PLAY BUTTONS
// =====================================

playButtons.forEach((button, index) => {

    button.addEventListener(
        "click",
        function () {

            playSong(index);

        }
    );

});


// =====================================
// ⏹ STOP SONG
// =====================================

function stopSong() {

    audioPlayer.pause();

    audioPlayer.currentTime = 0;


    // Remove playing glow
    document
        .querySelectorAll(".music-card")
        .forEach(card => {

            card.classList.remove("playing");

            const controller =
                card.querySelector(
                    ".card-music-controller"
                );

            if (controller) {
                controller.remove();
            }

        });


    currentSong.textContent =
        "🎶 No Song Selected";


    currentIndex = -1;

}


// =====================================
// MAIN STOP BUTTON
// =====================================

if (stopBtn) {

    stopBtn.addEventListener(
        "click",
        stopSong
    );

}


// =====================================
// ⏯ UPDATE PLAY / PAUSE BUTTON
// =====================================

function updateCardPlayButton() {

    const controller =
        document.querySelector(
            ".card-music-controller"
        );


    if (!controller) {
        return;
    }


    const button =
        controller.querySelector(
            ".card-play"
        );


    if (audioPlayer.paused) {

        button.textContent = "▶";

    } else {

        button.textContent = "⏸";

    }

}


// =====================================
// 🎵 AUDIO PLAY
// =====================================

audioPlayer.addEventListener(
    "play",
    function () {

        updateCardPlayButton();

    }
);


// =====================================
// ⏸ AUDIO PAUSE
// =====================================

audioPlayer.addEventListener(
    "pause",
    function () {

        updateCardPlayButton();

    }
);


// =====================================
// ⏱ FORMAT TIME
// =====================================

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secs =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(secs).padStart(2, "0")
    );

}


// =====================================
// 🎶 SONG DURATION LOADED
// =====================================

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        const controller =
            document.querySelector(
                ".card-music-controller"
            );


        if (!controller) {
            return;
        }


        const totalTime =
            controller.querySelector(
                ".total-time"
            );


        totalTime.textContent =
            formatTime(audioPlayer.duration);

    }
);


// =====================================
// 🦸 SUPERMAN + TIMELINE
// =====================================

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        const controller =
            document.querySelector(
                ".card-music-controller"
            );


        if (!controller) {
            return;
        }


        const currentTime =
            controller.querySelector(
                ".current-time"
            );


        const totalTime =
            controller.querySelector(
                ".total-time"
            );


        const superman =
            controller.querySelector(
                ".superman"
            );


        const line =
            controller.querySelector(
                ".superman-line"
            );


        currentTime.textContent =
            formatTime(audioPlayer.currentTime);


        totalTime.textContent =
            formatTime(audioPlayer.duration);


        // =====================================
        // CALCULATE SONG PROGRESS
        // =====================================

        if (
            audioPlayer.duration &&
            !isNaN(audioPlayer.duration)
        ) {

            const progress =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;


            // Superman moves with song
            superman.style.left =
                `calc(${progress}% - 15px)`;


            // Progress line
            line.style.width =
                progress + "%";


            // =====================================
            // SONG FINISHED
            // =====================================

            if (progress >= 99.9) {

                superman.textContent =
                    "🦸";

                superman.classList.add(
                    "superman-finished"
                );

            } else {

                superman.textContent =
                    "🦸";

                superman.classList.remove(
                    "superman-finished"
                );

            }

        }

    }
);


// =====================================
// 🖱 CLICK TIMELINE TO SEEK
// =====================================

document.addEventListener(
    "click",
    function (event) {

        const track =
            event.target.closest(
                ".superman-track"
            );


        if (!track) {
            return;
        }


        if (
            !audioPlayer.duration ||
            isNaN(audioPlayer.duration)
        ) {
            return;
        }


        const rect =
            track.getBoundingClientRect();


        const clickPosition =
            event.clientX - rect.left;


        const percentage =
            clickPosition / rect.width;


        audioPlayer.currentTime =
            percentage *
            audioPlayer.duration;

    }
);


// =====================================
// ⏭ AUTO NEXT SONG
// =====================================

audioPlayer.addEventListener(
    "ended",
    function () {

        currentIndex++;


        if (
            currentIndex <
            playButtons.length
        ) {

            playSong(currentIndex);

        } else {

            currentSong.textContent =
                "🎵 Playlist Finished";


            currentIndex = -1;


            document
                .querySelectorAll(".music-card")
                .forEach(card => {

                    card.classList.remove(
                        "playing"
                    );

                    const controller =
                        card.querySelector(
                            ".card-music-controller"
                        );

                    if (controller) {
                        controller.remove();
                    }

                });

        }

    }
);


// =====================================
// ❌ AUDIO ERROR
// =====================================

audioPlayer.addEventListener(
    "error",
    function () {

        currentSong.textContent =
            "❌ Unable to play this song";


        console.log(
            "Audio error. Check exact file path/name."
        );

    }
);


// =====================================
// 💌 MUSIC PAGE POPUP
// =====================================

window.addEventListener(
    "load",
    function () {

        const popup =
            document.createElement("div");


        popup.id =
            "musicWelcomePopup";


        popup.innerHTML = `

            <div class="music-popup-box">

                <div class="music-popup-icon">
                    💌
                </div>

                <h1>
                    🎵 Welcome to Music Zone
                </h1>

                <p>
                    Every song carries a special memory. ❤️
                </p>

                <button id="openMusicBtn">
                    🎵 OPEN MUSIC
                </button>

            </div>

        `;


        Object.assign(
            popup.style,
            {

                position: "fixed",

                inset: "0",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                background:
                    "rgba(0,0,0,0.75)",

                backdropFilter:
                    "blur(8px)",

                zIndex: "99999",

                padding: "20px"

            }
        );


        const box =
            popup.querySelector(
                ".music-popup-box"
            );


        Object.assign(
            box.style,
            {

                width:
                    "min(90vw,400px)",

                padding:
                    "35px 25px",

                borderRadius:
                    "25px",

                textAlign:
                    "center",

                background:
                    "linear-gradient(135deg,#ff1493,#8a2be2)",

                color:
                    "white",

                fontFamily:
                    "Arial,sans-serif",

                boxShadow:
                    "0 0 40px rgba(255,20,147,0.7)"

            }
        );


        const icon =
            popup.querySelector(
                ".music-popup-icon"
            );


        Object.assign(
            icon.style,
            {

                fontSize:
                    "70px",

                marginBottom:
                    "15px"

            }
        );


        const button =
            popup.querySelector(
                "#openMusicBtn"
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

                color:
                    "white",

                background:
                    "linear-gradient(45deg,#ff1493,#ff8c00)",

                cursor:
                    "pointer",

                boxShadow:
                    "0 0 20px rgba(255,255,255,0.5)"

            }
        );


        document.body.appendChild(
            popup
        );


        button.addEventListener(
            "click",
            function () {

                popup.remove();

            }
        );

    }
);