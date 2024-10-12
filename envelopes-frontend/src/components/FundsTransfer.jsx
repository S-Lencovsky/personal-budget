import React, { useState } from 'react';
import axios from 'axios';
import './fundsTransfer.css';

const FundsTransfer = ({onFundsTransfer}) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTransfer = { from, to, amount: parseFloat(amount) };
        try {
            await axios.put(`http://localhost:3000/envelopes/${from}/transfer/${to}`, newTransfer);
            alert('Funds transferred successfully');
            onFundsTransfer(newTransfer);
        } catch (error) {
            console.log('Error transferring funds:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="fundsTransfer">
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