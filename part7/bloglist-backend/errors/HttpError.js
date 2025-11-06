class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends HttpError {
    constructor(message) {
        super(message, 400);
    }
}

class UnallowedKeysError extends HttpError {
    constructor(message) {
        super(message, 400);
    }
}

class ResourceNotFoundError extends HttpError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = {
    HttpError,
    ValidationError,
    UnallowedKeysError,
    ResourceNotFoundError,
};
