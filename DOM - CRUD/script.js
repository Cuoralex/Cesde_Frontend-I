// === Referencias al DOM ===
const form = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const profesion = document.getElementById("profesion");
const salario = document.getElementById("salario");
const indice = document.getElementById("indice");
const buscador = document.getElementById("buscador");
const tablaBody = document.querySelector("#tabla tbody");

// === Inicializar datos ===
let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];

// === Renderizar tabla ===
function mostrarDatos(lista = profesiones) {
  tablaBody.innerHTML = "";
  lista.forEach((p, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${p.nombre}</td>
      <td>${p.profesion}</td>
      <td>${p.salario}</td>
      <td class="acciones">
        <button class="btnEditar" onclick="editar(${i})">Editar</button>
        <button class="btnEliminar" onclick="eliminar(${i})">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

// === Guardar / Actualizar ===
form.addEventListener("submit", e => {
  e.preventDefault();
  const nuevo = {
    nombre: nombre.value.trim(),
    profesion: profesion.value.trim(),
    salario: salario.value.trim()
  };

  if (indice.value === "") {
    profesiones.push(nuevo);
  } else {
    profesiones[indice.value] = nuevo;
    indice.value = "";
  }

  localStorage.setItem("profesiones", JSON.stringify(profesiones));
  form.reset();
  mostrarDatos();
});

// === Editar ===
function editar(i) {
  const p = profesiones[i];
  nombre.value = p.nombre;
  profesion.value = p.profesion;
  salario.value = p.salario;
  indice.value = i;
}

// === Eliminar ===
function eliminar(i) {
  if (confirm("¿Desea eliminar este registro?")) {
    profesiones.splice(i, 1);
    localStorage.setItem("profesiones", JSON.stringify(profesiones));
    mostrarDatos();
  }
}

// === Búsqueda dinámica ===
buscador.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = profesiones.filter(p => 
    p.nombre.toLowerCase().includes(texto)
  );
  mostrarDatos(filtrados);
});

// === Cargar tabla al iniciar ===
mostrarDatos();
