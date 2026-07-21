/*==================================================
            SCRIPT.JS - PARTE 1
===================================================*/


//======================================
// PARTICULAS
//======================================

const particles = document.getElementById("particles");

function createParticle(){

    const particle = document.createElement("span");

    particle.classList.add("particle");

    const size = Math.random()*8+3;

    particle.style.width = size+"px";
    particle.style.height = size+"px";

    particle.style.left = Math.random()*window.innerWidth+"px";

    particle.style.animationDuration =
        (Math.random()*8+8)+"s";

    particle.style.opacity =
        Math.random();

    particles.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },16000);

}

setInterval(createParticle,180);


//======================================
// CURSOR DE LUZ
//======================================

const light = document.getElementById("cursor-light");

document.addEventListener("mousemove",(e)=>{

    light.style.left=e.clientX+"px";

    light.style.top=e.clientY+"px";

});


//======================================
// EFECTO 3D BANDERAS
//======================================

const cards=document.querySelectorAll(".country");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const centerX=rect.width/2;

const centerY=rect.height/2;

const rotateX=-(y-centerY)/18;

const rotateY=(x-centerX)/18;

card.style.transform=`

perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

scale(1.05)

`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=`

perspective(1000px)

rotateX(0deg)

rotateY(0deg)

scale(1)

`;

});

});


//======================================
// ANIMACION AL CARGAR
//======================================

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});


//======================================
// EFECTO HOVER IMAGEN
//======================================

const flags=document.querySelectorAll(".country img");

flags.forEach(flag=>{

flag.addEventListener("mouseenter",()=>{

flag.style.transform="scale(1.12) rotate(-2deg)";

});

flag.addEventListener("mouseleave",()=>{

flag.style.transform="scale(1)";

});

});


//======================================
// TITULO FLOTANTE
//======================================

const title=document.querySelector("header h1");

let angle=0;

setInterval(()=>{

angle+=0.03;

title.style.transform=

`translateY(${Math.sin(angle)*4}px)`;

},25);


//======================================
// SOMBRA DINAMICA
//======================================

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=(e.clientX-rect.left)/rect.width;

const y=(e.clientY-rect.top)/rect.height;

card.style.boxShadow=

`${(x-.5)*30}px ${(y-.5)*30}px 45px rgba(0,0,0,.45)`;

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="0 20px 45px rgba(0,0,0,.35)";

});

}); 
/*==================================================
            SCRIPT.JS - PARTE 2
===================================================*/


//======================================
// BOTONES
//======================================

const btnCompare = document.getElementById("btnCompare");

const btnRefs = document.getElementById("btnRefs");

const comparison = document.getElementById("comparison");

const references = document.getElementById("references");

let comparisonVisible = true;


//======================================
// MOSTRAR / OCULTAR TABLA
//======================================

btnCompare.addEventListener("click",()=>{

    comparisonVisible = !comparisonVisible;

    if(comparisonVisible){

        comparison.style.maxHeight="3000px";

        comparison.style.opacity="1";

        comparison.style.transform="translateY(0px)";

        btnCompare.innerHTML="<span>📊 Ocultar comparación</span>";

    }else{

        comparison.style.maxHeight="0";

        comparison.style.opacity="0";

        comparison.style.transform="translateY(-40px)";

        btnCompare.innerHTML="<span>📊 Ver comparación</span>";

    }

});


//======================================
// IR A REFERENCIAS
//======================================

btnRefs.addEventListener("click",()=>{

    references.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

});


//======================================
// EFECTO RIPPLE
//======================================

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=button.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

const x=e.clientX-rect.left-size/2;

const y=e.clientY-rect.top-size/2;

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=x+"px";

ripple.style.top=y+"px";

ripple.classList.add("ripple-effect");

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


//======================================
// ANIMACION TARJETAS
//======================================

const compareCards=document.querySelectorAll(".compare-card");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show-card");

}

});

},{

threshold:.15

});

compareCards.forEach(card=>{

observer.observe(card);

});


//======================================
// EFECTO HOVER TARJETAS
//======================================

compareCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform=

"translateY(-10px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"translateY(0px) scale(1)";

});

});


//======================================
// CONTADOR DE FILAS
//======================================

let rows=document.querySelectorAll(".compare-card");

console.log(

"Total de comparaciones:",

rows.length

);


//======================================
// ANIMACION REFERENCIAS
//======================================

const refCards=document.querySelectorAll(".ref-card");

refCards.forEach((card,index)=>{

card.style.animationDelay=(index*.15)+"s";

});
