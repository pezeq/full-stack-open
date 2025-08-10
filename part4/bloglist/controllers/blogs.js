const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { asyncHandler } = require('../utils/middleware');

blogsRouter.get('/', asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
}));

blogsRouter.post('/', asyncHandler(async (req, res) => {
    const { author, title, url, likes } = req.body;

    if (!title || !url) {
        return res.status(400).json({
            error: '400 Bad Request',
            message: 'Title or URL is missing'
        });
    }

    const blog = new Blog({
        author,
        title,
        url,
        likes: likes ?? 0
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
}));

blogsRouter.delete('/:id', asyncHandler(async (req, res) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
        return res.status(404).json({
            error: '404 Not Found',
            message: 'Blog does not exist'
        });
    }

    res.status(204).json(deletedBlog);
}));

blogsRouter.put('/:id', asyncHandler(async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        return res.status(404).json({
            error: '404 Not Found',
            message: 'Blog does not exist'
        });
    }

    res.status(200).json(updatedBlog);
}));

module.exports = blogsRouter;