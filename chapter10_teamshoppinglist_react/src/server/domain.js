const express = require('express');
const persistence = require('./persistence.js');
const { Item } = require('./item.js');
const constants = require('../common/constants.js');

const route = express.Router();

// Return a representation of active items in the shopping list
//
// Returns all items that have not yet been purchased or deleted
route.get('/items', (req, res) => {
    res.json({ success: true, items: persistence.findActive() });
});

// Create a new shopping list item
//
// Expects JSON item details: { description: string, quantity: number }
// Returns success == true and all active items: { success: boolean, items: Item[]}
route.post('/items/new', (req, res) => {
    // Create and add a new item
    persistence.add(new Item(req.body.description, req.body.quantity));

    // This operation should always succeed
    res.json({ success: true, items: persistence.findActive() });
});

// Set a shopping list item as being ready to purchase
//
// Returns a success status and all active items: { success: boolean, items: Item[]}
route.post('/items/:id/ready', (req, res) => {
    // Find the item
    let id = req.params.id;
    let item = persistence.findById(id);

    if (item) {
        // Trigger the ready to purchase action
        let success = item.readyToPurchase();
        res.json({ success, items: persistence.findActive() });
    } else {
        res.json({ success: false, error: constants.ITEM_NOT_FOUND });
    }
});

// Set a shopping list item as being purchased
//
// Returns a success status and all active items: { success: boolean, items: Item[]}
route.post('/items/:id/purchase', (req, res) => {
    // Find the item
    let id = req.params.id;
    let item = persistence.findById(id);

    if (item) {
        // Trigger a purchase
        let success = item.purchase();
        res.json({ success, items: persistence.findActive() });
    } else {
        res.json({ success: false, error: constants.ITEM_NOT_FOUND });
    }
});

// Deletes a shopping list item
//
// The action is ignored (returning success), if it is not valid for the item
// Returns a success status and all active items: { success: boolean, items: Item[]}
route.post('/items/:id/delete', (req, res) => {
    // Find the item
    let id = req.params.id;
    let item = persistence.findById(id);

    if (item) {
        // Trigger deletion
        let success = item.delete();
        res.json({ success, items: persistence.findActive() });
    } else {
        res.json({ success: false, error: constants.ITEM_NOT_FOUND });
    }
});

module.exports = { route };