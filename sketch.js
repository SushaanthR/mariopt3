var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;

localStorage["HighestScore"] = 0;

var mario, obstacle, obstacle; 
var obstacleImg, marioImg, bg, cloudImage;
var ground, cloud;

 function preload(){
   obstacleImg = loadImage("Images/banana.png");
   marioImg = loadAnimation("Images/running.png" , "Images/running2.png", "Images/running3.png");
   //shellImg = loadImage("Images/shell.png");
   dedImg= loadImage("Images/running.png");
   bg = loadImage("Images/mariobg.jpg");
   cloudImage = loadImage("Images/cloud.png");
  
   
 }

 function setup(){
   createCanvas(1920,950);

   mario = createSprite(100,820,40,20);
   mario.addAnimation("running", marioImg);
   mario.scale=0.15;


   ground = createSprite(400,830,1920,20)
   ground.velocityX = -(6 + 3*score/100);
   ground.x = ground.width/2;
   ground.visible=false;

   cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score=0;

}
function draw(){
   background(0);
   background(bg);
   

  

   
   if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/58);
    ground.velocityX = -(6 + 3*score/100);
   if(ground.x<0){
     ground.x = ground.width/2;
   }

  


   if(keyDown("space") && mario.y >= 745) {
    mario.velocityY = -20;
  }

   mario.velocityY= mario.velocityY+0.8;

   mario.collide(ground);

   if(obstaclesGroup.isTouching(mario)){
    gameState === END 
      
     
      //set velcity of each game object to 0
      ground.velocityX = 0;
      mario.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0); 
      
     
      //change the trex animation
      mario.changeImage("running.png",dedImg);
     
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(1);
      cloudsGroup.setLifetimeEach(1);
}

   
   spawnClouds();
   spawnobstacle();
   drawSprites();
   textSize(25);
   fill("red");
   text("Score: "+ score, 1600,50);
 }
 
 function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 140 === 0) {
    var cloud = createSprite(1800,120,40,10);
    cloud.y = Math.round(random(80,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -2;
   
     //assign lifetime to the variable
    cloud.lifetime = 800;
   
    //adjust the depth
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1;
   
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    obstacle = createSprite(1800,800,40,10);
    //obstacle.y = Math.round(random(750,820));
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.25;
    obstacle.velocityX = -6;
   
     //assign lifetime to the variable
    obstacle.lifetime = 800;
    obstaclesGroup.add(obstacle);
}}}