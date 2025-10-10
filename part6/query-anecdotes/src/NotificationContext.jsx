import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload;
        case 'CLEAR_NOTIFICATION': return '';
        default: return state;
    }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
};

export const showNotification = (dispatch, message) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });

    setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
};

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '');

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
