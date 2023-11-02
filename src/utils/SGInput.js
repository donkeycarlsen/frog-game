class SGInput {

    static controls = {};
    static keysDown = {};

    keyPresses = {};

    constructor() {

        this.keyPresses = {
            "LEFT":false,
            "RIGHT":false,
            "UP":false,
            "DOWN":false,
            "JUMP":false
        }

    }

    keyPressed(name) {
        if (SGInput.keysDown[name]) {
            if (!this.keyPresses[name]) {
                this.keyPresses[name] = true;
                return true;
            }
        } else {
            this.keyPresses[name] = false;
        }
        return false;
    }

    keysPressed() {
        for (var k in SGInput.controls) {
            if (e.key === SGInput.controls[k]) {
                event.preventDefault();
                SGInput.keysDown[k] = true;
            }
        }
    }

    static keyDown(name) {
        return SGInput.keysDown[name];
    }

    static init() {
        SGInput.controls = {
            "LEFT":'a',
            "RIGHT":'d',
            "UP":'w',
            "DOWN":'s',
            "JUMP":' '
        }
        SGInput.keysDown = {
            "LEFT":false,
            "RIGHT":false,
            "UP":false,
            "DOWN":false,
            "JUMP":false
        }

        window.addEventListener("keydown", function(e) {
            for (var k in SGInput.controls) {
                if (e.key === SGInput.controls[k]) {
                    event.preventDefault();
                    SGInput.keysDown[k] = true;
                }
            }
        });

        window.addEventListener("keyup", function(e) {
            for (var k in SGInput.controls) {
                if (e.key === SGInput.controls[k]) {
                    event.preventDefault();
                    SGInput.keysDown[k] = false;
                }
            }
        });
    }
}
