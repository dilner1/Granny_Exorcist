// This is our spaceship etc whatever we want to fly
function Granny() {
    this.x = width / 2;
    this.xdir = 0;

    // this is what gives the ship its color, size
    this.show = function() {
        // fill(255); //White color
        // rectMode(CENTER);
        // rect(this.x, height-20, 20, 60); // Shape of "ship"
        image(grannyImg, this.x, height - 60, 35, 60);
    }

    this.setDir = function(dir) {
        this.xdir = dir;
    }

    this.move = function(dir) {
        this.x += this.xdir * 5; // Move by '5' pixels
    }
}