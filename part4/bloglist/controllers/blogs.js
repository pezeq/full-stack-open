const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { asyncHandler, userExtractor } = require('../utils/middleware');
const responses = require('../utils/responses');
const { checkTitleURLandUser, checkUserAndBlog } = require('../utils/blogService')

blogsRouter.get('/', asyncHandler(async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate('user',{ name: 1, username: 1 });
    res.json(blogs);
}));

blogsRouter.post('/', userExtractor, asyncHandler(async (req, res) => {
    const check = await checkTitleURLandUser(req, res);
    if (!check) return;

    const { author, title, url, likes } = req.body;

    const blog = new Blog({
        author,
        title,
        url,
        likes: likes ?? 0,
        user: req.user._id,
    });

    const savedBlog = await blog.save();
    req.user.blogs = await req.user.blogs.concat(savedBlog._id);
    await req.user.save();

    res.status(201).json(savedBlog);
}));

blogsRouter.delete('/:id', userExtractor, asyncHandler(async (req, res) => {
    const check = await checkUserAndBlog(req, res);
    if (!check) return;

    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    req.user.blogs = req.user.blogs.filter(blogId =>
        blogId.toString() !== req.params.id
    );
    await req.user.save();

    return res.status(204).json(deletedBlog);
}));

blogsRouter.put('/:id', userExtractor, asyncHandler(async (req, res) => {
    const check = await checkUserAndBlog(req, res);
    if (!check) return;

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    return res.status(200).json(updatedBlog);
}));

module.exports = blogsRouter;