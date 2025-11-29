import { useState } from 'react';

export const useAlert = () => {
    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');

    const pushAlert = (msg = 'Failed to process request', type = 'error') => {
        setAlertMsg(msg);
        setAlertType(type);

        setTimeout(() => {
            setAlertMsg(null);
            setAlertType(null);
        }, 3000);
    };

    return {
        alertMsg,
        alertType,
        pushAlert,
    };
};
