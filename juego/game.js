// ================================================
// Tres en Raya - Juego completo
// Autor: Danna Zuleyka Posligua Pin
// Asignatura: Interfaces Humano Computador
// Docente: Willian Delgado
// ================================================

// --- Estado del juego ---
let tablero        = Array(9).fill(null); // null | 'X' | 'O'
let jugadorActual  = 'X';
let juegoTerminado = false;

// Marcador de victorias
const marcador = { X: 0, O: 0, empate: 0 };

// Combinaciones ganadoras
const COMBINACIONES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6],             // diagonales
];

// --- Referencias al DOM ---
const celdas      = document.querySelectorAll('.celda');
const estadoEl    = document.getElementById('estado');
const overlay     = document.getElementById('overlay');
const emojiEl     = document.getElementById('emoji-resultado');
const tituloEl    = document.getElementById('titulo-resultado');
const textoEl     = document.getElementById('texto-resultado');
const puntosX     = document.getElementById('puntos-x');
const puntosO     = document.getElementById('puntos-o');
const puntosEmp   = document.getElementById('puntos-empate');
const btnReinicio = document.getElementById('btn-reiniciar');
const btnReset    = document.getElementById('btn-reset');

// --- Inicializar eventos ---
celdas.forEach(celda => celda.addEventListener('click', manejarClick));
btnReinicio.addEventListener('click', nuevaPartida);
btnReset.addEventListener('click', reiniciarMarcador);

// --- Manejar clic en una celda ---
function manejarClick(e) {
  const index = parseInt(e.currentTarget.dataset.index);

  // Ignorar si la celda está ocupada o el juego terminó
  if (tablero[index] || juegoTerminado) return;

  // Registrar jugada
  tablero[index] = jugadorActual;
  renderizarCelda(e.currentTarget, jugadorActual);

  // Verificar resultado
  const ganador = verificarGanador();

  if (ganador) {
    mostrarResultado('ganador', ganador.jugador, ganador.combo);
    return;
  }

  if (tablero.every(c => c !== null)) {
    mostrarResultado('empate');
    return;
  }

  // Cambiar turno
  jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
  actualizarEstado();
  actualizarMarcadorActivo();
}

// --- Renderizar símbolo en celda ---
function renderizarCelda(celda, jugador) {
  celda.textContent = jugador === 'X' ? '✕' : '◯';
  celda.classList.add(jugador.toLowerCase(), 'animada');
  celda.disabled = true;
}

// --- Verificar ganador ---
function verificarGanador() {
  for (const combo of COMBINACIONES) {
    const [a, b, c] = combo;
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return { jugador: tablero[a], combo };
    }
  }
  return null;
}

// --- Mostrar resultado ---
function mostrarResultado(tipo, jugador = null, combo = null) {
  juegoTerminado = true;

  if (tipo === 'ganador') {
    // Resaltar celdas ganadoras
    combo.forEach(i => celdas[i].classList.add('ganadora'));

    // Actualizar marcador
    marcador[jugador]++;
    actualizarMarcador();

    const nombre = jugador === 'X' ? 'Jugador X' : 'Jugador O';
    const emoji  = jugador === 'X' ? '🎉' : '🥳';

    emojiEl.textContent  = emoji;
    tituloEl.textContent = '¡Tenemos ganador!';
    textoEl.textContent  = `${nombre} ganó esta partida`;
    estadoEl.textContent = `🏆 ¡${nombre} ganó!`;

  } else {
    // Empate
    marcador.empate++;
    actualizarMarcador();

    emojiEl.textContent  = '🤝';
    tituloEl.textContent = '¡Empate!';
    textoEl.textContent  = 'Nadie ganó esta vez. ¡Vuelvan a intentarlo!';
    estadoEl.textContent = '🤝 ¡Empate!';
  }

  // Mostrar modal después de un pequeño delay
  setTimeout(() => overlay.classList.add('visible'), 600);
}

// --- Actualizar texto de estado ---
function actualizarEstado() {
  const simbolo = jugadorActual === 'X' ? '❌' : '⭕';
  estadoEl.textContent = `Turno de ${simbolo} Jugador ${jugadorActual}`;
}

// --- Actualizar marcador visual ---
function actualizarMarcador() {
  puntosX.textContent   = marcador.X;
  puntosO.textContent   = marcador.O;
  puntosEmp.textContent = marcador.empate;
}

// --- Resaltar columna del jugador activo ---
function actualizarMarcadorActivo() {
  document.querySelectorAll('.puntaje').forEach(p => p.classList.remove('activo'));
  const selector = jugadorActual === 'X' ? '.jugador-x' : '.jugador-o';
  document.querySelector(selector).classList.add('activo');
}

// --- Nueva partida (mantiene marcador) ---
function nuevaPartida() {
  tablero        = Array(9).fill(null);
  jugadorActual  = 'X';
  juegoTerminado = false;

  celdas.forEach(celda => {
    celda.textContent = '';
    celda.className   = 'celda';
    celda.disabled    = false;
  });

  overlay.classList.remove('visible');
  actualizarEstado();
  actualizarMarcadorActivo();
}

// --- Reiniciar marcador completo ---
function reiniciarMarcador() {
  marcador.X      = 0;
  marcador.O      = 0;
  marcador.empate = 0;
  actualizarMarcador();
  nuevaPartida();
}

// --- Iniciar con el turno correcto resaltado ---
actualizarMarcadorActivo();
