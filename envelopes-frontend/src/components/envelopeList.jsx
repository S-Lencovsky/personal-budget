import React, { useState, useEffect } from 'react';
import { getAllEnvelopes } from '../services/envelopes';

const EnvelopeList = () => {
    const [envelopes, setEnvelopes] = useState([]);

    useEffect(() => {
        const fetchEnvelopes = async () => {
            const response = await getAllEnvelopes();
            setEnvelopes(response);
        };
        fetchEnvelopes();
    }, []);

    return (
        <div>
            <h1>All Envelopes</h1>
            <ul>
                {envelopes.map((envelope) => (
                    <li key={envelope.name}>{envelope.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default EnvelopeList;