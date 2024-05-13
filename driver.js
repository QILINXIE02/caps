'use strict';

const event =require('./events')

event.on('pickup',pickupHandler)
function pickupHandler(order){

    setTimeout(()=>{

        console.log(`DRIVER: picked up ${order.orderId}`)

        event.emit('in-transit',order)
    },1000)

    setTimeout(()=>{
        
        console.log(`DRIVER: delivered up ${order.orderId}`)
        event.emit('dileverd', order)
    },4000)
}