const express = require('express');
const app = express();
const port = 3000;

// A list of items in the shopping list
// Each item is an object: { description: string, quantity: number }
let items = [];

app.get('/', (req, res) => {
    // Prepare the header
    let result = 
        `<!DOCTYPE html><title>AIP shopping list</title>
         <h1>AIP shopping list</h1>
         <h3>Current items:</h3>`;

    // Generate the items in the shopping list and a total
    // or a placeholder if nothing has been added.
    if (items.length > 0) {
        let total = 0;
        result += `<ul>`;
        for (let item of items) {
            result += `<li>${item.quantity} units of ${item.description}</li>`;
            total += item.quantity;
        }
        result += `</ul>`;
        result += `<p>Total quantity of units: ${total}.</p>`;
    } else {
        result += `<p>No items have been added.</p>`
    }

    // Prepare the form to add new items to the shopping list
    result += 
        `<h3>Add item:</h3>
         <form action="/new" method="GET">
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

    // Send the result to the client
    res.send(result);
});

app.get('/new', (req, res) => {
    // Get the user input
    const description = req.query['description'];
    const quantity = parseInt(req.query['quantity']);
    
    // Add to the shopping list
    items.push({ description, quantity });

    // Redirect back to the home page to show the full list
    res.redirect('/');
});

app.listen(port, () => console.log(`The shopping list is running on http://localhost:${port}/`));
