require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

const ROOT_PW = process.env.ROOT_PW;

const PEZEQ_PW = process.env.PEZEQ_PW;

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET,
    ROOT_PW,
    PEZEQ_PW
};