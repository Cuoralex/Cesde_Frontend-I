import { loadCarrito, saveCarrito, guardarCarritoLS } from './pro_localstorage.js';
import { calcularResumen } from './resumen_compra.js';

// info-carrito.js

// ===================== info_carrito.js =====================
console.log("info-carrito cargado");

// ===========================================================
// 🔹 Renderiza la tabla del carrito dentro de cart.html
// ===========================================================
export function renderCartTable(carrito = []) {
  console.log("🧾 Renderizando tabla del carrito...");

  // Buscar el cuerpo de la tabla según la estructura real del HTML
  const tbody =
    document.querySelector(".cart-table tbody") || // estructura real
    document.querySelector(".list-cart tbody") ||  // compatibilidad
    document.querySelector("#list-cart tbody");    // fallback por id

  if (!tbody) {
    console.warn("⚠️ No se encontró <tbody> para renderizar los productos del carrito.");
    return;
  }

  tbody.innerHTML = "";

  if (!carrito || carrito.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">
          🛒 Tu carrito está vacío
        </td>
      </tr>`;
    return;
  }

  carrito.forEach((producto, index) => {
    const subtotal = (producto.precio * producto.cantidad).toFixed(2);
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td class="align-middle">
        <div class="d-flex align-items-center">
          <img src="images/${producto.id}.png"
               onerror="this.src='images/default.png'"
               width="60" height="60"
               class="me-3 rounded"
               alt="${producto.nombre}">
          <span>${producto.nombre}</span>
        </div>
      </td>
      <td class="align-middle">$${producto.precio.toFixed(2)}</td>
      <td class="align-middle">${producto.cantidad}</td>
      <td class="align-middle fw-bold">$${subtotal}</td>
    `;

    tbody.appendChild(fila);
  });

  console.log(`✅ Tabla renderizada con ${carrito.length} productos.`);
}

// ===========================================================
// 🔹 Renderiza el menú desplegable del carrito en la barra superior
// ===========================================================
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
        <img src="images/${producto.id}.png"
             onerror="this.src='images/default.png'"
             alt="${producto.nombre}"
             width="40" height="40" class="me-2 rounded">
        <div>
          <span class="fw-bold d-block">${producto.nombre}</span>
          <small>Cant: ${producto.cantidad} | $${Number(producto.precio).toFixed(2)}</small>
        </div>
      </div>
      <button class="btn btn-sm btn-outline-danger ms-2" data-id="${producto.id}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    listaCarrito.appendChild(li);
  });

  // Añadir botón final para ir al carrito
  listaCarrito.innerHTML += `
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item text-center fw-bold text-primary" href="cart.html">Ir al carrito</a></li>
  `;
}

// ===========================================================
// 🔹 Actualiza el contador visual del carrito
// ===========================================================
export function updateCartCount(carrito = []) {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return;

  const total = carrito.reduce((acc, p) => acc + Number(p.cantidad || 0), 0);
  contador.textContent = total;
}

// ===========================================================
// 🔹 Eliminación robusta desde el menú desplegable (#listaCarrito)
// ===========================================================
(function attachDeleteHandler() {
  const lista = document.getElementById('listaCarrito');
  if (!lista) return; // si no existe el menú en esta página, no hacemos nada

  lista.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;

    e.preventDefault();
    const idProducto = String(btn.dataset.id);
    console.log('🗑️ Click eliminar recibido para id:', idProducto);

    // 1️⃣ Cargar carrito actual
    let carrito = loadCarrito() || [];
    console.log('📥 Carrito antes de eliminar (from loadCarrito):', carrito);

    // 2️⃣ Validar existencia
    if (!carrito.some(p => String(p.id) === idProducto)) {
      console.warn('⚠️ Intento de eliminar id que no existe en carrito:', idProducto);
      return;
    }

    // 3️⃣ Filtrar y actualizar memoria + almacenamiento
    const nuevoCarrito = carrito.filter(p => String(p.id) !== idProducto);

    // 🔹 Actualizar la referencia global antes de guardar
    window.carrito = nuevoCarrito;

    try {
      saveCarrito(nuevoCarrito);
    } catch (err) {
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      console.warn('⚠️ saveCarrito falló, se usó localStorage directamente:', err);
    }

    // 🔹 Ahora sí sincronizamos el LS
    try {
      if (typeof guardarCarritoLS === 'function') guardarCarritoLS();
    } catch (e) {
      console.warn('⚠️ guardarCarritoLS no disponible:', e);
    }

    // 4️⃣ Forzamos re-render asincrónico para asegurar que el LS se actualizó
    Promise.resolve().then(() => {
      renderCartDropdown(nuevoCarrito);
      renderCartTable(nuevoCarrito);
      updateCartCount(nuevoCarrito);
      calcularResumen();

      document.dispatchEvent(new CustomEvent('actualizarCarrito', { detail: { carrito: nuevoCarrito } }));
      console.log(`✅ Producto ${idProducto} eliminado. Nuevo carrito:`, nuevoCarrito);
    });
  });
})();

// ===========================================================
// 🔹 Escucha global para refrescar tabla y menú en tiempo real
// ===========================================================
document.addEventListener("actualizarCarrito", (e) => {
  const carritoActualizado = e.detail?.carrito || JSON.parse(localStorage.getItem("carrito")) || [];
  console.log("♻️ Evento actualizarCarrito recibido. Refrescando tabla y menú con:", carritoActualizado);

  try {
    renderCartDropdown(carritoActualizado);
    renderCartTable(carritoActualizado);
    updateCartCount(carritoActualizado);
  } catch (err) {
    console.error("⚠️ Error refrescando después de actualización:", err);
  }

  // También recalcula el resumen
  try {
    import("./resumen_compra.js").then(mod => mod.calcularResumen());
  } catch (e) {
    console.warn("⚠️ No se pudo recalcular resumen al refrescar:", e);
  }
});


// ===========================================================
// 🔹 Inicialización automática (si el carrito está en localStorage)
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {
  try {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    renderCartDropdown(carrito);
    renderCartTable(carrito);
    updateCartCount(carrito);
    console.log(" info_carrito inicializado con datos del localStorage:", carrito);
  } catch (e) {
    console.error("❌ Error al inicializar info_carrito:", e);
  }
});
