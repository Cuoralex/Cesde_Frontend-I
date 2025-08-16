function mostrarResultado(texto) {
    document.getElementById("salida").innerHTML = texto;
}

/* 1. Superficie rectángulo */
function calcularSuperficie() {
    let ancho = parseFloat(prompt("Ingrese el ancho del rectángulo:"));
    let alto = parseFloat(prompt("Ingrese el alto del rectángulo:"));
    let superficie = ancho * alto;
    mostrarResultado(`La superficie del rectángulo es: ${superficie}`);
}

/* 2. Conversión velocidad */
function convertirVelocidad() {
    let kmh = parseFloat(prompt("Ingrese velocidad en km/h:"));
    let m_s = kmh * 1000 / 3600;
    let millas = kmh / 1.609;
    mostrarResultado(`${kmh} km/h = ${m_s.toFixed(2)} m/s = ${millas.toFixed(2)} mph`);
}

/* 3. Circunferencia y Cubo */
function calcularCircunferenciaYCubo() {
    let radio = parseFloat(prompt("Ingrese el radio del círculo:"));
    let circ = 2 * Math.PI * radio;
    let numero = parseFloat(prompt("Ingrese un número para calcular su cubo:"));
    let cubo = Math.pow(numero, 3);
    mostrarResultado(`Circunferencia: ${circ.toFixed(2)} <br> Cubo: ${cubo}`);
}

/* 4. Mostrar nombre */
function mostrarNombre() {
    let nombre = prompt("Ingrese su nombre:");
    if (!isNaN(nombre)) {
        mostrarResultado("Ingrese un nombre válido.");
    } else {
        mostrarResultado(`Hola ${nombre}`);
    }
}

/* 5. Operaciones básicas */
function operacionesBasicas() {
    let a = parseFloat(prompt("Ingrese el primer número:"));
    let b = parseFloat(prompt("Ingrese el segundo número:"));
    mostrarResultado(`
        Suma: ${a + b} <br>
        Resta: ${a - b} <br>
        Multiplicación: ${a * b} <br>
        División: ${(b !== 0) ? (a / b).toFixed(2) : "No se puede dividir entre 0"}
    `);
}

/* 6. Conversor temperatura */
function conversorTemperatura() {
    let temp = parseFloat(prompt("Ingrese la temperatura:"));
    let unidad = prompt("¿Está en C o F?").toUpperCase();
    let mensaje = "";

    if (unidad === "C") {
        if (temp <= 0) mensaje = "Nos congelamos";
        else if (temp <= 15) mensaje = "Está haciendo frío";
        else if (temp <= 25) mensaje = "Está templado el día";
        else mensaje = "Tiene fiebre o es el apocalipsis";
    } else if (unidad === "F") {
        if (temp <= 32) mensaje = "Nos congelamos";
        else if (temp <= 50) mensaje = "Está haciendo frío";
        else if (temp <= 77) mensaje = "Está templado el día";
        else mensaje = "Tiene fiebre o es el apocalipsis";
    }

    mostrarResultado(`Temperatura: ${temp}°${unidad} → ${mensaje}`);
}

/* 7. Calcular IMC */
function calcularIMC() {
    let peso = parseFloat(prompt("Ingrese su peso en kg:"));
    let altura = parseFloat(prompt("Ingrese su altura en metros:"));
    let imc = peso / (altura * altura);
    let estado = "";

    if (imc < 18.5) estado = "Bajo peso, debe ir al nutricionista";
    else if (imc < 25) estado = "Normal";
    else if (imc < 30) estado = "Sobrepeso";
    else estado = "Obeso, debe ir al nutricionista";

    mostrarResultado(`IMC: ${imc.toFixed(2)} → ${estado}`);
}

/* 8. Bienvenida */
function bienvenidaUsuario() {
    let nombre = prompt("Ingrese su nombre:");
    mostrarResultado(`Bienvenido ${nombre}`);
}

/* 9. Calcular IVA */
function calcularIvaProductos() {
    let cantidad = parseInt(prompt("¿Cuántos productos compró?"));
    let total = 0;
    let detalle = "";

    for (let i = 1; i <= cantidad; i++) {
        let precio = parseFloat(prompt(`Precio del producto ${i}:`));
        total += precio;
        detalle += `Producto ${i}: $${precio.toFixed(2)}<br>`;
    }

    let totalConIva = total * 1.19;
    mostrarResultado(`${detalle}Subtotal: $${total.toFixed(2)}<br>Total con IVA: $${totalConIva.toFixed(2)}`);
}

/* 10. Días para fin de año (corregido) */
function diasParaFinDeAño() {
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetea hora para evitar errores

    let finAño = new Date(hoy.getFullYear(), 11, 31);
    finAño.setHours(0, 0, 0, 0);

    let diferenciaDias = Math.floor((finAño - hoy) / (1000 * 60 * 60 * 24));
    let semanas = Math.floor(diferenciaDias / 7);

    mostrarResultado(`📅 Faltan <b>${diferenciaDias}</b> días, equivalente a <b>${semanas}</b> semanas para fin de año.`);
}


/* 11. Listado compras */
function listadoCompras() {
    let cantidad = parseInt(prompt("¿Cuántos productos va a ingresar?"));
    let total = 0;
    let lista = "";

    for (let i = 1; i <= cantidad; i++) {
        let nombre = prompt(`Nombre del producto ${i}:`);
        let precio = parseFloat(prompt(`Precio de ${nombre}:`));
        let cantidadProd = parseInt(prompt(`Cantidad de ${nombre}:`));
        let subtotal = precio * cantidadProd;
        total += subtotal;
        lista += `${i} - ${nombre} $${precio.toFixed(2)} x ${cantidadProd} = $${subtotal.toFixed(2)}<br>`;
    }

    lista += `<hr><b>Total Mercado: $${total.toFixed(2)}</b>`;
    mostrarResultado(lista);
}
