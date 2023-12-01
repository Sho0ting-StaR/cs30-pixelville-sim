// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let suffixes = ["ians","ius","sons","dotirs","kin","tyrs"];
let surnames = [" johnson","falcon","roberts","tiny","humble","berrington","afton","twilight","moon","tin","dragun","apple","maguire","stone","fazbear","smith","lafontaine","pierre"];
let names = ["john","bob","paul","regina","kara","gronk","william","micheal","doug","david","megan","missy","teresa","lady","guy","freddy","chica","bonnie","roxy","edward","nikita","guiseppi","remi","pierre"];
let behaviours = ["explorer","cautious","dumb"];
let races = [];
let biome;
let population = [];
let grid = [];
let peaks = [];
let tilesize = 30;
let wScale;
let winX = 50;
let winY = 30;
function setup() {
  biome = Math.floor(random(1,5));
  createCanvas(windowWidth, windowHeight);
  wScale = windowHeight/(tilesize/2);
  // background(50);
  // text("loading...",windowWidth/2, windowHeight/2);
  createGrid(winX,winY);
  // densityMapping(peaks);
  geoMapping(grid); 
}

function draw() {
  // circle(mouseX,mouseY,50);
  // if(frameCount%12 === 0){
  displayGrid();
  // }
  for(let p = 0; p< population.length;p++){
    population[p].aging();
    // if(frameCount%12===0){
    population[p].stroll();
    // }
  }
  displayBact();
  if(population.length>0){
    text(population.length,15,15);
  }
  else{
    text(0,15,15);
  }
}

function mousePressed(){ // change to calling a seperate function***
  let name = names[Math.floor(random(names.length))];
  let surname = surnames[Math.floor(random(surnames.length))]; // new person gets name
  console.log(name + " " + surname);
  if(races.length===0 || random(100)>91){
    let racename = [surname.concat(suffixes[Math.floor(random(0,6))])]; // new race creation
    races.push(racename);
    races[races.length-1].push(color(random(0,255),random(0,255),random(0,255))); // making identifiers for new race
    population.push(new Bacteria(mouseX,mouseY,racename,name,surname)); // adding new person to the world populus [population.indexOf(racename)]***
  }
  else{ // new person same race
    let racename = [races[races.length-1]];
    console.log(racename);
    population.push(new Bacteria(mouseX,mouseY,racename,name,surname)); // adding new person to the world populus      population.indexOf(racename)
  }
}

function displayBact(){
  for(let p = 0; p< population.length;p++){
    // console.log(population[p].race[1]);
    fill(population[p].race[0][1]); // fixxxxx thissss **********
    rect(population[p].x,population[p].y,population[p].size,population[p].size);
  }
}

class Bacteria {
  constructor (x,y,race,title1,title2){
    this.x=x;
    this.y=y;
    this.race=race;
    this.name = concat(title1,title2);
    this.size = 3;
    this.age = 0;
    this.personality = behaviours[Math.floor(random(0,3))]; // deciding movement behaviours
    this.repeat;
  }
  aging(){ // growing with age and to decide when a bacteria will pass away
    if(frameCount%300 === 0){
      this.age ++;
    }
    if(this.age>19){
      this.size = 5;
    }
    else if(this.age>8){
      this.size = 4;
    }
  }
  stroll(){ // add behaviour, will make different movement deciders later on
    if(!this.repeat>0){
      this.repeat = Math.floor(random(8)); //***  turn into a better movement pattern by repeating movements set amount of time
    }
    let dx = random(-0.35,0.351);
    let dy = random(-0.35,0.351);
    console.log(dx,dy);

    if((dx<0&&this.x>=dx)||(dx>=0&&this.x<=width-dx)){
      this.x += dx;
    }
    if((dy>0&&this.y>=dy)||(dy<=0&&this.y<=width-dy)){
      this.y += dy;
    }
  }
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
      if(biome === 1){ // forest
        if(grid[n][m][0] < 22){ //water // drawing correct terrain
          r = 40; 
          g = 80; 
          b= random(100,131);
        }
        else if(grid[n][m][0] <31){ // beach/sand
          r = 240; 
          g = 170; 
          b = 95;
        }
        else if(grid[n][m][0] <68){ // grass
          r = 40; 
          g = 100; 
          b = 30;
        }
        else if(grid[n][m][0] < 89){ // forest/trees
          r =0; 
          g =55; 
          b =0;
        }
        else if(grid[n][m][0] <= 100){ //rock
          r = 115; 
          g = 115; 
          b = 115;
        }
      }
      if(biome === 2){ // dessert
        if(grid[n][m][0] < 7){ //water // drawing correct terrain
          r = 40; 
          g = 80; 
          b= random(100,131);
        }
        else if(grid[n][m][0] < 50){ // beach/sand
          r = 230; 
          g = 160; 
          b = 90;
        }
        else if(grid[n][m][0] < 60){ // grass
          r = 33; 
          g = 92; 
          b = 0;
        }
        else if(grid[n][m][0] < 70){ // forest/trees
          r = 38; 
          g = 72; 
          b = 0;
        }
        else if(grid[n][m][0] <=100){ //rock
          r = 185; 
          g = 90; 
          b = 0;
        }
      }
      if(biome === 3){ // tundra
        if(grid[n][m][0] < 18){ //water/ice // drawing correct terrain
          r = 100; 
          g = 100; 
          b= random(210,231);
        }
        else if(grid[n][m][0] < 62){ // grass/snow
          r = 210; 
          g = 210; 
          b = 225;
        }
        else if(grid[n][m][0] < 78){ // forest/trees
          r = 32; 
          g = 62; 
          b = 35;
        }
        else if(grid[n][m][0] <=100){ //rock
          r = 80; 
          g = 80; 
          b = 80;
        }
      }
      if(biome === 4){ // archipelagos
        if(grid[n][m][0] < 50){ //water // drawing correct terrain
          r = 0; 
          g = 10; 
          b= random(85,120);
        }
        else if(grid[n][m][0] < 78){ // beach/sand
          r = 230; 
          g = 160; 
          b = 90;
        }
        else if(grid[n][m][0] < 90){ // grass
          r = 43; 
          g = 112; 
          b = 10;
        }
        else if(grid[n][m][0] < 95){ // forest/trees
          r = 22; 
          g = 80; 
          b = 30;
        }
        else if(grid[n][m][0] <=100){ //rock
          r = 140; 
          g = 145; 
          b = 148;
        }
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
  // console.log(peaks.length);
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
        let d = Math.floor(dist(x,y,p[0],p[1])/2.5); // good formula for deterioration
        // console.log(x,y,d);
        if(d<closest){
          closest = d;
          // console.log(p + " current point");
        }
      }
      // console.log(closest);
      if(grid[y][x][0] - closest <= 0){ // water is the minimum
        grid[y][x][0] = 0;
      }
      else{
        grid[y][x][0] -= closest;
      }
    }
  }
}

function createGrid(numx,numy) {
  for(let n =0;n<numy;n++){
    grid.push([]);
    for(let m =0;m<numx;m++){
      if(random(100)>97){
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
  // array.push(Math.floor(noise(m,n+m)*2.50)); //terrain type (grass,water,rock,tree)
  let w = Math.floor(random(100));// terrain
  array.push(w); // temporary terrain type//biome type (4 of savannah,desert,tundra,wastes,plains,forest,swamp)
  array.push(0); //territory (unclaimed only)
  if(peak){
    array.push(4);
    peaks.push([m,n,4]); // density for better generation
  }
  else{
    array.push(0);
  }
  return array;
}