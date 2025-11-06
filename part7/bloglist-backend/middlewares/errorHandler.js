const logger = require('../utils/logger');
const { LogTarget } = require('../utils/logTarget');
const { ErrorResponseBuilder } = require('../errors/errorResponseBuilder');

const errorHandler = (err, req, res, next) => {
    logger.info('Inside errorHandler');
    LogTarget.reqError(err);

    const response = ErrorResponseBuilder.build(err);
    return res.status(response.status).json(response);
};

module.exports = errorHandler;
