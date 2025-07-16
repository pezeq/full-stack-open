import { useState } from "react";

export const useAlert = () => {
    const [alertMsg, setAlertMsg] = useState(null);
    const [alertType, setAlertType] = useState('');

    const pushAlert = (message, type) => {
        setAlertType(`${type}`)
        setAlertMsg(`${message}`);
        setTimeout(() => {
            setAlertMsg(null);
        }, 2000);
    }

    return {
        alertMsg,
        alertType,
        pushAlert
    }
}




