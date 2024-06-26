// Obtener referencias a los elementos del DOM
const playPauseButton = document.querySelector('.play-pause');
const stopCancion = document.querySelector('.stop');
const anterior = document.querySelector('.anterior');
const siguiente = document.querySelector('.siguiente');
const bucle = document.querySelector('.bucle');
const aleatorio = document.querySelector('.aleatorio');
const volumen = document.querySelector('.volumen');

const body = document.body;

let modoAleatorio = false;
let audio;
let canciones = ['gutstheme', 'fear', 'Behelit']; // Lista de nombres de canciones
let cancionActualIndex = 0; // Índice de la canción actual en la lista
let isBucle = false; // Variable para controlar si está en bucle

// Función para cambiar a la siguiente canción
function siguienteCancion() {
    if (modoAleatorio) {
        reproducirAleatorio();
    } else {
        cancionActualIndex = (cancionActualIndex + 1) % canciones.length;
        let cancion = canciones[cancionActualIndex];
        reproducirCancion(cancion);
    }
}

// Función para cambiar a la canción anterior
function anteriorCancion() {
    cancionActualIndex = (cancionActualIndex - 1 + canciones.length) % canciones.length;
    let cancion = canciones[cancionActualIndex];
    reproducirCancion(cancion);
}

// Función para reproducir una canción
function reproducirCancion(cancion) {
    if (audio) {
        audio.pause();
        audio.removeEventListener('ended', siguienteCancion);
    }
    audio = new Audio(`./canciones/${cancion}.mp3`);
    audio.play();
    audio.addEventListener('ended', siguienteCancion);
    changeBackground(cancion);
}

// Función para cambiar el fondo del body según la canción
function changeBackground(cancion) {
    body.classList.remove('gutstheme', 'fear', 'Behelit');
    body.classList.add(cancion);
}

// Función para reproducir una canción aleatoria
function reproducirAleatorio() {
    modoAleatorio = !modoAleatorio;
    aleatorio.classList.toggle('active', modoAleatorio);
    if (modoAleatorio) {
        let randomIndex = Math.floor(Math.random() * canciones.length);
        let cancionAleatoria = canciones[randomIndex];
        reproducirCancion(cancionAleatoria);
    } else {
        siguienteCancion();
    }
}

// Función para reproducir en bucle la canción actual
function reproducirEnBucle() {
    isBucle = !isBucle;
    bucle.classList.toggle('active', isBucle);
    if (audio) {
        audio.loop = isBucle;
    }
}

// Función para manejar el botón de reproducción/pausa
function togglePlayPause() {
    if (audio && !audio.paused) {
        audio.pause();
        playPauseButton.classList.remove('playing');
        playPauseButton.querySelector('.material-icons').textContent = 'play_circle';
    } else {
        let cancion = playPauseButton.getAttribute('id');
        cancionActualIndex = canciones.indexOf(cancion);
        reproducirCancion(cancion);
        playPauseButton.classList.add('playing');
        playPauseButton.querySelector('.material-icons').textContent = 'pause_circle';
    }
}

// Event listener para el botón de reproducción/pausa
playPauseButton.addEventListener('click', togglePlayPause);

// Event listener para el control de volumen
volumen.addEventListener('input', function () {
    let vol = this.value;
    if (audio) {
        audio.volume = vol;
    }
});

// Event listener para el botón de anterior
anterior.addEventListener('click', anteriorCancion);

// Event listener para el botón de siguiente
siguiente.addEventListener('click', siguienteCancion);

// Event listener para el botón de aleatorio
aleatorio.addEventListener('click', reproducirAleatorio);

// Event listener para el botón de bucle
bucle.addEventListener('click', reproducirEnBucle);
