import { useState } from 'react';

export const useAlert = () => {
    const [alertMsg, setAlertMsg] = useState(null);
    const [alertType, setAlertType] = useState('');

    const pushAlert = (msg = 'Failed to process request', type = 'error') => {
        setAlertMsg(msg);
        setAlertType(type);

        setTimeout(() => {
            setAlertMsg(null);
        }, 2000);
    };

    return {
        pushAlert,
        alertType,
        alertMsg
    };
};