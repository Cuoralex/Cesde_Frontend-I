// ==========================================================
// ✅ checkout.js — Integración checkout + carrito + resumen
// ==========================================================
import { loadCarrito, saveCarrito } from './pro_localstorage.js';
import { calcularResumen } from './resumen_compra.js';
import { renderCartDropdown } from './info_carrito.js';

console.log("checkout.js cargado correctamente 🧾");

// ===========================================================
// 📦 Cargar resumen guardado desde cart.html
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {
  const resumenPrevio = JSON.parse(localStorage.getItem('pro-resumen') || '{}');


  if (Object.keys(resumenPrevio).length) {
    console.log("📦 Cargando resumen previo desde cart:", resumenPrevio);

    const subEl = document.querySelector(".res-sub-total");
    const valorDomiEl = document.querySelector(".valor-domi");
    const promoEl = document.querySelector(".promo");
    const totalEl = document.querySelector(".total");
    const destinoEl = document.querySelector(".destino-select");

    if (subEl) subEl.textContent = `$${resumenPrevio.subtotal.toLocaleString()}`;
    if (valorDomiEl) valorDomiEl.textContent = `$${resumenPrevio.valorDomicilio.toLocaleString()}`;
    if (promoEl) promoEl.textContent = `-$${resumenPrevio.descuento.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${resumenPrevio.total.toLocaleString()}`;
    if (destinoEl && resumenPrevio.destino) destinoEl.value = resumenPrevio.destino;
  }

  // Luego ejecutas tus funciones normales
  renderCheckout();
  initCheckoutEvents();
  console.log("🧩 checkout inicializado correctamente.");
});


