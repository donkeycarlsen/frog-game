const app = new PIXI.Application({
    width: 1280, height: 720, backgroundColor: 0x42A1F5, resolution: 1
})
document.body.appendChild(app.view)



var title = document.getElementById("display")
title.innerHTML = "Frog Game"
title.style.color = "#009600"
title.style.position = "absolute"
title.style.top = "10px"


const level = new PIXI.Container(PIXI.Texture.WHITE)
   level.x = 0
   level.y = 0
   level.width = 500
   level.height = 500
   app.stage.addChild(level)


// const bg = PIXI.Texture.from('src/assets/bg.png')
// const bgg = new PIXI.Sprite(bg)
//     bgg.width = 1280
//     bgg.height = 720
//     bgg.x = 0
//     bgg.y = 0
//     level.addChild(bgg)

const terrain = new PIXI.Container(PIXI.Texture.WHITE)
   terrain.x = 0
   terrain.y = 0
   terrain.width = 500
   terrain.height = 500
   level.addChild(terrain)





// const realassfrog = PIXI.Texture.from('src/assets/frog.png');

// const frog = new PIXI.Sprite(realassfrog)
// frog.width = 50
// frog.height = 50
// frog.x = 50
// frog.y = 670
// level.addChild(frog)

const frog = new PIXI.Sprite(PIXI.Texture.WHITE)
frog.tint = 0x009600
frog.width = 50
frog.height = 50
frog.x = 50     // 50
frog.y = 670    // 670
level.addChild(frog)



var timer = Date.now()
const timerdisplay = new PIXI.Text((Date.now()-timer)/1000,{
fontFamily: 'Helvetica',
fill: 0xffffff,

})
app.stage.addChild(timerdisplay)



var movingRight = false
var movingLeft = false
var movingUp = false
var timejumped = 0


var accelX = 0
var accelY = -20
var speedX = 0
var speedY = 0



var makeblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const block = new PIXI.Sprite(PIXI.Texture.WHITE)
    block.x = bx
    block.y = by
    block.width = bw
    block.height = bh
    block.tint = bc
    terrain.addChild(block)

    blox.push(block)
}

var keyblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const kblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    kblock.x = bx
    kblock.y = by
    kblock.width = bw
    kblock.height = bh
    kblock.tint = bc
    terrain.addChild(kblock)

    kox.push(kblock)
}

var doorblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF,keyindex)=>{
    const dblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    dblock.x = bx
    dblock.y = by
    dblock.width = bw
    dblock.height = bh
    dblock.tint = bc
    dblock.key = keyindex
    terrain.addChild(dblock)

    dox.push(dblock)
}

var spikeblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const sblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    sblock.x = bx
    sblock.y = by
    sblock.width = bw
    sblock.height = bh
    sblock.tint = bc
    terrain.addChild(sblock)

    sox.push(sblock)
}

var blox = []
var kox = []
var dox = []
var sox = []

//bonkey level
// makeblock(500-80*2,640,80,80,0xC1FF00)
// makeblock(500-80,640-80,80,80*2,0xC1FF00)
// makeblock(500,640-80*2,80,80*3,0xC1FF00)
// makeblock(500+80,640-80*3,80,80*4,0xC1FF00)
// makeblock(500+2*80,640-80*4,80,80*5,0xC1FF00)
// makeblock(500+3*80,640-80*5,80,80*6,0xC1FF00)
// makeblock(500-80*3,640-80*2)
// makeblock(500-80*2,640-80*3)
// makeblock(500-80,640-80*4)
// makeblock(500,640-80*5)
// makeblock(500+80,640-80*6)

