// Pixelville
// Nic or Starr
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gSpd = 4;
let world = 0;
let politico = false;
let dms = ["Left this world","Ascended","Did a woopsie","Perished","Faced their demise","Reached the end","Ran into a wall.. hard","Died","Left early","Took their leave", "Made their final escape","Risked it all","Lost the game of life", "Was banned","Died","Fell over","Hurted real bad","Has fallen heroically","Succumbed to time"];
let suffixes = ["ians","ius","sons","dotirs","kins","tyrs","yivans","etans","ics","itos","ikes","jins","kidds","steels","qis","yuks","chuks","piks","jikis","hydes","piers","fibs","hearts","souls","wings","winds","grims"];
let surnames = [" Johnson","Falcon","Roberts","Tiny","Humble","Berrington","Afton","Twilight","Moon","Tin","Dragun","Apple","Maguire","Stone","Fazbear","Smith","Lafontaine","Pierre","Pure","Fuller","Hope","Fortnite","Sigil","Bush","Boulder","Bird","Dove","Steele","Jasper","Rouge","Kiwi","Kanuk","Pibb"];
let names = ["John","Bob","Paul","Regina","Kara","Gronk","William","Micheal","Doug","David","Megan","Missy","Teresa","Lady","Guy","Freddy","Chica","Bonnie","Roxy","Edward","Nikita","Guiseppi","Remi","Pierre","Terry","Jeep","Karl","Gibby","Gaston",
  "Belle","Brooklynn","Fig","Hope","Fern","Twig","Pebble","Blessing","Joy","Dove","Sabrina","Marty","Monty","Moon","Happy","Willow","Tom","Jasper","Wren","Bird","Crumb","Anastasia","Peter","Adam","Eve","Julian",
  "Jordan","Jacob","Lola","Tina","Teddy","Parker","Pablo","Jared","Edmund","Oscar","William","Victor","Brian","Amelia","Gabbie","Terra","Pearl","Jose","Malcolm"];
let traits = ["explorer","cautious","dumb","swimmer","angry","lucky","religious","resourceful"];
let form = ["Soldier","Parent","Worker"];
let religi = ["Basilica ","Church ","Temple ", "Cathedral", "Sanctum","Sons","Daughters","Children","Wrath","Branch","Spawn","Cult","Witnesses","Followers","Chosen","Council","Will","Descendants","Followers"];
let religions = [];
let races = [];
let biome;
let buildings = [6,8,9];
let population = [];
let grid = [];
let peaks = [];
let tilesize = 30;
let wScale;
let winX = 52;
let winY = 30;
let historyLog = true;
let news = "...";
let wHistory = [];
let scrolled = 0;
let scrolled2 = 0;
let scrolled3 = 0;
let scrolled4 = 0;
let miniMenu = 0;
let poliMap = false;
let baby;
let carpenter;
let house1;
let house2;
let house3;
let parentI;
let pope;
let soldier;
let stonemason;

function preload(){
  baby = loadImage("images/baby.png");
  carpenter = loadImage("images/carpenter.png");
  house1 = loadImage("images/house1.png");
  house2 = loadImage("images/house2.png");
  house3 = loadImage("images/house3.png");
  parentI = loadImage("images/parent.png");
  pope = loadImage("images/pope.png");
  soldier = loadImage("images/soldier.png");
  stonemason = loadImage("images/stonemason.png");
}

function setup() {
  biome = Math.floor(random(1,5));
  createCanvas(windowWidth, windowHeight);
  wScale = windowHeight/(tilesize/2);
  background(0);
  createGrid(winX,winY);
  geoMapping(grid); 
  broadcast( "Hello world!");
}

