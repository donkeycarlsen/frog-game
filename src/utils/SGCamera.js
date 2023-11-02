class SGCamera {

    target = null;
    move = null;

    percent = 1.0;

    lockX = false;
    lockY = false;

    offset = new PIXI.Point(0,0);
    curPos = new PIXI.Point(0,0);

    shakeScale = 0;
    shakeStabilize = 1;
    shake = new PIXI.Point(0,0);

    constructor() {

    }

    setZoom(scale) {
        if (this.move == null) {
            return;
        }
        this.move.scale.set(scale);
    }

    lockOn() {
        this.move.position.x = this.offset.x - (this.target.position.x);
        this.move.position.y = this.offset.y - (this.target.position.y);
    }

    goalPos() {
        return new PIXI.Point(- (this.target.x * this.move.scale.x), - (this.target.y * this.move.scale.y));
    }

    updateShake(delta) {
        this.shake.x = Math.random() * this.shakeScale;
        this.shake.y = Math.random() * this.shakeScale;

        if (this.shakeScale > 0) {
            this.shakeScale -= this.shakeStabilize;
            if (this.shakeScale < 0)
                this.shakeScale = 0
        }
    }


    update(delta) {
        if (this.target === null) return;
        if (this.move === null) return;

        this.updateShake(delta);

        var targ = this.goalPos();
        var dist = SGMath.dist(targ, this.curPos);
        var distx = targ.x - this.curPos.x;
        var disty = targ.y - this.curPos.y;

        var movement = new PIXI.Point(distx * this.percent, disty * this.percent);

        this.curPos.x += movement.x;
        this.curPos.y += movement.y;

        if (!this.lockX) this.move.position.x = this.offset.x + this.curPos.x + this.shake.x;
        if (!this.lockY) this.move.position.y = this.offset.y + this.curPos.y + this.shake.y;
    }


}
