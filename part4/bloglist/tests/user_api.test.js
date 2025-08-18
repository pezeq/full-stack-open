const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');

const api = supertest(app);

describe('When there is only a user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('admin123', 10);
        const sampleUser = new User({
            username: 'root',
            passwordHash,
        });

        await sampleUser.save();
    });

    test('successfully creates a new user', async () => {
        const usersBefore = await helper.getUsers();

        const newUser = {
            username: 'pezeq',
            password: 'p123q',
            name: 'Pedro Ezequiel'
        };

        await api
            .post('/api/users')
            .send({
                username: 'pezeq',
                password: 'p123q',
                name: 'Pedro Ezequiel'
            })
            .expect(201);

        const usersAfter = await helper.getUsers();

        assert.strictEqual(usersAfter.length, usersBefore.length + 1);
        assert(usersAfter.some(u => u.username === newUser.username));
    });

    test('fail to create a user with non unique username', async () => {
        const usersBefore = await helper.getUsers();

        const newUser = {
            username: 'root',
            password: 'admin123'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user with less than 3 password characters', async () => {
        const usersBefore = await helper.getUsers();

        const newUser = {
            username: 'pezeq',
            password: '12'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user with less than 3 username characters', async () => {
        const usersBefore = await helper.getUsers();

        const newUser = {
            username: 'pq',
            password: 'p123q'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user without username', async () => {
        const usersBefore = await helper.getUsers();

        const newUser = {
            name: 'Pedro Ezequiel',
            password: 'p123q'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });

    test('fail to create a user without password', async () => {
        const usersBefore = await helper.getUsers();

        const newUser = {
            name: 'Pedro Ezequiel',
            username: 'pezeq'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAfter = await helper.getUsers();
        assert.strictEqual(usersAfter.length, usersBefore.length);
    });
});

after(() => {
    mongoose.connection.close();
});