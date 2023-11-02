class SGTiledFloor extends PIXI.TilingSprite {

    constructor(tile, texSize, texCount) {
        super(tile, texCount.x, texCount.y);
        this.tileScale = texSize;
        this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    }

}
