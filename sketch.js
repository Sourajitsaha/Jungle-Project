var jungleSprite, jungleImg;
var boySprite, boyImg;

var animal, A1, A2, A3, A4, A5, animalGrp;
var bearImg,tigerImg,lionImg;
var bullet, bulletImg,bulletsound;

var bird, birdImg, birdGrp,birdImg1,birdImg2;

var gameState = "play";

var score = 0;

var lifeCount = 3;

function preload(){
  jungleImg = loadImage("images/jungle.jpg");
  boyImg = loadImage("images/boy.png");
  bearImg=loadImage("images/bear.png");
  tigerImg=loadImage("images/tiger.png");
  lionImg=loadImage("images/lion.png");
  bulletImg=loadImage("images/bullet.png");
  birdImg1=loadAnimation("images/bird1.png","images/bird2.png");
  bulletsound=loadSound("bullet.mp3");
}

function setup() {
  createCanvas(800,400);
  
  //jungle
  jungleSprite = createSprite(400, 200, 800, 400);
  jungleSprite.addImage("jungle", jungleImg);
  jungleSprite.scale = 1.5;
  jungleSprite.velocityX = -2;

  
  //bullet 
  
  
  //boy
  boySprite = createSprite(50, 380, 20, 50);
  boySprite.addImage("boy_running", boyImg);
  boySprite.scale = 0.3;

  
  
  birdGrp = new Group();
  animalGrp = new Group();

  fill("white");
  textSize(20);
  textFont("Comic MS");
}

function draw() {
  if (gameState==="play"){

  
  if(jungleSprite.x < 0){
    jungleSprite.x = jungleSprite.width / 2;
  }
  if(keyDown("space")){
    bullet = createSprite(50, 380, 20, 20);
    bullet.addImage("bullet", bulletImg);
    bullet.scale = 0.3;
    bullet.velocityX = 5;

    bullet.depth = boySprite.depth;
    boySprite.depth =boySprite.depth+1;
    
    bulletsound.play();

  }

  
  
    //sccoring the system
  for(var i = 0; i<animalGrp.length;i++){
    if(bullet !== undefined){
      if(bullet.isTouching(animalGrp.get(i))){
        score += 50;
        animalGrp.get(i).destroy();
        bullet.destroy();
      }
    }
  }
  

  if(animalGrp.isTouching(boySprite)){
    
    
    lifeCount=lifeCount-1;
  }

  if(lifeCount===0){
    gameState="end";
  }
  addBirds();
  addAnimals();

  }else if(gameState==="end"){
    jungleSprite.velocityX=0;
    animalGrp.setVelocityXEach(0);
    birdGrp.setVelocityXEach(0);
    animalGrp.setLifetimeEach(-1);
    birdGrp.setLifetimeEach(-1);
    textSize(30);
    text("GAME OVER",370,200);
  }

  drawSprites();

  text("SCORE: " + score, 600, 50);
  text("Lives Left= "+lifeCount,600,100);
}

function addBirds(){
  if (frameCount % 100 === 0) {
    var bird = createSprite(800, 75, 20, 20);
    //add img when you have loaded in preload
    //add scale too
    bird.velocityX = -4;
    bird.lifetime = 200;
    bird.y = Math.round(random(40, 90));
    bird.addAnimation("birds",birdImg1);
    birdGrp.add(bird);
  
  }

}
function addAnimals(){
  if(frameCount % 150=== 0){
    var a1=createSprite(800,380,20,40);
    var randnumber=Math.round(random(1,3));
    switch(randnumber){
      case 1: a1.addImage("animal1", bearImg);
              a1.scale = 0.3;
              break;

      case 2: a1.addImage("animal2",lionImg);
              break;

      case 3:a1.addImage("animal3",tigerImg);
              break;
      default: break;
    }
    a1.shapeColor = "red";
    a1.velocityX=-4;
    a1.lifetime=200;
    animalGrp.add(a1);
  }
}