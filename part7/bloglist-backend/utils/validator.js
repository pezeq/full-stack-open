const { ValidationError } = require('../errors/HttpError');

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

module.exports = {
    hasUrl,
    hasTitle,
};
