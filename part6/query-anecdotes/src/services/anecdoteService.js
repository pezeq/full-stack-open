import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

export const create = async (anecdote) => {
    const res = await axios.post(baseUrl, anecdote);
    return res.data;
};

export const update = async (anecdote) => {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return res.data;
};