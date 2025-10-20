// ===================== resumen_compra.js =====================
import { loadCarrito, saveResumen } from './pro_localstorage.js';
console.log('resumen-compra cargado');

const PROMO_UMBRAL = 100000;
const PROMO_PORC = 0.10;

// ===========================================================
// 🔹 Calcular y guardar resumen del carrito
// ===========================================================
export function calcularResumen() {
  const carrito = loadCarrito();
  const subtotal = carrito.reduce(
    (s, p) => s + (Number(p.precio || 0) * Number(p.cantidad || 0)),
    0
  );
  const descuento = subtotal >= PROMO_UMBRAL ? Math.round(subtotal * PROMO_PORC) : 0;
  const total = subtotal - descuento;

  const resumen = {
    subtotal,
    descuento,
    total,
    fecha: new Date().toISOString(),
    cantidadProductos: carrito.reduce((s, p) => s + (p.cantidad || 0), 0),
  };

  // 💾 Fusionar con lo que ya exista en localStorage
  try {
    const previo = JSON.parse(localStorage.getItem('pro-resumen') || '{}');
    const resumenFusionado = { ...previo, ...resumen };

    // Guardar resumen fusionado
    localStorage.setItem('pro-resumen', JSON.stringify(resumenFusionado));
    console.log("💾 Resumen actualizado y fusionado en localStorage:", resumenFusionado);

    if (typeof saveResumen === 'function') {
      saveResumen(resumenFusionado);
    }

    actualizarUIResumen(resumenFusionado);
    return resumenFusionado;

  } catch (e) {
    console.error("❌ Error al guardar el resumen fusionado:", e);
    localStorage.setItem('pro-resumen', JSON.stringify(resumen));
    actualizarUIResumen(resumen);
    return resumen;
  }
}

// ===========================================================
// 🔹 Actualiza los elementos visuales del resumen
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
// 🔹 Manejo del destino y persistencia del resumen completo
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  const selectDestino = document.querySelector('.destino');
  const valorDomi = document.querySelector('.valor-domi');
  const totalEl = document.querySelector('.total');
  const btnPagar = document.querySelector('.btn-resumen');

  // 🔹 Cargar resumen guardado (si existe)
  let resumenGuardado = JSON.parse(localStorage.getItem('pro-resumen') || '{}');

  // 🔸 Si hay destino previo, seleccionarlo
  if (selectDestino && resumenGuardado.destino) {
    const option = Array.from(selectDestino.options).find(
      opt => opt.value === resumenGuardado.destino
    );
    if (option) selectDestino.value = option.value;
  }

  // 🔸 Calcular costo actual del destino
  const texto = selectDestino ? selectDestino.options[selectDestino.selectedIndex].text : '';
  const match = texto.match(/\$(\d+(?:\.\d+)?)/);
  const costoInicial = match ? parseFloat(match[1].replace('.', '')) : 0;
  if (valorDomi) valorDomi.textContent = `$${costoInicial.toLocaleString()}`;

  // 🔸 Calcular total inicial (si hay resumen previo)
  const resumenBase = calcularResumen();
  const totalInicial = (resumenBase.total || 0) + costoInicial;
  if (totalEl) totalEl.textContent = `$${totalInicial.toLocaleString()}`;

  // ===========================================================
  // 🔹 Escuchar cambios en el selector de destino
  // ===========================================================
  if (selectDestino) {
    selectDestino.addEventListener('change', () => {
      const textoSel = selectDestino.options[selectDestino.selectedIndex].text;
      const matchSel = textoSel.match(/\$(\d+(?:\.\d+)?)/);
      const costo = matchSel ? parseFloat(matchSel[1].replace('.', '')) : 0;

      valorDomi.textContent = `$${costo.toLocaleString()}`;

      const resumen = calcularResumen();
      const totalFinal = (resumen.total || 0) + costo;

      if (totalEl) totalEl.textContent = `$${totalFinal.toLocaleString()}`;

      // 💾 Guardar resumen actualizado
      const resumenConDomi = {
        ...resumen,
        valorDomicilio: costo,
        destino: selectDestino.value,
        total: totalFinal,
      };
      localStorage.setItem('pro-resumen', JSON.stringify(resumenConDomi));
      console.log("💾 Resumen actualizado con domicilio:", resumenConDomi);
    });
  }

  // ===========================================================
  // 🔹 Botón "Ir a pagar": guarda resumen completo y redirige
  // ===========================================================
  if (btnPagar) {
    btnPagar.addEventListener('click', () => {
      const resumenActual = JSON.parse(localStorage.getItem('pro-resumen') || '{}');
      localStorage.setItem('resumenFinal', JSON.stringify(resumenActual));
      console.log("✅ Resumen guardado antes del checkout:", resumenActual);
      window.location.href = 'checkout.html';
    });
  }
});
