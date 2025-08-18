const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        required: [true, 'is required']
    },
    url: {
        type: String,
        required: [true, 'is required']
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);