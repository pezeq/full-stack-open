const blogRouter = require('express').Router();
const blogController = require('../controllers/blogController');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlog);
blogRouter.post('/', blogController.createNewBlog);
blogRouter.delete('/:id', blogController.deleteBlog);
blogRouter.put('/:id/likes', blogController.updateBlogLikes);

module.exports = blogRouter;
