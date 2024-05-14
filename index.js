'use strict';

const server = require('./src/socketServer');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    // console.log(`CAPS Server running on port ${PORT}`);
});


// const { Server } = require('socket.io');
// const http = require('http');
// const events = require('./src/events');
// const logger = require('./src/logger');

// module.exports = function initializeSocketServer(io) {
//     const server = http.createServer();
//     io.attach(server); // Attach Socket.io server to HTTP server

//     io.on('connection', (socket) => {
//         console.log(`Client connected: ${socket.id}`);
        
//         // Listen for 'pickup' event from vendors
//         socket.on('pickup', (order) => {
//             // Emit 'pickup' event to all sockets except the sender
//             socket.broadcast.emit('pickup', order);
//             // Log the event
//             logger('pickup', order);
//         });

//         // Listen for 'in-transit' event from drivers
//         socket.on('in-transit', (order) => {
//             // Log the event
//             logger('in-transit', order);
//         });

//         // Listen for 'delivered' event from drivers
//         socket.on('delivered', (order) => {
//             // Emit 'delivered' event to appropriate room
//             io.to(order.storeName).emit('delivered', order);
//             // Log the event
//             logger('delivered', order);
//         });

//         // Handle client disconnect
//         socket.on('disconnect', () => {
//             console.log(`Client disconnected: ${socket.id}`);
//         });
//     });

//     return server;
// };

