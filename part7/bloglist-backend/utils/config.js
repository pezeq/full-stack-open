require('dotenv').config();

const isTestEnvironment =
    process.env.NODE_ENV === 'test' ||
    process.argv.some((arg) => arg.includes('test'));

const MONGODB_URI = isTestEnvironment
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = process.env.PORT;

const SAMPLE_USER_PASSWORD = process.env.SAMPLE_USER_PASSWORD;
const BCRYPT_SALT = Number(process.env.BCRYPYT_SALT);

module.exports = {
    MONGODB_URI,
    PORT,
    SAMPLE_USER_PASSWORD,
    BCRYPT_SALT,
};
