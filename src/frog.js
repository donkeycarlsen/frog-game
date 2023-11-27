const app = new PIXI.Application({
    width: 1280, height: 720, backgroundColor: 0xDD8CFC, resolution: 1
})
document.body.appendChild(app.view)



var title = document.getElementById("display")
title.innerHTML = ""
title.style.color = "#009600"
title.style.position = "absolute"
title.style.top = "10px"

const gui = new PIXI.Container(PIXI.Texture.WHITE)
app.stage.addChild(gui)
var menu = new DKmenu(gui)
menu.loadbackground()
menu.loadmainmenu()

menu.buttons[0].on('click', (event) => {
    menu.buttons[0].y = 3000 ; menu.other[0].y = 3000
    menu.loadsecondmenu()

    menu.buttons[1].on('click', (event) => {
        console.log('singleplayer')
        menu.buttons[1].y = 3000 ; menu.buttons[2].y = 3000 ; menu.buttons[3].y = 3000
        menu.loadsingleplayermenu()
            menu.levelbuttons[0].on('click', (event) =>{
                menu.backgrounds[0].y = 3000 ; menu.levelbuttons[0].y = 4000 ; menu.levelbuttons[1].y = 3000 ;
                menu.levelbuttons[2].y = 3000 ; menu.levelbuttons[3].y = 3000 ; menu.levelbuttons[4].y = 3000
                loadlevel1()
            })
            menu.levelbuttons[1].on('click', (event) =>{
                menu.backgrounds[0].y = 3000 ; menu.levelbuttons[0].y = 3000 ; menu.levelbuttons[1].y = 4000 ;
                menu.levelbuttons[2].y = 3000 ; menu.levelbuttons[3].y = 3000 ; menu.levelbuttons[4].y = 3000
                loadlevel2()
            })

    });
    
    menu.buttons[2].on('click', (event) => {
        console.log('multiplayer')});
    
    menu.buttons[3].on('click', (event) => {
        console.log('avatar')});

});

const level = new PIXI.Container(PIXI.Texture.WHITE)
   level.x = 0
   level.y = 0
   level.width = 500
   level.height = 500
   app.stage.addChild(level)


// const baksd = new PIXI.Container(PIXI.Texture.WHITE)
// const bg = PIXI.Texture.from('src/assets/bg.png')
// const bgg = new PIXI.Sprite(bg)
//     bgg.width = 1280
//     bgg.height = 720
//     bgg.x = 0
//     bgg.y = 0
//     level.addChild(bgg)

class DKblock {
    sprite = null
    touchable = true
    collectible = false
    ouchie = false
    door = null
    bounce = false
    gravityup = false
    gravitydown = false
    invincible = false
    launchright = false
    launchleft = false

    constructor(){}
    onCollision = ()=>{}

}

class DKpowerup {
    sprite = null
    touchable = false
    collectible = true
    invincible = false

    constructor(){}
    onCollision = ()=>{}
}

class DKplayer {
    sprite = null
    invincible = false
    off = false

    surfaces = []

    constructor(){}
}



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
frog.x = -2000     // 50
frog.y = 1000    // 670
level.addChild(frog)

var f = new DKplayer()
f.sprite = frog



const texture0 = PIXI.Texture.from('src/assets/texture0.png');
texture0.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT;
const texture1 = PIXI.Texture.from('src/assets/texture1.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT});
var textures = [texture0,texture1]



var timer = Date.now()
const timerdisplay = new PIXI.Text((Date.now()-timer)/1000)
timerdisplay.style = new PIXI.TextStyle({
    fill: 0xFFFFFF
})
timerdisplay.y = 3000


app.stage.addChild(timerdisplay)




var movingRight = false
var movingLeft = false
var movingUp = false
var timejumped = 0


var accelX = 0
var accelY = -20
var speedX = 0
var speedY = 0

var excessAccelXright = -20
var excessSpeedXright = 0
var excessAccelXleft = 20
var excessSpeedXleft = 0


var cameraleft = 2000
var cameraright = 1000
var cameratop = 720
var camerabot = 0


var makeblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF,bi=textures[0])=>{
    const block = new PIXI.Sprite(PIXI.Texture.WHITE)
    block.x = bx
    block.y = by
    block.width = bw
    block.height = bh
    block.tint = bc
    block.texture = bi
    terrain.addChild(block)
    
    var b = new DKblock()
    b.sprite = block
    blox.push(b)
}

var keyblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const kblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    kblock.x = bx
    kblock.y = by
    kblock.width = bw
    kblock.height = bh
    kblock.tint = bc
    terrain.addChild(kblock)

    var b = new DKblock()
    b.sprite = kblock
    b.collectible = true
    b.touchable = false

    blox.push(b)
}

var doorblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF,key)=>{
    const dblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    dblock.x = bx
    dblock.y = by
    dblock.width = bw
    dblock.height = bh
    dblock.tint = bc
    terrain.addChild(dblock)

    var b = new DKblock()
    b.sprite = dblock
    key.door = b

    blox.push(b)
}

var spikeblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const sblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    sblock.x = bx
    sblock.y = by
    sblock.width = bw
    sblock.height = bh
    sblock.tint = bc
    terrain.addChild(sblock)

    var b = new DKblock()
    b.sprite = sblock
    b.ouchie = true
    b.touchable = false
    blox.push(b)
}

var bounceblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.tint = bc
    terrain.addChild(bblock)

    var b = new DKblock()
    b.sprite = bblock
    b.touchable = false
    b.bounce = true

    blox.push(b)

}

var gravityupblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const g1block = new PIXI.Sprite(PIXI.Texture.WHITE)
    g1block.x = bx
    g1block.y = by
    g1block.width = bw
    g1block.height = bh
    g1block.tint = bc
    terrain.addChild(g1block)

    var b = new DKblock()
    b.sprite = g1block
    b.gravityup = true
    b.touchable = false

    blox.push(b)

} 

var gravitydownblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const g2block = new PIXI.Sprite(PIXI.Texture.WHITE)
    g2block.x = bx
    g2block.y = by
    g2block.width = bw
    g2block.height = bh
    g2block.tint = bc
    terrain.addChild(g2block)

    var b = new DKblock()
    b.sprite = g2block
    b.gravitydown = true
    b.touchable = false
    blox.push(b)

} 

var backgroundblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF,bi=textures[0])=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.tint = bc
    bblock.texture = bi
    terrain.addChild(bblock)
    
    var b = new DKblock()
    b.sprite = bblock
    b.touchable = false
    blox.push(b)
}

var launchrightblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.tint = bc
    terrain.addChild(bblock)

    var b = new DKblock()
    b.sprite = bblock
    b.touchable = false
    b.launchright = true

    blox.push(b)

}

var launchleftblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.tint = bc
    terrain.addChild(bblock)

    var b = new DKblock()
    b.sprite = bblock
    b.touchable = false
    b.launchleft = true

    blox.push(b)

}

var invinciblepowerup = (bx,by,bw=40,bh=40,bc=0xFFFFFF)=>{
    const iblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    iblock.x = bx
    iblock.y = by
    iblock.width = bw
    iblock.height = bh
    iblock.tint = bc
    terrain.addChild(iblock)
    
    var p = new DKpowerup()
    p.sprite = iblock
    p.invincible = true

    blox.push(p)
}

var offpowerup = (bx,by,bw=40,bh=40,bc=0xFFFFFF)=>{
    const oblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    oblock.x = bx
    oblock.y = by
    oblock.width = bw
    oblock.height = bh
    oblock.tint = bc
    terrain.addChild(oblock)
    
    var p = new DKpowerup()
    p.sprite = oblock
    p.touchable = false
    p.off = true

    blox.push(p)
}

var blox = []

window.addEventListener("keydown", function(e) {
   if (e.key == "ArrowRight"){movingRight = true}
   if (e.key == "ArrowLeft"){movingLeft = true}
   if (e.key == "ArrowUp"){if(movingUp == false){timejumped = Date.now()} ; movingUp = true}
    // if (e.key == "2"){unloadlevel()}
    // if (e.key == "1"){loadlevel1()}
    if (e.key == "r"){reloadlevel()}
    if (e.key == "m"){makeblock(frog.x,frog.y+frog.height,frog.width,frog.height)}

})
// if(movingUp == false){timejumped = Date.now()}
window.addEventListener("keyup", function(e) {
    if (e.key == "ArrowRight"){movingRight = false}
    if (e.key == "ArrowLeft"){movingLeft = false}
    if (e.key == "ArrowUp"){movingUp = false ; timejumped = 0 ; canjumpy = true}
})

