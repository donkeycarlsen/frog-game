class SGDogHouse extends PIXI.Container {
    sprite = null;
    hover = null;
    constructor() {
        super();
        this.hover = new PIXI.Sprite(SGTextures.doghouseoutline);
        this.hover.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.hover.zIndex = 2;
        this.hover.alpha = 0;
        this.sprite = new PIXI.Sprite(SGTextures.doghouse);
        this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.addChild(this.sprite);
        this.sprite.addChild(this.hover);
        this.sprite.interactive = true;
        //this.sprite.click = (md) => { alert("bye")};
        this.sprite.mouseover = (md) => { this.hover.alpha = 1.0 };
        this.sprite.mouseout = (md) => { this.hover.alpha = 0.0; };
    }


}
