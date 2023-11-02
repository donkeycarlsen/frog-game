class SGTextures {
    static tile = null;
    static shadow = null;
    static shingoOG = null;

    static playerLeft = null;
    static playerRight = null;
    static playerUp = null;
    static playerDown = null;

    static grass = null;
    static grass2 = null;

    static laser = null;

    static initialLoad() {
        return new Promise((resolve, reject) => {
            PIXI.Loader.shared
            .add("src/res/img/shingo/shingo.json")
            .load(() => {
                SGTextures.shingoOG = PIXI.Texture.from('src/res/img/Shingo.png');
                SGTextures.shadow = PIXI.Texture.from('src/res/img/shadow.png');
                SGTextures.tile = PIXI.Texture.from('src/res/img/tile.png');

                SGTextures.playerLeft = PIXI.Texture.from('src/res/img/shingo2.png');
                SGTextures.playerRight = PIXI.Texture.from('src/res/img/shingo3.png');
                SGTextures.playerDown = PIXI.Texture.from('src/res/img/shingo4.png');
                SGTextures.playerUp = PIXI.Texture.from('src/res/img/shingo5.png');

                SGTextures.grass = PIXI.Texture.from('src/res/img/grass1.png');
                SGTextures.grass2 = PIXI.Texture.from('src/res/img/grass2.png');

                SGTextures.laser = PIXI.Texture.from('src/res/img/LASER.png');

                SGTextures.shingoSheet = PIXI.Loader.shared.resources["src/res/img/shingo/shingo.json"].spritesheet;

                SGTextures.house = PIXI.Texture.from('src/res/img/house/house.png');
                SGTextures.doghouse = PIXI.Texture.from('src/res/img/doghouse/doghouse.png');

                resolve();
            });
        });
    }
}