window.addEventListener("keydown", function(e) {
    if (e.key == "d"){movingRight = true}
    if (e.key == "a"){movingLeft = true}
    if (e.key == "w"){if(movingUp == false){timejumped = Date.now()} ; movingUp = true}
 })
 // if(movingUp == false){timejumped = Date.now()}
 window.addEventListener("keyup", function(e) {
     if (e.key == "d"){movingRight = false}
     if (e.key == "a"){movingLeft = false}
     if (e.key == "w"){movingUp = false ; timejumped = 0 ; canjumpy = true}
 })

var connection = new DKConnection()
connection.connect()
const networkElements = new PIXI.Container(PIXI.Texture.WHITE)
level.addChild(networkElements)
connection.levelElements = networkElements

var canjumpy = true

var timeSinceLastUpdateServer = 0
var serverUpdateDelay = 1000/300
app.ticker.add((delta) => {
    timeSinceLastUpdateServer += delta
    if (timeSinceLastUpdateServer > serverUpdateDelay) {
        timeSinceLastUpdateServer = 0
        connection.sendPosition(frog.x, frog.y, 0, 0)
    }
})

var timeron1 = 0
var timeron2 = 0

app.ticker.add((delta) => {

    // // new level timer 
    if (frog.x > timeron1 && frog.x < timeron2){timerdisplay.text=((Date.now()-timer)/1000)}
    else{timer = Date.now()}
    if (timer == Date.now() && frog.x > 4070 && frog.y < 400){frog.y = 670}



    if (movingRight == movingLeft){speedX = 0}
    else {
        if (movingRight){speedX = -50}
        if (movingLeft){speedX = 50}

        }

    
    frog.x -= (speedX * delta * 0.2) - (excessSpeedXright * delta * 0.2) - (excessSpeedXleft * delta * 0.2)
    speedX += accelX * delta * 0.2
    frog.y -= speedY * delta * 0.2
    speedY += accelY * delta * 0.2

    excessSpeedXright += excessAccelXright * delta * 0.2
    if (excessSpeedXright < 0){excessSpeedXright = 0}

    excessSpeedXleft += excessAccelXleft * delta * 0.2
    if (excessSpeedXleft > 0){excessSpeedXleft = 0}

    blox.forEach(b => {
        wis(b)
    });
    networkElements.children.forEach(p => {
        handlePlayerCollision(p)
    });

   
   //update camera

   var frogondascreenx = frog.x + level.x
   if (frogondascreenx > 400){level.x = -frog.x + 400}
   if (frogondascreenx < 250){level.x = -frog.x + 250}
   var frogondascreeny = frog.y + level.y
   if (frogondascreeny < 100){level.y = -frog.y + 100}
   if (frogondascreeny > 470){level.y = -frog.y + 470}

//    bgg.x = -level.x
//    if (bgg.x > 400){level.x = -frog.x + 400}
//    if (bgg.x < 150){level.x = -frog.x + 150}
 


   level.x = Math.min(cameraleft,level.x)
   level.x = Math.max(cameraright,level.x)
   level.y = Math.min(cameratop,level.y)
   level.y = Math.max(camerabot,level.y)

//    bgg.x = Math.min(cameraleft,-level.x)
//    bgg.x = Math.max(cameraright,-level.x)

   
    connection.renderFrogs()
})

var jumpy = ()=>{
    if (canjumpy == true){
        if (accelY < 0){speedY = 68 ; timejumped = Date.now()}
        else if (accelY > 0){speedY = -68 ; timejumped = Date.now()}
    }
    if ((Date.now()-timejumped) < 500){canjumpy = false}
    else {canjumpy = true}


}


