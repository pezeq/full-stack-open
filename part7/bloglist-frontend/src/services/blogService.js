import axios from 'axios';
const baseUrl = '/api/blogs';

let TOKEN;
const setToken = (token) => (TOKEN = token);
const getConfig = () => ({
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createNew = async (newBlog) => {
    const res = await axios.post(baseUrl, newBlog, getConfig());
    return res.data;
};

const updateLikes = async (id, likes) => {
    const res = await axios.put(`${baseUrl}/${id}/likes`, likes);
    return res.data;
};

const removeBlog = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`, getConfig());
    return res.data;
};

const commentBlog = async (id, comment) => {
    console.log('commentBlog', id, comment);
    const res = await axios.put(`${baseUrl}/${id}/comments`, comment);
    return res.data;
};

export default {
    getAll,
    createNew,
    setToken,
    updateLikes,
    removeBlog,
    commentBlog,
};
