// Worley Noise - Prisha's Edits

// Worley Noise
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/004-worley-noise.html
// https://youtu.be/4066MndcyCk
// p5 port: https://editor.p5js.org/codingtrain/sketches/QsiCWVczZ

// how do we make this faster?
// use createGraphics function to create layers
// can create a graphic from this 100x100 canvas and scale it up
// https://p5js.org/reference/p5/createGraphics/ 
// createGraphics(width, height, [canvas])
// createGraphics() creates an offscreen drawing canvas (graphics buffer)
// returns it as a p5.Graphics object
// Drawing to a separate graphics buffer can be helpful for performance and for organizing code

let points = [];
let layer;

function setup() {
  createCanvas(100, 100);
  // createCanvas(200, 200);
  pixelDensity(1);
  for (let i = 0; i < 20; i++) {
    points[i] = createVector(random(width), random(height), random(width));
  }
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let distances = [];
      for (let i = 0; i < points.length; i++) {
        let v = points[i];
        let z = frameCount % width;
        let d = dist(x, y, z, v.x, v.y, v.z);
        distances[i] = d;
      }
      let sorted = sort(distances);
      let r = map(sorted[0], 0, 150, 0, 255);
      let g = map(sorted[1], 0, 50, 255, 0);
      let b = map(sorted[2], 0, 200, 255, 0);
      let index = (x + y * width) * 4;
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}
