const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    if (!req.body?.password) {
        logger.info('---');
        logger.info('METHOD:\t', req.method);
        logger.info('PATH:\t', req.path);
        logger.info('BODY:\t', req.body);
        logger.info('---');
    } else {
        logger.info('---');
        logger.info('METHOD:\t', req.method);
        logger.info('PATH:\t', req.path);
        logger.info('---');
    }
    next();
};

module.exports = requestLogger;
