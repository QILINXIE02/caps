const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
    console.log(`Driver connected: ${socket.id}`);
});

socket.on('pickup', (order) => {
    console.log(`DRIVER: picked up ${order.orderId}`);
    setTimeout(() => {
        socket.emit('in-transit', order);
    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered up ${order.orderId}`);
        socket.emit('delivered', order);
    }, 4000);
});
