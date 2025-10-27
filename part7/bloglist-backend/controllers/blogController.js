const blogService = require('../services/blogService');
const logger = require('../utils/logger');

const getAllBlogs = async (req, res) => {
    try {
        const fetchedBlogs = await blogService.getAllBlogs();
        res.status(200).json(fetchedBlogs);
    } catch (err) {
        logger.error('Error fetching all blogs:', err.message);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

const createNewBlog = async (req, res) => {
    try {
        const { title, author, url } = req.body;
        const createdBlog = await blogService.createNewBlog(title, author, url);
        res.status(201).json(createdBlog);
    } catch (err) {
        logger.error('Error creating new blog:', err.message);
        res.status(500).json({ error: 'Failed to create blog' });
    }
};

module.exports = {
    getAllBlogs,
    createNewBlog,
};
