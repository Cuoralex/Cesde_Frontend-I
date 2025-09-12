document.addEventListener('DOMContentLoaded', () => {
  // 1) Crear <h1> con texto "my presentation" y ubicarla antes del div#contenedor
  const contenedor = document.getElementById('contenedor');
  const h1 = document.createElement('h1');
  h1.textContent = 'my presentation';
  contenedor.parentNode.insertBefore(h1, contenedor);

  // 2) Crear <p> "my best friend is mickey" y ubicarla después de la <p> que está dentro del div
  const primerP = contenedor.querySelector('p'); // la p dentro del div (la primera)
  const nuevoP = document.createElement('p');
  nuevoP.textContent = 'my best friend is mickey';
  // insertarlo después del primerP
  primerP.insertAdjacentElement('afterend', nuevoP);

  // 3) Seleccionar el título (h1) y darle color; seleccionar la última p y ponerla en negrita y fondo
  h1.style.color = '#2c7a7b'; // color a la letra del h1
  // seleccionar todos los p y elegir el último
  const todosP = document.querySelectorAll('p');
  const ultimoP = todosP[todosP.length - 1];
  if (ultimoP) {
    ultimoP.style.fontWeight = '700';
    ultimoP.style.backgroundColor = '#fffbcc';
    ultimoP.style.padding = '0.2rem 0.4rem';
    ultimoP.style.borderRadius = '3px';
  }

  // 4) Reemplazar <ol> por <ul> y agregar atributo class="listado"
  const ol = document.getElementById('tareas');
  if (ol) {
    const ul = document.createElement('ul');
    ul.classList.add('listado');

    // mover todos los li del ol al ul (conservando el contenido)
    Array.from(ol.children).forEach(li => {
      const nuevoLi = document.createElement('li');
      // copiar el texto tal cual (preserva acentos/case)
      nuevoLi.textContent = li.textContent;
      ul.appendChild(nuevoLi);
    });

    // reemplazar el ol por ul en el DOM
    ol.replaceWith(ul);
  }

  // 5) Desde JS, agregar clase en CSS al h2 (la clase se define en styles.css: .estilo-h2)
  const h2 = contenedor.querySelector('h2');
  if (h2) {
    h2.classList.add('estilo-h2');
  }

  // 6) Agregar un ítem al listado con texto "Recoger a los niños" y ubicarlo después del item "preparar almuerzo"
  // (el listado ahora es UL con class listado)
  const lista = document.querySelector('.listado');
  if (lista) {
    // buscar el li cuyo texto es "preparar almuerzo" (comparamos en minúsculas para robustez)
    const items = Array.from(lista.children);
    const preparar = items.find(li => li.textContent.trim().toLowerCase() === 'preparar almuerzo');

    const liRecoger = document.createElement('li');
    liRecoger.textContent = 'Recoger a los niños';

    if (preparar) {
      preparar.insertAdjacentElement('afterend', liRecoger);
    } else {
      // si no se encuentra, lo añado al final
      lista.appendChild(liRecoger);
    }

    // 7) Crear (desde CSS ya definidas) clases cumplido y fallido. Agregar cumplido a:
    // "desayunar", "hacer almuerzo" y "recoger a los niños"
    // Agregar fallido a: "ir al banco" y "recoger a los niños"
    // (recoger a los niños tendrá ambas clases si corresponde)
    const asignarClasesPorTexto = (texto, clase) => {
      const li = Array.from(lista.children).find(
        x => x.textContent.trim().toLowerCase() === texto.trim().toLowerCase()
      );
      if (li) li.classList.add(clase);
    };

    asignarClasesPorTexto('desayunar', 'cumplido');
    asignarClasesPorTexto('hacer almuerzo', 'cumplido');
    asignarClasesPorTexto('Recoger a los niños', 'cumplido'); // caso exacto inicial
    // fallidos
    asignarClasesPorTexto('ir al banco', 'fallido');
    asignarClasesPorTexto('Recoger a los niños', 'fallido'); // recoger recibe ambas si corresponden
  }

  // 8) Seleccionar las etiquetas p que tienen la clase .ps y agregarles color y tamaño de letra (desde JS)
  const ps = document.querySelectorAll('p.ps');
  ps.forEach(p => {
    p.style.color = '#6b46c1';
    p.style.fontSize = '1.05rem';
  });

  // --- Opcional: mejoras visuales (no solicitadas pero útiles) ---
  // darle un pequeño estilo inline al h1 para destacarlo (además del color ya aplicado)
  h1.style.marginBottom = '0.6rem';
});
