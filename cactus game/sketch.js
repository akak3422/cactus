var ground, invisibleGround, groundImage;
var cactus,cactusImg;
var angry,angryImg;
var monkey,monkeyImg;
var obstacles,o1,o2,o3,o4,o5,o6,obstaclesGroup;
var gameState="play";
var monkeyStopImg;
var score = 0;
function preload(){
 cactusImg = loadImage("cactus.png");
  groundImage = loadImage("ground2.png");
  angryImg=loadImage("angry.png");
 monkeyImg=loadAnimation("monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  monkeyStopImg=loadAnimation("monkey4.png");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  cactus= createSprite(420,160,30,20);
  cactus.addImage("cactus",cactusImg);
  cactus.scale = 0.2

  angry = createSprite(150,160,30,20);
  angry.addImage('angry',angryImg);
  angry.scale = 0.1

  monkey = createSprite(250,160,30,20);
  monkey.addAnimation('monkey',monkeyImg);
  monkey.addAnimation("stop",monkeyStopImg);
  monkey.scale = 0.5

  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround=createSprite(200,190,500,10)
  invisibleGround.visible=false;

  obstaclesGroup=new Group();
}

function draw() {
  //set background color
  background(220);
  text("Score : "+score,500,50);
  if(gameState=="play"){
  score=score+Math.round(getFrameRate()/60)
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
 if(keyDown("space")){
  cactus.velocityY=-10;
 }
 cactus.velocityY=cactus.velocityY+0.8;


  spawnObstacles();
  if(obstaclesGroup.isTouching(cactus)){

    gameState="end";
  }
}
if(gameState=="end"){
  ground.velocityX=0
  obstaclesGroup.setVelocityEach(0);
  monkey.changeAnimation("stop",monkeyStopImg);
  obstaclesGroup.setLifetimeEach(-1)
  console.log(obstacles.x)
}
cactus.collide(invisibleGround);
angry.collide(invisibleGround);
monkey.collide(invisibleGround);

  drawSprites();
  
}

function spawnObstacles(){
  if(frameCount%150==0){
    obstacles=createSprite(620,160,30,20)
    obstacles.velocityX=-2
    obstacles.lifetime=300
    var number=Math.round(random(1,6));
    switch(number){
      case 1: obstacles.addImage(o1);
              break;
      case 2: obstacles.addImage(o2);
              break;
      case 3: obstacles.addImage(o3);
              break;
     case 4: obstacles.addImage(o4);
              break;
      case 5: obstacles.addImage(o5);
              break;
      case 6: obstacles.addImage(o6);
              break;
      default:break;
    }
    obstaclesGroup.add(obstacles);
  }
}

