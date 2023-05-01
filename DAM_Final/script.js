

playlist.addEventListener("click", function(event) {
	event.preventDefault();

	var audioPlayer = document.getElementById("audio-player");
	var audioSource = "";

	
	if (event.target.nodeName === "LI") {
		audioSource = event.target.getAttribute("data-src");
	} else if (event.target.nodeName === "IMG") {
		audioSource = event.target.getAttribute("data-src");
	} else if (event.target.nodeName === "A") {
		audioSource = event.target.getAttribute("data-src");
	}
	
	if (audioSource !== "") {
		audioPlayer.src = audioSource;
		audioPlayer.play();
	}
});


//funcion propia para reproducir la cancion

function reproducirCancion(id) {
    var audioPlayer = document.getElementById(id);
    var canciones = audioPlayer.src; 
    console.log(canciones)

}

// funcion para mostrar la info de la cancion

function mostrarTitulo(titulos, artistas) {
	var titulo = document.getElementById("titulo-cancion")
	var artista = document.getElementById("autor-cancion")
	var play = document.getElementById("btn-reproductor-play")
	titulo.innerText = titulos
	artista.innerText = artistas
	play.setAttribute("src", "pause.png")
}


var player = document.querySelector('.reproductor');
var playButton = document.querySelector('#btn-reproductor-play');

//funcion para pausar la reproduccion

function togglePlayPause() {
	var boton = document.getElementById('btn-reproductor-play')
	var audioPlayer = document.getElementById("audio-player");

    if (audioPlayer.paused || audioPlayer.ended) {
        boton.setAttribute('src', 'pause.png');
        audioPlayer.play();
    } else {
        boton.setAttribute('src', 'play.png');
        audioPlayer.pause();
    }
}
//funcion para atrasar o adelantar 5 segundos el audio
function skip(seconds) {
    var audioPlayer = document.getElementById("audio-player");
    if (audioPlayer.paused || audioPlayer.ended) {
        return;
    }
    var currentTime = audioPlayer.currentTime;
    var duration = audioPlayer.duration;
    if (currentTime + seconds < 0) {
        audioPlayer.currentTime = 0;
    } else if (currentTime + seconds > duration) {
        audioPlayer.currentTime = duration;
    } else {
        audioPlayer.currentTime += seconds;
    }
}

function skipPrev() {
    skip(-10);
}

function skipNext() {
    skip(10);
}

//funcion para que la canción se repita
function toggleReplay() {
    var audioPlayer = document.getElementById("audio-player");
    var replayButton = document.getElementById("btn-reproductor-replay");
    if (audioPlayer.loop) {
        audioPlayer.loop = false;
        replayButton.setAttribute("src", "replay.png");
        replayButton.classList.remove("active");
    } else {
        audioPlayer.loop = true;
        replayButton.setAttribute("src", "replay-active.png");
        replayButton.classList.add("active");
    }
}

//subir y bajar volumen
function setVolume() {
    var volumeControl = document.getElementById("volume-control");
    var audioPlayer = document.getElementById("audio-player");
    audioPlayer.volume = volumeControl.value / 100;
  }

  
//Funcion para actualizar el progreso de la barra 

const progressBar = document.querySelector('.progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const audioPlayer = document.getElementById("audio-player");
const currentTimeLabel = document.getElementById('currentTime');
const durationLabel = document.getElementById('duration');
const muteButton = document.getElementById('muteButton');

progressBarContainer.addEventListener('click', handleProgressClick);

// Función para actualizar la posición de reproducción de la canción al arrastrar el control deslizante de la barra de progreso
function handleProgressClick(event) {
    const clickX = event.offsetX;
    const progressBarWidth = progressBarContainer.offsetWidth;
    const percentage = clickX / progressBarWidth;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = duration * percentage;
  }
  
// Función para actualizar la posición de reproducción de la canción al hacer clic en la barra de progreso

function updateProgress() {
    const duration = audioPlayer.duration; //Tomamos la duración de la canción
    const currentTime = audioPlayer.currentTime; //Tomamos el valor actual de la reproducción 
    const progress = (currentTime / duration) * 100; //Calculamos el porcentaje de reproducción sobre el total de la canción
    progressBar.style.width = `${progress}%`; //Mandamos a la barra de progreso el ancho correspondiente con su porcentaje 

    currentTimeLabel.textContent = formatTime(currentTime);
    durationLabel.textContent = formatTime(duration);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

audioPlayer.addEventListener('timeupdate', updateProgress); //Añadimos un listener que detecta el avance de la reproducción y llama a la función que actualiza la barra

// Agregar evento de clic en la barra de progreso
// Agregar evento input en la barra de progreso

muteButton.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteButton.textContent = audioPlayer.muted ? 'Unmute' : 'Mute';
    if (audioPlayer.muted) {
        muteButton.setAttribute('src', 'mute.png'); 

    }
    else {
        muteButton.setAttribute('src', 'volumen.png'); 

    }
  });

  
  
