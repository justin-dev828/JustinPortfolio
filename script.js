// ===============================
// JustinByte.exe Portfolio
// script.js
// ===============================

// Schreibmaschinen-Effekt
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

function type() {

    if (!typing) return;

    const current = texts[index];

    if (!deleting) {

        typing.textContent = current.substring(0, charIndex);
        charIndex++;

        if (charIndex > current.length) {
            deleting = true;
            setTimeout(type, 1500);
            return;
        }

    } else {

        typing.textContent = current.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            deleting = false;
            index = (index + 1) % texts.length;
            charIndex = 0;
        }

    }

    setTimeout(type, deleting ? 60 : 100);
}

type();

// Sanftes Scrollen für alle Menülinks
document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = this.getAttribute("href");

        if (target.startsWith("#")) {

            e.preventDefault();

            const section = document.querySelector(target);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }

    });

});

// Button "Projekte ansehen"
const projectButton = document.querySelector(".hero button");

if (projectButton) {

    projectButton.addEventListener("click", () => {

        const section = document.getElementById("projects");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}

console.log("JustinByte.exe Portfolio erfolgreich geladen.");

document.addEventListener("mousemove", (e)=>{

    document.documentElement.style.setProperty(
        "--mouse-x",
        e.clientX + "px"
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        e.clientY + "px"
    );

});

const toggle =
document.getElementById("theme-toggle");


toggle.addEventListener(
"click",
()=>{

document.body.classList.toggle("light");

});

const menu =
document.querySelector(".menu");


const nav =
document.getElementById("nav-links");


menu.onclick = ()=>{

nav.classList.toggle("active");

};

const canvas =
document.getElementById("stars");


const ctx =
canvas.getContext("2d");


canvas.width=innerWidth;

canvas.height=innerHeight;


let stars=[];


for(let i=0;i<150;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*2

});

}



function animateStars(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);


ctx.fillStyle="white";


stars.forEach(s=>{


ctx.beginPath();

ctx.arc(
s.x,
s.y,
s.size,
0,
Math.PI*2
);


ctx.fill();


s.y+=0.2;


if(s.y>canvas.height)
s.y=0;


});


requestAnimationFrame(animateStars);


}


animateStars();

fetch(
"https://api.github.com/users/justin-dev828/repos"
)

.then(res=>res.json())

.then(data=>{


let box=document.getElementById("repos");


data.slice(0,6).forEach(repo=>{


box.innerHTML+=`

<div class="glass-card">

<h3>${repo.name}</h3>

<p>${repo.description ?? "Keine Beschreibung"}</p>

<a href="${repo.html_url}">
Projekt ansehen
</a>

</div>


`;


});


});

window.addEventListener("load",()=>{


setTimeout(()=>{


document.querySelector(".loader").style.display="none";


},2500);


});

const discordID="1400088747894378711";


fetch(
`https://api.lanyard.rest/v1/users/${discordID}`
)

.then(res=>res.json())

.then(data=>{


let status=data.data;


let text=document.getElementById(
"discord-text"
);



if(status.activities.length){

text.innerHTML=

`
🟢 Online<br>

${status.activities[0].name}

`;

}

else{

text.innerHTML=

"🟢 Online";

}



});