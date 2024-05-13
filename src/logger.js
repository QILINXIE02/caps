'use strict';

const event = require('./events');

event.on('pickup', order => logIt('pickup', order));
event.on('in-transit', order => logIt('in-transit', order));
event.on('delivered', order => logIt('delivered', order)); 


function logIt(event, order) {
    console.log('EVENT:', { event, time: new Date().toLocaleString(), order });
}
