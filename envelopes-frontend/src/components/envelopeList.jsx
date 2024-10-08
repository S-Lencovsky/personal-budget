import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnvelopesList = () => {
    const [envelopes, setEnvelopes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/envelopes')
            .then(response => {
                setEnvelopes(response.data);
            })
            .catch(error => {
                console.log("Error fetching envelopes:", error);
            });
    }, []);

    return (
        <div>
            <h1>Envelopes</h1>
            <ul>
                {envelopes.map((envelope) => (
                    <li key={envelope.name}>{envelope.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default EnvelopesList;