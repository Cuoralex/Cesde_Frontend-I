// ===================== info_carrito.js =====================
/*
  Archivo unificado y robusto para:
   - renderCartTable(carrito)
   - renderCartDropdown(carrito)
   - updateCartCount(carrito)
   - manejo de botones + / - / eliminar (delegación)
   - escucha evento 'actualizarCarrito'
  Mantiene tu lógica: usa loadCarrito/saveCarrito/guardarCarritoLS si existen.
*/
console.log("info-carrito cargado");

import { loadCarrito, saveCarrito, guardarCarritoLS } from "./pro_localstorage.js";
import { calcularResumen } from "./resumen_compra.js";

// ------------------ Render tabla ------------------
export function renderCartTable(carrito = []) {
  console.log("Renderizando tabla del carrito...");
  const tbody =
    document.querySelector(".cart-table tbody") ||
    document.querySelector(".list-cart tbody") ||
    document.querySelector("#list-cart tbody") ||
    document.querySelector("table tbody");

  if (!tbody) {
    console.warn("No se encontró <tbody> para renderizar los productos del carrito.");
    return;
  }

  tbody.innerHTML = "";

  if (!carrito || carrito.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">🛒 Tu carrito está vacío</td>
      </tr>`;
    console.log("Tabla renderizada: carrito vacío");
    return;
  }

  carrito.forEach((producto, index) => {
    const subtotal = (Number(producto.precio || 0) * Number(producto.cantidad || 0)).toFixed(2);
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td class="align-middle">
        <div class="d-flex align-items-center">
          <img src="images/${producto.id}.png" onerror="this.src='images/default.png'" width="60" height="60" class="me-3 rounded" alt="${producto.nombre}">
          <span>${producto.nombre}</span>
        </div>
      </td>
      <td class="align-middle">$${Number(producto.precio || 0).toFixed(2)}</td>
      <td class="align-middle">
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary btn-restar" data-id="${producto.id}" aria-label="Restar">−</button>
          <span class="mx-2 cantidad-item" data-id="${producto.id}">${producto.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary btn-sumar" data-id="${producto.id}" aria-label="Sumar">+</button>
        </div>
      </td>
      <td class="align-middle fw-bold">$${Number(subtotal).toFixed(2)}</td>
    `;

    tbody.appendChild(fila);
  });

  console.log(`Tabla renderizada con ${carrito.length} productos.`);
}

// ------------------ Render dropdown ------------------
export function renderCartDropdown(carrito = []) {
  const listaCarrito = document.getElementById("listaCarrito");
  if (!listaCarrito) return;

  listaCarrito.innerHTML = "";

  if (!carrito || carrito.length === 0) {
    listaCarrito.innerHTML = `<li class="text-center text-muted small">Carrito vacío</li>`;
    return;
  }

  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.className = "dropdown-item d-flex align-items-center justify-content-between";

    li.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="images/${producto.id}.png" onerror="this.src='images/default.png'" alt="${producto.nombre}" width="40" height="40" class="me-2 rounded">
        <div>
          <span class="fw-bold d-block">${producto.nombre}</span>
          <small>Cant: ${producto.cantidad} | $${Number(producto.precio).toFixed(2)}</small>
        </div>
      </div>
      <button class="btn btn-sm btn-outline-danger ms-2 btn-eliminar" data-id="${producto.id}" aria-label="Eliminar">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    listaCarrito.appendChild(li);
  });

  listaCarrito.innerHTML += `
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item text-center fw-bold text-primary" href="cart.html">Ir al carrito</a></li>
  `;
}

// ------------------ Update contador ------------------
export function updateCartCount(carrito = []) {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return;
  const total = (carrito || []).reduce((acc, p) => acc + Number(p.cantidad || 0), 0);
  contador.textContent = total;
}

