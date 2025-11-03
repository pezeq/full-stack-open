const blogService = require('../services/blogService');
const logger = require('../utils/logger');
const asyncHandler = require('../middlewares/asyncHandler');
const validator = require('../utils/validator');

const getAllBlogs = asyncHandler(async (req, res) => {
    const fetchedBlogs = await blogService.getAllBlogs();
    res.status(200).json(fetchedBlogs);
});

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, author, url } = req.body;

    validator.hasTitle(title);
    validator.hasUrl(url);

    const createdBlog = await blogService.createNewBlog(title, author, url);
    res.status(201).json(createdBlog);
});

module.exports = {
    getAllBlogs,
    createNewBlog,
};
