const fs = require('fs');

// Retrieve all items in the shopping list
// returns an array of { description: string, quantity: number }
function findAllItems() {
    try {
        // Try to load the items from the filesystem, as JSON
        return JSON.parse(fs.readFileSync('items.json'));
    } catch {
        // Otherwise use a default setting
        return [];
    }
}

// Insert a single item into the shopping list
// description is a string, quantity is an integer
// the parameters are assumed to be valid (non-null, non-empty)
function insertItem(description, quantity) {
    // Load the current items
    let items = findAllItems();
    // Add the new record
    items.push({ description, quantity });
    // Overwrite the list of items in the filesystem
    fs.writeFileSync('items.json', JSON.stringify(items));
}

module.exports = { findAllItems, insertItem };