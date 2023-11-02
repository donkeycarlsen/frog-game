class SGGameController {

    mainApp = null;

    constructor(app) {
        this.mainApp = app;
    }

    loadGameElements() {
        return new Promise((resolve, reject) => {
            SGInput.init();
            SGTextures.initialLoad().then(() => {
                PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
                this.mainApp.ticker.add((delta) => { this.update(delta); });
                resolve();
            });
        });
    }

    loadStage(stage) {
        stage.initializeElements();
        this.mainApp.stage = stage;
    }

    update(delta) {
        this.mainApp.stage.update(delta);
    }

}