var wis = (block)=>{
    var s = block.sprite

    var blockright = Math.abs(frog.x - s.x - s.width)
    var blockleft = Math.abs(frog.x + frog.width - s.x)
    var blockbottom = Math.abs(frog.y - s.y - s.height)
    var blocktop = Math.abs(frog.y + frog.width - s.y)
    var sidez = [blockright, blockleft, blockbottom, blocktop]
    
    var mincollision = 0
    if (blockleft < sidez[mincollision]){mincollision = 1}
    if (blockbottom < sidez[mincollision]){mincollision = 2}
    if (blocktop < sidez[mincollision]){mincollision = 3}

    
    if (frog.x < s.x + s.width &&
        frog.x + frog.width > s.x &&
        frog.y < s.y + s.height &&
        frog.y + frog.width > s.y)
        
        {
            block.onCollision()
            if (block.invincible){frog.tint = 0xFF0000 ; f.invincible = true}
            if (block.off){frog.tint = 0x009600 ; f = new DKplayer()}
            if (block.ouchie && !f.invincible){reloadlevel()}
            if (block.collectible){s.y = 800}
            if (block.door != null){block.door.sprite.y = 800}
            if (block.bounce){speedY = 100}
            if (block.gravityup){accelY = 20 ; speedY = 45}
            if (block.gravitydown){accelY = -20 ; speedY = -45}
            if (block.launchright){excessSpeedXleft = 0 ; excessSpeedXright = 150 ; speedY = 50}
            if (block.launchleft){excessSpeedXright = 0 ; excessSpeedXleft = -150 ; speedY = 50}
            if (block.touchable){
                if (accelY < 0){
                    if (mincollision == 0){frog.x = s.x + s.width  ; excessSpeedXright = 0 ; excessSpeedXleft = 0}
                    if (mincollision == 1){frog.x = s.x - frog.width  ; excessSpeedXright = 0 ; excessSpeedXleft = 0}
                    if (mincollision == 2){frog.y = s.y + s.height ; if (speedY > 0){speedY = -(0.5 * speedY)}}
                    if (mincollision == 3){frog.y = s.y - frog.height ; if (speedY < 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}}
                }
                else {
                    if (mincollision == 0){frog.x = s.x + s.width}
                    if (mincollision == 1){frog.x = s.x - frog.width}
                    if (mincollision == 2){frog.y = s.y + s.height ; if (speedY > 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}}     
                    if (mincollision == 3){frog.y = s.y - frog.height ; if (speedY < 0){speedY = -(0.5 * speedY)}}
                }
            }
        }
}

var handlePlayerCollision = (p)=>{
    var s = p

    var blockright = Math.abs(frog.x - s.x - s.width)
    var blockleft = Math.abs(frog.x + frog.width - s.x)
    var blockbottom = Math.abs(frog.y - s.y - s.height)
    var blocktop = Math.abs(frog.y + frog.width - s.y)
    var sidez = [blockright, blockleft, blockbottom, blocktop]
    
    var mincollision = 0
    if (blockleft < sidez[mincollision]){mincollision = 1}
    if (blockbottom < sidez[mincollision]){mincollision = 2}
    if (blocktop < sidez[mincollision]){mincollision = 3}

    
    if (frog.x < s.x + s.width &&
        frog.x + frog.width > s.x &&
        frog.y < s.y + s.height &&
        frog.y + frog.width > s.y)
        {
            //p.onCollision()
            if (true) { //p.touchable
                if (accelY < 0){
                    if (mincollision == 0){frog.x = s.x + s.width}
                    if (mincollision == 1){frog.x = s.x - frog.width}
                    if (mincollision == 2){frog.y = s.y + s.height ; if (speedY > 0){speedY = -(0.5 * speedY)}}
                    if (mincollision == 3){frog.y = s.y - frog.height ; if (speedY < 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}}
                }
                else {
                    if (mincollision == 0){frog.x = s.x + s.width}
                    if (mincollision == 1){frog.x = s.x - frog.width}
                    if (mincollision == 2){frog.y = s.y + s.height ; if (speedY > 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}}     
                    if (mincollision == 3){frog.y = s.y - frog.height ; if (speedY < 0){speedY = -(0.5 * speedY)}}
                }
            }
        }
}



