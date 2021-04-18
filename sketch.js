var bg, bgImg, bgMusic;

var movementValx = 80;

var movementValy = 20;

var ground;

var gameState = 1;

var bluePlayer, bluePlayerImg, bluePlayerAnimation;

var brick, brickImg;

var obstaclesGroup, bomb1, bomb2, bomb3, bomb4, bombImg, explosionSound, explodedBombImg;
var flag, flagImg;

var nextLevelSound, deathSound;
var levelText;

var gameTitle, gameTitleImg;

var levelNumber = 1;

var levelUpSprite,levelUpImg;

var jumpPower = -20;

function preload() {

    bgImage = loadImage("bg_image.png");

    bluePlayerImg = loadAnimation("blue_team.png");

    bluePlayerAnimation = loadAnimation("blue_team_walking1.png",
     "blue_team_walking2.png", "blue_team_walking3.png", "blue_team_walking4.png");

    bombImg = loadImage("bomb_exploding.png");
    explodedBombImg = loadImage("explosion.png");
    
    flagImg = loadImage("blue_flag.png");

    brickImg = loadImage("wall_brick.png");

    nextLevelSound = loadSound("sound_victory.m4a");

    levelUpImg = loadImage("levelUpdude.png");

    deathSound = loadSound("sound_lose.m4a");

    explosionSound = loadSound("sound_explosion.wav");

    bgMusic = loadSound("BG_music.m4a");
}

function setup() {
    createCanvas(windowWidth,windowHeight-10);

    obstaclesGroup = createGroup();

    bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    bg.addImage(bgImage);
    bg.scale = 1.4;
    bg.velocityX = -5;

    bluePlayer = createSprite(150,windowHeight-250);
    bluePlayer.addAnimation("standing",bluePlayerImg);
    bluePlayer.addAnimation("walking",bluePlayerAnimation);
    bluePlayer.scale = 1.5;

    ground = createSprite(windowWidth/2, windowHeight, windowWidth,25);
    ground.visible = false;

    brick = createSprite(150,windowHeight-85);
    brick.addImage(brickImg);

    flag = createSprite(windowWidth-200,200);
    flag.addImage(flagImg);

    levelUpSprite = createSprite(1000000,1000000);
    levelUpSprite.addImage(levelUpImg);
    levelUpSprite.scale = 0.25;

    bomb1 = createSprite(100000,100000);
    bomb1.addImage(bombImg);
    bomb2 = createSprite(100000,100000);
    bomb2.addImage(bombImg);
    bomb3 = createSprite(100000,100000);
    bomb3.addImage(bombImg);
    bomb4 = createSprite(100000,100000);
    bomb4.addImage(bombImg);
}


function draw(){

   // bgMusic.play();

bluePlayer.velocityY = bluePlayer.velocityY + 2;

//bluePlayer.collide(ground);

//bluePlayer.collide(brick);

if(bg.x <-20){
    bg.x = windowWidth/2;
}

if(keyDown(RIGHT_ARROW)){
    bluePlayer.x = bluePlayer.x + 5;
    bluePlayer.changeAnimation("walking",bluePlayerAnimation);
}

else if (keyDown(LEFT_ARROW)){
    bluePlayer.x = bluePlayer.x - 5;
    bluePlayer.changeAnimation("walking",bluePlayerAnimation);
}  else {
    bluePlayer.changeAnimation("standing",bluePlayerImg);
 }

if(bluePlayer.collide(brick) && keyDown("SPACE")) {
   bluePlayer.velocityY = jumpPower;
brick.x = brick.x + movementValx;
brick.y = brick.y - movementValy;
}

if(bluePlayer.collide(ground)){
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
}

if(bluePlayer.isTouching(flag) && gameState === 1){
    gameState = 2;
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    nextLevelSound.play();

    movementValx += 10;
    movementValy +=20;
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);

    bluePlayer.depth = levelUpSprite.depth;
    bluePlayer.depth = bluePlayer.depth + 1;
  }

  if(bluePlayer.isTouching(flag) && gameState === 2){
    gameState = 3;
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    nextLevelSound.play();

  //  console.log(gameState);
    bomb1.x = windowWidth;
    bomb1.y = bluePlayer.y - 25;
    bomb1.velocityX = -2;
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 100;
    bomb2.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 175;
    bomb3.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 250;
    bomb4.velocityX = -2;

    jumpPower = -50;
    movementValx = 100;
    movementValy = 0;
}

if(bluePlayer.collide(bomb1) || bluePlayer.collide(bomb2) || bluePlayer.collide(bomb3) || bluePlayer.collide(bomb4)){
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    deathSound.play();
    explosionSound.play();
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);
  //  console.log(gameState);
    bomb1.x = windowWidth;
    bomb1.y = bluePlayer.y - 25;
    bomb1.velocityX = -2;
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 100;
    bomb2.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 175;
    bomb3.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 250;
    bomb4.velocityX = -2;
    bluePlayer.velocityX = 0;
}


//console.log(bluePlayer.y);
    drawSprites();
}
