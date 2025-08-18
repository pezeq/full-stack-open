const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const app = express();

logger.info('Connecting to MongoDB...');

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB:', config.MONGODB_URI);
    })
    .catch(err => {
        logger.error('Connection to MongoDB failed:', err.message);
    });

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;