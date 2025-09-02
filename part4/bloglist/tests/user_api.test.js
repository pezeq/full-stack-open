const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const config = require('../utils/config');

const api = supertest(app);

describe('When there is only a user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash(config.ROOT_PW, 10);
        const sampleUser = new User({
            username: 'root',
            passwordHash,
        });

        await sampleUser.save();
    });

    test('successfully creates a new user', async () => {
        const usersBefore = await helper.getUsers();

        await api
            .post('/api/users')
            .send({
                username: 'pezeq',
                password: config.PEZEQ_PW,
                name: 'Pedro Ezequiel'
            })
            .expect(201);

        const usersAfter = await helper.getUsers();

        assert.strictEqual(usersAfter.length, usersBefore.length + 1);
        assert(usersAfter.some(u => u.username === 'pezeq'));
    });

    test('fail to create a user with non unique username', async () => {
        const usersBefore = await helper.getUsers();

        await api
            .post('/api/users')
            .send({
                username: 'root',
                password: config.ROOT_PW
            })
            .expect(409);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user with less than 3 password characters', async () => {
        const usersBefore = await helper.getUsers();

        await api
            .post('/api/users')
            .send({
                username: 'pezeq',
                password: '12'
            })
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user with less than 3 username characters', async () => {
        const usersBefore = await helper.getUsers();

        await api
            .post('/api/users')
            .send({
                username: 'pq',
                password: '123456'
            })
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user without username', async () => {
        const usersBefore = await helper.getUsers();

        await api
            .post('/api/users')
            .send({
                name: 'Pedro Ezequiel',
                password: '123456'
            })
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user without password', async () => {
        const usersBefore = await helper.getUsers();

        await api
            .post('/api/users')
            .send({
                name: 'Pedro Ezequiel',
                username: 'pezeq'
            })
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });
});

after(() => {
    mongoose.connection.close();
});