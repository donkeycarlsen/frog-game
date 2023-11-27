class DKConnection {
    socket = null

    playerName = 'Frog'

    levelElements = undefined
    otherFrogs = []

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
            // console.log(`Received message from server: ${frogs}`);
            this.otherFrogs = frogs
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
        this.levelElements.children = this.levelElements.children.map((f, find) => {
            f.x = this.otherFrogs[find].pos[0]
            f.y = this.otherFrogs[find].pos[1]
            f.tint = this.otherFrogs[find].col
            f.children[0].text = this.otherFrogs[find].usr
            return f
        })
    }

    sendPosition = (xpos, ypos, xvel, yvel) => {
        this.socket.emit('frog', xpos, ypos, xvel, yvel);
    }
}