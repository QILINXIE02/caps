'use strict';
const uuid = require('uuid').v4;
const faker = require('faker');
const event = require('../src/events');

require('../src/driver');
require('../src/vendor');

setTimeout=jest.fn();
describe('event handler tests', () => {

    let consoleSpy;
    beforeEach(()=>{
        consoleSpy = jest.spyOn(console,'log').mockImplementation();
      })
      afterEach(()=>{
        consoleSpy.mockRestore();
      })
    let order = {
        orderId: uuid(),
        storeName: process.env.STORE,
        customerName: faker.name.findName(),
        address:faker.address.streetAddress(),
    }
    test('pick up handler test',() => {
        event.emit('pickup',order)
        expect(setTimeout).toHaveBeenCalled();
    })
    test('delivered handler test',() => {
        event.emit('delivered',order)
        expect(consoleSpy).toHaveBeenCalled();
    })
    test('in-transit handler test',() => {
        event.emit('in-transit',order)
        expect(setTimeout).toHaveBeenCalled();
    })
    
})