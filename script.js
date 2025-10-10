/* Versión A - scripts claros y comentados */
document.addEventListener('DOMContentLoaded', () => {

  /* ========= Loader: se oculta después del evento load (más abajo) ========= */
  // (no aquí: se gestiona en window.addEventListener('load'))

  /* ========= MENU MÓVIL: toggle clase "responsive" en el nav (requisito) ========= */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');

  mobileMenuBtn.addEventListener('click', () => {
    // Alternar la clase 'responsive' tal y como pide el enunciado
    mainNav.classList.toggle('responsive');
    const expanded = mainNav.classList.contains('responsive');
    mobileMenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  /* ========= SUBMENU: mostrar/ocultar submenú al click ========= */
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      const isOpen = submenu.style.display === 'block';
      submenu.style.display = isOpen ? 'none' : 'block';
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  /* ========= SIDEBAR: abrir/cerrar con botones (left:0 / left:-width) ========= */
  const openSidebarBtn = document.getElementById('open-sidebar');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const sidebar = document.getElementById('sidebar');

  openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden','false');
    openSidebarBtn.setAttribute('aria-expanded','true');
  });

  closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden','true');
    openSidebarBtn.setAttribute('aria-expanded','false');
  });

  /* ========= ACORDEÓN: mostrar/ocultar contenido con style.display = "block" ========= */
  document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
  });

  /* ========= CHECKBOX: evento change para mostrar info oculta ========= */
  const chk = document.getElementById('show-info');
  const infoBlock = document.getElementById('info-block');
  chk.addEventListener('change', () => {
    infoBlock.style.display = chk.checked ? 'block' : 'none';
  });

  /* ========= SELECT SABOR: evento change ========= */
  const ice = document.getElementById('ice-cream');
  const saborP = document.getElementById('sabor-seleccionado');
  ice.addEventListener('change', () => {
    saborP.textContent = ice.value ? `Elegiste: ${ice.value}` : '';
  });

  /* ========= CONTRASEÑA: focus / blur / keyup ========= */
  const pwd = document.getElementById('pwd');
  const pwdMsg = document.getElementById('pwd-msg');

  function validarPwd(val) {
    const ok = val.length >= 8 && /\d/.test(val);
    pwdMsg.textContent = ok ? 'Contraseña válida' : 'Mínimo 8 caracteres y al menos 1 número.';
    pwdMsg.classList.remove('hidden');
    pwdMsg.style.color = ok ? 'green' : '#666';
    return ok;
  }

  pwd.addEventListener('focus', () => {
    pwdMsg.classList.remove('hidden');
  });

  pwd.addEventListener('keyup', (e) => {
    validarPwd(e.target.value);
  });

  pwd.addEventListener('blur', () => {
    // Dejamos visible el mensaje, pero podrías ocultarlo:
    // pwdMsg.classList.add('hidden');
  });

  /* ========= SELECTS DEPENDIENTES: país -> ciudad -> barrio ========= */
  const datos = {
    co: {
      Medellín: ['Laureles','El Poblado','Belén'],
      Bogotá: ['Chapinero','Usaquén']
    },
    us: {
      'New York': ['Manhattan','Brooklyn'],
      'San Francisco': ['SOMA','Mission']
    }
  };

  const selPais = document.getElementById('pais');
  const selCiudad = document.getElementById('ciudad');
  const selBarrio = document.getElementById('barrio');

  selPais.addEventListener('change', () => {
    selCiudad.innerHTML = '<option value="">--</option>';
    selBarrio.innerHTML = '<option value="">--</option>';
    const p = selPais.value;
    if (!p) return;
    Object.keys(datos[p]).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      selCiudad.appendChild(opt);
    });
  });

  selCiudad.addEventListener('change', () => {
    selBarrio.innerHTML = '<option value="">--</option>';
    const p = selPais.value;
    const c = selCiudad.value;
    if (!p || !c) return;
    datos[p][c].forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      selBarrio.appendChild(opt);
    });
  });

  /* ========= SCROLL: cambiar color del header y mostrar boton subir ========= */
  const header = document.getElementById('site-header');
  const btnTop = document.getElementById('btn-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
      btnTop.classList.remove('hidden');
    } else {
      header.classList.remove('scrolled');
      btnTop.classList.add('hidden');
    }
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========= TAREAS: crear con Enter o con botón; eliminar por botón ========== */
  const taskInput = document.getElementById('task-input');
  const taskAddBtn = document.getElementById('task-add');
  const taskList = document.getElementById('task-list');

  function crearTarea(text) {
    if (!text) return;
    const li = document.createElement('li');
    li.className = 'task-item';
    const span = document.createElement('span');
    span.textContent = text;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.type = 'button';
    btn.addEventListener('click', () => li.remove());
    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
    taskInput.value = '';
    taskInput.focus();
  }

  taskAddBtn.addEventListener('click', () => crearTarea(taskInput.value.trim()));
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') crearTarea(taskInput.value.trim());
  });

}); // DOMContentLoaded end

/* ========= Loader: mostrar hasta que window load termine + 3s simuladas ========= */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  // Mantenerlo visible al inicio (ya está) y esconderlo tras 3s para simular carga
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 350);
  }, 3000);
});
