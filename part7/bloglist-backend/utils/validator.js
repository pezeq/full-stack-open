const {
    ValidationError,
    UnallowedKeysError,
    ResourceNotFoundError,
} = require('../errors/HttpError');
const User = require('../models/userModel');

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

const resourceExists = (resource, name) => {
    if (!resource) {
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

const hasUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ValidationError('User ID missing or not valid');
    }

    return user;
};

module.exports = {
    hasUrl,
    hasTitle,
    hasExtraKey,
    resourceExists,
    hasPassword,
    hasUser,
};
