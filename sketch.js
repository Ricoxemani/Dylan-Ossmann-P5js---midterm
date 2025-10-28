let noiseLevel = 10;
let noiseScale = 0.075;
let noiseSpeed = 0.01;
let noiseX = 1;
let noiseY = 1;
let cubeSize = 50;
let cubeMargin = 30;
let angle = 0;
let whiteOut = 255;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(RADIANS);

}

function draw() {
  //randomly changes z axis aangle
  angle = noise(noiseScale * frameCount/10) * 3.14*2;
  //moves noise based on direction of z angle
  noiseX += noiseSpeed*cos(angle);
  noiseY += noiseSpeed*sin(angle);

  //background
  push();
  resetMatrix(); // clear transforms
  noStroke();
  fill(0, 0, 0, 50); // lower alpha = longer trails
  translate(0, 0, -50);
  scale(2);
  rect(-width/2, -height/2, width, height);
  pop();


  //cube grid
  for (let i = 0; i < width / (cubeSize + cubeMargin); i++) {
    for (let j = 0; j < height / (cubeSize + cubeMargin); j++) {
      let x = i * (cubeSize + cubeMargin) - width / 2 + cubeSize / 2 + cubeMargin;
      let y = j * (cubeSize + cubeMargin) - height / 2 + cubeSize / 2 + cubeMargin;
      drawCube(x, y, i, j);
    }
  }

  //shift to color
  if(frameCount > 500){
    whiteOut -= 1;
    whiteOut = constrain(whiteOut, 30, 255)
  }

}
  

//draw cube
function drawCube(x, y, i, j) {
     push();

     translate(x, y);

     
     //stroke color based on noise
     noFill();
     strokeWeight(2);
     stroke(((noise(i * noiseScale + noiseX, j * noiseScale) * 2) - 0.7) * 255 + whiteOut, 0 + whiteOut, ((noise(i * noiseScale + noiseX, j * noiseScale) * - 2) + 1.5) * 255 + whiteOut);


     //rotate based on noise
     rotateZ(angle);
     rotateY(noise(i * noiseScale + noiseX, j * noiseScale + noiseY) * noiseLevel);
     

     
     box(cubeSize);
     pop();
}