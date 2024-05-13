'use strict';

const event = require('./events');
const faker = require('faker');
const { v4: uuid } = require('uuid');

require('dotenv').config();

function simulateOrder() {
    const order = {
        orderId: uuid(),
        storeName: process.env.STORE,
        customerName: faker.name.findName(),
        address: faker.address.streetAddress(),
    };
    event.emit('pickup', order);
}

const interval = setInterval(simulateOrder, 5000);

function deliverHandler(order) {
    console.log(`VENDOR: Thank you for delivering ${order.orderId}`);
}

event.on('delivered', deliverHandler);
