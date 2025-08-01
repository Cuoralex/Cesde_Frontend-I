function Ejer1() {
    document.getElementById('enunciado').innerHTML = `
        <p>1. Pide al usuario un número y determina si es par o impar y si es positivo o negativo.</p>
        <input type="button" value="Definir número" onclick="calcularParPositivo()">`;
}

function calcularPago() {
    let num = parseInt(prompt("Ingrese un número entero:"));

    if (isNaN(num) || !Number.isInteger(num)) {
        alert("Por favor ingrese un número entero valido.");
        return;
    }

    let positivo = num >= 0 ? "positivo" : "negativo";
    let par = num % 2 === 0 ? "par" : "impar";
    
    document.getElementById('resultado').innerHTML = `
        Salario Bruto: $${salarioBruto.toFixed(2)}<br>
        Descuento Salud (4%): $${salud.toFixed(2)}<br>
        Descuento Pensión (7%): $${pension.toFixed(2)}<br>
        Salario Neto: <strong>$${salarioNeto.toFixed(2)}</strong><br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}

function Ejer2() {
    document.getElementById('enunciado').innerHTML = `
        <p>2. Aplica la fórmula a = (b*h)/2 para calcular el área de un triángulo donde sus dimensiones
        base y altura se deben pedir al usuario que las digite.</p>
        <input type="button" value="Calcular área" onclick="calcularArea()">`;
}

function calcularArea() {
    let baseTriangulo = parseFloat(prompt("Ingrese la base del triángulo:"));
    let alturaTriangulo = parseFloat(prompt("Ingrese la altura del triángulo:"));

    if (isNaN(baseTriangulo) || baseTriangulo <= 0) {
        alert("Por favor ingrese un valor válido y mayor a 0.");
        return;
    }

    if (isNaN(alturaTriangulo) || alturaTriangulo <= 0) {
        alert("Por favor ingrese un valor válido y mayor a 0.");
        return;
    }

    let formula = (baseTriangulo*alturaTriangulo) /2;

    document.getElementById('resultado').innerHTML = `
        El área del triángulo es : ${formula.toFixed(2)}<br>
        La base ingresada fue: ${baseTriangulo.toFixed(0)}<br>
        La altura ingresada fue: ${alturaTriangulo.toFixed(0)}<br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}

function Ejer3() {
    document.getElementById('enunciado').innerHTML = `
        <p>3. Realiza las operaciones de suma, resta, multiplicación, división, y módulo pidiéndole solo
        2 números al usuario.</p>
        <input type="button" value="Calcular operaciones" onclick="calcularOperaciones()">`;
}

function calcularOperaciones() {
    let num1 = parseFloat(prompt("Ingrese el primer número:"));
    let num2 = parseFloat(prompt("Ingrese el segundo número:"));

    if (isNaN(num1) || num1 <= 0) {
        alert("Por favor ingrese un número válido y mayor a 0.");
        return;
    }

    if (isNaN(num2) || num2 <= 0) {
        alert("Por favor ingrese un número válido y mayor a 0.");
        return;
    }

    let suma = num1+num2;
    let resta = num1-num2;
    let multiplicacion = num1*num2;
    let division = num2 !== 0 ? (num1 / num2).toFixed(2) : "Error: División por cero";
    let modulo = num2 !== 0 ? (num1 % num2).toFixed(2) : "Error: Módulo por cero";


    document.getElementById('resultado').innerHTML = `
        El primer número ingresado es: ${num1.toFixed(2)}<br>
        El segundo número ingresado es: ${num2.toFixed(2)}<br>
        El resultado de su suma es: ${suma.toFixed(2)}<br>
        El resultado de su resta es: ${resta.toFixed(2)}<br>
        El resultado de su multiplicación es: ${multiplicacion.toFixed(2)}<br>
        El resultado de su división es: ${division.toFixed(2)}<br>
        El resultado de su módulo es: ${modulo.toFixed(2)}<br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}

function Ejer4() {
    document.getElementById('enunciado').innerHTML = `
        <p>4. Calcule el sueldo mensual de un trabajador ingresando el número de horas normales y extras trabajadas en el mes, y el valor tanto de las horas normales como de las extras.</p>
        <input type="button" value="Calcular sueldo mensual" onclick="calcularSalario()">`;
}

function calcularSalario() {
    let horasNormales = parseFloat(prompt("Ingrese la cantidad de horas normales trabajadas en el mes:"));
    let horasExtras = parseFloat(prompt("Ingrese la cantidad de horas extras trabajadas en el mes:"));
    let valorHoraNormal = parseFloat(prompt("Ingrese el valor de una hora normal:"));
    let valorHoraExtra = parseFloat(prompt("Ingrese el valor de una hora extra:"));

    if (isNaN(horasNormales) || horasNormales < 0) {
        alert("Por favor ingrese un número válido de horas normales (mayor o igual a 0).");
        return;
    }

    if (isNaN(horasExtras) || horasExtras < 0) {
        alert("Por favor ingrese un número válido de horas extras (mayor o igual a 0).");
        return;
    }

    if (isNaN(valorHoraNormal) || valorHoraNormal <= 0) {
        alert("Por favor ingrese un valor válido para la hora normal (mayor a 0).");
        return;
    }

    if (isNaN(valorHoraExtra) || valorHoraExtra <= 0) {
        alert("Por favor ingrese un valor válido para la hora extra (mayor a 0).");
        return;
    }

    let totalPagoNormales = horasNormales * valorHoraNormal;
    let totalPagoExtras = horasExtras * valorHoraExtra;
    let totalPago = totalPagoNormales + totalPagoExtras;

    document.getElementById('resultado').innerHTML = `
        Horas normales trabajadas: ${horasNormales.toFixed(2)}<br>
        Horas extras trabajadas: ${horasExtras.toFixed(2)}<br>
        Valor de una hora normal: $${valorHoraNormal.toFixed(2)}<br>
        Valor de una hora extra: $${valorHoraExtra.toFixed(2)}<br>
        Total a pagar por horas normales: $${totalPagoNormales.toFixed(2)}<br>
        Total a pagar por horas extras: $${totalPagoExtras.toFixed(2)}<br>
        Total a pagar al trabajador: <strong>$${totalPago.toFixed(2)}</strong><br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}

