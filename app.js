const express = require('express');
const app = express();
const { envelopes: initialEnvelopes, totalBudget: originalTotalBudget } = require('./budgetData.js');

// Middleware to parse JSON request body
app.use(express.json());

// Use the imported global variables
let envelopes = initialEnvelopes;
let totalBudget = originalTotalBudget;

// GET request to return "Hello, World"
app.get('/', (req, res) => {
    res.send('Hello, World');
});

// POST request to generate individual budget envelopes
app.post('/envelopes', (req, res) => {
    const { name, budget } = req.body;

    if (!name || !budget) {
        return res.status(400).json({ message: 'Name and Budget are required.' });
    }

    envelopes.push({ name, budget });
    totalBudget += budget;
    res.status(201).json({ message: 'Envelope created', envelope: { name, budget } });
});

// GET request to retrieve all envelopes
app.get('/envelopes', (req, res) => {
    res.json(envelopes);
});

// GET request to retrieve specific envelope
app.get('/envelopes/:name', (req, res) => {
    const envelope = envelopes.find(e => e.name.toLowerCase() === req.params.name.toLowerCase());
    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found.' });
    }
    res.json(envelope);
});

// PUT request to update specific envelope
app.put('/envelopes/:name', (req, res) => {
    const envelope = envelopes.find(e => e.name.toLowerCase() === req.params.name.toLowerCase());

    // Check if the envelope exists
    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found.' });
    }

    const { name, budget, amount } = req.body;

    // Handle money extraction if 'amount' is provided
    if (amount !== undefined) {
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount should be a positive number.' }); // Checking amount is not below 0
        }
        if (envelope.budget >= amount) {
            envelope.budget -= amount;  // Deduct from envelope budget
            totalBudget -= amount;      // Adjust total budget
        } else {
            return res.status(400).json({ message: 'Insufficient funds in the envelope.' });
        }
    }

    // Update name if provided and check for duplicates
    if (name !== undefined) {
        const nameExists = envelopes.some(e => e.name.toLowerCase() === name.toLowerCase() && e !== envelope);
        if (nameExists) {
            return res.status(400).json({ message: 'Envelope with this name already exists.' });
        }
        envelope.name = name; 
    }

    // Update budget if provided and ensure total budget does not exceed limits
    if (budget !== undefined) {
        if ((totalBudget - envelope.budget + budget) <= originalTotalBudget) {
            totalBudget = totalBudget - envelope.budget + budget; 
            envelope.budget = budget; 
        } else {
            return res.status(400).json({ message: 'New budget exceeds total budget limit.' });
        }
    }

    res.json({ message: 'Envelope updated', envelope });
});

// DELETE request to delete specific envelope
app.delete('/envelopes/:name', (req, res) => {
    const envelope = envelopes.find(e => e.name.toLowerCase() === req.params.name.toLowerCase());
    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found.' });
    }

    envelopes = envelopes.filter(e => e.name.toLowerCase() !== req.params.name.toLowerCase());
    totalBudget -= envelope.budget;
    res.json({ message: 'Envelope deleted', envelope });
});

// POST request to transfer money between envelopes
app.post('/transfer', (req, res) => {
    const { fromName, toName, amount } = req.body;
    const fromEnvelope = envelopes.find(e => e.name.toLowerCase() === fromName.toLowerCase());
    const toEnvelope = envelopes.find(e => e.name.toLowerCase() === toName.toLowerCase());
    if (!fromEnvelope || !toEnvelope) {
        return res.status(404).json({ message: 'Envelope not found.' });
    }
    if (fromEnvelope.budget < amount) {
        return res.status(400).json({ message: 'Insufficient funds in the envelope.' });
    }
    if (toEnvelope.budget + amount > originalTotalBudget) {
        return res.status(400).json({ message: 'New budget exceeds total budget limit.' });
    }
    fromEnvelope.budget -= amount;
    toEnvelope.budget += amount;
    totalBudget -= amount;
    res.json({ message: 'Money transferred', fromEnvelope, toEnvelope });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
