import React, { useState} from 'react';
import axios from 'axios';

const AddEnvelope = () => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         await axios.post('http://localhost:3000/envelopes', { name, budget: parseFloat(budget) });
         alert('Envelope created successfully');
            } catch(error) {
            console.log("Error creating envelope:", error);
            };
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Envelope</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div>
                <label>Budget:</label>
                <input
                    type="number"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Envelope</button>
        </form>
    );
};

export default AddEnvelope;