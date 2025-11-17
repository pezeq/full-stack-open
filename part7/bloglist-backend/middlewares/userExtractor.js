const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const validator = require('../utils/validator');

const userHasAuth = async (token) => {
    return jwt.verify(token, config.SECRET);
};

const userExtractor = async (req, res, next) => {
    const decoded = await userHasAuth(req.token);
    validator.tokenHasValidId(decoded.id);

    const user = await User.findById(decoded.id);
    validator.resourceExists(user, 'User');

    req.user = user;
    next();
};

module.exports = userExtractor;
