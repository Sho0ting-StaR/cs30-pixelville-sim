// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid = [];
let tilesize = 72;
let scale = height/tilesize;
function setup() {
  createCanvas(windowWidth, windowHeight);
  createGrid(,72,36);
}

function draw() {
  background(220);
  circle(mouseX,mouseY,50);
}

function displayGrid(){
  for(let n of grid){
    for(let m of grid[n]){
      rect(m*scale,n*scale,scale,scale);
    }
  }
}

function createGrid(scaling,numx,numy) {
  for(let n of numy){
    grid.push([]);
    for(let m of numx){
      grid[n].push(tileGenerate());
      
    }
  }
}

function tileGenerate() {
  let array = [];
  //array.push(Math.floor(random(0,4))); //terrain type (grass,water,rock,tree)
  array.push(Math.floor(random(0,4))); //biome type (4 of savannah,desert,tundra,wastes,plains,forest,swamp)
  array.push(0); //territory (unclaimed only)
  //array.push(Math.floor(random(0,7))); // density for better generation
  return array;
}