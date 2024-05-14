const fs = require('fs');

const logFile = 'caps.log';

function log(eventType, order) {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] ${eventType}: ${JSON.stringify(order)}`;

    // Append the message to the log file
    fs.appendFile(logFile, message + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = log;
