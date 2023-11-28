class DKmenu {
    container = null
    buttons = []
    levelbuttons = []
    backgrounds = []
    other = []

    constructor(container){
        this.container = container
        this.container.interactiveChildren = true
    }

    loadbackground = ()=>{
        const menubackground = new PIXI.Sprite.from('src/assets/menubg.png')
        menubackground.x = 0
        menubackground.y = 0
        menubackground.zIndex = 0
        menubackground.width = 1280
        menubackground.height = 720
        menubackground.tint = 0xFFFFFF
        menubackground.interactive = false
        this.container.addChild(menubackground)
        this.backgrounds.push(menubackground)
    }

    loadmainmenu = ()=>{       
        const title = new PIXI.Sprite.from('src/assets/title.png')
        title.x = 160
        title.y = 100
        title.zIndex = 0
        title.width = 960
        title.height = 300
        title.tint = 0xFFFFFF
        title.interactive = false
        this.container.addChild(title)
        this.other.push(title)
        
        const playbutton = new PIXI.Sprite.from('src/assets/playbutton.png')
        playbutton.x = 440
        playbutton.y = 400
        playbutton.zIndex = 0
        playbutton.width = 400
        playbutton.height = 200
        playbutton.tint = 0xFFFFFF
        playbutton.interactive = true
        this.container.addChild(playbutton)
        this.buttons.push(playbutton)
    }

    loadsecondmenu = ()=>{
        const singleplayerbutton = new PIXI.Sprite.from('src/assets/singleplayerbutton.png')
        singleplayerbutton.x = 110
        singleplayerbutton.y = 150
        singleplayerbutton.zIndex = 0
        singleplayerbutton.width = 300
        singleplayerbutton.height = 420
        singleplayerbutton.tint = 0xFFFFFF
        singleplayerbutton.interactive = true
        this.container.addChild(singleplayerbutton)
        this.buttons.push(singleplayerbutton)

        const multiplayerbutton = new PIXI.Sprite.from('src/assets/multiplayerbutton.png')
        multiplayerbutton.x = 490
        multiplayerbutton.y = 150
        multiplayerbutton.zIndex = 0
        multiplayerbutton.width = 300
        multiplayerbutton.height = 420
        multiplayerbutton.tint = 0xFFFFFF
        multiplayerbutton.interactive = true
        this.container.addChild(multiplayerbutton)
        this.buttons.push(multiplayerbutton)


        const avatarbutton = new PIXI.Sprite.from('src/assets/avatarbutton.png')
        avatarbutton.x = 870
        avatarbutton.y = 150
        avatarbutton.zIndex = 0
        avatarbutton.width = 300
        avatarbutton.height = 420
        avatarbutton.tint = 0xFFFFFF
        avatarbutton.interactive = true
        this.container.addChild(avatarbutton)
        this.buttons.push(avatarbutton)
    }

    loadsingleplayermenu = ()=>{
        const level1button = new PIXI.Sprite.from('src/assets/level1button.png')
        level1button.x = 80
        level1button.y = 150
        level1button.zIndex = 0
        level1button.width = 160
        level1button.height = 160
        level1button.tint = 0xFFFFFF
        level1button.interactive = true
        this.container.addChild(level1button)
        this.levelbuttons.push(level1button)

        const level2button = new PIXI.Sprite.from('src/assets/level2button.png')
        level2button.x = 320
        level2button.y = 150
        level2button.zIndex = 0
        level2button.width = 160
        level2button.height = 160
        level2button.tint = 0xFFFFFF
        level2button.interactive = true
        this.container.addChild(level2button)
        this.levelbuttons.push(level2button)

        const level3button = new PIXI.Sprite(PIXI.Texture.WHITE)
        level3button.x = 560
        level3button.y = 150
        level3button.zIndex = 0
        level3button.width = 160
        level3button.height = 160
        level3button.tint = 0xFFFFFF
        level3button.interactive = true
        this.container.addChild(level3button)
        this.levelbuttons.push(level3button)

        const level4button = new PIXI.Sprite(PIXI.Texture.WHITE)
        level4button.x = 800
        level4button.y = 150
        level4button.zIndex = 0
        level4button.width = 160
        level4button.height = 160
        level4button.tint = 0xFFFFFF
        level4button.interactive = true
        this.container.addChild(level4button)
        this.levelbuttons.push(level4button)

        const level5button = new PIXI.Sprite(PIXI.Texture.WHITE)
        level5button.x = 1040
        level5button.y = 150
        level5button.zIndex = 0
        level5button.width = 160
        level5button.height = 160
        level5button.tint = 0xFFFFFF
        level5button.interactive = true
        this.container.addChild(level5button)
        this.levelbuttons.push(level5button)


    }

    loadmultiplayermenu = ()=>{
        const level1button = new PIXI.Sprite.from('src/assets/level1button.png')
        level1button.x = 80
        level1button.y = 150
        level1button.zIndex = 0
        level1button.width = 160
        level1button.height = 160
        level1button.tint = 0xFFFFFF
        level1button.interactive = true
        this.container.addChild(level1button)
        this.levelbuttons.push(level1button)

        const level2button = new PIXI.Sprite.from('src/assets/level2button.png')
        level2button.x = 320
        level2button.y = 150
        level2button.zIndex = 0
        level2button.width = 160
        level2button.height = 160
        level2button.tint = 0xFFFFFF
        level2button.interactive = true
        this.container.addChild(level2button)
        this.levelbuttons.push(level2button)

        const level3button = new PIXI.Sprite(PIXI.Texture.WHITE)
        level3button.x = 560
        level3button.y = 150
        level3button.zIndex = 0
        level3button.width = 160
        level3button.height = 160
        level3button.tint = 0xFFFFFF
        level3button.interactive = true
        this.container.addChild(level3button)
        this.levelbuttons.push(level3button)

        const level4button = new PIXI.Sprite(PIXI.Texture.WHITE)
        level4button.x = 800
        level4button.y = 150
        level4button.zIndex = 0
        level4button.width = 160
        level4button.height = 160
        level4button.tint = 0xFFFFFF
        level4button.interactive = true
        this.container.addChild(level4button)
        this.levelbuttons.push(level4button)

        const level5button = new PIXI.Sprite(PIXI.Texture.WHITE)
        level5button.x = 1040
        level5button.y = 150
        level5button.zIndex = 0
        level5button.width = 160
        level5button.height = 160
        level5button.tint = 0xFFFFFF
        level5button.interactive = true
        this.container.addChild(level5button)
        this.levelbuttons.push(level5button)
    }
}