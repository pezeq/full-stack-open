const blogsRouter = require('express').Router();
const Blog = require("../models/blog");
const logger = require('../utils/logger')

blogsRouter.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs);
        })
        .catch(err => {
            logger.error('Failed to fetch blogs', err.message);
        });
});

blogsRouter.post('/', (req, res) => {
    const body = req.body;

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    });

    blog.save()
        .then(savedBlog => {
            res.status(201).json(savedBlog);
        })
        .catch(err => {
            logger.error('Failed to create blog', err.message);
        });
});

module.exports = blogsRouter;