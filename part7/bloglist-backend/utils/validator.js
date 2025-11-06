const {
    ValidationError,
    UnallowedKeysError,
    ResourceNotFoundError,
} = require('../errors/HttpError');
const mongoose = require('mongoose');

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

module.exports = {
    hasUrl,
    hasTitle,
    hasExtraKey,
    resourceExists,
};
