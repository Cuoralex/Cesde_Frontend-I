// cantidades.js
import { loadCarrito, saveCarrito } from './pro_localstorage.js';

console.log('cantidades cargado');

export function cambiarCantidad(id, delta){
  const carrito = loadCarrito();
  const idx = carrito.findIndex(p => p.id === String(id));
  if(idx === -1) return;
  carrito[idx].cantidad = Math.max(0, (carrito[idx].cantidad || 0) + Number(delta));
  if(carrito[idx].cantidad === 0) carrito.splice(idx,1);
  saveCarrito(carrito);
}

export function borrarProducto(id){
  const carrito = loadCarrito().filter(p => p.id !== String(id));
  saveCarrito(carrito);
}

export function obtenerSubtotal(){
  const carrito = loadCarrito();
  return carrito.reduce((s,p)=> s + (Number(p.precio||0) * Number(p.cantidad||0)), 0);
}
