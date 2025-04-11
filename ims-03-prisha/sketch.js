// GitHub Page link:
// https://prishajain-23.github.io/ims-2025-prisha/ims-03-prisha/index.html

// ----- URL Parameter Parsing -----
// Default values for spacing and step
let spacing = 5;
let step = 2;

// Use URLSearchParams to grab parameters from the current URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("spacing")) {
  const s = Number(urlParams.get("spacing"));
  if (!isNaN(s) && s > 0) {
    spacing = s;
  }
}
if (urlParams.has("step")) {
  const st = Number(urlParams.get("step"));
  if (!isNaN(st) && st > 0) {
    step = st;
  }
}

// ----- Global Variables for Generative Code -----
let x;
let y;
let grid;
let cols, rows;
let my = {};

// ----- Global Variables for Pose Influence -----
let video;
let bodyPose;
let poses = [];
let prevNose; // We'll store the previous nose position here

// New global variable to track the last detected number of poses
let lastPoseCount = 0;

// ----- Preload: Load the bodyPose model -----
function preload() {
  // Load the bodyPose model from ml5.js
  bodyPose = ml5.bodyPose();
}

// ----- Setup Function -----
function setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.changeTime = 5.0;
  my.debug = 1;
  my.startTime = millis() / 1000.0;

  createCanvas(my.width, my.height);
  noStroke();

  // Set up video capture for pose estimation
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting poses from the video stream
  bodyPose.detectStart(video, gotPoses);

  // Calculate grid values for the generative random walk
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;

  background(0);
  grid = make2DArray(cols, rows);

  // Use HSB for coloring
  colorMode(HSB, 360, 100, 100, 100);

  setup_fullScreenButton();
}

// ----- Draw Function -----
// This draw loop uses the movement of the user's nose to influence the generative artwork.
function draw() {
  check_time();

  // --- Extract the Nose Keypoint ---
  let currentNose = createVector(0, 0);
  let kpArray; // This will hold the keypoints array.
  if (poses.length > 0) {
    // Try the flat structure first.
    if (poses[0].keypoints) {
      kpArray = poses[0].keypoints;
    }
    // Or if nested under a 'pose' property:
    else if (poses[0].pose && poses[0].pose.keypoints) {
      kpArray = poses[0].pose.keypoints;
    }

    if (kpArray) {
      // Find the nose keypoint using its name
      let noseKeypoint = kpArray.find(
        (k) => k.name && k.name.toLowerCase() === "nose"
      );

      if (noseKeypoint) {
        // Accept any detection regardless of confidence for now.
        currentNose = createVector(noseKeypoint.x, noseKeypoint.y);
      }
    }

    // --- Compute Movement Delta (if desired) ---
    let noseDelta = createVector(0, 0);
    if (prevNose) {
      noseDelta = p5.Vector.sub(currentNose, prevNose);
    }
    prevNose = currentNose.copy();

    // --- Generative Drawing ---
    noFill();
    let hueValue = map(x * spacing, 0, width, 0, 360);
    let brightnessValue = map(y * spacing, 0, height, 50, 100);
    stroke(hueValue, 100, brightnessValue, 80);

    const shape = floor(random(3));
    switch (shape) {
      case 0:
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

    // --- Map Nose Position to Grid Coordinates ---
    let mappedNoseX = map(currentNose.x, 0, video.width, cols, 0);
    let mappedNoseY = map(currentNose.y, 0, video.height, 0, rows);
    let noseForce = createVector(mappedNoseX - x, mappedNoseY - y);

    // --- Compute a Random Delta ---
    let randomDelta = createVector(0, 0);
    let pattern = floor(random(4));
    switch (pattern) {
      case 0:
        randomDelta.x = step;
        break;
      case 1:
        randomDelta.x = -step;
        break;
      case 2:
        randomDelta.y = step;
        break;
      case 3:
        randomDelta.y = -step;
        break;
    }

    // --- Update the Walk Position ---
    let influenceFactor = 0.5; // Adjust to change the strength of the nose attraction.
    x += randomDelta.x + noseForce.x * influenceFactor;
    y += randomDelta.y + noseForce.y * influenceFactor;
  }
}

// ----- Utility: Create a 2D Array -----
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// ----- Check Time (Placeholder Function) -----
function check_time() {
  let now = millis() / 1000;
  if (now - my.startTime > my.changeTime) {
    my.startTime = now;
  }
}

// ----- Full Screen Button Setup -----
function setup_fullScreenButton() {
  my.fullScreenButton = createButton("?=v7 Full Screen");
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:42px");
  my.fullScreenButton.position(0, 0);
}

function fullScreen_action() {
  my.fullScreenButton.remove();
  fullscreen(1);
  setTimeout(() => {
    ui_present_window();
  }, 100);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
}

// ----- Handle Window Resizing -----
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  grid = make2DArray(cols, rows);
}

// ----- Refresh the Sketch State -----
// This function resets the canvas and walker state.
function refreshSketch() {
  // Clear the canvas
  background(0);
  // Reset grid and walker position
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  grid = make2DArray(cols, rows);
  // Reset the timer if needed
  my.startTime = millis() / 1000.0;
  console.log("New person detected - sketch refreshed!");
}

// ----- Pose Detection Callback -----
function gotPoses(results) {
  // Check if a new person is detected by comparing the number of detected poses.
  let currentPoseCount = results.length;
  if (currentPoseCount > lastPoseCount) {
    // A new person has been added
    refreshSketch();
  }
  lastPoseCount = currentPoseCount;
  
  // Update the global poses array
  poses = results;
}
