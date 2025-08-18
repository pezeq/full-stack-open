const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helpers');
const helper = require('../tests/test_helper')

describe('total number of likes', () => {
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
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    test('list with multiple blogs', () => {
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 36);
    });

    test('empty list', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    });
});