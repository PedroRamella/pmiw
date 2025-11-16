//Usamos los botones.html para optimizar codigo y el proceso de el estado y "hitbox" del mismo

class Juego {
  constructor(p) {
    this.p = p;
    this.estado = "inicio";
    this.jugador = new Jugador(p);
    this.buenos = [];
    this.malos = [];
    this.buenosAtrapados = 0;
    this.malosAtrapados = 0;
    this.frames = 0;
    this.freq = 50;
    this.botonJugar = null;
    this.botonInstru = null;
    this.botonCred = null;
    this.botonRein = null;
    this.botonVolv = null;
    this.botonMusica = null;
  this.musicaSonando = false;
    
    this.crearBotones();
    const self = this;
    p.keyTyped = function() {
      if (self.estado === "jugando") self.controlar(p.key);
      return false;
    };
  }

  crearBotones() {
    const p = this.p;
    this.botonJugar = p.createButton('JUGAR');
    this.botonJugar.position(p.width / 2 - 50, 350);
    this.botonJugar.mousePressed(() => this.cambiarAJugando());

    this.botonInstru = p.createButton('INSTRUCCIONES');
    this.botonInstru.position(p.width / 2 - 70, 390);
    this.botonInstru.mousePressed(() => this.estado = "instrucciones");

    this.botonCred = p.createButton('CRÉDITOS');
    this.botonCred.position(p.width / 2 - 50, 430);
    this.botonCred.mousePressed(() => this.estado = "creditos");
    
    this.botonMusica = p.createButton('MÚSICA');
  this.botonMusica.position(20, p.height - 50);
  this.botonMusica.mousePressed(() => this.toggleMusica());

    this.botonRein = p.createButton('REINICIAR');
    this.botonRein.position(p.width / 2 - 50, 350);
    this.botonRein.mousePressed(() => this.cambiarAJugando(true));

    this.botonVolv = p.createButton('VOLVER');
    this.botonVolv.position(p.width / 2 - 40, 400);
    this.botonVolv.mousePressed(() => this.estado = "inicio");

    this.gestionarBotones();
  }

  cambiarAJugando(rein = false) {
    if (rein) this.reiniciar();
    this.estado = "jugando";
  }

  actualizar() {
    const p = this.p;
    if (this.estado === "jugando") {
      this.frames++;
      if (this.frames % this.freq === 0) {
        if (p.random(1) > 0.65) this.buenos.push(new ObjetoBueno(p));
        else this.malos.push(new ObjetoMalo(p));
      }

      this.jugador.actualizar();

      for (let i = this.buenos.length - 1; i >= 0; i--) {
        this.buenos[i].mover();
        if (this.buenos[i].chocarCon(this.jugador)) {
          this.buenosAtrapados++;
          this.buenos.splice(i, 1);
        } else if (this.buenos[i].fuera()) {
          this.buenos.splice(i, 1);
        }
      }

      for (let i = this.malos.length - 1; i >= 0; i--) {
        this.malos[i].mover();
        if (this.malos[i].chocarCon(this.jugador)) {
          this.malosAtrapados++;
          this.malos.splice(i, 1);
        } else if (this.malos[i].fuera()) {
          this.malos.splice(i, 1);
        }
      }

      this.chocar();
    }

    this.gestionarBotones();
  }

  dibujar() {
    const p = this.p;

    if (this.estado === "inicio") {
      p.image(p.imgInicio, 0, 0, p.width, p.height);
      this._pantallaInicio();
    }

    else if (this.estado === "instrucciones") {
      p.push();
      this._pantallaInstrucciones();
      p.pop();
    }

    else if (this.estado === "creditos") {
      p.push();
      this._pantallaCreditos();
      p.pop();
    }

    else if (this.estado === "jugando") {
      p.image(p.imgIngame, 0, 0, p.width, p.height);
      this.jugador.dibujar();
      for (let b of this.buenos) b.dibujar();
      for (let m of this.malos) m.dibujar();
      this._mostrarHUD();
    }

    else if (this.estado === "ganaste") {
      p.image(p.imgVictoria, 0, 0, p.width, p.height);
      this._pantallaGanaste();
    }

    else if (this.estado === "perdiste") {
      p.image(p.imgDerrota, 0, 0, p.width, p.height);
      this._pantallaPerdiste();
    }
  }

