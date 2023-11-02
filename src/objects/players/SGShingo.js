class SGShingo extends PIXI.Container {

    sprite = null;

    main = null;

    midair = false;
    shadow;

    velocity = null;
    direction = "LEFT";

    dead = false;

    spriteYVel = 0;

    constructor() {
        super();
        this.sprite = new PIXI.AnimatedSprite(SGTextures.shingoSheet.animations["sprite-left"]);
        this.sprite.animationSpeed = 0.25;
        this.shadow = new PIXI.Sprite(SGTextures.shadow);
        this.addChild(this.sprite);
        this.addChild(this.shadow);
        this.shadow.scale.x = 0.0;
        this.shadow.scale.y = 0.0;
        this.shadow.alpha = 1.0;

        this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.Nearest;

        this.sprite.anchor.set(0.5, 1.0);
        this.shadow.anchor.set(0.5, 0.5);

        this.velocity = new PIXI.Point(0,0);

        this.sprite.scale.x = 0.4;
        this.sprite.scale.y = 0.4;
        this.main = new SGInput();
    }

    update(delta) {
        if (SGInput.keyDown("RIGHT")) {
            if (this.direction === "LEFT") {
                this.sprite.textures = SGTextures.shingoSheet.animations["sprite-right"];
                this.direction = "RIGHT";
            }
            this.velocity.x += .5;
            // this.sprite.texture = SGTextures.playerRight;
            this.sprite.play();
        }
        if (SGInput.keyDown("LEFT")) {
            if (this.direction === "RIGHT") {
                this.sprite.textures = SGTextures.shingoSheet.animations["sprite-left"];
                this.direction = "LEFT";
            }
            this.velocity.x -= .5;
            // this.sprite.texture = SGTextures.playerLeft;
            this.sprite.play();
        }
        if (SGInput.keyDown("UP")) {
            this.velocity.y -= .5;
            // this.sprite.texture = SGTextures.playerUp;
        }
        if (SGInput.keyDown("DOWN")) {
            this.velocity.y += .5;
            // this.sprite.texture = SGTextures.playerDown;
        }
        if (!SGInput.keyDown("LEFT") && !SGInput.keyDown("RIGHT")) {
            this.sprite.gotoAndStop(0);
        }
        this.sprite.animationSpeed = 0.25 * (this.velocity.x / 10);
        if (SGInput.keyDown("JUMP") && !this.midair) {
            this.jump();
        }
        this.velocity = SGMath.scalePoint(this.velocity, 0.9);

        if (this.dead) {
            this.sprite.anchor.set(0.5)
            this.sprite.position.x += 14;
            this.sprite.position.y += -3;
            this.sprite.scale.x += 0.05;
            this.sprite.scale.y += 0.05;
            this.sprite.rotation += 0.3;
        } else {
            this.position = SGMath.addPoints(this.position, this.velocity);

            this.shadow.scale.x = this.shadow.scale.y = this.sprite.position.y / -200.0;
            this.shadow.alpha = this.sprite.position.y / -100;

            this.sprite.position.y += this.spriteYVel;
            this.spriteYVel += 1;
            if (this.sprite.position.y >= 0) {
                this.sprite.position.y = 0;
                this.spriteYVel = 0;
                if (this.midair)
                    this.parent.parent.activeCamera.shakeScale = 10;
                this.midair = false;
            }
        }
    }

    contactWith(body) {
        if (body.sprite.name === "laser" && this.midair == false) {
            this.dead = true;
        }
    }

    jump() {
        this.midair = true;
        //this.parent.parent.runAction(new SGAction(1, 0.0, 2.0, this.shadow, 1, () => { this.midair = false; }));
        // this.parent.parent.runAction(new SGAction(0.2, 0.0, 0.2, this.shadow, 1, () => {
        //     this.parent.parent.runAction(new SGAction(0.2, 0.2, 0.0, this.shadow, 1, () => {
        //         this.midair = false;
        //     }));
        // }));
        this.spriteYVel = -10;
    }
}
