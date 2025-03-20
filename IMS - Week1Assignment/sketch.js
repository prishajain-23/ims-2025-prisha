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

function setup() {
  createCanvas(400, 400);
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
  noFill();


  const shape = floor(random(3));
  switch (shape) {
    case 0:
      noFill();
      rect(x * spacing, y * spacing, spacing * 0.5);
      break;
    case 1:
      strokeWeight(spacing);
      point(x * spacing, y * spacing);
      break;
    case 2:
      strokeWeight(1); 
      triangle(x * spacing, y * spacing, (x + (spacing * 0.5)) * spacing, y * spacing, (x + (spacing * 0.25)) * spacing,  (y + (spacing * 0.25)) * spacing);
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
  // let b = random(100, 200);
  let b = 200;
  let a = 100;
  stroke(r, g, b, a);
  // fill(r, g, b, a);

  const pattern = floor(random(4));
  switch (pattern) {
    case 0:
      blendMode(HARD_LIGHT);
      x = x + 1;
      break;
    case 1:
      blendMode(ADD);
      x = x - 1;
      break;
    case 2:
      blendMode(EXCLUSION);
      y = y + 1;
      break;
    case 3:
      blendMode(LIGHTEST);
      y = y - 1;
      break;
  }
}

// use the shapes we defined in draw to custom draw on the canvas

// function mouseDragged() {
//   const userShape = floor(random(3));
//   switch (userShape) {
//     case 0:
//       rectMode(CENTER);
//       rect(mouseX, mouseY, spacing * 0.5);
//       break;
//     case 1:
//       strokeWeight(spacing);
//       point(mouseX, mouseY);
//       break;
//     case 2:
//       strokeWeight(1); 
//       triangle(mouseX, mouseY, (mouseX + (spacing * 0.5)), mouseY, (mouseX + (spacing * 0.25)),  (mouseY + (spacing * 0.25)));
//       break;
// }
// }