
// Utilidad: normalizar cadenas (minúsculas y sin acentos)
const normalize = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();

// 1) Qué son los arrays vs objetos
(function explicacionArrays(){
  const cont = document.getElementById('explicacion-arrays');
  const code = document.getElementById('codigo-arrays');

  cont.innerHTML = `
    <p><strong>Array</strong>: estructura <em>indexada</em> (posicional), ideal para listas ordenadas de elementos. Se accede con índices (<span class="kbd">arr[0]</span>), tiene una propiedad clave <code>length</code> y muchos métodos para transformar, buscar y recorrer.</p>
    <p><strong>Objeto</strong>: colección de pares <em>clave → valor</em>, ideal para representar entidades con atributos (ej. <code>{ nombre: "Ana", edad: 20 }</code>). Se accede por clave (<span class="kbd">obj.clave</span>), no por índice.</p>
  `;

  const ejemplo = `// Array (indexado)
const numeros = [3,5,9];
console.log(numeros[0]); // 3
console.log(numeros.length); // 3

// Objeto (clave → valor)
const persona = { nombre: "Ana", edad: 20 };
console.log(persona.nombre); // "Ana"
console.log(Object.keys(persona)); // ["nombre","edad"]`;

  code.textContent = ejemplo;
})();

// 2) Propiedades y métodos del array
(function propsYMetodos(){
  const lista = document.getElementById('lista-prop-met');
  const code = document.getElementById('codigo-prop-met');
  // Una propiedad y 3+ métodos
  const items = [
    "<b>length</b>: número de elementos",
    "<b>push()</b>: agrega al final",
    "<b>pop()</b>: elimina el último",
    "<b>slice()</b>: copia parcial sin mutar",
    "<b>splice()</b>: agrega/elimina en medio",
    "<b>indexOf()</b>: posición de un elemento",
    "<b>forEach()</b>: recorrer",
    "<b>map()</b>: transformar",
    "<b>reduce()</b>: acumular",
    "<b>sort()</b>: ordenar"
  ];
  lista.innerHTML = items.map(i=>`<li>${i}</li>`).join("");

  const ejemplo = `const arr = [10,20,30];
arr.push(40);         // [10,20,30,40]
const last = arr.pop(); // last=40, arr=[10,20,30]
const parte = arr.slice(0,2); // [10,20]
arr.splice(1,1,99);   // arr=[10,99,30]
const idx = arr.indexOf(99); // 1
arr.forEach(n=>console.log(n));
const dobles = arr.map(n=>n*2); // [20,198,60]
const suma = arr.reduce((a,b)=>a+b,0); // 139
arr.sort((a,b)=>a-b); // ascendente`;
  code.textContent = ejemplo;
})();

// 3) Ejercicio demostrativo de métodos
(function demoMetodos(){
  const cont = document.getElementById('metodos-ejercicio');
  const code = document.getElementById('metodos-codigo');
  const base = [5, 2, 9, 1, 5, 6];
  const pasos = [];

  const arr1 = base.slice();
  arr1.push(7); pasos.push(["push(7)", arr1.slice()]);
  arr1.pop();   pasos.push(["pop()", arr1.slice()]);
  const parte = arr1.slice(1,4); pasos.push(["slice(1,4)", parte]);
  arr1.splice(2,1,99); pasos.push(["splice(2,1,99)", arr1.slice()]);
  const idx = arr1.indexOf(99); pasos.push(["indexOf(99)", idx]);
  const listForEach = []; arr1.forEach((n,i)=>listForEach.push(`i:${i}→${n}`));
  pasos.push(["forEach()", listForEach]);
  const mapeado = arr1.map(n=>n*2); pasos.push(["map(n*2)", mapeado]);
  const ordenado = arr1.slice().sort((a,b)=>a-b); pasos.push(["sort(asc)", ordenado]);
  const suma = arr1.reduce((a,b)=>a+b,0); pasos.push(["reduce(suma)", suma]);

  cont.innerHTML = `<ol>${pasos.map(([k,v])=>`<li><b>${k}</b> ⇒ <code>${JSON.stringify(v)}</code></li>`).join("")}</ol>`;
  code.textContent = `const base = ${JSON.stringify(base)};
const arr1 = base.slice();
arr1.push(7);        // ${JSON.stringify(pasos[0][1])}
arr1.pop();          // ${JSON.stringify(pasos[1][1])}
const parte = arr1.slice(1,4); // ${JSON.stringify(pasos[2][1])}
arr1.splice(2,1,99); // ${JSON.stringify(pasos[3][1])}
const idx = arr1.indexOf(99); // ${JSON.stringify(pasos[4][1])}
arr1.forEach((n,i)=>/* ... */); // ${JSON.stringify(pasos[5][1])}
const mapeado = arr1.map(n=>n*2); // ${JSON.stringify(pasos[6][1])}
const ordenado = arr1.slice().sort((a,b)=>a-b); // ${JSON.stringify(pasos[7][1])}
const suma = arr1.reduce((a,b)=>a+b,0); // ${JSON.stringify(pasos[8][1])}`;
})();

// 4) Frutas en HTML por ciclo
(function frutasLista(){
  const frutas = ["manzana","pera","banano","fresas","sandía","mango"];
  const ul = document.getElementById('frutas-lista');
  ul.innerHTML = frutas.map(f=>`<li>${f}</li>`).join("");
})();

