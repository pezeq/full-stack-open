const bcrypt = require('bcrypt');
const userRouters = require('express').Router();
const User = require('../models/user');
const { asyncHandler } = require('../utils/middleware');
const validators = require('../utils/validators');

userRouters.get('/', asyncHandler(async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { user: 0, likes: 0 });

    res.json(users);
}));

userRouters.post('/', asyncHandler(async (req, res) => {
    const { username, password, name } = req.body;

    validators.checkUserSignUp(username, password);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser =  new User({
        username,
        passwordHash,
        name
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}));

module.exports = userRouters;