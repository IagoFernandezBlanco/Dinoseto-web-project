// ESTADO DE LA APP

// Variable que me indica si el cielo está pintado o no
let estaPintado = false;
let modificado = false;

// Añadir una elemento HTML al DOM de forma dinámica

// Vamos a crear un "botón" que oculte o muestre el dinosaurio
// 1. Recuperar el nodo al que queremos asociar el evento 'click'
// 2. Asociar el evento click para que ejecuta una función
let botonChiste = document.querySelector("#nuevo-chiste");
let botonAovar = document.querySelector("#nuevo-huevo");
let botonEclosionar = document.querySelector("#eclosionar-todos");
let botonTiempo = document.querySelector("#cambiar-tiempo")

botonChiste.addEventListener("click", mostrarChisteNuevo);
botonAovar.onclick = aovar;
botonEclosionar.onclick = eclosionarHuevos;
botonTiempo.onclick = segundos;

let boton = document.querySelector("#dinoBoton");
boton.addEventListener("click", (event) => { // ES6
    console.log(event);
    // Recuperar el Nodo de la imagen del dinoseto
    // Modificar la propiedad style.display a 'none'
    let dinoImagen = document.querySelector("IMG");
    dinoImagen.style.display = "none";

});

// Vamos a crear en HTML un botón que nos va a permitir pintar el "cielo" (body) de color azul
// Este azul no lo vamos a poner como estilo en línea sino como una clase CSS

// 1. Seleccionar el elemento del DOM del boton id=pintar
// 2. Asociar un evento click y entonces añadir la clase "fondo" al nodo "body"

// 3. Si le doy al botón quiero pintar el cielo.
// Pero si le vuelvo a dar, quiero "limpiarlo"
// Lo quiero hacer usando el mismo botón 


// La primera vez que hacemos click pintamos el cielo azul; y cambiamos el texto a "Cielo Blanco"
// Si pulsamos "Cielo Blanco" el cielo debe volverse a poner blanco y el texto volver a "Cielo Azul"

let botonPintar = document.querySelector("#pintar");
botonPintar.addEventListener("click", (event) => {
    console.log(event);
    let body = document.querySelector("body");

    if (!estaPintado) {
        body.classList.add("fondo");
        actualizarTextoBotonPintarCielo("Cielo Blanco");
        estaPintado = true;
    }

    else {
        body.classList.remove("fondo");
        actualizarTextoBotonPintarCielo("Cielo Azul");
        estaPintado = false;
    }
});

// Queremos habilitar un area de texto para que todo lo que escriamos quede en un parte definida 

let cambiarTexto = document.querySelector("#cambiaTexto");
let segundosTexto = document.querySelector("#segundosTexto");

cambiarTexto.addEventListener("input", (event) => {
    // Recupero el texto introducido en el input
    let textoIntroducido = event.target.value;
    document.querySelector("#title").textContent = textoIntroducido;
    
})


function segundos(){
    let textoSegundos = document.querySelector("#segundosTexto").value;
    let segundosReales = textoSegundos * 1000;
    console.log(textoSegundos)
    let newTimeOut = setInterval(cambiarColorTitulo, segundosReales);
}




function actualizarTextoBotonPintarCielo(texto) {
    let botonPintar = document.querySelector("#pintar");
    botonPintar.textContent = texto;
}

/**
 * Añado un parámetro para especificar el tamaño del ancho del dinoseto
 * ancho es un variable del tipo string que tiene un formato "200px"
 */
function crearDinoSeto(ancho) {
    // 1. Identificar donde lo queremos añadir
    // 2. Crearlo. Establecer las propiedades del objeto
    // 3 Añadirlo como hijo del nodo del que queremos que "cuelgue"

    // Objetivo: Crar un tag IMG e introducirlo en el DOM.

    let contenedorDinoSeto = document.querySelector("#dinoseto");
    let imagenDinoseto = document.createElement("IMG");

    imagenDinoseto.src = "./img/dinoseto.png";
    imagenDinoseto.setAttribute("alt", "dinoseto vigo");

    if (ancho) {
        imagenDinoseto.style.width = ancho;
    }


    contenedorDinoSeto.appendChild(imagenDinoseto);
}



// Cuando hago doble click en un huevo, debe eclosionar

// Crar un botón que al hacer click pone un huevo
function aovar() {
    // 1. recuperar el elemento del DOM donde va el huevo
    // 2. Crear el huevo, un IMG
    // 3. Establecer sus atributos
    // 4 . Añadir el IMG como hijo del contenedor #dinoseto

    let dinoContenedor = document.querySelector("#dinoseto");
    let huevo = document.createElement("IMG");
   
    huevo.src = "./img/dinohuevo.png";
    huevo.alt = "huevo dinoseto";
    huevo.classList.add("huevo")

    huevo.addEventListener("dblclick", (event) => {
        event.target.src = "./img/eclosion.png";
        event.target.alt = "huevo eclosionado";
    });

    
    dinoContenedor.appendChild(huevo);
}

/*
1. Recuperar elemento DOM para el button
2. Recuperar DOM para la imagen del huevo, como hacerlo si no existe?
3. Crear metodo click, que cambie todos los huevos por una imagen especifica, de golpe
*/

function eclosionarHuevos(){
    let imagenHuevo = document.querySelectorAll(".huevo");
        for (i=0;i<imagenHuevo.length;i++){
        imagenHuevo[i].src ="./img/eclosion.png";
        }
    
}

function cambiarColorTitulo(){
    // 1. Calcular un color aleatorio hexadecimal
    let color = colorHexAleatorio();
    // 2. Recuperar el elemnto del DOM
    let titulo = document.querySelector("#title");
    // 3. Cambiar la propiedad style.color
    titulo.style.color = color;
};

async function mostrarChisteNuevo() {
    let chisteParrafo = document.querySelector("#chiste");

    // 2. Cuando lo pulsamos, hacemos una llamada a la API y nos trae un chiste en formato JSON
    let respuesta = await fetch("https://api.chucknorris.io/jokes/random");

    // 3. Tenemos que transformar ese JSON a un objeto para poderlo manipular
    let chiste = await respuesta.json();

    console.log("valor de la respuesta:", chiste);

    // 4. Extraer de ese objeto el campo .value y ponerlo en el textContent de nuestro párrafo
    chisteParrafo.textContent = chiste.value;

}
