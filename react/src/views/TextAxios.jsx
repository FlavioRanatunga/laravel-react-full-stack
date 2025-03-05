import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

const TestAxios = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('Making Axios request to /test');
        axiosClient.get('/test')
            .then(response => {
                console.log('Received response:', response);
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching test endpoint:', error);
                setMessage('Error fetching test endpoint');
            });
    }, []);

    return (
        <div>
            <h1>Test Axios</h1>
            <p>{message}</p>
        </div>
    );
};

export default TestAxios;