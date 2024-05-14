'use strict';
const { Server } = require('socket.io');

const pickup = (order, io) => {
    io.broadcast.emit('pickup', order);
};

const inTransit = (order, io) => {
    io.to(order.storeName).emit('in-transit', order);
};

const delivered = (order, io) => {
    io.to(order.storeName).emit('delivered', order);
};

module.exports = { pickup, inTransit, delivered };
