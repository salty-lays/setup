const express = require('express');
const path = require('path');

const app = express();
app.use(express.text());

// Safe path fix
const __dirname = path.resolve();

let latestText = "No data received yet";

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Send latest text
app.get('/data', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.send(latestText);
});

// Receive POST
app.post('/', (req, res) => {
    latestText = req.body || "Empty";
    
    // VERY IMPORTANT
    res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
