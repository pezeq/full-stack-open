const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('---');
    logger.info('Method', req.method);
    logger.info('Path', req.path);
    logger.info('Body', req.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'Unknown Endpoint' });
};

const errorHandler = (err, req, res, next) => {
    logger.info('Inside errorHandler');

    if (err.name === 'CastError') {
        logger.info('Inside CastError');
        return res.status(400).json({ error: 'Malformatted ID' });
    } else if (err.name === 'ValidationError') {
        logger.info('Inside ValidationError');
        return res.status(400).json({ error: err.message });
    }

    logger.info('Error:', err.message);

    res.status(500).json({ error: 'Internal Server Error' });

    next(err);
};

const asyncHandler = fn => (req, res, next) => {
    logger.info('Inside asyncHandler');
    Promise.resolve(fn(req, res, next))
        .catch(err => next(err));
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    asyncHandler
};