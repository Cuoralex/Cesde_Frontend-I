function ejercicio1() {
  const num = parseInt(prompt("Ingrese un número (por ejemplo: -5, 0, 12):"));
  if (isNaN(num)) {
    alert("Debe ingresar un número válido.");
    return;
  }
  const parImpar = num % 2 === 0 ? "par" : "impar";
  const signo = num >= 0 ? "positivo" : "negativo";
  alert("El número es " + parImpar + " y " + signo);
}

function ejercicio2() {
  const a = parseFloat(prompt("Ingrese el primer número (por ejemplo: 10.5):"));
  const b = parseFloat(prompt("Ingrese el segundo número (por ejemplo: 8):"));
  if (isNaN(a) || isNaN(b)) {
    alert("Debe ingresar dos números válidos.");
    return;
  }
  const mayor = a > b ? a : b;
  const menor = a < b ? a : b;
  alert("El mayor es " + mayor + " y el menor es " + menor);
}

function ejercicio3() {
  const dia = parseInt(prompt("Digite un número del 1 al 7 (1 = Domingo, 7 = Sábado):"));
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  if (dia >= 1 && dia <= 7) {
    alert("El día correspondiente es " + dias[dia - 1]);
  } else {
    alert("Número fuera de rango. Debe estar entre 1 y 7.");
  }
}

function ejercicio4() {
  const edad = parseInt(prompt("Ingrese su edad (por ejemplo: 25):"));
  if (isNaN(edad) || edad < 0) {
    alert("Edad inválida. Ingrese un número positivo.");
    return;
  }
  let etapa;
  if (edad < 18) etapa = "Adolescente";
  else if (edad <= 28) etapa = "Adulto joven";
  else if (edad <= 49) etapa = "Adulto";
  else etapa = "Adulto mayor";
  alert("Etapa: " + etapa);
}

function ejercicio5() {
  const p1 = parseFloat(prompt("Precio del producto 1 (ej: 5000):"));
  const p2 = parseFloat(prompt("Precio del producto 2 (ej: 3000):"));
  const p3 = parseFloat(prompt("Precio del producto 3 (ej: 7000):"));
  if ([p1, p2, p3].some(valor => isNaN(valor) || valor < 0)) {
    alert("Todos los precios deben ser números válidos y positivos.");
    return;
  }
  const total = p1 + p2 + p3;
  const metodo = prompt("¿Forma de pago? (efectivo, cupon, credito):").toLowerCase();
  let totalFinal = total;
  if (metodo === "cupon") {
    totalFinal *= 0.97;
  } else if (metodo === "credito") {
    totalFinal *= 1.05;
  } else if (metodo !== "efectivo") {
    alert("Método de pago no válido.");
    return;
  }
  alert("Total a pagar: $" + totalFinal.toFixed(2));
}

function ejercicio6() {
  const n1 = parseFloat(prompt("Ingrese la nota 1 (ej: 3.5):"));
  const n2 = parseFloat(prompt("Ingrese la nota 2 (ej: 4.0):"));
  const n3 = parseFloat(prompt("Ingrese la nota 3 (ej: 2.8):"));
  if ([n1, n2, n3].some(nota => isNaN(nota) || nota < 0 || nota > 5)) {
    alert("Las notas deben estar entre 0 y 5.");
    return;
  }
  const promedio = (n1 + n2 + n3) / 3;
  let nivel;
  if (promedio < 2.0) nivel = "Malo";
  else if (promedio < 3.0) nivel = "Debe recuperar";
  else if (promedio < 4.0) nivel = "Regular";
  else if (promedio <= 4.4) nivel = "Bueno";
  else nivel = "Muy bueno";
  alert("Promedio: " + promedio.toFixed(2) + " - Nivel: " + nivel);
}

function ejercicio7() {
  const dia = parseInt(prompt("Día de nacimiento (1-31):"));
  const mes = parseInt(prompt("Mes de nacimiento (1-12):"));
  const año = parseInt(prompt("Año de nacimiento (ej: 2000):"));
  if ([dia, mes, año].some(valor => isNaN(valor))) {
    alert("Todos los datos deben ser numéricos.");
    return;
  }
  const fechaNac = new Date(año, mes - 1, dia);
  if (isNaN(fechaNac.getTime())) {
    alert("Fecha inválida.");
    return;
  }
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const cumpleEsteAnio = new Date(hoy.getFullYear(), mes - 1, dia);
  if (hoy < cumpleEsteAnio) edad--;
  alert("Edad actual: " + edad + " años");
}

function ejercicio8() {
  const dias = parseInt(prompt("Ingrese los días de hospitalización (ej: 3):"));
  const edad = parseInt(prompt("Edad del paciente (ej: 65):"));
  if (isNaN(dias) || isNaN(edad) || dias < 0 || edad < 0) {
    alert("Datos inválidos. Deben ser números positivos.");
    return;
  }
  let valorDia;
  if (edad < 18) valorDia = 20000;
  else if (edad <= 49) valorDia = 30000;
  else valorDia = 40000;
  const recargo = edad >= 60 ? 0.1 : 0;
  const total = dias * valorDia * (1 + recargo);
  alert(
    "Días: " + dias +
    "\nValor por día: $" + valorDia +
    "\nRecargo: " + (recargo * 100) + "%" +
    "\nTotal a pagar: $" + total.toFixed(2)
  );
}
