const Blog = require('../models/blogModel');

const getAllBlogs = async () => {
    return Blog.find({}).populate('createdBy', { username: 1, id: 1 });
};

const getBlog = async (id) => {
    return Blog.findById({ _id: id }).populate('createdBy', {
        username: 1,
        id: 1,
    });
};

const createNewBlog = async (title, author, url, user) => {
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

    return createdBlog.populate('createdBy', { username: 1, id: 1 });
};

const deleteBlog = async (id, user) => {
    user.blogs = user.blogs.filter((b) => b.toString() !== id.toString());
    await user.save();
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
