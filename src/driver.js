'use strict';
const io = require('./socketServer');

io.on('pickup', (order) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${order.orderId}`);
        io.emit('in-transit', order);
    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered up ${order.orderId}`);
        io.emit('delivered', order);
    }, 4000);
});
