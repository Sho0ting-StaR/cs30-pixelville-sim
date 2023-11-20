// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid = [];
let tilesize = 72;
let wScale;
function setup() {
  createCanvas(windowWidth, windowHeight);
  wScale = windowHeight/(tilesize/2);
  createGrid(72,36);
}

function draw() {
  // circle(mouseX,mouseY,50);
  displayGrid();
}



function displayGrid(){
  let r;
  let g;
  let b;
  for(let n =0; n< grid.length;n++){
    for(let m =0;m < grid[n].length;m++){
      noStroke();
      fill(190);
      text(grid[n][m][0],m*tilesize,n*tilesize); // terrain type
      if(grid[n][m][0] === 0){ //water // drawing correct terrain
        r = 40; 
        g = 80; 
        b= random(100,131);
      }
      else if(grid[n][m][0] === 1){ // grass
        r = 40; 
        g = 80; 
        b = 30;
      }
      else if(grid[n][m][0] === 2){ // forest
        r =0; 
        g =35; 
        b =0;
      }
      else if(grid[n][m][0] === 3){ //rock
        r = 135; 
        g = 135; 
        b = 135;
      }
      fill(r,g,b);
      rect(m*tilesize,n*tilesize,tilesize,tilesize);
      // console.log(grid[n][m][2]); density
    }
  }
}

function createGrid(numx,numy) {
  for(let n =0;n<numy;n++){
    grid.push([]);
    for(let m =0;m<numx;m++){
      grid[n].push(tileGenerate(m));
      // console.log(grid[n]);
      
    }
  }
}

function tileGenerate(m) {
  let array = [];
  //array.push(Math.floor(random(0,4))); //terrain type (grass,water,rock,tree)
  // let n2 = n*4;
  // let m2 = m*4;
  // n2 = noise(,);
  array.push(Math.floor(noise(m)*4));
  // array.push(Math.floor(random(0,4))); //biome type (4 of savannah,desert,tundra,wastes,plains,forest,swamp)
  array.push(0); //territory (unclaimed only)
  array.push(Math.floor(random(0,7))); // density for better generation
  // console.log(array);
  return array;
}