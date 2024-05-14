'use strict';

const logIt = (event, order) => {
    console.log('EVENT:', { event, time: new Date().toLocaleString(), order });
};

module.exports = logIt;
