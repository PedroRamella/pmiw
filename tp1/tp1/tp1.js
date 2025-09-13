
/* 
   Pedro Ramella - 122855/0
   Comision 1


*/



let ilusion;
let variacionColor = 170;

function preload() {
  ilusion = loadImage("data/ilusion.jpeg");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255);
  patron(140, 0, 45, 45);
  patron(155, 45, 45, 45);
  patron(165, 90, 45, 45);
  patron(155, 134, 45, 45);
  patron(140, 179, 45, 45);
  patron(155, 225, 45, 45);
  patron(165, 270, 45, 45);
  patron(155, 315, 45, 45);
  patron(140, 360, 45, 45);
  image(ilusion, 0, 0, 400, 400);
}

function patron(transx, transy, tamaño, cantidad) {
  stroke(71, 71, 71);
  strokeWeight(2);
  push();
  translate(transx, transy);
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < cantidad; i++) {
      let posx = i * tamaño;
      let posy = j * tamaño;
      if ((i + j) % 2 == 0) {
        fill(0);
      } else {
        fill(variacionColor);
      }
      rect(posx, posy, tamaño, tamaño);
    }
  }
  pop();
}

function tenerColorAleatorio() {
  return random(0, 255);
}

function mousePressed() {
  if (mouseX > 400) {
    variacionColor = tenerColorAleatorio();
  }
}

function keyPressed() {
  if (key === 'i' || key === 'I') {
    variacionColor = tenerColorAleatorio();
  } else if (key === 'r' || key === 'R') {
    variacionColor = 170;
  }
}
