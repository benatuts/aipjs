const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Enable the JSON body parser so that Express.js will decode JSON in POST messages
app.use(bodyParser.json());

// Underlying data store, an array of { description: string, quantity: number }
let itemData = [];

// Retrieve all items in the shopping list
// returns an array of { description: string, quantity: number }
function findAllItems() {
    return itemData;
}

// Insert a single item into the shopping list
// description is a string, quantity is an integer
// the parameters are assumed to be valid (non-null, non-empty)
function insertItem(description, quantity) {
    itemData.push({ description, quantity });
}

// Compute the total quantity of items
function computeTotalQuantity() {
    let total = 0;
    for (let item of findAllItems()) {
        total += item.quantity;
    }
    return total;
}

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
        items: findAllItems(),
        total: computeTotalQuantity()
    });
});

// Create a new shopping list item
// requires { description: string, quantity: number}
// returns a JSON object: { success: true }, if successful
app.post('/api/items', (req, res) => {
    insertItem(req.body.description, req.body.quantity);
    res.json({ success: true });
});

app.listen(port, () => console.log(`The shopping list is running on http://localhost:${port}/`));
