import React, { useState } from "react";
import { transferFunds } from "../services/envelopes";

export const TransferMoney = () => {
    const [fromName, setFromName] = useState("");
    const [toName, setToName] = useState("");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await transferFunds(fromName, toName, parseFloat(amount));
            setFromName("");
            setToName("");
            setAmount(0);
            alert("Money transferred successfully");
        } catch (error) {
            setError(error.message);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Transfer Money</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="From Name"
                value={fromName}
                onChange={(event) => setFromName(event.target.value)}
            />
            <input
                type="text"
                placeholder="To Name"
                value={toName}
                onChange={(event) => setToName(event.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
            />
            <button type="submit">Transfer</button>
        </form>
    );
}

export default TransferMoney;