class DKConnection {
    socket = null

    levelElements = undefined
    otherFrogs = [[0,0]]

    constructor() {
    }

    connect = () => {
        this.socket = io('http://18.219.118.32:1111'); // Replace with your server's URL

        // Handle the connection event
        this.socket.on('connect', () => {
        // console.log('Connected to the WebSocket server');

        // Send a message to the server
        this.socket.emit('chatMessage', 'Hello, WebSocket Server!');
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
        }
        while (this.levelElements.children.length > this.otherFrogs.length) {
            this.levelElements.children = this.levelElements.children.slice(1)
        }
        this.levelElements.children = this.levelElements.children.map((f, find) => {
            f.x = this.otherFrogs[find][0]
            f.y = this.otherFrogs[find][1]
            return f
        })
    }

    sendPosition = (xpos, ypos, xvel, yvel) => {
        this.socket.emit('frog', xpos, ypos, xvel, yvel);
    }
}