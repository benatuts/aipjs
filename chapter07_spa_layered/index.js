const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const persistence = require('./persistence.js');
const domain = require('./domain.js');

app.use(bodyParser.json());

// Return the single-page web application
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Provide a list of all shopping list items and a total
// returns a JSON object: { items, total }
//     where items is an array of { description: string, quantity: number}
//       and total is a number (the sum of quantity)
app.get('/api/items', (req, res) => {
    res.json({
        items: persistence.findAllItems(),
        total: domain.computeTotalQuantity()
    });
});

// Create a new shopping list item
// requires { description: string, quantity: number}
// returns a JSON object: { success: true }, if successful
app.post('/api/items', (req, res) => {
    persistence.insertItem(req.body.description, req.body.quantity);
    res.json({ success: true });
})

app.listen(port, () => console.log(`The shopping list is running on http://localhost:${port}/`));
