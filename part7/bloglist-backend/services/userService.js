const User = require('../models/userModel');

const getAllUsers = async () => {
    return User.find({}).populate('blogs');
};

const createUser = async (username, passwordHash, name) => {
    const newUser = new User({
        username,
        passwordHash,
        name: name || 'N/A',
    });

    return await newUser.save();
};

module.exports = {
    getAllUsers,
    createUser,
};
