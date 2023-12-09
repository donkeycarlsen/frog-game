const app = new PIXI.Application({
    width: 1280, height: 720, backgroundColor: 0xA7A284, resolution: 1
})
document.querySelector('.game-container').appendChild(app.view)

var inputElement = document.getElementById("usernameInput");

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
        return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
window.addEventListener('load', () => {
const savedUsername = getCookie('username');
console.log(`User: ${savedUsername}`)
if (savedUsername !== null) {
    inputElement.value = savedUsername;
    connection.playerName = savedUsername
    connection.setUsername(savedUsername)
}
});

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
        multiplayer = false
        menu.buttons[1].y = 3000 ; menu.buttons[2].y = 3000 ; menu.buttons[3].y = 3000
        menu.loadsingleplayermenu()
            menu.levelbuttons[0].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level1'
                loadlevel1()
            })
            menu.levelbuttons[1].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level2'
                loadlevel2()
            })
            menu.levelbuttons[2].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level3'
                loadlevel3() ; music[0].play()
            })
            menu.levelbuttons[3].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level4'
                loadlevel4()
            })
            menu.levelbuttons[4].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level5'
                loadlevel5()
            })
            menu.levelbuttons[5].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'levelpond'
                loadleveldapond()
            })

    });
    
    menu.buttons[2].on('click', (event) => {
        console.log('multiplayer')
        multiplayer = true
        menu.buttons[1].y = 3000 ; menu.buttons[2].y = 3000 ; menu.buttons[3].y = 3000
        menu.loadmultiplayermenu()
            menu.levelbuttons[0].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level1online'
                loadlevel1()
            })
            menu.levelbuttons[1].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level2online'
                loadlevel2()
            })
            menu.levelbuttons[2].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level3online'
                loadlevel3() ; music[0].play()
            })
            menu.levelbuttons[3].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level4online'
                loadlevel4()
            })
            menu.levelbuttons[4].on('click', (event) =>{
                menu.unloadMenu()
                worldCode = 'level5online'
                loadlevel5()
            })
    
        });
    
    menu.buttons[3].on('click', (event) => {
        console.log('avatar')});

});

const level = new PIXI.Container(PIXI.Texture.WHITE)
   level.x = 0
   level.y = 0
   level.width = 500
   level.height = 500
   level.sortableChildren = true
   app.stage.addChild(level)

const background = new PIXI.Container(PIXI.Texture.WHITE)
background.x = 0
background.y = 0
background.zIndex = -1
background.sortableChildren = true
app.stage.addChild(background)
app.stage.sortableChildren = true


var levelbackgrounds = [] 
const level3bgtex = PIXI.Texture.from('src/assets/level3bg2.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT})
const level3bg = PIXI.TilingSprite.from(level3bgtex, 5000, 5000)
level3bg.width = 5000
level3bg.height = 5000
// level3bg.tileScale.set(2, 2)
// Set the tilePosition to repeat the texture
// level3bg.tilePosition.set(0, 0)
level3bg.zIndex = -100
background.addChild(level3bg)
levelbackgrounds.push(level3bg)

var currentlevelbackground = level3bg

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
    swim = false
    ice = 0
    orb = false
    orbjumpsused = 0
    checkpoint = false

    baseMovementPath = null
    baseMovementDuration = 5.0
    baseMovementReverse = true
    alwaysMove = true
    movementStartTime = -1
    moveOnCollision = false

    launch = [0,0]

    constructor(){}
    onCollision = ()=>{
        if (this.moveOnCollision && Date.now() - this.movementStartTime > this.baseMovementDuration*1000) {
            this.movementStartTime = Date.now()
        }
        this.onCollisionExtra(this)
    }
    onCollisionExtra = (block) => {

    }

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
    width = 50
    height = 50
    x = 0
    y = 0
    sprite = null
    invincible = false
    off = false

    checkpoint = 0

    standingOn = null
    standingOnPosition = [0,0]

    constructor(){}
}



const terrain = new PIXI.Container(PIXI.Texture.WHITE)
   terrain.x = 0
   terrain.y = 0
   terrain.width = 500
   terrain.height = 500
   level.addChild(terrain)




