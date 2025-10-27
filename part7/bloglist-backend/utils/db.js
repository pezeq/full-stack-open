const mongoose = require('mongoose');
const config = require('./config');

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Failed to connect MongoDB:', err);
    }
};

module.exports = connectToMongoDB;
