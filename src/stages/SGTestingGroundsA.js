class SGTestingGroundsA extends SGStage {

    texture = null;
    tiletex = null;

    shingo = null;

    vel = 0;
    vely = 0;
    floor = 0;

    main = new SGInput();

    constructor (app) {
        super(app);
    }

    initializeElements() {
        alert("byeeee");

        super.initializeElements();

        this.texture = PIXI.Texture.from('https://i.imgur.com/b0onPwU.png');
        this.tiletex = PIXI.Texture.from('https://i.imgur.com/LbmELve.png');

        this.shingo = new PIXI.Sprite(this.texture);

        this.vel = 0;
        this.vely = 0;
        this.floor = 0;

        for (var i = 0; i < 20; i++) {
            for (var y = 0; y < 4; y++) {
                const tile = new PIXI.Sprite(this.tiletex);
                tile.x = 64 * i;
                tile.y = 64 * y + 29;
                this.world.addChild(tile);
            }
        }

        // Create a new texture
        this.shingo.anchor.set(0.5, 0.5);
        this.shingo.zIndex = -10;
        //world.addChild(shingo);
        this.shingo.interactive = true;
        this.shingo.click = function() {
            this.shingo.scale.x += 0.1;
            this.shingo.scale.y += 0.1;
        }

        this.world.addChild(this.shingo);

        this.activeCamera.target = this.shingo;
        // Move world to the center
        this.world.x = this.parentApp.screen.width / 2;
        this.world.y = this.parentApp.screen.height / 2;
        this.floor = this.shingo.y = 0;

        this.activeCamera.lockOn();
        this.activeCamera.lockY = true;

        // Center shingo sprite in local world coordinates
        //world.pivot.x = world.width / 2;
        //world.pivot.y = world.height / 2;
    }

    update(delta) {

        if (this.main.keyPressed("JUMP")) {
            if (this.shingo.y === this.floor) {
                this.vely = -20;
            }
        }

        if (SGInput.keyDown("RIGHT")) {
            this.vel += 1;
        }
        if (SGInput.keyDown("LEFT")) {
            this.vel -= 1;
        }

        if (this.vel > 0)
            this.vel -= 0.1;
        if (this.vel < 0)
            this.vel += 0.1;
        if (this.vel > 5)
            this.vel = 5;
        if (this.vel < -5)
            this.vel = -5;
        if (this.shingo.y > this.floor && this.vely > 0) {
            this.shingo.y = this.floor;
            this.vely = 0;
        }
        if (this.shingo.y != this.floor)
            this.vely += 1

        if (this.shingo != null) {
            this.shingo.rotation = - this.vel / 10;
            this.shingo.x += this.vel;
            this.shingo.y += this.vely;
            if (this.shingo.y > this.floor)
                this.shingo.y = this.floor;
        } else {
            alert("no");
        }

        super.update(delta);
    }
}
