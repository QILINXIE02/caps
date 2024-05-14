'use strict';

const io = require('./socketServer');
const faker = require('faker');
const { v4: uuid } = require('uuid');

require('dotenv').config();

io.on('connect', (socket) => {
    console.log(`Vendor connected: ${socket.id}`);
    const interval = setInterval(() => {
        const order = {
            orderId: uuid(),
            storeName: process.env.STORE,
            customerName: faker.name.findName(),
            address: faker.address.streetAddress(),
        };
        socket.emit('pickup', order);
    }, 5000);

    socket.on('delivered', (order) => {
        console.log(`VENDOR: Thank you for delivering ${order.orderId}`);
    });

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log(`Vendor disconnected: ${socket.id}`);
    });
});
