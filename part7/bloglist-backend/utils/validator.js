const {
    ValidationError,
    UnallowedKeysError,
    ResourceNotFoundError,
    UnauthorizedError,
} = require('../errors/HttpError');
const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const bcrypt = require('bcrypt');

const hasUrl = (url) => {
    if (!url) {
        throw new ValidationError('Blog URL is missing');
    }
};

const hasTitle = (title) => {
    if (!title) {
        throw new ValidationError('Blog title is missing');
    }
};

const hasExtraKey = (body, allowedKeys) => {
    const objectKeys = Object.keys(body);
    const validate = objectKeys.every((k) => allowedKeys.includes(k));

    if (!validate) {
        const unallowedKeys = objectKeys.filter(
            (k) => !allowedKeys.includes(k)
        );

        throw new UnallowedKeysError(
            `Request has unallowed key(s): ${unallowedKeys.join(', ')}`
        );
    }
};

const resourceExists = (resource, name = 'Resource') => {
    if (!resource || resource.length === 0) {
        throw new ResourceNotFoundError(`${name} was not found`);
    }
};

const hasPassword = (password) => {
    if (!password) {
        throw new ValidationError('User password is missing');
    }

    if (password.length < 3) {
        throw new ValidationError(
            'Password is shorter than the minimum allowed length (3)'
        );
    }
};

const userIsOwner = async (id, user) => {
    const blog = await Blog.findById({ _id: id });
    resourceExists(blog, 'Blog');

    if (!(blog.createdBy.toString() === user._id.toString())) {
        throw new UnauthorizedError("You cannot delete another user's blog");
    }

    return true;
};

const userLogin = async (username, password) => {
    hasPassword(password);

    const user = await User.findOne({ username });

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        throw new UnauthorizedError('Invalid username or password');
    }

    return user;
};

const tokenHasValidId = (id) => {
    if (!id) {
        throw new UnauthorizedError('Token does not contain valid user ID');
    }
};

module.exports = {
    hasUrl,
    hasTitle,
    hasExtraKey,
    resourceExists,
    hasPassword,
    userLogin,
    userIsOwner,
    tokenHasValidId,
};
