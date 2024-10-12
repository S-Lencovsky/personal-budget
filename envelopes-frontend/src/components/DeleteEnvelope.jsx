import React, {useState} from 'react';
import axios from 'axios';
import './deleteEnvelope.css';

const DeleteEnvelope = ({onDeleteEnvelope}) => {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`http://localhost:3000/envelopes/${name}`);
            alert('Envelope deleted successfully');
            onDeleteEnvelope(name);
        } catch (error) {
            console.log('Error deleting envelope:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Delete Envelope</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default DeleteEnvelope;