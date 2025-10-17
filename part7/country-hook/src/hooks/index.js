import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {
        type,
        value,
        onChange,
        reset,
    };
};

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (!name) return;

        const fetchData = async () => {
            try {
                const res = await axios
                    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
                setCountry({ ...res.data, found: true });
            } catch (err) {
                console.error('Error fetching country:', err.message);
                setCountry({ found: false });
            }
        };

        fetchData();
    }, [name]);

    return country;
};