const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const checkTitle = (title) => {
    if (!title) {
        throw { name: 'MissingTitle', message: 'Blog title is missing' };
    }
};

const checkUrl = (url) => {
    if (!url) {
        throw { name: 'MissingUrl', message: 'Blog URL is missing' };
    }
};

const checkUser = (req) => {
    if (!req.user) {
        throw { name: 'InvalidUserId', message: 'UserId missing or not valid' };
    }

    return req.user;
};

const checkBlog = async (id) => {
    const blog = await Blog.findById(id);

    if (!blog) {
        throw { name: 'BlogNotFound', message: 'Blog does not exist' };
    }

    return blog;
};

const checkOwnership = (user, blog) => {
    if (user._id.toString() !== blog.user.toString()) {
        throw { name: 'InvalidOwnership', message: 'UserId and BlogUserId does not match' };
    }
};

const checkUserSignUp = (username, password) => {
    if (!username || !password) {
        throw { name: 'InvalidSignUp', message: 'Username or password is missing' };
    }

    if (password.length < 3) {
        throw { name: 'InvalidSignUp', message: 'Password must be at least 3 characters long' };
    }
};

const checkLogin = async (username, password) => {
    const user = await User.findOne({ username });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        throw { name: 'InvalidLogin', message: 'Invalid username or password' };
    }

    return user;
};

const checkUpdateLikes = (body) => {
    const user = User.findById(body.id);

    if (user) {
        const fields = ['id', 'likes'];
        const bodyKeys = Object.keys(body);

        return bodyKeys.every(key => fields.includes(key));
    }

    throw { name: 'InvalidUserId', message: 'UserId missing or not valid' };
};

module.exports = {
    checkTitle,
    checkUrl,
    checkUser,
    checkBlog,
    checkOwnership,
    checkUserSignUp,
    checkLogin,
    checkUpdateLikes
};