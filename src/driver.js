const io = require('socket.io-client');
require('dotenv').config();
const chance = require('chance'); 

const socket = io.connect(`http://localhost:${process.env.PORT}/caps`);

const c = new chance();

socket.on('connect', () => {
  console.log(`Driver connected: ${socket.id}`);

  const vendorName = c.name();

  socket.emit('subscribe', { queue: 'pickup', vendorName });

  socket.on('pickup', (order) => {
    console.log(`DRIVER: picked up order ${order.orderId}`);
    setTimeout(() => {
      console.log(`DRIVER: order ${order.orderId} in transit`);
      socket.emit('in-transit', order);
    }, 1000);

    setTimeout(() => {
      console.log(`DRIVER: delivered order ${order.orderId}`);
      socket.emit('delivered', order);
    }, 1000);
  });

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});
