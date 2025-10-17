import { useEffect, useState } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);
    const [reload, setReload] = useState(false);

    const getAll = async () => {
        const res = await axios.get(baseUrl);
        return res.data;
    };

    const create = async (resource) => {
        const res = await axios.post(baseUrl, resource);
        setReload(!reload);
        return res.data;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAll();
                setResources(res);
            } catch (err) {
                console.error('Error fetching resource:', err.message);
            }
        };
        fetchData();
    }, [reload]);

    const service = {
        create
    };

    return [
        resources, service
    ];
};
