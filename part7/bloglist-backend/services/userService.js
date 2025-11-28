const User = require('../models/userModel');

const getAllUsers = async () => {
    return User.find({}).populate('blogs');
};

const getUser = async (id) => {
    return User.find({ _id: id }).populate('blogs');
};

const createUser = async (username, passwordHash, name) => {
    const newUser = new User({
        username,
        passwordHash,
        name: name,
    });

    return await newUser.save();
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
};
