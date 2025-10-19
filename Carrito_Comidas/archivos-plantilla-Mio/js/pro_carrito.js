// pro-carrito.js
import { sincronizarCarritoLS, guardarCarritoLS, loadCarrito, saveCarrito } from './pro_localstorage.js';
import { renderCartDropdown, renderCartTable, updateCartCount } from './info_carrito.js';
import { calcularResumen } from './resumen_compra.js';

console.log('pro-carrito cargado');

function ensureWindowCarrito(){
  if(!window.carrito) {
    window.carrito = loadCarrito();
  }
}

export function agregarAlCarrito(producto){
  ensureWindowCarrito();
  const idx = window.carrito.findIndex(p => p.id === producto.id);
  if(idx >= 0){
    window.carrito[idx].cantidad = (window.carrito[idx].cantidad || 0) + 1;
  } else {
    window.carrito.push({...producto, cantidad: 1});
  }

  saveCarrito(window.carrito);
  guardarCarritoLS();

  // ✅ CAMBIO AQUÍ: pasar el carrito actualizado como argumento
  renderCartDropdown(window.carrito);
  renderCartTable(window.carrito);
  updateCartCount(window.carrito);

  calcularResumen();

  console.log(`🛒 Producto agregado: ${producto.nombre}`);
}

// Inicializa listeners en botones (soporta varias formas)
export function initAddButtons(selectorList){
  ensureWindowCarrito();
  const selectors = selectorList || ['.btn-add-carrito','[data-add-cart]','.agregar-carrito'];
  const elems = new Set();
  selectors.forEach(s => document.querySelectorAll(s).forEach(e=> elems.add(e)));
  elems.forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const el = ev.currentTarget;
      // soporta data attributes o atributos personalizados
      const id = el.dataset.id || el.getAttribute('data-id') || el.getAttribute('id') || (el.closest('[data-id]') && el.closest('[data-id]').dataset.id);
      const nombre = el.dataset.nombre || el.getAttribute('data-nombre') || el.getAttribute('aria-label') || el.textContent.trim();
      const precioRaw = el.dataset.precio || el.getAttribute('data-precio') || el.getAttribute('data-price');
      const precio = precioRaw ? Number(precioRaw) : 0;
      if(!id){
        console.warn('botón agregar sin data-id', el);
        return;
      }
      agregarAlCarrito({id: String(id), nombre: String(nombre||'Producto'), precio: Number(precio||0)});
    });
  });
}

// utilidad para vaciar carrito (debug)
export function vaciarCarrito(){
  window.carrito = [];
  saveCarrito(window.carrito);
  guardarCarritoLS();
  renderCartDropdown();
  renderCartTable();
  updateCartCount();
  calcularResumen();
}

// export default no usado
// ======================= Inicialización =======================
document.addEventListener('DOMContentLoaded', () => {
  try {
    initAddButtons();          // ✅ activa los botones agregar
    renderCartDropdown();      // actualiza menú desplegable
    updateCartCount();         // actualiza contador
    renderCartTable();         // actualiza tabla si existe
    calcularResumen();         // actualiza subtotal y totales

    console.log("🧩 pro_carrito inicializado correctamente.");
  } catch (e) {
    console.error("❌ Error al inicializar pro_carrito:", e);
  }
});
