class DKConnection {
    socket = null

    playerName = 'Frog'

    levelElements = undefined
    otherFrogs = []
    olderFrogs = []
    frogSpeeds = []

    lastRender = 0
    receivedLastFrogDataPacket = 0

    constructor() {
    }

    connect = () => {
        this.socket = io('http://18.219.118.32:1111'); // Replace with your server's URL

        // Handle the connection event
        this.socket.on('connect', () => {
            // console.log('Connected to the WebSocket server');

            // Send a message to the server
            this.socket.emit('chatMessage', 'Hello, WebSocket Server!');
            this.setUsername();
        });

        // Handle received messages from the server
        this.socket.on('chatMessage', (message) => {
        // console.log(`Received message from server: ${message}`);
        });

        this.socket.on('otherFrogs', (frogs) => {
            var delta = Date.now() - this.receivedLastFrogDataPacket
            // console.log(`Received message from server: ${frogs}`);
            this.olderFrogs = this.otherFrogs
            this.otherFrogs = frogs
            if (this.levelElements.children.length == this.otherFrogs.length) {
                this.frogSpeeds = this.otherFrogs.map((f, find) => {
                    return [(f.pos[0] - this.levelElements.children[find].x) * delta/1000*60, (f.pos[1] - this.levelElements.children[find].y) * delta/1000*60]
                })
            } else {
                this.frogSpeeds = new Array(this.otherFrogs.length).fill([0,0])
            }
            this.receivedLastFrogDataPacket = Date.now()
        });

        // Handle disconnection
        this.socket.on('disconnect', () => {
        // console.log('Disconnected from the WebSocket server');
        });

        var inputElement = document.getElementById("usernameInput");
    
        var ths = this
        inputElement.addEventListener("change", function() {
            ths.playerName = inputElement.value;
            console.log("Name changed to: " + ths.playerName);
            ths.setUsername()
        });
    }

    setUsername = () => {
        this.socket.emit('setUsername', this.playerName);
    }

    setColor = () => {
        this.socket.emit('setColor', '');
    }

    renderFrogs = () => {
        while (this.levelElements.children.length < this.otherFrogs.length) {
            const frog = new PIXI.Sprite(PIXI.Texture.WHITE)
            frog.tint = 0x009600
            frog.width = 50
            frog.height = 50
            frog.x = 0
            frog.y = 0
            this.levelElements.addChild(frog)

            const nametag = new PIXI.Text('FROG',{
            fill: 0xffffff,
            fontSize: 6
            })
            PIXI.settings.PRECISION_FRAGMENT = 'highp'; //this makes text looks better
            PIXI.settings.ROUND_PIXELS = true;
            nametag.x = 8
            nametag.y = -3
            nametag.anchor.set(0.5, 0.5)
            nametag.roundPixels = true
            nametag.resolution = 4
            frog.addChild(nametag)
        }
        while (this.levelElements.children.length > this.otherFrogs.length) {
            this.levelElements.children = this.levelElements.children.slice(1)
        }
        var delta = Date.now() - this.lastRender
        if (this.levelElements.children.length != this.frogSpeeds.length) {
            this.levelElements.children = this.levelElements.children.map((f, find) => {
                f.x = this.otherFrogs[find].pos[0]
                f.y = this.otherFrogs[find].pos[1]
                f.tint = this.otherFrogs[find].col
                f.children[0].text = this.otherFrogs[find].usr
                return f
            })
        } else {
            this.levelElements.children = this.levelElements.children.map((f, find) => {
                var movx = this.otherFrogs[find].pos[0] - f.x
                var movy = this.otherFrogs[find].pos[1] - f.y
                var requestedMoveDistance = Math.sqrt(Math.pow(movx, 2) + Math.pow(movy, 2))
                var spddist = Math.sqrt(Math.pow(this.frogSpeeds[find][0], 2) + Math.pow(this.frogSpeeds[find][1], 2))
                var maxmove = spddist * (delta / 1000 * 60)
                if (spddist == 0) {
                    maxmove = 10 * (delta / 1000 * 60)
                }
                if (requestedMoveDistance > 0) {
                    var moveScale = Math.min(1, maxmove/requestedMoveDistance)
                    f.x += movx*moveScale
                    f.y += movy*moveScale
                }
                f.tint = this.otherFrogs[find].col
                f.children[0].text = this.otherFrogs[find].usr
                return f
            })
        }

        this.lastRender = Date.now()
    }

    sendPosition = (worldCode, xpos, ypos, xvel, yvel) => {
        this.socket.emit('frog', worldCode, xpos, ypos, xvel, yvel);
    }
}