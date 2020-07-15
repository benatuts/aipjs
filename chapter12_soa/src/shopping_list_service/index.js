const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

const persistence = require('./persistence.js');
const { Item } = require('./item.js');

app.use(bodyParser.json());

// Return a representation of active items in the shopping list
//
// Returns all items that have not yet been purchased or deleted
app.get('/items', (req, res) => {
    res.json(persistence.findActive());
});

// Create a new shopping list item
//
// Expects JSON item details: { description: string, quantity: number }
// Returns success == true and all active items: { success: boolean, items: Item[]}
app.post('/items/new', (req, res) => {
    // Create and add a new item
    persistence.add(new Item(req.body.description, req.body.quantity));

    // This operation should always succeed
    res.json(true);
});


// Start the server immediately
app.listen(port, () => console.log(`The shopping list is running on http://localhost:${port}/`));
