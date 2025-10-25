document.getElementById('btnIniciar').addEventListener('click', () => {
  let tiempo = 0;
  const tiempoElem = document.getElementById('tiempo');
  const intervalo = setInterval(() => {
    tiempo++;
    tiempoElem.textContent = tiempo;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalo);
    alert("Tiempo terminado");
  }, 10000);
});
