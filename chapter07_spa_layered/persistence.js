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

module.exports = { findAllItems, insertItem };