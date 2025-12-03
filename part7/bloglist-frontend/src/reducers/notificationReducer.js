import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return null;
        },
    },
});

const { setNotification, clearNotification } = notificationSlice.actions;

export const displayNotification = (alert, time = 3) => {
    return (dispatch) => {
        dispatch(setNotification(alert));
        setTimeout(() => {
            dispatch(clearNotification());
        }, time * 1000);
    };
};

export default notificationSlice.reducer;
