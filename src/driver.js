'use strict';

const event = require('./events');

function pickupHandler(order) {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${order.orderId}`);
        event.emit('in-transit', order);
    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered up ${order.orderId}`);
        event.emit('delivered', order); 
    }, 4000);
}

event.on('pickup', pickupHandler);
