lilypad = (x) => {
    makeblock(x,680,80,12,0x00cc00)
    blox[blox.length - 1].sprite.zIndex = -10
    var bpath = new PKPath([[x, 680],[x,920]])
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false
    blox[blox.length - 1].moveOnCollision = true
    blox[blox.length - 1].baseMovementDuration = 3.0
    blox[blox.length - 1].launch = [0, 100]
    return blox[blox.length - 1]
}

loadleveldapond = () => {
    spawnx = 50 ; spawny = 620 ; finishx = 5570 ; finishy = 670 ; started = false ; finished = false
    // frog
    f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0xFFFFFF ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 0 ; cameraright = -10000 ; cameratop = 720 ; camerabot = 0 ; currentlevelbackground = levelbackgrounds[0]
    // timer
    timerdisplay.y = 0 ; timerdisplay.text = "0.000" ; timerdisplay.tint = 0x000000
    //

    // floor/wall/pond
    makeblock(0,670,800,100,0x7C9082)
    makeblock(0,-1000,50,2000,0x7C9082)
    makeblock(2600,670,800,100,0x7C9082)
    //makeblock(4230,-1000,50,2000,0x7C9082)

    // first blocks
    spikeblock(800,690,1800,400,0x00aadd)

    //button
    makeblock(500,650,100,100,0xffaaaa)
    blox[blox.length - 1].sprite.parent.sortableChildren = true
    blox[blox.length - 1].sprite.zIndex = -10
    blox[blox.length - 1].sprite.sortableChildren = true
    var bpath = new PKPath([[500, 650],[500,720],[500, 650]])
    bpath.positions[1].startPercent = 0.1
    bpath.positions[2].startPercent = 1.0
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false
    blox[blox.length - 1].moveOnCollision = true
    blox[blox.length - 1].baseMovementDuration = 4.0
    

    //logs
    var l1 = makeblock(920,800,300,60,0x66310a)
    blox[blox.length - 1].sprite.zIndex = -10
    bpath = new PKPath([[920, 800],[920,500],[920, 800]])
    bpath.positions[1].percfunc = bpath.easeOutPosition(3)
    bpath.positions[2].percfunc = bpath.easeInPosition(3)
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false
    blox[blox.length - 1].baseMovementDuration = 2

    var l2 = makeblock(1320,800,300,60,0x66310a)
    blox[blox.length - 1].sprite.zIndex = -10
    bpath = new PKPath([[1320, 800],[1320, 800],[1320,500],[1320, 800]])
    bpath.positions[2].percfunc = bpath.easeOutPosition(3)
    bpath.positions[3].percfunc = bpath.easeInPosition(3)
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].baseMovementDuration = 2 + (.666*1)
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false

    var l3 = makeblock(1720,800,300,60,0x66310a)
    blox[blox.length - 1].sprite.zIndex = -10
    bpath = new PKPath([[1720, 800],[1720, 800],[1720, 800],[1720,500],[1720, 800]])
    bpath.positions[3].percfunc = bpath.easeOutPosition(3)
    bpath.positions[4].percfunc = bpath.easeInPosition(3)
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].baseMovementDuration = 2 + (.666*2)
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false

    var l4 = makeblock(2120,800,80,80,0x66310a)
    blox[blox.length - 1].sprite.zIndex = -10
    bpath = new PKPath([[2120, 800],[2120, 800],[2120, 800],[2120, 800],[2120,500],[2120, 800]])
    bpath.positions[4].percfunc = bpath.easeOutPosition(3)
    bpath.positions[5].percfunc = bpath.easeInPosition(3)
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false
    blox[blox.length - 1].baseMovementDuration = 2 + (.666*3)
    var l5 = makeblock(2130,790,60,10,0x8FADDC)
    blox[blox.length - 1].sprite.zIndex = -10
    blox[blox.length - 1].launch = [0,150]
    bpath = new PKPath([[2130, 790],[2130, 790],[2130, 790],[2130, 790],[2130,490],[2130, 790]])
    bpath.positions[4].percfunc = bpath.easeOutPosition(3)
    bpath.positions[5].percfunc = bpath.easeInPosition(3)
    blox[blox.length - 1].baseMovementPath = bpath
    blox[blox.length - 1].alwaysMove = false
    blox[blox.length - 1].baseMovementReverse = false
    blox[blox.length - 1].baseMovementDuration = 2 + (.666*3)


    blox[blox.length - 6].onCollisionExtra = () => {
        l1.movementStartTime = Date.now()
        l2.movementStartTime = Date.now()
        l3.movementStartTime = Date.now()
        l4.movementStartTime = Date.now()
        l5.movementStartTime = Date.now()
    }

    makeblock(2320,100,80,80,0x66310a)
    makeblock(2400,110,10,60,0x8FADDC)
    blox[blox.length - 1].launch = [150,50]

    //second pond:
    spikeblock(3400,690,1800,50,0x00aadd)
    blox[blox.length - 1].ouchie = false
    blox[blox.length - 1].touchable = false
    spikeblock(3400,740,1800,300,0x00aadd)

    for (var lp = 0; lp < 8; lp++) {
        lilypad(3500 + lp*150)
    }

    var lil1 = lilypad(4700)
    blox[blox.length - 1].sprite.y += 500
    var lil2 = lilypad(4850)
    blox[blox.length - 1].sprite.y += 500
    var lil3 = lilypad(5000)
    blox[blox.length - 1].sprite.y += 500

    makeblock(4450,400,15,15,0x000000)
    blox[blox.length - 1].touchable = false
    blox[blox.length - 1].touchCount = 0
    blox[blox.length - 1].onCollisionExtra = (block) => {
        block.touchCount += 1
        block.sprite.x -= 300
        if (block.touchCount >= 3) {
            block.sprite.y += 1000 //donkey guey
            lil1.sprite.y -= 500
            lil2.sprite.y -= 500
            lil3.sprite.y -= 500
        }
    }

    makeblock(5200,670,1200,100,0x7C9082)
}