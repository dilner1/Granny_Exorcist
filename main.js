// Sets up the program (J5)
var cnv;
var granny;
var grannyImg;
var heartImg;
var monsterImg;
var monsterImgHit;
var font;
var monsters = [];
var hearts = [];

// code for the countdown timer
const timeH = document.querySelector('h3');
const numOfMonsters = 8;
var timeSpan = 20; // timer set to 20 secs

var timeOut = 0;

displayTime(timeSpan);

const countDown = setInterval(()=>{
    timeSpan--;
    displayTime(timeSpan);
    if (timeSpan <=0 ){
        timeUp()
        clearInterval(countDown);
    }
},1000);

function displayTime(second){
    let min = Math.floor(second / 60);
    let sec = Math.floor(second % 60);
    timeH.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function timeUp(){
    timeH.innerHTML = "<red>TIME OUT</red>";
    timeOut = 1;
}
// End of timer code

function preload() {
    grannyImg = loadImage('assets/images/granny.png');
    heartImg = loadImage('assets/images/heart_one.png');
    monsterImg = loadImage('assets/images/monster_one.png');
    font = loadFont('assets/PressStart2P-Regular.ttf');
}

function setup() {
    cnv = createCanvas(720, 450);
    cnv.parent('canvas');

    granny = new Granny();
  
    for (var i = 0; i < numOfMonsters; i++) {
        monsters[i] = new Monster(i * 80 + 80, 60);
    }
}

function draw() {
    background(51);
    granny.show();
    granny.move();

    for (var i = 0; i < hearts.length; i++) {
        hearts[i].show();
        hearts[i].move();
        for (var j = 0; j < monsters.length; j++) {
            if (hearts[i].hits(monsters[j])) {
            
                // calculating the score of granny and removing the dead monster
                
                if (timeOut != 1){
                    let score = monsters[j].change();
                    if (score == numOfMonsters){
                        document.getElementById('score').innerHTML = "GRANNY WINS";
                    }else{
                        document.getElementById('score').innerHTML = score;
                    }
                }
                
                monsters.splice(j, 1)

                // WIN SCREEN
                if (score === numOfMonsters) {
                    // alert(score);
                    for (var i = 0; i < hearts.length; i++) {
                        hearts[i].evaporate();
                    }
                    background(51, 51, 51);

                    fill(255);
                    textFont(font, 35);
                    textAlign(CENTER, CENTER);
                    text("Granny Wins!", width / 2, height / 2);
                    frameRate(0);
                }
                hearts[i].evaporate();
            }
        }
    }

    var edge = false;

    // Edge detection

    for (var i = 0; i < monsters.length; i++) {
        monsters[i].show();
        monsters[i].move();
        if (monsters[i].x > width || monsters[i].x < 0) {
            edge = true;
        }
    }

    if (edge) {
        for (var i = 0; i < monsters.length; i++) {
            monsters[i].shiftDown();
        }
    }

    for (var i = hearts.length - 1; i >= 0; i--) {
        if (hearts[i].toDelete) {
            hearts.splice(i, 1);
        }
    }
}
// Function for key releasing:
function keyReleased() {
    if (key != ' ') {
        granny.setDir(0);
    }
}

// Function for key pressing: 

function keyPressed() {
    if (key === ' ') {
        var heart = new Heart(granny.x, height);
        hearts.push(heart);
    }

    if (keyCode === RIGHT_ARROW) {
        granny.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        granny.setDir(-1);
    }
}