//level 1
// makeblock(-70,30,80,640,0x534444)
// makeblock(-80,0,80,720,0x534444)
// makeblock(1280-12,0,80,720,0x534444)
// makeblock(0,30,120,12,0x534444)
// makeblock(120,0,12,42,0x534444)
// makeblock(120,0,1280-120,12,0x534444)
// makeblock(480,640,100,80,0x534444)
// makeblock(500+80,640-80,80,80*2,0x534444)
// makeblock(500+80*2,640,100,80,0x534444)
// makeblock(500+80*6,640-80,80,30,0x534444)
// makeblock(500+80*2,640-80*3,80*5,30,0x534444)
// makeblock(500+80*1,640-80*4,80,110,0x534444)
// makeblock(500+80*1,640-80*6.9,80,80,0x534444)
// makeblock(500-20+80*3,640-80*5,40,10,0x534444)
// makeblock(800,640-80*6,40,10,0x534444)
// makeblock(1000,640-80*6,40,10,0x534444)
// makeblock(1200,640-80*6,100,10,0x534444)
// makeblock(500+80*8.75,640,80,30,0x534444)
// makeblock(500+80*8.75,640-80*2,80,30,0x534444)
// keyblock(1225,120,20,20,0xFFD500)
// makeblock(540,640-80*6.9,40,342,0x534444)
// makeblock(300,640-80*3,80*3,30,0x534444)
// makeblock(80,640-80*4,80*.5,30,0x534444)
// makeblock(10,320,20,15,0x000000)
// makeblock(30,320,20,15,0xFFFFFF)
// makeblock(50,320,20,15,0x000000)
// makeblock(70,320,20,15,0xFFFFFF)
// makeblock(30,335,20,15,0x000000)
// makeblock(10,335,20,15,0xFFFFFF)
// makeblock(70,335,20,15,0x000000)
// makeblock(50,335,20,15,0xFFFFFF)
// doorblock(200,12,20,418,0xC72700,kox[0])




window.addEventListener("keydown", function(e) {
   if (e.key == "ArrowRight"){movingRight = true}
   if (e.key == "ArrowLeft"){movingLeft = true}
   if (e.key == "ArrowUp"){if(movingUp == false){timejumped = Date.now()} ; movingUp = true}
//   if (e.key == "r"){unloadlevel()}
//   if (e.key == "q"){loadlevel()}
    if (e.key == "r"){unloadlevel() ; loadlevel() ; frog.x = 50 ; frog.y = 670}

})
// if(movingUp == false){timejumped = Date.now()}
window.addEventListener("keyup", function(e) {
    if (e.key == "ArrowRight"){movingRight = false}
    if (e.key == "ArrowLeft"){movingLeft = false}
    if (e.key == "ArrowUp"){movingUp = false ; timejumped = 0 ; canjumpy = true}
})

var canjumpy = true

app.ticker.add((delta) => {

    // bonkey level timer
    // if(frog.y < 670 && frog.y > 670-(80*6)){timerdisplay.text=((Date.now()-timer)/1000)}
    // else{timer = Date.now()}

    // level 1 timer
    // if (frog.x > 0){timerdisplay.text=((Date.now()-timer)/1000)}
    // else{timer = Date.now()}

    // if (frog.x < 52 && frog.y < 335){timer = Date.now() ; frog.x = 0 ; frog.y = 670}

    // new level timer 
    if (frog.x > 50 && frog.x < 4070){timerdisplay.text=((Date.now()-timer)/1000)}
    else{timer = Date.now()}
    if (timer == Date.now() && frog.x > 4070 && frog.y < 400){frog.y = 670}



    if (movingRight == movingLeft){speedX = 0}
    else {
        if (movingRight){speedX = -50}
        if (movingLeft){speedX = 50}
    //    if (movingRight && frog.x < 400){speedX = -50}
    //    else if (movingRight && frog.x > 400){speedX = 0 ; level.x -= 5}
    //    if (movingLeft && frog.x > 200){speedX = 50}
    //    else if (movingLeft && frog.x < 200){speedX = 0 ; level.x += 5}

    }

    // if (movingRight == movingLeft){speedX = 0}
    // else {
    //     if (movingLeft){speedX = 50}
    //     if (movingRight){speedX = -50}
    // }
    
    frog.x -= speedX * delta * 0.2
    speedX += accelX * delta * 0.2
    frog.y -= speedY * delta * 0.2
    speedY += accelY * delta * 0.2


    if (frog.x == 0){}

    blox.forEach(b => {
        wis(b)
    });

    kox.forEach(kb => {
        nowis(kb)
    });

   dox.forEach(db => {
       lois(db)
   });

   sox.forEach(sb => {
        OHNOis(sb)
   });

   
   
   //update camera

   var frogondascreenx = frog.x + level.x
   if (frogondascreenx > 400){level.x = -frog.x + 400}
   if (frogondascreenx < 150){level.x = -frog.x + 150}
   var frogondascreeny = frog.y + level.y
   if (frogondascreeny < 100){level.y = -frog.y + 100}
   if (frogondascreeny > 570){level.y = -frog.y + 570}

//    bgg.x = -level.x
//    if (bgg.x > 400){level.x = -frog.x + 400}
//    if (bgg.x < 150){level.x = -frog.x + 150}
 


   var cameraleft = 0
   var cameraright = -3000
   var cameratop = 720
   var camerabot = 0

   level.x = Math.min(cameraleft,level.x)
   level.x = Math.max(cameraright,level.x)
   level.y = Math.min(cameratop,level.y)
   level.y = Math.max(camerabot,level.y)

//    bgg.x = Math.min(cameraleft,-level.x)
//    bgg.x = Math.max(cameraright,-level.x)

   

})

