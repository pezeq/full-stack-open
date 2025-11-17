const express = require('express');
const app = express();
const connectToMongoDB = require('./utils/db');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
} = require('./middlewares');

connectToMongoDB();

app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/login/', loginRouter);
app.use('/api/blogs/', blogRouter);
app.use('/api/users/', userRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
