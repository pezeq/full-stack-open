const { test, after, beforeEach, describe } = require('node:test');
const assert =  require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

const getToken = async () => {
    const user = {
        username: 'root',
        password: 'admin123'
    };

    const res = await api
        .post('/api/login')
        .send(user);

    return res.body.token;
};

const INVALID_TOKEN = 'eyFakeTokenForTestsOnlyDontUse123.abc.def';

describe('Create and Read', () => {
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

        test('blog unique identifier is named id', async () => {
            const blogs = await helper.getBlogs();
            blogs.forEach(blog => {
                assert.ok(blog.id);
            });
        });
    });

    describe('Creating blogs', () => {
        test('creates a blog successfully', async () => {
            const TOKEN = await getToken();

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(helper.sampleBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const blogs = await helper.getBlogs();
            assert.strictEqual(blogs.length, helper.blogs.length + 1);
            assert(blogs.some(b => b.title === helper.sampleBlog.title));
        });

        test('defaults likes to 0 if missing', async () => {
            const { author, title, url } = helper.sampleBlog;
            const blogWithoutLikes = { author, title, url };

            const TOKEN = await getToken();

            const res = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(blogWithoutLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            assert.strictEqual(res.body.likes, 0);
        });

        test('returns 400 if title is missing', async () => {
            const { author, url } = helper.sampleBlog;
            const blogWithoutTitle = { author, url };

            const TOKEN = await getToken();

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(blogWithoutTitle)
                .expect(400);

            const blogs = await helper.getBlogs();
            assert.strictEqual(blogs.length, helper.blogs.length);
        });

        test('returns 400 if url is missing', async () => {
            const { author, title } = helper.sampleBlog;
            const blogWithoutUrl = { author, title };

            const TOKEN = await getToken();

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(blogWithoutUrl)
                .expect(400);

            const blogs = await helper.getBlogs();
            assert.strictEqual(blogs.length, helper.blogs.length);
        });

        test('returns 401 if auth token is missing', async () => {
            const res = await api
                .post('/api/blogs')
                .send(helper.sampleBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            assert(res.body.error);
        });

        test('returns 401 if auth token is invalid', async () => {
            const res = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${INVALID_TOKEN}`)
                .send(helper.sampleBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            assert(res.body.error);
        });
    });
});

describe('Update and Delete', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});

        const TOKEN = await getToken();

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send({
                author: 'Roronoa Zoro',
                title: 'The art of being lost',
                url: 'https://one-piece.com/character/zoro/index.html',
            })
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    describe('Updating blogs', () => {
        test('updates an existing blog', async () => {
            const blogToUpdate = await helper.findBlog();
            const TOKEN = await getToken();

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(helper.sampleBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const blogsAfter = await helper.getBlogs();
            assert(blogsAfter.some(b => b.title === helper.sampleBlog.title));
        });

        test('only the number of likes is updated', async () => {
            const blogToUpdate = await helper.findBlog();
            const likes = 13;

            const TOKEN = await getToken();

            const res = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send({ likes })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            assert.strictEqual(res.body.likes, likes);
            assert.strictEqual(res.body.author, blogToUpdate.author);
        });

        test('returns 404 if blog not found', async () => {
            const nonExistingId = await helper.nonExistingId();
            const TOKEN = await getToken();

            await api
                .put(`/api/blogs/${nonExistingId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(helper.sampleBlog)
                .expect(404);

            const blogs = await helper.getBlogs();
            assert(!blogs.some(b => b.title === helper.sampleBlog.title));
        });

        test('returns 401 if auth token is missing', async () => {
            const blogToUpdate = await helper.findBlog();

            const res = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(helper.sampleBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            assert(res.body.error);
        });

        test('returns 401 if auth token is invalid', async () => {
            const blogToUpdate = await helper.findBlog();

            const res = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${INVALID_TOKEN}`)
                .send(helper.sampleBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            assert(res.body.error);
        });
    });

    describe('Deleting blogs', () => {
        test('deletes an existing blog', async () => {
            const blogsBefore = await helper.getBlogs();
            const blogToDelete = await helper.findBlog();

            const TOKEN = await getToken();

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .expect(204);

            const blogsAfter = await helper.getBlogs();

            assert(!blogsAfter.some(b => b.title === blogToDelete.title));
            assert.strictEqual(blogsAfter.length, blogsBefore.length - 1);
        });

        test('returns 404 if blog not found', async () => {
            const blogsBefore = await helper.getBlogs();
            const nonExistingId = await helper.nonExistingId();

            const TOKEN = await getToken();

            await api
                .delete(`/api/blogs/${nonExistingId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .expect(404);

            const blogsAfter = await helper.getBlogs();
            assert.strictEqual(blogsAfter.length, blogsBefore.length);
        });

        test('returns 401 if auth token is missing', async () => {
            const blogToDelete = await helper.findBlog();

            const res = await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .send(helper.sampleBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            assert(res.body.error);
        });

        test('returns 401 if auth token is invalid', async () => {
            const blogToDelete = await helper.findBlog();

            const res = await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${INVALID_TOKEN}`)
                .send(helper.sampleBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);

            assert(res.body.error);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});