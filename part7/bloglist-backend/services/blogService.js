const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const getAllBlogs = async () => {
    return Blog.find({}).populate('createdBy', { username: 1, id: 1 });
};

const getBlog = async (id) => {
    return Blog.findById({ _id: id });
};

const createNewBlog = async (title, author, url) => {
    const user = await User.findOne({});

    const blog = new Blog({
        title,
        author,
        url,
        likes: 0,
        createdBy: user._id,
        createdAt: new Date(),
    });

    const createdBlog = await blog.save();
    user.blogs = user.blogs.concat(createdBlog._id);
    await user.save();

    return createdBlog;
};

const deleteBlog = async (id) => {
    return Blog.deleteOne({ _id: id });
};

const updateBlogLikes = async (id, body) => {
    return Blog.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
    getAllBlogs,
    getBlog,
    createNewBlog,
    deleteBlog,
    updateBlogLikes,
};
