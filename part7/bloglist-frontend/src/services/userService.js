import axios from 'axios';

const baseUrl = '/api/users';

const createUser = async (userInfo) => {
    const res = await axios.post(baseUrl, userInfo);
    return res.data;
};

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

export default { createUser, getAll };
