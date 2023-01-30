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


// Variables globales
let contador = 0;       // controla el número de segundos reproducido
let order = 0;          // controla el id de la canción actual
let timer = null;       // controla el intervalo
let isPlaying = false;  // controla si está en pausa o reproduciéndose
let loop = false;       // controla si está pulsado el botón de repetir
let random = false;     // controla si está pulsado el botón de aleatorio


// Identificador de las secciones del HTML necesarias
const title = document.querySelector(".card__title");
const author = document.querySelector(".card__author");
const cover = document.querySelector(".card__album-cover");
const timeStart = document.querySelector(".bar__current");
const timeDuration = document.querySelector(".bar__last");
const currentTimeIndicator = document.querySelector(".bar__current");
const leftTimeIndicator = document.querySelector(".bar__last");
const progressBar = document.querySelector(".bar__status");
const playBtn = document.querySelector(".controls__play");
const backwardBtn = document.querySelector(".controls__backward");
const forwardBtn = document.querySelector(".controls__forward");
const loopBtn = document.querySelector(".fa-shuffle");
const randomBtn = document.querySelector(".fa-rotate-right");


// Controlador botones reproducción
const controls = (button) => {
    // Controlamos que si está pulsado el botón de random, se seleccione canción aleatoria
    if( (button == 'forward' || button == 'backward') && random){
        button = 'random';
    }
    // Dependiendo del botón pulsado haremos...
    switch (button) {
        case 'play':
            //Cambio el botón, si está en pausa reproduce, si no para el intervalo
            if (!isPlaying) {
                //Función que pasa como argumentos la clase a buscar y el remplazo que tiene que hacer
                changeButton(".fa-play", "fa-play", "fa-pause");
                //Llamamos a la función que inicia el intervalo
                showTime();
            } else {
                //Función que pasa como argumentos la clase a buscar y el remplazo que tiene que hacer
                changeButton(".fa-pause", "fa-pause", "fa-play");
                //Para el intervalo
                clearInterval(timer);
            }
            isPlaying = !isPlaying; //Invierto la variable, de true a false o viceversa
            break;
        case 'forward':
            if (loop == true) { barControls('loop') }; //Si está el loop activado y le doy a la siguiente canción lo que hago es desactivar el loop
            order = (order >= list.length - 1) ? 0 : order + 1; //Sumo uno cada vez que pulso el next
            changeDataSong(order); //Llamo a la función que cambia titulo, artista, caratula...
            break;
        case 'backward':
            if (loop == true) barControls('loop'); //Si está el loop activado y le doy a la siguiente canción lo que hago es desactivar el loop
            order = (order == 0) ? list.length - 1 : order - 1; //Resto uno cada vez que pulso el next
            changeDataSong(order);  //Llamo a la función que cambia titulo, artista, caratula...
            break;
        case 'repeat':
            changeDataSong(order); //Llamo a la función que cambia titulo, artista, caratula...
            break;
        case 'random':
            let newOrder;
            // Llamamos a la función de generar número aleatorio hasta que no toque la misma posición del array en la que estamos
            do{
                newOrder =  Math.floor(Math.random() * (list.length)) ;
            } while (newOrder == order);
            order = newOrder; // Asignamos esa nueva posición a order
            changeDataSong(order); //Llamo a la función que cambia titulo, artista, caratula...
            break;
    }
}


// Control cambio de botones. Busco el elemento y cambio los textos que quiero. Lo utilizo para cambiar entre el pause y el play además de utilizarlo para cambiar los estilos de los botones cuando están y no están seleccionados
const changeButton = (classToSearch, classToReplace, replaceClass ) => {
    let element = document.querySelector(classToSearch);
    element.classList.replace(classToReplace,replaceClass);
}

// Control barra de reproducción. Controla si está pulsado o no el loop y el random.
const barControls = (button) => {
    switch(button){
        case 'loop':
            if (loop) {
                changeButton(".fa-rotate-right", "bar__button--selected", "bar__button--no-selected");
            } else {
                changeButton(".fa-rotate-right", "bar__button--no-selected", "bar__button--selected");
            }
            loop = !loop;
            break;
        case 'random':
            if (random) {
                changeButton(".fa-shuffle", "bar__button--selected", "bar__button--no-selected");
            } else {
                changeButton(".fa-shuffle", "bar__button--no-selected", "bar__button--selected");
            }
            random = !random;
            break;
        default:
            console.log('why???');
    }
}

// Intervalo de reproducción de canción
const showTime = () => timer = setInterval(() => changeBar(), 1000);

// Control de cambios en la barra de reproducción
const changeBar = () => {
    if (list[order].duration - contador <= 0) {
        if (loop) {
            controls('repeat');
        } else if(random) {
            controls('random');
        } else {
            controls('forward');
        }
    } else {
        contador += 1;
        timeStart.textContent = getMinutes(contador);
        progressBar.style.width = (contador / list[order].duration) * 100 + '%';
    }
}


// Modificación en caso de cambio de canción
const changeDataSong = (id) => {
    timeStart.textContent = '00:00';
    contador = 0;
    progressBar.style.width = 0;
    timeDuration.textContent = getMinutes(list[id].duration);
    title.textContent = list[id].title;
    author.textContent = list[id].author;
    cover.src = './assets/'+ list[id].cover;
}

// Pasa los segundos a minutos
const getMinutes = (s) => {
    const minutes = (Math.floor(s / 60) < 10) ? '0' + Math.floor(s / 60) : Math.floor(s / 60);
    const seconds = (Math.floor(s % 60) < 10) ? '0' + Math.floor(s % 60) : Math.floor(s % 60);
    return minutes + ':' + seconds;
}

// asignación de eventlisteners
playBtn.addEventListener("click", () => controls('play'));
backwardBtn.addEventListener("click", () => controls('backward'));
forwardBtn.addEventListener("click", () => controls('forward'));
randomBtn.addEventListener("click", () => barControls('loop'));
loopBtn.addEventListener("click", () => barControls('random'));

// inicializamos el reproductor
const init = () => {
    changeDataSong(order);
}

// Iniciamos nuestro programa
init();