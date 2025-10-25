// ======================== VARIABLES GLOBALES ========================
const d = document;

// --- al inicio, donde defines variables globales ---
let startTime = null; // marca de tiempo cuando inicia cada juego
let usuario = "";
let nivel = 1;
let tiempo = 60;
let timer = null;
let juegoIniciado = false;
let tiempoTotal = 0;
let tiempoSobrante = 0;
let musicaFondo = null;

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
const tablaRecords = document.querySelector(".records tbody");
const fondo = document.body; // cambiar fondo general

// ======== MÚSICA DE FONDO SEGÚN NIVEL =========
function reproducirMusica(nivel) {
    // Detener la música anterior si existe
    if (musicaFondo) {
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
    }

    const archivo = `sonidos/sonido${nivel}.mp3`;
    musicaFondo = new Audio(archivo);
    musicaFondo.volume = 0.3; // volumen moderado
    musicaFondo.loop = true;
    musicaFondo.play().catch(err => console.warn("Audio no pudo iniciar automáticamente:", err));
}

// ======== CAMBIO DE FONDO SEGÚN NIVEL =========
function cambiarFondo(nivel) {
    let ruta = "";

    // Fondo fijo para cada nivel
    if (nivel === 1) {
        ruta = "imagenes/fondo1.jpg";
    } else if (nivel === 2) {
        ruta = "imagenes/fondo2.jpg";
    } else if (nivel === 3) {
        ruta = "imagenes/fondo3.jpg";
    } else {
        ruta = "imagenes/fondo_default.jpg"; // si hay error o más niveles
    }

    // Aplicar fondo
    document.body.style.backgroundImage = `url('${ruta}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.transition = "background-image 0.8s ease";
}


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
    if (emoji) emoji.textContent = "😊";
    juegoIniciado = true;

    spanNivel.textContent = nivel;
    spanIntentos.textContent = intentos;
    spanAciertos.textContent = aciertos;
    spanTiempo.textContent = tiempo;

    // Guardamos el momento de inicio para calcular tiempo total después
    startTime = Date.now();
    cambiarFondo(nivel);       // 👈 cambia color de fondo
    reproducirMusica(nivel);   // 👈 cambia música

    agregarImagenes();

    clearInterval(timer);
    timer = setInterval(actualizarTiempo, 1000);

    // Guardar datos iniciales en localStorage si quieres
    guardarDatosJuego && guardarDatosJuego();
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
        if (emoji) emoji.textContent = "😬";
    }

    if (tiempo <= 0) {
        clearInterval(timer);
        tiempoTotal = Math.round((Date.now() - startTime) / 1000);
        tiempoSobrante = 0;
        guardarRecord(usuario, nivel, tiempoTotal, intentos, tiempoSobrante);
        alert("⏰ Tiempo agotado! Has perdido. Volverás al nivel 1.");
        nivel = 1;
        reiniciarJuego(true);
    }

    // Guardar estado si tienes esa función
    guardarDatosJuego && guardarDatosJuego();

    if (tiempo <= 0) {
        clearInterval(timer);
        const tiempoTotal = Math.round((Date.now() - (startTime || Date.now())) / 1000);
        console.log("⏰ Tiempo agotado. Guardando record parcial:", { usuario, nivel, tiempoTotal, intentos });

        // Guardamos registro del intento aunque haya perdido (nivel alcanzado)
        guardarRecord(usuario, nivel, tiempoTotal, intentos);

        // Reiniciamos el juego y forzamos volver a nivel 1
        nivel = 1;
        localStorage.setItem("nivel", nivel);
        reiniciarJuego(true);
        alert("⏰ Tiempo agotado! Has perdido. Volviendo al nivel 1.");
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

    tiempoTotal = Math.round((Date.now() - startTime) / 1000);
    tiempoSobrante = tiempo; // segundos que sobraron
    guardarRecord(usuario, nivel, tiempoTotal, intentos, tiempoSobrante);

    alert(`🎉 Felicidades ${usuario}! Completaste el nivel ${nivel}`);

    nivel++;
    localStorage.setItem("nivel", nivel);

    if (nivel > 3) {
        alert("🏆 ¡Has completado todos los niveles!");
        nivel = 1;
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


// Cargar records previos al iniciar
window.addEventListener("DOMContentLoaded", mostrarRecords);

// ================== TABLA DE RECORDS DEFINITIVA ==================
function guardarRecord(jugador, nivel, tiempoTotal, intentos, tiempoSobrante) {
    if (!jugador || jugador === "") jugador = "Anónimo";

    // Asegurar números válidos
    tiempoTotal = Number(tiempoTotal) || 0;
    intentos = Number(intentos) || 0;
    tiempoSobrante = Number(tiempoSobrante) || 0;
    nivel = Number(nivel) || 1;

    const records = JSON.parse(localStorage.getItem("records")) || [];

    const nuevo = {
        jugador,
        tiempoTotal,
        intentosTotales: intentos,
        tiempoSobrante,
        nivel,
        fecha: new Date().toLocaleString()
    };

    records.push(nuevo);

    // Ordenar por: nivel DESC, tiempoSobrante DESC, intentos ASC
    records.sort((a, b) => {
        if (b.nivel !== a.nivel) return b.nivel - a.nivel;
        if (b.tiempoSobrante !== a.tiempoSobrante) return b.tiempoSobrante - a.tiempoSobrante;
        return a.intentosTotales - b.intentosTotales;
    });

    const top10 = records.slice(0, 10);
    localStorage.setItem("records", JSON.stringify(top10));
    mostrarRecords();
}

function mostrarRecords() {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    tablaRecords.innerHTML = "";

    records.forEach((r, i) => {
        const jugador = r.jugador ?? "Desconocido";
        const tiempoTotal = r.tiempoTotal ?? 0;
        const intentosTotales = r.intentosTotales ?? 0;
        const tiempoSobrante = r.tiempoSobrante ?? 0;
        const nivel = r.nivel ?? 1;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${jugador}</td>
            <td>${tiempoTotal}s</td>
            <td>${intentosTotales}</td>
            <td>${tiempoSobrante}s</td>
            <td>${nivel}</td>
        `;
        tablaRecords.appendChild(tr);
    });
}


window.addEventListener("DOMContentLoaded", mostrarRecords);
