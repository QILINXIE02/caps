'use strict';

const { Server } = require('socket.io');
const http = require('http');
const { v4: uuid } = require('uuid');
const faker = require('faker');

const socketServer = require('../src/socketServer');
const event = require('../src/events');

let io;

// Mock the socket server for testing
beforeEach(() => {
  const server = http.createServer();
  io = new Server(server, {
    path: '/caps',
    cors: {
      origin: '*',
    },
  });
  socketServer.attach(server);
});

describe('Event Handler Tests', () => {
  let order;

  beforeEach(() => {
    order = {
      orderId: uuid(),
      storeName: 'INDEX', // Mocked store name for testing
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
  });

  test('pickup handler should emit event to all sockets except sender', () => {
    const mockSocket = { broadcast: { emit: jest.fn() } };
    io.emit = jest.fn();
    
    event.emit('pickup', order, mockSocket);

    expect(io.emit).toHaveBeenCalledWith('pickup', order);
    expect(mockSocket.broadcast.emit).toHaveBeenCalledWith('pickup', order);
  });

  test('in-transit handler should emit event to appropriate room', () => {
    const mockSocket = { join: jest.fn(), emit: jest.fn() };
    io.socketsJoin = jest.fn();

    event.emit('in-transit', order, mockSocket);

    expect(io.socketsJoin).toHaveBeenCalledWith(order.storeName);
    expect(mockSocket.emit).toHaveBeenCalledWith('in-transit', order);
  });

  test('delivered handler should emit event to appropriate room', () => {
    const mockSocket = { join: jest.fn(), emit: jest.fn() };
    io.socketsJoin = jest.fn();

    event.emit('delivered', order, mockSocket);

    expect(io.socketsJoin).toHaveBeenCalledWith(order.storeName);
    expect(mockSocket.emit).toHaveBeenCalledWith('delivered', order);
  });
});
