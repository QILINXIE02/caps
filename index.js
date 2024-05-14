'use strict';

const http = require('http');
const io = require('./src/socketServer'); // Import your Socket.io server instance
const PORT = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer();

// Attach the Socket.io server to the HTTP server
io.attach(server);

// Start listening on the designated port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
