const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const blog = listHelper.oneBlog;
const blogs = listHelper.blogs;

test('dummy returns one', () => {
    const result = listHelper.dummy([]);
    assert.strictEqual(result, 1);
});

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    });

    test('when list has only one blog', () => {
        const result = listHelper.totalLikes(blog);
        assert.strictEqual(result, 5);
    });

    test('when list has multiple blogs', () => {
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 36);
    });
});

describe('favorite blog', () => {
    test('when list is empty, return an empty object', () => {
        const result = listHelper.favoriteBlog([]);
        assert.deepStrictEqual(result, {});
    });

    test('when list has multiple blogs, return the most liked', () => {
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, blogs[2]);
    });

    test('when list has one blog, return him', () => {
        const result = listHelper.favoriteBlog(blog);
        assert.deepStrictEqual(result, blog[0]);
    });
});

describe('lodash tests', () => {
    describe('author with most blogs', () => {
        test('in a multiple blog list', () => {
            const result = listHelper.mostBlogs(blogs);
            assert.deepStrictEqual(result, {
                author: 'Robert C. Martin',
                blogs: 3,
            });
        });

        test('in a single blog list', () => {
            const result = listHelper.mostBlogs(blog);
            assert.deepStrictEqual(result, {
                author: 'Edsger W. Dijkstra',
                blogs: 1,
            });
        });

        test('in a empty list', () => {
            const result = listHelper.mostBlogs([]);
            assert.deepStrictEqual(result, undefined);
        });
    });

    describe('author with most likes', () => {
        test('in a multiple blog list', () => {
            const result = listHelper.mostLikes(blogs);
            assert.deepStrictEqual(result, {
                author: 'Edsger W. Dijkstra',
                likes: 17,
            });
        });

        test('in a single blog list', () => {
            const result = listHelper.mostLikes(blog);
            assert.deepStrictEqual(result, {
                author: 'Edsger W. Dijkstra',
                likes: 5,
            });
        });

        test('in a empty list', () => {
            const result = listHelper.mostBlogs([]);
            assert.deepStrictEqual(result, undefined);
        });
    });
});
