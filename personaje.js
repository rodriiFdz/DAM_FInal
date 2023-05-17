

function dibujarCirculoGrande() {
    var canvas = document.getElementById('personaje'); 
    canvas.width = 600; 
    canvas.height = 400; 

    //Dibujo el ciruclo grande
    var context = canvas.getContext("2d"); 
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 80;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#54B435";
    context.fill();
    context.closePath();

    //Dibujo el circulo pequeño izquierdo
    var centerX = 250;
    var centerY = 150;
    var radius = 40;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#54B435";
    context.fill();
    context.closePath();

    //Dibujo el circulo pequeño derecho
    var centerX = 350;
    var centerY = 150;
    var radius = 40;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#54B435";
    context.fill();
    context.closePath();

    //Dibujo los ojos

    var centerX = 250;
    var centerY = 150;
    var radius = 30;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();
    context.closePath();


    var centerX = 350;
    var centerY = 150;
    var radius = 30;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();
    context.closePath();

     //Dibujo interior ojos

     var centerX = 255;
    var centerY = 160;
    var radius = 16;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "black";
    context.fill();
    context.closePath();


    var centerX = 345;
    var centerY = 160;
    var radius = 16;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "black";
    context.fill();
    context.closePath();

    //Dibujo boca

    context.beginPath();
    
    context.beginPath();
    context.arc(300, 220, 50, 0, Math.PI, false);
    context.fillStyle = "red";
    context.fill();

}




window.onload = function () {
    dibujarCirculoGrande(); 
    
}