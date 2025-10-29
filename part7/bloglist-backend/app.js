const express = require('express');
const app = express();
const connectToMongoDB = require('./utils/db');
const blogRouter = require('./routes/blogRouter');
const middleware = require('./utils/middleware');

connectToMongoDB();

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs/', blogRouter);

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
