const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { asyncHandler, userExtractor } = require('../utils/middleware');
const validators = require('../utils/validators');

blogsRouter.get('/', asyncHandler(async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate('user',{ name: 1, username: 1 });
    res.json(blogs);
}));

blogsRouter.post('/', userExtractor, asyncHandler(async (req, res) => {
    const { author, title, url, likes } = req.body;

    const user = validators.checkUser(req);
    validators.checkTitle(title);
    validators.checkUrl(url);

    const blog = new Blog({
        author,
        title,
        url,
        likes: likes ?? 0,
        user: user._id,
    });

    const savedBlog = await blog.save();
    const populatedBlog = await savedBlog.populate(
        'user', { name: 1, username: 1 }
    );

    user.blogs = await user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(populatedBlog);
}));

blogsRouter.delete('/:id', userExtractor, asyncHandler(async (req, res) => {
    const user = validators.checkUser(req);
    const blog = await validators.checkBlog(req.params.id);
    validators.checkOwnership(user, blog);

    const deletedBlog = await Blog.findByIdAndDelete(blog.id);

    user.blogs = user.blogs.filter(blogId =>
        blogId.toString() !== blog.id
    );
    await user.save();

    return res.status(204).json(deletedBlog);
}));

blogsRouter.put('/:id', userExtractor, asyncHandler(async (req, res) => {
    const updateLikes = validators.checkUpdateLikes(req.body);

    if (updateLikes) {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        return res.status(200).json(updatedBlog);
    }

    const user = validators.checkUser(req);
    const blog = await validators.checkBlog(req.params.id);
    validators.checkOwnership(user, blog);

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    return res.status(200).json(updatedBlog);
}));

module.exports = blogsRouter;