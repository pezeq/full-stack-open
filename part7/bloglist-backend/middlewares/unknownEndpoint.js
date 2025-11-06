const unknownEndpoint = (req, res, next) => {
    return res.status(404).json({
        name: 'UnknownEndpoint',
        status: 404,
        message: 'Endpoint does not exist',
        timestamp: new Date().toISOString(),
    });
};

module.exports = unknownEndpoint;
