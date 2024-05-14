const io = require('socket.io-client');

require('dotenv').config();

const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
  console.log(`Vendor connected: ${socket.id}`);
  const interval = setInterval(() => {
    const order = {
      orderId: Math.floor(Math.random() * 100000) + 1, 
      storeName: process.env.STORE,
      customerName: "Sample Customer", 
      address: "Sample Address", 
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