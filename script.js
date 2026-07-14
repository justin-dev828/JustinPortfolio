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


let index = 0;
let charIndex = 0;
let deleting = false;


const typing = document.getElementById("typing");


function type(){

    if(!typing) return;


    const current = texts[index];


    if(!deleting){


        typing.textContent =
        current.substring(0,charIndex);


        charIndex++;


        if(charIndex > current.length){


            deleting = true;


            setTimeout(type,1500);


            return;

        }


    } else {


        typing.textContent =
        current.substring(0,charIndex);


        charIndex--;



        if(charIndex < 0){


            deleting = false;


            index =
            (index + 1) % texts.length;


            charIndex = 0;


        }


    }


    setTimeout(
        type,
        deleting ? 60 : 100
    );

}


type();





// ================================
// Smooth Scroll Navigation
// ================================


document.querySelectorAll("nav a").forEach(link=>{


    link.addEventListener("click",e=>{


        const target =
        link.getAttribute("href");



        if(target && target.startsWith("#")){


            const section =
            document.querySelector(target);



            if(section){


                e.preventDefault();


                section.scrollIntoView({

                    behavior:"smooth"

                });


            }


        }


    });


});





// ================================
// Projekt Button
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
(e)=>{


    document.documentElement.style.setProperty(

        "--mouse-x",

        e.clientX + "px"

    );



    document.documentElement.style.setProperty(

        "--mouse-y",

        e.clientY + "px"

    );


});

// ================================
// Dark Mode
// ================================


const toggle =
document.getElementById("theme-toggle");


if(toggle){


    const savedTheme =
    localStorage.getItem("theme");



    if(savedTheme === "light"){


        document.body.classList.add("light");


    }




    toggle.addEventListener("click",()=>{


        document.body.classList.toggle("light");



        if(document.body.classList.contains("light")){


            localStorage.setItem(
                "theme",
                "light"
            );


        } else {


            localStorage.setItem(
                "theme",
                "dark"
            );


        }


    });


}






// ================================
// Mobile Menü
// ================================


const menu =
document.querySelector(".menu");


const nav =
document.getElementById("nav-links");



if(menu && nav){


    menu.addEventListener("click",()=>{


        nav.classList.toggle("active");


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



    canvas.width =
    window.innerWidth;


    canvas.height =
    window.innerHeight;



    let stars = [];



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






    window.addEventListener(
    "resize",
    ()=>{


        canvas.width =
        window.innerWidth;



        canvas.height =
        window.innerHeight;



    });


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


        repoBox.innerHTML += `


        <div class="glass-card">


            <h3>

            ${repo.name}

            </h3>



            <p>

            ${repo.description ?? "Keine Beschreibung"}

            </p>



            <a 
            href="${repo.html_url}" 
            target="_blank">


            Projekt ansehen


            </a>



        </div>


        `;


    });



})



.catch(()=>{


    repoBox.innerHTML =

    "❌ GitHub Projekte konnten nicht geladen werden";


});


}

// ================================
// Ladeanimation
// ================================


window.addEventListener("load",()=>{


    const loader =
    document.querySelector(".loader");



    if(loader){



        setTimeout(()=>{


            loader.style.opacity = "0";



            setTimeout(()=>{


                loader.style.display = "none";


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



.catch(()=>{


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
            "API Fehler"
        );


    }


    return response.json();


})



.then(data=>{



    githubCard.innerHTML = `



    <img

    src="${data.avatar}"

    class="github-avatar"

    alt="GitHub Profilbild"



    >




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



.catch(()=>{



    githubCard.innerHTML =



    "❌ GitHub Statistik konnte nicht geladen werden";



});



}








// ================================
// Bilder Lazy Loading
// ================================


document
.querySelectorAll("img")
.forEach(img=>{


    img.loading = "lazy";


});








// ================================
// Startmeldung
// ================================


console.log(

"🚀 JustinByte.exe Portfolio erfolgreich geladen"

);