const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const login = async (user) => {
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET);

    return {
        token,
        id: user._id,
        username: user.username,
        name: user.name,
    };
};

module.exports = {
    login,
};
