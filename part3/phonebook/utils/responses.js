const respondNotFound = (res, message) => {
    console.log(`Error 404: ${message}`);
    res.status(404).json({
        error: '404 Not Found',
        message: `${message}`
    });
};

const respondBadReq = (res, message) => {
    console.log(`Error 400: ${message}`);
    res.status(400).json({
        error: '400 Bad Request',
        message: `${message}`
    });
};

module.exports = {
    respondNotFound,
    respondBadReq
};