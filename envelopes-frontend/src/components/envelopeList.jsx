import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './envelopeList.css';
import AddEnvelope from './AddEnvelope';
import UpdateEnvelope from './UpdateEnvelope';
import FundsTransfer from './FundsTransfer';
import DeleteEnvelope from './DeleteEnvelope';

const EnvelopesList = () => {
    const [envelopes, setEnvelopes] = useState([]);

    const fetchEnvelopes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/envelopes');
            setEnvelopes(response.data);
        } catch (error) {
            console.log("Error fetching envelopes:", error);
        }
    };

    useEffect(() => {
        fetchEnvelopes();
    }, []);

    const handleAddEnvelope = async (newEnvelope) => {
        try {
            await axios.post('http://localhost:3000/envelopes', newEnvelope);
            alert('Envelope added successfully');
            fetchEnvelopes();
        } catch (error) {
            console.log("Error adding envelope:", error);
        }
    };

    const handleUpdateEnvelope = async (updateEnvelope) => {
        try {
            const response = await axios.put(`http://localhost:3000/envelopes/${updateEnvelope.id}`, updateEnvelope);
            setEnvelopes(envelopes.map((e) => (e.id === updateEnvelope.id ? response.data : e)));
        } catch (error) {
            console.log("Error updating envelope:", error);
        }
    };

    const handleDeleteEnvelope = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/envelopes/${id}`);
            alert('Envelope deleted successfully');
            fetchEnvelopes();
        } catch (error) {
            console.log("Error deleting envelope:", error);
        }
    };

    const handleFundsTransfer = async(updatedTransfer) => {
        try {
            const response = await axios.put(`http://localhost:3000/envelopes/${updatedTransfer.id}`, updatedTransfer);
            setEnvelopes(envelopes.map((e) => (e.id === updatedTransfer.id ? response.data : e)));
        } catch (error) {
            console.log("Error transferring funds:", error);
        }
    };

    return (
      <div className="envelopes-list">
        <ul>
          {envelopes.map((envelope) => (
            <li key={envelope.id} className="envelope-item">
              {envelope.name}
            </li>
          ))}
        </ul>
        <AddEnvelope onAddEnvelope={handleAddEnvelope} />
        <UpdateEnvelope onUpdateEnvelope={handleUpdateEnvelope} />
        <FundsTransfer onFundsTransfer={handleFundsTransfer}/>
        <DeleteEnvelope onDeleteEnvelope={handleDeleteEnvelope} />
      </div>
    );
};

export default EnvelopesList;