class SGPhysicsWorld {

    terrain = [];
    objects = [];

    static collision(rect1, rect2) {

    }

    addTerrain(body) {
        this.terrain.push(body);
    }

    addObject(body) {
        this.objects.push(body);
    }

    update() {
        this.objects.forEach((obj) => {
            this.terrain.forEach((terrain) => {
                obj.testCollision(terrain);
            })
        });
    }
}

class SGPhysicsSprite {
    position = null;
    x = 0;
    y = 0;
    constructor(pos) {
        this.position = pos;
        this.x = pos.x;
        this.y = pos.y;
    }
}

class SGPhysicsBody {
    size = null;
    sprite = null;
    offset = new PIXI.Point(0,0)
    solid = true;
    alertObj = (b) => {};

    constructor(sprit, size) {
        this.sprite = sprit;
        this.size = size;
    }

    realPoint() {
        return new PIXI.Point(this.offset.x + this.sprite.x, this.offset.y + this.sprite.y);
    }

    setOffset(off) {
        this.offset = off;
        return this;
    }

    rectOverlap(r) {
        var c = new PIXI.Point(0, 0);
        var p1 = this.realPoint();
        var p2 = r.realPoint();
        //> 0 means right side is in boundary, less than zero means before its before
        var rightside = p1.x + this.size.x - p2.x;
        //> 0 means left side is in the boundary, less than zero means past
        var leftside = p2.x + r.size.x - p1.x;
        //if (leftside > 0 && rightside > 0) { c.x = 1; if (leftside < rightside) {c.y = leftside} else {c.y = -rightside} }
        //> 0 means bottom is in, <0 above
        var bottom = p1.y + this.size.y - p2.y;
        //>0 means top is in, <0 below
        var top = p2.y + r.size.y - p1.y;


        c.y = Math.min(Math.min(rightside, leftside), Math.min(top, bottom));
        if (c.y < 0) { return c; }
        if (c.y == rightside) {c.x = 1;}
        if (c.y == leftside) {c.x = 2;}
        if (c.y == bottom) {c.x = 3;}
        if (c.y == top) {c.x = 4;}

        //var xol = (this.sprite.x + this.size.x > r.sprite.x && this.sprite.x < r.sprite.x + r.size.x);
        //var yol = (this.sprite.y + this.size.y > r.sprite.y && this.sprite.y < r.sprite.y + r.size.y);
        return c;//(rightside > 0 && leftside > 0) && (top > 0 && bottom > 0);
    }

    testCollision(body) {
        var collision = this.rectOverlap(body);
        if (collision.x != 0) {
            this.handleCollision(body, collision);
        }
    }

    handleCollision(body, collision) {
        if (this.solid === true && body.solid === true) {
            if (collision.x == 1) this.sprite.position.x -= collision.y;
            if (collision.x == 2) this.sprite.position.x += collision.y;
            if (collision.x == 3) this.sprite.position.y -= collision.y;
            if (collision.x == 4) this.sprite.position.y += collision.y;
        }

        if (collision.x != 0) { this.alertObj(body); body.alertObj(this); }
    }
}