// PIXI.Sprite(PIXI.Texture.WHITE)
// PIXI.Sprite.from('src/assets/frog.png');

const frogtexturesitting = PIXI.Texture.from('src/assets/frogsitting.png')
const frogtexturejump1 = PIXI.Texture.from('src/assets/frogjump1.png')
const frogtexturejump2 = PIXI.Texture.from('src/assets/frogjump2.png')
const frogtexturejump3 = PIXI.Texture.from('src/assets/frogjump3.png')

var frogtextures = [frogtexturesitting,frogtexturejump1,frogtexturejump2,frogtexturejump3]
// var currentskin = frogtextures[0]

var f = new DKplayer()


const frog = new PIXI.Sprite(PIXI.Texture.WHITE)
frog.tint = 0x009600
f.width = 50
f.height = 50
f.x = -2000     // 50
f.y = 1000    // 670
// frog.width = 50
// frog.height = 50
frog.anchor.set(0.5)
frog.texture = frogtextures[0]
level.addChild(frog)

f.sprite = frog

// const frogskin = new PIXI.Sprite.from(currentskin)
// frog.addChild(frogskin)



var textures = []
const texture0 = PIXI.Texture.from('src/assets/texture0.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture0)
const texture1 = PIXI.Texture.from('src/assets/block1-3.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture1)
const texture2 = PIXI.Texture.from('src/assets/block2-3.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture2)
const texture3 = PIXI.Texture.from('src/assets/block3.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture3)
const texture4 = PIXI.Texture.from('src/assets/block4.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture4)
const texture5 = PIXI.Texture.from('src/assets/block4-1.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture5)
const texture6 = PIXI.Texture.from('src/assets/block4-2.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture6)
const texture7 = PIXI.Texture.from('src/assets/block4-3.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture7)
const texture8 = PIXI.Texture.from('src/assets/block4-4.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture8)
const texture9 = PIXI.Texture.from('src/assets/block4-5.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture9)
const texture10 = PIXI.Texture.from('src/assets/block4-6.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture10)
const texture11 = PIXI.Texture.from('src/assets/block5.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture11)
const texture12 = PIXI.Texture.from('src/assets/grayflag.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture12)
const texture13 = PIXI.Texture.from('src/assets/greenflag.png',{wrapMode:PIXI.WRAP_MODES.MIRRORED_REPEAT}); textures.push(texture13)



var music = []
var musiclevel3 = new Audio('src/music/FROG_1_v2_a_mix_render.mp3')
musiclevel3.volume = 0.3
musiclevel3.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
music.push(musiclevel3)


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

var multiplayer = false
var worldCode = 'offline'


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
    return b
}
var makeblockDontAdd = (bx,by,bw=80,bh=80,bc=0xFFFFFF,bi=textures[0])=>{
    const block = new PIXI.Sprite(PIXI.Texture.WHITE)
    block.x = bx
    block.y = by
    block.width = bw
    block.height = bh
    block.tint = bc
    block.texture = bi
    //terrain.addChild(block)
    
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

var orbblock = (bx,by,bw=80,bh=80,bc=0xFFFFFF)=>{
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
    b.orb = true

    blox.push(b)

}

var cpspawnx = 0
var cpspawny = 0

var checkpointblock = (bx,by,bw=80,bh=80,ba=0,cpx,cpy,cpv)=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.tint = 0x000000
    bblock.alpha = ba
    terrain.addChild(bblock)


    var b = new DKblock()
    b.sprite = bblock
    b.touchable = false
    b.checkpoint = true
    b.cpx = cpx
    b.cpy = cpy
    b.cpv = cpv

    blox.push(b)
}

var textureover = (bx,by,bw=80,bh=80,bt,bc=0xFFFFFF)=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.texture = bt
    bblock.tint = bc
    terrain.addChild(bblock)

    var b = new DKblock()
    b.sprite = bblock
    b.touchable = false

    blox.push(b)

}

var layoutblock = (bx,by,bw=80,bh=80,pp=0,bc=0x000000)=>{
    const bblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    bblock.x = bx
    bblock.y = by
    bblock.width = bw
    bblock.height = bh
    bblock.alpha = pp
    bblock.tint = bc
    terrain.addChild(bblock)

    var b = new DKblock()
    b.sprite = bblock

    blox.push(b)

}

var iceblock = (bx,by,bw=80,bh=80,bc=0x89CFF0,yogurl=1) => {
    const iceblock = new PIXI.Sprite(PIXI.Texture.WHITE)
    iceblock.x = bx
    iceblock.y = by
    iceblock.width = bw
    iceblock.height = bh
    iceblock.tint = bc
    terrain.addChild(iceblock)

    var b = new DKblock()
    b.sprite = iceblock
    b.ice = yogurl
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
   if (e.key == "d"){movingRight = true}
   if (e.key == "a"){movingLeft = true}
   if (e.key == "ArrowUp"){if(movingUp == false){timejumped = Date.now()} ; movingUp = true}
   if (e.key == "w"){if(movingUp == false){timejumped = Date.now()} ; movingUp = true}
    // if (e.key == "2"){unloadlevel()}
    // if (e.key == "1"){loadlevel1()}
    if (e.key == "r"){reloadlevel()}
    if (e.key == "p"){goinaudio()}
    if (e.key == "]"){makeblock(f.x,f.y+f.height,f.width,f.height)}

})
// if(movingUp == false){timejumped = Date.now()}
window.addEventListener("keyup", function(e) {
    if (e.key == "ArrowRight"){movingRight = false}
    if (e.key == "ArrowLeft"){movingLeft = false}
    if (e.key == "d"){movingRight = false}
    if (e.key == "a"){movingLeft = false}
    if (e.key == "ArrowUp"){movingUp = false ; timejumped = 0 ; canjumpy = true}
    if (e.key == "w"){movingUp = false ; timejumped = 0 ; canjumpy = true}
})

// window.addEventListener("keydown", function(e) {
//     if (e.key == "d"){movingRight = true}
//     if (e.key == "a"){movingLeft = true}
//     if (e.key == "w"){if(movingUp == false){timejumped = Date.now()} ; movingUp = true}
//  })
//  // if(movingUp == false){timejumped = Date.now()}
//  window.addEventListener("keyup", function(e) {
//      if (e.key == "d"){movingRight = false}
//      if (e.key == "a"){movingLeft = false}
//      if (e.key == "w"){movingUp = false ; timejumped = 0 ; canjumpy = true}
//  })

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
    if (timeSinceLastUpdateServer > serverUpdateDelay && multiplayer && worldCode != 'offline') {
        timeSinceLastUpdateServer = 0
        connection.sendPosition(worldCode, f.x, f.y, 0, 0)
    }
})

var cpflags = []

var started = false
var finished = false
var spawnx = 0
var spawny = 0
var finishx = 0
var finishy = 0

app.ticker.add((delta) => {

    /// timer 
    if ((f.x != spawnx) || (f.y != spawny)){started = true}
    if ((started == true) && (finished == false)){timerdisplay.text=((Date.now()-timer)/1000)}
    else{timer = Date.now()}
    if ((f.x > finishx) && (f.y < finishy) && (!finished)){finished = true ;
        connection.sendTime(worldCode,parseFloat(timerdisplay.text))}


    // ice
    var iceJJFish = f.standingOn?.ice || 0
    if (iceJJFish > 0) {
        if (movingLeft) {
            accelX = 5 * iceJJFish
        }
        else if (movingRight) {
            accelX = -5 * iceJJFish
        }
        if (movingRight == movingLeft) {accelX = 0 ; speedX *= 0.95}
    }
    else {
        if (movingRight == movingLeft){speedX = 0}
        else {if (movingRight){speedX = -50 ; frog.scale.x = 1}
        if (movingLeft){speedX = 50 ; frog.scale.x = -1}}
    }



    
    f.x -= (speedX * delta * 0.2) - (excessSpeedXright * delta * 0.2) - (excessSpeedXleft * delta * 0.2)
    speedX += accelX * delta * 0.2
    f.y -= speedY * delta * 0.2
    speedY += accelY * delta * 0.2

    excessSpeedXright += excessAccelXright * delta * 0.2
    if (excessSpeedXright < 0){excessSpeedXright = 0}

    excessSpeedXleft += excessAccelXleft * delta * 0.2
    if (excessSpeedXleft > 0){excessSpeedXleft = 0}

    blox.forEach(b => {
        wis(b)
    });
    if (f.standingOn != null) {
        var motion = [f.standingOn.sprite.x - f.standingOnPosition[0], f.standingOn.sprite.y - f.standingOnPosition[1]]
        f.x += motion[0]
        f.y += motion[1]
        f.standingOnPosition = [f.standingOn.sprite.x, f.standingOn.sprite.y]
    }
    networkElements.children.forEach(p => {
        handlePlayerCollision(p)
    });

    // checkpoint flags

    


   
   //update camera

   var frogondascreenx = f.x + level.x
   if (frogondascreenx > 400){level.x = -f.x + 400}
   if (frogondascreenx < 300){level.x = -f.x + 300}
   var frogondascreeny = f.y + level.y
   if (frogondascreeny < 100){level.y = -f.y + 100}
   if (frogondascreeny > 470){level.y = -f.y + 470}

   level.x = Math.min(cameraleft,level.x)
   level.x = Math.max(cameraright,level.x)
   level.y = Math.min(cameratop,level.y)
   level.y = Math.max(camerabot,level.y)

   currentlevelbackground.x = level.x/8
   //if (currentlevelbackground.x > 400){level.x = -f.x + 400}
   //if (currentlevelbackground.x < 300){level.x = -f.x + 300}
   currentlevelbackground.y = level.y/8 - 720
   //if (currentlevelbackground.y > 470){level.y = -f.y + 470}
   //if (currentlevelbackground.y < 100){level.y = -f.y + 100}

//    currentlevelbackground.x = Math.min(cameraleft,-level.x)
//    currentlevelbackground.x = Math.max(cameraright,-level.x)
//    currentlevelbackground.y = Math.min(cameratop,-level.y)
//    currentlevelbackground.y = Math.max(camerabot,-level.y)

   
    if (multiplayer && worldCode != 'offline')
        connection.renderFrogs()
    
    // jump animation
    if (f.standingOn == null){
        if (speedY > 10){frog.texture = frogtextures[1]}
        else if (speedY < -10){frog.texture = frogtextures[3]}
        else {frog.texture = frogtextures[2]}

    }
    else (frog.texture = frogtextures[0])
    frog.x = f.x + f.width/2
    frog.y = f.y + f.height/2

    console.log(cpflags)

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
    var p = {x: s.x, y:s.y}
    var parent = s.parent
    while (parent != terrain)
    {
        p.x += parent.x
        p.y += parent.y
        console.log('practical position: ' + p.x + ' ' + p.y)
        parent = parent.parent
    }

    var blockright = Math.abs(f.x - p.x - s.width)
    var blockleft = Math.abs(f.x + f.width - p.x)
    var blockbottom = Math.abs(f.y - p.y - s.height)
    var blocktop = Math.abs(f.y + f.width - p.y)
    var sidez = [blockright, blockleft, blockbottom, blocktop]
    
    var mincollision = 0
    if (blockleft < sidez[mincollision]){mincollision = 1}
    if (blockbottom < sidez[mincollision]){mincollision = 2}
    if (blocktop < sidez[mincollision]){mincollision = 3}

    
    if (f.x < p.x + s.width &&
        f.x + f.width > p.x &&
        f.y < p.y + s.height &&
        f.y + f.width > p.y)
        
        {
            block.onCollision()
            if (block.invincible){frog.tint = 0xFF0000 ; f.invincible = true}
            if (block.off){frog.tint = 0xFFFFFF}
            if (block.ouchie && !f.invincible){if(f.checkpoint == 0){reloadlevel()} else{f.x = cpx ; f.y = cpy 
                speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0 ; frog.tint = 0xFFFFFF}}
            if (block.collectible){s.y = 800}
            if (block.door != null){block.door.sprite.y = 800}
            if (block.launch[0] > 0) {excessSpeedXleft = 0 ; excessSpeedXright = block.launch[0]}
            if (block.launch[0] < 0) {excessSpeedXright = 0 ; excessSpeedXleft = block.launch[0]}
            if (block.launch[1] != 0) {speedY = block.launch[1]}
            if (block.bounce){speedY = 100}
            if (block.gravityup){accelY = 20 ; speedY = 45}
            if (block.gravitydown){accelY = -20 ; speedY = -45}
            if (block.launchright){excessSpeedXleft = 0 ; excessSpeedXright = 150 ; speedY = 50}
            if (block.launchleft){excessSpeedXright = 0 ; excessSpeedXleft = -150 ; speedY = 50}
            if (block.orb){if (canjumpy && movingUp && block.orbjumpsused < 1){jumpy() ; canjumpy = false ; block.orbjumpsused += 1}}
            if (block.checkpoint){if(f.checkpoint < block.cpv){f.checkpoint = block.cpv ; cpx = block.cpx ; cpy = block.cpy}}
            // if (block.swim){
            //     swimming = true;
            //     if (movingUp){accelY = 10 ; if (speedY > 20){accelY = -5}}
            //     else {accelY = -5 ; if (speedY < -15){accelY = 25}} 
            //     if (movingRight){accelX = -20 ; if(speedX < -40){accelX = 25}}
            //     else {accelX = -20 ; if (speedX > 10){accelX = 25} ; if (speedX == 0){speedX = 0}}
                
            // }
            if (block.touchable){
                if (accelY < 0){
                    if (mincollision == 0){f.x = p.x + s.width  }
                    if (mincollision == 1){f.x = p.x - f.width  }
                    if (mincollision == 2){f.y = p.y + s.height ; if (speedY > 0){speedY = -(0.5 * speedY)}}
                    if (mincollision == 3){
                        f.y = p.y - f.height ; 
                        if (speedY < 0){speedY = 0} ; 
                        if (speedY == 0 && movingUp){jumpy()} 
                        f.standingOnPosition = [p.x, p.y] 
                        f.standingOn = block; 
                    }
                }
                else {
                    if (mincollision == 0){f.x = p.x + s.width}
                    if (mincollision == 1){f.x = p.x - f.width}
                    if (mincollision == 2){
                        f.y = p.y + s.height; 
                        if (speedY > 0){speedY = 0}; 
                        if (speedY == 0 && movingUp){jumpy()}; 
                        f.standingOnPosition = [p.x, p.y] 
                        f.standingOn = block; 
                    }     
                    if (mincollision == 3){f.y = s.y - f.height ; if (speedY < 0){speedY = -(0.5 * speedY)}}
                }
            }
        } else {
            if (f.standingOn == block && Math.abs(f.y - (p.y - f.height)) > 0.2) {
                f.standingOn = null
                // ice
                if (block.ice > 0) {
                    if (speedX < 0) {
                        excessSpeedXright -= speedX
                    } else {
                        excessSpeedXleft -= speedX
                    }
                }
            }
            block.orbjumpsused = 0
        }

        if (block.baseMovementPath != null) {
            if (block.alwaysMove) {
                var perc = (((Date.now()-timer)/1000)/block.baseMovementDuration) % 1.0
                perc = block.baseMovementReverse 
                    ? (perc > 0.5 ? 1.0 - (perc - 0.5)*2 : perc * 2) 
                    : perc
    
                var newPos = block.baseMovementPath.getPosition(perc)
                s.x = newPos[0]
                s.y = newPos[1]
            } else if (block.movementStartTime != -1) {
                var perc = (((Date.now()-block.movementStartTime)/1000)/block.baseMovementDuration)
                perc = Math.min(perc, 1)
                perc = block.baseMovementReverse 
                    ? (perc > 0.5 ? 1.0 - (perc - 0.5)*2 : perc * 2) 
                    : perc
                var newPos = block.baseMovementPath.getPosition(perc)
                s.x = newPos[0]
                s.y = newPos[1]
            }
        }
        
}

var handlePlayerCollision = (p)=>{
    var s = p

    var blockright = Math.abs(f.x - s.x - s.width)
    var blockleft = Math.abs(f.x + f.width - s.x)
    var blockbottom = Math.abs(f.y - s.y - s.height)
    var blocktop = Math.abs(f.y + f.width - s.y)
    var sidez = [blockright, blockleft, blockbottom, blocktop]
    
    var mincollision = 0
    if (blockleft < sidez[mincollision]){mincollision = 1}
    if (blockbottom < sidez[mincollision]){mincollision = 2}
    if (blocktop < sidez[mincollision]){mincollision = 3}

    
    if (f.x < s.x + s.width &&
        f.x + f.width > s.x &&
        f.y < s.y + s.height &&
        f.y + f.width > s.y)
        {
            //p.onCollision()
            if (true) { //p.touchable
                if (accelY < 0){
                    if (mincollision == 0){f.x = s.x + s.width}
                    if (mincollision == 1){f.x = s.x - f.width}
                    if (mincollision == 2){f.y = s.y + s.height ; if (speedY > 0){speedY = -(0.5 * speedY)}}
                    if (mincollision == 3){f.y = s.y - f.height ; if (speedY < 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}; frog.standingOn = s;}
                }
                else {
                    if (mincollision == 0){f.x = s.x + s.width}
                    if (mincollision == 1){f.x = s.x - f.width}
                    if (mincollision == 2){f.y = s.y + s.height ; if (speedY > 0){speedY = 0} ; if (speedY == 0 && movingUp){jumpy()}; frog.standingOn = s;}     
                    if (mincollision == 3){f.y = s.y - f.height ; if (speedY < 0){speedY = -(0.5 * speedY)}}
                }
            }
        }
}



var loadlevel1 = ()=>{
    // spawn / finish
    spawnx = 50 ; spawny = 620 ; finishx = 4070 ; finishy = 670 ; started = false ; finished = false
    // frog
    f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0x009600 ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0
    // timer
    timerdisplay.y = 0 ; timerdisplay.text = "0.000"
    //

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
    // spawn / finish
    spawnx = 50 ; spawny = 620 ; finishx = 4070 ; finishy = 670 ; started = false ; finished = false
    // frog
    f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0x009600 ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0
    // timer
    timerdisplay.y = 0 ; timerdisplay.text = "0.000"
    //

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

    var loadlevel3 = ()=>{
    // spawn / finish
    spawnx = 50 ; spawny = 620 ; finishx = 4070 ; finishy = 670 ; started = false ; finished = false
    // frog
    f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0xFFFFFF ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0 ; currentlevelbackground = levelbackgrounds[0]
    // timer
    timerdisplay.y = 0 ; timerdisplay.text = "0.000" ; timerdisplay.tint = 0x000000
    //

    // floor/wall
    makeblock(0,670,10000,100,0x7C9082)
    makeblock(0,-1000,50,2000,0x7C9082)
    makeblock(4230,-1000,50,2000,0x7C9082)

    // first blocks
    spikeblock(500,650,100,20,0xF87575)

    layoutblock(600,570,210,100)

    spikeblock(950,590,20,70,0xF87575)

    layoutblock(810,470,280,200)

    textureover(600,470,490,200,textures[1])

    spikeblock(1020,450,70,20,0xF87575)
    
    // second blocks

    spikeblock(1090,650,140,20,0xF87575)

    layoutblock(1230,500,350,170)

    spikeblock(1370,480,140,20,0xF87575)

    layoutblock(1405,550,455,120)

    textureover(1230,500,630,170,textures[2])

    spikeblock(1680,620,70,20,0xF87575)

    // third blocks

    spikeblock(1860,650,140,20,0xF87575)

    layoutblock(2225,100,210,570,0)

    layoutblock(2105,350,210,320,0)
  
    layoutblock(2000,450,195,220,0)

    textureover(2000,100,435,570,textures[3])

    launchleftblock(2210,170,15,50,0x8FADDC)

    spikeblock(2275,80,70,20,0xF87575)

    // fourth blocks

    layoutblock(1600,230,140,70)
    textureover(1600,230,140,70,textures[4])

    layoutblock(1330,200,140,70)
    textureover(1330,200,140,70,textures[8])

    layoutblock(1060,215,140,70)
    textureover(1060,215,140,70,textures[5])
    
    orbblock(870,115,50,50,0xFFFF00)
    // layoutblock(825,115,140,70,0.2)
    // textureover(825,115,140,70,textures[9])


    layoutblock(530,80,140,70)
    textureover(530,80,140,70,textures[6])

    layoutblock(290,110,140,70)
    textureover(290,110,140,70,textures[10])

    layoutblock(50,20,140,70)
    textureover(50,20,140,70,textures[7])

    bounceblock(50,5,50,15,0x8FADDC)
    launchrightblock(50,-275,15,50,0x8FADDC)

    // third height

    layoutblock(430,-200,230,70,0)
    layoutblock(640,-270,70,90,0)
    textureover(430,-270,280,140,textures[11])

    

    makeblock(900,-330,280,20,0xEDEEC0)
    makeblock(900,-330,20,70,0xEDEEC0)
    makeblock(900,-330+50,280,20,0xEDEEC0)
    makeblock(900+260,-330,20,70,0xEDEEC0)
    makeblock(900+280,-330-70,20,210,0x104911)
    makeblock(900+280,-330-70,70,20,0x104911)
    makeblock(900+280,-330-70+190,70,20,0x104911)
    makeblock(900+280+50,-330-70,20,210,0x104911)

    spikeblock(900+280-50,-330-20+90,50,20,0xF87575)
    

    makeblock(1380+190-40,-320,220,20,0x104911)
    makeblock(1380+190-40,-330-70+120-40,20,100,0x104911)
    makeblock(1380+190-40+20,-330-70+120-40+80,220-40,20,0x104911)
    makeblock(1380+190-40+200,-330-70+120-40,20,100,0x104911)

    makeblock(1380,-330-70,210,20,0xEDEEC0)
    makeblock(1380+20,-330-70+120,210-20,20,0xEDEEC0)
    makeblock(1380,-330-70,20,140,0xEDEEC0)
    makeblock(1380+190,-330-70,20,140,0xEDEEC0)

    orbblock(2030,-360,50,50,0xFFFF00)
    checkpointblock(2345,-600,210,400,0,2425,-250,1)
    
    textureover(2350,-300,66,100,textures[12])
    cpflags.push(blox[blox.length - 1])

    layoutblock(2345,-200,210,870,1,0xFFFFFF)



    // layoutblock()



    // var movp = new PKPath([[2200, -100], [2200, -300], [2400, -300], [2400, -100], [2200, -100]])
    // movp.percfunc = movp.easeInAndOutPosition(2)
    // makeblock(50,20,140,20,0x104911)
    // blox[blox.length - 1].baseMovementPath = movp
    // blox[blox.length - 1].baseMovementReverse = false
    



    }

    var loadlevel4 = ()=>{
        // spawn / finish
        spawnx = 50 ; spawny = 620 ; finishx = 4070 ; finishy = 670 ; started = false ; finished = false
        // frog
        f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0xFFFFFF ; //var invinciblefrog.tintforlevel = 0xFFFFFF
        // camera
        cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0
        // timer
        timerdisplay.y = 0 ; timerdisplay.text = "0.000"
        //
        // floor/wall
        makeblock(0,670,10000,100,0x7C9082)
        makeblock(0,-1000,50,2000,0x7C9082)
        makeblock(4230,-1000,50,2000,0x7C9082)

        // first blocks
        iceblock(460,590,1400,80,0x89CFF0)
        makeblock(460,590-90-70,1400,80,0xFFFFFF)

    }

    var loadlevel5 = ()=>{
        // spawn / finish
        spawnx = 50 ; spawny = 620 ; finishx = 4070 ; finishy = 670 ; started = false ; finished = false
        // frog
        f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0xFFFFFF ; //var invinciblefrog.tintforlevel = 0xFFFFFF
        // camera
        cameraleft = 0 ; cameraright = -3000 ; cameratop = 720 ; camerabot = 0
        // timer
        timerdisplay.y = 0 ; timerdisplay.text = "0.000"
        //
    }


var unloadlevel = ()=>{
terrain.children = []
blox = []
}

var reloadlevel = ()=>{
    f = new DKplayer()
    unloadlevel()
    if (worldCode == 'levelpond') {
        loadleveldapond()
    } else {
        if (menu.levelbuttons[0].y == 4000){loadlevel1()}
        if (menu.levelbuttons[1].y == 4000){loadlevel2()}
        if (menu.levelbuttons[2].y == 4000){loadlevel3()}
        if (menu.levelbuttons[3].y == 4000){loadlevel4()}
        if (menu.levelbuttons[4].y == 4000){loadlevel5()}
    }

}

console.log("booty butt cheeks!")