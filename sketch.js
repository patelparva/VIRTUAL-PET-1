var dog, happyDog;
var dogImg, happyDogImg;
var database;
var foodS;
var foodStock;

var firebase = require("firebase/app");

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
  dog.scale = 0.25;
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
}
