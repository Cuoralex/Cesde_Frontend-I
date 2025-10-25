// ======================== GUARDAR Y CARGAR DATOS ========================

// Guarda el estado actual del juego en localStorage
function guardarDatosJuego(usuario, nivel, tiempo, intentos, aciertos) {
    const datos = {
        jugador,
        nivel,
        tiempo,
        intentos,
        aciertos,
        fecha: new Date().toLocaleString()
    };

    // Guardar los datos en localStorage
    localStorage.setItem("datosJuego", JSON.stringify(datos));
    console.log("💾 Datos guardados:", datos);
}

// Carga los datos almacenados del juego anterior
function cargarDatosJuego() {
    const datosGuardados = localStorage.getItem("datosJuego");

    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        console.log("📂 Datos cargados desde localStorage:", datos);
        return datos;
    } else {
        console.log("⚠️ No hay datos guardados en localStorage.");
        return null;
    }
}

// Borra los datos guardados (por ejemplo, al reiniciar completamente)
function borrarDatosJuego() {
    localStorage.removeItem("datosJuego");
    console.log("🗑️ Datos del juego eliminados del localStorage.");
}
