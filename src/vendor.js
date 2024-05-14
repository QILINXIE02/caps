const io = require('socket.io-client');

require('dotenv').config();

const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
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
