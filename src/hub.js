const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = new Server();
const caps = server.of("/caps");

const driverQueue = {};
const vendorQueue = {}; 

caps.on('connection', (socket) => {
  // Log client connection only if not in a testing environment
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Client connected: ${socket.id}`);
  }

  const connectedClients = new Set();
  connectedClients.add(socket.id);

  const removeDisconnectedClient = () => {
    connectedClients.delete(socket.id);
  };

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    removeDisconnectedClient(); 
  });

  socket.on('subscribe', (data) => {
    const { queue, vendorName } = data;
    if (queue === 'pickup' && !driverQueue[vendorName]) {
      driverQueue[vendorName] = [];
    } else if (queue === 'delivered' && !vendorQueue[vendorName]) {
      vendorQueue[vendorName] = [];
    }
  });

  socket.on('pickup', (order) => {
    const vendorName = order.storeName;
    if (driverQueue[vendorName]) {
      driverQueue[vendorName].push(order);
    }
    socket.broadcast.emit('pickup', order);
  });

  socket.on('delivered', (order) => {
    const vendorName = order.storeName;
    if (vendorQueue[vendorName]) {
      vendorQueue[vendorName].push(order);
    }
    socket.broadcast.emit('delivered', order);
  });

  socket.on('in-transit', (order) => {
    console.log(`in-transit: ${JSON.stringify(order)}`);
  });

  socket.on('getAll', (data) => {
    const { queue } = data;
    const messages = queue === 'pickup' ? driverQueue[socket.id] || [] : vendorQueue[socket.id] || [];
    socket.emit('getAll', { messages });
  });

  socket.on('received', (data) => {
    const messageId = data.messageId;
    const queueName = messageId.startsWith('pickup') ? 'pickup' : 'delivered'; 
    const messageIndex = (queue === 'pickup' ? driverQueue[socket.id] : vendorQueue[socket.id]).findIndex((msg) => msg.id === messageId);
    if (messageIndex !== -1) {
      (queue === 'pickup' ? driverQueue[socket.id] : vendorQueue[socket.id]).splice(messageIndex, 1);
    }
  });
});

caps.on('listening', () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

server.listen(PORT);
