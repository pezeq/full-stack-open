const logger = require('./logger');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
    logger.info('---');
    logger.info('Method', req.method);
    logger.info('Path', req.path);
    logger.info('Body', req.body);
    logger.info('---');
    next();
};

const tokenExtractor = (req, res, next) => {
    logger.info('Inside tokenExtractor');

    const auth = req.get('authorization');

    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '');
    }

    next();
};

const userExtractor = async (req, res, next) => {
    logger.info('Inside userExtractor');

    const decodedToken = jwt.verify(req.token, config.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            error: '401 Unauthorized',
            message: 'Invalid Token'
        });
    }

    req.user = await User.findById(decodedToken.id);

    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'Unknown Endpoint' });
};

const errorMap = {
    CastError: { status: 400, message: 'Malformatted ID' },
    ValidationError: { status: 400, useErrMessage: true },
    JsonWebTokenError: { status: 401, message: 'A valid token is required' },
    TokenExpiredError: { status: 401, message: 'Token expired' },
    MissingTitle: { status: 400, useErrMessage: true },
    MissingUrl: { status: 400, useErrMessage: true },
    BlogNotFound: { status: 404, useErrMessage: true },
    InvalidOwnership: { status: 403, useErrMessage: true },
    InvalidLogin: { status: 401, useErrMessage: true },
    InvalidSignUp: { status: 400, useErrMessage: true },
    InvalidUserId: { status: 400, useErrMessage: true }
};

const statusText = {
    400: '400 Bad Request',
    401: '401 Unauthorized',
    403: '403 Forbidden',
    404: '404 Not Found',
};

const errorHandler = (err, req, res, next) => {
    logger.info('Inside errorHandler');

    if (err.code === 11000) {
        return res.status(409).json({
            error: '409 Conflict',
            message: 'Username must be unique'
        });
    }

    const map = errorMap[err.name];
    if (map) {
        logger.info(`Error: ${err.name}`);
        return res.status(map.status).json({
            error: `${statusText[map.status]}`,
            message: map.useErrMessage ? err.message : map.message
        });
    }

    logger.info('Unhandled error', {
        name: err.name,
        message: err.message,
        stack: err.stack
    });

    return res.status(500).json({
        error: '500 Internal Server Error'
    });
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
    asyncHandler,
    tokenExtractor,
    userExtractor
};