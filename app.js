const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Global variables for envelopes and total budget
let envelopes = [];
let totalBudget = 0;

// GET request to return "Hello, World"
app.get('/', (req, res) => {
    res.send('Hello, World');
});

// POST request to generate individual budget envelopes
app.post('/envelopes', (req, res) => {
    const { name, amount } = req.body;

    if (!name || !amount) {
        return res.status(400).json({ message: 'Name and amount are required.' });
    }

    envelopes.push({ name, amount });
    totalBudget += amount;
    res.status(201).json({ message: 'Envelope created', envelopes });
});

// GET request to retrieve all envelopes
app.get('/envelopes', (req, res) => {
    res.json(envelopes);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
