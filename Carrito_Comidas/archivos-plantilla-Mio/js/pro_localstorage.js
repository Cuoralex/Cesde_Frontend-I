// ======================================================
// 📦 pro-localstorage.js  —  Gestión del almacenamiento
// ======================================================

export const LS_KEYS = {
  CARRITO: 'pro-carrito',
  RESUMEN: 'pro-resumen',
  COMPRAS: 'compra'
};

// ----------------------
// 🔹 Guardar y cargar carrito
// ----------------------
export function saveCarrito(carrito) {
  localStorage.setItem(LS_KEYS.CARRITO, JSON.stringify(carrito || []));
}

export function loadCarrito() {
  try { return JSON.parse(localStorage.getItem(LS_KEYS.CARRITO)) || []; }
  catch(e) { return []; }
}

// ----------------------
// 🔹 Guardar y cargar resumen
// ----------------------
export function saveResumen(resumen) {
  localStorage.setItem(LS_KEYS.RESUMEN, JSON.stringify(resumen || {}));
}

export function loadResumen() {
  try { return JSON.parse(localStorage.getItem(LS_KEYS.RESUMEN)) || {}; }
  catch(e) { return {}; }
}

// ----------------------
// 🔹 Registro de compras históricas
// ----------------------
export function pushCompra(compra) {
  const arr = (JSON.parse(localStorage.getItem(LS_KEYS.COMPRAS)) || []);
  arr.unshift(compra);
  localStorage.setItem(LS_KEYS.COMPRAS, JSON.stringify(arr));
}

export function loadCompras() {
  try { return JSON.parse(localStorage.getItem(LS_KEYS.COMPRAS)) || []; }
  catch(e) { return []; }
}

// ----------------------
// 🔹 Limpieza de datos
// ----------------------
export function clearAll() {
  localStorage.removeItem(LS_KEYS.CARRITO);
  localStorage.removeItem(LS_KEYS.RESUMEN);
  // Se mantiene COMPRAS históricas
}

// ======================================================
// 🔄 Compatibilidad con import del HTML
// ======================================================

// Sincroniza el carrito entre localStorage y variable global
export function sincronizarCarritoLS() {
  const carrito = loadCarrito();
  window.carrito = carrito;
  console.log("🔁 Carrito sincronizado desde localStorage:", carrito);
  return carrito;
}

// Guarda el carrito actual (si existe en window.carrito)
export function guardarCarritoLS() {
  if (window.carrito && Array.isArray(window.carrito)) {
    saveCarrito(window.carrito);
    console.log("💾 Carrito guardado nuevamente en localStorage.");
  }
}
