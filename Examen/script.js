const enun = document.getElementById("enunciado");
const res = document.getElementById("resultado");

let empleados = [
    {nombre: "Pedro", salario: 5000000, profesion: "Abogado"},
    {nombre: "Angie", salario: 3900000, profesion: "Odontóloga"},
    {nombre: "Luis", salario: 2500000, profesion: "Asesor Bancario"},
    {nombre: "Lina", salario: 4500000, profesion: "Psicoloca"}
];
let empleadosModificados = [];
let totalCompra = 0;

// -------------------- EJERCICIO 1 --------------------
function Ejer1(){
    enun.innerHTML = `<p>1. Ingrese 6 frutas y muestre cuáles están en posiciones pares e impares.</p>
    <input type="button" value="Ejecutar" onclick="guardarFruta()">`;
    res.innerHTML="";
}
function guardarFruta(){
    let frutas=[];
    for(let i=0;i<6;i++){
        frutas.push(prompt(`Ingrese la fruta número ${i+1} (ej: Manzana)`));
    }
    res.innerHTML="<h3>Frutas</h3>";
    frutas.forEach((f,i)=>{
        res.innerHTML += (i%2===0? "Par":"Impar")+` [${i}]: ${f}<br>`;
    });
}

// -------------------- EJERCICIO 2 --------------------
function Ejer2(){
    enun.innerHTML = `<p>2. Ingrese 5 números y muestre mayor, menor y promedio.</p>
    <input type="button" value="Ejecutar" onclick="manejarNumeros()">`;
    res.innerHTML="";
}
function manejarNumeros(){
    let numeros=[];
    for(let i=0;i<5;i++){
        numeros.push(Number(prompt(`Ingrese el número ${i+1} (ej: 25)`)));
    }
    let mayor=Math.max(...numeros);
    let menor=Math.min(...numeros);
    let promedio=numeros.reduce((a,b)=>a+b,0)/numeros.length;
    res.innerHTML=`<h3>Números</h3>
    ${numeros.join(", ")}<br>
    Mayor: ${mayor}<br>
    Menor: ${menor}<br>
    Promedio: ${promedio.toFixed(2)}`;
}

// -------------------- EJERCICIO 3 --------------------
function Ejer3(){
    enun.innerHTML = `<p>3. Del arreglo dado muestre solo las frutas.</p>
    <input type="button" value="Ejecutar" onclick="mostrarFrutas()">`;
    res.innerHTML="";
}
function mostrarFrutas(){
    let alimentos=["zanahoria","banano","manzana","pera","cebolla","papa","fresas","Ajo","Sandia"];
    let frutas=alimentos.filter(a=>!["zanahoria","cebolla","papa","Ajo"].includes(a));
    res.innerHTML="<h3>Frutas</h3>"+frutas.join(", ");
}

// -------------------- EJERCICIO 4 --------------------
function Ejer4(){
    enun.innerHTML = `<p>4. Calcule total de salarios, corrija Lina y agregue área.</p>
    <input type="button" value="Ejecutar" onclick="trabajoArreglos()">`;
    res.innerHTML="";
}
function trabajoArreglos(){
    let totalSalarios=empleados.reduce((a,e)=>a+e.salario,0);
    empleadosModificados=empleados.map(e=>{
        let copia={...e};
        if(copia.nombre==="Lina") copia.profesion="Psicóloga";
        copia.area_de_trabajo="Oficina Central";
        return copia;
    });
    res.innerHTML="<h3>Empleados</h3>Suma de salarios: "+totalSalarios+"<br>";
    empleadosModificados.forEach(e=>res.innerHTML+=JSON.stringify(e)+"<br>");
}

// -------------------- EJERCICIO 5 --------------------
function Ejer5(){
    enun.innerHTML = `<p>5. Ordenar empleados de mayor a menor por salario.</p>
    <input type="button" value="Ejecutar" onclick="ordenarEmpleados()">`;
    res.innerHTML="";
}
function ordenarEmpleados(){
    let ordenados=[...empleadosModificados].sort((a,b)=>b.salario-a.salario);
    res.innerHTML="<h3>Ordenados</h3>";
    ordenados.forEach(e=>res.innerHTML+=`${e.nombre} - ${e.salario}<br>`);
}

// -------------------- EJERCICIO 6 --------------------
function Ejer6(){
    enun.innerHTML = `<p>6. Pida 3 productos y muestre total de la compra.</p>
    <input type="button" value="Ejecutar" onclick="generarProductos()">`;
    res.innerHTML="";
}
function generarProductos(){
    let productos=[];
    for(let i=0;i<3;i++){
        let nombre=prompt(`Ingrese el NOMBRE del producto ${i+1} (ej: Cuaderno)`);
        let precio=Number(prompt(`Ingrese el PRECIO del producto ${i+1} (ej: 5000)`));
        let cantidad=Number(prompt(`Ingrese la CANTIDAD del producto ${i+1} (ej: 2)`));
        productos.push({nombre,precio,cantidad});
    }
    totalCompra=productos.reduce((a,p)=>a+p.precio*p.cantidad,0);
    res.innerHTML="<h3>Productos</h3>";
    productos.forEach(p=>res.innerHTML+=`${p.nombre} - $${p.precio} x ${p.cantidad} = ${p.precio*p.cantidad}<br>`);
    res.innerHTML+=`<b>Total: ${totalCompra}</b>`;
}

// -------------------- EJERCICIO 7 --------------------
function Ejer7(){
    enun.innerHTML = `<p>7. Calcular si hay descuento (>=100000).</p>
    <input type="button" value="Ejecutar" onclick="mostrarDescuento()">`;
    res.innerHTML="";
}
function calcularDescuento(total){
    return total>=100000? "Tienes un descuento del 10%" : "No tienes descuento";
}
function mostrarDescuento(){
    res.innerHTML="<h3>Descuento</h3>"+calcularDescuento(totalCompra);
}

// -------------------- EJERCICIO 8 --------------------
function Ejer8(){
    enun.innerHTML = `<p>8. Registrar notas de 3 estudiantes y calcular promedio.</p>
    <input type="button" value="Ejecutar" onclick="ejecutarNotas()">`;
    res.innerHTML="";
}
function calcularPromedio(notas){
    return notas.reduce((a,b)=>a+b,0)/notas.length;
}
function ejecutarNotas(){
    let estudiantes=[];
    for(let i=0;i<3;i++){
        let notas=[];
        for(let j=0;j<3;j++){
            notas.push(Number(prompt(`Ingrese la NOTA ${j+1} del estudiante ${i+1} (ej: 3.5)`)));
        }
        estudiantes.push({id:i+1,notas});
    }
    res.innerHTML="<h3>Calificaciones</h3>";
    estudiantes.forEach(e=>{
        let prom=calcularPromedio(e.notas);
        res.innerHTML+=`Estudiante ${e.id} - Notas: ${e.notas.join(", ")} - Promedio: ${prom.toFixed(2)} - ${prom>=3?"Aprobado":"Reprobado"}<br>`;
    });
}
