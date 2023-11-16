
let baraja = [];
let tipos = [`C`,`H`,`D`,`S`];
const especiales = ['A','J','Q','K'];
const carta = baraja.pop();

let puntosJugador = 0;
let puntosComputadora = 0;
let timeout = 10;
let puntosMinimos

//referencias para mamnipular el DOM de HTML

const pedir = document.querySelector("#pedir");
const nuevo = document.querySelector("#nuevo");
const detener = document.querySelector("#detener");
const smalls = document.querySelectorAll("small");
const cartasJugador = document.querySelector(".jugador-cartas");
const cartasCompu = document.querySelector(".compu-cartas");
const botones = document.querySelector(".botones");


crearBaraja = () => {
  
    for (let i = 2; i <= 10; i++) {
       for (let tipo of tipos) {
            baraja.push(i + tipo);
       }
    
    }   

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            baraja.push( esp + tipo);
        }
    }

    baraja.sort(() => Math.random() - .5); //revolver los elementos de un arreglo

    console.log(baraja);
}
crearBaraja();

pedirCarta = () => {

    if (baraja.length === 0) {
        throw "Ya no hay cartas";
    }

    const carta = baraja.pop();
    return carta;
}

valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1)
    return ( isNaN( valor ) ) ?
            (valor === `A`) ? 11 : 10
            : valor * 1;

}

const turnoCompu = (puntosMinimos) => {
    do {
    
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerText = puntosComputadora;
        
          // <img class="carta" src="img/10H.png" alt=""></img>
        
        const imgCarta = document.createElement("img");
        imgCarta.src = `img/${ carta }.png`; // ===> concatenas la variable carta para que aparezca según la carta que en la función pedir carta haya arrojado
        imgCarta.classList.add("carta"); 
        cartasCompu.append( imgCarta );

        if (puntosMinimos > 21) {
            break;
        }
        
    } while ((puntosComputadora < puntosJugador) && (puntosJugador <=21) ) {
    }
    
    if ( (puntosComputadora > puntosJugador) && (puntosComputadora <= 21) ) {
        AñadirAnuncio();
    } else if ( (puntosJugador > 21) && (puntosComputadora <= 21) ) {
        AñadirAnuncio();
    } else if ((puntosJugador <= 21) && (puntosComputadora > 21)) {
        GanasteAnuncio();
    } else if (puntosComputadora === puntosJugador) {
        NadieAnuncio();
    } 
}


//Eventos

pedir.addEventListener("click",  () => { // funcion para crear la carta, asignarle el valor en los puntos y que aparezcan las cratas acumuladas
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador;

      // <img class="carta" src="img/10H.png" alt=""></img>
    
    const imgCarta = document.createElement("img");
    imgCarta.src = `img/${ carta }.png`; // ===> concatenas la variable carta para que aparezca según la carta que en la función pedir carta haya arrojado
    imgCarta.classList.add("carta"); 
    cartasJugador.append( imgCarta );
    
    if (puntosJugador > 21) {
        console.warn("PERDISTE MENSO");
        pedir.disabled = true;
        detener.disabled = true;
        
        turnoCompu( puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn("¡21 A HUEVO!");
        pedir.disabled = true;
        turnoCompu(puntosJugador);
        detener.disabled = true
   }
})


detener.addEventListener("click", () => {
    pedir.disabled = true;
    turnoCompu(puntosJugador);
})


nuevo.addEventListener("click", () => {
   location.reload();
})

function AñadirAnuncio () {
    const Nanuncio = document.createElement("div");
    const Antexto = document.createTextNode("PERDISTE");
    Nanuncio.appendChild(Antexto);
    Nanuncio.classList.add("texto-anuncio_perdiste");
    const contenedorJuego = document.querySelector(".contenedor-juego");
    document.body.insertBefore(Nanuncio, contenedorJuego);

}

function GanasteAnuncio () {
    const Nanuncio = document.createElement("div");
    const Antexto = document.createTextNode("GANASTE");
    Nanuncio.appendChild(Antexto);
    Nanuncio.classList.add("texto-anuncio_ganaste");
    const contenedorJuego = document.querySelector(".contenedor-juego");
    document.body.insertBefore(Nanuncio, contenedorJuego);
}

function NadieAnuncio () { 
    const Nanuncio = document.createElement("div");
    const Antexto = document.createTextNode("NADIE GANA");
    Nanuncio.appendChild(Antexto);
    Nanuncio.classList.add("texto-anuncio_nadie");
    const contenedorJuego = document.querySelector(".contenedor-juego");
    document.body.insertBefore(Nanuncio, contenedorJuego);
}

