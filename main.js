// Sets up the program (J5)
var cnv;
var granny;
var grannyImg;
var heartImg;
var flowers = [];
var drops = [];

function preload() {
    grannyImg = loadImage('assets/images/granny.png');
    heartImg = loadImage('assets/images/heart_one.png')
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


    for (var i = 0; i < drops.length; i++) {
        drops[i].show();
        drops[i].move();
        for (var j = 0; j < flowers.length; j++) {
            if (drops[i].hits(flowers[j])) {
                flowers[j].grow();
                drops[i].evaporate();
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

    for (var i = drops.length - 1; i >= 0; i--) {
        if (drops[i].toDelete) {
            drops.splice(i, 1);
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
        var drop = new Drop(granny.x, height);
        drops.push(drop);
    }

    if (keyCode === RIGHT_ARROW) {
        granny.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        granny.setDir(-1);
    }
}