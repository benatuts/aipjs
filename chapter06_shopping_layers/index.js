const express = require('express');
const app = express();
const port = 3000;

// --------------------------------------
// Persistence layer
// --------------------------------------

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

// --------------------------------------
// Domain layer
// --------------------------------------

// Compute the total quantity of items
function computeTotalQuantity() {
    let total = 0;
    for (let item of findAllItems()) {
        total += item.quantity;
    }
    return total;
}

// --------------------------------------
// Presentation layer
// --------------------------------------

// Render the shopping list as an unordered HTML list
function generateHtmlShoppingList() {
    let items = findAllItems();
    let total = computeTotalQuantity();
    let result = '';
    if (items.length > 0) {
        result += `<ul>`;
        for (let item of items) {
            result += `<li>${item.quantity} units of ${item.description}</li>`;
        }
        result += `</ul>`;
        result += `<p>Total quantity of units: ${total}.</p>`;
    } else {
        result += `<p>No items have been added.</p>`
    }
    return result;
}

// Render an HTML form for submitting new list items
function generateHtmlShoppingListForm(action) {
    return `<h3>Add item:</h3>
        <form action="${action}" method="GET">
        <p>
        <label>Description:
            <input type="text" name="description">
        </label>
        </p>
        <p>
        <label>Quantity:
            <input type="number" name="quantity">
        </label>
        </p>
        <p>
        <input type="submit" value="Add">
        </p>
        </form>`;
}

app.get('/', (req, res) => {
    res.send(
        `<!DOCTYPE html><title>AIP shopping list</title>
        <h1>AIP shopping list</h1>
        <h3>Current items:</h3>
        ${generateHtmlShoppingList()}
        ${generateHtmlShoppingListForm('/new')}`);
});

app.get('/new', (req, res) => {
    // Get the user input
    const description = req.query['description'];
    const quantity = parseInt(req.query['quantity']);

    // Create the shopping list item
    insertItem(description, quantity);

    // Redirect back to the home page to show the full list
    res.redirect('/');
});

app.listen(port, () => console.log(`The shopping list is running on http://localhost:${port}/`));
