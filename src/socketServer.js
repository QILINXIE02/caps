const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
    path: '/caps',
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

module.exports = io;
