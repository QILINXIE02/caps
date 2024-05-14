
// 'use strict';

// const io = require('socket.io-client');

// // const URL = 'http://localhost:3000';
// const URL = 'https://brain-c3y4.onrender.com';

// const brainConnection = io.connect(URL);

// brainConnection.on('brightness', payload => {
//   if ( payload.brightness > 75 ) {
//     console.log("Sqinting");
//   }
// });

// brainConnection.on('brightness', payload => {
//   if ( payload.brightness > 50 ) {
//     console.log("Covering our face");
//   }
// });

// setInterval(() => {
//   brainConnection.emit('light', {brightness: Math.floor(Math.random() * 100)});
// }, 1000);