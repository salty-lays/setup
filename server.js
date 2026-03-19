const express = require('express');
const path = require('path');

const app = express();
app.use(express.text());

// Store latest received text
let latestText = "No data received yet";

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get latest text
app.get('/data', (req, res) => {
    res.send(latestText);
});

// Receive POST
app.post('/', (req, res) => {
    latestText = req.body;
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
