/* Versión B - scripts mejorados
   - menu-btn: toggle clase 'responsive' en nav (requisito del enunciado)
   - side-open: toggle sidebar (retractil)
   - side-close y overlay cierran sidebar
   - submenu toggle
   - cierre con ESC
   - restablecer en resize (desktop)
   - acordeón, checkbox, selects dependientes, pwd, tasks, scroll/top
*/

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* Loader */
window.addEventListener('load', () => {
  const loader = $('#loader');
  setTimeout(() => {
    if (loader) loader.remove();
  }, 1000);
});

/* NAV responsive (hamburger) */
const menuBtn = $('#menu-btn');
const nav = $('#nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('responsive');
  const expanded = nav.classList.contains('responsive');
  menuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

/* Close responsive nav when a link is clicked (mobile) */
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && nav.classList.contains('responsive')) {
    nav.classList.remove('responsive');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

/* SUBMENU toggle */
$$('.submenu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const submenu = btn.nextElementSibling;
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    if (open) {
      submenu.style.display = 'none';
      submenu.setAttribute('aria-hidden', 'true');
    } else {
      submenu.style.display = 'block';
      submenu.setAttribute('aria-hidden', 'false');
    }
  });
});

/* SIDEBAR (retractil) */
const sideOpen = $('#side-open');
const sideClose = $('#side-close');
const sidebar = $('#sidebar');
const overlay = $('#sidebar-overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  sidebar.setAttribute('aria-hidden', 'false');
  sideOpen.setAttribute('aria-expanded', 'true');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  sidebar.setAttribute('aria-hidden', 'true');
  sideOpen.setAttribute('aria-expanded', 'false');
}

sideOpen.addEventListener('click', () => {
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) closeSidebar(); else openSidebar();
});
sideClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

/* ESC key closes nav/submenu/sidebar if open */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (nav.classList.contains('responsive')) { nav.classList.remove('responsive'); menuBtn.setAttribute('aria-expanded','false'); }
    if (sidebar.classList.contains('open')) closeSidebar();
    // close submenus
    $$('.submenu-btn').forEach(b => {
      const sm = b.nextElementSibling;
      if (sm && sm.style.display === 'block') { sm.style.display = 'none'; b.setAttribute('aria-expanded','false'); sm.setAttribute('aria-hidden','true'); }
    });
  }
});

/* On resize: if desktop, remove mobile classes */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    if (nav.classList.contains('responsive')) nav.classList.remove('responsive');
    if (sidebar.classList.contains('open')) closeSidebar();
  }
});

/* ACCORDION */
$$('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });
});

/* CHECKBOX show/hide */
$('#chk-info').addEventListener('change', (e) => {
  $('#info').classList.toggle('hidden', !e.target.checked);
});

/* FLAVOR select */
$('#flavor').addEventListener('change', (e) => {
  $('#flavor-txt').textContent = e.target.value ? `Elegiste ${e.target.value}` : '';
});

/* PASSWORD validation */
$('#pwd').addEventListener('focus', () => {
  $('#pwd-msg').classList.remove('hidden');
});
$('#pwd').addEventListener('keyup', (e) => {
  const v = e.target.value;
  const ok = v.length >= 8 && /\d/.test(v);
  $('#pwd-msg').textContent = ok ? 'Contraseña válida' : 'Mínimo 8 caracteres y 1 número';
  $('#pwd-msg').style.color = ok ? 'green' : '';
});

/* SELECTS dependientes */
const data = {
  co: { Medellín: ['Laureles', 'El Poblado', 'Belén'], Bogotá: ['Chapinero', 'Usaquén'] },
  us: { 'New York': ['Manhattan', 'Brooklyn'], 'San Francisco': ['SOMA', 'Mission'] }
};
$('#pais').addEventListener('change', (e) => {
  const p = e.target.value;
  const ciudad = $('#ciudad');
  const barrio = $('#barrio');
  ciudad.innerHTML = '<option value="">--</option>';
  barrio.innerHTML = '<option value="">--</option>';
  if (p && data[p]) Object.keys(data[p]).forEach(c => ciudad.innerHTML += `<option>${c}</option>`);
});
$('#ciudad').addEventListener('change', (e) => {
  const p = $('#pais').value;
  const c = e.target.value;
  const barrio = $('#barrio');
  barrio.innerHTML = '<option value="">--</option>';
  if (p && c && data[p] && data[p][c]) data[p][c].forEach(b => barrio.innerHTML += `<option>${b}</option>`);
});

/* SCROLL header color and top button */
const header = $('#header');
const topBtn = $('#top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.style.background = '#274a78';
    topBtn.classList.remove('hidden');
  } else {
    header.style.background = '';
    topBtn.classList.add('hidden');
  }
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* TASKS (Enter + button) */
function addTask(txt) {
  if (!txt) return;
  const li = document.createElement('li');
  li.innerHTML = `<span>${txt}</span><button type="button">Eliminar</button>`;
  li.querySelector('button').addEventListener('click', () => li.remove());
  $('#list').appendChild(li);
  $('#task').value = '';
  $('#task').focus();
}
$('#add').addEventListener('click', () => addTask($('#task').value.trim()));
$('#task').addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask($('#task').value.trim()); });

