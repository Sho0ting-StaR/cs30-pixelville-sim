// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gSpd = 4;
let world = 0;
let politico = false;
let suffixes = ["ians","ius","sons","dotirs","kin","tyrs","yivans","etans","ics","itos","ikes"];
let surnames = [" johnson","falcon","roberts","tiny","humble","berrington","afton","twilight","moon","tin","dragun","apple","maguire","stone","fazbear","smith","lafontaine","pierre","pure","fuller","hope","fortnite","sigil","bush","boulder"];
let names = ["john","bob","paul","regina","kara","gronk","william","micheal","doug","david","megan","missy","teresa","lady","guy","freddy","chica","bonnie","roxy","edward","nikita","guiseppi","remi","pierre","terry","jeep","karl","gibby","gaston","belle","Brooklynn","fig","hope","fern","twig","pebble","blessing","joy","dove","sabrina","marty","monty","moon","happy","willow","tom"];
let traits = ["explorer","cautious","dumb","swimmer","angry","normal","lucky"];
let form = ["soldier","parent","worker"];
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
  // rectMode(CENTER);
  biome = Math.floor(random(1,5));
  createCanvas(windowWidth, windowHeight);
  wScale = windowHeight/(tilesize/2);
  background(0);
  createGrid(winX,winY);
  geoMapping(grid); 
}

function draw() {
  if(frameCount%(198/gSpd)===0){
    world ++;
  }
  displayGrid();
  for(let p = 0; p< population.length;p++){
    let n = population.length-p-1;
    if(population[n].age>population[n].maxage+24){
      population.splice(n,1);
    }
    else{
      population[n].death();
      population[n].aging();
      if(frameCount%(4/gSpd)===0){
        if(population[n].living){
          population[n].stroll();
          population[n].action();
        }
      }
    }
  }
  displayBact();
  stroke(0);
  fill(255);
  if(population.length>0){ // population count
    text(population.length,15,15);
  }
  else{
    text(0,15,15);
  }
  text("world age" + " " + world,100,15);
}

function mousePressed(){  // creates a brand new person of a ncew race at mouse location
  console.log("welcome " + newBorn("none",surnames[Math.floor(random(surnames.length))],mouseX,mouseY,2)+ "!");
}

function newBorn(ethnicity,surname,x,y,size){
  let name = names[Math.floor(random(names.length))]; // new person gets name
  let lastname = surnames[Math.floor(random(surnames.length))];
  if(races.length===0 || random(300)>291||ethnicity==="none"){
    let racename = [surname.concat(suffixes[Math.floor(random(0,6))])]; // new race creation
    races.push(racename);
    races[races.length-1].push(color(random(0,255),random(0,255),random(0,255)));
    let colour = races[races.length-1][1]; // making identifiers for new race
    population.push(new Bacteria(x,y,racename,name,lastname,colour,size)); // adding new person to the world populus [population.indexOf(racename)]***
  }
  else{ // new person same race
    let colour = races[races.indexOf(ethnicity)][1];
    population.push(new Bacteria(x,y,ethnicity,name,surname,colour,size)); // adding new person to the world populus  population.indexOf(racename)
  }
  return name + " " + surname;
}

function displayBact(){
  for(let p = 0; p< population.length;p++){
    if(population[p].living===true){
      fill(population[p].rgb);
    }
    else{
      fill(0);
    }
    let spot= Math.floor(population[p].y/tilesize);
    let spot2 = Math.floor(population[p].x/tilesize);
    if(grid[Math.floor(population[p].y/tilesize)][Math.floor(population[p].x/tilesize)][4]===6){
      if(population[p].x>spot2+tilesize/4&&population[p].x<spot2+3*tilesize/4&&population[p].y>spot+tilesize/4&&population[p].y<spot+3*tilesize/4){
        // console.log("inside",grid[Math.floor(population[p].y/tilesize)][Math.floor(population[p].x/tilesize)][3]);
      }
    }
    else{
      rect(population[p].x,population[p].y,population[p].size,population[p].size);
    }
  }
}

function build(whereY,whereX,what){//where to build and what its building
  grid[whereY][whereX][4] = what;
}

