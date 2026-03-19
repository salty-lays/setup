const express = require('express');

const app = express();
app.use(express.text());

app.post('/', (req, res) => {
    console.log('Received text:', req.body);
    res.send('Text received');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
