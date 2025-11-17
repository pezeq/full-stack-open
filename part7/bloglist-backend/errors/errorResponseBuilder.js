class ErrorResponseBuilder {
    static build(err) {
        const fallbackErr = {
            name: 'UnexpectedError',
            status: 500,
            message: 'Internal Server Error',
        };

        const mapErrorStatus = (err) => {
            switch (err.name) {
                case 'CastError':
                    return 400;
                case 'ValidationError':
                    return 400;
                case 'MongoServerError':
                    if (
                        err.message.includes('E11000') &&
                        err.message.includes('username')
                    ) {
                        return 400;
                    }
                    return 500;
                case 'JsonWebTokenError':
                    return 401;
                case 'TokenExpiredError':
                    return 401;
                default:
                    return undefined;
            }
        };

        const mapErrorMsg = (err) => {
            switch (err.name) {
                case 'CastError':
                    return 'Invalid id format';
                case 'MongoServerError':
                    if (
                        err.message.includes('E11000') &&
                        err.message.includes('username')
                    ) {
                        return 'Username already exist';
                    }
                    return err.message;
                case 'JsonWebTokenError':
                    return 'User has invalid token';
                case 'TokenExpiredError':
                    return 'User token has been expired';
                default:
                    return undefined;
            }
        };

        const name = err.name || fallbackErr.name;
        const status = err.status || mapErrorStatus(err) || fallbackErr.status;
        const message = mapErrorMsg(err) || err.message || fallbackErr.message;

        return {
            name,
            status,
            message,
            timestamp: new Date().toISOString(),
        };
    }
}

module.exports = { ErrorResponseBuilder };
