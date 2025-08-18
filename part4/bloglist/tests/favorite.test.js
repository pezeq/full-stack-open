const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helpers');
const helper = require('../tests/test_helper');

describe('the blog with most likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];

    const blogs = helper.blogs;

    test('list with one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        assert.deepStrictEqual(result, listWithOneBlog[0]);
    });

    test('list with multiple blog', () => {
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, blogs[2]);
    });

    test('empty list', () => {
        const result = listHelper.favoriteBlog([]);
        assert.deepStrictEqual(result, {});
    });
});