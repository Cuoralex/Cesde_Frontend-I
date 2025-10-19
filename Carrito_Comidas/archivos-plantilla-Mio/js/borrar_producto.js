// borrar-producto.js
import { borrarProducto as bp } from './cantidades.js';
import { renderCartDropdown } from './info_carrito.js';
import { calcularResumen } from './resumen_compra.js';

export function borrarProducto(id){
  bp(id);
  renderCartDropdown();
  calcularResumen();
}
