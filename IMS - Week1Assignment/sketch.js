// Prisha's Comments and Edits

// Dan Shiffman's Notes
// Self Avoiding Walk (Random Walk with Alpha)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

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
  strokeWeight(spacing * 0.5);
  point(x * spacing, y * spacing);

  // this part is what makes it generative
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
  let r = x * spacing;
  let g = y * spacing;
  let b = 200;
  stroke(r, g, b, 100);
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
