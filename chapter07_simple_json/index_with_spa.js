const express = require('express');
const app = express();
const port = 8080;

let data = [
    { "description": "Chocolate bar", "quantity": 5 },
    { "description": "Pasta", "quantity": 1 }
];

// Serve the SPA
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// API endpoint for retrieving items
app.get('/api/items', (req, res) => res.json(data));

app.listen(8080, () => console.log(`SPA available at at http://localhost:${port}/`));
