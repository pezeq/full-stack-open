const blogRouter = require('express').Router();
const blogController = require('../controllers/blogController');
const { userExtractor } = require('../middlewares');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlog);
blogRouter.post('/', userExtractor, blogController.createNewBlog);
blogRouter.delete('/:id', userExtractor, blogController.deleteBlog);
blogRouter.put('/:id/likes', blogController.updateBlogLikes);

module.exports = blogRouter;
