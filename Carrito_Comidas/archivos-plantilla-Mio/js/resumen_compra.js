// ===================== resumen_compra.js =====================
import { loadCarrito, saveResumen } from './pro_localstorage.js';
console.log('resumen-compra cargado');

const PROMO_UMBRAL = 100000;
const PROMO_PORC = 0.10;

export function calcularResumen() {
  const carrito = loadCarrito();
  const subtotal = carrito.reduce((s, p) => s + (Number(p.precio || 0) * Number(p.cantidad || 0)), 0);
  const descuento = subtotal >= PROMO_UMBRAL ? Math.round(subtotal * PROMO_PORC) : 0;
  const total = subtotal - descuento;
  const resumen = {
    subtotal,
    descuento,
    total,
    fecha: new Date().toISOString(),
    cantidadProductos: carrito.reduce((s, p) => s + (p.cantidad || 0), 0)
  };

  try {
    saveResumen(resumen);
    console.log("💾 Resumen actualizado y guardado en localStorage:", resumen);
  } catch (e) {
    localStorage.setItem('pro-resumen', JSON.stringify(resumen));
  }

  actualizarUIResumen(resumen);
  return resumen;
}

// ===========================================================
// 🔹 Actualiza los elementos visuales de resumen
// ===========================================================
function actualizarUIResumen({ subtotal, descuento, total }) {
  const subEl = document.querySelector('.res-sub-total');
  const descEl = document.querySelector('.promo');
  const totEl = document.querySelector('.total');

  if (subEl) subEl.textContent = `$${subtotal.toLocaleString()}`;
  if (descEl) descEl.textContent = `$${descuento.toLocaleString()}`;
  if (totEl) totEl.textContent = `$${total.toLocaleString()}`;
}

// ===========================================================
// 🔹 Escucha cambios del selector de destino
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  const selectDestino = document.querySelector('.destino');
  const valorDomi = document.querySelector('.valor-domi');

  if (selectDestino && valorDomi) {
    selectDestino.addEventListener('change', () => {
      const texto = selectDestino.options[selectDestino.selectedIndex].text;
      const match = texto.match(/\$(\d+(?:\.\d+)?)/);
      const costo = match ? parseFloat(match[1].replace('.', '')) : 0;

      valorDomi.textContent = `$${costo.toLocaleString()}`;

      const resumen = calcularResumen();
      const totalFinal = resumen.total + costo;
      document.querySelector('.total').textContent = `$${totalFinal.toLocaleString()}`;
    });
  }

  // Botón Ir a pagar
  const btnPagar = document.querySelector('.btn-resumen');
  if (btnPagar) {
    btnPagar.addEventListener('click', () => {
      const resumenActual = calcularResumen();
      localStorage.setItem('pro-resumen', JSON.stringify(resumenActual));
      console.log("✅ Resumen guardado antes del checkout:", resumenActual);
      window.location.href = 'checkout.html';
    });
  }
});
