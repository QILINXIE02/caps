const { Server } = require('socket.io');

require("dotenv").config();

const server = new Server();
const caps = server.of("/caps");
const PORT=process.env.PORT || 3002;

caps.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Listen for 'pickup' event from vendors
    socket.on('pickup', (order) => {
        // Emit 'pickup' event to all sockets except the sender
        socket.broadcast.emit('pickup', order);
        // Log the event
        console.log(`pickup: ${JSON.stringify(order)}`);
    });

    // Listen for 'in-transit' event from drivers
    socket.on('in-transit', (order) => {
        // Log the event
        console.log(`in-transit: ${JSON.stringify(order)}`);
    });

    // Listen for 'delivered' event from drivers
    socket.on('delivered', (order) => {
        // Log the event
        console.log(`delivered: ${JSON.stringify(order)}`);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

caps.on('listening', () => {
    console.log(`Socket.io server running on port ${PORT}`);
});

server.listen(PORT);

// const { Server } = require('socket.io');
// const http = require('http');
// // const events = require('./events');
// const logger = require('./logger'); 

// const server = http.createServer();
// const io = new Server(server, {
//     path: '/caps',
//     cors: {
//         origin: '*',
//     },
// });

// io.on('connection', (socket) => {
//     console.log(`Client connected: ${socket.id}`);
    
//     // Listen for 'pickup' event from vendors
//     socket.on('pickup', (order) => {
//         // Emit 'pickup' event to all sockets except the sender
//         socket.broadcast.emit('pickup', order);
//         // Log the event
//         logger('pickup', order);
//     });

//     // Listen for 'in-transit' event from drivers
//     socket.on('in-transit', (order) => {
//         // Log the event
//         logger('in-transit', order);
//     });

//     // Listen for 'delivered' event from drivers
//     socket.on('delivered', (order) => {
//         // Log the event
//         logger('delivered', order);
//     });

//     // Handle client disconnect
//     socket.on('disconnect', () => {
//         console.log(`Client disconnected: ${socket.id}`);
//     });
// });

// // Log server start
// server.on('listening', () => {
//     console.log(`Socket.io server running on port ${server.address().port}`);
// });

// module.exports = server;
