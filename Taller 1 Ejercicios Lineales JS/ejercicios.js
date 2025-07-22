function Ejer1() {
    document.getElementById('enunciado').innerHTML = `
        <p>1. Realiza el cálculo del salario que debe recibir un trabajador que gana un salario con un descuento del 4% por salud y 7% por pensión.</p>
        <input type="button" value="Calcular salario neto" onclick="calcularSalario()">`;
}

function calcularSalario() {
    let salarioBruto = parseFloat(prompt("Ingrese el salario del trabajador:"));

    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        alert("Por favor ingrese un salario válido y mayor a 0.");
        return;
    }

    let salud = salarioBruto * 0.04;
    let pension = salarioBruto * 0.07;
    let salarioNeto = salarioBruto - salud - pension;

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
    let division = num1/num2;
    let modulo = num1%num2;

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
        <p>1. Calcule el sueldo mensual de un trabajador ingresando el número de horas trabajadas en
        el mes y el valor tanto como de las horas normales de trabajo y las horas extras.</p>
        <input type="button" value="Calcular salario neto" onclick="calcularSalario()">`;
}

function calcularSalario() {
    let horasTrabajo = parseFloat(prompt("Ingrese la cantidad de horas trabajadas por el trabajador al mes:"));
    let horasNormal = parseFloat(prompt("Ingrese el valor de una hora normal:"));
    let horasExtra = parseFloat(prompt("Ingrese el valor de una hora extra:"));

    if (isNaN(horasTrabajo) || horasTrabajo <= 0) {
        alert("Por favor ingrese un número válido o mayor a 0.0.");
        return;
    }

    let salarioNeto = 1423500;
    let jornadaNormal = 44;
    let CantidadHorasExtras = horasTrabajo - jornadaNormal;


    document.getElementById('resultado').innerHTML = `
        Horas trabajadas ingresadas: ${horasTrabajo.toFixed(2)}<br>
        Jornada normal: ${jornadaNormal.toFixed(2)}<br>
        Horas extras: ${CantidadHorasExtras.toFixed(2)}<br>
        Valor de una hora normal: $${horasNormal.toFixed(2)}<br>
        Valor de una hora extra: $${horasExtra.toFixed(2)}<br>
        Total a pagar por horas normales: $${(horasNormal * jornadaNormal).toFixed(2)}<br>
        Total a pagar por horas extras: $${(CantidadHorasExtras * horasExtra).toFixed(2)}<br>
        Total a pagar al trabajador: <strong>$${(salarioNeto + (CantidadHorasExtras * horasExtra)).toFixed(2)}</strong><br>
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
    let iva = 19;
    let precioIva = precioProducto+(precioProducto * 0.19);

    document.getElementById('resultado').innerHTML = `
        Precio del producto ingresado: $${precioProducto.toFixed(2)}<br>
        Iva aplicado (%): ${iva.toFixed(2)}<br>
        Total a pagar: <strong>$${precioIva.toFixed(2)}</strong><br>
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
    

    if (isNaN(nota1) || nota1 < 0.0 && nota1 > 5.0) {
        alert("Por favor ingrese un valor válido y mayor a 0.0.");
        return;
    }

    if (isNaN(nota2) || nota2 < 0.0 && nota1 > 5.0) {
        alert("Por favor ingrese un valor válido y mayor a 0.0.");
        return;
    }

    if (isNaN(nota3) || nota3 < 0.0 && nota1 > 5.0) {
        alert("Por favor ingrese un valor válido y mayor a 0.0.");
        return;
    }

    let promedio = (nota1+nota2+nota3) /3;

    document.getElementById('resultado').innerHTML = `
        La primera nota es: ${nota1.toFixed(2)}<br>
        La segunda nota es: ${nota2.toFixed(2)}<br>
        La tercera nota es: ${nota3.toFixed(2)}<br>
        El promedio de las notas es: <strong>$${promedio.toFixed(2)}</strong><br>
        <strong>NOTAR: RECARGAR PÁGINA PARA VOLVER A CALCULAR</strong>
    `;
}
