const express = require('express');
const fetch = require('node-fetch');

const route = express.Router();

// Helper method to create an async function from a POSTable URI
function wrapPOST(uri) {
    // Return a function that JSON encodes a parameter,
    // then fetches the URI and JSON decodes the response
    return async (request) => {
        let result = await fetch(
            uri, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            }
        );
        return await result.json();
    };
}

// Helper method to create an async function from a GETable URI
function wrapGET(uri) {
    // Return a function that fetches the URI and JSON decodes the response
    return async () => {
        let result = await fetch(uri);
        return await result.json();
    };
}

// Define remote services
// Note: the hard-coded hostnames/ports should be moved to a configuration file
const createItem = wrapPOST('http://localhost:3001/items/new');
const getItems = wrapGET('http://localhost:3001/items');
const notifyNewItem = wrapPOST('http://localhost:3002/notify/create');
const notifyDeletedItem = wrapPOST('http://localhost:3002/notify/delete');

// Return a representation of active items in the shopping list
//
// Returns all items that have not yet been purchased or deleted
// Warning: network errors are not properly handled
route.get('/items', async (req, res) => {
    let items = await getItems();
    res.json({ success: true, items });
});

// Create a new shopping list item
//
// Expects JSON item details: { description: string, quantity: number }
// Returns success == true and all active items: { success: boolean, items: Item[]}
// Warning: network errors are not properly handled
route.post('/items/new', async (req, res) => {
    let { description, quantity } = req.body;

    // Create and add a new item
    await createItem({description, quantity});
    // Notify everyone on the team
    await notifyNewItem({description})

    let items = await getItems();

    res.json({ success: true, items });
});

module.exports = { route };