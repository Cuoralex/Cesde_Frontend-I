function Ejer1() {
    document.getElementById('enunciado').innerHTML = `
        <label for="salarioInput">Salario bruto:</label>
        <input type="number" id="salarioInput" placeholder="Ingrese salario" min="0" step="0.01">
        <input type="button" value="Calcular salario neto" onclick="calcularSalario()">
    `;
}

function calcularSalario() {
    let salarioBruto = parseFloat(document.getElementById('salarioInput').value);

    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        alert("Por favor ingrese un salario válido y mayor a 0.");
        return;
    }

    let salud = salarioBruto * 0.04;
    let pension = salarioBruto * 0.07;
    let salarioNeto = salarioBruto - salud - pension;

    document.getElementById('resultado').innerHTML = `
        <p><strong>Resultados:</strong></p>
        Salario Bruto: $${salarioBruto.toFixed(2)}<br>
        Descuento Salud (4%): $${salud.toFixed(2)}<br>
        Descuento Pensión (7%): $${pension.toFixed(2)}<br>
        Salario Neto: <strong>$${salarioNeto.toFixed(2)}</strong>
    `;
}