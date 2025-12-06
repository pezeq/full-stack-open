const blogService = require('../services/blogService');
const { asyncHandler } = require('../middlewares');
const validator = require('../utils/validator');

const getAllBlogs = asyncHandler(async (req, res) => {
    const fetchedBlogs = await blogService.getAllBlogs();
    res.status(200).json(fetchedBlogs);
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const fetchedBlog = await blogService.getBlog(id);
    validator.resourceExists(fetchedBlog, 'Blog');

    res.status(200).json(fetchedBlog);
});

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, author, url } = req.body;
    const user = req.user;

    validator.hasTitle(title);
    validator.hasUrl(url);

    const createdBlog = await blogService.createNewBlog(
        title,
        author,
        url,
        user
    );

    res.status(201).json(createdBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    const isOwner = await validator.userIsOwner(id, user);

    if (isOwner) {
        await blogService.deleteBlog(id, user);
        res.status(204).end();
    }
});

const updateBlogLikes = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowedKeys = ['likes'];
    validator.hasExtraKey(req.body, allowedKeys);

    const updatedBlog = await blogService.updateBlogLikes(id, req.body);
    validator.resourceExists(updatedBlog, 'Blog');

    res.status(200).json(updatedBlog);
});

const newComment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allowedKeys = ['comment'];
    validator.hasExtraKey(req.body, allowedKeys);

    const updatedBlog = await blogService.newComment(id, req.body);
    validator.resourceExists(updatedBlog, 'Blog');

    res.status(200).json(updatedBlog);
});

const clearComments = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedBlog = await blogService.clearComments(id);
    res.status(200).json(updatedBlog);
});

module.exports = {
    getAllBlogs,
    getBlog,
    createNewBlog,
    deleteBlog,
    updateBlogLikes,
    newComment,
    clearComments,
};
