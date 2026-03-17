
// const nombre = prompt("What's you name?");

// alert("Hola " + nombre);

//---------------------------------------------- 


// var numero = 2;
// numero **= 5;

// document.write(numero);

//---------------------------------------------- 

// saludo = "Hola boludo! ";
// pregunta = "Como estas?";

// numero1 = 89;
// numero2 = 20;

// frase = "" + numero1 + numero2;

// document.write(frase);

//---------------------------------------------- 

// let numero = Math.floor(Math.random() * 10) + 1;

// let intento = prompt("Adivina el numero (entre 1 y 10):");

// if(parseInt(intento) === numero){
//     alert("Adivinaste Carnal :) el 4numero era: " + numero );
// } else {
//     alert("La cagaste carnal:( el numero era: " + numero);
// }

//---------------------------------------------- 

// let numeroSecreto = Math.floor(Math.random() * 10) + 1;

// let aux = false;

// for(let i = 1; i <= 3; i++){
//     let intento = prompt("Intento " + i + ": Adivina el numero (entre 1 y 10)");

//     var numeroUsuario = parseInt(intento);
    
//     if(numeroUsuario === numeroSecreto){
//         alert(" 🎉 Felicidades! :) Lo adivinaste en el intento: " + i + "El numero era el: " + numeroSecreto);
//         aux = true;
//         break;
//     } else if (numeroUsuario < numeroSecreto) {
//         alert("❗ El número secreto es MAYOR que " + numeroUsuario);
//     } else if (numeroUsuario > numeroSecreto) {
//         alert("❗ El número secreto es MENOR que " + numeroUsuario);
//     } else {
//         alert("⚠️ Eso no es un número válido");
//     }
// }

// if(!aux){
//     alert(" 💀 Se acabron los intentos. El numero era " + numeroSecreto);
// }

//---------------------------------------------- 

// let frutas = ["manzana","banana","guayaba"];

// let lista = document.getElementById("listaFrutas");

// for(var i = 0; i < frutas.length; i++){
    
//     let item = document.createElement("li");
//     item.innerText = frutas[i];

//     lista.appendChild(item);
// }

// let cantidad = document.createElement("p");
// cantidad.innerText = "Cantidad de Frutas: " + frutas.length;
// document.body.appendChild(cantidad);

//--------------------------------------------------------------------------------

// function generarNumeroAleatorio(min,max){
//     return Math.floor(Math.random() * (max-min +1) + min);
// }

// function pedirNumero(intentoActual, totalIntentos, min, max){
//     let mensaje = "intento " + intentoActual + " de " + totalIntentos + ": Adivina el numero (entre " + min + " y " + max + ")";

//     return parseInt(prompt(mensaje))
// }

// function jugarAdivinanza(intentosMaximos, min, max){
//     let numeroSecreto = generarNumeroAleatorio(min,max)
//     let acertado = false;

//     for(var i = 1; i <= intentosMaximos; i++){

//         var numeroUsuario = pedirNumero(i, intentosMaximos, min, max)

//         if(numeroSecreto === numeroUsuario){
//             alert("🎉 ¡Felicidades! Lo adivinaste en el intento " + i);
//             acertado = true;
//             break;
//         } else if  (numeroUsuario < numeroSecreto){
//              alert("❗ El número secreto es MAYOR que " + numeroUsuario);
//         } else if (numeroUsuario > numeroSecreto) {
//             alert("❗ El número secreto es MENOR que " + numeroUsuario);
//         } else {
//             alert("⚠️ Eso no es un número válido");
//         }
//     }

//        if (!acertado) {
//         alert("💀 Se acabaron los intentos. El número era " + numeroSecreto);
//     }

// }

// jugarAdivinanza(3, 1, 10);

//--------------------------------------------------------------------------------

var min = 1;
var max = 10;
var intentosMaximos = 3;
var intentosUsados = 0;
var numeroSecreto = generarNumeroAleatorio(min,max);
var juegoTerminado = false;

document.getElementById("rango").innerText = `${min} y ${max}`;
document.getElementById("intentosRestanes").innerText = `Te quedan ${intentosMaximos} intentos`;

function generarNumeroAleatorio(min,max){
    return Math.floor(Math.random() * (max-min + 1)) +min;
}


function verificarIntento(){
    

    if(juegoTerminado) return;

    let numeroUsuario = parseInt (document.getElementById("entradaNumero").value);
    let mensaje = "";

    if(isNaN(numeroUsuario)){
        mensaje = "⚠️ Por favor ingresa un número válido.";
    } else {
        intentosUsados++;

        if(numeroUsuario === numeroSecreto){
            mensaje = `🎉 ¡Felicidades! Adivinaste el número ${numeroSecreto} en el:  ${intentosUsados} intento(s).`;
        } else if (numeroUsuario < numeroSecreto) {
            mensaje = `El nuemro secreto es MAYOR que ${numeroUsuario}.`;
        } else {
            mensaje = `El nuemro secreto es MENOR que ${numeroUsuario}.`;
        }

        let intentosRestanes = intentosMaximos - intentosUsados;
        document.getElementById("intentosRestanes").innerText = `Te quedan ${intentosRestanes} intentos`;

        if(intentosRestanes <= 0 && !juegoTerminado){
            mensaje = `💀 Se acabaron los intentos. El número era ${numeroSecreto}.`;
            juegoTerminado = true
        }
    }

    console.log('holiiii',min,max,intentosMaximos, intentosUsados )


    document.getElementById("mensaje").innerText = mensaje;
    document.getElementById("entradaNumero").value = "";

}

document.getElementById("botonIntentar").addEventListener("click",verificarIntento); 


