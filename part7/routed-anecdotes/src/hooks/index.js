import { useState } from 'react';

export const useNotification = () => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const pushNotification = (content, type) => {
        setMessage(content);
        setType(type);

        setTimeout(() => {
            setMessage('');
            setType('');
        }, 5000);
    };

    return {
        message,
        type,
        pushNotification
    };
};

export const useField = (name, type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {
        name,
        type,
        value,
        onChange,
        reset
    };
};