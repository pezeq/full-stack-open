import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
    },
});

const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const users = await userService.getAll();
            dispatch(setUsers(users));
        } catch (err) {
            console.error('Error fetching users:', err.response?.data);
        }
    };
};

export default userSlice.reducer;
