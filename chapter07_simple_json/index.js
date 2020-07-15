const express = require('express');
const app = express();
const port = 8080;

let data = [
    { "description": "Chocolate bar", "quantity": 5 },
    { "description": "Pasta", "quantity": 1 }
];

// API endpoint for retrieving items
app.get('/api/items', (req, res) => res.json(data));

app.listen(8080, () => console.log(`API running at http://localhost:${port}/api/items`));
