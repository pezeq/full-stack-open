const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const helper = require('../utils/test_helper');
const { BCRYPT_SALT } = require('../utils/config');

const api = supertest(app);

const path = '/api/users';

beforeEach(async () => {
    await User.deleteMany({});

    const { password } = helper.sampleUser;

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT);

    const user = new User({
        username: 'test',
        passwordHash,
        name: 'Tester',
    });

    await user.save();
});

describe('HTTP POST', () => {
    test('successfully creates a new user', async () => {
        const before = await helper.getUsers();

        const res = await api
            .post(path)
            .send(helper.sampleUser)
            .expect(201)
            .expect('Content-Type', /json/);

        const hasNewUser = Object.values(res.body).includes(
            helper.sampleUser.username
        );
        assert.ok(hasNewUser);

        const after = await helper.getUsers();
        assert.strictEqual(after.length, before.length + 1);
    });

    test('fails to create non unique username', async () => {
        const before = await helper.getUsers();

        const res = await api
            .post(path)
            .send({
                username: 'test',
                password: '123456890',
                name: 'Tester',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'Username already exist'
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getUsers();
        assert.strictEqual(after.length, before.length);
    });

    test('fails to create user without username', async () => {
        const before = await helper.getUsers();

        const res = await api
            .post(path)
            .send({
                name: 'Pedro Ezequiel',
                password: '123456790',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).some((k) =>
            String(k).includes('User validation failed')
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getUsers();
        assert.strictEqual(after.length, before.length);
    });

    test('fails to create user without password', async () => {
        const before = await helper.getUsers();

        const res = await api
            .post(path)
            .send({
                username: 'pezeq',
                name: 'Pedro Ezequiel',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'User password is missing'
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getUsers();
        assert.strictEqual(after.length, before.length);
    });

    test('fails to create user with short password', async () => {
        const before = await helper.getUsers();

        const res = await api
            .post(path)
            .send({
                username: 'pezeq',
                password: '1',
                name: 'Pedro Ezequiel',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).includes(
            'Password is shorter than the minimum allowed length (3)'
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getUsers();
        assert.strictEqual(after.length, before.length);
    });

    test('fails to create user with short username', async () => {
        const before = await helper.getUsers();

        const res = await api
            .post(path)
            .send({
                username: 'p',
                password: '1234567890',
                name: 'Pedro Ezequiel',
            })
            .expect(400)
            .expect('Content-Type', /json/);

        const hasErrorMessage = Object.values(res.body).some((k) =>
            String(k).includes('User validation failed')
        );
        assert.ok(hasErrorMessage);

        const after = await helper.getUsers();
        assert.strictEqual(after.length, before.length);
    });
});

after(async () => {
    await mongoose.connection.close();
});
