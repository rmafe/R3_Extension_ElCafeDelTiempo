const taza = { x: 93, y: 56, ancho: 104, alto: 82, radio: 9 };
const crema = "#F7F3E8";
const cafe = "#6F4E37";
let nivelCafe = 1;

function setup() {
  createCanvas(300, 150).parent("escena");
  describe(
    "Una taza cuyo nivel de café indica cuánto queda del descanso, con vapor que asciende cada segundo.",
  );
  iniciarTemporizador();
}

function draw() {
  const ahora = new Date();
  const hora = ahora.getHours();
  background(colorFondo(hora));
  dibujarVapor(hora, ahora.getMilliseconds() / 1000);
  dibujarTaza(nivelCafe);
}

function colorFondo(hora) {
  if (hora < 6) return "#1D2D44"; // Madrugada
  if (hora < 12) return "#F4D58D"; // Mañana
  if (hora < 18) return "#E89B62"; // Tarde
  return "#293241"; // Noche
}

function dibujarTaza(nivel) {
  const { x, y, ancho, alto, radio } = taza;

  noFill();
  stroke(cafe);
  strokeWeight(13);
  arc(x + ancho, y + 37, 43, 46, -HALF_PI, HALF_PI);
  stroke(crema);
  strokeWeight(9);
  arc(x + ancho, y + 37, 43, 46, -HALF_PI, HALF_PI);

  fill(crema);
  stroke(cafe);
  strokeWeight(2);
  rect(x, y, ancho, alto, radio);
  dibujarCafe(nivel);
}

function dibujarCafe(nivel) {
  const margen = 5;
  const altura = (taza.alto - 2 * margen) * constrain(nivel, 0, 1);
  if (altura === 0) return;

  noStroke();
  fill(cafe);
  rect(
    taza.x + margen,
    taza.y + taza.alto - margen - altura,
    taza.ancho - 2 * margen,
    altura,
    0,
    0,
    4,
    4,
  );
}

function dibujarVapor(hora, progresoSegundo) {
  const centro = taza.x + taza.ancho / 2;
  const tinta = color(hora >= 6 && hora < 18 ? cafe : "#F5F5F5");
  const ascenso = progresoSegundo * 23;
  tinta.setAlpha(
    255 * Math.min(1, progresoSegundo * 8) * (1 - progresoSegundo ** 3),
  );
  noFill();
  stroke(tinta);
  strokeWeight(2.5);
  [-21, 0, 21].forEach((desplazamiento, indice) => {
    const base = desplazamiento === 0 ? 47 : 51;
    beginShape();
    for (let altura = 0; altura <= 19; altura++) {
      const onda = sin(altura * 0.31 - progresoSegundo * TWO_PI + indice * 0.8);
      vertex(
        centro + desplazamiento + onda * (2 + altura * 0.23),
        base - ascenso - altura,
      );
    }
    endShape();
  });
}
