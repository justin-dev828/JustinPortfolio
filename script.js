// =================================
// JustinByte.exe Portfolio
// script.js
// =================================


// ================================
// Schreibmaschinen-Effekt
// ================================

const texts = [
    "Developer 💻",
    "Discord Administrator 🤖",
    "Webdesigner 🌐",
    "Minecraft Fan 🎮",
    "Feuerwehr-Enthusiast 🚒"
];


let textIndex = 0;
let charIndex = 0;
let deleting = false;


const typing = document.getElementById("typing");


function typeWriter(){

    if(!typing) return;


    const currentText = texts[textIndex];


    if(!deleting){

        typing.textContent =
        currentText.substring(0,charIndex);


        charIndex++;


        if(charIndex > currentText.length){

            deleting = true;

            setTimeout(typeWriter,1500);

            return;

        }


    }else{


        typing.textContent =
        currentText.substring(0,charIndex);


        charIndex--;


        if(charIndex < 0){

            deleting = false;

            textIndex =
            (textIndex + 1) % texts.length;


            charIndex = 0;

        }

    }


    setTimeout(
        typeWriter,
        deleting ? 60 : 100
    );

}


typeWriter();








// ================================
// Smooth Scroll Navigation
// ================================


document
.querySelectorAll("nav a")
.forEach(link=>{


    link.addEventListener("click",event=>{


        const target =
        link.getAttribute("href");



        if(target && target.startsWith("#")){


            const section =
            document.querySelector(target);



            if(section){

                event.preventDefault();


                section.scrollIntoView({

                    behavior:"smooth"

                });


            }


        }


    });


});









// ================================
// Hero Projekt Button
// ================================


const projectButton =
document.querySelector(".hero button");



if(projectButton){


    projectButton.addEventListener("click",()=>{


        const projects =
        document.getElementById("projects");



        if(projects){


            projects.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


}









// ================================
// Maus Glow Effekt
// ================================


document.addEventListener(
"mousemove",
(event)=>{


    document.documentElement.style.setProperty(

        "--mouse-x",

        `${event.clientX}px`

    );


    document.documentElement.style.setProperty(

        "--mouse-y",

        `${event.clientY}px`

    );


});









// ================================
// Dark Mode
// ================================


const themeToggle =
document.getElementById("theme-toggle");



if(themeToggle){


    const savedTheme =
    localStorage.getItem("theme");



    if(savedTheme === "light"){

        document.body.classList.add("light");

        themeToggle.textContent = "☀️";

    }





    themeToggle.addEventListener("click",()=>{


        document.body.classList.toggle("light");



        const isLight =
        document.body.classList.contains("light");



        localStorage.setItem(

            "theme",

            isLight ? "light" : "dark"

        );



        themeToggle.textContent =

        isLight ? "☀️" : "🌙";



    });


}







// ================================
// Mobile Menü
// ================================


const menuButton =
document.querySelector(".menu");


const navigation =
document.getElementById("nav-links");



if(menuButton && navigation){


    menuButton.addEventListener("click",()=>{


        navigation.classList.toggle("active");


    });


}

// ================================
// Sterne Hintergrund
// ================================


const canvas =
document.getElementById("stars");



if(canvas){


    const ctx =
    canvas.getContext("2d");



    let stars = [];



    function resizeCanvas(){


        canvas.width =
        window.innerWidth;


        canvas.height =
        window.innerHeight;


    }



    resizeCanvas();



    window.addEventListener(
        "resize",
        resizeCanvas
    );





    for(let i = 0; i < 150; i++){


        stars.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 2

        });


    }





    function animateStars(){


        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );



        ctx.fillStyle = "white";



        stars.forEach(star=>{


            ctx.beginPath();



            ctx.arc(

                star.x,

                star.y,

                star.size,

                0,

                Math.PI * 2

            );



            ctx.fill();



            star.y += 0.2;



            if(star.y > canvas.height){

                star.y = 0;

            }


        });



        requestAnimationFrame(
            animateStars
        );


    }



    animateStars();


}









// ================================
// GitHub Projekte laden
// ================================


const repoBox =
document.getElementById("repos");