// 5) 3 elementos + agregar 2
(function agregarElementos(){
  const div = document.getElementById('agregar-elementos');
  const arr = ["rojo","verde","azul"];
  arr.push("amarillo","morado");
  div.innerHTML = `<p>Resultado: <code>${JSON.stringify(arr)}</code></p>`;
})();

// 6) Primer, último y del centro
(function primerosUltimosCentro(){
  const div = document.getElementById('primero-ultimo-centro');
  const arr = [3,5,9,10,35,42,12,22,25];
  const primero = arr[0];
  const ultimo = arr[arr.length-1];
  const centro = arr[Math.floor(arr.length/2)];
  div.innerHTML = `<p>Array: <code>${JSON.stringify(arr)}</code></p>
  <p>Primero: <b>${primero}</b> — Último: <b>${ultimo}</b> — Centro: <b>${centro}</b></p>`;
})();

// 7) Pares e impares (cuáles y cuántos)
(function paresImpares(){
  const div = document.getElementById('pares-impares');
  const arr = [3,5,9,10,35,42,12,22,25];
  const pares = arr.filter(n=>n%2===0);
  const impares = arr.filter(n=>n%2!==0);
  div.innerHTML = `<p>Pares (${pares.length}): <code>${JSON.stringify(pares)}</code></p>
  <p>Impares (${impares.length}): <code>${JSON.stringify(impares)}</code></p>`;
})();

// 8) Posiciones de frutas y verduras
(function frutasVerdurasPos(){
  const div = document.getElementById('frutas-verduras');
  const arr = ["tomate","banano","manzana","pera","cebolla","papa","fresas","Ajo","Sandía"];
  const frutasSet = new Set(["tomate","banano","manzana","pera","fresas","sandia"]); // sandía → sandia
  const verdurasSet = new Set(["cebolla","papa","ajo"]);

  const frutasPos = [];
  const verdurasPos = [];
  arr.forEach((item, idx)=>{
    const n = normalize(item);
    if(frutasSet.has(n)) frutasPos.push(idx);
    else if(verdurasSet.has(n)) verdurasPos.push(idx);
  });

  div.innerHTML = `<p>Arreglo: <code>${JSON.stringify(arr)}</code></p>
    <p>Frutas en posiciones: <b>${JSON.stringify(frutasPos)}</b></p>
    <p>Verduras en posiciones: <b>${JSON.stringify(verdurasPos)}</b></p>`;
})();

// 9) Orden ascendente
(function ordenAsc(){
  const div = document.getElementById('orden-asc');
  const arr = [29,5,40,10,35,42,12,22,25,1,3];
  const asc = arr.slice().sort((a,b)=>a-b);
  div.innerHTML = `<p>Original: <code>${JSON.stringify(arr)}</code></p>
  <p>Ascendente: <code>${JSON.stringify(asc)}</code></p>`;
})();

// 10) Orden descendente
(function ordenDesc(){
  const div = document.getElementById('orden-desc');
  const arr = [29,5,40,10,35,42,12,22,25,1,3];
  const desc = arr.slice().sort((a,b)=>b-a);
  div.innerHTML = `<p>Original: <code>${JSON.stringify(arr)}</code></p>
  <p>Descendente: <code>${JSON.stringify(desc)}</code></p>`;
})();

// 11) Orden aleatorio (Fisher–Yates)
(function ordenAleatorio(){
  const div = document.getElementById('orden-aleatorio');
  const arr = [2,4,6,8,10,12,14,16,18,20,22];
  const bar = arr.slice();
  for(let i=bar.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [bar[i], bar[j]] = [bar[j], bar[i]];
  }
  div.innerHTML = `<p>Original: <code>${JSON.stringify(arr)}</code></p>
  <p>Barajado: <code>${JSON.stringify(bar)}</code></p>`;
})();

// 12) Tabla de sumas entre dos arreglos y totales
(function tablaSumas(){
  const div = document.getElementById('tabla-sumas');
  const code = document.getElementById('tabla-sumas-codigo');
  const a1 = [3,5,9,10,35,42,12,22,25];
  const a2 = [9,5,33,12,7,20,22,3,8];

  const filas = a1.map((n,i)=>`${n} + ${a2[i]} = ${n + a2[i]}`);
  const sum1 = a1.reduce((a,b)=>a+b,0);
  const sum2 = a2.reduce((a,b)=>a+b,0);
  const total = sum1 + sum2;

  div.innerHTML = `
    <div class="table-like">
      ${a1.map((n,i)=>`
        <div>${n}</div><div>+</div><div>${a2[i]}</div><div>=</div><div><b>${n+a2[i]}</b></div>
      `).join('')}
    </div>
    <p><b>${sum1}</b> + <b>${sum2}</b> = <b>${total}</b></p>
  `;

  code.textContent = `const arreglo1 = ${JSON.stringify(a1)};
const arreglo2 = ${JSON.stringify(a2)};
const sumas = arreglo1.map((n,i)=>\`${'${n}'} + ${'${arreglo2[i]}'} = ${'${n + arreglo2[i]}'}\`);
const total1 = arreglo1.reduce((a,b)=>a+b,0); // ${sum1}
const total2 = arreglo2.reduce((a,b)=>a+b,0); // ${sum2}
const total = total1 + total2; // ${total}`;
})();

// Modo claro/oscuro
document.getElementById('modo-btn').addEventListener('click',()=>{
  document.body.classList.toggle('light');
});
