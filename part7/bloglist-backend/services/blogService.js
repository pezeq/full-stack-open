const Blog = require('../models/blogModel');

const getAllBlogs = async () => {
    return await Blog.find({});
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

module.exports = {
    getAllBlogs,
    createNewBlog,
};
