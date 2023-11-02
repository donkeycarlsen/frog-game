class SGMath {

    static memer() {
        alert("bye");
    }

    static dist(x1, x2, y1, y2) {
        return Math.sqrt( (y2-y1)*(y2-y1) + (x2-x1)*(x2-x1) );
    }

    static dist(p1, p2) {
        return Math.sqrt( (p2.y-p1.y)*(p2.y-p1.y) + (p2.x-p1.x)*(p2.x-p1.x) );
    }

    static addPoints(p1, p2) {
        return new PIXI.Point(p1.x + p2.x, p1.y + p2.y);
    }

    static scalePoint(p, scalar) {
        return new PIXI.Point(p.x * scalar, p.y * scalar);
    }

}
