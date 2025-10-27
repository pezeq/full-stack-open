const blogRouter = require('express').Router();
const blogController = require('../controllers/blogController');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post('/', blogController.createNewBlog);

module.exports = blogRouter;
