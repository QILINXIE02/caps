'use strict';

const event = require('../src/events');
const logger = require('../src/logger');

jest.spyOn(console, 'log');

describe('Logger Tests', () => {
  let order;

  beforeEach(() => {
    order = {
      orderId: '123',
      storeName: 'INDEX', // Mocked store name for testing
      customerName: 'John Doe',
      address: '123 Main St',
    };
  });

  test('logIt function should log event with expected arguments', () => {
    logger.logIt('pickup', order);
    
    expect(console.log).toHaveBeenCalledWith(
      'EVENT:',
      expect.objectContaining({ event: 'pickup', order })
    );
  });
});
