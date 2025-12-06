const { mongoose } = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        minLength: 5,
    },
    author: String,
    url: {
        type: String,
        require: [true, 'Blog url is required'],
        minLength: 5,
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: Date,
    comments: [{ type: String }],
});

blogSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
