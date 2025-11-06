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
                default:
                    return undefined;
            }
        };

        const mapErrorMsg = (err) => {
            switch (err.name) {
                case 'CastError':
                    return 'Invalid id format';
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
