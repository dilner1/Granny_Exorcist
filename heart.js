// This is for the bullets (Called drops for the moment) etc whatever we want to shoot


function Heart(x, y, size) {
    this.x = x;
    this.y = y;
    this.r = 8;

    this.show = function() {
        noStroke();
        fill(255, 0, 0);
        heartShape(this.x, this.y, 20);
    }

    this.evaporate = function() {
        this.toDelete = true;
    };

    // r = radius ;-) 
    this.hits = function(monster) {
        var d = dist(this.x, this.y, monster.x, monster.y);
        if (d < this.r + monster.r) {
            return true;
        } else {
            return false;
        }
    };

    this.move = function() {
        this.y = this.y - 10; // Spacing for the bullets being shot.
    }
}

// this function creates Custom shapes (heart)
function heartShape(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}