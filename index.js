const serverModule = require("./server").module;
const port = serverModule.port;
const PlayersQueue = require('./core/players-queue');

let socket = require("socket.io")
socket = socket({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
socket.users = {};
socket.playersQueue = new PlayersQueue(socket.users);
const server = serverModule.server(socket);
server.listen(port)
socket.listen(3002);
socket.on('connection', io => {
    const token = io.id;
    socket.send("Connected");
    io.on(token, user => {
        io.emit("salon", socket.users);
    });
})