var loadlevel1 = ()=>{
    // frog
    frog.x = 50 ; frog.y = 670 ; speedY = 0 ; accelY = -20 ; frog.tint = 0x009600 ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0
    // timer
    timerdisplay.y = 0 ; timeron1 = 50 ; timeron2 = 4070

    // floor/wall
    makeblock(0,670,10000,100,0x000000)
    makeblock(0,-500,50,1500,0x000000)
    makeblock(4230,-500,50,1500,0x000000)

    // floor/wall
    makeblock(0,670,10000,100,0x000000)
    makeblock(0,30,50,1500,0x000000)
    makeblock(4230,-500,50,1500,0x000000)
    //                                          STAIRCASE: for (var b = 1; b < 20; b++){makeblock(500+80*b,670-80*b,1000)}
    makeblock(500,590,80,80,0xB900FF)
    makeblock(800,510,80,160,0xB900FF)
    makeblock(700,410,80,20,0xB900FF)
    makeblock(500,310,80,20,0xB900FF)
    makeblock(800,260,80,20,0xB900FF)
    makeblock(1000,230,80,440,0xB900FF)
    makeblock(1250,-50,80,520,0xB900FF)
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

    bounceblock(1330,120,40,10,0x00FF00)
    gravityupblock(1270,-60,40,10,0xFF9B00)
    makeblock(1250,-340,1040,40,0xB900FF)
    gravitydownblock(2230,-300,40,10,0xFF9B00)

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
    doorblock(2290,330,80,20,0x2700FF,blox[blox.length-1])
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

    spikeblock(880,620,120,50,0xFF0000)
    spikeblock(1580,650,150,20,0xFF0000)
    spikeblock(2850,650,320,20,0xFF0000)
    spikeblock(3250,650,320,20,0xFF0000)
    spikeblock(3650,650,320,20,0xFF0000)
    // spikeblock(930,620,20,20,0xFFFFFF)

    invinciblepowerup(200,200,30,30,0xFF0000)
    offpowerup(150,200,30,30,0x84500A)
}

