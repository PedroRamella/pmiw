//Agustin Lasarte - Pedro Ramella
//https://youtu.be/kS1BmPvp11s



new p5(function(p) {
  let juegoInst;

  p.preload = function() {
  p.imgInicio = p.loadImage('data/pinicio.png');
  p.imgIngame = p.loadImage('data/pingame.png');
  p.imgVictoria = p.loadImage('data/pganar.png');
  p.imgDerrota = p.loadImage('data/pderrota.png');
  p.imgJugador = p.loadImage('data/douglascuerpo.png');
  p.imgMalo = p.loadImage('data/imgcuchillos.png');
  p.imgBueno = p.loadImage('data/imgcristales.png');
  p.musicaAmbiente = p.loadSound('data/musicambiente.mp3');
  };

  p.setup = function() {
    p.createCanvas(640, 480);
    juegoInst = new Juego(p);
  };

  p.draw = function() {
    p.background(20, 30, 50);
    juegoInst.actualizar();
    juegoInst.dibujar();
  };
});