if(repoBox){


    fetch(
        "https://api.github.com/users/justin-dev828/repos"
    )


    .then(response=>{


        if(!response.ok){

            throw new Error(
                "GitHub API Fehler"
            );

        }


        return response.json();


    })


    .then(repos=>{


        repoBox.innerHTML = "";



        repos
        .slice(0,6)
        .forEach(repo=>{


            const safeDescription =

            (repo.description ?? "Keine Beschreibung")

            .replace(/</g,"&lt;")

            .replace(/>/g,"&gt;");





            repoBox.innerHTML += `


            <div class="glass-card">


                <h3>

                ${repo.name}

                </h3>



                <p>

                ${safeDescription}

                </p>



                <a

                href="${repo.html_url}"

                target="_blank"

                rel="noopener noreferrer">


                Projekt ansehen


                </a>



            </div>


            `;



        });



    })


    .catch(error=>{


        console.error(error);



        repoBox.innerHTML =

        "❌ GitHub Projekte konnten nicht geladen werden";


    });


}









// ================================
// Ladeanimation
// ================================


window.addEventListener(
"load",
()=>{


    const loader =
    document.querySelector(".loader");



    if(loader){


        setTimeout(()=>{


            loader.style.opacity = "0";



            setTimeout(()=>{


                loader.style.display =
                "none";


            },500);



        },2500);


    }


});









// ================================
// Discord Status (Lanyard API)
// ================================


const discordID =
"1400088747894378711";



const discordText =
document.getElementById("discord-text");



if(discordText){


    fetch(

        `https://api.lanyard.rest/v1/users/${discordID}`

    )



    .then(response=>{


        if(!response.ok){

            throw new Error(
                "Discord API Fehler"
            );

        }


        return response.json();


    })



    .then(data=>{


        const user =
        data.data;



        let activity =
        "Keine Aktivität";



        if(user.activities.length > 0){


            activity =
            user.activities[0].name;


        }



        discordText.innerHTML = `

        🟢 Online

        <br>

        🎮 ${activity}

        `;


    })



    .catch(error=>{


        console.error(error);



        discordText.innerHTML =

        "⚫ Discord Status nicht verfügbar";


    });


}
// ================================
// Eigene GitHub Statistik
// Vercel API
// ================================


const githubCard =
document.getElementById("github-card");



if(githubCard){


    fetch("/api/github")



    .then(response=>{


        if(!response.ok){

            throw new Error(
                "GitHub API Fehler"
            );

        }


        return response.json();


    })



    .then(data=>{


        githubCard.innerHTML = `


        <img

        src="${data.avatar}"

        class="github-avatar"

        alt="GitHub Profilbild von ${data.username}"

        loading="lazy">


        <h3>

        ${data.username}

        </h3>



        <p>

        📦 ${data.repos} öffentliche Projekte

        </p>



        <p>

        👥 ${data.followers} Follower

        </p>



        <p>

        ➡️ Folgt ${data.following} Personen

        </p>


        `;


    })



    .catch(error=>{


        console.error(error);



        githubCard.innerHTML =

        "❌ GitHub Statistik konnte nicht geladen werden";


    });


}









// ================================
// Bilder Lazy Loading
// ================================


document
.querySelectorAll("img")
.forEach(image=>{


    image.loading = "lazy";


});









// ================================
// Kontaktformular
// Vercel API + Resend Backend
// ================================


const contactForm =
document.getElementById("contact-form");



if(contactForm){


    contactForm.addEventListener(
        "submit",
        async(event)=>{


        event.preventDefault();



        const formData =
        new FormData(contactForm);



        const data = {


            name:
            formData.get("name"),


            email:
            formData.get("email"),


            message:
            formData.get("message")


        };



        try{


            const response =
            await fetch(
                "/api/contact",
                {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json"


                },


                body:
                JSON.stringify(data)


                }

            );





            if(response.ok){


                alert(
                    "Nachricht erfolgreich gesendet ✅"
                );


                contactForm.reset();



            }else{


                alert(
                    "Fehler beim Senden ❌"
                );


            }



        }catch(error){


            console.error(error);



            alert(
                "Server nicht erreichbar ❌"
            );


        }



    });


}









// ================================
// Performance Verbesserungen
// ================================


// Externe Links absichern

document
.querySelectorAll(
'a[target="_blank"]'
)
.forEach(link=>{


    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );


});









// ================================
// Startmeldung
// ================================


console.log(

"🚀 JustinByte.exe Portfolio erfolgreich geladen"

);

async function loginBio(){

const password =
document.getElementById("bio-password").value;


const response = await fetch("/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
password
})

});


const data = await response.json();


if(data.success){

window.location.href="private-bio.html";

}else{

document.getElementById("bio-message").innerHTML =
"❌ Falsches Passwort";

}

}