function Ejer5() {
    document.getElementById('enunciado').innerHTML = `
        <p>5. Digita el ingreso del precio de un producto y se debe calcular el IVA, mostrar cuanto es el
        IVA que se agrega, mostrar el precio del producto sin IVA y el total a pagar.</p>
        <input type="button" value="Calcular total a pagar" onclick="calcularIva()">`;
}

function calcularIva() {
    let precioProducto = parseFloat(prompt("Ingrese el precio del producto:"));

    if (isNaN(precioProducto) || precioProducto <= 0) {
        alert("Por favor ingrese un valor válido y mayor a 0.");
        return;
    }
    let iva = precioProducto * 0.19;
    let total = precioProducto + iva;

    document.getElementById('resultado').innerHTML = `
        Precio del producto ingresado: $${precioProducto.toFixed(2)}<br>
        Iva aplicado (%): ${iva.toFixed(2)}<br>
        Total a pagar: <strong>$${total.toFixed(2)}</strong><br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}

function Ejer6() {
    document.getElementById('enunciado').innerHTML = `
        <p>6. Calcule el porcentaje de alumnos y alumnas de un salón de clase, digitando el total de
        alumnos hombres y mujeres.</p>
        <input type="button" value="Calcular porcentaje alumnos" onclick="calcularAlumnos()">`;
}

function calcularAlumnos() {
    let alumnosHombres = parseFloat(prompt("Ingrese la cantidad de alumn@s hombres:"));
    let alumnosMujeres = parseFloat(prompt("Ingrese la cantidad de alumn@s mujeres:"));

    if (isNaN(alumnosHombres) || alumnosHombres < 0) {
        alert("Por favor ingrese un valor válido igual o mayor a 0.");
        return;
    }

    if (isNaN(alumnosMujeres) || alumnosMujeres < 0) {
        alert("Por favor ingrese un valor válido igual o mayor a 0.");
        return;
    }

    let alumnosTotales = alumnosMujeres+alumnosHombres;
    let porcentajeMujeres = (alumnosMujeres/alumnosTotales) * 100;
    let porcentajeHombres = 100 - porcentajeMujeres;

    document.getElementById('resultado').innerHTML = `
        Cantidad de alumn@s hombres ingresados: ${alumnosHombres.toFixed(0)}<br>
        Cantidad de alumn@s mujeres ingresados: ${alumnosMujeres.toFixed(0)}<br>
        Porcentaje de alumn@ hombres (%): ${porcentajeHombres.toFixed(2)}<br>
        Porcentaje de alumn@ mujeres (%): ${porcentajeMujeres.toFixed(2)}<br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}

function Ejer7() {
    document.getElementById('enunciado').innerHTML = `
        <p>7. Calcule el promedio de 3 notas de un alumno, el rango de cada nota es del 1 al 5.</p>
        <input type="button" value="Calcular promedio" onclick="calcularPromedio()">`;
}

function calcularPromedio() {
    let nota1 = parseFloat(prompt("Ingrese la primera nota (V.gr. 2.3):"));
    let nota2 = parseFloat(prompt("Ingrese la segunda nota (V.gr. 2.3):"));
    let nota3 = parseFloat(prompt("Ingrese la tercera nota (V.gr. 2.3):"));
    

    if (isNaN(nota1) || nota1 < 0.0 || nota1 > 5.0) {
        alert("Por favor ingrese un valor válido y mayor a 0.0.");
        return;
    }

    if (isNaN(nota2) || nota2 < 0.0 || nota2 > 5.0) {
        alert("Por favor ingrese un valor válido y mayor a 0.0.");
        return;
    }

    if (isNaN(nota3) || nota3 < 0.0 || nota3 > 5.0) {
        alert("Por favor ingrese un valor válido y mayor a 0.0.");
        return;
    }

    let promedio = (nota1+nota2+nota3) /3;

    document.getElementById('resultado').innerHTML = `
        La primera nota es: ${nota1.toFixed(2)}<br>
        La segunda nota es: ${nota2.toFixed(2)}<br>
        La tercera nota es: ${nota3.toFixed(2)}<br>
        El promedio de las notas es: <strong>${promedio.toFixed(2)}</strong><br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}
