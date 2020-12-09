var monkey, monkey_running, monkeyS;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var jungle, jungleImage;
var ground;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  monkeyS = loadAnimation("sprite_0.png");

}


function setup() {
  createCanvas(400, 400);
  jungle = createSprite(200, 200, 400, 20);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 0.8;

  monkey = createSprite(70, 330, 40, 40)
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.12;

  ground = createSprite(200, 360, 400, 10);

  score = 0;

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {

  background("white");
  
  if(gameState === PLAY){
    jungle.velocityX = -4;
    Banana();
  Obstacles();
  if (jungle.x < 0) {
    jungle.x = jungle.width / 3;
  }

  if (keyDown("space") && monkey.y >= 317.8) {
    monkey.velocityY = -15;
  }

  monkey.velocityY = monkey.velocityY + 0.8
  //monkey.debug=true;
  monkey.setCollider("circle", 0, 0, 300)
  }

  
  monkey.collide(ground);

  ground.visible = false;


  if (monkey.isTouching(foodGroup)) {
    score = score + 1;
    foodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    monkey.addAnimation("monk", monkeyS);
    monkey.changeAnimation("monk", monkeyS);
    obstacleGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0, 0);
    jungle.setVelocity(0,0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }


  drawSprites();
  
  if(gameState === END){
    fill("black");
    stroke("black");
    textSize(40);
    textFont("Times New Roman");
    text("GAME OVER", 90, 200)
  }

  fill("black");
  stroke("black");
  textSize(25);
  textFont("Times New Roman");
  text("Score: " + score, 160, 30);

  switch (score) {
    case 5:
      monkey.scale = 0.12;
      break;
    case 10:
      monkey.scale = 0.14;
      break;
    case 15:
      monkey.scale = 0.16;
      break;
    case 20:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }

}

function Banana() {
  if (frameCount % 120 === 0) {

    banana = createSprite(400, 180, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.y = random(140, 200);
    //banana.debug = true;
    banana.setCollider("circle", 0, 0, 250);
    foodGroup.add(banana);

  }
}

function Obstacles(){
  
  if(frameCount % 180 === 0){
    
    obstacle = createSprite(400, 340, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -8;
    obstacle.lifetime = 200;
    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 250);
    
    obstacleGroup.add(obstacle);
  }
  
}