// ------------------ Helpers de persistencia segura ------------------
function persistirCarrito(carrito) {
  try {
    if (typeof saveCarrito === "function") {
      saveCarrito(carrito);
    } else {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  } catch (e) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  // actualizar referencia global para evitar sobrescrituras
  window.carrito = carrito;
  // sincronizar copia si existe función
  try { if (typeof guardarCarritoLS === "function") guardarCarritoLS(); } catch(e){ /* no crítico */ }
}

// ------------------ Delegated clicks: sumar / restar / eliminar ------------------
document.addEventListener("click", (e) => {
  // sumar
  const btnSumar = e.target.closest(".btn-sumar");
  const btnRestar = e.target.closest(".btn-restar");
  const btnEliminar = e.target.closest(".btn-eliminar");

  if (!btnSumar && !btnRestar && !btnEliminar) return;

  // cargar carrito desde la fuente única (preferir window.carrito, fallback loadCarrito/localStorage)
  let carrito = window.carrito || (typeof loadCarrito === "function" ? loadCarrito() : JSON.parse(localStorage.getItem("carrito") || "[]")) || [];

  // ELIMINAR
  if (btnEliminar) {
    const id = String(btnEliminar.dataset.id);
    console.log("Click eliminar recibido para id:", id);

    if (!carrito.some(p => String(p.id) === id)) {
      console.warn("id no encontrado para eliminar:", id);
      return;
    }

    const nuevo = carrito.filter(p => String(p.id) !== id);
    persistirCarrito(nuevo);

    // re-render y resumen
    renderCartDropdown(nuevo);
    renderCartTable(nuevo);
    updateCartCount(nuevo);
    try { calcularResumen(); } catch(e){/*fallback*/}

    document.dispatchEvent(new CustomEvent("actualizarCarrito", { detail: { carrito: nuevo } }));
    console.log("Producto eliminado. Items restantes:", nuevo.length);
    return;
  }

  // SUMAR / RESTAR
  const btn = btnSumar || btnRestar;
  const id = String(btn.dataset.id);
  const idx = carrito.findIndex(p => String(p.id) === id);
  if (idx === -1) {
    console.warn("Producto no encontrado para +/-:", id);
    return;
  }

  if (btnSumar) {
    carrito[idx].cantidad = Number(carrito[idx].cantidad || 0) + 1;
  } else { // restar
    carrito[idx].cantidad = Number(carrito[idx].cantidad || 0) - 1;
    if (carrito[idx].cantidad <= 0) {
      carrito.splice(idx, 1);
    }
  }

  // persistir y re-render
  persistirCarrito(carrito);
  renderCartDropdown(carrito);
  renderCartTable(carrito);
  updateCartCount(carrito);
  try { calcularResumen(); } catch(e){/*fallback*/}

  document.dispatchEvent(new CustomEvent("actualizarCarrito", { detail: { carrito } }));
  console.log(`Cantidad actualizada para ${id}. Nuevo carrito:`, carrito);
});

// ------------------ Evento externo para refrescar (si otro módulo emite) ------------------
document.addEventListener("actualizarCarrito", (e) => {
  const carritoActualizado = e?.detail?.carrito || window.carrito || (typeof loadCarrito === "function" ? loadCarrito() : JSON.parse(localStorage.getItem("carrito") || "[]")) || [];
  console.log("♻️ Evento actualizarCarrito recibido. Refrescando con:", carritoActualizado);

  try {
    renderCartDropdown(carritoActualizado);
    renderCartTable(carritoActualizado);
    updateCartCount(carritoActualizado);
    try { calcularResumen(); } catch(e){}
  } catch (err) {
    console.error("Error refrescando tras evento actualizarCarrito:", err);
  }
});

// ------------------ Inicialización al cargar página ------------------
document.addEventListener("DOMContentLoaded", () => {
  try {
    const carrito = window.carrito || (typeof loadCarrito === "function" ? loadCarrito() : JSON.parse(localStorage.getItem("carrito") || "[]")) || [];
    renderCartDropdown(carrito);
    renderCartTable(carrito);
    updateCartCount(carrito);
    try { calcularResumen(); } catch(e){}
    console.log("info_carrito inicializado con datos del localStorage:", carrito);
  } catch (e) {
    console.error("Error inicializando info_carrito:", e);
  }
});
