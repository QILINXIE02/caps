const io = require('socket.io-client');
require('dotenv').config();
const chance = require('chance'); 

const socket = io.connect('http://localhost:3000/caps');

const c = new chance(); 

socket.on('connect', () => {
  console.log(`Vendor connected: ${socket.id}`);

  const stores = process.env.STORES.split(',');

  const getRandomStore = () => stores[Math.floor(Math.random() * stores.length)];

  socket.emit('subscribe', { queue: 'delivered', storeName: getRandomStore() });

  const interval = setInterval(() => {
    const order = {
      orderId: c.integer({ min: 100000, max: 999999 }),
      storeName: getRandomStore(),
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
