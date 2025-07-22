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
        Salario Neto: <strong>$${salarioNeto.toFixed(2)}</strong>
    `;
}