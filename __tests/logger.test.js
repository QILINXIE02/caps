'use strict';
const uuid = require('uuid').v4;
const faker = require('faker');
const event = require('../src/events');

let store = (process.env.STORE||'INDEX');

require('../src/driver');
require('../src/vendor');
require('../src/logger');

describe('event handler tests', () => {
    
    beforeEach(()=>{
        jest.useFakeTimers();
        jest.spyOn(global.console,'log');
      })
    let order = {
        orderId: uuid(),
        storeName: process.env.STORE,
        customerName: faker.name.findName(),
        address:faker.address.streetAddress(),
    }
    test('pick up handler test',() => {
        event.emit('pickup',order)
        jest.runAllTimers();
        expect(console.log).toHaveBeenCalled();
    })
    test('delivered handler test',() => {
        event.emit('delivered',order)
        expect(console.log).toHaveBeenCalled();
    })
    test('in-transit handler test',() => {
        event.emit('in-transit',order)
        jest.runAllTimers();
        expect(console.log).toHaveBeenCalled();
    })
    
})