// Cosmic Orbit: sine and cosine calculate the planet's position.
let centerX, centerY;
let orbitRadius = 160;
let angle = 0;
let orbitSpeed = 0.025;
let isPaused = false;

function setup() {
  const canvas = createCanvas(700, 460);
  canvas.parent("sketch-holder");
  centerX = width / 2;
  centerY = height / 2;
  textFont("Arial");
}

function draw() {
  background(8, 12, 35);
  drawStars();

  // Draw the circular orbit path.
  noFill();
  stroke(100, 130, 190, 150);
  strokeWeight(2);
  circle(centerX, centerY, orbitRadius * 2);

  // Draw the stationary star at the center.
  noStroke();
  fill(255, 190, 55);
  circle(centerX, centerY, 74);
  fill(255, 225, 130);
  circle(centerX - 12, centerY - 12, 22);

  // Trigonometry calculates the planet's changing coordinates.
  let planetX = centerX + cos(angle) * orbitRadius;
  let planetY = centerY + sin(angle) * orbitRadius;

  // Draw radius line and moving planet.
  stroke(255, 255, 255, 100);
  strokeWeight(1);
  line(centerX, centerY, planetX, planetY);
  noStroke();
  fill(70, 180, 255);
  circle(planetX, planetY, 34);
  fill(170, 225, 255, 180);
  circle(planetX - 6, planetY - 6, 10);

  // Display values and control instructions on the canvas.
  fill(255);
  textSize(15);
  textAlign(LEFT, TOP);
  text("Angle: " + nf(angle, 1, 2) + " radians", 18, 16);
  text("Orbit speed: " + nf(orbitSpeed, 1, 3), 18, 38);
  text(isPaused ? "Status: PAUSED" : "Status: RUNNING", 18, 60);
  textAlign(CENTER, BOTTOM);
  text("Mouse left/right: speed | SPACE: pause | R: reset", width / 2, height - 12);

  // Advance the angle once per frame only when not paused.
  if (!isPaused) angle += orbitSpeed;
}

function drawStars() {
  // Decorative fixed stars; the planet itself is controlled by math.
  noStroke();
  fill(230, 235, 255);
  circle(70, 90, 3); circle(160, 330, 2); circle(250, 65, 2);
  circle(560, 100, 3); circle(620, 300, 2); circle(500, 390, 3);
  circle(90, 390, 2); circle(390, 45, 2);
}

function mouseMoved() {
  // Map mouse position to a speed between 0.005 and 0.08 radians per frame.
  orbitSpeed = map(constrain(mouseX, 0, width), 0, width, 0.005, 0.08);
}

function keyPressed() {
  if (key === " ") isPaused = !isPaused;
  if (key === "r" || key === "R") {
    angle = 0;
    isPaused = false;
  }
}
