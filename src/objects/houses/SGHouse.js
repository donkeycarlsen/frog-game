class SGHouse extends PIXI.Container {

    sprite = null;

    constructor() {
        super();
        this.sprite = new PIXI.Sprite(SGTextures.house);
        this.addChild(this.sprite);
    }

    

}
