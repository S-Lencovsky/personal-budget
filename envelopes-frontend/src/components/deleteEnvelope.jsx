import React, { useState } from "react";
import { deleteEnvelope } from "../services/envelopes";

const DeleteEnvelope = ({ name }) => {
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState(null);
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteEnvelope(name);
            setDeleted(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setConfirm(false);
        setError(null);
    };

    if (deleted) {
        return <p style={{ color: "green" }}>Envelope deleted!</p>;
    } 

    return (
        <div>
            {confirm ? (
                <>
            <p>Are you sure you want to delete {name}?</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleCancel}>Cancel</button>
            </>
            ) : (
                <button onClick={() => setConfirm(true)}>Delete</button>
            )}
        </div>
    );
};

export default DeleteEnvelope;