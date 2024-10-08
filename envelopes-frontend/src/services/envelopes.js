/* import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

export const getAllEnvelopes = async () => {
    const response = await axios.get(`${API_URL}/envelopes`);
    return response.data;
}

export const getEnvelopeByName = async (name) => {
    const response = await axios.get(`${API_URL}/envelopes/${name}`);
    return response.data;
}

export const createEnvelope = async (envelope) => {
    const response = await axios.post(`${API_URL}/envelopes`, envelope);
    return response.data;
}

export const updateEnvelope = async (envelope) => {
    const response = await axios.put(`${API_URL}/envelopes/${envelope.name}`, envelope);
    return response.data;
}

export const deleteEnvelope = async (name) => {
    const response = await axios.delete(`${API_URL}/envelopes/${name}`);
    return response.data;
}

export const transferFunds = async (fromName, toName, amount) => {
    const response = await axios.post(`${API_URL}/transfer`, { fromName, toName, amount });
    return response.data;
}

*/