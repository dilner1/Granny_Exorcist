// This is for the bullets (Called drops for the moment) etc whatever we want to shoot

  
function Heart(x, y, size) {
    this.x = x;
    this.y = y;
    this.r = 8;

    this.show = function() {
        noStroke();
        fill(255, 0, 0);
        // ellipse(this.x, this.y, this.r * 1, this.r * 2);
        heartShape(this.x, this.y, 20);
        //image(heartImg, this.x, y - 20, 20, 20);
    }

    this.evaporate = function() {
        this.toDelete = true;
    };

    // r = radius ;-) 
    this.hits = function(flower) {
        var d = dist(this.x, this.y, flower.x, flower.y);
        if (d < this.r + flower.r) {
            return true;
        } else {
            return false;
        }
    };

    this.move = function() {
        this.y = this.y - 5; // Spacing for the bullets being shot.
    }
}

// new function added to create the flying heart
function heartShape(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}

