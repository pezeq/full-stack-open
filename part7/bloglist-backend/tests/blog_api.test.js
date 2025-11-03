const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogModel');
const helper = require('../utils/test_helper');

const api = supertest(app);

const path = '/api/blogs';

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.blogs);
});

describe('HTTP GET', () => {
    test('returns content in json format', async () => {
        await api.get(path).expect('Content-Type', /json/).expect(200);
    });

    test('returns the correct amount of blog posts', async () => {
        const fetchedBlogs = await helper.getBlogs();
        assert.strictEqual(fetchedBlogs.length, helper.blogs.length);
    });

    test('unique identifier of the blog posts is named id', async () => {
        const fetchedBlogs = await helper.getBlogs();
        const every = fetchedBlogs.every((b) => b.hasOwnProperty('id'));
        assert.ok(every);
    });
});

describe('HTTP POST', () => {
    test('successfully creates a new blog post', async () => {
        const before = await helper.getBlogs();

        await api
            .post(path) //
            .send(helper.sampleBlog) //
            .expect(201)
            .expect('Content-Type', /json/);

        const after = await helper.getBlogs();
        assert.strictEqual(after.length, before.length + 1);

        const { title, author, url } = helper.sampleBlog;
        const hasNewBlog = after.some(
            (b) => b.title === title && b.author === author && b.url === url
        );

        assert.ok(hasNewBlog);
    });

    test('likes default value is 0', async () => {
        const res = await api
            .post(path)
            .send(helper.sampleBlog)
            .expect(201)
            .expect('Content-Type', /json/);

        assert.strictEqual(res.body.likes, 0);
    });

    test('when url is missing, return bad request', async () => {
        const before = await helper.getBlogs();

        const res = await api
            .post(path)
            .send({
                title: 'Missing URL',
                author: 'Pedro Ezequiel',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'Blog URL is missing'
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getBlogs();
        assert.strictEqual(after.length, before.length);
    });

    test('when title is missing, return bad request', async () => {
        const before = await helper.getBlogs();

        const res = await api
            .post(path)
            .send({
                url: 'https://missingtitle.com/',
                author: 'Pedro Ezequiel',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'Blog title is missing'
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getBlogs();
        assert.strictEqual(after.length, before.length);
    });
});

after(async () => {
    await mongoose.connection.close();
});
