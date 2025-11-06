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

    test('fetch a single blog', async () => {
        const id = await helper.getBlogId();

        const res = await api
            .get(`${path}/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);

        const hasId = Object.values(res.body).includes(id);
        assert.ok(hasId);
    });

    test('if blog doesnt exist, returns 404', async () => {
        const id = await helper.unexistentId();

        const res = await api
            .get(`${path}/${id}`)
            .expect('Content-Type', /json/)
            .expect(404);

        const hasErrorMessage = Object.values(res.body).includes(
            'Blog was not found'
        );
        assert.ok(hasErrorMessage);
    });

    test('if id is malformatted, returns 400', async () => {
        const res = await api
            .get(`${path}/1234567890`)
            .expect('Content-Type', /json/)
            .expect(400);

        const hasErrorMessage = Object.values(res.body).includes(
            'Invalid id format'
        );
        assert.ok(hasErrorMessage);
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

    test('when url is missing, returns 400', async () => {
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

    test('when title is missing, returns 400', async () => {
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

describe('HTTP DELETE', () => {
    test('delete a single blog post', async () => {
        const before = await helper.getBlogs();
        const { id, title } = before[0];

        await api.delete(`${path}/${id}`).expect(204);

        const after = await helper.getBlogs();
        const hasBeenDeleted = !after.some((b) => b.title === title);

        assert.ok(hasBeenDeleted);
        assert.strictEqual(after.length, before.length - 1);
    });
});

describe('HTTP PUT', () => {
    test('update the number of likes for a blog', async () => {
        const id = await helper.getBlogId();

        const res = await api
            .put(`${path}/${id}/likes`)
            .send({
                likes: '666',
            })
            .expect(200)
            .expect('Content-Type', /json/);

        assert.strictEqual(res.body.id, id);
        assert.strictEqual(res.body.likes, 666);
    });

    test('if updated blog doesnt exist, returns 404', async () => {
        const id = await helper.unexistentId();

        const res = await api
            .put(`${path}/${id}/likes`)
            .send({
                likes: '666',
            })
            .expect(404)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'Blog was not found'
        );
        assert.ok(hasErrorMessage);
    });

    test('if request body has extra keys, returns 400', async () => {
        const id = await helper.unexistentId();

        const res = await api
            .put(`${path}/${id}/likes`)
            .send({
                likes: '666',
                title: 'Uh? No! No!',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'Request has unallowed key(s): title'
        );
        assert.ok(hasErrorMessage);
    });

    test('if id is malformatted, returns 400', async () => {
        const res = await api
            .get(`${path}/1234567890`)
            .send({
                likes: '666',
            })
            .expect('Content-Type', /json/)
            .expect(400);

        const hasErrorMessage = Object.values(res.body).includes(
            'Invalid id format'
        );
        assert.ok(hasErrorMessage);
    });
});

after(async () => {
    await mongoose.connection.close();
});
