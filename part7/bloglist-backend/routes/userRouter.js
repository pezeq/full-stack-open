const blogRouter = require('express').Router();
const blogController = require('../controllers/userController');

blogRouter.get('/', blogController.getAllUsers);
blogRouter.post('/', blogController.createUser);

module.exports = blogRouter;
