import axios from 'axios';

const baseUrl = '/api/users';

const createUser = async (userInfo) => {
    const res = await axios.post(baseUrl, userInfo);
    return res.data;
};

export default { createUser };
