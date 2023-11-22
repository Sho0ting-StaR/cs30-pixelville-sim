// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid = [];
let peaks = [];
let tilesize = 30;
let wScale;
let winX = 50;
let winY = 30;
function setup() {
  createCanvas(windowWidth, windowHeight);
  wScale = windowHeight/(tilesize/2);
  createGrid(winX,winY);
  // densityMapping(peaks);
  geoMapping(grid); 
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
      // text(grid[n][m][2],m*tilesize,n*tilesize); // terrain type
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
      fill(255);
      text(grid[n][m][2],m*tilesize,n*tilesize);
      // console.log(grid[n][m][2]); density
    }
  }
}

function densityMapping(ref){
  console.log(peaks.length);
  for(let l of ref){
    let x = l[0];
    let y = l[1];
    for(let lr = -1; lr <2; lr++){
      for(let ud = -1; ud<2; ud++){
        if(y-ud>=0&&y-ud<winY&&x-lr>=0&&x-lr<winX){ // border checking
          if(ud !== 0&&lr !== 0){ // making sure only neighbours
            // console.log(grid[y][x][2] + " peak " + l[2]);
            grid[y-ud][x-lr][2] = structuredClone(grid[y][x][2]) - 1; // decreasing height around peaks
            // console.log(grid[y-ud][x-lr][2]+" changed");
          }
        }
      }
    }
  }
} 
 
function geoMapping(ref){ // second option is every tile looks for the dist from all peaks and changes according to the closest one
  for(let y = 0;y<ref.length;y++){
    for(let x = 0;x<ref[y].length;x++){
      let closest = 100;
      for(let p of peaks){
        let d = Math.floor(dist(x,y,p[0],p[1]));
        console.log(x,y,d);
        if(d<closest){
          closest = d;
          console.log(p + " current point");
        }
      }
      console.log(closest);
      if((grid[y][x][0] - closest) < 0){
        grid[y][x][0] = 0;
      }
      else{
        grid[y][x][0] -= closest;
      }
      // console.log(grid[y][x]);
    }
  }
}

function createGrid(numx,numy) {
  for(let n =0;n<numy;n++){
    grid.push([]);
    for(let m =0;m<numx;m++){
      if(random(100)>95){
        grid[n].push(tileGenerate(m,n,true));
      }
      else{
        grid[n].push(tileGenerate(m,n,false));
      }
    }
  }
}

function tileGenerate(m,n,peak) {
  let array = [];
  // let n2 = n*4;
  // let m2 = m*4;
  // n2 = noise(,);
  // array.push(Math.floor(noise(m,n+m)*2.50)); //terrain type (grass,water,rock,tree)
  let w = Math.floor(random(0,4));// terrain
  array.push(w); // temporary terrain type//biome type (4 of savannah,desert,tundra,wastes,plains,forest,swamp)
  array.push(0); //territory (unclaimed only)
  if(peak){
    array.push(4);
    peaks.push([m,n,4]); // density for better generation
  }
  else{
    array.push(0);
  }
  // console.log(array);
  return array;
}