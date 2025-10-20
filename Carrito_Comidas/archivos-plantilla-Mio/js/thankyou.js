// ===========================================================
// Mostrar información del pedido en thankyou.html
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  const resumen = JSON.parse(localStorage.getItem('resumenFinal') || '{}');
  if (!resumen || !resumen.cliente) {
    alert('No hay datos de compra registrados.');
    window.location.href = 'index.html';
    return;
  }

  const divResumen = document.querySelector('.resumen-compra');
  if (divResumen) {
    const c = resumen.cliente;
    const info = `
      <h4>¡Gracias por tu compra, ${c.nombres} ${c.apellidos}!</h4>
      <p><strong>Orden:</strong> ${resumen.ordenId || '000'}</p>
      <p><strong>Dirección:</strong> ${c.direccion}</p>
      <p><strong>Celular:</strong> ${c.celular}</p>
      <p><strong>Email:</strong> ${c.email}</p>
      <hr>
      <p><strong>Destino:</strong> ${resumen.destino || 'N/A'}</p>
      <p><strong>Valor domicilio:</strong> $${(resumen.valorDomicilio || 0).toLocaleString()}</p>
      <p><strong>Método de pago:</strong> ${resumen.metodoPago || 'No especificado'}</p>
      <p><strong>Total:</strong> $${(resumen.total || 0).toLocaleString()}</p>
    `;
    divResumen.innerHTML = info;
  }

  // Limpiar carrito después de mostrar resumen
  localStorage.removeItem('carrito');
});
