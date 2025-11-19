import axios from 'axios';
const baseUrl = '/api/blogs';

let TOKEN;
const setToken = (token) => TOKEN = token;

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createNew = async (newBlog) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    };

    const res = await axios.post(baseUrl, newBlog, config);
    return res.data;
};

export default {
    getAll,
    createNew,
    setToken,
};