// These are our aliens (called flowers here) etc whatever we want to attack
var score = 0;

function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;

    this.xdir = 1;

    // This is what happens when a bullet hits a ship.     
    // this.grow = function() {
    //     this.r = this.r + 2;
    // }

    // this is what happens when the heart hits a monster
    this.change = function() {
        //image(heartImg, this.x, this.y, 50, 50);
        return (++score);
    }

    this.shiftDown = function() {
        this.xdir *= -1.25;
        this.y += this.r;
    }

    this.move = function() {
        this.x = this.x + this.xdir;
    }

    this.show = function() {
        noStroke();
        fill(255, 0, 200, 150);
        rectMode(CENTER);
        //ellipse(this.x, this.y, this.r*2, this.r*2);

        image(monsterImg, this.x, this.y, 50, 50)
    }
}