class Bacteria {
  constructor (x,y,race,title1,title2,colour,size){
    this.x=x;
    this.y=y;
    this.race=race;
    this.name = concat(title1," ",title2);
    this.surname = title2;
    this.size = size;
    this.age = 0;
    this.personality = traits[Math.floor(random(0,3.3))]; // deciding movement behaviours
    this.repeat;
    this.allowed = [1,2,5,7,8]; //sand,ground,ice,house,path,apartment
    this.current;
    this.maxage = Math.floor(random(45,80)); // when they die of old age
    this.rgb = colour;
    this.form = form[Math.floor(random(3))]; // role in society
    this.chance = random(35,69); // likelyhood of performing actions
    if(this.form==="worker"){
      this.buildables = [1,2,5];
    }
    if(this.traits==="lucky"){
      this.chance = 95;
    }
    if(this.traits==="cautious"){
      this.allowed.push(6);
    }
    if(this.personality === "swimmer"){
      this.allowed.push(0);
    }
    this.living = true;
  }
  aging(){ // growing with age and to decide when a bacteria will pass away
    if(frameCount%(198/gSpd) === 0){
      this.age ++;
    }
    if(this.age > this.maxage + 24){
      this.rgb = color(0,0,0,0);
    }
    else if(this.age > this.maxage + 12){
      this.rgb = color(0,0,0,70);
    }
    else if(this.size<8){
      if(frameCount%(792/gSpd)===0){
        this.size++;
      }
    }
  }
  stroll(){ // add behaviour, will make different movement deciders later on
    if(!this.repeat>0){
      this.repeat = Math.floor(random(8)); //***  turn into a better movement pattern by repeating movements set amount of time
    }
    let dx = random(-0.35,0.351);
    let dy = random(-0.35,0.351);
    let cx = this.x + this.size/2;
    let cy = this.y + this.size/2;
    // if(dy>0&&this.y>=dy||dy<=0&&this.y<=width-dy&&dx<0&&this.x>=dx||dx>=0&&this.x<=width-dx){
    if(this.allowed.includes(grid[Math.floor((cy+dy)/tilesize)][Math.floor((cx+dx)/tilesize)][3])){//&&this.allowed.includes(grid[Math.floor((cy+dy)/tilesize)][Math.floor((cx+dx)/tilesize)][4]))){
      if(dx<0&&cx>=dx||dx>=0&&cx<=width-dx){
        this.x += dx;
      }
      if(dy>0&&cy>=dy||dy<=0&&cy<=width-dy){
        this.y += dy;
      }
    }
    // }
  }
  death(){
    // if(!this.allowed.includes(6)&&grid[Math.floor(this.y/tilesize)][Math.floor(this.x/tilesize)][4]===6){
    // this.allowed.push(6);
    // }
    if(this.age>this.maxage||!this.allowed.includes(grid[Math.floor(this.y/tilesize)][Math.floor(this.x/tilesize)][3])){ // make ethnic life expectancy variable??
      this.living = false;
      console.log(this.name + " has died at " + this.age + " :(");
      let scale = this.size;
      this.age=100;
      this.size = scale;
    }
  }
  action(){
    if(this.form === "parent"&&frameCount%(1300/gSpd)===0&&this.age>26&&this.age<53&&this.size>=4){ // split
      this.size = this.size/2;
      if(random(100)>=this.chance){
        console.log(this.name + " had a kid!");
        console.log("welcome " + newBorn(this.race,this.surname,this.x,this.y,this.size)+ "!");
      }
    }
    else if(this.form === "worker"&&frameCount%(1600/gSpd)===0&&this.age>18&&this.age<69){ // build
      if(random(100)>=this.chance){
        for(let y = -1; y < 2; y++){
          for(let x = -1; x < 2; x++){
            if(this.buildables.includes(grid[Math.floor(this.y/tilesize+y)][Math.floor(this.x/tilesize+x)][3])){
              build(Math.floor(this.y/tilesize+y),Math.floor(this.x/tilesize+x),6);
              console.log(this.name + " has built a house!");
              if(random(100)>39||this.age>47){
                this.form = "parent";
              }
              return true;
            }
          }
        }
      }
    }
  }
}

