const unknownEndpoint = (err, req, res, next) => {
    return res.status(404).json({
        error: '404 Not Found',
        message: 'Unknown Endpoint',
    });
};

module.exports = unknownEndpoint;
