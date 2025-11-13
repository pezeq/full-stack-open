const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: 3,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
