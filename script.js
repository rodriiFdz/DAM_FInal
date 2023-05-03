const canciones = [
    {
      id: 1, 
      cancion: "It rounds through me",     
      autor: "Tom Misch",
      duracion: "3:47",
      imagen: "tom.jpg",
      fuente: "1song.mp3"
    },
    {
        id: 2, 
      cancion: "How deep is your love",
      autor: "BEE GEES",
      duracion: "2:42",
      imagen: "Bee_Gees.JPG",
      fuente: "2song.mp3"
    },
    {
        id: 3, 
      cancion: "L-O-V-E",
      autor: "Nat king cole",
      duracion: "2:35",
      imagen: "nate.jpg",
      fuente: "3song.mp3"
    },
    {
        
    id: 4, 
      cancion: "Just the two of us",
      autor: "Bill Withers",
      duracion: "3:57",
      imagen: "bill.jpg",
      fuente: "4song.mp3"
    }
  ];
  
  

playlist.addEventListener("click", function(event) {
	event.preventDefault();

	var audioPlayer = document.getElementById("audio-player");
	var audioSource = "";
    var playButton = document.querySelector('#btn-reproductor-play');

	
	if (event.target.nodeName === "LI") {
		audioSource = event.target.getAttribute("data-src");
	} else if (event.target.nodeName === "IMG") {
		audioSource = event.target.getAttribute("data-src");
	} else if (event.target.nodeName === "A") {
		audioSource = event.target.getAttribute("data-src");
	}
	
	if (audioSource !== "") {
        playButton.setAttribute('src', 'pause.png');
		audioPlayer.src = audioSource;
		audioPlayer.play();
	}
   
});




// funcion para mostrar la info de la cancion


function mostrarInfo(id_cancion) {
    var titulo = document.getElementById("titulo-cancion"); 
    var autor = document.getElementById("autor-cancion");
    var dur = document.getElementById("duration");
    
    const cancion = canciones.find(item => item.id === id_cancion); 
    console.log(cancion); 

    dur.innerText = cancion.duracion; 
    titulo.innerText = cancion.cancion; 
    autor.innerText = cancion.autor;


}



var player = document.querySelector('.reproductor');
var playButton = document.querySelector('#btn-reproductor-play');

//funcion para pausar la reproduccion

function togglePlayPause() {
	var playButton = document.getElementById('btn-reproductor-play')
	var audioPlayer = document.getElementById("audio-player");

    if (audioPlayer.paused || audioPlayer.ended) {
        playButton.setAttribute('src', 'pause.png');
        audioPlayer.play();
    } else {
        playButton.setAttribute('src', 'play.png');
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

function toggleReplay() {
    var audioPlayer = document.getElementById("audio-player");
    var replayButton = document.getElementById("btn-reproductor-replay");
    if (audioPlayer.loop) {
        audioPlayer.loop = false;
        replayButton.setAttribute("src", "replay.png");
        replayButton.classList.remove("active");
        audioPlayer.removeEventListener('ended', playNext());
    } else {
        audioPlayer.loop = true;
        replayButton.setAttribute("src", "replay-active.png");
        replayButton.classList.add("active");
        audioPlayer.addEventListener('ended', playNext());
    }
}


function playNext() {
    //Tomamos la posicion de la cancion que se esta reproduciendo 
    var playlist = document.getElementById("canciones");
    var currentPos = parseInt(playlist.getAttribute("data-current-pos"));
    // Obtener la siguiente canción y actualizar la posición actual
    var nextSong = playlist.children[currentPos + 1];
    playlist.setAttribute("data-current-pos", currentPos + 1);
    // Verificar si hay más canciones o volver al inicio
    if (nextSong) {
        var audioPlayer = document.getElementById("audio-player");
        audioPlayer.src = nextSong.getAttribute("data-src");
        audioPlayer.play();
    } else {
        playlist.setAttribute("data-current-pos", "0");
        var firstSong = playlist.children[0];
        var audioPlayer = document.getElementById("audio-player");
        audioPlayer.src = firstSong.fuente;
        audioPlayer.play();
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

  
  
  
  
  
