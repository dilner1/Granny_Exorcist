// Sets up the program (J5)
var cnv;
var granny;
var grannyImg;
var heartImg;
var monsterImg;
var monsterImgHit;
var flowers = [];
var hearts = [];

function preload() {
    grannyImg = loadImage('assets/images/granny.png');
    heartImg = loadImage('assets/images/heart_one.png');
    monsterImg = loadImage('assets/images/monster_one.png');
}

function setup() {
    cnv = createCanvas(600, 400);
    cnv.parent('canvas');

    granny = new Granny();
    // drop = new Drop(width/2, height/2);
    for (var i = 0; i < 6; i++) {
        flowers[i] = new Flower(i * 80 + 80, 60);
    }
}

function draw() {
    background(51);
    granny.show();
    granny.move();

    for (var i = 0; i < hearts.length; i++) {
        hearts[i].show();
        hearts[i].move();
        for (var j = 0; j < flowers.length; j++) {
            if (hearts[i].hits(flowers[j])) {
                //flowers[j].grow();
                // calculating the score of granny and removing the dead monster
                let score = flowers[j].change(); 
                flowers.splice(j, 1)
                if (score === 6){
                    // alert(score);
                    fill(255);
                    textSize(40);
                    textAlign(CENTER, CENTER)
                    text("Granny Wins!", width/2, height/2);
                } 
                
                hearts[i].evaporate();
            }
        }
    }

    var edge = false;

    // Edge detection

    for (var i = 0; i < flowers.length; i++) {
        flowers[i].show();
        flowers[i].move();
        if (flowers[i].x > width || flowers[i].x < 0) {
            edge = true;
        }
    }

    if (edge) {
        for (var i = 0; i < flowers.length; i++) {
            flowers[i].shiftDown();
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