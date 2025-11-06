const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    logger.info('---');
    logger.info('METHOD:\t', req.method);
    logger.info('PATH:\t', req.path);
    logger.info('BODY:\t', req.body);
    logger.info('---');
    next();
};

module.exports = requestLogger;
