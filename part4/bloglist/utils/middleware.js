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
    console.log('Inside tokenExtractor');

    const auth = req.get('authorization');

    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '');
    }
    next();
};

const userExtractor = async (req, res, next) => {
    console.log('Inside userExtractor');

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

const errorHandler = (err, req, res, next) => {
    logger.info('Inside errorHandler');

    if (err.name === 'CastError') {
        logger.info('Inside CastError');
        return res.status(400).json({
            error: '400 Bad Request',
            message: 'Malformatted ID'
        });
    } else if (err.name === 'ValidationError') {
        logger.info('Inside ValidationError');
        return res.status(400).json({
            error: '400 Bad Request',
            message:  err.message
        });
    } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        logger.info('Inside MongoServerError');
        return res.status(400).json({
            error: '400 Bad Request',
            message: 'Username must be unique'
        });
    } else if (err.name === 'JsonWebTokenError') {
        logger.info('Inside JsonWebTokenError');
        return res.status(401).json({
            error: '401 Unauthorized',
            message: 'A valid token is required'
        });
    } else if (err.name === 'TokenExpiredError') {
        logger.info('Inside JsonWebTokenError');
        return res.status(401).json({
            error: '401 Unauthorized',
            message: 'Token expired'
        });
    } else if (err.name === 'TypeError' && err.message.includes('Cannot read properties of undefined')) {
        logger.info('Inside TypeError');
        return res.status(400).json({
            error: '400 Bad Request',
            message: 'This blog doesn\'t have a BlogUserId key'
        });
    }

    logger.info('Error Name:', err.name);
    logger.info('Error Message:', err.message);
    res.status(500).json({ error: '500 Internal Server Error' });

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
    asyncHandler,
    tokenExtractor,
    userExtractor
};