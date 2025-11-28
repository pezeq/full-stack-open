const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const validator = require('../utils/validator');
const { asyncHandler } = require('../middlewares');
const { BCRYPT_SALT } = require('../utils/config');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUser(id);

    validator.resourceExists(user, 'User');

    res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
    const { username, password, name } = req.body;

    validator.hasPassword(password);

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT);
    const newUser = await userService.createUser(username, passwordHash, name);

    res.status(201).json(newUser);
});

module.exports = {
    getAllUsers,
    getUser,
    createUser,
};