var jumpy = ()=>{
    if (canjumpy == true){speedY = 68 ; timejumped = Date.now()}

    if ((Date.now()-timejumped) < 500){canjumpy = false}
    else {canjumpy = true}
    //console.log(Date.now()-timejumped)
}

var wis = (block)=>{
    var blockright = Math.abs(frog.x - block.x - block.width)
    var blockleft = Math.abs(frog.x + frog.width - block.x)
    var blockbottom = Math.abs(frog.y - block.y - block.height)
    var blocktop = Math.abs(frog.y + frog.width - block.y)
    var sidez = [blockright, blockleft, blockbottom, blocktop]
    
    var mincollision = 0
    if (blockleft < sidez[mincollision]){mincollision = 1}
    if (blockbottom < sidez[mincollision]){mincollision = 2}
    if (blocktop < sidez[mincollision]){mincollision = 3}

    
    if (frog.x < block.x + block.width &&
        frog.x + frog.width > block.x &&
        frog.y < block.y + block.height &&
        frog.y + frog.width > block.y)
        
        {
            if (mincollision == 0){frog.x = block.x + block.width}
            if (mincollision == 1){frog.x = block.x - frog.width}
            if (mincollision == 2){frog.y = block.y + block.height ; if (speedY > 0){speedY = -(0.5 * speedY)}}
            if (mincollision == 3){frog.y = block.y - frog.height ; if (speedY < 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}}
        }
}

var nowis = (kblock)=>{
    
    if (frog.x < kblock.x + kblock.width &&
        frog.x + frog.width > kblock.x &&
        frog.y < kblock.y + kblock.height &&
        frog.y + frog.width > kblock.y)
        {kblock.y = 800}
}

var lois = (dblock)=>{
    var blockright = Math.abs(frog.x - dblock.x - dblock.width)
    var blockleft = Math.abs(frog.x + frog.width - dblock.x)
    var blockbottom = Math.abs(frog.y - dblock.y - dblock.height)
    var blocktop = Math.abs(frog.y + frog.width - dblock.y)
    var sidez = [blockright, blockleft, blockbottom, blocktop]
    
    var mincollision = 0
    if (blockleft < sidez[mincollision]){mincollision = 1}
    if (blockbottom < sidez[mincollision]){mincollision = 2}
    if (blocktop < sidez[mincollision]){mincollision = 3}

    if (frog.x < dblock.x + dblock.width &&
        frog.x + frog.width > dblock.x &&
        frog.y < dblock.y + dblock.height &&
        frog.y + frog.width > dblock.y
        )
        {
            if (mincollision == 0){frog.x = dblock.x + dblock.width}
            if (mincollision == 1){frog.x = dblock.x - frog.width}
            if (mincollision == 2){frog.y = dblock.y + dblock.height ; if (speedY > 0){speedY = -(0.5 * speedY)}}
            if (mincollision == 3){frog.y = dblock.y - frog.height ; if (speedY < 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}}
        }
    else if (dblock.key.y == 800)   {dblock.y = 800}
    
}

