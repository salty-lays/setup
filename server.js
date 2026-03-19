const express = require('express');
const path = require('path');

const app = express();
app.use(express.text());

let latestText = "No data received yet";

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch latest data
app.get('/data', (req, res) => {
    res.send(latestText);
});

// Receive POST
app.post('/', (req, res) => {
    latestText = req.body;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
