const io = require('socket.io-client');

require('dotenv').config();
const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
    console.log(`Driver connected: ${socket.id}`);
});

socket.on('pickup', (order) => {
    console.log(`DRIVER: picked up order ${order.orderId}`);
    setTimeout(() => {
        console.log(`DRIVER: order ${order.orderId} in transit`);
        socket.emit('in-transit', order);
    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered order ${order.orderId}`);
        socket.emit('delivered', order);
    }, 2000);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

socket.on('error', (err) => {
    console.error('Socket error:', err);
});
