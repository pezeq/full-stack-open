const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const { SAMPLE_USER_PASSWORD } = require('../utils/config');
const bcrypt = require('bcrypt');
const { BCRYPT_SALT } = require('./config');

const initializeBlogs = (id) => {
    return [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            createdBy: id,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            createdBy: id,
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            createdBy: id,
        },
        {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            createdBy: id,
        },
        {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            createdBy: id,
        },
        {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            createdBy: id,
        },
    ];
};

const sampleBlog = {
    title: 'Testing is Fun',
    author: 'Pedro Ezequiel',
    url: 'https://github.com/pezeq',
};

const sampleUser = {
    username: 'pezeq',
    password: SAMPLE_USER_PASSWORD,
    name: 'Pedro Ezequiel',
};

const getBlogs = async () => {
    const fetchedBlogs = await Blog.find({});
    return fetchedBlogs.map((b) => b.toJSON());
};

const getBlogId = async () => {
    const fetchedBlogs = await getBlogs();
    const { id } = fetchedBlogs[0];
    return id;
};

const unexistentId = async () => {
    const fetchedBlogs = await getBlogs();
    const { id } = fetchedBlogs[0];
    await Blog.findByIdAndDelete({ _id: id });
    return id;
};

const getUsers = async () => {
    const fetchedUsers = await User.find({});
    return fetchedUsers.map((u) => u.toJSON());
};

const getTestUser = async () => {
    return User.findOne({ username: 'test' });
};

const createTestUser = async () => {
    const passwordHash = await bcrypt.hash(sampleUser.password, BCRYPT_SALT);

    const user = new User({
        username: 'test',
        passwordHash,
        name: 'Tester',
    });

    await user.save();
};

module.exports = {
    sampleBlog,
    sampleUser,
    initializeBlogs,
    getBlogs,
    getBlogId,
    unexistentId,
    getUsers,
    getTestUser,
    createTestUser,
};