function displayGrid(){
  let r;
  let g;
  let b;
  let water; // testing water sparkle speed
  for(let n =0; n< grid.length;n++){
    for(let m =0;m < grid[n].length;m++){
      noStroke();
      fill(190);
      // text(grid[n][m][2],m*tilesize,n*tilesize); // terrain type
      if(biome === 1){ // forest
        
        if(grid[n][m][0] < 22){ //water // drawing correct terrain
          r = 40;
          g = 80;
          b = 112;
          water = [structuredClone(r),structuredClone(g),structuredClone(b)];
          if(frameCount%(8/gSpd)===0){ // speed of water movement
            water[2]= random(100,131);
          }
          r = water[0];
          g = water[1];
          b = water[2];
          grid[n][m][3] = 0;
        }
        else if(grid[n][m][0] <31){ // beach/sand
          r = 240; 
          g = 170; 
          b = 95;
          grid[n][m][3] = 1;
        }
        else if(grid[n][m][0] <68){ // grass
          r = 40; 
          g = 100; 
          b = 30;
          grid[n][m][3] = 2;
        }
        else if(grid[n][m][0] < 89){ // forest/trees
          r =0; 
          g =55; 
          b =0;
          grid[n][m][3] = 3;
        }
        else if(grid[n][m][0] <= 100){ //rock
          r = 115; 
          g = 115; 
          b = 115;
          grid[n][m][3] = 4;
        }
      }
      if(biome === 2){ // dessert
        if(grid[n][m][0] < 7){ //water // drawing correct terrain
          r = 40; 
          g = 80; 
          b= random(100,131);
          grid[n][m][3] = 0;
        }
        else if(grid[n][m][0] < 50){ // beach/sand
          r = 230; 
          g = 160; 
          b = 90;
          grid[n][m][3] = 1;
        }
        else if(grid[n][m][0] < 60){ // grass
          r = 33; 
          g = 92; 
          b = 0;
          grid[n][m][3] = 2;
        }
        else if(grid[n][m][0] < 70){ // forest/trees
          r = 38; 
          g = 72; 
          b = 0;
          grid[n][m][3] = 3;
        }
        else if(grid[n][m][0] <=100){ //rock
          r = 185; 
          g = 90; 
          b = 0;
          grid[n][m][3] = 4;
        }
      }
      if(biome === 3){ // tundra
        if(grid[n][m][0] < 18){ //water/ice // drawing correct terrain
          r = 160; 
          g = 160; 
          b= random(210,241);
          grid[n][m][3] = 5; // ice
        }
        else if(grid[n][m][0] < 62){ // grass/snow
          r = 210; 
          g = 210; 
          b = 225;
          grid[n][m][3] = 2; // ground
        }
        else if(grid[n][m][0] < 78){ // forest/trees
          r = 32; 
          g = 62; 
          b = 35;
          grid[n][m][3] = 3; //trees
        }
        else if(grid[n][m][0] <=100){ //rock
          r = 80; 
          g = 80; 
          b = 80;
          grid[n][m][3] = 4; // stone
        }

      }
      if(biome === 4){ // archipelagos
        if(grid[n][m][0] < 50){ //water // drawing correct terrain
          r = 0; 
          g = 10; 
          b= random(85,120);
          grid[n][m][3] = 0; // water
        }
        else if(grid[n][m][0] < 78){ // beach/sand
          r = 230; 
          g = 160; 
          b = 90;
          grid[n][m][3] = 1; // sand
        }
        else if(grid[n][m][0] < 90){ // grass
          r = 43; 
          g = 112; 
          b = 10;
          grid[n][m][3] = 2; // ground
        }
        else if(grid[n][m][0] < 95){ // forest/trees
          r = 22; 
          g = 80; 
          b = 30;
          grid[n][m][3] = 3; // trees
        }
        else if(grid[n][m][0] <=100){ //rock
          r = 140; 
          g = 145; 
          b = 148;
          grid[n][m][3] = 4; // stone
        }
      }
      fill(r,g,b);
      rect(m*tilesize,n*tilesize,tilesize,tilesize);   
      if(grid[n][m][4]===6){
        fill(70,40,33);
        rect(tilesize/4 + m*tilesize,tilesize/4 + n*tilesize,tilesize/2,tilesize/2);
      }   
    }
  }
}

function densityMapping(ref){
  for(let l of ref){
    let x = l[0];
    let y = l[1];
    for(let lr = -1; lr <2; lr++){
      for(let ud = -1; ud<2; ud++){
        if(y-ud>=0&&y-ud<winY&&x-lr>=0&&x-lr<winX){ // border checking
          if(ud !== 0&&lr !== 0){ // making sure only neighbours
            grid[y-ud][x-lr][2] = structuredClone(grid[y][x][2]) - 1; // decreasing height around peaks
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
        grid[n].push(tileGenerate(m,n,true)); // heightmapping
      }
      else{
        grid[n].push(tileGenerate(m,n,false));
      }
      grid[n][m].push("Void");
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
  array.push(2);
  return array;
}