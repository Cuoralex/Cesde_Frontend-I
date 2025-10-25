// ======================== VARIABLES GLOBALES ========================
const d = document;

let usuario = "";
let nivel = 1;
let tiempo = 60;
let timer = null;
let juegoIniciado = false;

let imagenNombre = [];
let imagenID = [];
let cartasEmparejadas = new Set();
let intentos = 0;
let aciertos = 0;

// ================== ELEMENTOS DEL DOM ==================
const tablero = d.querySelector(".tablero");
const spanIntentos = d.getElementById("intentos");
const spanAciertos = d.getElementById("aciertos");
const spanTiempo = d.getElementById("tiempo");
const spanNivel = d.getElementById("nivel");
const emoji = d.getElementById("emoji");
const btnIniciar = d.getElementById("btnIniciar");

// ================== MODAL DE USUARIO ==================
function pedirNombre() {
    usuario = prompt("👋 Escribe tu nombre de usuario:");
    if (!usuario) usuario = "Jugador";
    localStorage.setItem("usuario", usuario);
    console.log(`Bienvenido, ${usuario}`);
}
pedirNombre();

// ================== IMÁGENES POR NIVEL ==================
const niveles = {
    1: [
        { nombre: "carta1", url: "imagenes/carta1.jpg" },
        { nombre: "carta2", url: "imagenes/carta2.jpg" },
        { nombre: "carta3", url: "imagenes/carta3.jpg" },
        { nombre: "carta4", url: "imagenes/carta4.jpg" },
        { nombre: "carta5", url: "imagenes/carta5.jpg" },
        { nombre: "carta6", url: "imagenes/carta6.jpg" }
    ],
    2: [
        { nombre: "carta7", url: "imagenes/carta7.jpg" },
        { nombre: "carta8", url: "imagenes/carta8.jpg" },
        { nombre: "carta9", url: "imagenes/carta9.jpg" },
        { nombre: "carta10", url: "imagenes/carta10.jpg" },
        { nombre: "carta11", url: "imagenes/carta11.jpg" },
        { nombre: "carta12", url: "imagenes/carta12.jpg" },
        { nombre: "carta13", url: "imagenes/carta13.jpg" },
        { nombre: "carta14", url: "imagenes/carta14.jpg" }
    ],
    3: [
        { nombre: "carta15", url: "imagenes/carta15.jpg" },
        { nombre: "carta16", url: "imagenes/carta16.jpg" },
        { nombre: "carta17", url: "imagenes/carta17.jpg" },
        { nombre: "carta18", url: "imagenes/carta18.jpg" },
        { nombre: "carta19", url: "imagenes/carta19.jpg" },
        { nombre: "carta20", url: "imagenes/carta20.jpg" },
        { nombre: "carta21", url: "imagenes/carta21.jpg" },
        { nombre: "carta22", url: "imagenes/carta22.jpg" }
    ]
};

// ================== BOTÓN INICIAR ==================
btnIniciar.addEventListener("click", () => {
    if (!juegoIniciado) {
        iniciarJuego();
        btnIniciar.textContent = "Reiniciar";
        btnIniciar.style.backgroundColor = "#dc3545";
    } else {
        reiniciarJuego();
    }
});

// ================== INICIAR JUEGO ==================
function iniciarJuego() {
    console.clear();
    console.log(`🎮 Nivel ${nivel} iniciado por ${usuario}`);

    intentos = 0;
    aciertos = 0;
    cartasEmparejadas.clear();
    imagenNombre = [];
    imagenID = [];
    tiempo = 60;
    spanTiempo.style.color = "black";
    emoji.textContent = "😊";
    juegoIniciado = true;

    spanNivel.textContent = nivel;
    spanIntentos.textContent = intentos;
    spanAciertos.textContent = aciertos;
    spanTiempo.textContent = tiempo;

    agregarImagenes();

    clearInterval(timer);
    timer = setInterval(actualizarTiempo, 1000);

    // Guardar datos iniciales
    guardarDatosJuego();
}

// ================== AGREGAR IMÁGENES ==================
function agregarImagenes() {
    tablero.innerHTML = "";
    let imgs = [...niveles[nivel], ...niveles[nivel]];
    imgs.sort(() => Math.random() - 0.5);

    imgs.forEach((imagen, i) => {
        let div = d.createElement("div");
        div.className = "col-3";

        let img = d.createElement("img");
        img.className = "img-fluid altura-img";
        img.id = i;
        img.src = "imagenes/ocultar.jpg";
        img.dataset.nombre = imagen.nombre;
        img.dataset.url = imagen.url;
        img.addEventListener("click", mostrarImg);

        div.appendChild(img);
        tablero.appendChild(div);
    });
}

