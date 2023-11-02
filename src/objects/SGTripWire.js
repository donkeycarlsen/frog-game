class SGTripWire extends PIXI.Container {

    physicsBody = null;

    sprit = null;

    name = "laser";

    activated = false;

    constructor() {
        super();
        this.physicsBody = new SGPhysicsBody(this, new PIXI.Point(64 * 14, 8)).setOffset(new PIXI.Point(0,8))
        this.physicsBody.solid = false;
        this.physicsBody.alertObj = (b) => { this.contactWith(b); };

        this.sprit = new PIXI.TilingSprite(SGTextures.laser, 64 * 14, 32);
        this.sprit.tileScale.set(4, 4);
        this.sprit.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.sprit.alpha = 0;
        this.sprit.scale.set(1.0,0);

        this.addChild(this.sprit);
    }

    update(delta) {
        this.sprit.tilePosition.x += 14;

        if (this.activated) {
            this.sprit.alpha = Math.min(this.sprit.alpha + 0.1, 1.0);
            this.sprit.scale.y = Math.min(this.sprit.scale.y + 0.1, 1.0);
        }
    }

    fire() {
        if (this.activated)
            return;
        this.activated = true;
    }

    contactWith(body) {
        if (body.sprite.midair === false)
            this.fire();
    }

}
