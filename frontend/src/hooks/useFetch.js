import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            try{
                setLoading(true)
                const res = await axios.get(url);
                setData(res.data);
            } catch(err){
                setError(err);
            }
            setLoading(false)
        }
        fetchData();

    }, [url]);

    const refetch = async () => {
        try{
            setLoading(true);
            const res = await axios.get(url);
            setData(res.data);
        } catch(err){
            setError(err);
        }
        setLoading(false);
    }

    return {data, loading, refetch, error}

}

export default useFetch;
