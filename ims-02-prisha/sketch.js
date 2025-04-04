// Prisha's Comments and Edits
// Added colors and more randomness with types of shapes using switch case

// Dan Shiffman's Code
// Self Avoiding Walk (Random Walk with Alpha)
// The Coding Train / Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

let x;
let y;

let grid;
let spacing = 5;
let cols, rows;

// this function makes an array of arrays to create a 2D grid
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let my = {};

function setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.changeTime = 5.0;
  my.debug = 1;

  my.startTime = millis() / 1000.0;

  if (!my.debug) {
    my.width = windowWidth;
    my.height = windowHeight;
  }
  createCanvas(my.width, my.height);
  noStroke();

  setup_fullScreenButton();

  // define columns based on desired spacing
  // spacing is a good variable to play with to achieve different effects
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  // background(51);
  background(0);
  grid = make2DArray(cols, rows);
}

function draw() {
  // stroke(255, 100);
  // makes the size of the points being drawn responsive to the size of the grid
  // strokeWeight(spacing * 0.5);

  check_time();

  noFill();

  const shape = floor(random(3));
  switch (shape) {
    case 0:
      // strokeWeight(1);
      rect(x * spacing, y * spacing, spacing);
      break;
    case 1:
      strokeWeight(spacing);
      point(x * spacing, y * spacing);
      break;
    case 2:
      strokeWeight(1);
      triangle(
        x * spacing,
        y * spacing,
        (x + spacing * 0.5) * spacing,
        y * spacing,
        (x + spacing * 0.25) * spacing,
        (y + spacing * 0.25) * spacing
      );
      break;
  }

  // something i tried that i didn't use
  // rect(x * spacing, y * spacing, spacing * 0.5);

  // SHIFFMAN CODE:
  // this part is what makes it generative
  // strokeWeight(spacing * 0.5);
  // point(x * spacing, y * spacing);
  // const r = floor(random(4));

  // create cases for each random pattern chosen in the draw loop
  // switch (r) {
  //   case 0:
  //     x = x + 1;
  //     break;
  //   case 1:
  //     x = x - 1;
  //     break;
  //   case 2:
  //     y = y + 1;
  //     break;
  //   case 3:
  //     y = y - 1;
  //     break;
  // }

  // adds in colors and maps them to the grid to create a rainbow gradient
  let r = x * spacing;
  let g = y * spacing;
  let b = random(100, 200);
  // let b = 200;
  let a = 100;
  stroke(r, g, b, a);
  // fill(r, g, b, a);

  const pattern = floor(random(4));
  switch (pattern) {
    case 0:
      blendMode(HARD_LIGHT);
      x = x + width/400;
      break;
    case 1:
      blendMode(ADD);
      x = x - width/400;
      break;
    case 2:
      blendMode(EXCLUSION);
      y = y + height/400;
      break;
    case 3:
      blendMode(SCREEN);
      y = y - height/400;
      break;
  }
}

function check_time() {
  let now = millis() / 1000;
  if (now - my.startTime > my.changeTime) {
    my.startTime = now;
  }
}

// From
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF

// --
function setup_fullScreenButton() {
  my.fullScreenButton = createButton("?=v7 Full Screen");
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:42px");
  my.fullScreenButton.position(0, 0);
}

function fullScreen_action() {
  my.fullScreenButton.remove();
  fullscreen(1);
  let delay = 100;
  setTimeout(() => {
    ui_present_window();
  }, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  // init_dim();
}

// Respond to window resizing event
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
}
