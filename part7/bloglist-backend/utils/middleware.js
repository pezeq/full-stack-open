const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('---');
    logger.info('Method:\t', req.method);
    logger.info('Path:\t', req.path);
    logger.info('Body:\t', req.body);
    logger.info('---');
    next();
};

const unknowEndpoint = (req, res) => {
    res.status(404).json({
        error: '404: Not Found',
        message: 'Unknown Endpoint',
    });
};

module.exports = {
    requestLogger,
    unknowEndpoint,
};
