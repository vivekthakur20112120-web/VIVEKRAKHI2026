// ======================================
// RAKHI 2026 WEBSITE JAVASCRIPT
// Made with ❤️ by Vivek
// ======================================


document.addEventListener("DOMContentLoaded", function(){



    // ==============================
    // Typing Effect For Main Heading
    // ==============================


    const heading =
    document.querySelector("h1");


    if(heading){


        let text =
        heading.innerText;


        heading.innerText="";


        let index=0;



        function typing(){


            if(index < text.length){


                heading.innerHTML += text.charAt(index);


                index++;


                setTimeout(
                    typing,
                    100
                );


            }


        }


        typing();


    }







    // ==============================
    // Button Animation
    // ==============================


    const buttons =
    document.querySelectorAll("button");



    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            function(){


                this.style.transform=
                "scale(0.9)";



                setTimeout(()=>{


                    this.style.transform=
                    "scale(1)";


                },200);



            }
        );


    });







    // ==============================
    // Smooth Scroll For Letter
    // ==============================


    const letterLink =
    document.querySelector(
        'a[href="#letter"]'
    );



    if(letterLink){


        letterLink.addEventListener(
            "click",
            function(e){


                e.preventDefault();



                document
                .querySelector("#letter")
                .scrollIntoView({


                    behavior:"smooth"


                });



            }
        );


    }







    // ==============================
    // Letter Animation
    // ==============================


    const letter =
    document.querySelector(
        ".letter-card"
    );



    if(letter){


        letter.style.opacity="0";


        letter.style.transform=
        "translateY(50px)";



        window.addEventListener(
            "scroll",
            function(){


                let position =
                letter.getBoundingClientRect()
                .top;



                let screen =
                window.innerHeight;



                if(position < screen-100){


                    letter.style.transition=
                    "1s ease";


                    letter.style.opacity="1";


                    letter.style.transform=
                    "translateY(0)";


                }


            }
        );


    }







    // ==============================
    // Image Click Effect
    // ==============================


    const images =
    document.querySelectorAll("img");



    images.forEach(image=>{


        image.style.transition=
        "0.3s";



        image.addEventListener(
            "mouseenter",
            function(){


                this.style.transform=
                "scale(1.08)";


            }
        );



        image.addEventListener(
            "mouseleave",
            function(){


                this.style.transform=
                "scale(1)";


            }
        );


    });







    // ==============================
    // Welcome Message (Auto Hide)
    // ==============================


    setTimeout(()=>{


        const welcome =
        document.createElement("div");


        welcome.innerHTML = `

        <div class="welcome-message">

        🎀 Welcome to RAKHI2026 ❤️
        <br>
        A special gift from Vivek to his lovely sisters 🌸

        </div>

        `;


        document.body.appendChild(welcome);



        setTimeout(()=>{


            welcome.remove();


        },3000);



    },1000);







    console.log(
    "❤️ RAKHI2026 Website Loaded Successfully"
    );


});