var loadlevel2 = ()=>{
     // frog
    frog.x = 50 ; frog.y = 670 ; speedY = 0 ; accelY = -20 ; frog.tint = 0x009600 ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0
    // timer
    timerdisplay.y = 0 ; timeron1 = 50 ; timeron2 = 4070

    // background in first tunnel
    // backgroundblock(2040,-270,320,200,0x6250A7)

    // floor/wall
    makeblock(0,670,10000,100,0x6D1B7F)
    makeblock(0,-500,50,1500,0x6D1B7F)
    makeblock(4230,-500,50,1500,0x6D1B7F)
    // first spikes
    spikeblock(575,645,75,25,0x0095D6)
    spikeblock(625,620,25,25,0x0095D6)
    // first two blocks
    makeblock(650,570,150,100,0x6D1B7F)
    makeblock(800,470,150,200,0x6D1B7F)
    // bridge
    makeblock(950,470,50,10,0xDE8000)
    makeblock(1000,474,50,10,0xDE8000)
    makeblock(1050,478,100,10,0xDE8000)
    makeblock(1150,482,250,10,0xDE8000)
    makeblock(1400,478,100,10,0xDE8000)
    makeblock(1500,474,50,10,0xDE8000)
    makeblock(1550,470,50,10,0xDE8000)
    // spikes under bridge
    spikeblock(950,645,650,25,0x0095D6)
    spikeblock(950,620,100,25,0x0095D6)
    spikeblock(1100,620,75,25,0x0095D6)
    spikeblock(1200,620,125,25,0x0095D6)
    spikeblock(1425,620,100,25,0x0095D6)
    spikeblock(1575,620,25,25,0x0095D6)
    spikeblock(950,595,25,25,0x0095D6)
    spikeblock(1125,595,25,25,0x0095D6)
    spikeblock(1225,595,25,25,0x0095D6)
    spikeblock(1300,595,25,25,0x0095D6)
    spikeblock(1450,595,50,25,0x0095D6)
    // blocks after bridge
    makeblock(1600,470,200,200,0x6D1B7F)
    makeblock(1800,370,100,300,0x6D1B7F)
    bounceblock(1825,360,50,10,0xFAE160)
    makeblock(1900,170,100,500,0x6D1B7F)
    bounceblock(1925,160,50,10,0xFAE160)
    makeblock(2000,-70,400,740,0x6D1B7F)
    // cloud 1 outside
    makeblock(1600,-130,90,75,0xE442D8)
    makeblock(1710,-130,90,75,0xE442D8)
    makeblock(1590,-120,220,50,0xE442D8)
    makeblock(1610,-100,50,50,0xE442D8)
    makeblock(1670,-100,60,50,0xE442D8)
    makeblock(1675,-100,50,55,0xE442D8)
    makeblock(1740,-100,50,50,0xE442D8)
    // inside
    makeblock(1600+5,-130+5,90-10,75-10,0xFFBFF9)
    makeblock(1710+5,-130+5,90-10,75-10,0xFFBFF9)
    makeblock(1590+5,-120+5,220-10,50-10,0xFFBFF9)
    makeblock(1610+5,-100+5,50-10,50-10,0xFFBFF9)
    makeblock(1670+5,-100+5,60-10,50-10,0xFFBFF9)
    makeblock(1675+5,-100+5,50-10,55-10,0xFFBFF9)
    makeblock(1740+5,-100+5,50-10,50-10,0xFFBFF9)
    // cloud 2 outside
    makeblock(1600-400,-130,90,75,0xE442D8)
    makeblock(1710-400,-130,90,75,0xE442D8)
    makeblock(1590-400,-120,220,50,0xE442D8)
    makeblock(1610-400,-100,50,50,0xE442D8)
    makeblock(1670-400,-100,60,50,0xE442D8)
    makeblock(1675-400,-100,50,55,0xE442D8)
    makeblock(1740-400,-100,50,50,0xE442D8)
    // inside
    makeblock(1600+5-400,-130+5,90-10,75-10,0xFFBFF9)
    makeblock(1710+5-400,-130+5,90-10,75-10,0xFFBFF9)
    makeblock(1590+5-400,-120+5,220-10,50-10,0xFFBFF9)
    makeblock(1610+5-400,-100+5,50-10,50-10,0xFFBFF9)
    makeblock(1670+5-400,-100+5,60-10,50-10,0xFFBFF9)
    makeblock(1675+5-400,-100+5,50-10,55-10,0xFFBFF9)
    makeblock(1740+5-400,-100+5,50-10,50-10,0xFFBFF9)
    // key 1
    keyblock(1290,-250,20,20,0x4046FF)
    // door 1
    doorblock(2080,-270,240,200,0x4046FF,blox[blox.length-1])
    // blocks above door 1
    makeblock(2000,-470,400,200,0x6D1B7F)
    // blocks after door 1
    makeblock(2400,30,50,640,0x6D1B7F)
    makeblock(2450,230,50,440,0x6D1B7F)
    makeblock(2500,280,150,390,0x6D1B7F)
    makeblock(2650,230,50,440,0x6D1B7F)
    makeblock(2700,-30,100,700,0x6D1B7F)
    // spikes under first jump after door
    spikeblock(2500,255,150,25,0x0095D6)
    spikeblock(2550,230,25,25,0x0095D6)
    spikeblock(2625,205,25,75,0x0095D6)
    spikeblock(2625,205,75,25,0x0095D6)
    spikeblock(2650,180,25,25,0x0095D6)
    // second jump
    makeblock(2800,180,50,490,0x6D1B7F)
    makeblock(2850,280,50,390,0x6D1B7F)
    makeblock(2900,330,200,340,0x6D1B7F)
    makeblock(3100,230,50,440,0x6D1B7F)
    makeblock(3150,0,100,670,0x6D1B7F)
    // spikes under second jump
    spikeblock(2900,280,200,50,0x0095D6)
    spikeblock(2850,255,250,25,0x0095D6)
    spikeblock(2875,230,50,25,0x0095D6)
    spikeblock(3025,230,75,25,0x0095D6)
    spikeblock(3075,205,75,25,0x0095D6)
    // blocks after third jump
    makeblock(3500,-300,50,375,0x6D1B7F)
    launchrightblock(3250,200,10,50,0xFAE160)
    makeblock(3250,400,500,270,0x6D1B7F)
    makeblock(3750,-100,100,770,0x6D1B7F)
    makeblock(3675,150,75,35,0x6D1B7F)
    makeblock(3550,50,75,25,0x6D1B7F)
    makeblock(3675,-50,75,35,0x6D1B7F)

    // spikes under launchright
    spikeblock(3250,350,500,50,0x0095D6)


    }

var unloadlevel = ()=>{
terrain.children = []
blox = []
}

var reloadlevel = ()=>{
    unloadlevel()
    if (menu.levelbuttons[0].y == 4000){loadlevel1()}
    if (menu.levelbuttons[1].y == 4000){loadlevel2()}
    f = new DKplayer()
}