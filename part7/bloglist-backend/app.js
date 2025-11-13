const express = require('express');
const app = express();
const connectToMongoDB = require('./utils/db');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const {
    requestLogger,
    unknownEndpoint,
    errorHandler,
} = require('./middlewares');

connectToMongoDB();

app.use(express.json());
app.use(requestLogger);

app.use('/api/blogs/', blogRouter);
app.use('/api/users/', userRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
