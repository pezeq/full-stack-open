const responses = require('../utils/responses');

const checkUserAndPassword = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return responses.BadRequest(res, 'Username or password is missing');
    }

    if (password.length < 3) {
        return responses.BadRequest(res, 'Password must be at least 3 characters long');
    }

    return true;
};

module.exports = {
    checkUserAndPassword
};