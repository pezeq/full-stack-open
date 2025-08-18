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

module.exports = {
    checkTitleURLandUser,
    checkUserAndBlog
};