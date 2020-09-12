//creating the global variables
var bananaImage, obstacleImage, obstacleGroup, backImage; 
var foodGroup, rock; 
var player_running, score, backdrop, banana, ground, player;

function preload() {
  //loading the image for the background
  backImage = loadImage("jungle.jpg");

  //loading the animations for the monkey
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  //loading the image for the bananas
  bananaImage = loadImage("banana.png");

  //loading the image for the obstacles
  obstacleImage = loadImage("stone.png");
}

function setup() {
  //creating the canvas
  createCanvas(600, 400);
  
  //animating the background and looping it
  backdrop = createSprite(200, 200);
  backdrop.addImage(backImage);
  backdrop.scale = 1.2;
  backdrop.velocityX = -4;
  
  //creating the ground and making it invisible
  ground = createSprite(200, 400, 400, 20);
  ground.visible = false;
  
  //creating the player and adding the animation
  player = createSprite(50, 380, 20, 20);
  player.addAnimation("running", player_running);
  player.scale = 0.1
  
  //creating the groups for the food and obstacles
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  //creating the background
  background("white");

  //looping the backdrop
  if(backdrop.x<0) {
    backdrop.x = backdrop.width/2;
  }

  //making the player collide with the ground
  player.collide(ground);
  
  //making the player jump
  if(keyDown("space")){
      player.velocityY = -12 ;
  }
  
  //adding gravity
  player.velocityY = player.velocityY + 0.8;
 
  //calling the banana function
  spawnBanana();
  
  //calling the obstacle function
  spawnObstacle();
   
  //increasing the score if the player touches a banana
  if(foodGroup.isTouching(player)) {
     score = score +2;
    foodGroup.destroyEach();
  }
  
  //increasing the player size when they touch bananas
  switch(score) {
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;  
      default: break;
  }
  
  //resetting the size if the player touches a rock
  if(obstacleGroup.isTouching(player)) {
    player.scale = 0.1
    score = 0;
  }
  
  //drawing the sprites
  drawSprites();
  
  //writing the score
  stroke("white");
  fill("white");
  textSize(20);
  text("score: " + score, 500, 50);
}

//creating the function to make bananas
function spawnBanana() {
  if(frameCount % 150 === 0) {
    var banana = createSprite(600, 380);
    banana.addImage(bananaImage);
    banana.scale = 0.05
    
    banana.velocityX = -4;
    
    banana.lifetime = 150;
    foodGroup.add(banana);
  }
}

//creating the function to spawn rocks
function spawnObstacle() {
  if(frameCount % 120 === 0) {
    var rock = createSprite(600, 380);
    rock.addImage(obstacleImage);
    rock.scale = 0.1
    rock.velocityX = -4;
    
    rock.lifetime = 150;
    obstacleGroup.add(rock);
  }
}