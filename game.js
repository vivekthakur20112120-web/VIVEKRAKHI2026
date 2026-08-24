// ======================================
// RAKSHA BANDHAN game ZONE JAVASCRIPT
// Made with ❤️ by Vivek
// ======================================


document.addEventListener(
"DOMContentLoaded",
function(){



    // ==============================
    // game Zone Welcome Message
    // ==============================


    setTimeout(()=>{


        const welcome =
        document.createElement("div");


        welcome.className =
        "game-welcome";


        welcome.innerHTML = `

        🎮 Welcome To  game Zone 🎮
        <br>
        Play beautiful game made with ❤️
        
        `;



        document.body.appendChild(welcome);



        setTimeout(()=>{


            welcome.classList.add(
                "remove"
            );


            setTimeout(()=>{

                welcome.remove();

            },800);



        },3000);



    },800);







    // ==============================
    // Button Animation
    // ==============================


    const buttons =
    document.querySelectorAll("button");



    buttons.forEach(button=>{


        button.addEventListener(
        "click",
        function(){


            this.style.transform =
            "scale(0.9)";


            setTimeout(()=>{


                this.style.transform =
                "scale(1)";


            },150);



        });


    });







    // ==============================
    // Floating Sparkles
    // ==============================


    function createSparkle(){


        const sparkle =
        document.createElement("span");


        sparkle.innerHTML="✨";


        sparkle.style.position="fixed";

        sparkle.style.left =
        Math.random()*100+"vw";


        sparkle.style.top="100vh";


        sparkle.style.fontSize =
        Math.random()*20+15+"px";


        sparkle.style.animation =
        "sparkleMove 5s linear";



        sparkle.style.pointerEvents="none";


        document.body.appendChild(
            sparkle
        );



        setTimeout(()=>{


            sparkle.remove();


        },5000);



    }




    setInterval(
        createSparkle,
        800
    );







    console.log(
    "🎮 game Zone Loaded Successfully ❤️"
    );


});