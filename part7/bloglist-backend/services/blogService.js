const Blog = require('../models/blogModel');

const getAllBlogs = async () => {
    return Blog.find({});
};

const getBlog = async (id) => {
    return Blog.findById({ _id: id });
};

const createNewBlog = async (title, author, url) => {
    const blog = new Blog({
        title,
        author,
        url,
        likes: 0,
    });
    return await blog.save();
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
