import React, { useState} from 'react';
import axios from 'axios';

const AddEnvelope = ({ onAddEnvelope}) => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);
    const [loading, setLoading] = useState(false);

    const createUniqueId = () => {
        return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(loading) return;

        const newEnvelope = { id: createUniqueId(), name, budget: parseFloat(budget) };
        try {
          setLoading(true);
          await axios.post("http://localhost:3000/envelopes", newEnvelope);
          alert("Envelope created successfully");
          onAddEnvelope(newEnvelope);
          setName("");
          setBudget(0);
        } catch (error) {
          console.log("Error creating envelope:", error);
        } finally {
          setLoading(false);
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