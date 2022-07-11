var dog, happyDog;
var dogImg, happyDogImg;
var database;
var foodS;
var foodStock;

function preload() {
  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(250, 250, 20, 20);
  dog.addImage("dog", dogImg);
  dog.addImage("happyDog", happyDogImg);
  dog.scale = 0.25;
}

function draw() {
  background(46, 139, 87);
  drawSprites();

  push();
  translate(-165, 0);
  textSize(16);
  fill("white");
  text("Note: Press UP_ARROW key to feed Draco milk!", 250, 20);
  pop();

  push();
  textSize(21);
  fill("white");
  text("Food Remaining : " + foodS, 160, 120);
  pop();

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.changeImage("happyDog");
  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(food_available) {
  if (food_available <= 0) {
    food_available = 0;
  } else {
    food_available = food_available - 1;
  }

  database.ref("/").update({
    Food: food_available,
  });
}
