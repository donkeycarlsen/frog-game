class SGFirstYard extends SGStage {

    shingo = null;

    main = new SGInput();

    yard = null;
    tw = null;

    constructor (app) {
        super(app);
    }

    initializeElements() {
        super.initializeElements();

        this.shingo = new SGShingo();
        this.house = new SGHouse();
        this.doghouse = new SGDogHouse();
        this.yard = new SGTiledFloor(SGTextures.grass, new PIXI.Point(4, 4), new PIXI.Point(64 * 14, 64 * 14));
        var backyard = new SGTiledFloor(SGTextures.grass2, new PIXI.Point(4, 4), new PIXI.Point(64 * 64, 64 * 64));
        backyard.zIndex = -3;
        this.world.addChild(backyard);
        this.yard.zIndex = -2;

        this.yard.position.set(-32, -64 * 6);
        backyard.position.set(-32 - (64 * 16), -64 * 16)

        this.world.addChild(this.house);
        this.world.addChild(this.shingo);
        this.world.addChild(this.yard);
        this.world.addChild(this.doghouse);

        this.doghouse.position = new PIXI.Point(64 * 8, -64 * 7);
        this.doghouse.scale.set(.5);

        this.shingo.position.set(400, 460);

        this.house.position.x = 100;
        this.house.position.y = 10;
        this.house.scale.set(.7);
        this.house.zIndex = this.zpos(this.house.y + 146);
        this.doghouse.zIndex = this.zpos(this.doghouse.y + 64);

        this.activeCamera.target = this.shingo;
        this.activeCamera.lockOn();

        this.tw = new SGTripWire();
        this.tw.position = new PIXI.Point(-32,300);
        this.world.addChild(this.tw);
        this.physicsWorld.addTerrain(this.tw.physicsBody);

        this.physicsWorld.addTerrain(new SGPhysicsBody(this.doghouse, new PIXI.Point(128-16,128-30)).setOffset(new PIXI.Point(8,30)));
        this.physicsWorld.addTerrain(new SGPhysicsBody(this.house, new PIXI.Point(493, 146-30)).setOffset(new PIXI.Point(0,30)));
        var sbody = new SGPhysicsBody(this.shingo, new PIXI.Point(.2*128, .2*128)).setOffset(new PIXI.Point(-0.1*128,-.2*128));
        sbody.alertObj =  (b) => {this.shingo.contactWith(b);};
        this.physicsWorld.addObject(sbody);

        this.physicsWorld.addTerrain(new SGPhysicsBody(new SGPhysicsSprite(new PIXI.Point(-64,-64 * 6)), new PIXI.Point(32,64*14)))
        this.physicsWorld.addTerrain(new SGPhysicsBody(new SGPhysicsSprite(new PIXI.Point(-32 + (64 * 14),-64 * 6)), new PIXI.Point(32,64*14)))
        this.physicsWorld.addTerrain(new SGPhysicsBody(new SGPhysicsSprite(new PIXI.Point(-64, -64 * 6 - 32)), new PIXI.Point(64*14 + 64, 32)))
        this.physicsWorld.addTerrain(new SGPhysicsBody(new SGPhysicsSprite(new PIXI.Point(-64,64 * 8)), new PIXI.Point(64*14 + 64,32)))

        this.activeCamera.setZoom(0.25);
        //this.activeCamera.shakeScale = 2;
        this.runAction(new SGAction(5.0, 0.25, 1.0, (val) => { this.activeCamera.setZoom(val) }, null).formula(3));
    }

    zpos(ypos) {
        //higher y, higher z;
        return (ypos/100) + 2;
    }

    update(delta) {

        this.shingo.update();
        this.tw.update();
        this.shingo.zIndex = this.zpos(this.shingo.y);
        //console.log(this.shingo.zIndex - this.house.zIndex);

        super.update(delta);
        super.updateFinal(delta);
    }
}