  chocar() {
    if (this.buenosAtrapados >= 10) this.estado = "ganaste";
    else if (this.malosAtrapados >= 3) this.estado = "perdiste";
  }

  gestionarBotones() {
    const all = [
      this.botonJugar,
      this.botonInstru,
      this.botonCred,
      this.botonRein,
      this.botonVolv
    ];
    for (let b of all) b.hide();

    if (this.estado === "inicio") {
      this.botonJugar.show();
      this.botonInstru.show();
      this.botonCred.show();
    } else if (this.estado === "instrucciones" || this.estado === "creditos") {
      this.botonVolv.show();
    } else if (this.estado === "ganaste" || this.estado === "perdiste") {
      this.botonRein.show();
      this.botonVolv.show();
    }
  }

  controlar(k) {
    if (k === 'a' || k === 'A') this.jugador.moverIzquierda();
    if (k === 'd' || k === 'D') this.jugador.moverDerecha();
  }

  reiniciar() {
    this.jugador.reset();
    this.buenos = [];
    this.malos = [];
    this.buenosAtrapados = 0;
    this.malosAtrapados = 0;
    this.frames = 0;
    this.estado = "jugando";
  }

  _pantallaInicio() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(48);
    p.text("DESCUBRE A KOBERMAN", p.width / 2, 100);
    p.textSize(20);
    p.text("Basado en 'El hombre del piso de arriba'", p.width / 2, 160);
    p.text("de Ray Bradbury", p.width / 2, 190);
    p.textSize(16);
    p.fill(200);
    p.text("Ayuda a descubrir la verdadera identidad de Koberman", p.width / 2, 280);
    p.text("Atrapa cristales y evita los cuchillos", p.width / 2, 305);
    p.pop();
  }

  _pantallaGanaste() {
    const p = this.p;
    p.push();
    p.fill(100, 255, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(48);
    p.text("¡GANASTE!", p.width / 2, 150);
    p.fill(255);
    p.textSize(20);
    p.text("Descubriste la verdadera identidad de Koberman", p.width / 2, 230);
    p.text("La familia está a salvo", p.width / 2, 260);
    p.pop();
  }

  _pantallaPerdiste() {
    const p = this.p;
    p.push();
    p.fill(255, 100, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(48);
    p.text("PERDISTE", p.width / 2, 150);
    p.fill(255);
    p.textSize(20);
    p.text("Los cuchillos de Koberman te derrotaron", p.width / 2, 230);
    p.text("Su identidad sigue siendo un misterio", p.width / 2, 260);
    p.text("Inténtalo de nuevo", p.width / 2, 290);
    p.pop();
  }

  _mostrarHUD() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.textSize(18);
    p.textAlign(p.LEFT);
    p.text("Cristales: " + this.buenosAtrapados + "/10", 20, 30);
    p.text("Cuchillos: " + this.malosAtrapados + "/3", 20, 55);
    p.pop();
  }

  _pantallaInstrucciones() {
    const p = this.p;
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.text("INSTRUCCIONES", p.width / 2, 60);
    p.textSize(18);
    p.textAlign(p.LEFT);
    p.text("• A y D para moverte", 80, 140);
    p.text("• Atrapa cristales", 80, 180);
    p.text("• Evita cuchillos", 80, 220);
    p.text("• 10 cristales para ganar", 80, 260);
    p.text("• 3 cuchillos para perder", 80, 300);
  }

  _pantallaCreditos() {
    const p = this.p;
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.text("CRÉDITOS", p.width / 2, 80);
    p.textSize(24);
    p.text("Trabajo realizado por:", p.width / 2, 160);
    p.textSize(20);
    p.text("Agustín Lasarte", p.width / 2, 220);
    p.text("Pedro Ramella", p.width / 2, 250);
    p.textSize(16);
    p.fill(200);
    p.text("Basado en el cuento de Ray Bradbury", p.width / 2, 320);
    p.text("'El hombre del piso de arriba'", p.width / 2, 345);
  }
  
 toggleMusica() {
  if (this.musicaSonando) {
    this.p.musicaAmbiente.pause();
    this.botonMusica.html('MÚSICA NO');
    this.musicaSonando = false;
  } else {
    this.p.musicaAmbiente.loop();
    this.botonMusica.html('MÚSICA SI');
    this.musicaSonando = true;
  }
  }
  
}
