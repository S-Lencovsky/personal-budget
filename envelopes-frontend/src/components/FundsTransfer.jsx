import React, { useState } from 'react';
import axios from 'axios';

const FundsTransfer = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/envelopes/${from}/transfer/${to}`, { amount: parseFloat(amount) });
            alert('Funds transferred successfully');
        } catch (error) {
            console.log('Error transferring funds:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Funds Transfer</h2>
            <div>
                <label>From:</label>
                <input
                    type="text"
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    required
                />
            </div>
            <div>
                <label>To:</label>
                <input
                    type="text"
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                    required
                />
            </div>  
            <div>   
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    required
                />
            </div>
            <button type="submit">Transfer</button>
        </form>
    );
};  

export default FundsTransfer;