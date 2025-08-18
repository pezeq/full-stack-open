const BadRequest = (res, message) => {
    return res.status(400).json({
        error: '400 Bad Request',
        message,
    });
};

const Unauthorized = (res, message) => {
    return res.status(401).json({
        error: '401 Unauthorized',
        message,
    });
};

const NotFound = (res, message) => {
    return res.status(404).json({
        error: '404 Not Found',
        message,
    });
};

module.exports = {
    BadRequest,
    Unauthorized,
    NotFound
}