// ================== ACTUALIZAR TIEMPO ==================
function actualizarTiempo() {
    tiempo--;
    spanTiempo.textContent = tiempo;

    if (tiempo <= 10 && tiempo > 0) {
        spanTiempo.style.color = "red";
        emoji.textContent = "😟";
    }

        guardarDatosJuego();

        if (tiempo <= 0) {
        clearInterval(timer);
        alert("⏰ Tiempo agotado! Has perdido, volverás al nivel 1 😢");
        guardarRecord(usuario, 0, intentos);
        nivel = 1; // <-- Reajuste obligatorio al perder
        reiniciarJuego(true);
    }

}

// ================== MOSTRAR IMAGEN ==================
function mostrarImg() {
    if (!juegoIniciado) {
        alert("⚠️ Presiona 'Iniciar' para comenzar.");
        return;
    }

    let id = this.id;

    // Carta ya emparejada
    if (cartasEmparejadas.has(id)) {
        alert("⚠️ Esa carta ya fue emparejada, escoge otra.");
        return;
    }

    // Mismo clic
    if (imagenID.length === 1 && imagenID[0] === id) {
        alert("⚠️ Debes seleccionar otra imagen.");
        return;
    }

    this.src = this.dataset.url;
    imagenNombre.push(this.dataset.nombre);
    imagenID.push(id);

    if (imagenNombre.length === 2) {
        setTimeout(compararImg, 700);
    }
}

// ================== COMPARAR ==================
function compararImg() {
    let cartas = d.querySelectorAll(".tablero img");
    intentos++;
    spanIntentos.textContent = intentos;

    if (imagenNombre[0] === imagenNombre[1]) {
        cartas[imagenID[0]].src = "imagenes/acierto-png-5.png";
        cartas[imagenID[1]].src = "imagenes/acierto-png-5.png";
        cartasEmparejadas.add(imagenID[0]);
        cartasEmparejadas.add(imagenID[1]);
        aciertos++;
        spanAciertos.textContent = aciertos;

        guardarDatosJuego();

        if (aciertos === niveles[nivel].length) {
            subirNivel();
        }
    } else {
        cartas[imagenID[0]].src = "imagenes/ocultar.jpg";
        cartas[imagenID[1]].src = "imagenes/ocultar.jpg";
    }

    imagenNombre = [];
    imagenID = [];
}

// ================== SUBIR DE NIVEL ==================
function subirNivel() {
    clearInterval(timer);
    alert(`🎉 Felicidades ${usuario}! Completaste el nivel ${nivel}`);
    nivel++;
    localStorage.setItem("nivel", nivel);
    guardarDatosJuego();

    if (nivel > 3) {
        alert("🏆 ¡Felicidades, has pasado el juego completo!");
        borrarDatosJuego();
        reiniciarJuego(true);
        return;
    }

    iniciarJuego();
}

// ================== REINICIAR ==================
function reiniciarJuego(final = false) {
    clearInterval(timer);
    juegoIniciado = false;
    btnIniciar.textContent = "Iniciar";
    btnIniciar.style.backgroundColor = "#198754";

    if (final) nivel = 1; // Reinicio total si el juego se completó o se perdió

    // Actualizar en interfaz
    spanNivel.textContent = nivel;
    spanIntentos.textContent = 0;
    spanAciertos.textContent = 0;
    spanTiempo.textContent = 0;

    // Mostrar mensaje emoji
    if (emoji) emoji.textContent = "😴";

    // Reiniciar tablero
    agregarImagenes();
}


// ================== LOCAL STORAGE (guardarDatos.js integrado) ==================
function guardarDatosJuego() {
    const datos = {
        usuario,
        nivel,
        tiempo,
        intentos,
        aciertos,
        fecha: new Date().toLocaleString()
    };
    localStorage.setItem("datosJuego", JSON.stringify(datos));
}

function cargarDatosJuego() {
    const datos = localStorage.getItem("datosJuego");
    return datos ? JSON.parse(datos) : null;
}

function borrarDatosJuego() {
    localStorage.removeItem("datosJuego");
}

// ================== TABLA DE RECORDS ==================
const tablaRecords = document.querySelector(".records tbody");

// Cargar records previos al iniciar
window.addEventListener("DOMContentLoaded", mostrarRecords);

function guardarRecord(jugador, tiempo, intentos) {
    const records = JSON.parse(localStorage.getItem("records")) || [];

    const nuevo = {
        jugador,
        tiempo,
        intentos,
        fecha: new Date().toLocaleString()
    };

    records.push(nuevo);
    localStorage.setItem("records", JSON.stringify(records));
    mostrarRecords();
}

function mostrarRecords() {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    tablaRecords.innerHTML = "";

    records.forEach((r, i) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${r.jugador}</td>
            <td>${r.tiempo}s</td>
            <td>${r.intentos}</td>
        `;
        tablaRecords.appendChild(fila);
    });
}
