//Create variables here
var dog;
var food;
var Food;
function preload()
{
  //load images here
  dogIMG = loadImage("dogImg.png");
  happydogIMG = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  dog = createSprite(650,500,10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  food = database.ref('food');
  food.on("value",readstock);

  Food = 20;
}


function draw() {  
background("teal");
  drawSprites();
  //add styles here

textSize(20);
fill("black");
text("food remaining:" + Food,400,dog.y - 50);

text("NOTE: 'press[UP_ARROW]to feed drago",300,100);
text("NOTE: 'press[space]to fill your foodstock",280,200);

if(Food === 0){
textSize(30);
fill(255,0,0);
text("you have no food",300,700);
}

}

function keyPressed(){
if(keyCode === UP_ARROW && Food > 0)
Food -= 1,
console.log(Food),
writeStock(Food),
dog.addImage(happydogIMG);


if(keyCode !== UP_ARROW){
dog.addImage(dogIMG);
}

if(keyCode === 32){
  database.ref('/').update({
  food: 20
  });
  Food = 20;
}

}


function readstock(data){
Food = data.val();
}

function writeStock(number){
database.ref('/').update({
food: number
})
}
