import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return '';
        }
    }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, time, type) => {
    return (dispatch) => {
        dispatch(setNotification({ message, time, type }));

        setTimeout(() => {
            dispatch(clearNotification());
        }, time * 1000);
    };
};

export default notificationSlice.reducer;