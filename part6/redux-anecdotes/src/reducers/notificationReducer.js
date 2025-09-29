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

export const showNotification = (message, type) => {
    return dispatch => {
        dispatch(setNotification({ message, type }));

        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    };
};

export default notificationSlice.reducer;