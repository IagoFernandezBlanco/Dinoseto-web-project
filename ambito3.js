let pezEncontrado = false;
let pezBuscado = "Nemo";
let peces = ["Nemo", "Dory"];
let i = 0;

while (!pezEncontrado && i < peces.length) {

    if (peces[i] == pezBuscado) {
        let mensaje = "He encontrado el pez!!";
        console.log("He encontrado el pez!!!");
        pezEncontrado = true;
    }

    i++;

}

// Si descomento la línea 18 va a dar un error, porque la variable 'mensaje' está definida dentro del while y su ámbito es local
//console.log("MEnsaje de la variabl definida dentro del while", mensaje);