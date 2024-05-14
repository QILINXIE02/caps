const { pickup, inTransit, delivered } = require('../src/events');
jest.mock('socket.io');

test('pickup handler should broadcast pickup event to all sockets except the sender', () => {
    const order = {
        address: "test-address",
        customerName: "test-customer",
        orderId: "test-order-id",
        storeName: "test-store"
    };

    const mockIo = { // Mocked io object
        broadcast: { emit: jest.fn() }, // Define broadcast object with emit method
        to: jest.fn().mockReturnThis() // Mock to to return itself
    };

    pickup(order, mockIo); // Pass the mocked io as argument

    expect(mockIo.broadcast.emit).toHaveBeenCalledWith('pickup', order);
});

test('inTransit handler should emit in-transit event to appropriate room', () => {
    const order = {
        address: "test-address",
        customerName: "test-customer",
        orderId: "test-order-id",
        storeName: "test-store"
    };

    const mockIo = { to: jest.fn().mockReturnThis(), emit: jest.fn() }; // Mock io with to and emit

    inTransit(order, mockIo);

    expect(mockIo.to).toHaveBeenCalledWith(order.storeName);
    expect(mockIo.emit).toHaveBeenCalledWith('in-transit', order);
});

test('delivered handler should emit delivered event to appropriate room', () => {
    const order = {
        address: "test-address",
        customerName: "test-customer",
        orderId: "test-order-id",
        storeName: "test-store"
    };

    const mockIo = { to: jest.fn().mockReturnThis(), emit: jest.fn() }; // Mock io with to and emit

    delivered(order, mockIo);

    expect(mockIo.to).toHaveBeenCalledWith(order.storeName);
    expect(mockIo.emit).toHaveBeenCalledWith('delivered', order);
});
