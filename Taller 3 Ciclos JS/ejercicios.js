function mostrarResultado(texto) {
    document.getElementById("resultado").innerText = texto;
}

function sumaNaturales() {
    let N = parseInt(prompt("Ingrese el límite N"));
    let suma = 0;
    for (let i = 1; i <= N; i++) suma += i;
    mostrarResultado("La suma es: " + suma);
}

function promedioNotas() {
    let nombre = prompt("Nombre del estudiante:");
    let N = parseInt(prompt("Cantidad de notas:"));
    let suma = 0;
    for (let i = 1; i <= N; i++) {
        suma += parseFloat(prompt("Nota " + i + ":"));
    }
    let promedio = suma / N;
    let estado = promedio >= 3 ? "Aprueba" : "Reprueba";
    mostrarResultado(`${nombre}\nPromedio: ${promedio.toFixed(2)}\nEstado: ${estado}`);
}

function sumarNumeros() {
    let suma = 0, count = 0;
    while (true) {
        let entrada = prompt("Ingrese un número o FIN para terminar:");
        if (entrada.toUpperCase() === "FIN") break;
        let num = parseInt(entrada);
        if (!isNaN(num)) {
            suma += num;
            count++;
        }
    }
    mostrarResultado(`Cantidad: ${count}\nSuma total: ${suma}`);
}

function tablaMultiplicar() {
    let num = parseInt(prompt("Ingrese un número"));
    let resultado = "Tabla del " + num + ":\n";
    for (let i = 1; i <= 30; i++) {
        resultado += `${num} x ${i} = ${num * i}\n`;
    }
    mostrarResultado(resultado);
}

function tablaMultiplicarDesc() {
    let num = parseInt(prompt("Ingrese un número"));
    let resultado = "Tabla del " + num + " (descendente):\n";
    for (let i = 30; i >= 1; i--) {
        resultado += `${num} x ${i} = ${num * i}\n`;
    }
    mostrarResultado(resultado);
}

function contarIntervalos() {
    let paso = parseInt(prompt("Ingrese el intervalo:"));
    let resultado = "Contando hasta 30 de " + paso + ":\n";
    for (let i = 1; i <= 30; i += paso) resultado += i + " ";
    mostrarResultado(resultado);
}

function contarIntervalosDesc() {
    let paso = parseInt(prompt("Ingrese el intervalo:"));
    let resultado = "Contando regresivo desde 30 de " + paso + ":\n";
    for (let i = 30; i >= 1; i -= paso) resultado += i + " ";
    mostrarResultado(resultado);
}

function escaleraAsteriscos() {
    let altura = parseInt(prompt("Ingrese altura de la escalera:"));
    let escalera = "";
    for (let i = 1; i <= altura; i++) escalera += "*".repeat(i) + "\n";
    mostrarResultado(escalera);
}

function escaleraInvertida() {
    let altura = parseInt(prompt("Ingrese altura de la escalera:"));
    let escalera = "";
    for (let i = altura; i >= 1; i--) escalera += "*".repeat(i) + "\n";
    mostrarResultado(escalera);
}

function registroCompras() {
    let totalClientes = 0;
    let totalGeneral = 0;
    while (confirm("Registrar nueva compra?")) {
        let productos = parseInt(prompt("Cantidad de productos:"));
        let totalCompra = 0;
        for (let i = 1; i <= productos; i++) {
            totalCompra += parseFloat(prompt("Valor del producto " + i));
        }
        alert("Total compra: " + totalCompra);
        totalClientes++;
        totalGeneral += totalCompra;
    }
    mostrarResultado(`Total Ventas del día: ${totalClientes}\nTotal General del día: ${totalGeneral}`);
}

function promediosAlumnos() {
    let resultado = "";
    for (let i = 1; i <= 3; i++) {
        let nombre = prompt(`Nombre del alumno #${i}`);
        let materia = prompt("Materia:");
        let n1 = parseFloat(prompt("Nota 1:"));
        let n2 = parseFloat(prompt("Nota 2:"));
        let n3 = parseFloat(prompt("Nota 3:"));
        let promedio = ((n1 + n2 + n3) / 3).toFixed(2);
        resultado += `\nAlumno: ${nombre}\nMateria: ${materia}\nNotas: ${n1}, ${n2}, ${n3}\nPromedio: ${promedio}\n`;
    }
    mostrarResultado(resultado);
}

function tablaHtml() {
    let html = "Tabla de números del 1 al 15:\n";
    for (let i = 1; i <= 15; i++) html += i + "\n";
    mostrarResultado(html);
}

function mayoresYMenores() {
    let mayores = 0, menores = 0;
    for (let i = 1; i <= 10; i++) {
        let edad = parseInt(prompt(`Edad del estudiante #${i}`));
        if (edad >= 18) mayores++;
        else menores++;
    }
    mostrarResultado(`Mayores de edad: ${mayores}\nMenores de edad: ${menores}`);
}

function juegoAdivinar() {
    let secreto = Math.floor(Math.random() * 10) + 1;
    let intentos = 3;
    while (intentos > 0) {
        let intento = parseInt(prompt("Adivina el número (1 al 10):"));
        if (intento === secreto) {
            mostrarResultado("🎉 Adivinaste el número!");
            return;
        }
        intentos--;
        alert(`Incorrecto. Te quedan ${intentos} intentos.`);
    }
    mostrarResultado(`😞 No adivinaste. El número era ${secreto}`);
}
