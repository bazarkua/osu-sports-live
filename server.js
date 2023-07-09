const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 8008;

app.use(helmet());

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});