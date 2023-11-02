const app = new PIXI.Application({
    width: 1280, height: 720, backgroundColor: 0x097D0F, resolution: 1,
});
app.stage.sortableChildren = true;
document.body.appendChild(app.view);
const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
sprite.width = 100;
sprite.height = 100;
sprite.x = 0;
sprite.y = 0;
sprite.zIndex = 3;
app.stage.addChild(sprite);
var x = 255
class box {
    sprite = null
    spriteToFollow = null
  constructor(color) {
this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
this.sprite.tint = color
this.sprite.width = 100;
this.sprite.height = 100;
this.sprite.x = 0;
this.sprite.y = 0;
this.sprite.zIndex = 3;
app.stage.addChild(this.sprite);
 }
 update(delta){
     if(this.spriteToFollow == null) return
  this.sprite.x -= (this.sprite.x - this.spriteToFollow.x) * 0.6;
  this.sprite.y -= (this.sprite.y - this.spriteToFollow.y) * 0.6;
 }
 }
var myBox = new box((256 * 256 * x) + (256 * x) + x);
myBox.spriteToFollow = sprite;
var boxes = [myBox];
for (var i = 1; i < 253; i++) {
    var x = 254 - i;
    var myBox = new box(256 * 256 * x + 256 * x + x);
    myBox.spriteToFollow = boxes[i - 1].sprite;
    myBox.sprite.zIndex = x - 1
    boxes.push(myBox);
  }
var movingRight = false;
var movingLeft = false;
var movingUp = false;
var movingDown = false;
window.addEventListener("keydown", function(e) {
   if (e.key == "ArrowRight"){movingRight = true}
   if (e.key == "ArrowLeft"){movingLeft = true}
   if (e.key == "ArrowUp"){movingUp = true}
   if (e.key == "ArrowDown"){movingDown = true}
})
window.addEventListener("keyup", function(e) {
    if (e.key == "ArrowRight"){movingRight = false}
    if (e.key == "ArrowLeft"){movingLeft = false}
    if (e.key == "ArrowUp"){movingUp = false}
    if (e.key == "ArrowDown"){movingDown = false}
});
app.ticker.add((delta) => {
    if (movingRight) {sprite.x += delta * 6}
    if (movingLeft) {sprite.x -= delta * 6}
    if (movingUp) {sprite.y -= delta * 6}
    if (movingDown) {sprite.y += delta * 6}
    for(var b in boxes){
        boxes[b].update(delta)
    }
  });
