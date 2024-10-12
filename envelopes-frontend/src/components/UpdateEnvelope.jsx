import React, {useState} from 'react';
import axios from 'axios';

const UpdateEnvelope = ({onUpdateEnvelope}) => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUpdate = { name, budget: parseFloat(budget) };
        try {
            await axios.put(`http://localhost:3000/envelopes/${name}`, newUpdate);
            alert('Envelope updated successfully');
            onUpdateEnvelope(newUpdate);
        } catch (error) {
            console.log('Error updating envelope:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Envelope</h2>
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
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateEnvelope;