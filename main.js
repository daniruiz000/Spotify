
const list = [
    {
        id: 0,
        author: "C.Tangana",
        title: "Me Maten",
        cover: "tangana_cover.png",
        duration: 10
    },
    {
        id: 1,
        author: "Rosalía",
        title: "Despechá",
        cover: "rosalia_cover.png",
        duration: 5
    },
    {
        id: 2,
        author: "Shakira",
        title: "Te felicito",
        cover: "shakira_cover.png",
        duration: 8
    },
    {
        id: 3,
        author: "Quevedo",
        title: "Quédate",
        cover: "quevedo_cover.png",
        duration: 12
    },
    {
        id: 4,
        author: "Bad Bunny",
        title: "Tití me preguntó",
        cover: "bad_cover.png",
        duration: 20
    }
];


//Variables:

let orden = 0;
let isplaying = false;
let loop = false;



//Indentificación:

let elementImg = document.getElementsByClassName('tarjeta__img')[0];
let elementCancion = document.getElementsByClassName('tarjeta__cancion')[0];
let elementCantante = document.getElementsByClassName('tarjeta__cantante')[0];
let elementStartTime = document.getElementsByClassName('tarjeta__start-time')[0];
let elementDuracion = document.getElementsByClassName('tarjeta__end-time')[0];
let elementBarra = document.getElementsByClassName('tarjeta__barra')[0];
let elementProgresoBarra = document.getElementsByClassName('tarjeta__barra-progreso')[0];
let elementShuffle = document.getElementsByClassName('tarjeta__shuffle')[0];
let elementRepeat = document.getElementsByClassName('tarjeta__repeat')[0];
let elementBackward = document.getElementsByClassName('tarjeta__back')[0];
let elementReproduccion = document.getElementsByClassName('tarjeta__reproduccion')[0];
let elementNext = document.getElementsByClassName('tarjeta__next')[0];



//Funciones:

// Pasa los segundos a minutos:
let pasarMinutos  = (s) => {
    const minutes = (Math.floor(s / 60) < 10) ? '0' + Math.floor(s / 60) : Math.floor(s / 60);
    const seconds = (Math.floor(s % 60) < 10) ? '0' + Math.floor(s % 60) : Math.floor(s % 60);
    return minutes + ':' + seconds;
};

//Dar un número aleatorio:
let numeroAleatorio =(min, max)=> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};




let progress = () => {
    elementStartTime++;
    elementProgresoBarra.setAttribute
};

let pintarCancion = (id) => {
    elementCancion.textContent = list[id].title;
    elementCantante.textContent = list[id].author;
    elementImg.src = './assets/'+ list[id].cover;
    elementDuracion.textContent = pasarMinutos(list[id].duration);
};


let reproductorControles = (arg) => {
    switch (arg) {
        case 'play':
            if(!isplaying){
                elementReproduccion.classList.replace('fa-play','fa-pause');
                isplaying = true;
                progress();
            }else{
                elementReproduccion.classList.replace('fa-pause','fa-play');
                isplaying = false;
            }
            break;
            
        case 'backward':
            orden = (orden === 0)? list.length - 1: orden -1;
            pintarCancion(orden);
            break;

        case 'next':
            orden = (orden === list.length -1 )? 0: orden + 1;
            pintarCancion(orden);
            break;

        case 'shuffle':
            orden = numeroAleatorio(0,list.length - 1);
            pintarCancion(orden);
            break;
            
        case 'repeat':
            pintarCancion(orden);
            break;
            
    
    
       
    }
};

elementReproduccion.addEventListener("click", () => reproductorControles('play'));
elementBackward.addEventListener("click", () => reproductorControles('backward'));
elementNext.addEventListener("click", () => reproductorControles('next'));
elementShuffle.addEventListener("click", () => reproductorControles('shuffle'));
elementRepeat.addEventListener("click", () => reproductorControles('repeat'));

pintarCancion(0);

