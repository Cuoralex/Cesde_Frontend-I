// ===================== resumen_compra.js =====================
import { loadCarrito, saveResumen } from './pro_localstorage.js';

console.log('resumen-compra cargado');

// Configuración de promociones
const PROMO_UMBRAL = 100000;
const PROMO_PORC = 0.10;

// ===========================================================
// 🔹 Calcula el resumen de la compra (subtotal, descuento, total)
// ===========================================================
export function calcularResumen() {
  const carrito = loadCarrito() || [];
  const subtotal = carrito.reduce((sum, p) => sum + (Number(p.precio || 0) * Number(p.cantidad || 0)), 0);

  // Descuento promocional si aplica
  const descuento = subtotal >= PROMO_UMBRAL ? Math.round(subtotal * PROMO_PORC) : 0;
  const total = subtotal - descuento;

  // Crear objeto resumen
  const resumen = {
    subtotal,
    descuento,
    total,
    fecha: new Date().toISOString(),
    cantidadProductos: carrito.reduce((s, p) => s + (p.cantidad || 0), 0)
  };

  // Guardar en localStorage
  try {
    saveResumen(resumen);
  } catch (e) {
    localStorage.setItem('pro-resumen', JSON.stringify(resumen));
  }

  // Actualizar elementos del DOM
  const subEl = document.querySelector('.res-sub-total');
  const descEl = document.querySelector('.promo');
  const totEl = document.querySelector('.total');

  if (subEl) subEl.textContent = `$${subtotal.toLocaleString()}`;
  if (descEl) descEl.textContent = descuento > 0 ? `-$${descuento.toLocaleString()}` : '$0';
  if (totEl) totEl.textContent = `$${total.toLocaleString()}`;

  console.log('💾 Resumen actualizado y guardado en localStorage:', resumen);
  return resumen;
}

// ===========================================================
// 🔹 Inicialización automática al cargar el DOM
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  try {
    calcularResumen();
  } catch (e) {
    console.error('❌ Error al calcular resumen:', e);
  }
});
