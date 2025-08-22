const Blog = require('../models/blog');
const responses = require('../utils/responses');

const checkTitleURLandUser = async (req, res) => {
    const { title, url } = req.body;
    if (!title || !url) {
        return responses.BadRequest(res, 'Title or URL is missing');
    }

    const user = req.user;
    if (!user) {
        return responses.Unauthorized(res, 'UserId missing or not valid');
    }

    return true;
};

const checkUserAndBlog = async (req, res) => {
    const user = req.user;
    if (!user) {
        return responses.Unauthorized(res, 'UserId missing or not valid');
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return responses.NotFound(res, 'Blog does not exist');
    }

    if (user._id.toString() !== blog.user.toString()) {
        return responses.Unauthorized(res, 'UserId and BlogUserId doesn\'t match');
    }

    return true;
};

const checkUserAndPassword = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return responses.BadRequest(res, 'Username or password is missing');
    }

    if (password.length < 3) {
        return responses.BadRequest(res, 'Password must be at least 3 characters long');
    }

    return true;
};

module.exports = {
    checkTitleURLandUser,
    checkUserAndBlog,
    checkUserAndPassword
};