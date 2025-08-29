
// ===== Datos base =====
const verdurasBase = { v1: "Tomate", v2: "Cebolla", v3: "Ajo" };

// Utilidades
const $ = (sel) => document.querySelector(sel);
const fmt = (n) => new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(Number(n)||0);

// ===== Ejercicio 1 =====
function ej1(){
    const valores = Object.values(verdurasBase);
    $('#out1').textContent = valores.join(', ');
}

// ===== Ejercicio 2 =====
function ej2(){
    const llaves = Object.keys(verdurasBase);
    $('#out2').textContent = llaves.join(', ');
}

// ===== Ejercicio 3 =====
function ej3(){
    const entries = Object.entries(verdurasBase);
    const html = [`<table><thead><tr><th>Llave</th><th>Valor</th></tr></thead><tbody>`,
    ...entries.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`),
    `</tbody></table>`].join('');
    $('#out3').innerHTML = html;
}

// ===== Ejercicio 4 =====
function ej4(){
    const obj = {...verdurasBase, v4: 'Zanahoria', v5: 'Lechuga'};
    $('#out4').textContent = Object.values(obj).join(', ');
}

// ===== Ejercicio 5 =====
const productos = [];
function agregarProducto(){
    const nombre = $('#pNombre').value.trim();
    const precio = parseFloat($('#pPrecio').value);
    const cantidad = parseInt($('#pCant').value,10);
    if(!nombre || isNaN(precio) || isNaN(cantidad) || precio<0 || cantidad<1){
    alert('Ingresa nombre, precio (>0) y cantidad (>=1).');
    return;
    }
    productos.push({nombre, precio, cantidad});
    $('#pNombre').value = ''; $('#pPrecio').value=''; $('#pCant').value='';
    renderProductos();
}
function limpiarProductos(){
    productos.length = 0; renderProductos();
}
function renderProductos(){
    if(productos.length < 3){
    $('#out5').innerHTML = `<div class="note">Productos actuales: ${productos.length}. Agrega al menos 3 para ver la tabla.</div>`;
    return;
    }
    const rows = productos.map(p=>`<tr><td>${p.nombre}</td><td>${fmt(p.precio)}</td><td>${p.cantidad}</td></tr>`).join('');
    $('#out5').innerHTML = `<table><thead><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ===== Ejercicio 6 (otra estructura) =====
let ej6Data = [];
function semillaEj6(){
    ej6Data = [
    { nombre: 'Cuaderno', precio: 6500, cantidad: 3 },
    { nombre: 'Lápiz', precio: 1200, cantidad: 5 },
    { nombre: 'Regla', precio: 3000, cantidad: 2 }
    ];
    renderEj6();
}
function renderEj6(){
    if(ej6Data.length < 3){
    $('#out6').innerHTML = `<div class="note">Carga 3 elementos (usa "Cargar ejemplo") para visualizar.</div>`;
    return;
    }
    const rows = ej6Data.map(p=>`<tr><td>${p.nombre}</td><td>${fmt(p.precio)}</td><td>${p.cantidad}</td></tr>`).join('');
    $('#out6').innerHTML = `<table><thead><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ===== Ejercicio 7: subtotales y total con IVA =====
const subItems = [];
function agregarSub(){
    const producto = $('#sProd').value.trim();
    const precio = parseFloat($('#sPrecio').value);
    const cantidad = parseInt($('#sCant').value,10);
    if(!producto || isNaN(precio) || isNaN(cantidad) || precio<0 || cantidad<1){
    alert('Ingresa producto, precio (>0) y cantidad (>=1).');
    return;
    }
    subItems.push({producto, precio, cantidad});
    $('#sProd').value=''; $('#sPrecio').value=''; $('#sCant').value='';
    renderSubs();
}
function limpiarSubs(){ subItems.length = 0; renderSubs(); }
function renderSubs(){
    if(subItems.length < 2){
    $('#out7').innerHTML = `<div class="note">Productos actuales: ${subItems.length}. Agrega al menos 2 para calcular.</div>`;
    return;
    }
    const ivaPct = parseFloat($('#iva').value)||0;
    const rows = subItems.map(it=>{
    const st = it.precio*it.cantidad;
    return `<tr><td>${it.producto}</td><td>${fmt(it.precio)}</td><td>${it.cantidad}</td><td>${fmt(st)}</td></tr>`;
    }).join('');
    const subtotal = subItems.reduce((acc,it)=>acc+it.precio*it.cantidad,0);
    const ivaVal = subtotal*(ivaPct/100);
    const total = subtotal + ivaVal;
    // Si hay 3 o más productos, mostramos subtotal de los primeros 3
    let extra = '';
    if(subItems.length >= 3){
    const sub3 = subItems.slice(0,3).reduce((acc,it)=>acc+it.precio*it.cantidad,0);
    extra = `<div class="note">Subtotal de los primeros 3 productos: <strong>${fmt(sub3)}</strong></div>`;
    }
    $('#out7').innerHTML = `
    <table>
        <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot>
        <tr><td colspan="3">Subtotal</td><td>${fmt(subtotal)}</td></tr>
        <tr><td colspan="3">IVA (${ivaPct}%)</td><td>${fmt(ivaVal)}</td></tr>
        <tr><td colspan="3">Total</td><td>${fmt(total)}</td></tr>
        </tfoot>
    </table>
    ${extra}
    `;
}