import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import blogService from '../services/blogService';
import { displayNotification } from './notificationReducer';
import userService from '../services/userService';

const loginSlice = createSlice({
    name: 'loggedUser',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});

const { setUser } = loginSlice.actions;

const storeLogin = (loggedUser) => {
    window.localStorage.setItem('storedUser', JSON.stringify(loggedUser));
};

export const handleLogin = (credentials) => {
    return async (dispatch) => {
        try {
            const loggedUser = await loginService.login(credentials);
            storeLogin(loggedUser);
            blogService.setToken(loggedUser.token);
            dispatch(setUser(loggedUser));
            dispatch(
                displayNotification({
                    message: `User '${loggedUser.username}' has been logged in`,
                    type: 'success',
                })
            );
        } catch (err) {
            console.error('Error logging in user:', err.response?.data);
            dispatch(
                displayNotification({
                    message: `Error logging in user: ${err.response?.data?.message}`,
                    type: 'danger',
                })
            );
        }
    };
};

export const initializeLogin = () => {
    return (dispatch) => {
        const storedUser = window.localStorage.getItem('storedUser');
        if (storedUser) {
            const parsedStoredUser = JSON.parse(storedUser);
            blogService.setToken(parsedStoredUser.token);
            dispatch(setUser(parsedStoredUser));
        }
    };
};

export const handleCreateUser = (userInfo) => {
    return async (dispatch) => {
        try {
            await userService.createUser(userInfo);
            dispatch(
                handleLogin({
                    username: userInfo.username,
                    password: userInfo.password,
                })
            );
        } catch (err) {
            console.error('Error signing up user:', err.response?.data);
            dispatch(
                displayNotification({
                    message: `Error signing up user: ${err.response?.data?.message}`,
                    type: 'danger',
                })
            );
        }
    };
};

export default loginSlice.reducer;
