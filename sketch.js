var trex,trex_collided,trex_running;
var ground,groundImage,iGround;
var cloud,cloudImage,CloudsGroup
 var PLAY = 1;
var highScore = 0
var restart,restartImage,gameOver,gameOverImage
var END = 0;
var gameState = PLAY;
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6,ObstaclesGroup
    var count=0,x=0
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png")
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  restartImage=loadImage("restart.png")
  gameOverImage=loadImage("gameOver.png")
}
 
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,50)
  trex.addAnimation("Running",trex_running)
    trex.addAnimation("collided",trex_collided)
trex.scale=0.5
  ground=createSprite(300,180,600,20)
  ground.addImage("ground",groundImage)
  ground.velocityX=-6
  iGround=createSprite(300,190,600,20)
  iGround.visible=false
  CloudsGroup=new Group()
   ObstaclesGroup=new Group()
  gameOver = createSprite(300,80);
  restart = createSprite(300,130);
       gameOver.addImage(gameOverImage);
    gameOver.scale = 0.5;
    restart.addImage(restartImage);
    restart.scale = 0.5;
}

function draw() {
  background(150)
  fill("purple")
  text("Score: "+ count, 450, 50);
   if (x==1) {
    text("highScore:"+highScore, 450, 0);
  }
  if(gameState === PLAY){
    restart.visible=false
    gameOver.visible=false
    if (World.frameCount % 4==0) {
      if (count % 100==0 && count>0) {
        //playSound("checkPoint.mp3", false);
        ground.velocityX = ground.velocityX-2;
      }
      count=count+1
    }
  if (keyDown ("space")&& trex.y>140){
    trex.velocityY=-10

  }
  trex.velocityY=trex.velocityY+0.8
  if (ground.x<0){
  ground.x=600
  }
  spawnClouds()
  spawnObstacles()
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      //playSound("die.mp3", false);
    }
  }
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    restart.visible=true
    gameOver.visible=true
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  
  trex.collide(iGround)
  drawSprites()
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,120,10,10)
    cloud.y = Math.round(random(80,120))
    cloud.addImage(cloudImage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    
    
    switch(rand){
      case 1:obstacle.addImage(ob1);
      break 
      case 2:obstacle.addImage(ob2);
      break 
      case 3:obstacle.addImage(ob3);
      break 
      case 4:obstacle.addImage(ob4);
      break 
      case 5:obstacle.addImage(ob5);
      break 
      case 6:obstacle.addImage(ob6);
      break 
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset() {
  gameState=PLAY
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
 ground.velocityX=-6
   trex.changeAnimation("Running");
  if (count>highScore) {
    highScore = count;
  }
   
  x = 1;

  count=0;
   
}
