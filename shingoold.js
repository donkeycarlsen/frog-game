PIXI.utils.sayHello();

var renderer = PIXI.autoDetectRenderer(512, 512, {
    transperent: true,
    resolution: 1
});
document.getElementById("display").appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.Loader.shared
    .add("Shingo", "https://i.imgur.com/b0onPwU.png")
    .load(setup);

var shingo;

function setup() {
    stage.interactive = true;

    shingo = new PIXI.Sprite(
        PIXI.Loader.shared.resources["Shingo"].texture
    );

    shingo.interactive = true;

    shingo.scale.set(0.5, 0.5);
    shingo.x = renderer.width / 2;
    shingo.y = renderer.height / 2;
    shingo.anchor.set(0.5, 0.5);

    shingo.click = function() {
        shingo.scale.x -= 0.1;
    }

    stage.addChild(shingo);

    animationLoop();
}

function animationLoop() {
    requestAnimationFrame(animationLoop);

    shingo.rotation += 0.01;

    renderer.render(stage);
}

window.addEventListener("keydown", function(event) {
    event.preventDefault();
    shingo.x += 3;
});
