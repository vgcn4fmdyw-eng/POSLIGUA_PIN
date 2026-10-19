// ================================
// Formulario de contacto (simulado)
// ================================
function enviarFormulario(event) {
  event.preventDefault();

  const mensajeOk = document.getElementById('mensaje-enviado');
  mensajeOk.style.display = 'block';

  // Limpiar el formulario
  event.target.reset();

  // Ocultar el mensaje después de 4 segundos
  setTimeout(() => {
    mensajeOk.style.display = 'none';
  }, 4000);
}

// ================================
// Animación de aparición al hacer scroll
// ================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tarjeta, .habilidad').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ================================
// Resaltar enlace activo en el nav
// ================================
const secciones = document.querySelectorAll('section[id]');
const enlaces   = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let actual = '';
  secciones.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      actual = sec.getAttribute('id');
    }
  });

  enlaces.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${actual}`
      ? '#c4b5fd'
      : '#ffffff';
  });
});
