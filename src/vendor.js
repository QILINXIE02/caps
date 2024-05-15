const io = require('socket.io-client');
require('dotenv').config();
const chance = require('chance');

const socket = io.connect(`http://localhost:${process.env.PORT}/caps`);

const c = new chance();

socket.on('connect', () => {
  console.log(`Vendor connected: ${socket.id}`);

  const vendorName = process.env.STORE || c.name(); 
  socket.emit('subscribe', { queue: 'delivered', vendorName });

  const interval = setInterval(() => {
    const order = {
      orderId: c.integer({ min: 100000, max: 999999 }), 
      storeName: vendorName,
      customerName: c.name(),
      address: `${c.address()} ${c.city()}`,
    };
    socket.emit('pickup', order);
  }, 1000);

  socket.on('delivered', (order) => {
    console.log(`VENDOR: Thank you for delivering ${order.orderId}`);
  });

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log(`Vendor disconnected: ${socket.id}`);
  });
});
