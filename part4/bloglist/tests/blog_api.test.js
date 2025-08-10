const { test, after, beforeEach, describe } = require('node:test');
const assert =  require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

const sampleBlog = {
    author: 'Pedro Ezequiel',
    title: 'Testing the backend is fun',
    url: 'https://github.com/pezeq',
    likes: 19
};

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.blogs);
});

describe('Fetching blogs', () => {
    test('returns blogs as JSON with status 200', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('returns the expected amount of blogs', async () => {
        const blogs = await helper.getBlogs();
        assert.strictEqual(blogs.length, helper.blogs.length);
    });
});

describe('creating resource', () => {
    test('creates a blog successfully', async () => {
        await api
            .post('/api/blogs')
            .send(sampleBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await helper.getBlogs();
        assert.strictEqual(blogs.length, helper.blogs.length + 1);
        assert(blogs.some(b => b.title === sampleBlog.title));
    });

    test('defaults likes to 0 if missing', async () => {
        const { author, title, url } = sampleBlog;
        const blogWithoutLikes = { author, title, url };

        const res = await api
            .post('/api/blogs')
            .send(blogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(res.body.likes, 0);
    });

    test('returns 400 if title is missing', async () => {
        const { author, url } = sampleBlog;
        const blogWithoutTitle = { author, url };

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400);

        const blogs = await helper.getBlogs();
        assert.strictEqual(blogs.length, helper.blogs.length);
    });

    test('returns 400 if url is missing', async () => {
        const { author, title } = sampleBlog;
        const blogWithoutUrl = { author, title };

        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400);

        const blogs = await helper.getBlogs();
        assert.strictEqual(blogs.length, helper.blogs.length);
    });
});

describe('updating resource', () => {
    test('updates an existing blog', async () => {
        const blogsBefore = await helper.getBlogs();
        const blogToUpdate = blogsBefore[0];

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(sampleBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAfter = await helper.getBlogs();
        assert(blogsAfter.some(b => b.title === sampleBlog.title));
    });

    test('only the number of likes is updated', async () => {
        const blogsBefore = await helper.getBlogs();
        const blogToUpdate = blogsBefore[0];
        const { likes } = sampleBlog;

        const res = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(res.body.likes, sampleBlog.likes);
    });

    test('returns 404 if blog not found', async () => {
        const nonExistingId = await helper.nonExistingId();

        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send(sampleBlog)
            .expect(404);

        const blogs = await helper.getBlogs();
        assert(!blogs.some(b => b.title === sampleBlog.title));
    });
});

describe('deleting resource', () => {
    test('deletes an existing blog', async () => {
        const blogsBefore = await helper.getBlogs();
        const blogToDelete = blogsBefore[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAfter = await helper.getBlogs();

        assert(!blogsAfter.some(b => b.title === blogToDelete.title));
        assert.strictEqual(blogsAfter.length, blogsBefore.length - 1);
    });

    test('returns 404 if blog not found', async () => {
        const nonExistingId = await helper.nonExistingId();

        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(404);

        const blogs = await helper.getBlogs();
        assert(!blogs.some(b => b.title === sampleBlog.title));
    });
});

describe('others tests', () => {
    test('blog unique identifier is named id', async () => {
        const blogs = await helper.getBlogs();
        blogs.forEach(blog => {
            assert.ok(blog.id);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});
