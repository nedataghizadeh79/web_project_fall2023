import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loader.css'

function Loader() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://jsonplaceholder.typicode.com/todos'
            );

            setData(result.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <>
                    <img src="/path/to/loader.gif" alt="Loading..." />
                    <div className="loader">Loading...</div>
                </>

            ) : (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Loader;
