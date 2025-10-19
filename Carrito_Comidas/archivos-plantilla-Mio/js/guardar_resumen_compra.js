// guardar-resumen-compra.js
import { loadCarrito, pushCompra } from './pro_localstorage.js';
import { calcularResumen } from './resumen_compra.js';
import { saveCarrito } from './pro_localstorage.js';

console.log('guardar-resumen-compra cargado');

function validarCampos(formSelector = '#form-pago'){
  const form = document.querySelector(formSelector);
  if(!form) return { ok: false, faltantes: ['Formulario no encontrado'] };
  const required = form.querySelectorAll('[data-required]');
  const faltantes = [];
  required.forEach(inp => {
    if(!inp.value || String(inp.value).trim() === ''){
      faltantes.push(inp.dataset.label || inp.name || inp.id || 'campo');
    }
  });
  return { ok: faltantes.length === 0, faltantes };
}

export function procesarCompra(formSelector = '#form-pago'){
  const valid = validarCampos(formSelector);
  if(!valid.ok){
    alert('Faltan datos obligatorios: ' + valid.faltantes.join(', '));
    return false;
  }
  const carrito = loadCarrito();
  if(!carrito || carrito.length === 0){
    alert('No hay productos en el carrito');
    return false;
  }
  const resumen = calcularResumen();
  const form = document.querySelector(formSelector);
  const datos = {};
  new FormData(form).forEach((v,k)=> datos[k]=v);
  const compra = { resumen, datos, fechaRegistro: new Date().toISOString(), productos: carrito };
  pushCompra(compra);
  // vaciar carrito
  saveCarrito([]);
  // actualizar UI: recarga tabla y contador si existen
  document.querySelectorAll('.contar-pro').forEach(e=> e.textContent = '0');
  const tbody = document.getElementById('body-cart');
  if(tbody) tbody.innerHTML = `<tr><td colspan="6" class="text-center">No hay productos para mostrar</td></tr>`;
  alert('Compra registrada correctamente ✅');
  return true;
}
