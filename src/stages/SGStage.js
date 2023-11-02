class SGStage extends PIXI.Container {

    parentApp = null;

    //Every stage will have a GUI Layer and a world layer, and a camera, which acts on the world by default
    world = null;
    gui = null;
    activeCamera = null;

    physicsWorld = null;

    name = "stage";

    actions = [];

    constructor(app) {
        super();
        this.actions = [];
        this.parentApp = app;
    }

    initializeElements() {
        this.activeCamera = new SGCamera();
        this.gui = new PIXI.Container();
        this.world = new PIXI.Container();
        this.addChild(this.gui);
        this.addChild(this.world);
        this.world.sortableChildren = true;
        this.gui.sortableChildren = true;
        this.sortableChildren = true;
        this.gui.zIndex = 1000;
        this.physicsWorld = new SGPhysicsWorld();

        this.activeCamera.move = this.world;
        this.activeCamera.offset = new PIXI.Point(this.parentApp.view.width / 2, this.parentApp.view.height / 2);
    }

    runAction(a) {
        this.actions.push(a);
        a.start();
    }

    update(delta) {
        this.physicsWorld.update();

        for(var i = this.actions.length -1; i >= 0 ; i--){
            if(this.actions[i].update(delta) == 1){
                this.actions.splice(i, 1);
            }
        }
    }

    updateFinal(delta) {
        this.activeCamera.update();
    }
}
