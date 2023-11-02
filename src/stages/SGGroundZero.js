class SGGroundZero extends SGStage {

    shingo = null;

    main = new SGInput();

    constructor (app) {
        super(app);
    }

    initializeElements() {
        super.initializeElements();

        this.shingo = new SGShingo();
        this.house = new SGHouse();
        this.doghouse = new SGDogHouse();

        for (var i = 0; i < 20; i++) {
            for (var y = 0; y < 4; y++) {
                const tile = new PIXI.Sprite(SGTextures.tile);
                tile.x = 64 * i;
                tile.y = 64 * y + 29;
                this.world.addChild(tile);
            }
        }

        this.world.addChild(this.house);
        this.world.addChild(this.doghouse);
        this.world.addChild(this.shingo);
        this.shingo.position = this.activeCamera.offset;
        this.house.position.x = 100;
        this.house.position.y = 10;
        this.doghouse.position = new PIXI.Point(-100, -200);
        this.house.scale.set(.7);
        this.doghouse.scale.set(.4);

        this.activeCamera.target = this.shingo;
        this.activeCamera.lockOn();
    }

    update(delta) {

        this.shingo.update();


        super.update(delta);
    }
}
