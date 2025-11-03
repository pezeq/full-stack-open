const { HttpError } = require('../errors/HttpError');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.info('Inside ErrorHandler');

    if (err instanceof HttpError) {
        logger.error('Handled Error:', {
            error: err.name,
            status: err.status,
            message: err.message,
            stack: err.stack,
            date: new Date(),
        });

        return res.status(err.status).json({
            error: err.name,
            status: err.status,
            message: err.message,
        });
    }

    logger.info('Unhandled Error:', {
        error: err.name,
        status: err.status,
        message: err.message,
        stack: err.stack,
        date: new Date(),
    });

    return res.status(500).json({
        error: 'Error 500: Internal Server Error',
    });
};

module.exports = errorHandler;
