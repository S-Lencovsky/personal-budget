import React, { useState} from 'react';
import { createEnvelope } from '../services/envelopes';


export const CreateEnvelope = () => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createEnvelope({ name, budget: parseFloat(budget) });
      setName("");
      setBudget(0);
      alert("Envelope created successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Envelope</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(event) => setBudget(parseFloat (event.target.value) || 0)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateEnvelope;