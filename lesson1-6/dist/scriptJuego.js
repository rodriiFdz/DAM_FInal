const startBtn = document.getElementById('start-btn');

var song1 = new Audio('1song.mp3');
var song2 = new Audio('2song.mp3');
var song3 = new Audio('3song.mp3');
var song4 = new Audio('4song.mp3');



startBtn.addEventListener('click', function() {
  startBtn.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function() {
  var startBtn = document.querySelector('#start-btn');
  startBtn.addEventListener('click', startGame);
});

function startGame() {
  gameStarted = true;
  updateAll();
}


var gameOver = false;

var canvas = null;
var ctx = null;
var mouseX = null;

var frames = 24;

var ballX = 50;
var ballY = 50;
var ballStepX = 5;
var ballStepY = 6;
var ballRadius = 10;

var paddleX = null;
var paddleWidth = 100;
var paddleHeight = 10;
var paddleOffset = 40;

var blocks = [];

// Creamos 6 filas de bloques, cada una con un color diferente
for (var row = 0; row < 4; row++) {
  var blockColor;
  switch(row) {
    case 0:
      blockColor = "#ff4c33"; // rojo
      break;
    case 1:
      blockColor = "#ff7a33"; // naranja
      break;
    case 2:
      blockColor = "#ffd433"; // amarillo #ffd433
      break;
    case 3:
      blockColor = "#ecff33"; // verde
      break;
    
  
  }

  // Creamos 10 bloques por fila, cada uno con un número aleatorio de colisiones necesarias para ser destruido
  for (var col = 0; col < 13; col++) {
    var block = {
      x: 15 + col * 60,
      y: 45 + row * 36,
      width: 60,
      height: 30,
      borderRadius: 15, // radio de curvatura de 5 píxeles
      color: blockColor,
      hits: Math.floor(Math.random() * 3) + 1, // entre 1 y 3 colisiones necesarias para ser destruido
      black: false
    };
    
    // Establece como dorados los bloques que deseas
    if ((row == 0 && col == 5) || (row == 1 && col == 4) || (row == 2 && col == 6) || (row == 3 && col == 8)) {
      block.color = '#000000';
      block.black = true;
    }
  
    blocks.push(block);
  }
  
}

var score = 0;

function mouseCoords (event) {
  var canvasOffset = canvas.getBoundingClientRect();
  var htmlElement = document.documentElement;
  mouseX = event.clientX - canvasOffset.left - htmlElement.scrollLeft;
  paddleX = mouseX - paddleWidth/2;
}



function drawRect(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.lineWidth = 2; // aumenta el grosor del borde
  ctx.strokeStyle = 'black'; 

  ctx.stroke(); // añade el borde
  ctx.fillStyle = color;
  ctx.fill();
}


function drawBall(centerX, centerY, radius, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 360*Math.PI/180, true);
  ctx.fill();
  ctx.closePath();
}

var backgroundImage = new Image();
backgroundImage.src = './lesson1-6/dist/2.jpg';


function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawAll() {
  drawBackground();
  drawRect(0, 0, canvas.width, canvas.height, 'transparent');
  drawBall(ballX, ballY, ballRadius, 'black');
  drawRect(paddleX, canvas.height - paddleOffset, paddleWidth, paddleHeight, '#fff');
  drawScore();
  drawNameGame();

  // dibujar bloques
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (!block.hit) {
       drawRect(block.x, block.y, block.width, block.height, block.color);
     
  }
}

}


function moveAll() {

  var paddleLeftEdge = paddleX;
  var paddleRightEdge = paddleLeftEdge + paddleWidth;
  var paddleTopEdge = canvas.height - paddleOffset;
  var paddleBottomEdge = paddleTopEdge + paddleHeight;

  ballX += ballStepX;
  ballY += ballStepY;

  if ( ballX < 0 || ballX > canvas.width) {
    ballStepX *= -1;
  }
  if ( ballY < 0 || ballY > canvas.height ) {
    ballStepY *= -1;
  }
  if ( ballX > paddleLeftEdge && ballX < paddleRightEdge && ballY > paddleTopEdge && ballY < paddleBottomEdge ) {
    ballStepY *= -1;
    var paddleCenter = paddleLeftEdge + paddleWidth/2;
    var ballDistance = ballX - paddleCenter;
    ballStepX = ballDistance * 0.35;
    score++;
  }
  
// Declarar una variable para la canción actual
var currentSong = null;

// Verificar colisiones con bloques
for (var i = 0; i < blocks.length; i++) {
var block = blocks[i];
if (!block.hit) {
if (ballX > block.x && ballX < block.x + block.width && ballY > block.y && ballY < block.y + block.height) {
if (block.color === '#000000') {
block.hit = true;
score += 50;
// Detener la canción actual antes de reproducir una nueva
if (currentSong) {
currentSong.pause();
}
var newSong;
switch (i % 4) {
case 0:
newSong = song1;
break;
case 1:
newSong = song2;
break;
case 2:
newSong = song3;
break;
case 3:
newSong = song4;
break;
}
currentSong = newSong;
currentSong.currentTime = 0;
currentSong.play();
} else {
ballStepY *= -1;
block.hit = true;
score += 50;
}
}
}
}

}


function drawScore() {
  ctx.font = "24px VT323";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 10, 20);
}


function drawNameGame() {
  ctx.font = "24px VT323";
  ctx.fillStyle = "#fff";
  ctx.fillText("AlesRodri Game",650, 20);
}


function updateAll() {
  if (!gameStarted) {
    return;
  }

  setInterval( function () {
    moveAll();
    drawAll();
    mouseCoords(); //
  }, 750/frames);
}



window.addEventListener('DOMContentLoaded', function () {

  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  if ( ctx ) {

    canvas.width = 800;
    canvas.height = 400;

    // Agregar event listener para detectar movimiento del mouse en el canvas
    canvas.addEventListener('mousemove', mouseCoords);

   // Asignar las coordenadas de la bola roja como una variable global
var redBallX = canvas.width / 2;
var redBallY = canvas.height / 2;
var redBallRadius = 10;
window.redBallX = redBallX;
window.redBallY = redBallY;
window.redBallRadius = redBallRadius;

// Establecer las coordenadas iniciales de la bola en el centro
ballX = redBallX;
ballY = redBallY;

    updateAll();
    

  }
}, false);