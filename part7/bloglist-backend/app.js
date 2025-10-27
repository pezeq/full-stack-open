const express = require('express');
const app = express();
const connectToMongoDB = require('./utils/db');
const blogRouter = require('./routes/blogRouter');

connectToMongoDB();

app.use(express.json());

app.use('/api/blogs/', blogRouter);

module.exports = app;
