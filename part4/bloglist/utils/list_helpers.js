const _ = require('lodash');

const dummy = (blogs) => {
    return (blogs.length - blogs.length) + 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) =>
        likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => {
        return favorite.likes >= blog.likes ? favorite : blog;
    }, {});
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined;

    const counts = _.countBy(blogs, 'author');

    const map = _.map(counts, (count, author) => ({
        author: author,
        blogs: count,
    }));

    return _.maxBy(map, 'blogs');
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined;

    const group = _.groupBy(blogs, 'author');

    const map = _.map(group, (mappedBlogs, author) => ({
        author,
        likes: _.sumBy(mappedBlogs, 'likes')
    }));

    return _.maxBy(map, 'likes');
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};