var OHNOis = (sblock)=>{

    if (frog.x < sblock.x + sblock.width &&
        frog.x + frog.width > sblock.x &&
        frog.y < sblock.y + sblock.height &&
        frog.y + frog.width > sblock.y
        ) {unloadlevel() ; loadlevel() ; frog.x = 50 ; frog.y = 670}
}

var loadlevel = ()=>{
    // floor/wall
    makeblock(0,670,10000,100,0x000000)
    makeblock(0,30,50,1500,0x000000)
    makeblock(4230,-500,50,1500,0x000000)
    //                                                  STAIRCASE: for (var b = 1; b < 20; b++){makeblock(500+80*b,670-80*b,1000)}
    makeblock(500,590,80,80,0xB900FF)
    makeblock(800,510,80,160,0xB900FF)
    makeblock(700,410,80,20,0xB900FF)
    makeblock(500,310,80,20,0xB900FF)
    makeblock(800,260,80,20,0xB900FF)
    makeblock(1000,230,80,440,0xB900FF)
    makeblock(1250,0,80,470,0xB900FF)
    makeblock(1180,230,70,40,0xB900FF)
    makeblock(1080,450,70,40,0xB900FF)
    makeblock(1250,530,80,140,0xB900FF)
    makeblock(1250,530,150,40,0xB900FF)
    makeblock(1000,630,150,40,0xB900FF)
    makeblock(1250,330,140,40,0xB900FF)
    makeblock(1500,250,80,420,0xB900FF)
    makeblock(1440,450,140,20,0xB900FF)
    makeblock(1440,630,140,40,0xB900FF)
    makeblock(1730,230,80,440,0xB900FF)
    makeblock(1730,230,400,20,0xB900FF)
    makeblock(2210,30,80,520,0xB900FF)
    makeblock(1890,330,330,20,0xB900FF)
    makeblock(1250,130,170,40,0xB900FF)
    makeblock(1800,430,400-240,20,0xB900FF)
    makeblock(1800+240,430,410-240,20,0xB900FF)
    makeblock(1890,530,330-90,20,0xB900FF)
    makeblock(1800,630,1030,40,0xB900FF)
    makeblock(2370,430,80,120,0xB900FF)
    makeblock(2530,530,330-90,20,0xB900FF)
    makeblock(2450,430,400-160,20,0xB900FF)
    makeblock(2370,330,400,20,0xB900FF)
    makeblock(2770,250,80,420,0xB900FF)
    keyblock(2715,575,30,30,0xFFD500)
    doorblock(2290,330,80,20,0x2700FF,kox[0])
    makeblock(3170,250,80,420,0xB900FF)
    makeblock(3570,250,80,420,0xB900FF)
    makeblock(3970,250,80,420,0xB900FF)
    makeblock(3970,280,100,390,0xB900FF)

    
    makeblock(4050,250,20,15,0x000000)
    makeblock(4050,265,20,15,0xFFFFFF)
    makeblock(4070,250,20,15,0xFFFFFF)
    makeblock(4070,265,20,15,0x000000)
    makeblock(4090,250,20,15,0x000000)
    makeblock(4090,265,20,15,0xFFFFFF)
    makeblock(4110,250,20,15,0xFFFFFF)
    makeblock(4110,265,20,15,0x000000)
    makeblock(4130,250,20,15,0x000000)
    makeblock(4130,265,20,15,0xFFFFFF)
    makeblock(4150,250,20,15,0xFFFFFF)
    makeblock(4150,265,20,15,0x000000)
    makeblock(4170,250,20,15,0x000000)
    makeblock(4170,265,20,15,0xFFFFFF)
    makeblock(4190,250,20,15,0xFFFFFF)
    makeblock(4190,265,20,15,0x000000)
    makeblock(4210,250,20,15,0x000000)
    makeblock(4210,265,20,15,0xFFFFFF)

    spikeblock(880,650,120,20,0xFF0000)
    spikeblock(1580,650,150,20,0xFF0000)
    spikeblock(2850,650,320,20,0xFF0000)
    spikeblock(3250,650,320,20,0xFF0000)
    spikeblock(3650,650,320,20,0xFF0000)

}

loadlevel()

var unloadlevel = ()=>{
terrain.children = []
blox = []
kox = []
dox = []


}

