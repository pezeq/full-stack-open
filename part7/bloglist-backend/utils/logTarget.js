const logger = require('./logger');

class LogTarget {
    static reqError(err) {
        logger.error('Error:', {
            name: err.name,
            type: err.constructor,
            status: err.status,
            message: err.message,
            stack: err.stack,
            date: new Date(),
        });
    }
}

module.exports = { LogTarget };