// ==========================================================
// 🔹 Renderiza los productos del carrito en checkout.html
// ==========================================================
function renderCheckout() {
  const carrito = loadCarrito() || [];
  const contenedorProductos = document.querySelector(".cart-summary .productos");

  if (!contenedorProductos) {
    console.warn("⚠️ No se encontró contenedor .productos en checkout.html");
    return;
  }

  contenedorProductos.innerHTML = "";

  if (carrito.length === 0) {
    contenedorProductos.innerHTML = `<p class="text-muted text-center">🛒 Tu carrito está vacío.</p>`;
    return;
  }

  carrito.forEach((p) => {
    const subtotal = (p.precio * p.cantidad).toFixed(2);
    const item = document.createElement("div");
    item.className = "d-flex justify-content-between align-items-center mb-2 border-bottom pb-2";
    item.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="images/${p.id}.png" onerror="this.src='images/default.png'" width="50" height="50" class="me-2 rounded" alt="${p.nombre}">
        <div>
          <p class="m-0 fw-bold">${p.nombre}</p>
          <small>$${p.precio.toFixed(2)} x ${p.cantidad}</small>
        </div>
      </div>
      <div class="text-end">
        <p class="m-0 fw-bold">$${subtotal}</p>
      </div>
    `;
    contenedorProductos.appendChild(item);
  });

  calcularTotales();
}

// ===========================================================
// 🔹 Cargar datos del resumen desde localStorage (cart → checkout)
// ===========================================================
function cargarResumenDesdeCart() {
  // Busca el resumen más reciente disponible
  let resumen =
    JSON.parse(localStorage.getItem("resumenFinal") || "null") ||
    JSON.parse(localStorage.getItem("pro-resumen") || "{}");

  // Si hay dos versiones, elige la que tenga fecha más reciente
  const resumenPro = JSON.parse(localStorage.getItem("pro-resumen") || "{}");
  const resumenFinal = JSON.parse(localStorage.getItem("resumenFinal") || "{}");

  if (resumenPro.fecha && resumenFinal.fecha) {
    resumen =
      new Date(resumenFinal.fecha) > new Date(resumenPro.fecha)
        ? resumenFinal
        : resumenPro;
  } else if (resumenFinal.fecha) {
    resumen = resumenFinal;
  } else if (resumenPro.fecha) {
    resumen = resumenPro;
  }

  console.log("📦 Cargando resumen más reciente:", resumen);

  const carrito = loadCarrito() || [];

  // Mostrar los productos (como antes)
  const contenedor = document.querySelector(".cart-summary .productos");
  if (contenedor && carrito.length > 0) {
    contenedor.innerHTML = "";
    carrito.forEach((p) => {
      const subtotal = (p.precio * p.cantidad).toFixed(2);
      contenedor.innerHTML += `
        <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
          <div class="d-flex align-items-center">
            <img src="images/${p.id}.png" width="50" height="50" class="me-2 rounded" alt="${p.nombre}">
            <div>
              <p class="m-0 fw-bold">${p.nombre}</p>
              <small>$${p.precio.toFixed(2)} x ${p.cantidad}</small>
            </div>
          </div>
          <div class="text-end fw-bold">$${subtotal}</div>
        </div>`;
    });
  }

  // Mostrar totales guardados
  const subEl = document.querySelector(".res-sub-total");
  const domiEl = document.querySelector(".valor-domi");
  const promoEl = document.querySelector(".promo");
  const totalEl = document.querySelector(".total");
  const destinoEl = document.querySelector(".destino");

  const subtotal = Number(resumen.subtotal || 0);
  const valorDomicilio = Number(resumen.valorDomicilio || 0);
  const descuento = Number(resumen.descuento || 0);
  const total = Number(resumen.total || subtotal + valorDomicilio - descuento);
  const destino = resumen.destino || "Medellin";

  if (subEl) subEl.textContent = `$${subtotal.toLocaleString()}`;
  if (domiEl) domiEl.textContent = `$${valorDomicilio.toLocaleString()}`;
  if (promoEl) promoEl.textContent = `$${descuento.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
  if (destinoEl) destinoEl.textContent = destino;

  console.log("✅ Resumen mostrado en checkout:", {
    subtotal,
    valorDomicilio,
    descuento,
    total,
    destino,
  });
}


// ==========================================================
// 🔹 Cálculo total con domicilio + descuento
// ==========================================================
function calcularTotales() {
  const carrito = loadCarrito() || [];
  const subtotal = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  // Ciudades y tarifas de envío
  const ciudadSelect = document.querySelector(".destino-select");
  const valorDomiEl = document.querySelector(".valor-domi");
  const promoEl = document.querySelector(".promo");
  const subEl = document.querySelector(".res-sub-total");
  const totalEl = document.querySelector(".total");

  if (!ciudadSelect) return;

  const valorEnvio = Number(ciudadSelect.selectedOptions[0].dataset.costo || 0);
  const descuento = subtotal >= 100000 ? subtotal * 0.1 : 0; // regla igual que resumen_compra.js
  const total = subtotal + valorEnvio - descuento;

  valorDomiEl.textContent = `$${valorEnvio.toLocaleString()}`;
  promoEl.textContent = `-$${descuento.toLocaleString()}`;
  subEl.textContent = `$${subtotal.toLocaleString()}`;
  totalEl.textContent = `$${total.toLocaleString()}`;

  // Actualiza localStorage (para coherencia entre pantallas)
  calcularResumen();
}

// ==========================================================
// 🔹 Eventos — cambio de ciudad, botón "Place Order"
// ==========================================================
function initCheckoutEvents() {
  const ciudadSelect = document.querySelector(".destino-select");
  const botonPagar = document.querySelector(".btn-checkout");

  if (ciudadSelect) {
    ciudadSelect.addEventListener("change", () => calcularTotales());
  }

  if (botonPagar) {
    botonPagar.addEventListener("click", () => {
      const carrito = loadCarrito();
      if (!carrito.length) {
        alert("⚠️ Tu carrito está vacío.");
        return;
      }

      // Aquí podrías guardar los datos del formulario o simular pago
      alert("✅ Pedido realizado con éxito. ¡Gracias por tu compra!");
      localStorage.removeItem("carrito");
      saveCarrito([]);
      renderCartDropdown([]);
      renderCheckout();
      calcularTotales();
    });
  }
}

// ==========================================================
// 🔹 Inicialización
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
  cargarResumenDesdeCart(); // <── 🔹 aquí
  initCheckoutEvents();
  console.log("🧩 checkout inicializado correctamente.");
});