function draw() {
  if(frameCount%3800/gSpd === 0){
    wildBandSpawn();
  }
  if(keyIsDown(76)&&frameCount%10===0){
    historyLog = !historyLog;
  }
  if(keyIsDown(80)&&frameCount%10===0){
    poliMap = !poliMap;
  }
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
      if(population.length-p-1>=0){
        population[n].death();
        population[n].aging();
        if(frameCount%(4/gSpd)===0){
          if(population[n].living){
            population[n].stroll();
            population[n].popCheck();
            population[n].action();
          }
        }
        population[n].vision();
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
  text("World age" + " " + world,100,15); // simulation run time
  if(historyLog){
    if(frameCount %6 === 0){
      if(keyIsDown(37)){
        if(miniMenu> 0){ // scrolling the history logs down
          miniMenu --;
        }
      }
      else if(keyIsDown(39)&&miniMenu<3){ // scroll up
        miniMenu ++;
      }
      if(miniMenu === 0){ // add a left right arrow option to switch between scroll menus******
        if(keyIsDown(40)){
          if(wHistory.length-scrolled-1 >= 0){ // scrolling the history logs down
            scrolled --;
          }
        }
        else if(keyIsDown(38)&&scrolled<0){ // scroll up
          scrolled ++;
        }
      }
      else if(miniMenu === 1){
        if(keyIsDown(40)){
          if(races.length-scrolled2-1 >= 0){ // scrolling the races log down
            scrolled2 --;
          }
        }
        else if(keyIsDown(38)&&scrolled2<0){ // scroll up
          scrolled2 ++;
        }
      }
      else if(miniMenu === 2){
        if(keyIsDown(40)){
          if(population.length-scrolled3-1 >= 0){ // scrolling the races log down
            scrolled3 --;
          }
        }
        else if(keyIsDown(38)&&scrolled3<0){ // scroll up
          scrolled3 ++;
        }
      }
      else if(miniMenu === 3){
        if(keyIsDown(40)){
          if(population.length-scrolled4-1 >= 0){ // scrolling the religions log down
            scrolled4 --;
          }
        }
        else if(keyIsDown(38)&&scrolled4<0){ // scroll up
          scrolled4 ++;
        }
      }
    }
    // HUD display
    fill(40);
    rect(0,height-120,width,120);
    broadcast(news);
    if(miniMenu === 0){
      fill(70);
      rect(0,height-120,290,120);
    }
    else if(miniMenu === 1){
      fill(70);
      rect(290,height-120,180,120);
    }
    else if(miniMenu === 2){
      fill(90);
      rect(470,height-115,140,20);
    }
    else if(miniMenu === 3){
      fill(70);
      rect(610,height-115,140,20);
    }
    fill(255);
    for(let h = 1; h<= wHistory.length;h++){
      text(wHistory[wHistory.length-h+scrolled], 10, height-100+(h-1)*20);
    }
    for(let r = 1; r<= races.length;r++){
      if(!(races.length-r+scrolled2<0)){
        text(races[races.length-r+scrolled2][0], 320, height-100+(r-1)*20);
        fill(races[races.length-r+scrolled2][1],races[races.length-r+scrolled2][2],races[races.length-r+scrolled2][3]);
        rect(300,height-100+(r-1)*20-10,10,10);
        fill(255);
      }
    }
    for(let p = 1; p<= population.length;p++){  // fix full logging system here
      if(!(population.length-p+scrolled3<0)){
        text(population[population.length-p+scrolled3].name + " " + population[population.length-p+scrolled3].surname, 500, height-100+(p-1)*20);
        fill(population[population.length-p+scrolled3].rgb);
        rect(480,height-100+(p-1)*20-10,10,10);
        fill(255);
      }
    }
    if(population.length>0&&population.length+scrolled3>0&&miniMenu === 2){
      text(population[population.length-1+scrolled3].name + " " + population[population.length-1+scrolled3].surname,640,height-100); // profile displays
      text(population[population.length-1+scrolled3].form,640,height-85);
      text(population[population.length-1+scrolled3].contributions,620,height-85);
      text(population[population.length-1+scrolled3].traits,620,height-70);
      text("Age" + " " + population[population.length-1+scrolled3].age,620,height-55);
      text(population[population.length-1+scrolled3].resources,670,height-55);
      text(population[population.length-1+scrolled3].race[0],620,height-40);
      text("Size " + population[population.length-1+scrolled3].size,620,height-25); 
      text(population[population.length-1+scrolled3].religion,620,height-10);
      fill(population[population.length-1+scrolled3].rgb);
      rect(620,height-110,10,10);
      fill("yellow");
      rect(population[population.length-1+scrolled3].x-1.5+population[population.length-1+scrolled3].size/2,population[population.length-1+scrolled3].y-2,3,3); // replace elsewhere later
      fill(255);
    } 
    for(let c = 1; c<= religions.length;c++){  // fix full logging system here
      if(!(religions.length-c+scrolled4<0)){
        fill(255);
        let four = 0;
        if(miniMenu === 2){
          four = 180;
        }
        else{
          four = 0;
        }
        text(religions[religions.length-c+scrolled4], 620+four, height-100+(c-1)*20);
        
      }
    }
    text("L to exit",width-60,height-100);
    text("Gamespeed " +gSpd + "x",width-90,height-20);
    fill(50 + gSpd*50);
    rect(width-70,height-90,50,50);
  }
}

function mouseClicked(){  // creates a brand new person of a ncew race at mouse location
  if(historyLog &&mouseY >= height-90&&mouseY<=height-40){
    if(mouseX >= width-70&& mouseX<= width-20){
      if(gSpd===4){ // game speed changer
        gSpd = 1;
      }
      else{
        gSpd++;
      }
    }
  }
  else{
    broadcast("Welcome " + newBorn("none",surnames[Math.floor(random(surnames.length))],mouseX,mouseY,2,[],"none")+ "!");
  }
}

function newBorn(ethnicity,surname,x,y,size,types,religion){
  let name = names[Math.floor(random(names.length))]; // new person gets name
  if(races.length===0 || random(300)>291||ethnicity==="none"){
    let racename = [surname.concat(suffixes[Math.floor(random(suffixes.length))])]; // new race creation
    races.push(racename);
    races[races.length-1].push(color(random(0,255),random(0,255),random(0,255)));
    races[races.length-1].push(["Atheist"]);
    let colour = races[races.length-1][1]; // making identifiers for new race
    population.push(new Bacteria(x,y,racename,name,surname,colour,size,types,religion)); // adding new person to the world populus [population.indexOf(racename)]***
  }
  else{ // new person same race
    let colour = races[races.indexOf(ethnicity)][1];
    population.push(new Bacteria(x,y,ethnicity,name,surname,colour,size,types,religion)); // adding new person to the world populus  population.indexOf(racename)
  }
  return name + " " + surname;
}

function displayBact(){ // drawing all the little guys
  for(let p = 0; p< population.length;p++){
    let spot= Math.floor(population[p].y/tilesize);
    let spot2 = Math.floor(population[p].x/tilesize);
    if(buildings.includes(grid[Math.floor(population[p].y/tilesize)][Math.floor(population[p].x/tilesize)][4])){
      if(population[p].x>spot2+tilesize/4&&population[p].x<spot2+3*tilesize/4&&population[p].y>spot+tilesize/4&&population[p].y<spot+3*tilesize/4){
        let l} // figure out what this is for
    }
    else{
      if(population[p].form === "pope"){
        fill(255);
        rect(population[p].x-1.5,population[p].y-1.5,population[p].size+3,population[p].size+3);
      }
      if(population[p].living===true){
        fill(population[p].rgb);
      }
      else{
        fill(0);
      }
      rect(population[p].x, population[p].y, population[p].size+1, population[p].size+1);
      image(population[p].img, population[p].x, population[p].y,population[p].size,population[p].size);
    }
  }
}

function build(whereY,whereX,what,who){//where to build and what its building
  grid[whereY][whereX][4] = what;
  grid[whereY][whereX][5] = who;
}

function wildBandSpawn(){ // random group spawning
  let xx = random(60,width-60);
  let yy = random(60,height-60);
  let ln = surnames[Math.floor(random(surnames.length))];
  let et = [ln.concat(suffixes[Math.floor(random(suffixes.length))])];
  
  races.push(et);
  races[races.length-1].push(color(random(0,255),random(0,255),random(0,255)));
  races[races.length-1].push([]);
  let col = races[races.length-1][1];
  let s = Math.floor(random(3,7));
  for(let l = 0; l<s; l++){
    if(grid[Math.floor(yy/tilesize)][Math.floor(xx/tilesize)][3] === 0){
      population.push(new Bacteria(xx,yy,et,names[Math.floor(random(names.length))],ln,col,2,["swimmer"],"none"));
    }
    else if([3,4].includes(grid[Math.floor(yy/tilesize)][Math.floor(xx/tilesize)][3])){
      broadcast( "A wild band of " + et[0] + " almost appeared..");
      return true;
    }
    else{
      population.push(new Bacteria(xx,yy,et,names[Math.floor(random(names.length))],ln,col,2,[],"none"));
    }
    broadcast("A wild band of " + et[0] + " has appeared!");
  }
}

class Bacteria {
  constructor (x,y,race,title1,title2,colour,size,types,religion){
    this.img = baby;
    this.contributions = 0;
    this.x=x;
    this.y=y;
    this.race=race;
    this.name = title1;
    this.surname = title2;
    this.size = size;
    this.age = 0;
    this.traits = [traits[Math.floor(random(traits.length))]];
    for(let l of types){
      if(!this.traits.includes(l)){
        this.traits.push(l); // deciding movement behaviours
      }
    }
    this.repeat;
    this.allowed = [1,2,5,7,8]; //sand,ground,ice,house,path,apartment
    this.current;
    this.maxage = Math.floor(random(45,80)); // when they die of old age
    this.rgb = colour;
    this.resources = 1;
    this.religion = religion;
    if(population.length<=15){
      this.form = "Parent";
      this.img = parentI;
    }
    else{
      this.form = form[Math.floor(random(3))]; // role in society
    }
    if(this.form==="Worker"){
      if(random(100)>50||population.length<40){
        this.form= "Carpenter";
        this.img = carpenter;
      }
      else{
        this.form = "stonemason";
        this.img = stonemason;
      }
    }
    this.chance = random(35,69); // likelihood of performing actions
    if(this.form==="Carpenter"){
      this.buildables = [1,2,5];
    }
    else if(this.form==="Stonemason"){
      this.buildables = [0];
    }
    if(this.traits.includes("Lucky")){
      this.chance = 81; // in memorium of sabrina falcon
    }
    if(this.traits.includes("Cautious")){
      this.allowed.push(6);
    }
    if(this.traits.includes("Swimmer")){
      this.allowed.push(0);
    }
    if(this.traits.includes("Resourceful")){
      this.resources = 1;
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
    if(this.allowed.includes(grid[Math.floor((cy+dy)/tilesize)][Math.floor((cx+dx)/tilesize)][3])){//&&this.allowed.includes(grid[Math.floor((cy+dy)/tilesize)][Math.floor((cx+dx)/tilesize)][4]))){
      if(dx<0&&cx>=dx||dx>=0&&cx<=width-dx){
        this.x += dx;
      }
      if(dy>0&&cy>=dy||dy<=0&&cy<=width-dy){
        this.y += dy;
      }
    }
  }
  death(){
    if(this.living){
      if(this.traits.includes("Dumb")&&this.age>this.maxage-24||this.age>this.maxage){ // removed ||!this.allowed.includes(grid[Math.floor(this.y/tilesize)][Math.floor(this.x/tilesize)][3])
        this.living = false;
        broadcast(this.name + " " + this.surname +" " + dms[Math.floor(random(dms.length))] +" at " + this.age);
        let scale = this.size;
        this.age=100;
        this.size = scale;
      }
    }
  }
  popCheck(){
    if(this.living&&population.length <= 15){
      this.form = "Parent";
      this.img = parentI;
    }
  }
  vision(){
    if(frameCount%999===0){
      if(this.chance+30>random(100)&&population.length>50){
        if(this.age>35&&this.form !== "Pope"&&this.traits.includes("Religious")&&this.religion==="none"){
          this.form = "Pope";
          this.img = pope;
          this.resources = 1;
          broadcast(this.name +" "+this.surname + " has had a vision of religious ecstacy!");
        }
      }
    }
  }
  action(){
    let wt = 1300;
    if(this.traits.includes("Religious")){
      wt = 999;
    }
    if(this.form === "Parent"&&frameCount%(wt/gSpd)===0&&this.age>23&&this.age<53&&this.size>=4){ // split
      this.img = parentI;
      if(random(100)>=this.chance){
        this.size = this.size/2;
        broadcast(this.name + " " + this.surname + " had a kid!");
        broadcast("Welcome " + newBorn(this.race,this.surname,this.x,this.y,this.size,this.traits,this.race[2][Math.floor(random(this.race[2].length))])+ "!");
        this.contributions ++;
        if(this.resources === 1){
          broadcast(this.name + " " + this.surname + " had a kid!");
          broadcast("Welcome " + newBorn(this.race,this.surname,this.x,this.y,this.size,this.traits,this.race[2][Math.floor(random(this.race[2].length))])+ "!");
          this.contributions ++;
          this.resources --;
        }
      }
    }
    else if(this.form === "Pope"){
      this.img = pope;
      this.buildables = buildings;
      if(this.buildables.includes(grid[Math.floor(this.y/tilesize)][Math.floor(this.x/tilesize)][4])){
        if(this.resources>0){
          build(Math.floor(this.y/tilesize),Math.floor(this.x/tilesize),9,this.race[1]);
          broadcast("Pope " + this.name + " " + this.surname + " blessed a shrine!");
          let rel = religi[Math.floor(random(religi.length))] +" of " + this.surname;
          this.religion = rel;
          broadcast(this.religion + " has been erected!");
          religions.push([rel,structuredClone(world)]);
          this.race[2].push(this.religion);
          this.resources--;
        }
        this.contributions ++;
        return true;
      }
    }
    else if(this.form === "Soldier"&&frameCount%(800/gSpd)===0&&this.age>18&&this.age<69){ // split
      this.img = soldier;
      if(random(100)>=this.chance){
        grid[Math.floor(this.y/tilesize)][Math.floor(this.x/tilesize)][5] = this.race[1];
        broadcast("The " + this.race[0] + " have expanded their territory!");
        broadcast("Long live the " + this.race[0] +" empire!");
        this.contributions ++;
      }
    }
    else if(this.form === "Carpenter"&&frameCount%(1500/gSpd)===0&&this.age>18&&this.age<69){ // build
      this.img = carpenter;
      if(this.resources > 0){
        this.buildables = [1,2,5];
        this.token = "construct";
      }
      else{
        this.buildables = [3];
        this.token = "deconstruct";
      }
      if(this.form === "Carpenter"){
        for(let y = -1; y < 2; y++){
          for(let x = -1; x < 2; x++){
            if(this.buildables.includes(grid[Math.floor(this.y/tilesize+y)][Math.floor(this.x/tilesize+x)][3])){
              if(this.token === "Construct"){
                build(Math.floor(this.y/tilesize+y),Math.floor(this.x/tilesize+x),6,this.race[1],this.token);
                broadcast(this.name + " " + this.surname + " has built a house!");
                console.log("house");
                this.resources--;
              }
              else{
                build(Math.floor(this.y/tilesize+y),Math.floor(this.x/tilesize+x),2,this.race[1],this.token);
                this.resources++;
              }
              this.contributions ++;
              if(population.length<15){
                this.form = "Parent";
              }
              return true;
            }
          }
        }
      }
    }
    else if(this.form === "Stonemason"&&frameCount%(1800/gSpd)===0&&this.age>18&&this.age<69){ // build
      this.img = stonemason;
      if(this.resources > 0){
        this.buildables = [0];
        this.token = "construct";
      }
      else{
        this.buildables[4];
        this.token = "deconstruct";
      }
      if(this.form === "Stonemason"){
        for(let y = -1; y < 2; y++){
          for(let x = -1; x < 2; x++){
            if(this.buildables.includes(grid[Math.floor(this.y/tilesize+y)][Math.floor(this.x/tilesize+x)][3])){
              if(this.token === "construct"){
                build(Math.floor(this.y/tilesize+y),Math.floor(this.x/tilesize+x),7,this.race[1],this.token);
                broadcast(this.name + " " + this.surname + " has built a bridge!");
                this.resources--;
              }
              else{
                build(Math.floor(this.y/tilesize+y),Math.floor(this.x/tilesize+x),2,this.race[1],"deconstruct");
                // this.resources++;
              }
              this.contributions ++;
              if(random(100)>69||this.age>44){
                this.form = "Parent";
              }
              return true;
            }
          }
        }
      }
    }
  }
}

function broadcast(message){
  if(news !== message){
    wHistory.push(world + "   " + message);
  }
  news = message;
}

function displayGrid(){
  let r;
  let g;
  let b;
  for(let n =0; n< grid.length;n++){
    for(let m =0;m < grid[n].length;m++){
      noStroke();
      fill(190);
      if(!poliMap){
        // text(grid[n][m][2],m*tilesize,n*tilesize); // terrain type
        if(biome === 1){ // forest
          if(grid[n][m][0] < 22){ //water // drawing correct terrain
            r = 40;
            g = 80;
            b = 112;
            grid[n][m][3] = 0;
          }
          else if(grid[n][m][0] <31){ // beach/sand
            r = 240; 
            g = 170; 
            b = 95;
            grid[n][m][3] = 1;
          }
          else if(grid[n][m][0] <68||grid[n][m][4] === 2){ // grass
            grid[n][m][0] = 65;
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
        if(biome === 2){ // desert
          if(grid[n][m][0] < 7){ //water // drawing correct terrain
            r = 40; 
            g = 80; 
            b= random(100,131);
            grid[n][m][3] = 0;
          }
          else if(grid[n][m][0] < 50||grid[n][m][4] === 2){ // beach/sand
            grid[n][m][0] = 49;
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
          else if(grid[n][m][0] < 62||grid[n][m][4]=== 2){ // grass/snow
            grid[n][m][0] = 61;
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
          else if(grid[n][m][0] < 78||grid[n][m][4]===2){ // beach/sand
            grid[n][m][0] = 69;
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
        rect(m*tilesize,n*tilesize,tilesize,tilesize);    // house
        if(grid[n][m][4]===6){
          fill(70,40,33);
          image(house1,tilesize/4 + m*tilesize,tilesize/4 + n*tilesize,tilesize/2,tilesize/2);
        }   
        else if(grid[n][m][4]===9){ // shrine
          fill(255); 
          rect(tilesize/4 + m*tilesize,tilesize/4 + n*tilesize,tilesize/2,tilesize/2);
          fill(70,40,33);
          rect(tilesize/3 + m*tilesize,tilesize/3 + n*tilesize,tilesize/3,tilesize/3);
        }  
      }
      else{ // political mark
        if(grid[n][m][4]===9){
          fill(255);
          rect(m*tilesize,n*tilesize,tilesize,tilesize);  
          fill(grid[n][m][5]);  
          rect(m*tilesize+tilesize/4,n*tilesize+tilesize/4,tilesize/2,tilesize/2);  
        }
        else{
          fill(grid[n][m][5]); 
          rect(m*tilesize,n*tilesize,tilesize,tilesize);  
        } 
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
      grid[n][m].push("void");
      grid[n][m].push("black");
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
